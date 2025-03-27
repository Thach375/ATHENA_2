import { UserState } from '@constants/enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';

export class UpdateUserStateDto {
  @ApiProperty({
    name: 'status',
    description: 'user status. accept 0 or 1',
    required: true,
  })
  @IsEnum(UserState, { message: 'validate.USER.STATUS_MUST_BE_ENUM' })
  status: number;
}
