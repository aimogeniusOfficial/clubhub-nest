import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CultivarsService } from './cultivars.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Cultivar } from '@prisma/client';
import { GeneticLineageService } from '../../+supabase/genetic_lineage/genetic_lineage.service';
import { CultivarGeneticLineageDto } from './dtos/cultivar_genetic_lineage.dto';
import { RolesGuard } from 'src/auth/guards/access-roles.guard';
import { Roles } from 'src/auth/decorators/access-roles.decorator';
import { CultivarsUpdateDto } from './dtos/cultivars_update.dto';

@Controller('cultivars')
export class CultivarsController {
  constructor(
    private readonly cultivarsService: CultivarsService,
    private readonly geneticLineageService: GeneticLineageService,
  ) {}

  @Get()
  getAllBreeders(): Promise<Cultivar[]> {
    return this.cultivarsService.getAllCultivars();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('create')
  @Roles('admin')
  async createCultivar(
    @Body() data: CultivarGeneticLineageDto,
  ): Promise<Cultivar> {
    const { motherId, fatherId, ...cultivarData } = data;
    const cultivar = await this.cultivarsService.createCultivar(cultivarData);
    if (!data.isUnknown) {
      await this.geneticLineageService.createGeneticLineage({
        cultivarId: cultivar.id,
        motherId: motherId,
        fatherId: fatherId,
      });
    }

    return cultivar;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id')
  @Roles('admin')
  async updateCultivar(
    @Param('id') id: string,
    @Body() updateData: CultivarsUpdateDto,
  ): Promise<Cultivar> {
    const numericId = Number(id);
    return this.cultivarsService.updateCultivar(numericId, updateData);
  }
}
