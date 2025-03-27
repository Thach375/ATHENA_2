import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Major {
  @Prop({ type: String, required: true })
  name: string;
}

export const MajorSchema = SchemaFactory.createForClass(Major);
