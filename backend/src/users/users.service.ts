import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { SignUpDto } from './dto/sign-up.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findOnebyUsername(username: string): Promise<User> {
    const userFound = await this.userRepository.findOneBy({ email: username });
    if (!userFound) {
      throw new HttpException('User not found', 404);
    }
    return userFound;
  }

  async findOneByEmail(email: string): Promise<User> {
    const userFound = await this.userRepository.findOneBy({ email });
    if (!userFound) {
      throw new HttpException('User not found', 404);
    }
    return userFound;
  }

  async createUser(user: SignUpDto): Promise<User> {
    const userFound = await this.userRepository.findOneBy({
      email: user.email,
    });
    if (userFound) {
      throw new HttpException('User already exists', 409);
    }
    const userCreated = this.userRepository.create(user);
    return this.userRepository.save(userCreated);
  }
}
