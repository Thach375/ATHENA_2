import { AppObject } from '@constants/object';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FounderSchema } from './founder.schema';
import { FounderController } from './founder.controller';
import { FounderRepository } from './founder.repository';
import { FounderService } from './founder.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AppObject.COLLECTIONS.FOUNDER, schema: FounderSchema },
    ]),
  ],
  providers: [FounderRepository, FounderService],
  controllers: [FounderController],
})
export class FounderModule {}
