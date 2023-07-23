// cart.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Buyer } from '../buyer/buyer.entity';
import { Product } from '../product/product.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;
  
  @Exclude()

  @ManyToOne(() => Buyer, (buyer) => buyer.cartItems)
  @JoinColumn({ name: 'buyerId' })
  buyer: Buyer;

  @ManyToOne(() => Product, (product) => product.cartItems)
  @JoinColumn({ name: 'productId' })
  product: Product;
}
