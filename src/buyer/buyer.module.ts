import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Buyer } from './buyer.entity';
import { BuyerController } from './buyer.controller';
import { BuyerService } from './buyer.service';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [TypeOrmModule.forFeature([Buyer]),
  MailerModule.forRoot({
    transport: {
      host: 'smtp.gmail.com',
      port: 465,
      ignoreTLS: true,
      secure: true,
      auth: {
        user: 'sellerbuddycc@gmail.com',
        pass: 'yrirwkvmsfqjkqnc',
      },
    },
  }),

], // Make sure this line is present
  controllers: [BuyerController],
  providers: [BuyerService],
})
export class BuyerModule {}
