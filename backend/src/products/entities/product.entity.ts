import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  name: string;

  @Column('text')
  @ApiProperty()
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  @ApiProperty()
  price: number;

  @Column()
  @ApiProperty()
  stock: number;

  @Column({ nullable: true })
  @ApiProperty({ required: false })
  imageUrl?: string;

  @Column('text')
  @ApiProperty({ required: false, type: String })
  category?: string;

  @CreateDateColumn()
  @ApiProperty()
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty()
  updatedAt: Date;
}
