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

import { EnglishProficiencyType, Gender, IBExamLevel } from '@constants/enum';
import { AppObject } from '@constants/object';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

/**
 * SECTION: BASIC INFORMATION
 */
@Schema({ timestamps: false, _id: false })
export class BasicInformation {
  @Prop({ type: String, required: false })
  firstname: string;

  @Prop({ type: String, required: false })
  lastname: string;

  @Prop({ type: String, required: false })
  gender: string;

  @Prop({ type: String, required: false })
  nationality: string;

  @Prop({ type: Date, required: false })
  dateOfBirth: Date;

  // @Prop({ type: Number, required: true })
  // graduateHighSchoolAt: number;

  // @Prop({ type: [String], required: false })
  // consideringSchools?: string[];

  // @Prop({ type: String, required: false })
  // firstSemesterPlan?: string;
}

/**
 * END
 */

/**
 * SECTION: DEMOGRAPHICS
 */
@Schema({ timestamps: false, _id: false })
export class Demographics {
  @Prop({ type: String, required: true })
  country: string;

  @Prop({ type: String, required: true })
  city: string;

  @Prop({ type: String, required: true })
  nationality: string;

  @Prop({ type: String, enum: Gender, default: Gender.MALE })
  gender: string;

  @Prop({ type: String, required: false })
  collegeBudget?: string;

  @Prop({ type: Boolean, required: false })
  seekingScholarship?: boolean;

  @Prop({ type: String, required: false })
  highSchool?: string;

  @Prop({ type: String, required: true })
  intendedMajor?: string;
}
/**
 * END
 */

/**
 * SECTION: TESTSCORES
 */
@Schema({ timestamps: false, _id: false })
export class SATScore {
  @Prop({ type: Number, required: true })
  math: number;

  @Prop({ type: Number, required: true })
  reading: number;
}

@Schema({ timestamps: false, _id: false })
export class APExam {
  @Prop({ type: String, required: true })
  subject: string;

  @Prop({ type: Number, required: true })
  score: number;
}

@Schema({ timestamps: false, _id: false })
export class IBExam {
  @Prop({
    type: String,
    enum: IBExamLevel,
    required: true,
    default: IBExamLevel.SL,
  })
  level: IBExamLevel;

  @Prop({ type: String, required: false })
  takeMonth: string;

  @Prop({ type: String, required: false })
  takeYear: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: Number, required: true })
  score: number;
}

@Schema({ timestamps: false, _id: false })
export class PSATScore {
  @Prop({ type: Number, required: true })
  math: number;

  @Prop({ type: Number, required: true })
  readingAndWriting: number;
}

@Schema({ timestamps: false, _id: false })
export class ACTScore {
  @Prop({ type: Number, required: true })
  math: number;

  @Prop({ type: Number, required: true })
  reading: number;

  @Prop({ type: Number, required: true })
  english: number;

  @Prop({ type: Number, required: true })
  science: number;
}

@Schema({ timestamps: false, _id: false })
export class IELTS {
  @Prop({ type: Number, required: true })
  listening: number;

  @Prop({ type: Number, required: true })
  reading: number;

  @Prop({ type: Number, required: true })
  writing: number;

  @Prop({ type: Number, required: true })
  speaking: number;

  @Prop({ type: Number, required: true })
  overall: number;
}

@Schema({ timestamps: false, _id: false })
export class TOEFLiBT {
  @Prop({ type: Number, required: true })
  listening: number;

  @Prop({ type: Number, required: true })
  reading: number;

  @Prop({ type: Number, required: true })
  writing: number;

  @Prop({ type: Number, required: true })
  speaking: number;

  @Prop({ type: Number, required: true })
  overall: number;
}

@Schema({ timestamps: false, _id: false })
export class DuolingoEnglishTest {
  @Prop({ type: Number, required: true })
  literacy: number;

  @Prop({ type: Number, required: true })
  conversation: number;

  @Prop({ type: Number, required: true })
  comprehension: number;

  @Prop({ type: Number, required: true })
  production: number;

  @Prop({ type: Number, required: true })
  overall: number;
}

@Schema({ timestamps: false, _id: false })
export class TOEFLPaper {
  @Prop({ type: Number, required: true })
  listening: number;

  @Prop({ type: Number, required: true })
  reading: number;

  @Prop({ type: Number, required: true })
  writing: number;

  @Prop({ type: Number, required: true })
  overall: number;
}

@Schema({ timestamps: false, _id: false })
export class PTE {
  @Prop({ type: Number, required: true })
  listening: number;

  @Prop({ type: Number, required: true })
  reading: number;

  @Prop({ type: Number, required: true })
  writing: number;

  @Prop({ type: Number, required: true })
  speaking: number;

  @Prop({ type: Number, required: true })
  grammar: number;

  @Prop({ type: Number, required: true })
  oralFluency: number;

  @Prop({ type: Number, required: true })
  pronunciation: number;

  @Prop({ type: Number, required: true })
  spelling: number;

  @Prop({ type: Number, required: true })
  vocabulary: number;

  @Prop({ type: Number, required: true })
  writtenDiscourse: number;

  @Prop({ type: Number, required: true })
  overall: number;
}

@Schema({ timestamps: false, _id: false })
export class TestScores {
  @Prop({ type: SATScore, required: false })
  SATScore?: SATScore;

  @Prop({ type: ACTScore, required: false })
  ACTScore?: ACTScore;

  @Prop({ type: PSATScore, required: false })
  PSATScore?: PSATScore;

