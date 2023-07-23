import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BuyerModule } from './buyer/buyer.module';
import { ProductModule } from './product/product.module';
import { CartModule } from './cart/cart.module';
import { CartController } from './cart/cart.controller'; // Adjust the path accordingly
import { EmailService } from './email/email.service';



@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', // Database type
      host: 'localhost', // Database host
      port: 5432, // Database port
      username: 'postgres', // Database username
      password: '1234', // Database password
      database: 'buyer', // Name of the database you created
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // Location of your entity files
      synchronize: true, // Auto-create database tables based on entity definitions (only use in development)
    }),
    BuyerModule,
    ProductModule,
    CartModule,
  ],
  controllers: [AppController , CartController],
  providers: [AppService, EmailService],
})
export class AppModule {}
