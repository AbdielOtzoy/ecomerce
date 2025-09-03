import { IsNumber, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateQuantityDto {
  @IsNumber()
  @Min(0) // Permitir 0 para eliminar el item
  @Transform(({ value }) => parseInt(value, 10))
  quantity: number;
}
