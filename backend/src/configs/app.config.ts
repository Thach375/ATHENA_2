import { INestApplication, Injectable } from '@nestjs/common';
import {
  CorsOptions,
  CorsOptionsDelegate,
} from '@nestjs/common/interfaces/external/cors-options.interface';
import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';
import { AppEnvironment } from './../interfaces/app-environment.interface';
import mapConfig from './map-configuration';
import { setupSwagger } from './setup-swagger';
import { MongooseModuleFactoryOptions } from '@nestjs/mongoose';
import { GoogleAuthConnectOptions } from 'src/external-services/google-auth/google-auth.interface';
import { GoogleMeetOptions } from 'src/external-services/google-meet/google-meet.interface';
import { MailerType } from '@modules/mailer/mailer.interface';
import { OpenAiOptions } from 'src/external-services/open-ai/open-ai.interface';

@Injectable()
export class AppConfig {
  appEnv: AppEnvironment;

  constructor(private configService: ConfigService) {
    this.appEnv = mapConfig(this.configService);
  }

  getOpenAiConfig(): OpenAiOptions {
    return {
      apiKey: this.appEnv.OPEN_AI.TOKEN,
      models: {
        chances: this.appEnv.OPEN_AI.CHANCE_MODEL,
      },
    };
  }

  getMailerConfig() {
    return {
      type: MailerType.GMAIL,
      configs: {
        auth: {
          user: this.appEnv.GOOGLE.POSTMASTER,
          clientId: this.appEnv.GOOGLE.MAIL.CLIENT_ID,
          clientSecret: this.appEnv.GOOGLE.MAIL.CLIENT_SECRET,
          refreshToken: this.appEnv.GOOGLE.MAIL.REFRESH_TOKEN,
        },
      },
    };
  }

  getGoogleMeetConfig(): GoogleMeetOptions {
    return {
      clientId: this.appEnv.GOOGLE.MEET.CLIENT_ID,
      clientSecret: this.appEnv.GOOGLE.MEET.CLIENT_SECRET,
      refreshToken: this.appEnv.GOOGLE.MEET.REFRESH_TOKEN,
    };
  }

  getGoogleConfig(): GoogleAuthConnectOptions {
    return {
      credentials: {
        path: 'config/google-credentials.json',
      },
      projectId: this.appEnv.GOOGLE.AUTH.PROJECT_ID,
    };
  }

  getJwtConfig(): JwtModuleOptions {
    return {
      secret: this.appEnv.APP.SECURE.JWT.JWT_SECRET,
      signOptions: {
        expiresIn: this.appEnv.APP.SECURE.JWT.TOKEN_EXPIRE,
      },
    };
  }

  getRootConfig(): AppEnvironment {
    return this.appEnv;
  }

  setupSwagger(app: INestApplication) {
    setupSwagger(
      app,
      this.appEnv.APP.NAME,
      this.appEnv.ENV,
      this.appEnv.APP.GATEWAY_CONFIG.METHOD,
      this.appEnv.APP.GATEWAY_CONFIG.HOST,
      this.appEnv.APP.PORT,
    );
  }

  getCorsConfig(): CorsOptions | CorsOptionsDelegate<any> {
    return {
      origin: this.appEnv.APP.SECURE.CORS.ORIGIN,
      methods: this.appEnv.APP.SECURE.CORS.METHODS,
      allowedHeaders: this.appEnv.APP.SECURE.CORS.ALLOWED_HEADERS,
      exposedHeaders: this.appEnv.APP.SECURE.CORS.EXPOSED_HEADERS,
      credentials: this.appEnv.APP.SECURE.CORS.CREDENTIALS,
      preflightContinue: this.appEnv.APP.SECURE.CORS.PREFLIGHT_CONTINUE,
    };
  }

  getMongooseConfig(): MongooseModuleFactoryOptions {
    return {
      uri: this.getMongoURI(),
      retryWrites: true,
      retryAttempts: Number.MAX_SAFE_INTEGER,
      retryDelay: 1000,
    };
  }

  getMongoURI(): string {
    const prefix = this.appEnv.DATABASE.MONGO.IS_CLUSTER
      ? 'mongodb+srv'
      : 'mongodb';

    return (
      prefix
        .concat('://')
        .concat(this.appEnv.DATABASE.MONGO.USERNAME)
        .concat(':')
        .concat(this.appEnv.DATABASE.MONGO.PASSWORD)
        .concat('@')
        .concat(
          this.appEnv.DATABASE.MONGO.PORT
            ? `${this.appEnv.DATABASE.MONGO.HOST}:${this.appEnv.DATABASE.MONGO.PORT}`
            : this.appEnv.DATABASE.MONGO.HOST,
        )
        .concat('/')
        .concat(this.appEnv.DATABASE.MONGO.DATABASE) + '?authSource=admin'
    );
  }
}
