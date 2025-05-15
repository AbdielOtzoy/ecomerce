import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Logger } from '@nestjs/common';

@Injectable()
export class AdminSeedService {
  private readonly logger = new Logger(AdminSeedService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async seed() {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';

    // Verificar si ya existe un admin
    const existingAdmin = await this.userRepository.findOneBy({
      email: adminEmail,
      isAdmin: true,
    });

    if (existingAdmin) {
      this.logger.log('El usuario administrador ya existe');
      return;
    }

    // Crear el usuario admin
    const adminPassword = process.env.ADMIN_PASSWORD || 'Admin123!';
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    const admin = this.userRepository.create({
      email: adminEmail,
      name: 'Administrador',
      password: hashedPassword,
      isAdmin: true,
    });

    await this.userRepository.save(admin);
    this.logger.log(`Usuario administrador creado: ${adminEmail}`);
  }
}
