// dto/add-to-cart.dto.ts
import {
  IsString,
  IsNumber,
  IsPositive,
  IsOptional,
  Min,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class AddToCartDto {
  @IsString()
  productId: string;

  @IsString()
  productName: string;

  @IsNumber()
  @IsPositive()
  @Min(1)
  @Transform(({ value }) => parseInt(value))
  quantity: number;

  @IsNumber()
  @IsPositive()
  @Transform(({ value }) => parseFloat(value))
  unitPrice: number;

  @IsOptional()
  @IsString()
  imageUrl?: string;
}
