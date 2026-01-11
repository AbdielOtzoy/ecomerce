import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { SeedModule } from './seed/seed.module';
import { UploadModule } from './upload/upload.module';
import configuration from './config/configuration';
import { validate } from './config/env.validation';
import { CartModule } from './cart/cart.module';
import { CheckoutModule } from './checkout/checkout.module';
import { ClothingOrderModule } from './clothing-order/clothing-order.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validate,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.name'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: process.env.NODE_ENV !== 'production',

        // ⭐ SOLUCIÓN: SSL siempre activo en producción
        ssl:
          process.env.NODE_ENV === 'production'
            ? { rejectUnauthorized: false }
            : configService.get<string>('database.ssl') === 'true'
              ? { rejectUnauthorized: false }
              : false,

        connectTimeoutMS: 30000,
        extra: {
          connectionTimeoutMillis: 30000,
          idleTimeoutMillis: 30000,
          max: 10,
        },
        retryAttempts: 5,
        retryDelay: 3000,
        logging:
          process.env.NODE_ENV !== 'production' ||
          process.env.DB_LOGGING === 'true',
        migrationsRun: false,
        poolSize: 5,
      }),
    }),
    AuthModule,
    UsersModule,
    ProductsModule,
    SeedModule,
    UploadModule,
    CartModule,
    CheckoutModule,
    ClothingOrderModule,
  ],
})
export class AppModule {}
