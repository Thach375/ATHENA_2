import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

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

export class UpdateExtracurricularsDto {
  @ApiProperty({
    type: [Activity],
    description: 'List of extracurricular activities.',
    required: false,
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Activity)
  activities: Activity[];
}
