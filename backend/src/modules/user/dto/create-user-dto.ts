import { RegisterUserDto } from '@modules/auth/dto/register-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';

export class CreateUserDto extends RegisterUserDto {
  @ApiProperty({
    name: 'status',
    description: "user's status",
    required: false,
  })
  @IsOptional()
  @IsEnum([0, 1], { message: 'validate.USER.STATUS_MUST_BE_ENUM' })
  status: number;
}
