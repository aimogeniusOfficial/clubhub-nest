import { Test, TestingModule } from '@nestjs/testing';
import { BreedersController } from './breeders.controller';

describe('BreedersController', () => {
  let controller: BreedersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BreedersController],
    }).compile();

    controller = module.get<BreedersController>(BreedersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
