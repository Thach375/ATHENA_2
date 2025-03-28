import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppConfig } from './app.config';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './config/.env',
      isGlobal: true,
    }),
  ],
  providers: [ConfigService, AppConfig],
  exports: [ConfigService, AppConfig],
})
export class AppConfigModule {}
