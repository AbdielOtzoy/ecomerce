import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Product name',
    example: 'Laptop',
  })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Product description',
    example: 'A laptop with 16GB RAM and 512GB storage',
  })
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => parseFloat(value)) // Para convertir desde FormData
  @ApiProperty({
    description: 'Product price',
    example: 1000,
  })
  price: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => parseInt(value)) // Para convertir desde FormData
  @ApiProperty({
    description: 'Product stock',
    example: 100,
  })
  stock: number;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Product image URL',
    example: 'https://example.com/laptop.jpg',
    required: false,
  })
  imageUrl?: string;

  @IsOptional()
  @IsString({ each: true })
  @Transform(({ value }) => {
    // Manejar tanto array como string separado por comas desde FormData
    if (typeof value === 'string') {
      return value.split(',').map((cat) => cat.trim());
    }
    return value;
  })
  @ApiProperty({
    description: 'Product categories',
    example: ['Electronics', 'Laptops'],
    required: false,
  })
  categories?: string[];
}
