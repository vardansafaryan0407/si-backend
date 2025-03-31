import { registerAs } from '@nestjs/config';
import * as process from 'node:process';

export default registerAs('email', () => ({
  SMTP_REGION: process.env.SMTP_REGION,
  PORT: +process.env.EMAIL_PORT,
  SECURE: process.env.EMAIL_SECURE,
  SMTP_USER_NAME: process.env.SMTP_USER_NAME,
  SMTP_PASSWORD: process.env.SMTP_PASSWORD,
  SMTP_HOST: process.env.SMTP_HOST,
}));
