import { IsString, IsNumber, IsPositive, IsOptional } from 'class-validator';

export class CartItemDto {
  @IsString()
  id: string;

  @IsString()
  productId: string;

  @IsString()
  productName: string;

  @IsNumber()
  @IsPositive()
  quantity: number;

  @IsNumber()
  @IsPositive()
  unitPrice: number;

  @IsOptional()
  @IsString()
  variant?: string;
}
