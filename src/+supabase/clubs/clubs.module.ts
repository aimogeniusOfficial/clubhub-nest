import { Module } from '@nestjs/common';
import { ClubsController } from './clubs.controller';
import { ClubsService } from './clubs.service';
import { PrismaModule } from 'src/prisma_client/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ClubsController],
  providers: [ClubsService],
})
export class ClubsModule {}
