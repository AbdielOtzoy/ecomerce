import { Request } from 'express';

export interface ClothingOrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

export interface BillingInformation {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  state: string; // 2-letter code
  zip: string;
  country: string; // 2-letter code
}

export interface ClothingOrderRequest extends Request {
  body: {
    items: ClothingOrderItem[];
    billInfo: BillingInformation;
  };
}
