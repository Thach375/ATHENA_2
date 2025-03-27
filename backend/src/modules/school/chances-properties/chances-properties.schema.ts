import { AppObject } from '@constants/object';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ _id: false })
export class GPAProperty {
  @Prop({ type: Number, required: true })
  wt: number;

  @Prop({ type: [Number], required: true })
  gpa: number[];
}

@Schema({ _id: false })
export class CourseworkProperty {
  @Prop({ type: Number, required: true })
  wt: number;

  @Prop({ type: [Number], required: true })
  cw: number[];
}

@Schema({ _id: false })
export class TestScoreProperty {
  @Prop({ type: Number, required: true })
  wt: number;

  @Prop({ type: Number, required: true })
  iwt: number;

  @Prop({ type: Number, required: true })
  twt: number;

  @Prop({ type: [Number], required: true })
  test: number[];
}

@Schema({ _id: false })
export class ExtracurricularProperty {
  @Prop({ type: Number, required: true })
  wt: number;

  @Prop({ type: Number, required: true })
  numWt: number;

  @Prop({ type: Number, required: true })
  levelWt: number;

  @Prop({ type: [Number], required: true })
  ex: number[];
}

@Schema({ timestamps: true })
export class ChancesProperty {
  @Prop({ type: mongoose.Types.ObjectId, ref: AppObject.COLLECTIONS.SCHOOL })
  school: mongoose.Types.ObjectId;

  @Prop({ type: GPAProperty, required: true })
  gpa: GPAProperty;

  @Prop({ type: CourseworkProperty, required: true })
  courseworks: CourseworkProperty;

  @Prop({ type: TestScoreProperty, required: true })
  testscores: TestScoreProperty;

  @Prop({ type: ExtracurricularProperty, required: true })
  extracurriculars: ExtracurricularProperty;

  @Prop({ type: Number, required: true })
  bonus: number;
}

export const ChancesPropertySchema =
  SchemaFactory.createForClass(ChancesProperty);
