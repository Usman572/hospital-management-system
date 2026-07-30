import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerService } from './common/logger';
import { HttpExceptionFilter } from './common/exceptions';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logger = app.get(LoggerService);

  app.useLogger(logger);

  // Register the global exception filter
  app.useGlobalFilters(new HttpExceptionFilter());

  const port = process.env.PORT || 3001;

  await app.listen(port);

  logger.log(
    `🚀 Hospital Management System API is running on http://localhost:${port}`,
    'Bootstrap',
  );
}

bootstrap();