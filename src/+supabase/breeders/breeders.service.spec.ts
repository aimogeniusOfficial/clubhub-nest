import { Test, TestingModule } from '@nestjs/testing';
import { BreedersService } from './breeders.service';

describe('BreedersService', () => {
  let service: BreedersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BreedersService],
    }).compile();

    service = module.get<BreedersService>(BreedersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
