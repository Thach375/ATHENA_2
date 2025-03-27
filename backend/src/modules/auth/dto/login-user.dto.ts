import { EMAIL_REGEX, PASSWORD_REGEX } from '@common/regular-expression';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length, Matches } from 'class-validator';

export class LoginUserViaEmailDto {
  @ApiProperty({
    name: 'email',
    description: "user's email",
    required: true,
  })
  @Matches(EMAIL_REGEX, { message: 'validate.AUTH.WRONG_EMAIL_FORMAT' })
  email: string;

  @ApiProperty({
    name: 'password',
    description: "user's password. This field must from 6 characters",
    required: true,
  })
  @IsNotEmpty({ message: 'validate.AUTH.PASSWORD_NOT_EMPTY' })
  @Length(6, 25, { message: 'validate.AUTH.PASSWORD_LENGTH_WRONG' })
  @Matches(PASSWORD_REGEX, { message: 'validate.AUTH.INVALID_PASSWORD_FORMAT' })
  password: string;
}
