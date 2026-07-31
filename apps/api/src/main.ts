import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/exceptions';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { LoggerService } from './common/logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable graceful shutdown hooks
  app.enableShutdownHooks();

  // Enable API Versioning
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  const logger = app.get(LoggerService);

  app.useLogger(logger);

  // Global exception filter
  app.useGlobalFilters(new HttpExceptionFilter());

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Global response interceptor
  app.useGlobalInterceptors(new ResponseInterceptor());

  // Swagger API Documentation
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Hospital Management System API')
    .setDescription('API documentation for Hospital Management System')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 3001;

  await app.listen(port);

  logger.log(
    `🚀 Hospital Management System API is running on http://localhost:${port}`,
    'Bootstrap',
  );

  logger.log(
    `📚 Swagger documentation available at http://localhost:${port}/api/docs`,
    'Bootstrap',
  );

  process.on('SIGINT', async () => {
    logger.warn('Received SIGINT. Shutting down application...', 'Bootstrap');
    await app.close();
    process.exit(0);
  });

  process.on('SIGTERM', async () => {
    logger.warn('Received SIGTERM. Shutting down application...', 'Bootstrap');
    await app.close();
    process.exit(0);
  });
}

bootstrap();