import { Injectable, BadRequestException } from '@nestjs/common';
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class S3Service {
  private s3: S3Client;
  private bucket: string;
  private region: string;

  constructor(private config: ConfigService) {
    this.region = this.config.get<string>('AWS_REGION');
    this.bucket = this.config.get<string>('AWS_BUCKET_NAME');

    // Explicit keys are for local development. When they are absent (the EC2 instance),
    // the SDK falls back to the default chain, i.e. the instance role.
    const accessKeyId = this.config.get<string>('AWS_ACCESS_KEY_ID');
    const secretAccessKey = this.config.get<string>('AWS_SECRET_ACCESS_KEY');
    const sessionToken = this.config.get<string>('AWS_SESSION_TOKEN');

    this.s3 = new S3Client({
      region: this.region,
      ...(accessKeyId && secretAccessKey
        ? {
            credentials: {
              accessKeyId,
              secretAccessKey,
              sessionToken: sessionToken || undefined,
            },
          }
        : {}),
    });
  }

  async uploadFile(file: Express.Multer.File, key: string): Promise<string> {
    if (!file || !file.buffer) {
      throw new BadRequestException('Empty file buffer');
    }

    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    });

    await this.s3.send(command);

    return key;
  }

  async getSignedUrlForGet(key: string, expiresInSec = 3600): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: this.bucket,
      Key: key,
    });
    return getSignedUrl(this.s3, command, { expiresIn: expiresInSec });
  }
}
