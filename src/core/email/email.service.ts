import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    const config = {
      host: this.configService.get('email.SMTP_HOST'),
      port: this.configService.get('email.SMTP_PORT'),
      secure: true,
      auth: {
        user: this.configService.get('email.SMTP_USER_NAME'),
        pass: this.configService.get('email.SMTP_PASSWORD'),
      },
    };
    this.transporter = nodemailer.createTransport(config);
  }

  async sendMail(ownerEmail: string, equity: number) {
    const mailOptions = {
      from: 'info@startnowapp.com',
      to: ownerEmail,
      subject: 'New request',
      text: `User wants to join with this ${equity}`,
    };
    return await this.transporter.sendMail(mailOptions);
  }
}
