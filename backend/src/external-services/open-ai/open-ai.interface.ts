import { DynamicModule, Type } from '@nestjs/common';

export interface OpenAiModuleAsyncOptions {
  useFactory: (...args: any[]) => Promise<OpenAiOptions> | OpenAiOptions;
  imports?: Promise<DynamicModule>[] | DynamicModule[] | Type<any>[];
  inject?: any[];
}

export interface OpenAiOptions {
  apiKey: string;
  models: {
    chances?: string;
  };
}
