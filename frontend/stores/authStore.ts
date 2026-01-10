import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type User = {
  id: number;
  name: string;
  email: string;
  isAdmin: boolean;
};

type AuthState = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  hasHydrated: boolean;
  setHasHydrated: (hydrated: boolean) => void;
  
  // Acciones
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;

  
};


// Crear store con persistencia
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      
      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/auth/sign-in`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          });

          console.log('Response:', response);
          console.log('Response status:', response.status);
          
          if (!response.ok) {
            throw new Error('Credenciales inválidas');
          }
          
          const data = await response.json();
          
          set({
            user: data.user,
            token: data.access_token,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({ 
            isLoading: false,
            error: error.message,
            isAuthenticated: false,
            user: null,
            token: null,
          });
        }
      },

      register: async (name: string, email: string, password: string) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/auth/sign-up`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
          });
          
          if (!response.ok) {
            throw new Error('Error al registrar el usuario');
          }
          
          const data = await response.json();
          
          set({
            user: data.user,
            token: data.access_token,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({ 
            isLoading: false,
            error: error.message,
            isAuthenticated: false,
            user: null,
            token: null,
          });
        }
      },
      
      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null,
        });
      },
      
      clearError: () => {
        set({ error: null });
      },
      hasHydrated: false,
      setHasHydrated: (hydrated: boolean) => set({ hasHydrated: hydrated }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, token: state.token, isAuthenticated: state.isAuthenticated }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);