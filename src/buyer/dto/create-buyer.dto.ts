// src/buyer/dto/create-buyer.dto.ts

import { IsEmail, IsAlphanumeric, MinLength } from 'class-validator';

export class CreateBuyerDto {
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsAlphanumeric('en-US', { message: 'Password must be a combination of numbers and letters' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;
}
