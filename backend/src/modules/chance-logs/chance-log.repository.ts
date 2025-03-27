import { AppObject } from '@constants/object';
import { MongooseRepository } from '@database/mongoose.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChanceLog } from './chance-log.schema';

export class ChanceLogRepository extends MongooseRepository<ChanceLog> {
  constructor(
    @InjectModel(AppObject.COLLECTIONS.CHANCE_LOGS)
    private readonly chanceLogModel: Model<ChanceLog>,
  ) {
    super(chanceLogModel);
  }
}
