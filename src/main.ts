import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  app.enableCors({
    origin: ['http://localhost:4200'],
    credentials: true,
  });
  const uploadsDir = join(__dirname, '..', 'uploads');
  const avatarDir = join(uploadsDir, 'avatars');

  if (!existsSync(avatarDir)) {
    mkdirSync(avatarDir, { recursive: true });
  }
  app.useStaticAssets(uploadsDir, {
    prefix: '/uploads/',
  });
  await app.listen(3000);
}

bootstrap();
