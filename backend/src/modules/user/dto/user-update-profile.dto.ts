import { EMAIL_REGEX } from '@common/regular-expression';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsOptional,
  IsString,
  Length,
  Matches,
  MaxLength,
  Min,
} from 'class-validator';

export class UserUpdateProfileDto {
  @ApiProperty({
    name: 'fullname',
    description:
      "user's fullname, server will auto format this field to correct name's format.",
    required: false,
  })
  @IsOptional()
  @MaxLength(50, { message: 'validate.AUTH.FULLNAME_LONG' })
  fullname: string;

  @ApiProperty({
    name: 'email',
    description: "user's email",
    required: false,
  })
  @IsOptional()
  @MaxLength(256, { message: 'validate.AUTH.EMAIL_LONG' })
  @Matches(EMAIL_REGEX, { message: 'validate.AUTH.WRONG_EMAIL_FORMAT' })
  email: string;

  @ApiProperty({
    name: 'dob',
    description:
      "user's date of birth. Only allowed to send in timestamp number.",
    required: false,
  })
  @IsOptional()
  @IsInt({ message: 'validate.AUTH.DOB_MUST_IS_INT' })
  @Min(0, { message: 'validate.AUTH.DOB_MIN' })
  dob: number;

  @ApiProperty({
    name: 'address',
    description: "user's address. Must be string.",
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'validate.AUTH.ADDRESS_MUST_BE_STRING.' })
  @Length(1, 255, { message: 'validate.AUTH.ADDRESS_LENGTH' })
  address: string;
}
