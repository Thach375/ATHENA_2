import {
  BadRequestException,
  Logger,
  ShutdownSignal,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { useContainer, ValidationError } from 'class-validator';
import * as compression from 'compression';
import helmet from 'helmet';
import * as morgan from 'morgan';
import { join } from 'node:path';
import { API_PREFIX, API_VERSION } from 'src/constants';
import { AppModule } from './app.module';
import { AppConfig } from './configs/app.config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(AppConfig);

  app.setGlobalPrefix(`/${API_PREFIX}/${API_VERSION}`);

  app.enableCors();

  app.enableShutdownHooks([ShutdownSignal.SIGINT, ShutdownSignal.SIGTERM]);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.useStaticAssets(join(__dirname, 'assets'));
  app.use(helmet());
  app.use(compression());
  app.use(morgan('dev'));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (errors: ValidationError[]) => {
        return new BadRequestException(errors);
      },
    }),
  );

  configService.setupSwagger(app);

  const PORT = +configService.appEnv.APP.PORT;
  await app.listen(PORT).then(() => {
    Logger.log('Server listening on port ' + PORT);
  });
}

bootstrap();
