/**
 * Define schema for users collection
 *
 * @schema User
 * @field {String} fullname - user's fullname
 * @field {String} email - user's email
 * @field {String} password - user's encrypted password
 * @field {Date} dateOfBirth - user's date of birth
 * @field {Date} lastLogin - last login
 *
 * Timestamp flag should enable for this schema
 */

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Scholarship {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: false })
  banner: string;

  @Prop({ type: mongoose.Types.ObjectId, required: false })
  school?: string;

  @Prop({ type: Date, required: true })
  beginTime: Date;

  @Prop({ type: Date, required: true })
  endTime: Date;

  @Prop({ type: Number, required: false })
  discount: number;

  @Prop({ type: [String], required: true })
  criteria?: string[];

  @Prop({ type: String, required: false })
  description: string;

  @Prop({ type: String, required: true })
  content: string;
}

export const ScholarshipSchema = SchemaFactory.createForClass(Scholarship);
