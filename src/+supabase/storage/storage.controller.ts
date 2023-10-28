import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { StorageService } from './storage.service';
import { UploadImageDto } from './dtos/upload.image.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('storage')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @UseGuards(JwtAuthGuard)
  @Post('image')
  uploadImage(@Body() payload: UploadImageDto) {
    return this.storageService.uploadImageToBucket(payload);
  }
}
