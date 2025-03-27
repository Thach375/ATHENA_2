import { PricingPlan } from '@constants/enum';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateSchedulerDto {
  @ApiProperty({ description: 'mentor id', required: true })
  @IsMongoId()
  mentorId: string;

  @ApiProperty({ description: 'start time', required: true })
  @IsInt()
  startTime: number;

  @ApiProperty({ description: 'end time', required: true })
  @IsInt()
  endTime: number;

  @ApiProperty({ description: 'primaryGoals', required: false })
  @IsString()
  @IsOptional()
  primaryGoals: string;

  @ApiProperty({ description: 'curriculumVitae', required: false })
  @IsString()
  @IsOptional()
  curriculumVitae: string;

  @ApiProperty({ description: 'concernCriteria', required: false })
  @IsString()
  @IsOptional()
  concernCriteria: string;

  @ApiProperty({ description: 'frequency', required: false })
  @IsString()
  @IsOptional()
  frequency: string;

  @ApiProperty({ description: 'additionInfo', required: false })
  @IsString()
  @IsOptional()
  additionInfo: string;

  @ApiProperty({ description: 'pricingPlan', required: false })
  @IsEnum(PricingPlan)
  @IsNotEmpty()
  pricingPlan: PricingPlan;
}
