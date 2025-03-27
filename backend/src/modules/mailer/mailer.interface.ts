import { DynamicModule, Type } from '@nestjs/common';
import Mail from 'nodemailer/lib/mailer';
import { Options } from 'nodemailer/lib/smtp-transport';

export interface MailerModuleAsyncOptions extends MailerModuleOptions {
  useFactory?: (...args: any[]) => Promise<MailerOptions> | MailerOptions;
}

export enum MailerType {
  GMAIL = 'gmail',
  MAILGUN = 'mailgun',
}

export interface MailerOptions {
  type: MailerType;
  configs: MailGunOptions | TransporterOptions;
}

export interface MailGunOptions {
  auth: {
    api_key: string;
    domain: string;
  };
}

export interface MailerModuleOptions {
  imports?: Promise<DynamicModule>[] | DynamicModule[] | Type<any>[];
  inject?: any[];
  useValue?: TransporterOptions;
}

export interface ISendMailParams {
  options: Mail.Options;
  template?: {
    name: string;
    data: any;
  };
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface TransporterOptions extends Options {}
