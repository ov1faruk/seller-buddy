// src/buyer/buyer.service.ts

import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Buyer } from './buyer.entity';
import { CreateBuyerDto } from './dto/create-buyer.dto';
import { validate } from 'class-validator';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class BuyerService {
  constructor(
    @InjectRepository(Buyer)
    private readonly buyerRepository: Repository<Buyer>,
    private readonly mailerService: MailerService,
  ) {}

  async createBuyer(createBuyerDto: CreateBuyerDto): Promise<Buyer> {
    const validationErrors = await this.validateBuyerDto(createBuyerDto);
    if (validationErrors.length > 0) {
      throw new HttpException({ message: 'Validation failed', errors: validationErrors }, HttpStatus.BAD_REQUEST);
    }

    const { email, password } = createBuyerDto;
    const newBuyer = this.buyerRepository.create({ email, password });

    try {
      const savedBuyer = await this.buyerRepository.save(newBuyer);

      await this.sendWelcomeEmail(email);

      return savedBuyer;
    } catch (error) {
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  private async validateBuyerDto(createBuyerDto: CreateBuyerDto): Promise<string[]> {
    const errors = [];
    const buyer = new Buyer();
    buyer.email = createBuyerDto.email;
    buyer.password = createBuyerDto.password;

    const validationErrors = await validate(buyer);
    if (validationErrors.length > 0) {
      for (const error of validationErrors) {
        const { property, constraints } = error;
        const messages = Object.values(constraints);
        errors.push(`${property} - ${messages.join(', ')}`);
      }
    }

    return errors;
  }
  
  private async sendWelcomeEmail(email: string): Promise<void> {
    await this.mailerService.sendMail({
      to: email,
      subject: '🎉 Welcome to Seller Buddy 🎉',
      html: `
        <h2>👋 Welcome to Seller Buddy!</h2>
        <p>Thank you for registering with us! 🎊🥳 We are thrilled to have you on board as a buyer.</p>
        <p>Get ready to explore a world of amazing products and great deals! 🛍️💰</p>
        <p>If you have any questions or need assistance, don't hesitate to reach out to our support team. We are here to help! 🤝</p>
        <p>Happy shopping, and have a fantastic experience on Seller Buddy! 🛒😃</p>
        <p>Best regards, 😊<br>
        The Seller Buddy Team</p>
        <img src="https://media.tenor.com/sECh_NLDlYEAAAAM/michael-scott.gif" alt="Seller Buddy" style="width: 500px; height: 400px;" />
        <p>📧 Contact us: support@sellerbuddy.com</p>
      `,
    });
  }

  async findOneByEmail(email: string): Promise<Buyer | undefined> {
    return this.buyerRepository.findOne({ where: { email } });
  }
}
