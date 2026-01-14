import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Define Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'organizer' | 'customer';
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
}

// Create Store
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: (user, token) => {
          localStorage.setItem('token', token); // Sync with local storage for axios
          set({ user, token, isAuthenticated: true });
      },
      logout: () => {
          localStorage.removeItem('token');
          set({ user: null, token: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-storage', // name of the item in the storage (must be unique)
      partialize: (state) => ({ user: state.user, token: state.token, isAuthenticated: state.isAuthenticated }), // Persist specific fields
    }
  )
);
