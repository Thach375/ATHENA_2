import { IsString, IsInt, IsOptional, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateScholarshipDto {
  @ApiProperty({
    description: 'The name of the scholarship',
    type: String,
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The banner of the scholarship',
    type: String,
  })
  @IsString()
  banner: string;

  @ApiProperty({
    description: 'The description of the scholarship',
    type: String,
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'The school offering the scholarship',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  school?: string;

  @ApiProperty({
    description: 'The start time (timestamp)',
    type: Number,
  })
  @IsInt()
  @IsOptional()
  beginTime: number;

  @ApiProperty({
    description: 'The end time (timestamp)',
    type: Number,
  })
  @IsInt()
  endTime: number;

  @ApiProperty({
    description: 'The criteria for receiving the scholarship',
    type: [String],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  criteria?: string[];

  @ApiProperty({
    description: 'Detailed content about the scholarship',
    type: String,
  })
  @IsString()
  content: string;
}
