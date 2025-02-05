import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class EmailService {
  private transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  async sendMail(ownerEmail: string, email: string, equity: number) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: ownerEmail,
      subject: 'New request',
      text: `User ${email} want to joins with  this ${equity}`,
    };

    return await this.transporter.sendMail(mailOptions);
  }
}
