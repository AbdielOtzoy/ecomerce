import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ClothingOrder } from './clothing-order.entity';

@Entity('clothing_order_items')
export class ClothingOrderItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  productId: string;

  @Column()
  productName: string;

  @Column('int')
  quantity: number;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @ManyToOne(() => ClothingOrder, (order) => order.items, {
    onDelete: 'CASCADE',
  })
  order: ClothingOrder;
}
