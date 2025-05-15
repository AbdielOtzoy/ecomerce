import { IsNumber, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDto {
  @IsString()
  @ApiProperty({
    description: 'Product name',
    example: 'Laptop',
  })
  name: string;

  @IsString()
  @ApiProperty({
    description: 'Product description',
    example: 'A laptop with 16GB RAM and 512GB storage',
  })
  description: string;

  @IsNumber()
  @Min(0)
  @ApiProperty({
    description: 'Product price',
    example: 1000,
  })
  price: number;

  @IsNumber()
  @Min(0)
  @ApiProperty({
    description: 'Product stock',
    example: 100,
  })
  stock: number;

  @IsString()
  @ApiProperty({
    description: 'Product image URL',
    example: 'https://example.com/laptop.jpg',
  })
  imageUrl?: string;

  @IsString({ each: true })
  @ApiProperty({
    description: 'Product categories',
    example: ['Electronics', 'Laptops'],
  })
  categories?: string[];
}
