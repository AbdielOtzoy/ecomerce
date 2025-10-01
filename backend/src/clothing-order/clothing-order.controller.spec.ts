import { Test, TestingModule } from '@nestjs/testing';
import { ClothingOrderController } from './clothing-order.controller';

describe('ClothingOrderController', () => {
  let controller: ClothingOrderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClothingOrderController],
    }).compile();

    controller = module.get<ClothingOrderController>(ClothingOrderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
