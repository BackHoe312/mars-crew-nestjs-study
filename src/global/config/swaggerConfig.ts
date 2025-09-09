import { INestApplication } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';

const swaggerCustomOption: SwaggerCustomOptions = {
  swaggerOptions: {
    persistAuthorization: true,
  },
};

const swaggerConfig = (app: INestApplication): void => {
  const options = new DocumentBuilder()
    .setTitle('CONTACT API')
    .setDescription('CONTACT API documentation')
    .setVersion('1.0.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'Bearer',
        name: 'JWT',
        in: 'header',
      },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document, swaggerCustomOption);
};

export default swaggerConfig;
