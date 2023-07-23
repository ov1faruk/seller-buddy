import { Controller, Post, Body, HttpCode, HttpStatus,HttpException, Session , UseGuards } from '@nestjs/common';
import { BuyerService } from './buyer.service';
import { CreateBuyerDto } from './dto/create-buyer.dto';
import { SessionGuard } from '../guards/session.guard';

@Controller('buyer')
export class BuyerController {
  constructor(private readonly buyerService: BuyerService) {}

  @Post('register')
  async register(@Body() createBuyerDto: CreateBuyerDto) {
    try {
      const newBuyer = await this.buyerService.createBuyer(createBuyerDto);
      return newBuyer;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
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
  @UseGuards(SessionGuard)
  @HttpCode(HttpStatus.OK)
  async logout(@Session() session: Record<string, any>) {
    session.destroy();
    return { message: 'Logout successful' };
  }
}
