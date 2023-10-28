import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma_client/prisma.service';
import { GeneticLineageDto } from './dtos/genetic_lineage.dto';
import { GeneticLineage } from '@prisma/client';

@Injectable()
export class GeneticLineageService {
  constructor(private readonly prisma: PrismaService) {}

  async createGeneticLineage(data: GeneticLineageDto): Promise<GeneticLineage> {
    return this.prisma.geneticLineage.create({
      data: {
        ...data,
      },
    });
  }
}
