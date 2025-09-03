import { Request } from 'express';

export interface ItemsRequest extends Request {
  body: {
    items: {
      productId: string;
      productName: string;
      quantity: number;
      price: number;
    }[];
  };
}
