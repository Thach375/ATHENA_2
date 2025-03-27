import { EnglishProficiencyType, IBExamLevel } from '@constants/enum';
import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class SATScoreDto {
  @ApiProperty({ type: Number, description: 'Math score', required: true })
  @IsNumber()
  math: number;

  @ApiProperty({ type: Number, description: 'Reading score', required: true })
  @IsNumber()
  reading: number;
}

export class APExamDto {
  @ApiProperty({
    type: String,
    description: 'Subject of the AP exam',
    required: true,
  })
  @IsString()
  subject: string;

  @ApiProperty({
    type: Number,
    description: 'Score of the AP exam',
    required: true,
  })
  @IsNumber()
  score: number;
}

export class IBExamDto {
  @ApiProperty({
    description: 'english proficiency take month',
    required: false,
  })
  @IsOptional()
  takeMonth?: string;

  @ApiProperty({
    description: 'english proficiency take year',
    required: false,
  })
  @IsOptional()
  takeYear?: string;

  @ApiProperty({
    type: String,
    description: 'IB Exam level: HL, SL',
    required: true,
  })
  @IsEnum(IBExamLevel)
  @IsString()
  level: IBExamLevel;

  @ApiProperty({
    type: String,
    description: 'Name of IB Exam',
    required: true,
  })
  @IsString()
  name: string;

  @ApiProperty({
    type: Number,
    description: 'Score of the AP exam',
    required: true,
  })
  @IsNumber()
  score: number;
}

export class PSATScoreDto {
  @ApiProperty({ type: Number, description: 'Math score', required: true })
  @IsNumber()
  math: number;

  @ApiProperty({
    type: Number,
    description: 'Reading and Writing score',
    required: true,
  })
  @IsNumber()
  readingAndWriting: number;
}

export class ACTScoreDto {
  @ApiProperty({ type: Number, description: 'Math score', required: true })
  @IsNumber()
  math: number;

  @ApiProperty({ type: Number, description: 'Reading score', required: true })
  @IsNumber()
  reading: number;

  @ApiProperty({ type: Number, description: 'English score', required: true })
  @IsNumber()
  english: number;

  @ApiProperty({ type: Number, description: 'Science score', required: true })
  @IsNumber()
  science: number;
}

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
export class UpdateTestScoresDto {
  @ApiProperty({ type: SATScoreDto, required: false })
  @ValidateNested()
  @Type(() => SATScoreDto)
  @IsOptional()
  SATScore?: SATScoreDto;

  @ApiProperty({ type: ACTScoreDto, required: false })
  @ValidateNested()
  @Type(() => ACTScoreDto)
  @IsOptional()
  ACTScore?: ACTScoreDto;

  @ApiProperty({ type: PSATScoreDto, required: false })
  @ValidateNested()
  @Type(() => PSATScoreDto)
  @IsOptional()
  PSATScore?: PSATScoreDto;

  @ApiProperty({ type: [APExamDto], required: false })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => APExamDto)
  @IsOptional()
  APExams?: APExamDto[];

  @ApiProperty({ type: [IBExamDto], required: false })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => IBExamDto)
  @IsOptional()
  IBExams?: IBExamDto[];

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
