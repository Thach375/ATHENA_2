import { AppObject } from '@constants/object';
import { MongooseRepository } from '@database/mongoose.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Scheduler } from './scheduler.schema';

export class SchedulerRepository extends MongooseRepository<Scheduler> {
  constructor(
    @InjectModel(AppObject.COLLECTIONS.SCHEDULER)
    private readonly schedulerModel: Model<Scheduler>,
  ) {
    super(schedulerModel);
  }
}
