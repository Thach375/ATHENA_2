import { Scopes } from '@constants/enum';
import { AuthService } from '@modules/auth/auth.service';
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AppConfig } from 'src/configs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly appConfig: AppConfig,
    private readonly reflector: Reflector,
    private readonly authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const scopes = this.reflector.get<Scopes[]>('scopes', context.getHandler());
    const options = this.reflector.get<{ ignoreToken?: boolean }>(
      'options',
      context.getHandler(),
    );
    const bearerToken = request?.headers?.authorization;

    if (!bearerToken && !options?.ignoreToken) {
      throw new UnauthorizedException('auth.UNAUTHORIZED');
    }

    const token = bearerToken?.split(' ')?.[1];

    if (token) {
      const tokenData = await this.authService.verifyAsync(token);

      if (!tokenData && !options?.ignoreToken) {
        throw new UnauthorizedException('auth.UNAUTHORIZED');
      }

      if (scopes.includes(Scopes.ADMIN) && !options?.ignoreToken) {
        if (tokenData.roles !== Scopes.ADMIN) {
          throw new ForbiddenException(`auth.FORBIDDEN`);
        }
      }

      Object.assign(request, { user: tokenData });

      return true;
    } else {
      if (options?.ignoreToken) {
        return true;
      }
      return false;
    }
  }
}
