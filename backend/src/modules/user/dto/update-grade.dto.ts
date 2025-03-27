import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber } from 'class-validator';

export enum Coefficient {
  FOUR = 4,
  FIVE = 5,
  SEVEN = 7,
  TEN = 10,
  FIFTEEN = 15,
  TWENTY = 20,
  HUNDRED = 100,
}

export class UpdateGradesDto {
  @ApiProperty({
    enum: Coefficient,
    description:
      'The coefficient of the grading scale, accepted values are 4, 5, 7, 10, 15, 20, 100.',
    required: true,
  })
  @IsEnum(Object.values(Coefficient))
  coefficient: number;

  @ApiProperty({
    type: Number,
    description: 'The grade point average (GPA) based on the coefficient.',
    required: true,
  })
  @IsNumber()
  gpa: number;
}
