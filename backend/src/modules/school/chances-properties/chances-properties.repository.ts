import { AppObject } from '@constants/object';
import { MongooseRepository } from '@database/mongoose.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChancesProperty } from './chances-properties.schema';

export class ChancesPropRepository extends MongooseRepository<ChancesProperty> {
  constructor(
    @InjectModel(AppObject.COLLECTIONS.CHANCES_PROPERTY)
    private readonly chancesPropModel: Model<ChancesProperty>,
  ) {
    super(chancesPropModel);
  }
}
