import { create } from "zustand";
import { persist } from "zustand/middleware";
import axiosInstance from "../lib/axiosInstance";

export type UserRole = "ORGANIZER" | "CUSTOMER";

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: Record<string, string>) => Promise<void>;
  register: (userData: Record<string, any>) => Promise<void>;
  logout: () => void;
  getMe: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (credentials) => {
        set({ isLoading: true });
        try {
          const response = await axiosInstance.post(
            "/auth/signin",
            credentials,
          );
          
          // Debug: Log full response
          console.log('=== LOGIN RESPONSE ===');
          console.log('Full response:', response);
          console.log('Response data:', response.data);
          console.log('Response data.data:', response.data.data);
          
          const { user, token } = response.data.data;
          
          console.log('Extracted user:', user);
          console.log('User role:', user?.role);
          console.log('Extracted token:', token);

          localStorage.setItem("token", token);
          set({ user, isAuthenticated: true });
        } finally {
          set({ isLoading: false });
        }
      },

      register: async (userData) => {
        set({ isLoading: true });
        try {
          const response = await axiosInstance.post("/auth/signup", userData);
          const { user, token } = response.data.data;

          localStorage.setItem("token", token);
          set({ user, isAuthenticated: true });
        } finally {
          set({ isLoading: false });
        }
      },

      logout: () => {
        localStorage.removeItem("token");
        set({ user: null, isAuthenticated: false });
      },

      getMe: async () => {
        const token = localStorage.getItem("token");
        if (!token) {
          set({ user: null, isAuthenticated: false, isLoading: false });
          return;
        }

        set({ isLoading: true });
        try {
          const response = await axiosInstance.get("/users/profile");
          
          // Debug: Log full response
          console.log('=== GET ME RESPONSE ===');
          console.log('Full response:', response);
          console.log('Response data:', response.data);
          console.log('Response data.data:', response.data.data);
          
          // Backend returns { success: true, message: "...", data: { user } }
          const userData = response.data.data?.user;
          
          console.log('Extracted userData:', userData);
          console.log('User role from profile:', userData?.role);
          
          if (userData) {
            // WORKAROUND: If backend doesn't send role, preserve it from existing state
            const currentUser = useAuthStore.getState().user;
            const userWithRole = {
              ...userData,
              role: userData.role || currentUser?.role || 'CUSTOMER' // Preserve existing role if not in response
            };
            
            console.log('Final user with role:', userWithRole);
            set({ user: userWithRole, isAuthenticated: true });
          } else {
            console.error("No user data in response");
            localStorage.removeItem("token");
            set({ user: null, isAuthenticated: false });
          }
        } catch (error: any) {
          console.error("getMe error:", error.response?.status, error.response?.data);
          localStorage.removeItem("token");
          set({ user: null, isAuthenticated: false });
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
