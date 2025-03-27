import { AppObject } from '@constants/object';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChanceLogRepository } from './chance-log.repository';
import { ChanceLogSchema } from './chance-log.schema';
import { ChanceLogService } from './chance-log.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AppObject.COLLECTIONS.CHANCE_LOGS, schema: ChanceLogSchema },
    ]),
  ],
  providers: [ChanceLogRepository, ChanceLogService],
  exports: [ChanceLogService],
})
export class ChanceLogModule {}
