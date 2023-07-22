import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Buyer } from './buyer.entity';
import { CreateBuyerDto } from './dto/create-buyer.dto';
import { MailerService } from '@nestjs-modules/mailer'; 

@Injectable()
export class BuyerService {
  constructor(
    @InjectRepository(Buyer)
    private readonly buyerRepository: Repository<Buyer>,
    private readonly mailerService: MailerService,
  ) {}

  async createBuyer(createBuyerDto: CreateBuyerDto): Promise<Buyer> {
    const { email, password } = createBuyerDto;
    const newBuyer = this.buyerRepository.create({ email, password });

    // Save the newBuyer to the database
    const savedBuyer = await this.buyerRepository.save(newBuyer);

    // Send welcome email to the registered buyer
    await this.sendWelcomeEmail(createBuyerDto.email);

    return savedBuyer;
  }

  private async sendWelcomeEmail(email: string): Promise<void> {
    await this.mailerService.sendMail({
      to: email, // Send the email to the registered buyer
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
    return this.buyerRepository.findOne({ where: { email } }); // Use where: { email }
  }

  // Other methods for updating, deleting buyer, etc.
}
