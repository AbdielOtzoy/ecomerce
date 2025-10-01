import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ClothingOrderItem } from './clothing-order-item.entity';

@Entity('clothing_orders')
export class ClothingOrder {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column({ length: 2 })
  state: string;

  @Column()
  zip: string;

  @Column({ length: 2 })
  country: string;

  @OneToMany(() => ClothingOrderItem, (item) => item.order, {
    cascade: true, // permite que se guarden items al guardar la orden
    eager: true, // carga los items automáticamente con la orden
  })
  items: ClothingOrderItem[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