  @Prop({ type: [APExam], required: false })
  APExams?: APExam[];

  @Prop({ type: [IBExam], required: false })
  IBExams?: IBExam[];

  @Prop({ type: String, required: false })
  englishTakeMonth?: string;

  @Prop({ type: String, required: false })
  englishTakeYear?: string;

  @Prop({ type: String, required: false })
  englishTakeTryTime?: string;

  @Prop({ type: Boolean, required: false })
  isEnglishProficiencyPlan: boolean;

  @Prop({
    type: String,
    enum: EnglishProficiencyType,
    required: false,
  })
  englishProficiencyType?: EnglishProficiencyType;

  @Prop({
    type: mongoose.Schema.Types.Mixed,
    required: false,
  })
  englishProficiency: IELTS | PTE | TOEFLPaper | DuolingoEnglishTest | TOEFLiBT;
}
/**
 * SECTION: END
 */

/**
 * SECTION: GRADES
 */
@Schema({ timestamps: false, _id: false })
export class Grades {
  @Prop({ type: Number, required: true })
  gpa: number;

  @Prop({ type: Number, required: true })
  coefficient: number;
}
/**
 * END
 */

/**
 * SECTION: COURSEWORK
 */
@Schema({ timestamps: false, _id: false })
export class Courseworks {
  @Prop({ type: Number, required: false })
  honors: number;

  @Prop({ type: Number, required: false })
  collegeCourse: number;

  @Prop({ type: Number, required: false })
  schoolAP: number;

  @Prop({ type: Number, required: false })
  AP: number;

  @Prop({ type: Number, required: false })
  IBHL: number;

  @Prop({ type: Number, required: false })
  IBSL: number;

  @Prop({ type: Number, required: false })
  GCSE_IGCSE: number;

  @Prop({ type: Number, required: false })
  AICE: number;

  @Prop({ type: Number, required: false })
  CBSE: number;
}
/**
 * END
 */

/**
 * SECTION: Extracurriculars
 */
@Schema({ timestamps: false, _id: false })
export class Activity {
  @Prop({ type: String, required: true })
  major: string;

  @Prop({ type: Number, required: true })
  level: number;
}

@Schema({ timestamps: false, _id: false })
export class Extracurriculars {
  @Prop({ type: [Activity], required: false })
  activities: Activity[];
}
/**
 * END
 */

/**
 * Profile v2
 */

@Schema({ timestamps: false, _id: false })
export class OutstandingSubjectScores {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: Number, required: true })
  score: number;
}

@Schema({ timestamps: false, _id: false })
export class Certificate {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: Number, required: true })
  score: number;
}

@Schema({ timestamps: false, _id: false })
export class ScoresAndCertificates {
  @Prop({ type: String, required: false })
  universityCountry: string;

  @Prop({ type: String, required: false })
  university: string;

  @Prop({ type: String, required: false })
  major: string;

  @Prop({ type: Number, required: false })
  gpa: number;

  @Prop({ type: [Certificate], required: false })
  certificates: Certificate[];

  @Prop({ type: [OutstandingSubjectScores], required: false })
  outstandingSubjects: OutstandingSubjectScores[];

  @Prop({ type: String, required: false })
  englishTakeMonth?: string;

  @Prop({ type: String, required: false })
  englishTakeYear?: string;

  @Prop({ type: String, required: false })
  englishTakeTryTime?: string;

  @Prop({ type: Boolean, required: false })
  isEnglishProficiencyPlan: boolean;

  @Prop({
    type: String,
    enum: EnglishProficiencyType,
    required: false,
  })
  englishProficiencyType?: EnglishProficiencyType;

  @Prop({
    type: mongoose.Schema.Types.Mixed,
    required: false,
  })
  englishProficiency: IELTS | PTE | TOEFLPaper | DuolingoEnglishTest | TOEFLiBT;
}

@Schema({ timestamps: false, _id: false })
export class WorkExperiences {
  @Prop({ type: String, required: true })
  jobSpec: string;

  @Prop({ type: Number, required: true })
  years: number;
}

@Schema({ timestamps: false, _id: false })
export class Experiences {
  @Prop({ type: [WorkExperiences], required: false })
  workExperiences: WorkExperiences[];

  @Prop({ type: String, required: false })
  achievements: string;

  @Prop({ type: [Activity], required: false })
  extracurriculars: Activity[];
}

@Schema({ timestamps: false, _id: false })
export class Aspiration {
  @Prop({ type: [String], required: false })
  intendedUniversities: string[];

  @Prop({ type: String, required: false })
  intendedMajor: string;

  @Prop({ type: String, required: false })
  scholarship: string;

  @Prop({ type: String, required: false })
  startFirstSemester: string;

  @Prop({ type: String, required: false })
  countryPrioritize: string;

  @Prop({ type: String, required: false })
  budget: string;
}

/**
 * Profile schema
 */
@Schema({ timestamps: true })
export class Profile {
  @Prop({ type: mongoose.Types.ObjectId, ref: AppObject.COLLECTIONS.USER })
  user: mongoose.Types.ObjectId;

  @Prop({ type: BasicInformation, required: false })
  basicInformation?: BasicInformation;

  @Prop({ type: ScoresAndCertificates, required: false })
  scoresAndCerts?: ScoresAndCertificates;

  @Prop({ type: Experiences, required: false })
  experiences?: Experiences;

  @Prop({ type: Aspiration, required: false })
  aspiration?: Aspiration;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
