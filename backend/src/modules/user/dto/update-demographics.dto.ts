import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

export class UpdateDemographicsDto {
  @ApiProperty({
    type: String,
    description: 'Country of residence',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  country: string;

  @ApiProperty({
    type: String,
    description: 'City of residence',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({
    type: String,
    description: 'Nationality',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  nationality: string;

  @ApiProperty({
    type: String,
    description: 'Gender of the individual',
    enum: Gender,
    default: Gender.MALE,
  })
  @IsEnum(Gender)
  @IsNotEmpty()
  gender: string;

  @ApiProperty({ type: String, description: 'College budget', required: false })
  @IsString()
  @IsOptional()
  collegeBudget?: string;

  @ApiProperty({
    type: Boolean,
    description: 'Indicates if seeking scholarship',
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  seekingScholarship?: boolean;

  @ApiProperty({
    type: String,
    description: 'High school attended',
    required: false,
  })
  @IsString()
  @IsOptional()
  highSchool?: string;

  @ApiProperty({
    type: String,
    description: 'Intended major of study',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  intendedMajor: string;
}
