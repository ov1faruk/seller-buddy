// src/cart/cart.controller.ts

import { Controller, Post, Body, HttpCode, HttpStatus, Session, NotFoundException, BadRequestException, UseGuards, Get } from '@nestjs/common';
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

  @Post('add')
  @UseGuards(SessionGuard)
  @HttpCode(HttpStatus.OK)
  async addToCart(@Body() addToCartDto: { productId: number, quantity: number }, @Session() session: Record<string, any>) {
    const { productId, quantity } = addToCartDto;
    try {
      const product: Product = await this.productService.getProductById(productId);
      await this.cartService.addToCart(session.buyerId, product, quantity);

      // Fetch the updated cart items after adding the product
      const cartItems = await this.cartService.getCartItems(session.buyerId);

      // Manually remove the buyer's password from the response
      cartItems.forEach(cartItem => {
        if (cartItem.buyer && cartItem.buyer.password) {
          cartItem.buyer = { ...cartItem.buyer, password: undefined };
        }
      });

      // Return the custom message along with the updated cart items
      return {
        message: 'Product added to the cart.',
        cartItems: cartItems,
      };
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

    // Pass the buyerId along with cartItemId and quantity
    const updatedCartItem = await this.cartService.updateCartItem(session.buyerId, cartItemId, quantity);

    // Manually remove the buyer's password from the response
    if (updatedCartItem && updatedCartItem.buyer && updatedCartItem.buyer.password) {
      updatedCartItem.buyer = { ...updatedCartItem.buyer, password: undefined };
    }

    // Return a custom message along with the updated cart item
    return {
      message: 'Your Cart has been updated',
      cartItem: updatedCartItem,
    };
  }

  @Post('delete')
  @UseGuards(SessionGuard)
  @HttpCode(HttpStatus.OK)
  async deleteCartItem(@Body() deleteCartDto: { cartItemId: number }, @Session() session: Record<string, any>) {
    const { cartItemId } = deleteCartDto;
    return this.cartService.deleteCartItem(session.buyerId, cartItemId);
  }

  @Get('view')
  @UseGuards(SessionGuard)
  async viewCart(@Session() session: Record<string, any>) {
    try {
      // Fetch all cart items for the buyer
      const cartItems = await this.cartService.getCartItems(session.buyerId);

      // Manually remove the buyer's password from the response
      cartItems.forEach(cartItem => {
        if (cartItem.buyer && cartItem.buyer.password) {
          cartItem.buyer = { ...cartItem.buyer, password: undefined };
        }
      });

      // Return the cart items
      return {
        cartItems: cartItems,
      };
    } catch (error) {
      throw error;
    }
  }

}
