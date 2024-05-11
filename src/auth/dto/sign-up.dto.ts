import { 
    IsNotEmpty, 
    IsEmail, 
} from 'class-validator';
import { IsString } from 'nestjs-swagger-dto';

export class SignUpDto {
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsString()
    @IsNotEmpty()
    phone: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    gender: string;

    @IsString()
    @IsNotEmpty()
    dob: string;
}
