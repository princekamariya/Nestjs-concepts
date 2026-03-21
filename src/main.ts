import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

// root file -> entry point of nestjs application

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strip properties without decorators
      forbidNonWhitelisted: true, // Throw error if extra properties sent
      transform: true, // Auto-transform payloads to DTO class types
      disableErrorMessages: false, // Set true in production to hide details
    }),
  );
  await app.listen(3000);
}
bootstrap();
