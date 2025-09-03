import { Injectable } from '@nestjs/common';
import {
  CheckoutPaymentIntent,
  OrdersController,
} from '@paypal/paypal-server-sdk';
import { PaypalConfigService } from 'src/config/paypal.config';

@Injectable()
export class CheckoutService {
  constructor(private paypalConfigService: PaypalConfigService) {}

  async createOrder(
    items: {
      productId: string;
      productName: string;
      quantity: number;
      price: number;
    }[],
  ) {
    // return message indicating that the order creation logic is not implemented yet
    const client = this.paypalConfigService.getClient();
    const shippingCost = 4.99;

    const itemsSubtotal = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    const total = itemsSubtotal + shippingCost;

    const collect = {
      body: {
        intent: CheckoutPaymentIntent.Capture,
        purchaseUnits: [
          {
            referenceId: 'PUHF',
            amount: {
              currencyCode: 'USD',
              value: total.toFixed(2),
              breakdown: {
                itemTotal: {
                  currencyCode: 'USD',
                  value: itemsSubtotal.toFixed(2), // only products
                },
                shipping: {
                  currencyCode: 'USD',
                  value: shippingCost.toFixed(2), // shipping separately
                },
              },
            },
            items: items.map((item) => ({
              name: item.productName,
              unitAmount: {
                currencyCode: 'USD',
                value: item.price.toFixed(2),
              },
              quantity: item.quantity.toString(),
            })),
          },
        ],
      },
      prefer: 'return=minimal',
    };

    const ordersController = new OrdersController(client);
    try {
      const { result, ...httpResponse } =
        await ordersController.createOrder(collect);
      const { statusCode, headers } = httpResponse;
      console.log('Status Code:', statusCode);
      console.log('Headers:', headers);
      return result;
    } catch (error) {
      console.error('Error creating order:', error);
      return { error: 'Failed to create order.' };
    }
  }

  async captureOrder(orderId: string) {
    console.log('Capturing order with ID:', orderId);
    const client = this.paypalConfigService.getClient();
    const ordersController = new OrdersController(client);
    const collect = {
      id: orderId,
      prefer: 'return=minimal',
    };

    try {
      const { result, ...httpResponse } =
        await ordersController.captureOrder(collect);
      console.log('Order captured successfully:', result);
      console.log('HTTP Response:', httpResponse);
      return result;
    } catch (error) {
      console.error('Error capturing order:', error);
      return { error: 'Failed to capture order.' };
    }
  }
}
