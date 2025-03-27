import { AppObject } from '@constants/object';
import { DynamicModule, Module, Provider } from '@nestjs/common';
import { GoogleMeetModuleAsyncOptions } from './google-meet.interface';
import { GoogleMeetService } from './google-meet.service';

/**
 * Register external module for GM ( Google Meet ) service
 * This is dynamic module to custom GM's config, more about dynamic module: https://docs.nestjs.com/fundamentals/dynamic-modules
 */

@Module({})
export class GoogleMeetModule {
  /**
   * Registers the GM module asynchronously.
   * @param options Options for asynchronous registration.
   * @returns Dynamic module containing GM service and provider.
   */
  static registerAsync(options: GoogleMeetModuleAsyncOptions): DynamicModule {
    const googleMeetProvider = this._createProvider(options);

    return {
      module: GoogleMeetModule,
      providers: [googleMeetProvider, GoogleMeetService],
      imports: options.imports,
      exports: [googleMeetProvider, GoogleMeetService],
    };
  }

  /**
   * Creates a provider for GM based on the provided options.
   * @param options Options for GA registration.
   * @returns Provider object for GM.
   */
  private static _createProvider(
    options: GoogleMeetModuleAsyncOptions,
  ): Provider {
    return {
      provide: AppObject.APP_PROVIDERS.GOOGLE_MEET,
      useFactory: options.useFactory,
      inject: options.inject,
    };
  }
}
