import { Controller, Post, Request } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { CaptureOrderRequest } from './interface/capture-order.interface';
import { ItemsRequest } from './interface/checkout-order.interface';

@Controller('checkout')
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}
  @Post('order')
  createOrder(@Request() request: ItemsRequest) {
    console.log('Create order request :', request.body);
    return this.checkoutService.createOrder(request.body.items);
  }

  @Post('capture')
  captureOrder(@Request() request: CaptureOrderRequest) {
    console.log('Capture order request:', request.body);
    console.log('Order ID:', request.body.orderId);
    return this.checkoutService.captureOrder(request.body.orderId);
  }
}
