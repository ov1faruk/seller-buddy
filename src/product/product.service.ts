// src/product/product.service.ts

import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductService implements OnModuleInit {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async onModuleInit() {
    await this.insertDummyData();
  }

  private async insertDummyData() {
    const dummyData: Partial<Product>[] = [
      {
        name: 'Product 1',
        price: 10.99,
        description: 'This is product 1',
      },
      {
        name: 'Product 2',
        price: 19.99,
        description: 'This is product 2',
      },
    ];

    await this.productRepository.save(dummyData);
  }

  async findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }
}
