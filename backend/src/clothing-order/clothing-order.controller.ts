import { Controller, Delete, Get, Param, Post, Request } from '@nestjs/common';
import { ClothingOrderService } from './clothing-order.service';
import { ClothingOrderRequest } from './interface/clothing-order.interface';
import { ApiBody } from '@nestjs/swagger';
import { ClothingOrderDto } from './dto/clothing-order.dto';
import { ClothingOrderItem } from './entities/clothing-order-item.entity';
import { plainToInstance } from 'class-transformer';

@Controller('clothing-order')
export class ClothingOrderController {
  constructor(private readonly clothingOrderService: ClothingOrderService) {}

  @Post('create')
  @ApiBody({ type: ClothingOrderDto })
  createClothingOrder(@Request() req: ClothingOrderRequest) {
    const items = plainToInstance(ClothingOrderItem, req.body.items);

    return this.clothingOrderService.createClothingOrder({
      ...req.body.billInfo,
      items,
    });
  }

  @Get('all')
  getAllClothingOrders() {
    return this.clothingOrderService.getAllClothingOrders();
  }

  @Delete('delete/:id')
  deleteClothingOrder(@Param('id') id: string) {
    return this.clothingOrderService.deleteClothingOrder(parseInt(id, 10));
  }
}
