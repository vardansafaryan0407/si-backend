// Load .env before any module reads process.env (config.db.ts, jwt.constant.ts, the gateway).
import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    rawBody: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  app.use('/payment/webhook', bodyParser.raw({ type: 'application/json' }));

  // Comma-separated list of allowed browser origins, e.g. "https://startnowapp.com,https://www.startnowapp.com".
  const corsOrigins = (process.env.CORS_ORIGINS ?? 'http://localhost:4200')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

  app.enableCors({
    origin: corsOrigins,
    credentials: true,
  });

  const uploadsDir = join(__dirname, '..', 'uploads');
  const avatarDir = join(uploadsDir, 'avatars');
  if (!existsSync(avatarDir)) mkdirSync(avatarDir, { recursive: true });

  app.useStaticAssets(uploadsDir, { prefix: '/uploads/' });

  app.enableShutdownHooks();

  await app.listen(Number(process.env.PORT ?? 3000), '0.0.0.0');
}
bootstrap();
