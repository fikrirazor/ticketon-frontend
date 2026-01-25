import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/home';
import { EventDetail } from './pages/EventDetail';
import { Admin } from './pages/Admin';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { CreateEvent } from './pages/CreateEvent';
import { ProtectedRoute } from './components/ProtectedRoute';
import CheckoutPage from './pages/Checkout';
import PaymentProofPage from './pages/PaymentProof';
import TransactionDetailPage from './pages/TransactionDetailPage';
import { OrganizerProfile } from './pages/OrganizerProfile';
import { useAuthStore } from './store/auth.store';
import { Toaster } from 'react-hot-toast';

function App() {
  const getMe = useAuthStore((state) => state.getMe);

  React.useEffect(() => {
    getMe();
  }, [getMe]);

  return (
    <>
      <Toaster position="top-right" />
      <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/event/:id" element={<EventDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/organizer/:name" element={<OrganizerProfile />} />
        
        {/* Transaction Flow */}
        <Route
          path="/checkout"
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
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['ORGANIZER']}>
              <Admin />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
    </>
  );
}

export default App;
