import { Module } from '@nestjs/common';
import { JwtModule as NestJwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    NestJwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  exports: [NestJwtModule],
})
export class JwtModule {}
