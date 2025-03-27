import { EMAIL_REGEX } from '@common/regular-expression';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  MaxLength,
} from 'class-validator';

export class RegisterUserDto {
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
    name: 'phone',
    description: "User's phone number, national phone format",
    required: true,
  })
  @IsString()
  @MaxLength(17)
  phone: string;

  @ApiProperty({
    name: 'password',
    description:
      "user's password. This field must from 8 characters and contains at least 1 number.",
    required: true,
  })
  @IsNotEmpty({ message: 'validate.AUTH.PASSWORD_NOT_EMPTY' })
  //@Matches(PASSWORD_REGEX, { message: 'validate.AUTH.INVALID_PASSWORD_FORMAT' })
  @Length(6, 25, { message: 'validate.AUTH.PASSWORD_LENGTH_WRONG' })
  password: string;
}
