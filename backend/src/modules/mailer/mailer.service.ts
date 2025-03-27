import { AppObject } from '@constants/object';
import { DEFAULT_ATTEMPTS } from '@constants/variable';
import { Inject, Injectable } from '@nestjs/common';
import * as ejs from 'ejs';
import * as fs from 'fs';
import * as nodemailer from 'nodemailer';
// import * as mailgun from 'nodemailer-mailgun-transport';
import * as path from 'path';
import { AppConfig } from 'src/configs';
import {
  ISendMailParams,
  MailerOptions,
  MailerType,
  TransporterOptions,
} from './mailer.interface';

@Injectable()
export class MailerService {
  private transporter: nodemailer.Transporter;

  constructor(
    @Inject(AppObject.APP_PROVIDERS.GOOGLE_MAIL)
    private readonly options: MailerOptions,
    private readonly appConfig: AppConfig,
  ) {
    this._getTransporter();
  }

  private async _getTransporter(): Promise<void> {
    switch (this.options.type) {
      case MailerType.GMAIL: {
        this.transporter = await nodemailer.createTransport({
          service: 'gmail',
          auth: Object.assign(
            (this.options.configs as TransporterOptions).auth,
            { type: 'OAuth2' },
          ),
        });
        break;
      }
      // case MailerType.MAILGUN: {
      //   this.transporter = await nodemailer.createTransport(
      //     mailgun(this.options.configs),
      //   );
      //   break;
      // }
    }
  }

  async sendEmails(params: ISendMailParams, attempts?: number): Promise<void> {
    try {
      params.options.from = this.appConfig.appEnv?.GOOGLE.POSTMASTER;
      if (!this.transporter) {
        await this._getTransporter();
      }

      if (params.template) {
        const html = await this._renderHTMLContent(
          params.template.name,
          params.template.data,
        );

        Object.assign(params.options, { html: html });
      }

      await this.transporter.sendMail(params.options);
    } catch (error) {
      if (attempts < DEFAULT_ATTEMPTS) {
        await this._getTransporter();
        this.sendEmails(params, +attempts++);
      }
      console.log(error);
    }
  }

  private async _renderHTMLContent(
    templateName: string,
    data: any,
  ): Promise<string> {
    const template = fs.readFileSync(
      path.join(__dirname, path.join('../../templates', templateName)),
      {
        encoding: 'utf-8',
      },
    );
    return await ejs.render(template, data);
  }
}
