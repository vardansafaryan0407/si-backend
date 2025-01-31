import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class EmailService {
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  async sendMail(to: string, text: string) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject: 'sms',
      text,
    };
    return await this.transporter.sendMail(mailOptions);
  }
}
