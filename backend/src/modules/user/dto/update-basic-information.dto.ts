import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateBasicInformationDto {
  @ApiProperty({ type: String, description: 'First name of the student' })
  @IsString()
  @IsOptional()
  firstname: string;

  @ApiProperty({ type: String, description: 'Last name of the student' })
  @IsString()
  @IsOptional()
  lastname: string;

  @ApiProperty({
    type: Number,
    description: 'Date of birth of the student by miliseconds',
  })
  @IsInt()
  @IsOptional()
  dateOfBirth: Date;

  @ApiProperty({ type: String, description: 'Gender of the student' })
  @IsString()
  @IsEnum(['male', 'female', 'other'])
  @IsOptional()
  gender: string;

  @ApiProperty({ type: String, description: 'Nationality of the student' })
  @IsString()
  @IsOptional()
  nationality: string;

  // @ApiProperty({ type: Number, description: 'Year of high school graduation' })
  // @IsInt()
  // @IsNotEmpty()
  // graduateHighSchoolAt: number;

  // @ApiProperty({
  //   type: [String],
  //   required: false,
  //   description: 'List of schools being considered',
  // })
  // @IsArray()
  // @IsOptional()
  // consideringSchools?: string[];

  // @ApiProperty({
  //   required: false,
  //   description: 'First semester plan',
  // })
  // @IsString()
  // @IsOptional()
  // firstSemesterPlan?: string;
}
