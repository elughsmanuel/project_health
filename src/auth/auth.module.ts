import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from './jwt/jwt.module';
import { User } from '../users/entity/user.entity';

@Module({
  imports: [
    UsersModule, 
    JwtModule, 
    TypeOrmModule.forFeature([User])
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
