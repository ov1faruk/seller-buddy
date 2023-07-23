// src/cart/cart.controller.ts

import { Controller, Post, Body, HttpCode, HttpStatus, Session, NotFoundException ,BadRequestException , UseGuards } from '@nestjs/common';

import { CartService } from './cart.service';
import { ProductService } from '../product/product.service';
import { Product } from '../product/product.entity';
import { SessionGuard } from '../guards/session.guard';

@Controller('cart')
export class CartController {
  constructor(
    private readonly cartService: CartService,
    private readonly productService: ProductService,
  ) {}

  @Post('add') // Make sure this route path matches your POST request in Postman
  
  @UseGuards(SessionGuard)

  @HttpCode(HttpStatus.OK)
  async addToCart(@Body() addToCartDto: { productId: number, quantity: number }, @Session() session: Record<string, any>) {
    const { productId, quantity } = addToCartDto;
    try {
      const product: Product = await this.productService.getProductById(productId);
      await this.cartService.addToCart(session.buyerId, product, quantity);
      return 'Product added to the cart.';
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
  @Post('update')
  @UseGuards(SessionGuard)
  @HttpCode(HttpStatus.OK)
  async updateCartItem(@Body() updateCartDto: { cartItemId: number, quantity: number }, @Session() session: Record<string, any>) {
    const { cartItemId, quantity } = updateCartDto;

    if (quantity <= 0) {
      throw new BadRequestException('Quantity must be greater than zero');
    }

    return this.cartService.updateCartItem(session.buyerId, cartItemId, quantity);
  }

  @Post('delete')
  @UseGuards(SessionGuard)
  @HttpCode(HttpStatus.OK)
  async deleteCartItem(@Body() deleteCartDto: { cartItemId: number }, @Session() session: Record<string, any>) {
    const { cartItemId } = deleteCartDto;
    return this.cartService.deleteCartItem(session.buyerId, cartItemId);
  }
}
