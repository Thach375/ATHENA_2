import { AppObject } from '@constants/object';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class SchedulerProfile {
  @Prop({ type: mongoose.Types.ObjectId, ref: AppObject.COLLECTIONS.MENTOR })
  mentorId: mongoose.Types.ObjectId;

  @Prop({ type: mongoose.Types.ObjectId, ref: AppObject.COLLECTIONS.USER })
  userId: mongoose.Types.ObjectId;

  @Prop({ type: String, required: false })
  primaryGoals: string;

  @Prop({ type: String, required: false })
  curriculumVitae: string;

  @Prop({ type: String, required: false })
  concernCriteria: string;

  @Prop({ type: String, required: false })
  frequency: string;

  @Prop({ type: String, required: false })
  additionInfo: string;

  @Prop({ type: String, required: false })
  pricingPlan: string;
}

export const SchedulerProfileSchema =
  SchemaFactory.createForClass(SchedulerProfile);
