import { Role, UserState } from '@constants/enum';
import { AdminModel } from '@modules/admin/admin.interface';
import { AdminService } from '@modules/admin/admin.service';
import { UserModel } from '@modules/user/user.interface';
import { User } from '@modules/user/user.schema';
import { UserService } from '@modules/user/user.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AppConfig } from 'src/configs';
import { GoogleAuthService } from 'src/external-services/google-auth/google-auth.service';
import StringUtils from 'src/utils/string.util';
import { ObjectLiteral } from 'typeorm';
import { AccessTokenResponse } from './auth.interface';
import { LoginAdminDto } from './dto/login-admin.dto';
import { LoginUserViaEmailDto } from './dto/login-user.dto';
import { GoogleLoginDto } from './dto/login-via-google.dto';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: AppConfig,
    private readonly adminService: AdminService,
    private readonly googleAuthService: GoogleAuthService,
  ) {}

  public async verifyAsync(token: string): Promise<ObjectLiteral> {
    try {
      return await this.jwtService.verifyAsync(token);
    } catch {
      return null;
    }
  }

  public async googleLogin(
    params: GoogleLoginDto,
  ): Promise<AccessTokenResponse> {
    try {
      const payload = await this.googleAuthService.verifyIdToken(
        params.idToken,
      );

      if (
        !payload.email ||
        (!payload['given_name'] && !payload['familyname'])
      ) {
        throw new BadRequestException(`auth.GOOGLE.MISSING_INFORMATION`);
      }

      const userExists = await this.userService.findOneByEmail(
        payload.email,
        true,
      );

      if (!userExists) {
        const userInfo: User = {
          email: payload.email,
          fullname: `${payload['given_name']} ${payload['family_name']}`.trim(),
        };

        const id = await this.userService.createOne(userInfo);

        Object.assign(userInfo, { _id: id });

        return await this._generateAccessToken(
          userInfo as UserModel,
          Role.USER,
        );
      } else {
        if (userExists.status !== UserState.ACTIVE) {
          throw new BadRequestException(`user.INACTIVE`);
        }

        return await this._generateAccessToken(
          userExists as UserModel,
          Role.USER,
        );
      }
    } catch (err) {
      throw new BadRequestException(`auth.GOOGLE.UNABLE_LOGIN`);
    }
  }

  /**
   * User register account via submit form
   * @param params RegisterUserDto
   * @returns CommonResponse
   */
  public async registerUser(
    params: RegisterUserDto,
  ): Promise<AccessTokenResponse> {
    const password = await StringUtils.encryptPassword(params.password);

    const userParams: User = {
      email: params.email.toLowerCase(),
      password: password,
      phone: params.phone,
    };

    const created = await this.userService.createOne(userParams);

    return this._generateAccessToken(
      created as unknown as UserModel,
      Role.USER,
    );
  }

  /**
   * Login user via email and password
   * @param params LoginUserViaEmailDto
   * @returns AccessTokenResponse
   */
  public async loginUserViaEmail(
    params: LoginUserViaEmailDto,
  ): Promise<AccessTokenResponse> {
    const user = await this.userService.findOneByEmail(params.email);

    const isMatches = await StringUtils.comparePassword(
      params.password,
      user.password,
    );

    if (!isMatches) {
      throw new BadRequestException(`auth.PASSWORD_NOT_MATCH`);
    }

    return await this._generateAccessToken(user as UserModel, Role.USER);
  }

  /**
   * Admin login via email and password
   * @param params LoginAdminDto
   * @returns AccessTokenResponse
   */
  public async loginAdmin(params: LoginAdminDto): Promise<AccessTokenResponse> {
    const admin = await this.adminService.findOneByEmail(params.email);

    const isPasswordMatch = await StringUtils.comparePassword(
      params.password,
      admin.password,
    );

    if (!isPasswordMatch) {
      throw new BadRequestException(`auth.PASSWORD_NOT_MATCH`);
    }

    return this._generateAccessToken(
      admin as unknown as AdminModel,
      Role.ADMIN,
    );
  }

  public async isValidToken(token: string): Promise<{ data: any }> {
    try {
      const data = await this.jwtService.verifyAsync(token);

      if (!data) {
        return { data: null };
      }

      return { data: data };
    } catch {
      return { data: null };
    }
  }

  /**
   * Generate access & refresh token
   * @param user user to generate token. allow ( UserModel or AdminModel )
   * @param role user's role
   * @returns AccessTokenResponse
   */
  private async _generateAccessToken(
    user: UserModel | AdminModel,
    role: Role,
  ): Promise<AccessTokenResponse> {
    try {
      const accessToken = await this.jwtService.signAsync(
        { id: user._id, roles: role },
        {
          expiresIn: this.configService.appEnv.APP.SECURE.JWT.TOKEN_EXPIRE,
        },
      );

      return {
        accessToken: accessToken,
      };
    } catch (err) {
      console.log(err);
      throw new BadRequestException(`auth.GENERATE_TOKEN_FAILED`);
    }
  }
}
