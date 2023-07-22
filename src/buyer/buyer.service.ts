import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Buyer } from './buyer.entity';
import { CreateBuyerDto } from './dto/create-buyer.dto';

@Injectable()
export class BuyerService {
  constructor(
    @InjectRepository(Buyer)
    private readonly buyerRepository: Repository<Buyer>,
  ) {}

  async createBuyer(createBuyerDto: CreateBuyerDto): Promise<Buyer> {
    const { email, password } = createBuyerDto;
    const newBuyer = this.buyerRepository.create({ email, password });

    return this.buyerRepository.save(newBuyer);
  }

  async findOneByEmail(email: string): Promise<Buyer | undefined> {
    return this.buyerRepository.findOne({ where: { email } }); // Use where: { email }
  }

  // Other methods for updating, deleting buyer, etc.
}
