import { Module } from '@nestjs/common';
import { CnnController } from './cnn.controller';
import { CnnService } from './cnn.service';

@Module({
  controllers: [CnnController],
  providers: [CnnService],
})
export class CnnModule {}
