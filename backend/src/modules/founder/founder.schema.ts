import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: false })
export class Founder {
  @Prop({ type: String, required: false })
  fullName: string;

  @Prop({ type: String, required: false })
  title: string;

  @Prop({ type: String, required: false })
  bio: string;

  @Prop({ type: String, required: false })
  avatar: string;
}

export const FounderSchema = SchemaFactory.createForClass(Founder);
