import { Test, TestingModule } from '@nestjs/testing';
import { ClothingOrderService } from './clothing-order.service';

describe('ClothingOrderService', () => {
  let service: ClothingOrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClothingOrderService],
    }).compile();

    service = module.get<ClothingOrderService>(ClothingOrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
