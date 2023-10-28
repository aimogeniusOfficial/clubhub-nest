import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JournalService } from './journal.service';
import { JournalEntryDto } from './dtos/journal-entry.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PaginationDto } from 'src/dtos/pagination.dto';
import { PaginatedResult } from 'src/paginator';
import { JournalEntry } from '@prisma/client';
import { AuthenticatedRequest } from '../+dtos/authenticated-request';

@Controller('journal')
export class JournalController {
  constructor(private readonly journalEntryService: JournalService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getAllJournalEntry(
    @Query() paginationDto: PaginationDto,
    @Query('growSpaceId') growSpaceId?: string,
  ): Promise<PaginatedResult<JournalEntry>> {
    return this.journalEntryService.getAllJournalEntry(
      paginationDto,
      growSpaceId,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get(':journalEntryId')
  getJournalEntry(@Param('journalEntryId') journalEntryId: string) {
    const numericId = Number(journalEntryId);
    return this.journalEntryService.getJournalEntryById(numericId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createJournalEntry(@Body() data: JournalEntryDto): Promise<JournalEntry> {
    return this.journalEntryService.createJounalEntry(data);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':journalEntryId')
  updateJournalEntry(
    @Param('journalEntryId') id: string,
    @Body() data: JournalEntryDto,
  ): Promise<JournalEntry> {
    const numericId = Number(id);
    return this.journalEntryService.updateJournalEntry(numericId, data);
  }

  @UseGuards(JwtAuthGuard)
  @Post('like/:journalEntryId')
  async toggleLike(
    @Param('journalEntryId') journalEntryId: string,
    @Request() req,
  ): Promise<void> {
    const numericId = Number(journalEntryId);
    return this.journalEntryService.toggleLike(numericId, req.user.userId);
  }
}
