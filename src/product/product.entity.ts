// src/product/product.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Cart } from '../cart/cart.entity'; // Import the Cart entity here

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column('text', { nullable: true })
  description: string;

  @OneToMany(() => Cart, (cart) => cart.product)
  cartItems: Cart[]; // Add this property for the cartItems relationship
}
