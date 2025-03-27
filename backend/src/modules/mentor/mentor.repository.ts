import { AppObject } from '@constants/object';
import { MongooseRepository } from '@database/mongoose.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Mentor } from './mentor.schema';

export class MentorRepository extends MongooseRepository<Mentor> {
  constructor(
    @InjectModel(AppObject.COLLECTIONS.MENTOR)
    private readonly mentorModel: Model<Mentor>,
  ) {
    super(mentorModel);
  }
}
