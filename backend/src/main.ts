import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AdminSeedService } from './seed/admin.seed';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('E-commerce API')
    .setDescription('The E-commerce API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  try {
    // Ejecutar seed del administrador
    const seedService = app.get(AdminSeedService);
    await seedService.seed();
    console.log('Administrador creado o verificado correctamente');
  } catch (error) {
    console.error('Error al crear el administrador:', error);
  }

  await app.listen(process.env.PORT ?? 8000);
}

bootstrap();
