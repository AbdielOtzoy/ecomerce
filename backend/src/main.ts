import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AdminSeedService } from './seed/admin.seed';

async function bootstrap() {
  console.log('🚀 Iniciando aplicación NestJS...');
  console.log('📍 NODE_ENV:', process.env.NODE_ENV);
  console.log('📍 PORT:', process.env.PORT);
  console.log('='.repeat(60));

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
  console.log('🔐 Configurando CORS...');
  const corsOrigin =
    process.env.NODE_ENV === 'production'
      ? [process.env.CORS_ORIGIN, /\.onrender\.com$/]
      : 'http://localhost:3000';
  console.log('   Origin permitido:', corsOrigin);

  app.enableCors({
    origin: corsOrigin,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: 'Content-Type, Accept, Authorization',
  });

  // Obtener puerto de las variables de entorno
  const port = process.env.PORT || 10000;

  console.log('🌐 Iniciando servidor...');
  console.log('   Puerto:', port);
  console.log('   Host: 0.0.0.0');

  await app.listen(port, '0.0.0.0');

  console.log('='.repeat(60));
  console.log('✅ Aplicación iniciada exitosamente!');
  console.log(`🌍 Servidor corriendo en: http://0.0.0.0:${port}`);
  console.log(`📚 Swagger disponible en: http://0.0.0.0:${port}/api`);
  console.log(`💚 Health check en: http://0.0.0.0:${port}/`);
  console.log('='.repeat(60));

  // Mover el seed DESPUÉS de que la app esté escuchando
  if (process.env.NODE_ENV !== 'production') {
    console.log('🌱 Ejecutando seed de administrador...');
    try {
      const seedService = app.get(AdminSeedService);
      await seedService.seed();
      console.log('✅ Administrador creado o verificado correctamente');
    } catch (error) {
      console.error('❌ Error al crear el administrador:', error);
    }
  }
}

bootstrap().catch((error) => {
  console.error('='.repeat(60));
  console.error('❌ ERROR FATAL AL INICIAR LA APLICACIÓN');
  console.error('='.repeat(60));
  console.error(error);
  process.exit(1);
});
