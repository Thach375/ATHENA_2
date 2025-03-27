import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class School {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  address: string;

  @Prop({ type: String, required: true })
  country: string;

  @Prop({ type: String, required: false })
  image: string;

  @Prop({ type: String, required: false })
  banner: string;

  @Prop({ type: Number, required: false })
  undergrads?: number;

  @Prop({ type: String, required: true })
  description?: string;

  @Prop({ type: Number, required: false })
  cost?: number;

  @Prop({ type: [String], required: false })
  majors?: string[];

  @Prop({ type: String, required: false })
  type?: string;
}

export const SchoolSchema = SchemaFactory.createForClass(School);
