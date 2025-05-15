import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column('text')
  @ApiProperty()
  email: string;

  @Column('text')
  @ApiProperty()
  name: string;

  @Column({
    default: false,
  })
  @ApiProperty()
  isAdmin: boolean;

  @Column()
  password: string; // Not exposed in API responses
}
