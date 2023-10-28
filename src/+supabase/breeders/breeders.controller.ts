import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { BreedersService } from './breeders.service';
import { BreedersDto } from './dtos/breeder.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Breeder } from '@prisma/client';

@Controller('breeders')
export class BreedersController {
  constructor(private readonly breedersService: BreedersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getAllBreeders(): Promise<Breeder[]> {
    return this.breedersService.findBreeders();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createBreeder(@Body() data: BreedersDto): Promise<Breeder> {
    return this.breedersService.createBreeder(data);
  }
}
