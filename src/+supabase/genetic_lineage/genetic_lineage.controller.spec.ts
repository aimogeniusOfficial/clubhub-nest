import { Test, TestingModule } from '@nestjs/testing';
import { GeneticLineageController } from './genetic_lineage.controller';

describe('GeneticLineageController', () => {
  let controller: GeneticLineageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GeneticLineageController],
    }).compile();

    controller = module.get<GeneticLineageController>(GeneticLineageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
