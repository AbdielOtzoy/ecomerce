import { Controller, Post, Request } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { CaptureOrderRequest } from './interface/capture-order.interface';
import { ItemsRequest } from './interface/checkout-order.interface';

@Controller('checkout')
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}
  @Post('order')
  createOrder(@Request() request: ItemsRequest) {
    return this.checkoutService.createOrder(request.body.items);
  }

  @Post('capture')
  captureOrder(@Request() request: CaptureOrderRequest) {
    return this.checkoutService.captureOrder(request.body.orderId);
  }
}
