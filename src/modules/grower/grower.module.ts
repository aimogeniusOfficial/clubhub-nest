import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma_client/prisma.service';
import { CurrentGrowerController } from './current-grower.controller';
import { GrowerCultivarService } from './grower-cultivar.service';
import { GrowSpaceModule } from '../grow-space/grow-space.module';
import { CultivarsModule } from '../cultivars/cultivars.module';

@Module({
  imports: [CultivarsModule, GrowSpaceModule],
  controllers: [CurrentGrowerController],
  providers: [PrismaService, GrowerCultivarService],
})
export class GrowerModule {}
