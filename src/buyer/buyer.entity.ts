import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Cart } from '../cart/cart.entity';
import { IsEmail, IsAlphanumeric, MinLength } from 'class-validator';


@Entity()
export class Buyer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @Column()
  @IsAlphanumeric('en-US', { message: 'Password must be a combination of numbers and letters' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  @OneToMany(() => Cart, (cart) => cart.buyer)
  cartItems: Cart[];
}
