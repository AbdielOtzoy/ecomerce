import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { CloudinaryConfigService } from '../config/cloudinary.config';

@Module({
  providers: [UploadService, CloudinaryConfigService],
  exports: [UploadService, CloudinaryConfigService],
})
export class UploadModule {}
