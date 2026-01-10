# Despliegue en Render

Esta guía te ayudará a desplegar tu API de e-commerce en Render.

## Requisitos previos

- Cuenta en [Render](https://render.com) (gratis)
- Tu código debe estar en un repositorio de GitHub/GitLab
- Base de datos Neon configurada (ya lo tienes)

## Pasos para desplegar

### 1. Preparar el repositorio

Asegúrate de que tu código esté en GitHub/GitLab y que tengas el archivo `render.yaml` en la raíz del proyecto.

### 2. Conectar Render con tu repositorio

1. Ve a [Render Dashboard](https://dashboard.render.com/)
2. Haz clic en **"New +"** → **"Blueprint"**
3. Conecta tu repositorio de GitHub/GitLab
4. Render detectará automáticamente el archivo `render.yaml`

### 3. Configurar las variables de entorno

Render te pedirá configurar las siguientes variables (marcadas con `sync: false`):

```bash
# Base de datos Neon
DB_HOST=ep-summer-pine-ahtuaxur-pooler.c-3.us-east-1.aws.neon.tech
DB_USERNAME=neondb_owner
DB_PASSWORD=npg_VcMU9mCQhJ0I
DB_NAME=neondb

# Autenticación
JWT_SECRET=EhhlTkqt"Z&kn4dZ/$"KRiqVA6=,x6F-mD;sN5&n*3=rmv5(FSxlDhqKqTn>Q:+
ADMIN_EMAIL=admin@gmail.com
ADMIN_PASSWORD=password123

# Cloudinary
CLOUDINARY_CLOUD_NAME=dvz6jikha
CLOUDINARY_API_KEY=831476563942372
CLOUDINARY_API_SECRET=DExNk9TYSseMmqwXQI6RsXLpZKY

# PayPal
PAYPAL_CLIENT_ID=AbPvqO5iP5tIGYSgxc26tZeY5O_LWPDhEsQCUQEnvzbOuTDn-x8KefS6vO4lhlIjWEubwc2ETl0fkIgU
PAYPAL_SECRET=EDXgmnF5-3EyQQOEPe6zRDuDs6hjKUQ-CPVOvNZl7s-3W1RopzhRxnVfEdTDZ53Ju9GKW6VrXxqBnUNx
```

### 4. Desplegar

1. Haz clic en **"Apply"**
2. Render comenzará a construir y desplegar tu aplicación
3. El proceso tomará unos minutos
4. Una vez completado, recibirás una URL como: `https://ecomerce-backend.onrender.com`

## Opciones alternativas

### Opción A: Despliegue manual sin render.yaml

Si prefieres no usar el archivo Blueprint:

1. Ve a **"New +"** → **"Web Service"**
2. Conecta tu repositorio
3. Configura manualmente:
   - **Name**: `ecomerce-backend`
   - **Root Directory**: `backend`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start:prod`
   - **Environment**: Agrega todas las variables del paso 3

### Opción B: Usar variables de entorno desde archivo

Puedes crear un archivo `.env` en Render:

1. En el dashboard de tu servicio
2. Ve a **"Environment"** → **"Secret Files"**
3. Crea un archivo `.env` con el contenido:

```bash
NODE_ENV=production
DB_HOST=ep-summer-pine-ahtuaxur-pooler.c-3.us-east-1.aws.neon.tech
DB_PORT=5432
DB_USERNAME=neondb_owner
DB_PASSWORD=npg_VcMU9mCQhJ0I
DB_NAME=neondb
DB_SSL=true
JWT_SECRET=EhhlTkqt"Z&kn4dZ/$"KRiqVA6=,x6F-mD;sN5&n*3=rmv5(FSxlDhqKqTn>Q:+
ADMIN_EMAIL=admin@gmail.com
ADMIN_PASSWORD=password123
CLOUDINARY_CLOUD_NAME=dvz6jikha
CLOUDINARY_API_KEY=831476563942372
CLOUDINARY_API_SECRET=DExNk9TYSseMmqwXQI6RsXLpZKY
PAYPAL_CLIENT_ID=AbPvqO5iP5tIGYSgxc26tZeY5O_LWPDhEsQCUQEnvzbOuTDn-x8KefS6vO4lhlIjWEubwc2ETl0fkIgU
PAYPAL_SECRET=EDXgmnF5-3EyQQOEPe6zRDuDs6hjKUQ-CPVOvNZl7s-3W1RopzhRxnVfEdTDZ53Ju9GKW6VrXxqBnUNx
```

4. La ruta del archivo debe ser: `backend/.env`

## Configuración del Frontend

Una vez desplegado el backend, necesitarás actualizar las URLs en tu frontend:

```typescript
// Reemplaza todas las instancias de:
http://localhost:8000

// Por tu URL de Render:
https://ecomerce-backend.onrender.com
```

Archivos a actualizar en el frontend:
- `stores/cartStore.ts`
- `stores/authStore.ts`
- `components/payment-form.tsx`

O mejor aún, usa variables de entorno:

```typescript
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
```

## Configuración de CORS

Asegúrate de que tu backend permita peticiones desde tu dominio de frontend. En [main.ts](backend/src/main.ts):

```typescript
app.enableCors({
  origin: ['http://localhost:3000', 'https://tu-frontend.vercel.app'],
  credentials: true,
});
```

## Monitoreo y logs

Para ver los logs de tu aplicación:

1. Ve al dashboard de Render
2. Selecciona tu servicio
3. Haz clic en **"Logs"**

## Notas importantes

⚠️ **Plan gratuito de Render**: 
- El servicio se "duerme" después de 15 minutos de inactividad
- La primera petición después de dormir puede tardar 30-60 segundos
- Tienes 750 horas gratis al mes

⚠️ **Base de datos Neon**:
- El plan gratuito tiene límites de almacenamiento
- Monitorea el uso en tu dashboard de Neon

## Troubleshooting

### Error: "Build failed"
- Verifica que todas las dependencias estén en `package.json`
- Revisa los logs de build en Render

### Error: "Application failed to start"
- Verifica las variables de entorno
- Revisa que `DB_SSL=true` esté configurado
- Verifica la conexión a Neon

### Error: CORS
- Agrega el dominio de tu frontend en la configuración de CORS
- Verifica que las credenciales estén habilitadas

## Actualizaciones automáticas

Con `autoDeploy: true` en `render.yaml`, cada push a tu rama principal desplegará automáticamente los cambios.

Para deshabilitar esto, cambia a `autoDeploy: false` y despliega manualmente desde el dashboard de Render.
