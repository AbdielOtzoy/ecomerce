import { Module } from '@nestjs/common';
import { CheckoutController } from './checkout.controller';
import { CheckoutService } from './checkout.service';
import { PaypalConfigService } from 'src/config/paypal.config';

@Module({
  controllers: [CheckoutController],
  providers: [CheckoutService, PaypalConfigService],
})
export class CheckoutModule {}
