import { AppObject } from '@constants/object';
import { MongooseRepository } from '@database/mongoose.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SchedulerProfile } from './scheduler-profile.schema';

export class SchedulerProfileRepository extends MongooseRepository<SchedulerProfile> {
  constructor(
    @InjectModel(AppObject.COLLECTIONS.SCHEDULER_PROFILE)
    private readonly SchedulerProfileModel: Model<SchedulerProfile>,
  ) {
    super(SchedulerProfileModel);
  }
}
