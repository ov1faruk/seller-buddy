// src/cart/cart.service.ts

import { Injectable ,NotFoundException, BadRequestException } from '@nestjs/common';
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

  async getCartItems(buyerId: number): Promise<Cart[]> {
    return this.cartRepository.find({ where: { buyer: { id: buyerId } }, relations: ['product'] });
  }

  async updateCartItem(buyerId: number, cartItemId: number, quantity: number): Promise<Cart> {
    const cartItem = await this.cartRepository.findOne({ 
      where: { 
        id: cartItemId, 
        buyer: { id: buyerId } 
      },
      relations: ['buyer'],
    });
  
    if (!cartItem) {
      throw new NotFoundException('Item not found in cart');
    }
  
    cartItem.quantity = quantity;
  
    return this.cartRepository.save(cartItem);
  }
  
  async deleteCartItem(buyerId: number, cartItemId: number): Promise<void> {
    const cartItem = await this.cartRepository.findOne({ 
      where: { 
        id: cartItemId, 
        buyer: { id: buyerId } 
      },
      relations: ['buyer'],
    });
  
    if (!cartItem) {
      throw new NotFoundException('Item not found in cart');
    }
  
    await this.cartRepository.remove(cartItem);
  }

  async getCartItemsByBuyerId(buyerId: number): Promise<Cart[]> {
    return this.cartRepository.find({ where: { buyer: { id: buyerId } }, relations: ['product'] });
  }
}
