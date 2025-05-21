'use client';

import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

// Tipo de restricción para las rutas
type AuthOptions = {
  requiredAuth: boolean; // Si es true, requiere autenticación
  adminOnly?: boolean; // Si es true, solo para administradores
  redirectAuthenticatedTo?: string; // Redirigir usuarios autenticados a otra página (opcional)
  redirectUnauthenticatedTo?: string; // Redirigir usuarios no autenticados a otra página
};

// HOC para proteger rutas
export default function withAuth<P extends object>(
  Component: React.ComponentType<P>,
  options: AuthOptions
) {
  return function AuthProtectedComponent(props: P) {
    const router = useRouter();
    const { isAuthenticated, user } = useAuthStore();
    
    useEffect(() => {
      // Si requiere autenticación y el usuario no está autenticado
      if (options.requiredAuth && !isAuthenticated) {
        router.push(options.redirectUnauthenticatedTo || '/login');
        return;
      }
      
      // Si el usuario está autenticado pero la página es solo para usuarios no autenticados
      if (isAuthenticated && !options.requiredAuth && options.redirectAuthenticatedTo) {
        router.push(options.redirectAuthenticatedTo);
        return;
      }
      
      // Verificar roles requeridos (si existen)
      if (
        options.adminOnly &&
        user &&
        !user.isAdmin
      ) {
        router.push('/not-authorized');
        return;
      }

    }, [isAuthenticated, router, user]);

    // Mostrar el componente solo si pasa todas las condiciones de autenticación
    // o un loading mientras se verifica
    if (
      (options.requiredAuth && !isAuthenticated) ||
      (!options.requiredAuth && isAuthenticated && options.redirectAuthenticatedTo)
    ) {
      return <div>Cargando...</div>; // Puedes usar un componente de loading aquí
    }

    // Si todo está bien, renderiza el componente original con sus props
    return <Component {...props} />;
  };
}