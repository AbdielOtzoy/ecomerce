import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/sign-up.dto';

type AuthInput = { email: string; password: string };
type SignInData = { id: number; name: string; email: string; isAdmin: boolean };
type AuthResponse = {
  access_token: string;
  user: {
    id: number;
    name: string;
    email: string;
    isAdmin: boolean;
  };
};

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<Omit<SignInData, 'password'> | null> {
    const user = await this.usersService.findOneByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...rest } = user;
      return rest;
    }

    return null;
  }

  async signIn(user: SignInData): Promise<AuthResponse> {
    const tokenPayload = {
      username: user.name,
      sub: user.id,
      email: user.email,
      isAdmin: user.isAdmin,
    };
    const access_token = await this.jwtService.signAsync(tokenPayload);
    return {
      access_token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    };
  }

  async register(user: SignUpDto): Promise<AuthResponse> {
    const hashPwd = await bcrypt.hash(user.password, 10);
    const userCreated = await this.usersService.createUser({
      ...user,
      password: hashPwd,
    });
    return this.signIn({
      id: userCreated.id,
      name: userCreated.name,
      email: userCreated.email,
      isAdmin: userCreated.isAdmin,
    });
  }

  async authenticate(input: AuthInput): Promise<AuthResponse> {
    const user = await this.validateUser(input.email, input.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.signIn(user as SignInData);
  }
}
