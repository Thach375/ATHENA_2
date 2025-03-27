import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class Intended {
  @ApiProperty({ type: String, description: 'Intended University' })
  @IsString()
  @IsNotEmpty()
  intendedUniversity: string;

  @ApiProperty({ type: String, description: 'Intended Major' })
  @IsString()
  @IsNotEmpty()
  intendedMajor: string;
}

export class UpdateAspirationDto {
  @ApiProperty({ type: [String], description: 'Intended University' })
  @IsString({ each: true })
  @IsOptional()
  intendedUniversities: string[];

  @ApiProperty({ type: String, description: 'Intended Major' })
  @IsString()
  @IsOptional()
  intendedMajor: string;

  @ApiProperty({
    type: String,
    description: 'Scholarship',
  })
  @IsString()
  @IsOptional()
  scholarship: string;

  @ApiProperty({
    type: String,
    description: 'Start first semester',
  })
  @IsString()
  @IsOptional()
  startFirstSemester: string;

  @ApiProperty({
    type: String,
    description: 'Country prioritize',
  })
  @IsString()
  @IsOptional()
  countryPrioritize: string;

  @ApiProperty({
    type: String,
    description: 'Budget per years',
  })
  @IsString()
  @IsOptional()
  budget: string;
}
