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
        ssl:
          configService.get<string>('database.ssl') === 'true'
            ? { rejectUnauthorized: false }
            : false,

        // ⭐ NUEVOS PARÁMETROS IMPORTANTES:

        // Timeouts más largos para la conexión inicial
        connectTimeoutMS: 30000,

        // Configuración extra para Neon
        extra: {
          connectionTimeoutMillis: 30000,
          // Evita que las conexiones se cierren prematuramente
          idleTimeoutMillis: 30000,
          // Máximo de conexiones (importante para plan gratuito de Neon)
          max: 10,
        },

        // Reintentos de conexión
        retryAttempts: 5,
        retryDelay: 3000,

        // Logging para debugging (puedes desactivarlo después)
        logging:
          process.env.NODE_ENV !== 'production' ||
          process.env.DB_LOGGING === 'true',

        // Evita problemas con migraciones automáticas
        migrationsRun: false,

        // Pool de conexiones optimizado para Neon free tier
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
