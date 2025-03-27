import { Response } from 'express';
import { I18nService } from 'nestjs-i18n';
import { ValidationError } from 'class-validator';
import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { LanguageCode } from 'src/constants';
import httpStatus from 'http-status';

@Catch()
export class ExceptionFilter implements ExceptionFilter {
  constructor(private readonly i18n: I18nService) {}

  async catch(exception: HttpException, host: ArgumentsHost) {
    switch (host.getType()) {
      case 'http':
        return this.handleHttpException(exception, host);
    }
  }

  async handleHttpException(exception, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    if (exception instanceof HttpException) {
      return response
        .status(exception.getStatus())
        .json(await this.getMessage(exception, ctx.getRequest().i18nLang));
    } else {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: exception?.toString(),
        error: 'Internal server error',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }

  async getMessage(exception: HttpException, lang: string) {
    const exceptionResponse = exception.getResponse() as any;
    if (exceptionResponse.message) {
      if (exceptionResponse.message instanceof Array) {
        exceptionResponse.message = await this.translateArray(
          exceptionResponse.message,
          lang,
        );
      } else if (typeof exceptionResponse.message === 'string') {
        exceptionResponse.message = await this.i18n.translate(
          exceptionResponse.message,
          {
            lang: lang,
          },
        );
      }
      return {
        statusCode: exception.getStatus(),
        message: exceptionResponse.message || exceptionResponse,
      };
    } else {
      exceptionResponse.message = httpStatus[exception.getStatus()];
    }
    return {
      statusCode: exception.getStatus(),
      message: exceptionResponse,
    };
  }

  async translateArray(errors: any[], lang: string) {
    const data = [];
    for (let i = 0; i < errors.length; i++) {
      const item = errors[i];
      if (typeof item === 'string') {
        data.push(await this.i18n.translate(item, { lang: lang }));
        continue;
      } else if (item instanceof ValidationError) {
        await this.getValidateErrorMessages(item, data, lang);
        continue;
      }
      data.push(item);
    }
    return data;
  }

  async getValidateErrorMessages(
    node: ValidationError,
    data,
    lang: string = LanguageCode.EN,
  ) {
    if (node.constraints) {
      const message = await Promise.all(
        Object.values(node.constraints).map(
          async (value: string) =>
            await this.i18n.translate(value, { lang: lang }),
        ),
      );
      data.push({ field: node.property, message: message });
    }
    if (node.children && node.children.length !== 0) {
      node.children.forEach((item) => {
        this.getValidateErrorMessages(item, data, lang);
      });
    } else {
      return data;
    }
  }
}
