// src/cart/cart.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './cart.entity';
import { Buyer } from '../buyer/buyer.entity';
import { Product } from '../product/product.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
  ) {}

  async addToCart(buyer: Buyer, product: Product, quantity: number): Promise<void> {
    // Check if the product is already in the cart for the buyer
    const existingCartItem = await this.cartRepository.findOne({
      where: {
        buyer,
        product,
      },
    });

    if (existingCartItem) {
      existingCartItem.quantity += quantity;
      await this.cartRepository.save(existingCartItem);
    } else {
      const newCartItem = this.cartRepository.create({
        buyer,
        product,
        quantity,
      });
      await this.cartRepository.save(newCartItem);
    }
  }

  async getCartItems(buyer: Buyer): Promise<Cart[]> {
    return this.cartRepository.find({ where: { buyer }, relations: ['product'] });
  }
}
