import { Controller, Get, UseGuards } from '@nestjs/common';
import { ClubsService } from './clubs.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Club } from '@prisma/client';

@Controller('clubs')
export class ClubsController {
  constructor(private readonly clubsService: ClubsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  fetchClubs(): Promise<Club[]> {
    return this.clubsService.fetchClubs();
  }
}
