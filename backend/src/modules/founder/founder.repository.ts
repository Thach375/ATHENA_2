import { AppObject } from '@constants/object';
import { MongooseRepository } from '@database/mongoose.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Founder } from './founder.schema';

export class FounderRepository extends MongooseRepository<Founder> {
  constructor(
    @InjectModel(AppObject.COLLECTIONS.FOUNDER)
    private readonly founderModel: Model<Founder>,
  ) {
    super(founderModel);
  }
}
