import { 
    Injectable,
    HttpStatus,
    BadRequestException,
    UnauthorizedException,
    Req,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import * as dotenv from 'dotenv';
dotenv.config();
import { UsersService } from '../users/users.service';
import { User } from '../users/entity/user.entity';
import { 
    SignUpParams,
    LoginParams,
} from './interfaces/auth-params';
import { AuthResult } from '../common/results/single-auth-user';
import { AppMessages } from '../utils/app-message';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService,
    ) {}
  
    async signUp(signUpParams: SignUpParams) {
        await this._throwIfPhoneAlreadyRegistered(signUpParams.signUpDto.phone);
        await this._throwIfEmailAlreadyRegistered(signUpParams.signUpDto.email);

        const user = await this._saveUser(signUpParams);

        const token = await this._setCookie(user, signUpParams.req);

        return AuthResult.from({
            status: HttpStatus.CREATED,
            message: AppMessages.SUCCESS.USER_CREATED,
            user,
            accessToken: token,
        });
    }

    async login(loginParams: LoginParams) {
       await this._findUserOrThrow(loginParams.loginDto.phone);

        const user = await this.userService.loginAndUpdate(loginParams);

        const token = await this._setCookie(user, loginParams.req);

        return AuthResult.from({
            status: HttpStatus.OK,
            message: AppMessages.SUCCESS.LOGIN_SUCCESS,
            user,
            accessToken: token,
        });
    }

    private async _throwIfPhoneAlreadyRegistered(phone: string) {
        const user = await this.userService.findByPhone(phone);

        if(user) {
            throw new BadRequestException(AppMessages.FAILURE.PHONE_EXITS);
        }
    }

    private async _throwIfEmailAlreadyRegistered(email: string) {
        const user = await this.userService.findByEmail(email);

        if(user) {
            throw new BadRequestException(AppMessages.FAILURE.EMAIL_EXITS);
        }
    }

    private async _saveUser(signUpParams: SignUpParams) {
        const userData: Partial<User> = {
            firstName: signUpParams.signUpDto.firstName,
            lastName: signUpParams.signUpDto.lastName,
            phone: signUpParams.signUpDto.phone,
            email: signUpParams.signUpDto.email,
            gender: signUpParams.signUpDto.gender,
            dob: signUpParams.signUpDto.dob,
            country: signUpParams.country,
            lastIP: signUpParams.lastIP,
            countryCode: signUpParams.countryCode,
            city: signUpParams.city,
            lastLogin: signUpParams.lastLogin,
        };
    
        const user = await this.userService.signUp(userData);
        
        return user;
    }

    private async _findUserOrThrow(phone: string) {
        const user = await this.userService.findByPhone(phone);

        if (!user) {
          throw new UnauthorizedException(AppMessages.FAILURE.INVALID_CREDENTIAL);
        }
    
        return user;
    }

    private async _generateAccessToken(user: User): Promise<string> {
        const payload = { 
            userId: user.userId, 
            phone: user.phone,
        };

        const expiresIn = process.env.JWT_EXPIRES_IN;
        
        return await this.jwtService.signAsync(payload, { expiresIn });
    }

    private async _setCookie(user: User,  @Req() req: Request<{}, any>) {
        const token = await this._generateAccessToken(user);

        const cookieExpiresIn = Number(process.env.JWT_COOKIE_EXPIRES_IN);
        const cookieOptions = {
            httpOnly: true,
            expires: new Date(Date.now() + cookieExpiresIn * 24 * 60 * 60 * 1000),
            secure: true,
        };

        req.res.cookie('accessToken', token, cookieOptions);

        return token;
    }
}
