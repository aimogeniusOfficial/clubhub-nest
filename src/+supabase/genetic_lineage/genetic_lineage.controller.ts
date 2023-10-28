import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { GeneticLineageService } from './genetic_lineage.service';
import { GeneticLineageDto } from './dtos/genetic_lineage.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GeneticLineage } from '@prisma/client';

@Controller('genetic_lineage')
export class GeneticLineageController {
  constructor(private readonly geneticLineageService: GeneticLineageService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createGeneticLineage(
    @Body() data: GeneticLineageDto,
  ): Promise<GeneticLineage> {
    return this.geneticLineageService.createGeneticLineage(data);
  }
}
