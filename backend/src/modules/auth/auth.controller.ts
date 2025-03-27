import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginAdminDto } from './dto/login-admin.dto';
import { LoginUserViaEmailDto } from './dto/login-user.dto';
import { GoogleLoginDto } from './dto/login-via-google.dto';
import { RegisterUserDto } from './dto/register-user.dto';

@Controller('auth')
@ApiTags('Authentication & Authorization')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/user/register')
  public async registerUser(@Body() body: RegisterUserDto): Promise<any> {
    return await this.authService.registerUser(body);
  }

  @Post('/user/email/login')
  public async loginUserViaEmail(
    @Body() body: LoginUserViaEmailDto,
  ): Promise<any> {
    return await this.authService.loginUserViaEmail(body);
  }

  @Post('/user/google/login')
  public async loginUserViaGoogle(@Body() body: GoogleLoginDto): Promise<any> {
    return await this.authService.googleLogin(body);
  }

  @Post('/admin/login')
  public async loginAdmin(@Body() body: LoginAdminDto): Promise<any> {
    return await this.authService.loginAdmin(body);
  }
}
