import { AppObject } from '@constants/object';
import { MongooseRepository } from '@database/mongoose.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';

export class UserRepository extends MongooseRepository<User> {
  constructor(
    @InjectModel(AppObject.COLLECTIONS.USER)
    private readonly userModel: Model<User>,
  ) {
    super(userModel);
  }
}
