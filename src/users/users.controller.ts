import { 
    Controller, 
    Get, 
    Req, 
    HttpCode,
    HttpStatus,
    Patch,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { 
    ApiTags,
    ApiCookieAuth,
    ApiBody,
    ApiConsumes,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { UsersService } from './users.service';
import { AuthenticatedRequest } from '../auth/interfaces/auth-params';
import { UserResult } from '../common/results/single-user';
import { ProfilePhotoDto } from './dto/profile-photo.dto';
import { AppUpload } from '../config/upload.config';

@Controller('users')
@ApiTags('users')
export class UsersController {
    constructor(
        private readonly userService: UsersService,
        private readonly appUpload: AppUpload,
    ) {}

    @Get('profile')
    @ApiCookieAuth()
    @HttpCode(HttpStatus.OK)
    async getProfile(@Req() req: AuthenticatedRequest): Promise<UserResult> {
        const userId = req.user.userId;
        
        const user = await this.userService.getUserProfile(userId);
        
        return user;
    }

    @Patch('update-profile-photo')
    @ApiCookieAuth()
    @ApiConsumes("multipart/form-data")
    @UseInterceptors(FileInterceptor('file'))
    @ApiBody({ type: ProfilePhotoDto })
    @HttpCode(HttpStatus.OK)
    async updateProfilePhoto(@Req() req: AuthenticatedRequest, @UploadedFile() file: Express.Multer.File): Promise<UserResult> {
        const userId = req.user.userId;

        const fileData = await this.appUpload.uploadFile(file);

        const filename = fileData.Location;
        const user = await this.userService.updateProfilePhoto(userId, filename);

        return user;
    }
}
