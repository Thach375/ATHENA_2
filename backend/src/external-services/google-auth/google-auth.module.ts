import { AppObject } from '@constants/object';
import { DynamicModule, Module, Provider } from '@nestjs/common';
import { GoogleAuthModuleAsyncOptions } from './google-auth.interface';
import { GoogleAuthService } from './google-auth.service';

/**
 * Register external module for GA ( Google Auth ) service
 * This is dynamic module to custom GA's config, more about dynamic module: https://docs.nestjs.com/fundamentals/dynamic-modules
 */

@Module({})
export class GoogleAuthModule {
  /**
   * Registers the GA module asynchronously.
   * @param options Options for asynchronous registration.
   * @returns Dynamic module containing GA service and provider.
   */
  static registerAsync(options: GoogleAuthModuleAsyncOptions): DynamicModule {
    const googleCloudProvider = this._createProvider(options);

    return {
      module: GoogleAuthModule,
      providers: [googleCloudProvider, GoogleAuthService],
      imports: options.imports,
      exports: [googleCloudProvider, GoogleAuthService],
    };
  }

  /**
   * Creates a provider for GA based on the provided options.
   * @param options Options for GA registration.
   * @returns Provider object for GA.
   */
  private static _createProvider(
    options: GoogleAuthModuleAsyncOptions,
  ): Provider {
    return {
      provide: AppObject.APP_PROVIDERS.GOOGLE_AUTH,
      useFactory: options.useFactory,
      inject: options.inject,
    };
  }
}
