import axios, { AxiosError } from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach JWT Token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle Global Errors & Token Expiration
axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Auto-logout: ONLY on 401 (Not Authenticated)
      localStorage.removeItem('token');
      localStorage.removeItem('auth-storage');
      
      // Prevent redirect loop if already on login page
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    // 403 (Forbidden) should NOT trigger logout, it's a permission issue
    return Promise.reject(error);
  }
);

export default axiosInstance;

/**
 * Standardized error extractor
 */
export const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || error.message || 'Something went wrong on the server';
  }
  return error instanceof Error ? error.message : 'An unexpected error occurred';
};

export const getFullImageUrl = (path: string | undefined) => {
  if (!path) {
    // Return placeholder image if no path
    return 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=500&h=300&fit=crop';
  }
  if (path.startsWith('http')) return path;
  // Convert Windows backslashes to forward slashes
  const normalizedPath = path.replace(/\\/g, '/');
  // Clean up path and base URL to avoid double slashes
  const baseUrl = API_URL.replace('/api', '').replace(/\/$/, '');
  const cleanPath = normalizedPath.startsWith('/') ? normalizedPath.substring(1) : normalizedPath;
  return `${baseUrl}/${cleanPath}`;
};
