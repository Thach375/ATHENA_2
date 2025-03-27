import { SocialPlatform } from '@constants/enum';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: false, _id: false })
export class Social {
  @Prop({
    type: String,
    enum: SocialPlatform,
    default: SocialPlatform.LINKED_IN,
  })
  name: string;

  @Prop({ type: String, required: false })
  link: string;
}

@Schema({ timestamps: true })
export class Mentor {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: false })
  email: string;

  @Prop({ type: String, required: false })
  position: string;

  @Prop({ type: String, required: false })
  avatar: string;

  @Prop({ type: [Social], required: false })
  socials: Social[];

  @Prop({ type: String, required: false })
  nationality: string;

  @Prop({ type: String, required: false })
  agency: string;

  @Prop({ type: String, required: false })
  school: string;

  @Prop({ type: String, required: false })
  about: string;

  @Prop({ type: String, required: false })
  skills: string;

  @Prop({ type: Number, required: true, default: 20 })
  pricing: number;

  @Prop({ type: [String], required: true })
  majors: string[];
}

export const MentorSchema = SchemaFactory.createForClass(Mentor);
