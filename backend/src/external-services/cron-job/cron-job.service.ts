import { SchedulerService } from '@modules/scheduler/scheduler.service';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class TaskScheduleService {
  constructor(private readonly schedulerService: SchedulerService) {}
  @Cron(CronExpression.EVERY_5_MINUTES)
  async handleEveryMinute(): Promise<void> {
    this.schedulerService.controlMeeting();
  }
}
