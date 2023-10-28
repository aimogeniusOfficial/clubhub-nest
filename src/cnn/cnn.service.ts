import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { ImageDto } from './dtos/image.dto';

@Injectable()
export class CnnService {
  constructor(private readonly configService: ConfigService) {}

  async predictClass(payload: ImageDto, authHeader: string) {
    const cnnServerUrl = this.configService.get<string>('CNN_SERVER_URL');

    try {
      const response = await axios.post(`${cnnServerUrl}/predict`, payload, {
        headers: {
          Authorization: authHeader,
        },
      });
      return response.data;
    } catch (error) {
      throw new InternalServerErrorException(
        `Error making prediction request: ${error.message}`,
      );
    }
  }
}
