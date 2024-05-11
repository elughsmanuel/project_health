import { 
    Injectable,
    InternalServerErrorException,
} from "@nestjs/common";
import * as AWS from 'aws-sdk';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class AppUpload{
    AWS_S3_BUCKET = String(process.env.S3_BUCKET_NAME);
    s3 = new AWS.S3({
      accessKeyId: String(process.env.S3_ACCESS_KEY),
      secretAccessKey: String(process.env.S3_SECRET_ACCESS_KEY),
      region: String(process.env.S3_BUCKET_REGION),
    });
  
    async uploadFile(file: any) {
      const { originalname } = file;
  
      return await this.s3_upload(
        file.buffer,
        this.AWS_S3_BUCKET,
        originalname,
        file.mimetype,
      );
    }

    async s3_upload(file: any, bucket: string, name: string, mimetype: string) {
        const params = {
          Bucket: bucket,
          Key: name,
          Body: file,
          ContentType: mimetype,
          ContentDisposition: 'inline',
        };
    
        try {
          let s3Response = await this.s3.upload(params).promise();

          return s3Response;
        } catch  {
          throw new InternalServerErrorException();
        }
    }
}
