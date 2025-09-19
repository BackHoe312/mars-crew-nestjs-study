import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { ConfigService } from '@nestjs/config';
import swaggerConfig from './global/config/swaggerConfig';
import { LoggingInterceptor } from './common/interceptor/LoggingInterceptor';
import { HttpExceptionFilter } from './global/filter/HttpExceptionFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const NODE_ENV = configService.get('NODE_ENV');

  dotenv.config();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalInterceptors(new LoggingInterceptor());

  app.useGlobalFilters(new HttpExceptionFilter());

  if (['development', 'local'].includes(NODE_ENV)) {
    swaggerConfig(app);
  }

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
