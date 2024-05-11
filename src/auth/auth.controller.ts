import { 
    Controller,
    Post,
    Body,
    HttpCode,
    HttpStatus,
    Req,
} from '@nestjs/common';
import { 
    ApiBody,  
    ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { 
    SignUpParams,
    LoginParams,
} from './interfaces/auth-params';
import { SignUpDto } from './dto/sign-up.dto';
import { LoginDto } from './dto/login.dto';
import { AuthResult } from '../common/results/single-auth-user';
import { Public } from 'src/common/decorators/public-decorator';
import ipRequest from './utils/ip-request';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Public()
    @Post('sign-up')
    @ApiBody({ type: SignUpDto })
    @HttpCode(HttpStatus.CREATED)
    async signUp(@Body() signUpDto: SignUpDto, @Req() req: Request<{}, any>): Promise<AuthResult> {
        const {country, lastIP, countryCode, city, lastLogin} = ipRequest(req);

        const signUpParams: SignUpParams = {
            signUpDto,
            country,
            lastIP,
            countryCode,
            city,
            lastLogin,
            req,
        }

        const user = await this.authService.signUp(signUpParams);

        return user;
    }

    @Public()
    @Post('login')
    @ApiBody({ type: LoginDto })
    @HttpCode(HttpStatus.OK)
    async login(@Body() loginDto: LoginDto, @Req() req: Request<{}, any>): Promise<AuthResult> {
        const {country, lastIP, city, lastLogin} = ipRequest(req);

        const loginParams: LoginParams = {
            loginDto,
            country,
            lastIP,
            city,
            lastLogin,
            req,
        }

        const user = await this.authService.login(loginParams);

        return user;
    }
}
