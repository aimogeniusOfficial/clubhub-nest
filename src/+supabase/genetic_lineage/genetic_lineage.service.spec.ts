import { Test, TestingModule } from '@nestjs/testing';
import { GeneticLineageService } from './genetic_lineage.service';

describe('GeneticLineageService', () => {
  let service: GeneticLineageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GeneticLineageService],
    }).compile();

    service = module.get<GeneticLineageService>(GeneticLineageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
