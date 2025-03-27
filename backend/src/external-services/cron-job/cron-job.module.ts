import { SchedulerModule } from '@modules/scheduler/scheduler.module';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TaskScheduleService } from './cron-job.service';

@Module({
  imports: [ScheduleModule.forRoot(), SchedulerModule],
  providers: [TaskScheduleService],
})
export class TaskScheduleModule {}
