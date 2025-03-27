import { AppObject } from '@constants/object';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class MentorCalendar {
  @Prop({
    type: mongoose.Types.ObjectId,
    required: true,
    ref: AppObject.COLLECTIONS.MENTOR,
  })
  mentor: string;

  @Prop({
    type: mongoose.Types.ObjectId,
    required: false,
    ref: AppObject.COLLECTIONS.USER,
  })
  user: string;

  @Prop({
    type: Date,
    required: true,
  })
  startDate: string;

  @Prop({
    type: Date,
    required: true,
  })
  endDate: string;
}

export const MentorCalendarSchema =
  SchemaFactory.createForClass(MentorCalendar);
