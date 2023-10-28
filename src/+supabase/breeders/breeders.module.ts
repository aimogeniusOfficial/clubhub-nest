import { Module } from '@nestjs/common';
import { BreedersController } from './breeders.controller';
import { BreedersService } from './breeders.service';
import { PrismaModule } from 'src/prisma_client/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [BreedersController],
  providers: [BreedersService],
})
export class BreedersModule {}
