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

  // Configuración de CORS más permisiva
  app.enableCors({
    origin: process.env.NODE_ENV === 'production' 
      ? [process.env.CORS_ORIGIN, /\.onrender\.com$/] 
      : 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: 'Content-Type, Accept, Authorization',
  });

  // Obtener puerto de las variables de entorno (Render usa PORT)
  const port = process.env.PORT || 10000;

  await app.listen(port, '0.0.0.0');
  console.log(`Application is running on: http://0.0.0.0:${port}`);

  // Mover el seed DESPUÉS de que la app esté escuchando
  if (process.env.NODE_ENV !== 'production') {
    try {
      const seedService = app.get(AdminSeedService);
      await seedService.seed();
      console.log('Administrador creado o verificado correctamente');
    } catch (error) {
      console.error('Error al crear el administrador:', error);
    }
  }
}

bootstrap();