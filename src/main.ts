import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as helmet from 'helmet';

const API_PORT = process.env.API_PORT || 4000;
const API_DEFAULT_PREFIX = '/api/v1';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe());

  app.setGlobalPrefix(process.env.API_PREFIX || API_DEFAULT_PREFIX);
  const config = new DocumentBuilder()
    .setTitle('SASP-ONBOARDING-SERVICE')
    .setDescription('This service handles onboarding Items')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);
  await app.listen(API_PORT);

  Logger.log(
    `🚀 Application is running in ${process.env.NODE_ENV} mode on port ${
      process.env.API_PORT ? process.env.API_PORT : 400
    }`,
  );

  Logger.log(`💾 ${process.env.DB_NAME} Postgres DB Connected!`);
}
bootstrap();
