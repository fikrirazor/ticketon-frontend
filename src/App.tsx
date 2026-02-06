// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/home';
import { DiscoverEvents } from './pages/DiscoverEvents';
import { EventDetail } from './pages/EventDetail';
import { Admin } from './pages/Admin';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { CreateEvent } from './pages/CreateEvent';
import { ProtectedRoute } from './components/ProtectedRoute';
import { ErrorBoundary } from './components/ErrorBoundary';
import CheckoutPage from './pages/Checkout';
import PaymentProofPage from './pages/PaymentProof';
import TransactionDetailPage from './pages/TransactionDetailPage';
import { OrganizerProfile } from './pages/OrganizerProfile';
import { useAuthStore } from './store/auth.store';
import { Toaster } from 'react-hot-toast';

// Impor komponen-komponen halaman baru
import ProfilePage from './pages/ProfilePage';
import OrganizerEventsPage from './pages/OrganizerEventsPage';
import UserTransactionsPage from './pages/UserTransactionsPage';
import { OrganizerDashboard } from './pages/OrganizerDashboard';

import { EditEvent } from './pages/EditEvent';

function App() {
  const getMe = useAuthStore((state) => state.getMe);
  const [isAuthReady, setIsAuthReady] = React.useState(false);

  React.useEffect(() => {
    getMe().finally(() => {
      setIsAuthReady(true);
    });
  }, [getMe]);

  // Show loading state only during initial auth check
  if (!isAuthReady) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-slate-500 font-medium">Memuat Aplikasi...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-right" />
      <ErrorBoundary>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/discover" element={<DiscoverEvents />} />
            <Route path="/event/:id" element={<EventDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/organizer/:name" element={<OrganizerProfile />} />

            {/* Profile Routes */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute allowedRoles={['CUSTOMER', 'ORGANIZER']}>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/organizer/events"
              element={
                <ProtectedRoute allowedRoles={['ORGANIZER']}>
                  <OrganizerEventsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/transactions"
              element={
                <ProtectedRoute allowedRoles={['CUSTOMER', 'ORGANIZER']}>
                  <UserTransactionsPage />
                </ProtectedRoute>
              }
            />

            {/* Transaction Flow */}
            <Route
              path="/checkout/:id"
              element={
                <ProtectedRoute allowedRoles={['CUSTOMER', 'ORGANIZER']}>
                  <CheckoutPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/payment-proof/:transactionId"
              element={
                <ProtectedRoute allowedRoles={['CUSTOMER', 'ORGANIZER']}>
                  <PaymentProofPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/transaction/:transactionId"
              element={
                <ProtectedRoute allowedRoles={['CUSTOMER', 'ORGANIZER']}>
                  <TransactionDetailPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/create-event"
              element={
                <ProtectedRoute allowedRoles={['ORGANIZER']}>
                  <CreateEvent />
                </ProtectedRoute>
              }
            />
            <Route
              path="/edit-event/:id"
              element={
                <ProtectedRoute allowedRoles={['ORGANIZER']}>
                  <EditEvent />
                </ProtectedRoute>
              }
            />
            <Route
              path="/organizer/dashboard"
              element={
                <ProtectedRoute allowedRoles={['ORGANIZER']}>
                  <OrganizerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={['ORGANIZER']}>
                  <Admin />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </ErrorBoundary>
    </>
  );
}

export default App;