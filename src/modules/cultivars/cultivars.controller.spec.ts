import { Test, TestingModule } from '@nestjs/testing';
import { CultivarsController } from './cultivars.controller';

describe('CultivarsController', () => {
  let controller: CultivarsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CultivarsController],
    }).compile();

    controller = module.get<CultivarsController>(CultivarsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
