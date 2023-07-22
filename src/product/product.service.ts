// src/product/product.service.ts

import { Injectable, OnModuleInit , NotFoundException } from '@nestjs/common';
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
        name: 'Laptop - HP Spectre x360',
        price: 1299.99,
        description: 'Powerful and sleek, perfect for professionals on the go.',
      },
      {
        name: 'Book - Introduction to Computer Science',
        price: 39.99,
        description: 'A comprehensive guide for beginners in computer science.',
      },
      {
        name: 'Mobile Phone - Apple iPhone 13',
        price: 999.00,
        description: 'The latest iPhone with an incredible camera and performance.',
      },
      {
        name: 'Book - Business Management Essentials',
        price: 29.99,
        description: 'Essential concepts for aspiring business managers.',
      },
      {
        name: 'Laptop - Dell XPS 13',
        price: 1199.00,
        description: 'Slim and lightweight, a great choice for productivity.',
      },
      {
        name: 'Book - Data Structures and Algorithms',
        price: 49.99,
        description: 'Learn essential data structures and algorithms in programming.',
      },
      {
        name: 'Mobile Phone - Samsung Galaxy S21',
        price: 799.00,
        description: 'A flagship phone with stunning display and cutting-edge features.',
      },
      {
        name: 'Book - Electrical Engineering Fundamentals',
        price: 34.99,
        description: 'An introductory book for electrical engineering students.',
      },
      {
        name: 'Laptop - MacBook Air M1',
        price: 1099.00,
        description: 'Powered by the M1 chip, offering impressive performance.',
      },
      {
        name: 'Book - Marketing Strategies for Success',
        price: 27.99,
        description: 'Effective marketing strategies to boost your business.',
      },
      {
        name: 'Mobile Phone - Google Pixel 6',
        price: 699.00,
        description: 'A great phone for photography enthusiasts with top-notch camera quality.',
      },
      {
        name: 'Book - Financial Accounting Basics',
        price: 31.99,
        description: 'Learn the fundamentals of financial accounting for businesses.',
      },
      {
        name: 'Laptop - ASUS ROG Zephyrus G14',
        price: 1499.99,
        description: 'A powerful gaming laptop with a stunning display and long battery life.',
      },
      {
        name: 'Book - Human Resource Management',
        price: 33.99,
        description: 'Key concepts and strategies for effective HR management.',
      },
      {
        name: 'Mobile Phone - OnePlus 9 Pro',
        price: 899.00,
        description: 'Flagship phone with a smooth 120Hz display and impressive camera performance.',
      },
    ];

    await this.productRepository.save(dummyData);
  }

  async findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async getProductById(productId: number): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id: productId } });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

 
}
