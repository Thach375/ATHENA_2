import { AppObject } from '@constants/object';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScholarshipSchema } from './scholarship.schema';
import { ScholarshipService } from './scholarship.service';
import { ScholarshipRepository } from './scholarship.repository';
import { ScholarshipController } from './scholarship.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AppObject.COLLECTIONS.SCHOLARSHIP, schema: ScholarshipSchema },
    ]),
  ],
  providers: [ScholarshipService, ScholarshipRepository],
  exports: [ScholarshipService],
  controllers: [ScholarshipController],
})
export class ScholarshipModule {}
