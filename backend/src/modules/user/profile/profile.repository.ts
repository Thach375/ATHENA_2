import { AppObject } from '@constants/object';
import { MongooseRepository } from '@database/mongoose.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Profile } from './profile.schema';

export class ProfileRepository extends MongooseRepository<Profile> {
  constructor(
    @InjectModel(AppObject.COLLECTIONS.PROFILE)
    private readonly profileModel: Model<Profile>,
  ) {
    super(profileModel);
  }
}
