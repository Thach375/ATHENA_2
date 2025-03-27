import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '../guards';

export function Auth(
  scopes: string[] = [],
  opts?: { ignoreToken?: boolean },
): MethodDecorator {
  return applyDecorators(
    ApiBearerAuth(),
    SetMetadata('scopes', scopes),
    SetMetadata('options', opts),
    UseGuards(AuthGuard),
  );
}
