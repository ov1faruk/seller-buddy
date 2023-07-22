import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Buyer } from './buyer.entity';
import { BuyerController } from './buyer.controller';
import { BuyerService } from './buyer.service';

@Module({
  imports: [TypeOrmModule.forFeature([Buyer])], // Make sure this line is present
  controllers: [BuyerController],
  providers: [BuyerService],
})
export class BuyerModule {}
