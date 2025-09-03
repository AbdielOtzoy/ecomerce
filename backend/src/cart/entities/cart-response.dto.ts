import { Type } from 'class-transformer';
import {
  IsString,
  IsOptional,
  IsArray,
  ValidateNested,
  IsNumber,
  IsDate,
} from 'class-validator';
import { CartItemDto } from './cart-item.dto';

export class CartResponseDto {
  @IsString()
  id: string;

  @IsOptional()
  @IsString()
  userId?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CartItemDto)
  items: CartItemDto[];

  @IsNumber()
  totalItems: number;

  @IsNumber()
  totalAmount: number;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}
