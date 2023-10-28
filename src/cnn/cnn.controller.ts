import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { CnnService } from './cnn.service';
import { ImageDto } from './dtos/image.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('cnn')
export class CnnController {
  constructor(private readonly cnnService: CnnService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/predict')
  async predictImageClass(
    @Body() payload: ImageDto,
    @Req() request,
  ): Promise<any> {
    const authHeader = request.headers.authorization;
    console.log(authHeader);
    return this.cnnService.predictClass(payload, authHeader);
  }
}
