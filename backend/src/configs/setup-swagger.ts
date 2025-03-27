import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Environment } from '../constants';

export function setupSwagger(
  app: INestApplication,
  name: string,
  env: string,
  method: string,
  host: string,
  port: number,
): void {
  if ([Environment.TEST, Environment.PROD].indexOf(env as Environment) === -1) {
    const serverUrl =
      [Environment.LOCAL].indexOf(env as Environment) > -1
        ? `http://localhost:${port}`
        : `${method}://${host}`;

    const serviceApi = `${name.slice(0, 1).toUpperCase()}${name.slice(1)}`;
    const apiDocOptions = new DocumentBuilder()
      .setTitle(`${serviceApi} API`)
      .setVersion('1.0')
      .setDescription(`API Documentation for ${serviceApi}`)
      .addServer(serverUrl, `api server`)
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, apiDocOptions, {
      operationIdFactory: (controllerKey: string, methodKey: string) =>
        methodKey,
    });
    SwaggerModule.setup('documentation', app, document);
  }
}
