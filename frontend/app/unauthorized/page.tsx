'use client';

import { useAuthStore } from '@/stores/authStore';
import Link from 'next/link';

export default function UnauthorizedPage() {
  const { isAuthenticated, logout } = useAuthStore();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="mx-auto max-w-md text-center">
        <h1 className="mb-4 text-4xl font-bold text-red-600">Acceso Denegado</h1>
        <div className="mb-8 text-lg text-gray-600">
          No tienes los permisos necesarios para acceder a esta sección.
        </div>
        
        <div className="flex flex-col space-y-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
          >
            Volver al inicio
          </Link>

          {isAuthenticated && (
            <button
              onClick={logout}
              className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground"
            >
              Cerrar sesión
            </button>
          )}
        </div>
      </div>
    </div>
  );
}