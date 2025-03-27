import { DatabaseModule } from '@database/mongoose.module';
import { AdminModule } from '@modules/admin/admin.module';
import { AuthModule } from '@modules/auth/auth.module';
import { MailerModule } from '@modules/mailer/mailer.module';
import { MentorModule } from '@modules/mentor/mentor.module';
import { SchedulerModule } from '@modules/scheduler/scheduler.module';
import { ScholarshipModule } from '@modules/scholarship/scholarship.module';
import { SchoolModule } from '@modules/school/school.module';
import { UploadModule } from '@modules/upload/upload.module';
import { UserModule } from '@modules/user/user.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { I18nService } from 'nestjs-i18n';
import * as path from 'path';
import { AppConfig, AppConfigModule } from 'src/configs';
import { TaskScheduleModule } from './external-services/cron-job/cron-job.module';
import { ExceptionFilter } from './filters/exception.filter';
import I18nModuleConfig from './i18n';
import { HealthCheckerModule } from './modules/health-checker/health-checker.module';
import { FounderModule } from '@modules/founder/founder.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: path.join(__dirname, `../config/.env`),
      isGlobal: true,
    }),
    MailerModule.registerAsync({
      imports: [AppConfigModule],
      inject: [AppConfig],
      useFactory: (appConfig: AppConfig) => {
        return appConfig.getMailerConfig();
      },
    }),
    AppConfigModule,
    I18nModuleConfig,
    HealthCheckerModule,
    DatabaseModule,
    AuthModule,
    UserModule,
    AdminModule,
    SchoolModule,
    MentorModule,
    FounderModule,
    ScholarshipModule,
    UploadModule,
    SchedulerModule,
    TaskScheduleModule,
  ],
  exports: [],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useFactory: (i18n: I18nService) => {
        return new ExceptionFilter(i18n);
      },
      inject: [I18nService],
    },
  ],
})
export class AppModule {}
