import { AppObject } from '@constants/object';
import { DynamicModule, Module, Provider } from '@nestjs/common';
import { OpenAiModuleAsyncOptions } from './open-ai.interface';
import { OpenAiService } from './open-ai.service';

/**
 * Register external module for GM ( Google Meet ) service
 * This is dynamic module to custom GM's config, more about dynamic module: https://docs.nestjs.com/fundamentals/dynamic-modules
 */

@Module({})
export class OpenAiModule {
  /**
   * Registers the GM module asynchronously.
   * @param options Options for asynchronous registration.
   * @returns Dynamic module containing GM service and provider.
   */
  static registerAsync(options: OpenAiModuleAsyncOptions): DynamicModule {
    const openAiProvider = this._createProvider(options);

    return {
      module: OpenAiModule,
      providers: [openAiProvider, OpenAiService],
      imports: options.imports,
      exports: [openAiProvider, OpenAiService],
    };
  }

  /**
   * Creates a provider for GM based on the provided options.
   * @param options Options for GA registration.
   * @returns Provider object for GM.
   */
  private static _createProvider(options: OpenAiModuleAsyncOptions): Provider {
    return {
      provide: AppObject.APP_PROVIDERS.OPEN_AI,
      useFactory: options.useFactory,
      inject: options.inject,
    };
  }
}
