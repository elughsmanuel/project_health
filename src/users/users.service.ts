import { 
    Injectable,
    HttpStatus,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { LoginParams } from '../auth/interfaces/auth-params';
import { UserResult } from '../common/results/single-user';
import { AppMessages } from '../utils/app-message';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}
    
    async signUp(signUpDto: Partial<User>) {
        const user = this.userRepository.create(signUpDto);

        return this.userRepository.save(user);
    }

    async findByPhone(phone: string): Promise<User | undefined> {
        const user = this.userRepository.findOne({
            where: { phone: phone },
        });

        return user;
    }

    async findByEmail(email: string): Promise<User | undefined> {
        const user = this.userRepository.findOne({
            where: { email: email },
        });

        return user;
    }

    async loginAndUpdate(loginParams: LoginParams): Promise<User | undefined> {
        const user = await this.userRepository.findOne({
            where: { phone: loginParams.loginDto.phone },
        });

        user.country = loginParams.country;
        user.lastIP = loginParams.lastIP;
        user.city = loginParams.city;
        user.lastLogin = loginParams.lastLogin;

        const updatedUser = this.userRepository.save(user);

        return updatedUser;
    }

    async getUserProfile(userId: string) {
        const user = await this.userRepository.findOne({
            where: { userId: userId },
        });
        
        return UserResult.from({
            status: HttpStatus.OK,
            message: AppMessages.SUCCESS.USER_RETRIEVED,
            user,
        });
    }

    async updateProfilePhoto(userId: string, filename: string) {
        const userData = await this.userRepository.findOne({
            where: { userId: userId },
        });

        userData.photoURL = filename;

        const user = await this.userRepository.save(userData);

        return UserResult.from({
            status: HttpStatus.OK,
            message: AppMessages.SUCCESS.USER_RETRIEVED,
            user,
        });
    }
}
