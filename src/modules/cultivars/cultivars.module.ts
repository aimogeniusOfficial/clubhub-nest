import { Module } from '@nestjs/common';
import { CultivarsController } from './cultivars.controller';
import { CultivarsService } from './cultivars.service';
import { PrismaModule } from 'src/prisma_client/prisma.module';
import { GeneticLineageModule } from '../../+supabase/genetic_lineage/genetic_lineage.module';

@Module({
  imports: [PrismaModule, GeneticLineageModule],
  controllers: [CultivarsController],
  providers: [CultivarsService],
  exports: [CultivarsService],
})
export class CultivarsModule {}
