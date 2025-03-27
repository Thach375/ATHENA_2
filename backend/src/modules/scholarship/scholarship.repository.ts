import { AppObject } from '@constants/object';
import { MongooseRepository } from '@database/mongoose.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Scholarship } from './scholarship.schema';

export class ScholarshipRepository extends MongooseRepository<Scholarship> {
  constructor(
    @InjectModel(AppObject.COLLECTIONS.SCHOLARSHIP)
    private readonly scholarshipModel: Model<Scholarship>,
  ) {
    super(scholarshipModel);
  }
}
