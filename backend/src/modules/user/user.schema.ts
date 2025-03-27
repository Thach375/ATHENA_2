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

import { PricingPlan } from '@constants/enum';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class User {
  @Prop({ type: String, required: false })
  fullname?: string;

  @Prop({ type: String, required: false })
  phone?: string;

  @Prop({ type: String, required: true })
  email: string;

  @Prop({ type: String, required: false })
  password?: string;

  @Prop({ type: Number, required: false, default: 1 })
  status?: number;

  @Prop({ type: Number, required: false, default: 0 })
  credits?: number;

  @Prop({ type: String, required: false })
  paymentCode?: string;

  @Prop({ type: String, required: false })
  pricingPlan?: PricingPlan;

  @Prop({ type: Date, required: false })
  dateOfBirth?: Date;

  @Prop({ type: String, required: false })
  address?: string;

  @Prop({ type: Date, required: false })
  lastLogin?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
