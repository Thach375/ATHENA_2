import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AppConfig, AppConfigModule } from 'src/configs';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AdminModule } from '@modules/admin/admin.module';
import { GoogleAuthModule } from 'src/external-services/google-auth/google-auth.module';

@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (appConfig: AppConfig) => {
        return appConfig.getJwtConfig();
      },
      imports: [AppConfigModule],
      inject: [AppConfig],
    }),
    GoogleAuthModule.registerAsync({
      useFactory: (appConfig: AppConfig) => {
        return appConfig.getGoogleConfig();
      },
      imports: [AppConfigModule],
      inject: [AppConfig],
    }),
    AdminModule,
  ],
  exports: [AuthService],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
