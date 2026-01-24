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

function App() {
  return (
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
            <ProtectedRoute allowedRoles={['participant', 'organizer']}>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payment-proof/:transactionId"
          element={
            <ProtectedRoute allowedRoles={['participant', 'organizer']}>
              <PaymentProofPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/transaction/:transactionId"
          element={
            <ProtectedRoute allowedRoles={['participant', 'organizer']}>
              <TransactionDetailPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-event"
          element={
            <ProtectedRoute allowedRoles={['organizer']}>
              <CreateEvent />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['organizer']}>
              <Admin />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
