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

  async sendPasswordResetEmail(
    email: string,
    resetToken: string,
    baseUrl: string,
  ) {
    const resetUrl = `${baseUrl}${resetToken}`;
    const mailOptions = {
      from: 'info@startnowapp.com',
      to: email,
      subject: 'Password Reset Request',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Password Reset Request</h2>
          <p>You have requested to reset your password. Click the button below to reset your password:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">
              Reset Password
            </a>
          </div>
          <p>Or copy and paste this link in your browser:</p>
          <p><a href="${resetUrl}">${resetUrl}</a></p>
          <p>This link will expire in 1 hour.</p>
          <p>If you didn't request this password reset, please ignore this email.</p>
        </div>
      `,
      text: `
        Password Reset Request
        
        You have requested to reset your password. Click the link below to reset your password:
        ${resetUrl}
        
        This link will expire in 1 hour.
        
        If you didn't request this password reset, please ignore this email.
      `,
    };
    return await this.transporter.sendMail(mailOptions);
  }
}
