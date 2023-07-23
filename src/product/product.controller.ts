import { Controller, Get , Query , UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { SessionGuard } from '../guards/session.guard';

@Controller('products')

export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @UseGuards(SessionGuard)
  @SetMetadata('message', 'You must log in to view your profile')
  async getAllProducts(): Promise<Product[]> {
    return this.productService.findAll(); // Update the method name here
  }

  @Get('search')
  @UseGuards(SessionGuard)
  async searchProducts(@Query('q') keyword: string) {
    if (!keyword || keyword.trim() === '') {
      return [];
    }

    return this.productService.searchProducts(keyword);
  }
}
