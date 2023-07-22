import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Buyer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  // Add other properties as needed (e.g., name, address, etc.)
}
