import { create } from "zustand";
import { persist } from "zustand/middleware";
import axiosInstance from "../lib/axiosInstance";

export type UserRole = "ORGANIZER" | "CUSTOMER";

interface Coupon {
  id: string;
  code: string;
  discount: number;
  expiresAt: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  referralCode?: string;
  totalPoints?: number;
  coupons?: Coupon[];
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: Record<string, string>) => Promise<void>;
  register: (userData: Record<string, unknown>) => Promise<void>;
  logout: () => void;
  getMe: () => Promise<void>;
  updateProfile: (formData: FormData) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (data: Record<string, string>) => Promise<void>;
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
          console.log("=== LOGIN RESPONSE ===");
          console.log("Full response:", response);
          console.log("Response data:", response.data);
          console.log("Response data.data:", response.data.data);

          const { user, token } = response.data.data;

          console.log("Extracted user:", user);
          console.log("User role:", user?.role);
          console.log("Extracted token:", token);

          localStorage.setItem("token", token);
          set({ user, isAuthenticated: true });
        } finally {
          set({ isLoading: false });
        }
      },

      register: async (userData) => {
        set({ isLoading: true });
        try {
          // Debug: Log the data being sent
          console.log("=== REGISTER REQUEST ===");
          console.log("User data being sent:", userData);
          console.log("API URL:", axiosInstance.defaults.baseURL);

          const response = await axiosInstance.post("/auth/signup", userData);

          // Debug: Log response
          console.log("=== REGISTER RESPONSE ===");
          console.log("Full response:", response);
          console.log("Response data:", response.data);

          const { user, token } = response.data.data;

          localStorage.setItem("token", token);
          set({ user, isAuthenticated: true });
        } catch (error: unknown) {
          const errResponse = error as {
            response?: {
              status?: number;
              data?: {
                errors?: Array<{ field?: string; message?: string } | string>;
              };
            };
          };
          // Debug: Log error details
          console.error("=== REGISTER ERROR ===");
          console.error("Error response:", errResponse.response);
          console.error("Error data:", errResponse.response?.data);
          console.error("Error status:", errResponse.response?.status);

          // Check if there are validation errors
          if (
            errResponse.response?.data?.errors &&
            Array.isArray(errResponse.response.data.errors)
          ) {
            console.error(
              "Validation errors:",
              errResponse.response.data.errors,
            );
            // Format validation errors for display
            const validationMessages = errResponse.response.data.errors
              .map((err) => {
                if (typeof err === "string") return err;
                return `${err.field || "Field"}: ${err.message || err}`;
              })
              .join(", ");
            console.error("Formatted validation errors:", validationMessages);
          }

          throw error;
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
          console.log("=== GET ME RESPONSE ===");
          console.log("Full response:", response);
          console.log("Response data:", response.data);
          console.log("Response data.data:", response.data.data);

          // Backend returns { success: true, message: "...", data: { user } }
          const userData = response.data.data?.user;

          console.log("Extracted userData:", userData);
          console.log("User role from profile:", userData?.role);

          if (userData) {
            console.log("Final user data:", userData);
            set({ user: userData, isAuthenticated: true });
          } else {
            console.error("No user data in response");
            localStorage.removeItem("token");
            set({ user: null, isAuthenticated: false });
          }
        } catch (error: unknown) {
          const errResponse = error as {
            response?: { status?: number; data?: unknown };
          };
          console.error(
            "getMe error:",
            errResponse.response?.status,
            errResponse.response?.data,
          );
          localStorage.removeItem("token");
          set({ user: null, isAuthenticated: false });
        } finally {
          set({ isLoading: false });
        }
      },

      updateProfile: async (formData: FormData) => {
        set({ isLoading: true });
        try {
          const response = await axiosInstance.put("/users/profile", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

          const userData = response.data.data?.user;

          if (userData) {
            set({ user: userData });
          }
        } catch (error: unknown) {
          const errResponse = error as {
            response?: { status?: number; data?: unknown };
          };
          console.error(
            "updateProfile error:",
            errResponse.response?.status,
            errResponse.response?.data,
          );
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      forgotPassword: async (email: string) => {
        set({ isLoading: true });
        try {
          await axiosInstance.post("/auth/forgot-password", { email });
        } finally {
          set({ isLoading: false });
        }
      },

      resetPassword: async (data: Record<string, string>) => {
        set({ isLoading: true });
        try {
          await axiosInstance.post("/auth/reset-password", data);
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
