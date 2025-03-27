import { AppObject } from '@constants/object';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Timestamp } from 'typeorm';

@Schema({ timestamps: false })
export class ChanceLog {
  @Prop({ type: mongoose.Types.ObjectId, ref: AppObject.COLLECTIONS.USER })
  user: mongoose.Types.ObjectId;

  @Prop({ type: mongoose.Types.ObjectId, ref: AppObject.COLLECTIONS.SCHOOL })
  school: mongoose.Types.ObjectId;

  @Prop({ type: Timestamp, required: true })
  expiredAt: Date;

  @Prop({ type: String, required: true })
  chanceScore: string;
}

export const ChanceLogSchema = SchemaFactory.createForClass(ChanceLog);
