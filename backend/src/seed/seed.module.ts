import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { AdminSeedService } from './admin.seed';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [AdminSeedService],
  exports: [AdminSeedService],
})
export class SeedModule {}
