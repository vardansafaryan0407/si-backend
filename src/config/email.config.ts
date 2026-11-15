import { registerAs } from '@nestjs/config';
import * as process from 'node:process';

export default registerAs('email', () => ({
  SMTP_REGION: process.env.SMTP_REGION,
  SMTP_PORT: Number(process.env.SMTP_PORT ?? process.env.EMAIL_PORT ?? 465),
  SECURE: process.env.EMAIL_SECURE !== 'false',
  SMTP_USER_NAME: process.env.SMTP_USER_NAME,
  SMTP_PASSWORD: process.env.SMTP_PASSWORD,
  SMTP_HOST: process.env.SMTP_HOST,
}));
