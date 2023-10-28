import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseClientService } from '../supabase-client/supabase-client.service';
import axios from 'axios';
import { UploadImageDto } from './dtos/upload.image.dto';

@Injectable()
export class StorageService {
  private readonly supabase: SupabaseClient;

  constructor(private readonly supabaseClient: SupabaseClientService) {
    this.supabase = this.supabaseClient.useSupabase();
  }

  async uploadImageToBucket(payload: UploadImageDto): Promise<string> {
    const response = await axios.get(payload.image_url, {
      responseType: 'arraybuffer',
    });
    const image = Buffer.from(response.data);

    const { data: pathToImage, error } = await this.supabase.storage
      .from(payload.bucket)
      .upload(`public/${payload.name}.jpeg`, image, {
        contentType: 'image/jpeg',
      });

    if (error) {
      throw new InternalServerErrorException(
        `Could not upload to storage, ${error.message}`,
      );
    }

    const { data } = this.supabase.storage
      .from(payload.bucket)
      .getPublicUrl(pathToImage.path);

    return data.publicUrl;
  }
}
