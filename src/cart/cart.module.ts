// cart.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './cart.entity';
import { CartService } from './cart.service';
import { CartRepository } from './cart.repository'; // Make sure to import the CartRepository

@Module({
  imports: [TypeOrmModule.forFeature([Cart, CartRepository])], // Include the CartRepository here
  providers: [CartService],
  exports: [CartService],
})
export class CartModule {}
