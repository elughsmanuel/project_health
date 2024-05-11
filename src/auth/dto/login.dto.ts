import { 
    IsNotEmpty, 
} from 'class-validator';
import { IsString } from 'nestjs-swagger-dto';

export class LoginDto {
    @IsString()
    @IsNotEmpty()
    phone: string;
}
