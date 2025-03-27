import { ConfigService } from '@nestjs/config';
import { AppEnvironment } from 'src/interfaces';

function mapConfig(configService: ConfigService): AppEnvironment {
  return {
    ENV: configService.get<string>('ENV'),
    APP: {
      NAME: configService.get<string>('APP.NAME'),
      PORT:
        parseInt(configService.get<string>('APP.SERVER.PORT') || '') || 8080,
      IP: configService.get<string>('APP.SERVER.IP') || '0.0.0.0',
      GATEWAY_CONFIG: {
        METHOD: configService.get<string>('APP.SERVER.METHOD') || `http`,
        HOST: configService.get<string>('APP.SERVER.HOST') || `localhost:8080`,
      },
      SECURE: {
        CORS: {
          ORIGIN: (
            configService.get<string>('SECURE.CORS.ORIGIN') || '*'
          ).split(','),
          METHODS: (
            configService.get<string>('SECURE.CORS.METHODS') ||
            'GET,PUT,POST,DELETE,PATCH,HEAD,OPTIONS'
          ).split(','),
          ALLOWED_HEADERS: (
            configService.get<string>('SECURE.CORS.ALLOWED_HEADERS') || '*'
          ).split(','),
          EXPOSED_HEADERS: (
            configService.get<string>('SECURE.CORS.EXPOSED_HEADERS') || '*'
          ).split(','),
          CREDENTIALS: Boolean(
            configService.get<string>('SECURE.CORS.CREDENTIALS') || 'true',
          ),
          PREFLIGHT_CONTINUE: Boolean(
            configService.get<string>('SECURE.CORS.PREFLIGHT_CONTINUE') ||
              'false',
          ),
        },
        JWT: {
          JWT_SECRET: configService.get<string>('JWT.SECRET'),
          /*time expire token*/
          TOKEN_EXPIRE: parseInt(
            configService.get<string>('JWT.TOKEN_EXPIRE') || '',
          ), // 30 minutes
        },
      },
    },
    DATABASE: {
      MYSQL: {
        USERNAME: configService.get<string>('DATABASE.USERNAME'),
        PASSWORD: configService.get<string>('DATABASE.PASSWORD'),
        HOST: configService.get<string>('DATABASE.HOST'),
        PORT: parseInt(configService.get<string>('DATABASE.PORT') || ''),
        NAME: configService.get<string>('DATABASE.NAME'),
      },
      MONGO: {
        USERNAME: configService.get<string>('MONGO.USERNAME'),
        PASSWORD: configService.get<string>('MONGO.PASSWORD'),
        DATABASE: configService.get<string>('MONGO.DATABASE'),
        HOST: configService.get<string>('MONGO.HOST'),
        IS_CLUSTER: Boolean(+configService.get<number>('MONGO.IS_CLUSTER')),
        PORT: +configService.get<string>('MONGO.PORT'),
      },
    },
    GOOGLE: {
      AUTH: {
        PROJECT_ID: configService.get<string>('GOOGLE.AUTH.PROJECT_ID'),
      },
      MEET: {
        CLIENT_ID: configService.get<string>('GOOGLE.MEET.CLIENT_ID'),
        CLIENT_SECRET: configService.get<string>('GOOGLE.MEET.CLIENT_SECRET'),
        REFRESH_TOKEN: configService.get<string>('GOOGLE.MEET.REFRESH_TOKEN'),
      },
      POSTMASTER: configService.get<string>('GOOGLE.POSTMASTER'),
      MAIL: {
        ADMIN: configService.get<string>('GOOGLE.MAIL.ADMIN'),
        CLIENT_ID: configService.get<string>('GOOGLE.MAIL.CLIENT_ID'),
        CLIENT_SECRET: configService.get<string>('GOOGLE.MAIL.CLIENT_SECRET'),
        REFRESH_TOKEN: configService.get<string>('GOOGLE.MAIL.REFRESH_TOKEN'),
      },
    },
    PAYMENT: {
      BANK_CODE: configService.get<string>('PAYMENT.BANK_CODE'),
      BANK_NO: configService.get<string>('PAYMENT.BANK_NO'),
      CURRENCY_API_KEY: configService.get<string>('PAYMENT.CURRENCY_API_KEY'),
    },
    OPEN_AI: {
      TOKEN: configService.get<string>('OPEN_AI.TOKEN'),
      CHANCE_MODEL: configService.get<string>('OPEN_AI.CHANCE_MODEL'),
    },
  } as AppEnvironment;
}

export default mapConfig;
