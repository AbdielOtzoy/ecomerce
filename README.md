# E-Commerce Platform

Plataforma de comercio electrónico full-stack desarrollada con arquitectura moderna de aplicaciones web, implementando las mejores prácticas de desarrollo y patrones de diseño escalables.

## Tabla de Contenidos

- [Descripción General](#descripción-general)
- [Arquitectura del Proyecto](#arquitectura-del-proyecto)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Requisitos Previos](#requisitos-previos)
- [Instalación y Configuración Local](#instalación-y-configuración-local)
- [Variables de Entorno](#variables-de-entorno)
- [Ejecución del Proyecto](#ejecución-del-proyecto)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Despliegue](#despliegue)
- [Funcionalidades Principales](#funcionalidades-principales)
- [API Documentation](#api-documentation)

## Descripción General

Sistema de comercio electrónico completo que permite la gestión de productos, autenticación de usuarios, carrito de compras, procesamiento de pagos y administración de pedidos. La aplicación está construida siguiendo una arquitectura cliente-servidor, con una API RESTful en el backend y una interfaz de usuario moderna y responsiva en el frontend.

## Arquitectura del Proyecto

El proyecto está organizado en dos aplicaciones principales:

- **Backend**: API RESTful construida con NestJS
- **Frontend**: Aplicación web construida con Next.js

La aplicación utiliza PostgreSQL como base de datos, Cloudinary para el almacenamiento de imágenes y PayPal para el procesamiento de pagos.

## Tecnologías Utilizadas

### Backend

- **Framework**: [NestJS](https://nestjs.com/) v11 - Framework progresivo de Node.js
- **Lenguaje**: TypeScript
- **Base de Datos**: PostgreSQL 16
- **ORM**: TypeORM v0.3.21
- **Autenticación**: 
  - Passport.js
  - JWT (JSON Web Tokens)
  - bcrypt para encriptación de contraseñas
- **Validación**: class-validator y class-transformer
- **Documentación API**: Swagger/OpenAPI (@nestjs/swagger)
- **Almacenamiento**: Cloudinary v2.6
- **Pagos**: PayPal Server SDK v1.1.0
- **Gestión de Archivos**: Multer

### Frontend

- **Framework**: [Next.js](https://nextjs.org/) v16 con App Router
- **Lenguaje**: TypeScript
- **UI Framework**: React v19
- **Estilos**: Tailwind CSS v4
- **Componentes UI**: 
  - Radix UI (Componentes accesibles)
  - Lucide React (Iconos)
  - Shadcn/ui
- **Gestión de Estado**: Zustand v5
- **Formularios**: React Hook Form v7 con validación Zod
- **Temas**: next-themes
- **Gráficos**: Recharts v2.15
- **Notificaciones**: Sonner
- **Integración de Pagos**: @paypal/react-paypal-js

### DevOps y Herramientas

- **Control de Versiones**: Git
- **Gestor de Paquetes**: pnpm
- **Containerización**: Docker y Docker Compose
- **Linting**: ESLint
- **Testing**: Jest
- **Despliegue Backend**: Render
- **Despliegue Frontend**: Vercel

## Requisitos Previos

Antes de comenzar, asegúrese de tener instalado:

- **Node.js**: v18 o superior
- **pnpm**: v8 o superior
- **Docker**: v20 o superior (para desarrollo local)
- **Docker Compose**: v2 o superior
- **Git**: Para clonar el repositorio

```bash
# Verificar las versiones instaladas
node --version
pnpm --version
docker --version
docker-compose --version
```

## Instalación y Configuración Local

### 1. Clonar el Repositorio

```bash
git clone <repository-url>
cd ecomerce
```

### 2. Configurar la Base de Datos

Iniciar el contenedor de PostgreSQL usando Docker Compose:

```bash
docker-compose up -d
```

Esto iniciará un contenedor de PostgreSQL en el puerto 5432 con las siguientes credenciales por defecto:
- Usuario: `postgres`
- Contraseña: `13141315`
- Base de datos: `ecomerce`

### 3. Configurar el Backend

```bash
cd backend
pnpm install
```

Crear un archivo `.env` en el directorio `backend/` con las siguientes variables:

```env
# Server Configuration
NODE_ENV=development
PORT=3000
CORS_ORIGIN=http://localhost:3001

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=13141315
DB_NAME=ecomerce
DB_SSL=false
DB_LOGGING=true

# JWT Configuration
JWT_SECRET=your_jwt_secret_key

# Admin Seed
ADMIN_EMAIL=admin@ecomerce.com
ADMIN_PASSWORD=admin123

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# PayPal Configuration
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_SECRET=your_paypal_secret
```

### 4. Configurar el Frontend

```bash
cd frontend
pnpm install
```

Crear un archivo `.env.local` en el directorio `frontend/` con las siguientes variables:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_paypal_client_id
```

## Ejecución del Proyecto

### Modo Desarrollo

#### Iniciar el Backend

```bash
cd backend
pnpm run start:dev
```

El servidor backend estará disponible en `http://localhost:3000`

#### Iniciar el Frontend

```bash
cd frontend
pnpm run dev
```

La aplicación frontend estará disponible en `http://localhost:3001`

### Modo Producción

#### Backend

```bash
cd backend
pnpm run build
pnpm run start:prod
```

#### Frontend

```bash
cd frontend
pnpm run build
pnpm run start
```

### Comandos Adicionales

#### Backend

```bash
# Ejecutar tests
pnpm run test

# Ejecutar tests e2e
pnpm run test:e2e

# Verificar linting
pnpm run lint

# Formatear código
pnpm run format
```

#### Frontend

```bash
# Verificar linting
pnpm run lint

# Compilar TypeScript
pnpm run build
```

## Estructura del Proyecto

```
ecomerce/
├── backend/                    # Aplicación backend (NestJS)
│   ├── src/
│   │   ├── auth/              # Módulo de autenticación
│   │   ├── cart/              # Módulo de carrito de compras
│   │   ├── checkout/          # Módulo de proceso de pago
│   │   ├── clothing-order/    # Módulo de órdenes
│   │   ├── config/            # Configuraciones globales
│   │   ├── products/          # Módulo de productos
│   │   ├── seed/              # Datos de inicialización
│   │   ├── upload/            # Módulo de carga de archivos
│   │   ├── users/             # Módulo de usuarios
│   │   └── main.ts            # Punto de entrada
│   └── test/                  # Tests e2e
├── frontend/                   # Aplicación frontend (Next.js)
│   ├── app/                   # App Router de Next.js
│   │   ├── (auth)/            # Rutas de autenticación
│   │   ├── checkout/          # Página de checkout
│   │   ├── collections/       # Páginas de colecciones
│   │   ├── dashboard/         # Panel de administración
│   │   └── unauthorized/      # Página de no autorizado
│   ├── components/            # Componentes React
│   ├── data/                  # Datos estáticos
│   ├── lib/                   # Utilidades y helpers
│   ├── stores/                # Estado global (Zustand)
│   └── types/                 # Definiciones de TypeScript
├── docker-compose.yml         # Configuración de Docker
└── render.yaml               # Configuración de despliegue
```

## Variables de Entorno

### Backend

| Variable | Descripción | Requerida |
|----------|-------------|-----------|
| `NODE_ENV` | Entorno de ejecución | Sí |
| `PORT` | Puerto del servidor | Sí |
| `CORS_ORIGIN` | Origen permitido para CORS | Sí |
| `DB_HOST` | Host de la base de datos | Sí |
| `DB_PORT` | Puerto de PostgreSQL | Sí |
| `DB_USERNAME` | Usuario de la base de datos | Sí |
| `DB_PASSWORD` | Contraseña de la base de datos | Sí |
| `DB_NAME` | Nombre de la base de datos | Sí |
| `DB_SSL` | Habilitar SSL para la DB | No |
| `JWT_SECRET` | Secreto para firmar JWT | Sí |
| `ADMIN_EMAIL` | Email del administrador | Sí |
| `ADMIN_PASSWORD` | Contraseña del administrador | Sí |
| `CLOUDINARY_CLOUD_NAME` | Nombre de Cloudinary | Sí |
| `CLOUDINARY_API_KEY` | API Key de Cloudinary | Sí |
| `CLOUDINARY_API_SECRET` | API Secret de Cloudinary | Sí |
| `PAYPAL_CLIENT_ID` | Client ID de PayPal | Sí |
| `PAYPAL_SECRET` | Secret de PayPal | Sí |

### Frontend

| Variable | Descripción | Requerida |
|----------|-------------|-----------|
| `NEXT_PUBLIC_API_URL` | URL del API backend | Sí |
| `NEXT_PUBLIC_PAYPAL_CLIENT_ID` | Client ID público de PayPal | Sí |

## Despliegue

### Backend - Render

El backend está desplegado en [Render](https://render.com/) utilizando el plan gratuito. La configuración de despliegue está definida en el archivo `render.yaml`.

**Características del despliegue:**
- **Región**: Oregon (us-west)
- **Entorno**: Node.js
- **Build Command**: `npm install --production=false && npm run build`
- **Start Command**: `npm run start:prod`
- **Health Check**: Configurado en la ruta raíz `/`
- **Auto Deploy**: Habilitado desde el repositorio

**URL del Backend**: [https://ecomerce-backend.onrender.com](https://ecomerce-backend.onrender.com)

### Frontend - Vercel

El frontend está desplegado en [Vercel](https://vercel.com/) aprovechando su integración nativa con Next.js.

**Características del despliegue:**
- Despliegue automático desde el repositorio
- Edge Network global para baja latencia
- Optimización automática de imágenes
- Server-Side Rendering (SSR) y Static Site Generation (SSG)
- Análisis de rendimiento integrado

**URL del Frontend**: [https://ecomerce-two-blond.vercel.app](https://ecomerce-two-blond.vercel.app)

### Base de Datos

La base de datos PostgreSQL está alojada en un servicio de base de datos administrada compatible con Render, utilizando SSL para conexiones seguras.

## Funcionalidades Principales

### Usuarios

- ✅ Registro de usuarios con validación
- ✅ Autenticación con JWT
- ✅ Gestión de perfil de usuario
- ✅ Sistema de roles (Admin, Usuario)

### Productos

- ✅ Catálogo de productos con categorías
- ✅ Búsqueda y filtrado de productos
- ✅ Detalles de producto con imágenes
- ✅ Gestión de inventario (Admin)
- ✅ CRUD completo de productos (Admin)

### Carrito de Compras

- ✅ Añadir/eliminar productos
- ✅ Actualizar cantidades
- ✅ Cálculo automático de totales
- ✅ Persistencia del carrito

### Checkout y Pagos

- ✅ Proceso de checkout guiado
- ✅ Integración con PayPal
- ✅ Confirmación de órdenes
- ✅ Historial de compras

### Panel de Administración

- ✅ Dashboard con estadísticas
- ✅ Gestión de productos
- ✅ Gestión de órdenes
- ✅ Gestión de usuarios
- ✅ Carga de imágenes a Cloudinary

## API Documentation

El backend incluye documentación interactiva de la API generada con Swagger/OpenAPI. 

Para acceder a la documentación en desarrollo:
```
http://localhost:3000/api
```

Para acceder a la documentación en producción:
```
https://ecomerce-backend.onrender.com/api
```

## Licencia

Este proyecto es privado y no tiene licencia pública.

## Contacto

Para más información sobre el proyecto, por favor contacte al equipo de desarrollo.

---

**Nota**: Este proyecto fue desarrollado con fines educativos y demostrativos.
