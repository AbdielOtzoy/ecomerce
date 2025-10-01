import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClothingOrder } from './entities/clothing-order.entity';
import { Repository } from 'typeorm';
import { ClothingOrderItem } from './entities/clothing-order-item.entity';

@Injectable()
export class ClothingOrderService {
  constructor(
    @InjectRepository(ClothingOrder)
    private readonly clothingOrderRepository: Repository<ClothingOrder>,
    @InjectRepository(ClothingOrderItem)
    private readonly clothingOrderItemRepository: Repository<ClothingOrderItem>,
  ) {}

  async createClothingOrder(
    orderData: Partial<ClothingOrder>,
  ): Promise<ClothingOrder> {
    const order = this.clothingOrderRepository.create(orderData);
    return this.clothingOrderRepository.save(order);
  }

  async getAllClothingOrders(): Promise<ClothingOrder[]> {
    return this.clothingOrderRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async deleteClothingOrder(id: number): Promise<void> {
    await this.clothingOrderRepository.delete(id);
  }
}
