// app/dashboard/layout.tsx
'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardNav } from "@/components/dashboard/dashboard-nav";
import { MainNav } from "@/components/dashboard/main-nav";
import { UserNav } from "@/components/dashboard/user-nav";
import { useAuthStore } from "@/stores/authStore";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter();
  const { isAuthenticated, user, isLoading } = useAuthStore();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Verificar autenticación y permisos cuando el estado de autenticación cambie
    if (!isLoading) {
      if (!isAuthenticated) {
        // Redirigir a login si no está autenticado
        router.push('/sign-in');
      } else if (!user?.isAdmin) {
        // Redirigir a una página de acceso denegado si no es admin
        router.push('/unauthorized');
      } else {
        // El usuario está autenticado y es admin
        setIsAuthorized(true);
      }
      setIsChecking(false);
    }
  }, [isAuthenticated, user, isLoading, router]);

  // Mostrar un estado de carga mientras se verifica la autenticación
  if (isChecking || isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
          <p className="text-sm text-muted-foreground">Verificando permisos...</p>
        </div>
      </div>
    );
  }

  // Si no está autorizado, no renderizamos nada (la redirección ya se habrá activado)
  if (!isAuthorized) {
    return null;
  }

  // Si está autorizado, mostramos el dashboard completo
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 border-b bg-background">
        <div className="flex h-16 items-center px-4">
          <MainNav />
          <div className="ml-auto flex items-center space-x-4">
            <UserNav />
          </div>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="hidden w-64 border-r bg-muted/40 md:block">
          <DashboardNav />
        </aside>
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}