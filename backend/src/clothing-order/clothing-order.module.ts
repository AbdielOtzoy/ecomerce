import { Module } from '@nestjs/common';
import { ClothingOrderService } from './clothing-order.service';
import { ClothingOrderController } from './clothing-order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClothingOrder } from './entities/clothing-order.entity';
import { ClothingOrderItem } from './entities/clothing-order-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClothingOrder, ClothingOrderItem])],
  providers: [ClothingOrderService],
  controllers: [ClothingOrderController],
  exports: [ClothingOrderService],
})
export class ClothingOrderModule {}
