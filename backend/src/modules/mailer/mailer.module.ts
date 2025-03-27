import { AppObject } from '@constants/object';
import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import {
  MailerModuleAsyncOptions,
  MailerModuleOptions,
} from './mailer.interface';
import { MailerService } from './mailer.service';

@Global()
@Module({})
export class MailerModule {
  static registerAsync(options: MailerModuleAsyncOptions): DynamicModule {
    const providers: any[] = [MailerService];

    if (options.useFactory) {
      providers.push(...this.createProviders(options));
    }

    return {
      module: MailerModule,
      providers: providers,
      imports: options.imports,
      exports: providers,
    };
  }

  static register(options: MailerModuleOptions): DynamicModule {
    const providers: any[] = [MailerService];

    if (options.useValue) {
      providers.push(...this.createProviders(options));
    }

    return {
      module: MailerModule,
      providers: providers,
      imports: options?.imports || [],
      exports: providers,
    };
  }

  private static createProviders(options): Provider[] {
    return [
      {
        provide: AppObject.APP_PROVIDERS.GOOGLE_MAIL,
        useFactory: options.useFactory,
        useValue: options.useValue,
        inject: options.inject,
      },
    ];
  }
}
