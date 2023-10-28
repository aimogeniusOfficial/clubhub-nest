import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma_client/prisma.service';
import { BreedersDto } from './dtos/breeder.dto';
import { Breeder } from '@prisma/client';

@Injectable()
export class BreedersService {
  constructor(private readonly prisma: PrismaService) {}

  async findBreeders(): Promise<Breeder[]> {
    try {
      return await this.prisma.breeder.findMany();
    } catch (error) {
      throw new InternalServerErrorException(
        `Something went wrong... ${error.message}`,
      );
    }
  }

  async createBreeder(data: BreedersDto): Promise<Breeder> {
    try {
      return await this.prisma.breeder.create({
        data: {
          ...data,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `Something went wrong ${error.message}`,
      );
    }
  }
}
