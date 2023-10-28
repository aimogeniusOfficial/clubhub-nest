import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma_client/prisma.module';
import { GeneticLineageController } from './genetic_lineage.controller';
import { GeneticLineageService } from './genetic_lineage.service';

@Module({
  imports: [PrismaModule],
  controllers: [GeneticLineageController],
  providers: [GeneticLineageService],
  exports: [GeneticLineageService],
})
export class GeneticLineageModule {}
