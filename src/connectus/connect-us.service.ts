import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class ConnectUsService {
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

  async sendConnectMessage(email: string, subject: string, description: string) {
    const mailOptions = {
      from: 'info@startnowapp.com',
      to: '741230real@gmail.com', 
      subject: `Connect Us: ${subject}`,
      html: `
        <h2>New Connect Us Message</h2>
        <p><strong>From:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Description:</strong></p>
        <p>${description}</p>
      `,
      text: `
        From: ${email}
        Subject: ${subject}
        Description:
        ${description}
      `,
    };

    return await this.transporter.sendMail(mailOptions);
  }
}
