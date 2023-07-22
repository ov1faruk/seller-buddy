// src/buyer/buyer.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Cart } from '../cart/cart.entity'; // Import the Cart entity here

@Entity()
export class Buyer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Cart, (cart) => cart.buyer)
  cartItems: Cart[]; // Add this property for the cartItems relationship
}
