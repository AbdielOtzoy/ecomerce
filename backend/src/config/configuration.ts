export default () => {
  const config = {
    database: {
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT ?? '5432', 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      name: process.env.DB_NAME,
      ssl: process.env.DB_SSL,
    },
    cloudinary: {
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
      apiKey: process.env.CLOUDINARY_API_KEY,
      apiSecret: process.env.CLOUDINARY_API_SECRET,
    },
    paypal: {
      clientId: process.env.PAYPAL_CLIENT_ID,
      secret: process.env.PAYPAL_SECRET,
    },
  };

  // Log de configuración cargada
  console.log('📦 Configuración cargada desde configuration.ts');
  console.log('   Database host:', config.database.host);
  console.log('   Database port:', config.database.port);
  console.log('   Database name:', config.database.name);
  console.log('   Database SSL:', config.database.ssl);

  return config;
};
