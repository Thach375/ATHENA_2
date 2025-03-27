import { AppObject } from '@constants/object';
import { MongooseRepository } from '@database/mongoose.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin } from './admin.schema';

export class AdminRepository extends MongooseRepository<Admin> {
  constructor(
    @InjectModel(AppObject.COLLECTIONS.ADMIN)
    private readonly adminModel: Model<Admin>,
  ) {
    super(adminModel);
  }
}
