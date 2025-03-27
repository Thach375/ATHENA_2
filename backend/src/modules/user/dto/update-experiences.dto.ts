import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class WorkExperience {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  jobSpec: string;

  @ApiProperty({ required: true })
  @IsNumber()
  @IsNotEmpty()
  years: number;
}

class Activity {
  @ApiProperty({
    type: String,
    description: 'Major or name of the activity.',
    required: true,
  })
  @IsString()
  major: string;

  @ApiProperty({
    type: Number,
    description: 'Level of participation in the activity.',
    required: true,
  })
  @IsInt()
  level: number;
}

export class UpdateExperiencesDto {
  @ApiProperty({ required: false })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => WorkExperience)
  workExperiences: WorkExperience[];

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  achievements: string;

  @ApiProperty({
    type: [Activity],
    description: 'List of extracurricular activities.',
    required: false,
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Activity)
  extracurriculars: Activity[];
}
