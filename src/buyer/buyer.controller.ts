import { Controller, Post, Body, HttpCode, HttpStatus, Session } from '@nestjs/common';
import { BuyerService } from './buyer.service';
import { CreateBuyerDto } from './dto/create-buyer.dto';

@Controller('buyer')
export class BuyerController {
  constructor(private readonly buyerService: BuyerService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() createBuyerDto: CreateBuyerDto) {
    return this.buyerService.createBuyer(createBuyerDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginBuyerDto: CreateBuyerDto, @Session() session: Record<string, any>) {
    const buyer = await this.buyerService.findOneByEmail(loginBuyerDto.email);

    if (buyer && buyer.password === loginBuyerDto.password) {
      session.buyerId = buyer.id; // Store Buyer's ID in the session
      return { message: 'Login successful' };
    }

    return { message: 'Invalid credentials' };
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Session() session: Record<string, any>) {
    session.destroy();
    return { message: 'Logout successful' };
  }
}
