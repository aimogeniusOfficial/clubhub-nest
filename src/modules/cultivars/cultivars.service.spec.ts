import { Test, TestingModule } from '@nestjs/testing';
import { CultivarsService } from './cultivars.service';

describe('CultivarsService', () => {
  let service: CultivarsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CultivarsService],
    }).compile();

    service = module.get<CultivarsService>(CultivarsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
