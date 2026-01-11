import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
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
      useFactory: (configService: ConfigService) => {
        // ========================================
        // 🔍 LOGS DE DEBUGGING - INICIO
        // ========================================
        console.log('='.repeat(60));
        console.log('🔍 CONFIGURACIÓN DE BASE DE DATOS - DEBUG');
        console.log('='.repeat(60));

        // Variables de entorno directas
        console.log('\n📋 Variables de entorno (process.env):');
        console.log('  NODE_ENV:', process.env.NODE_ENV);
        console.log('  DB_HOST:', process.env.DB_HOST);
        console.log('  DB_PORT:', process.env.DB_PORT);
        console.log(
          '  DB_USERNAME:',
          process.env.DB_USERNAME ? '✓ Configurado' : '✗ NO configurado',
        );
        console.log(
          '  DB_PASSWORD:',
          process.env.DB_PASSWORD
            ? '✓ Configurado (oculto)'
            : '✗ NO configurado',
        );
        console.log('  DB_NAME:', process.env.DB_NAME);
        console.log('  DB_SSL:', process.env.DB_SSL);
        console.log('  DB_LOGGING:', process.env.DB_LOGGING);

        // Variables desde ConfigService
        console.log('\n📋 Variables desde ConfigService:');
        console.log(
          '  database.host:',
          configService.get<string>('database.host'),
        );
        console.log(
          '  database.port:',
          configService.get<number>('database.port'),
        );
        console.log(
          '  database.username:',
          configService.get<string>('database.username')
            ? '✓ Configurado'
            : '✗ NO configurado',
        );
        console.log(
          '  database.password:',
          configService.get<string>('database.password')
            ? '✓ Configurado'
            : '✗ NO configurado',
        );
        console.log(
          '  database.name:',
          configService.get<string>('database.name'),
        );
        console.log(
          '  database.ssl:',
          configService.get<string>('database.ssl'),
        );

        // Determinar configuración SSL
        const isProduction = process.env.NODE_ENV === 'production';
        const sslFromConfig =
          configService.get<string>('database.ssl') === 'true';
        const sslConfig = isProduction
          ? { rejectUnauthorized: false }
          : sslFromConfig
            ? { rejectUnauthorized: false }
            : false;

        console.log('\n🔐 Configuración SSL:');
        console.log('  Es producción?:', isProduction);
        console.log('  SSL desde config:', sslFromConfig);
        console.log('  SSL final aplicado:', JSON.stringify(sslConfig));

        console.log('\n📊 Configuración TypeORM completa:');
        const dbConfig = {
          type: 'postgres',
          host: configService.get<string>('database.host'),
          port: configService.get<number>('database.port'),
          username: configService.get<string>('database.username'),
          password: configService.get<string>('database.password')
            ? '***OCULTO***'
            : undefined,
          database: configService.get<string>('database.name'),
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: !isProduction,
          ssl: sslConfig,
          connectTimeoutMS: 30000,
          extra: {
            connectionTimeoutMillis: 30000,
            idleTimeoutMillis: 30000,
            max: 10,
          },
          retryAttempts: 5,
          retryDelay: 3000,
          logging: !isProduction || process.env.DB_LOGGING === 'true',
          migrationsRun: false,
          poolSize: 5,
        };

        console.log('  type:', dbConfig.type);
        console.log('  host:', dbConfig.host);
        console.log('  port:', dbConfig.port);
        console.log('  username:', dbConfig.username);
        console.log('  password:', dbConfig.password);
        console.log('  database:', dbConfig.database);
        console.log('  synchronize:', dbConfig.synchronize);
        console.log('  ssl:', JSON.stringify(dbConfig.ssl));
        console.log('  connectTimeoutMS:', dbConfig.connectTimeoutMS);
        console.log('  retryAttempts:', dbConfig.retryAttempts);
        console.log('  logging:', dbConfig.logging);

        console.log('='.repeat(60));
        console.log('🚀 Intentando conectar a la base de datos...');
        console.log('='.repeat(60));

        // ========================================
        // 🔍 LOGS DE DEBUGGING - FIN
        // ========================================

        return {
          type: 'postgres' as const,
          host: configService.get<string>('database.host'),
          port: configService.get<number>('database.port'),
          username: configService.get<string>('database.username'),
          password: configService.get<string>('database.password'),
          database: configService.get<string>('database.name'),
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: process.env.NODE_ENV !== 'production',
          ssl: sslConfig,
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
        };
      },
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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
