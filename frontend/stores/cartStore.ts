"use client"

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useAuthStore } from './authStore';

// Tipos para el carrito
type CartItem = {
  id: string;
  productId: string;
  quantity: number;
  price: string;
  variant?: string;
  // Información del producto para mostrar en UI
  productName?: string;
  productImage?: string;
};

type Cart = {
  id: string;
  userId?: string;
  sessionId?: string;
  items: CartItem[];
  totalItems: number;
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
};

type CartState = {
  cart: Cart | null;
  isLoading: boolean;
  error: string | null;
  hasHydrated: boolean;
  
  // Acciones
  setHasHydrated: (hydrated: boolean) => void;
  addToCart: (productId: string, productName: string, quantity: number, unitPrice: number, imageUrl?: string) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  getCart: () => Promise<void>;
  clearCart: () => void;
  clearError: () => void;
  
  // Computed values
  getCartItemsCount: () => number;
  getCartTotal: () => number;
  getItemById: (itemId: string) => CartItem | undefined;
  getItemByProductId: (productId: string) => CartItem | undefined;
};

// Función helper para obtener sessionId
const getSessionId = (): string => {
  if (typeof window === 'undefined') return '';
  
  let sessionId = localStorage.getItem('cart-session-id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('cart-session-id', sessionId);
  }
  return sessionId;
};

// Función helper para hacer peticiones HTTP
const makeRequest = async (url: string, options: RequestInit = {}) => {
  const { token } = useAuthStore.getState();
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'x-session-id': getSessionId(),
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`http://localhost:8000${url}`, {
    ...options,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }

  return response.json();
};

// Crear store con persistencia
export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: null,
      isLoading: false,
      error: null,
      hasHydrated: false,
      
      setHasHydrated: (hydrated: boolean) => set({ hasHydrated: hydrated }),

      addToCart: async (productId: string, productName: string, quantity: number, unitPrice: number, imageUrl?: string) => {
        console.log(`----- Adding ${quantity} of product ${imageUrl} to cart -----`);
        set({ isLoading: true, error: null });
        
        try {
          const res = await fetch(`http://localhost:8000/cart/add`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              productId,
              productName,
              quantity,
              unitPrice,
              imageUrl,
            }),
          });

          const data = await res.json();

          console.log('Cart updated:', data);
          
          set({
            cart: data,
            isLoading: false,
          });
        } catch (error) {
          set({
            isLoading: false,
            error: error.message,
          });
          throw error;
        }
      },
      
      updateQuantity: async (itemId: string, quantity: number) => {
        set({ isLoading: true, error: null });
        
        try {
          if (quantity <= 0) {
            await get().removeFromCart(itemId);
            return;
          }
          
          await makeRequest(`/cart/items/${itemId}`, {
            method: 'PATCH',
            body: JSON.stringify({ quantity }),
          });
          
          // Recargar carrito después de actualizar
          await get().getCart();
        } catch (error) {
          set({
            isLoading: false,
            error: error.message,
          });
          throw error;
        }
      },
      
      removeFromCart: async (itemId: string) => {
        set({ isLoading: true, error: null });
        
        try {
          const res = await fetch(`http://localhost:8000/cart/items/${itemId}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || 'Failed to remove item from cart');
          }
          
          // Recargar carrito después de eliminar
          await get().getCart();
        } catch (error) {
          set({
            isLoading: false,
            error: error.message,
          });
          throw error;
        }
      },
      
      getCart: async () => {
        set({ isLoading: true, error: null });
        
        try {
          const res = await fetch(`http://localhost:8000/cart`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          const data = await res.json();  
          set({
            cart: data,
            isLoading: false,
          });
          return data;
        } catch (error) {
          set({
            isLoading: false,
            error: error.message,
          });
          throw error;
        }
      },
      
      clearCart: async () => {
        set({ isLoading: true, error: null });
        try {
          const res = await fetch(`http://localhost:8000/cart/clear/${get().cart?.id}`, {
          method: 'POST',
          });
          let data = null;
          const text = await res.text();
          if (text) {
            data = JSON.parse(text);
            console.log('Cart cleared:', data);
          } else {
            console.log('Cart cleared: No response body');
          }
          set({
            cart: null,
            error: null,
            isLoading: false,
          });
          
      } catch (error) {
        console.error('Error clearing cart:', error);
        set({
          isLoading: false,
          error: error.message,
        });
      }
    },

      clearError: () => {
        set({ error: null });
      },
      
      // Computed values
      getCartItemsCount: () => {
        const { cart } = get();
        return cart?.items?.reduce((total, item) => total + item.quantity, 0) || 0;
      },
      
      getCartTotal: () => {
        const { cart } = get();
        return cart?.items.reduce((total, item) => total + (item.quantity * parseFloat(item.price)), 0) || 0;
      },
      
      getItemById: (itemId: string) => {
        const { cart } = get();
        return cart?.items.find(item => item.id === itemId);
      },
      
      getItemByProductId: (productId: string) => {
        const { cart } = get();
        return cart?.items.find(item => item.productId === productId);
      },
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({ 
        cart: state.cart,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);

// Hook personalizado para usar el carrito con funciones adicionales
export const useCart = () => {
  const store = useCartStore();
  const { isAuthenticated, user } = useAuthStore();
  
  // Efecto para cargar el carrito cuando el usuario se autentica
  const syncCartOnAuth = async () => {
    if (store.hasHydrated) {
      try {
        await store.getCart();
      } catch (error) {
        console.error('Error syncing cart:', error);
      }
    }
  };
  
  // Función para agregar al carrito con feedback optimista
  const addToCartOptimistic = async (
    productId: string,
    productName: string,
    quantity: number,
    unitPrice: number,
    variant?: string,
    productInfo?: { name: string; image?: string; slug?: string }
  ) => {
    // Optimistic update
    const tempItem: CartItem = {
      id: `temp_${Date.now()}`,
      productId,
      quantity,
      unitPrice,
      variant,
      productName: productInfo?.name,
      productImage: productInfo?.image
    };
    
    const currentCart = store.cart;
    const existingItem = store.getItemByProductId(productId);
    
    if (existingItem) {
      // Actualizar cantidad existente
      const updatedItems = currentCart?.items.map(item => 
        item.productId === productId 
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ) || [];
      
      useCartStore.setState({
        cart: currentCart ? {
          ...currentCart,
          items: updatedItems,
          totalItems: updatedItems.reduce((total, item) => total + item.quantity, 0),
          totalAmount: updatedItems.reduce((total, item) => total + (item.quantity * parseFloat(item.price)), 0),
        } : null
      });
    } else {
      // Agregar nuevo item
      const newItems = [...(currentCart?.items || []), tempItem];
      useCartStore.setState({
        cart: currentCart ? {
          ...currentCart,
          items: newItems,
          totalItems: newItems.reduce((total, item) => total + item.quantity, 0),
          totalAmount: newItems.reduce((total, item) => total + (item.quantity * parseFloat(item.price)), 0),
        } : {
          id: `temp_cart_${Date.now()}`,
          items: newItems,
          totalItems: quantity,
          totalAmount: quantity * unitPrice,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
      });
    }
    
    try {
      await store.addToCart(productId, productName, quantity, unitPrice, variant);
    } catch (error) {
      // Revertir cambios optimistas en caso de error
      useCartStore.setState({ cart: currentCart });
      throw error;
    }
  };
   
  return {
    ...store,
    syncCartOnAuth,
    addToCartOptimistic,
    isAuthenticated,
    user,
  };
};
