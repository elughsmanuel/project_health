import { NestFactory } from '@nestjs/core';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { SwaggerTheme, SwaggerThemeName } from 'swagger-themes';
import {
  DocumentBuilder,
  SwaggerModule,
} from '@nestjs/swagger';
import * as expressIp from 'express-ip';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function attachSwagger(app: INestApplication<any>) {
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Project Health')
    .setVersion('1.0')
    .addCookieAuth()
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  const swaggerTheme = new SwaggerTheme();
  const swaggerOptions = {
    explorer: false,
    customCss: swaggerTheme.getBuffer('flattop' as SwaggerThemeName),
  };

  SwaggerModule.setup('', app, swaggerDocument, swaggerOptions);
}

async function setupHttpHeader(app: INestApplication<any>) {
  app.enableCors();
  // app.disable('x-powered-by');
  // app.set('etag', false);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  app.setGlobalPrefix('/api/v3');

  await attachSwagger(app);
  await setupHttpHeader(app);

  app.use(expressIp().getIpInfoMiddleware);

  app.use(cookieParser());

  await app.listen(3000);
}
bootstrap();
