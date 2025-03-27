import { Module } from '@nestjs/common';
import { MongooseModule, MongooseModuleFactoryOptions } from '@nestjs/mongoose';
import { AppConfig, AppConfigModule } from 'src/configs';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (appConfig: AppConfig): MongooseModuleFactoryOptions =>
        appConfig.getMongooseConfig(),
      inject: [AppConfig],
      imports: [AppConfigModule],
    }),
  ],
})
export class DatabaseModule {}
