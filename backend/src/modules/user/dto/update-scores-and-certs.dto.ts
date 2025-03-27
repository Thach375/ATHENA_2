import { EnglishProficiencyType } from '@constants/enum';
import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class OutStandingSubject {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  score: string;
}

export class Certificate extends OutStandingSubject {}

export class IELTSDto {
  @ApiProperty({ type: Number, description: 'Listening score', required: true })
  @IsNumber()
  listening: number;

  @ApiProperty({ type: Number, description: 'Reading score', required: true })
  @IsNumber()
  reading: number;

  @ApiProperty({ type: Number, description: 'Writing score', required: true })
  @IsNumber()
  writing: number;

  @ApiProperty({ type: Number, description: 'Speaking score', required: true })
  @IsNumber()
  speaking: number;

  @ApiProperty({ type: Number, description: 'Overall score', required: true })
  @IsNumber()
  overall: number;
}

export class TOEFLiBTDto {
  @ApiProperty({ type: Number, description: 'Listening score', required: true })
  @IsNumber()
  listening: number;

  @ApiProperty({ type: Number, description: 'Reading score', required: true })
  @IsNumber()
  reading: number;

  @ApiProperty({ type: Number, description: 'Writing score', required: true })
  @IsNumber()
  writing: number;

  @ApiProperty({ type: Number, description: 'Speaking score', required: true })
  @IsNumber()
  speaking: number;

  @ApiProperty({ type: Number, description: 'Overall score', required: true })
  @IsNumber()
  overall: number;
}

export class DuolingoEnglishTestDto {
  @ApiProperty({ type: Number, description: 'Literacy score', required: true })
  @IsNumber()
  literacy: number;

  @ApiProperty({
    type: Number,
    description: 'Conversation score',
    required: true,
  })
  @IsNumber()
  conversation: number;

  @ApiProperty({
    type: Number,
    description: 'Comprehension score',
    required: true,
  })
  @IsNumber()
  comprehension: number;

  @ApiProperty({
    type: Number,
    description: 'Production score',
    required: true,
  })
  @IsNumber()
  production: number;

  @ApiProperty({ type: Number, description: 'Overall score', required: true })
  @IsNumber()
  overall: number;
}

export class TOEFLPaperDto {
  @ApiProperty({ type: Number, description: 'Listening score', required: true })
  @IsNumber()
  listening: number;

  @ApiProperty({ type: Number, description: 'Reading score', required: true })
  @IsNumber()
  reading: number;

  @ApiProperty({ type: Number, description: 'Writing score', required: true })
  @IsNumber()
  writing: number;

  @ApiProperty({ type: Number, description: 'Overall score', required: true })
  @IsNumber()
  overall: number;
}

export class PTEDto {
  @ApiProperty({ type: Number, description: 'Listening score', required: true })
  @IsNumber()
  listening: number;

  @ApiProperty({ type: Number, description: 'Reading score', required: true })
  @IsNumber()
  reading: number;

  @ApiProperty({ type: Number, description: 'Writing score', required: true })
  @IsNumber()
  writing: number;

  @ApiProperty({ type: Number, description: 'Speaking score', required: true })
  @IsNumber()
  speaking: number;

  @ApiProperty({ type: Number, description: 'Grammar score', required: true })
  @IsNumber()
  grammar: number;

  @ApiProperty({
    type: Number,
    description: 'Oral Fluency score',
    required: true,
  })
  @IsNumber()
  oralFluency: number;

  @ApiProperty({
    type: Number,
    description: 'Pronunciation score',
    required: true,
  })
  @IsNumber()
  pronunciation: number;

  @ApiProperty({ type: Number, description: 'Spelling score', required: true })
  @IsNumber()
  spelling: number;

  @ApiProperty({
    type: Number,
    description: 'Vocabulary score',
    required: true,
  })
  @IsNumber()
  vocabulary: number;

  @ApiProperty({
    type: Number,
    description: 'Written Discourse score',
    required: true,
  })
  @IsNumber()
  writtenDiscourse: number;

  @ApiProperty({ type: Number, description: 'Overall score', required: true })
  @IsNumber()
  overall: number;
}

@ApiExtraModels(
  IELTSDto,
  PTEDto,
  TOEFLPaperDto,
  DuolingoEnglishTestDto,
  TOEFLiBTDto,
)
export class ScoresAndCertsDto {
  @ApiProperty({
    type: String,
    description: 'universityCountry',
  })
  @IsString()
  @IsOptional()
  universityCountry: string;

  @ApiProperty({
    type: String,
    description: 'University',
  })
  @IsString()
  @IsOptional()
  university: string;

  @ApiProperty({
    type: String,
    description: 'Major',
  })
  @IsString()
  @IsOptional()
  major: string;

  @ApiProperty({
    type: String,
    description: 'GPA number',
  })
  @IsNumber()
  @IsOptional()
  gpa: number;

  @ApiProperty({ required: false })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OutStandingSubject)
  @IsOptional()
  outstandingSubjects: OutStandingSubject[];

  @ApiProperty({ required: false })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Certificate)
  @IsOptional()
  certificates: Certificate[];

  @ApiProperty({
    description: 'english proficiency take month',
    required: false,
  })
  @IsOptional()
  englishTakeMonth?: string;

  @ApiProperty({
    description: 'english proficiency take year',
    required: false,
  })
  @IsOptional()
  englishTakeYear?: string;

  @ApiProperty({
    description: 'english proficiency take number',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  englishTakeTryTime?: number;

  @ApiProperty({
    description: "english proficiency's planning",
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isEnglishProficiencyPlan?: boolean;

  @ApiProperty({ description: "english proficiency's type", required: false })
  @IsOptional()
  @IsEnum(EnglishProficiencyType)
  englishProficiencyType?: EnglishProficiencyType;

  @ApiProperty({
    oneOf: [
      { $ref: '#/components/schemas/IELTSDto' },
      { $ref: '#/components/schemas/PTEDto' },
      { $ref: '#/components/schemas/TOEFLPaperDto' },
      { $ref: '#/components/schemas/DuolingoEnglishTestDto' },
      { $ref: '#/components/schemas/TOEFLiBTDto' },
    ],
    description: 'English proficiency scores (IELTS, PTE, TOEFL, etc.)',
    required: false,
  })
  @IsOptional()
  englishProficiency?:
    | IELTSDto
    | PTEDto
    | TOEFLPaperDto
    | DuolingoEnglishTestDto
    | TOEFLiBTDto;
}
