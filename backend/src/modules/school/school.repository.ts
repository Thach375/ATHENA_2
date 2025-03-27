import { AppObject } from '@constants/object';
import { MongooseRepository } from '@database/mongoose.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { School } from './school.schema';

export class SchoolRepository extends MongooseRepository<School> {
  constructor(
    @InjectModel(AppObject.COLLECTIONS.SCHOOL)
    private readonly schoolModel: Model<School>,
  ) {
    super(schoolModel);
  }
}
