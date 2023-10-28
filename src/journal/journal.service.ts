import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma_client/prisma.service';
import { JournalEntryDto } from './dtos/journal-entry.dto';
import {
  PaginatedResult,
  PaginateFunction,
  PaginateOptions,
  paginator,
} from 'src/paginator';
import { PaginationDto } from 'src/dtos/pagination.dto';
import { JournalEntry } from '@prisma/client';

@Injectable()
export class JournalService {
  private paginate: PaginateFunction;

  constructor(private readonly prisma: PrismaService) {
    const defaultOptions: PaginateOptions = {
      page: 1,
      perPage: 10,
    };
    this.paginate = paginator(defaultOptions);
  }

  async getAllJournalEntry(
    paginationDto: PaginationDto,
    growSpaceId?: string,
  ): Promise<PaginatedResult<JournalEntry>> {
    const { skip, take } = paginationDto;
    try {
      const options: PaginateOptions = {
        page: skip / take + 1,
        perPage: take,
      };

      const whereCondition = growSpaceId
        ? {
            growCycle: {
              growSpaceId: growSpaceId,
            },
          }
        : {};

      return await this.paginate(
        this.prisma.journalEntry,
        {
          where: whereCondition,
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            user: true,
            attachments: true,
            likes: true,
          },
        },
        options,
      );
    } catch (error) {
      throw new InternalServerErrorException(
        `Something went wrong... ${error.message}`,
      );
    }
  }

  async getJournalEntryById(id: number): Promise<JournalEntry> {
    try {
      return this.prisma.journalEntry.findUnique({
        where: {
          id: id,
        },
        include: {
          user: true,
          attachments: true,
          likes: true,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `Error fetching the journal entry: ${error.message}`,
      );
    }
  }

  async createJounalEntry(data: JournalEntryDto): Promise<JournalEntry> {
    try {
      const newBreeder = await this.prisma.journalEntry.create({
        data: {
          ...data,
        },
      });
      return newBreeder;
    } catch (error) {
      throw new InternalServerErrorException(
        `Something went wrong ${error.message}`,
      );
    }
  }

  async updateJournalEntry(
    id: number,
    updateData: JournalEntryDto,
  ): Promise<JournalEntry> {
    const existingEntry = await this.prisma.journalEntry.findUnique({
      where: { id: id },
    });

    if (!existingEntry) {
      throw new NotFoundException(`Journal entry with id ${id} not found`);
    }

    const currentTime = new Date();
    const createdAt = new Date(existingEntry.createdAt);
    const timeDifference =
      (currentTime.getTime() - createdAt.getTime()) / 60000;

    if (timeDifference > 5) {
      throw new ForbiddenException(
        'You can only update this journal entry within 5 minutes of its creation',
      );
    }

    return this.prisma.journalEntry.update({
      where: {
        id: id,
      },
      data: {
        growCycleId: updateData.growCycleId,
        createdBy: updateData.createdBy,
        entryText: updateData.entryText,
      },
    });
  }

  async toggleLike(journalEntryId: number, userId: string): Promise<void> {
    try {
      const existingLike = await this.prisma.journalEntryLike.findUnique({
        where: {
          journalEntryId_userId: {
            journalEntryId: journalEntryId,
            userId: userId,
          },
        },
      });

      if (existingLike) {
        await this.prisma.journalEntryLike.delete({
          where: {
            id: existingLike.id,
          },
        });
      } else {
        await this.prisma.journalEntryLike.create({
          data: {
            journalEntryId: journalEntryId,
            userId: userId,
          },
        });
      }
    } catch (error) {
      throw new InternalServerErrorException(
        `Error toggling the like for journal entry: ${error.message}`,
      );
    }
  }
}
