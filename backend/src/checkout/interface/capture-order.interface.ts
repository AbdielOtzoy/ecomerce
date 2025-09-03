import { Request } from 'express';

export interface CaptureOrderRequest extends Request {
  body: {
    orderId: string;
  };
}
