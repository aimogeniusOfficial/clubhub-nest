import { Test, TestingModule } from '@nestjs/testing';
import { CnnController } from './cnn.controller';

describe('CnnController', () => {
  let controller: CnnController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CnnController],
    }).compile();

    controller = module.get<CnnController>(CnnController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
