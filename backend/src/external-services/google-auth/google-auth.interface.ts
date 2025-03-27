import { DynamicModule, Type } from '@nestjs/common';

export interface GoogleAuthModuleAsyncOptions {
  useFactory: (
    ...args: any[]
  ) => Promise<GoogleAuthConnectOptions> | GoogleAuthConnectOptions;
  imports?: Promise<DynamicModule>[] | DynamicModule[] | Type<any>[];
  inject?: any[];
}

export interface GoogleAuthConnectOptions {
  credentials: {
    path: string;
  };
  projectId?: string;
}
