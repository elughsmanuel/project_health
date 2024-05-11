import { Request } from "express";
import { SignUpDto } from "../dto/sign-up.dto";
import { LoginDto } from "../dto/login.dto";

export interface SignUpParams {
    signUpDto: SignUpDto;
    country: string;
    lastIP: string;
    countryCode: string;
    city: string;
    lastLogin: string;
    req: Request<{}, any>;
}

export interface LoginParams {
    loginDto: LoginDto;
    country: string;
    lastIP: string;
    city: string;
    lastLogin: string;
    req: Request<{}, any>;
}

export interface AuthenticatedRequest extends Request {
    user?: any;
}
