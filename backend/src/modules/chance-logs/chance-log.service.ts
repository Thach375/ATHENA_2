import { Injectable } from '@nestjs/common';
import { ChanceLogRepository } from './chance-log.repository';
import mongoose from 'mongoose';
import { ChanceLog } from './chance-log.schema';

@Injectable()
export class ChanceLogService {
  constructor(private readonly chanceLogRepository: ChanceLogRepository) {}

  public async removeAllLog(userId: string): Promise<void> {
    await this.chanceLogRepository.model.deleteMany({
      user: new mongoose.Types.ObjectId(userId),
    });
  }

  public async reverseAllLog(userId: string): Promise<ChanceLog[]> {
    const chanceLogs = await this.chanceLogRepository.model.find({
      user: new mongoose.Types.ObjectId(userId),
      expiredAt: { $gte: new Date() },
    });

    return chanceLogs;
  }

  public async reverseLog(
    userId: string,
    schoolId: string,
  ): Promise<ChanceLog> {
    const chanceLog = await this.chanceLogRepository.model.findOne({
      user: new mongoose.Types.ObjectId(userId),
      school: new mongoose.Types.ObjectId(schoolId),
      expiredAt: { $gte: new Date() },
    });

    return chanceLog;
  }

  public async saveLog(params: {
    userId: string;
    schoolId: string;
    chanceScore: string;
  }): Promise<void> {
    const expiredAt = new Date();
    expiredAt.setDate(expiredAt.getDate() + 7);

    const chanceLog = await this.chanceLogRepository.model.create({
      user: new mongoose.Types.ObjectId(params.userId),
      school: new mongoose.Types.ObjectId(params.schoolId),
      chanceScore: params.chanceScore,
      expiredAt: expiredAt,
    });

    await chanceLog.save();
  }

  public async expireLog(userId: string): Promise<void> {
    const chanceLogs = await this.chanceLogRepository.model.find({
      user: new mongoose.Types.ObjectId(userId),
      expiredAt: { $gte: new Date() },
    });

    for (const log of chanceLogs) {
      await this.chanceLogRepository.model.updateOne(
        {
          _id: log._id,
        },
        { expiredAt: new Date() },
      );
    }
  }
}
