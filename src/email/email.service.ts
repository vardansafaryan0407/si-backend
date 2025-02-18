import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      service: this.configService.get<string>('email.service'),
      auth: {
        user: this.configService.get<string>('email.user'),
        pass: this.configService.get<string>('email.pass'),
      },
    });
  }

  async sendMail(ownerEmail: string, equity: number) {
    const mailOptions = {
      from: this.configService.get<string>('email.user'),
      to: ownerEmail,
      subject: 'New request',
      text: `User wants to join with this ${equity}`,
    };

    return await this.transporter.sendMail(mailOptions);
  }
}
