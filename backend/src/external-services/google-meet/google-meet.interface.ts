import { DynamicModule, Type } from '@nestjs/common';

export interface GoogleMeetModuleAsyncOptions {
  useFactory: (
    ...args: any[]
  ) => Promise<GoogleMeetOptions> | GoogleMeetOptions;
  imports?: Promise<DynamicModule>[] | DynamicModule[] | Type<any>[];
  inject?: any[];
}

export interface GoogleMeetOptions {
  clientId: string;
  clientSecret: string;
  refreshToken: string;
}
