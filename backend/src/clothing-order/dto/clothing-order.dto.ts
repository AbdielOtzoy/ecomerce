import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Length,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class ClothingOrderItemDto {
  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsString()
  @IsNotEmpty()
  productName: string;

  @IsNumber()
  @Min(1)
  quantity: number;

  @IsNumber()
  @IsPositive()
  price: number;
}

class BillingInformationDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @Length(2, 2, { message: 'State must be a 2-letter code' })
  state: string;

  @IsString()
  @IsNotEmpty()
  zip: string;

  @IsString()
  @Length(2, 2, { message: 'Country must be a 2-letter code' })
  country: string;
}

export class ClothingOrderDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ClothingOrderItemDto)
  items: ClothingOrderItemDto[];

  @ValidateNested()
  @Type(() => BillingInformationDto)
  billInfo: BillingInformationDto;
}
