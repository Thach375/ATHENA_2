import { EMAIL_REGEX, PASSWORD_REGEX } from '@common/regular-expression';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsMongoId,
  IsNotEmpty,
  Length,
  Matches,
  MaxLength,
} from 'class-validator';

export class CreateSubAdminDto {
  @ApiProperty({
    name: 'fullname',
    description:
      "user's fullname, server will auto format this field to correct name's format.",
    required: true,
  })
  @MaxLength(50, { message: 'validate.AUTH.FULLNAME_LONG' })
  fullname: string;

  @ApiProperty({
    name: 'email',
    description: "user's email",
    required: true,
  })
  @IsNotEmpty({ message: 'validate.AUTH.EMAIL_NOT_NULL' })
  @MaxLength(256, { message: 'validate.AUTH.EMAIL_LONG' })
  @Matches(EMAIL_REGEX, { message: 'validate.AUTH.WRONG_EMAIL_FORMAT' })
  email: string;

  @ApiProperty({
    name: 'roles',
    description: 'List role ids grant for this admin',
    required: true,
  })
  @IsMongoId({ each: true, message: 'validate.ROLE.MUST_BE_VALID_UUID' })
  roles: string[];

  @ApiProperty({
    name: 'password',
    description:
      "user's password. This field must from 8 characters and contains at least 1 number.",
    required: true,
  })
  @IsNotEmpty({ message: 'validate.AUTH.PASSWORD_NOT_EMPTY' })
  @Matches(PASSWORD_REGEX, { message: 'validate.AUTH.INVALID_PASSWORD_FORMAT' })
  @Length(6, 25, { message: 'validate.AUTH.PASSWORD_LENGTH_WRONG' })
  password: string;
}
