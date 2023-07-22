// src/email/email.service.ts

import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'sellerbuddycc@gmail.com', // Replace with your Gmail username
        pass: 'icksjhvfymfhiulw', // Replace with your Gmail password
      },
    });
  }

  async sendRegistrationEmail(email: string): Promise<void> {
    const mailOptions = {
      to: email,
      from: 'sellerbuddycc@gmail.com', // Replace with your email address
      subject: 'Welcome to our website!',
      text: 'Thank you for registering on our website. We look forward to serving you!',
    };

    await this.transporter.sendMail(mailOptions);
  }
}
