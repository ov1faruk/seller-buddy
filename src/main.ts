import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  app.use(
    session({
      secret: 'your_secret_key_here', // Replace with your own secret key
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false }, // Set 'secure' to true if using HTTPS
    }),
  );

  await app.listen(3000);
}
bootstrap();
