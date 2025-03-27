import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GoogleLoginDto {
  @ApiProperty({
    name: 'idToken',
    required: true,
  })
  @IsString({ message: 'validate.USER.ID_TOKEN_MUST_BE_STRING' })
  idToken: string;
}
