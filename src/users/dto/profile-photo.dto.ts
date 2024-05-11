import { ApiProperty } from '@nestjs/swagger';

export class ProfilePhotoDto {
    @ApiProperty({ type: 'string', format: 'binary' })
    file: any;
}
