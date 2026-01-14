import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router';
import MainLayout from '@/components/layouts/MainLayout';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { useAuthStore } from '@/store/useAuthStore';

// Protected Route Wrapper
const ProtectedRoute = () => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

// Public Route Wrapper (redirect to dashboard if already logged in)
const PublicRoute = () => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <Outlet />;
};

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes with MainLayout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<div className="p-10 text-center"><h1>Landing Page</h1></div>} />
          <Route path="/events" element={<div className="p-10 text-center"><h1>Events Page</h1></div>} />
        </Route>

        {/* Auth Routes (Public but restricted if logged in) */}
        <Route element={<PublicRoute />}>
           <Route element={<MainLayout />}>
             <Route path="/login" element={<div className="p-10 text-center"><h1>Login Page</h1></div>} />
             <Route path="/register" element={<div className="p-10 text-center"><h1>Register Page</h1></div>} />
           </Route>
        </Route>

        {/* Protected Dashboard Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<div className="p-6"><h1>Dashboard Overview</h1></div>} />
            <Route path="events" element={<div className="p-6"><h1>Manage Events</h1></div>} />
            <Route path="settings" element={<div className="p-6"><h1>Settings</h1></div>} />
          </Route>
        </Route>

        {/* 404 Not Found */}
        <Route path="*" element={<div className="h-screen flex items-center justify-center"><h1>404 - Page Not Found</h1></div>} />
      </Routes>
    </BrowserRouter>
  );
};
