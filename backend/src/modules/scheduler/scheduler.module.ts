import { Module } from '@nestjs/common';
import { SchedulerService } from './scheduler.service';
import { SchedulerController } from './scheduler.controller';
import { GoogleMeetModule } from 'src/external-services/google-meet/google-meet.module';
import { AppConfig, AppConfigModule } from 'src/configs';
import { SchedulerRepository } from './scheduler.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { AppObject } from '@constants/object';
import { SchedulerSchema } from './scheduler.schema';
import { UserModule } from '@modules/user/user.module';
import { SchedulerProfileSchema } from './scheduler-profile/scheduler-profile.schema';
import { MentorModule } from '@modules/mentor/mentor.module';
import { SchedulerProfileRepository } from './scheduler-profile/scheduler-profile.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AppObject.COLLECTIONS.SCHEDULER, schema: SchedulerSchema },
      {
        name: AppObject.COLLECTIONS.SCHEDULER_PROFILE,
        schema: SchedulerProfileSchema,
      },
    ]),
    GoogleMeetModule.registerAsync({
      useFactory: (appConfig: AppConfig) => {
        return appConfig.getGoogleMeetConfig();
      },
      imports: [AppConfigModule],
      inject: [AppConfig],
    }),
    UserModule,
    MentorModule,
  ],
  exports: [SchedulerService],
  controllers: [SchedulerController],
  providers: [
    SchedulerService,
    SchedulerRepository,
    SchedulerProfileRepository,
  ],
})
export class SchedulerModule {}
