/**
 * Define schema for admins collection
 *
 * @schema Admin
 * @field {String} fullname - admin's fullname
 * @field {String} email - admin's email
 * @field {String} password - admin's encrypted password
 * @field {ObjectId[]} roles - admin's date of birth
 * @field {Date} lastLogin - last login
 *
 * Timestamp flag should enable for this schema
 */

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Admin {
  @Prop({ type: String, required: true })
  fullname: string;

  @Prop({ type: String, required: true })
  email: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: Boolean, default: false, required: true })
  isRoot: boolean;

  @Prop({ type: Date, required: false })
  lastLogin?: Date;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
