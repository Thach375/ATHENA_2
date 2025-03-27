import { SchedulerStatus } from '@constants/enum';
import { AppObject } from '@constants/object';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Scheduler {
  @Prop({ type: mongoose.Types.ObjectId, ref: AppObject.COLLECTIONS.MENTOR })
  mentorId: mongoose.Types.ObjectId;

  @Prop({ type: mongoose.Types.ObjectId, ref: AppObject.COLLECTIONS.USER })
  userId: mongoose.Types.ObjectId;

  @Prop({ type: Date, required: true })
  requestStartTime: Date;

  @Prop({ type: Date, required: true })
  requestEndTime: Date;

  @Prop({ type: Number, required: true })
  userCredits: number;

  @Prop({ type: Date, required: false })
  actualStartTime: Date;

  @Prop({
    type: mongoose.Types.ObjectId,
    required: false,
    ref: AppObject.COLLECTIONS.MENTOR_CALENDAR,
  })
  mentorCalendar: mongoose.Types.ObjectId;

  @Prop({ type: String, required: false })
  calendarUri?: string;

  @Prop({ type: Date, required: false })
  actualEndTime: Date;

  @Prop({ type: Date, required: false })
  lastFreezeTime: Date;

  @Prop({
    type: String,
    enum: SchedulerStatus,
    default: SchedulerStatus.PENDING,
  })
  status: SchedulerStatus;

  @Prop({
    type: mongoose.Types.ObjectId,
    required: false,
    ref: AppObject.COLLECTIONS.SCHEDULER_PROFILE,
  })
  schedulerProfile: string;

  @Prop({
    type: String,
    required: false,
  })
  googleMeetConference: string;

  @Prop({
    type: String,
    required: false,
  })
  googleMeetSpace: string;

  @Prop({
    type: String,
    required: false,
  })
  googleMeetUri: string;
}

export const SchedulerSchema = SchemaFactory.createForClass(Scheduler);
