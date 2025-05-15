import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { AuthGuard } from './guards/auth.guard';
import { RequestWithUser } from './interfaces/request-with-user.interface';
import { PassportLocalGuard } from './guards/passport-local.guard';
import { PassportJwtGuard } from './guards/passport-jwt.guard';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({
    summary: 'Sign in to the application',
    description:
      'Authenticate a user with email and password to get an access token',
  })
  @ApiBody({
    type: SignInDto,
    description: 'User credentials',
    examples: {
      example1: {
        value: {
          email: 'user@example.com',
          password: 'password123',
        },
        summary: 'Basic user credentials',
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'User successfully authenticated',
    schema: {
      properties: {
        access_token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIs...' },
        user: {
          type: 'object',
          properties: {
            id: { type: 'number', example: 1 },
            email: { type: 'string', example: 'user@example.com' },
            name: { type: 'string', example: 'John Doe' },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid credentials',
    schema: {
      properties: {
        message: { type: 'string', example: 'Invalid credentials' },
        statusCode: { type: 'number', example: 401 },
      },
    },
  })
  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  @UseGuards(PassportLocalGuard)
  async signin(@Request() request: RequestWithUser) {
    return this.authService.signIn(request.user);
  }

  @ApiOperation({
    summary: 'Register a new user',
    description: 'Create a new user account with email, password, and name',
  })
  @ApiBody({
    type: SignUpDto,
    description: 'User registration data',
    examples: {
      example1: {
        value: {
          email: 'newuser@example.com',
          password: 'password123',
          name: 'John Doe',
        },
        summary: 'New user registration data',
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'User successfully registered',
    schema: {
      properties: {
        id: { type: 'number', example: 1 },
        email: { type: 'string', example: 'newuser@example.com' },
        name: { type: 'string', example: 'John Doe' },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - email already exists or invalid data',
    schema: {
      properties: {
        message: { type: 'string', example: 'Email already exists' },
        statusCode: { type: 'number', example: 400 },
      },
    },
  })
  @HttpCode(HttpStatus.OK)
  @Post('sign-up')
  async signup(@Body() signUpDto: SignUpDto) {
    return this.authService.register(signUpDto);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  @ApiOperation({
    summary: 'Get current user profile',
    description: 'Get the profile of the currently authenticated user',
  })
  @ApiResponse({
    status: 200,
    description: 'User profile retrieved successfully',
    schema: {
      properties: {
        id: { type: 'number', example: 1 },
        email: { type: 'string', example: 'user@example.com' },
        name: { type: 'string', example: 'John Doe' },
      },
    },
  })
  @UseGuards(PassportJwtGuard)
  getProfile(@Request() request: RequestWithUser) {
    return request.user;
  }
}
