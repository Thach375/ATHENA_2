import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

export class UpdateRoleDto {
  @ApiProperty({
    name: 'roles',
    description: 'List role ids grant for this admin',
    required: true,
  })
  @IsMongoId({ each: true, message: 'validate.ROLE.MUST_BE_VALID_UUID' })
  roles: string[];
}
