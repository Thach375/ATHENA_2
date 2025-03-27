import { AppObject } from '@constants/object';
import { MongooseRepository } from '@database/mongoose.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Major } from './major.schema';

export class MajorRepository extends MongooseRepository<Major> {
  constructor(
    @InjectModel(AppObject.COLLECTIONS.MAJOR)
    private readonly majorModel: Model<Major>,
  ) {
    super(majorModel);
  }
}
