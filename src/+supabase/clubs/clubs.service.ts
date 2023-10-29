import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Club } from '@prisma/client';
import { PrismaService } from 'src/prisma_client/prisma.service';

@Injectable()
export class ClubsService {
  constructor(private readonly prisma: PrismaService) {}

  async fetchClubs(): Promise<Club[]> {
    try {
      return await this.prisma.club.findMany({
        include: {
          categoryId: true,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `Something went wrong... ${error.message}`,
      );
    }
  }
}
