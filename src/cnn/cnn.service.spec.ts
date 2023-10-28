import { Test, TestingModule } from '@nestjs/testing';
import { CnnService } from './cnn.service';

describe('CnnService', () => {
  let service: CnnService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CnnService],
    }).compile();

    service = module.get<CnnService>(CnnService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
