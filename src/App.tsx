import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { useAuthStore } from "./store/auth.store";
import { Toaster } from "react-hot-toast";

// Lazy loaded page components
const Home = lazy(() =>
  import("./pages/home").then((m) => ({ default: m.Home })),
);
const DiscoverEvents = lazy(() =>
  import("./pages/DiscoverEvents").then((m) => ({ default: m.DiscoverEvents })),
);
const EventDetail = lazy(() =>
  import("./pages/EventDetail").then((m) => ({ default: m.EventDetail })),
);
const Admin = lazy(() =>
  import("./pages/Admin").then((m) => ({ default: m.Admin })),
);
const Login = lazy(() =>
  import("./pages/Login").then((m) => ({ default: m.Login })),
);
const Register = lazy(() =>
  import("./pages/Register").then((m) => ({ default: m.Register })),
);
const ForgotPassword = lazy(() =>
  import("./pages/ForgotPassword").then((m) => ({ default: m.ForgotPassword })),
);
const ResetPassword = lazy(() =>
  import("./pages/ResetPassword").then((m) => ({ default: m.ResetPassword })),
);
const CreateEvent = lazy(() =>
  import("./pages/CreateEvent").then((m) => ({ default: m.CreateEvent })),
);
const CheckoutPage = lazy(() => import("./pages/Checkout"));
const PaymentProofPage = lazy(() => import("./pages/PaymentProof"));
const TransactionDetailPage = lazy(
  () => import("./pages/TransactionDetailPage"),
);
const OrganizerProfile = lazy(() =>
  import("./pages/OrganizerProfile").then((m) => ({
    default: m.OrganizerProfile,
  })),
);
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const OrganizerEventsPage = lazy(() => import("./pages/OrganizerEventsPage"));
const EventAttendeesPage = lazy(() =>
  import("./pages/EventAttendeesPage").then((m) => ({
    default: m.EventAttendeesPage,
  })),
);
const UserTransactionsPage = lazy(() => import("./pages/UserTransactionsPage"));
const OrganizerDashboard = lazy(() =>
  import("./pages/OrganizerDashboard").then((m) => ({
    default: m.OrganizerDashboard,
  })),
);
const EditEvent = lazy(() =>
  import("./pages/EditEvent").then((m) => ({ default: m.EditEvent })),
);

const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
      <p className="text-slate-500 font-medium">Memuat Konten...</p>
    </div>
  </div>
);

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
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/discover" element={<DiscoverEvents />} />
              <Route path="/event/:id" element={<EventDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route
                path="/organizer/:organizerId"
                element={<OrganizerProfile />}
              />

              {/* Profile Routes */}
              <Route
                path="/profile"
                element={
                  <ProtectedRoute allowedRoles={["CUSTOMER", "ORGANIZER"]}>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/organizer/events"
                element={
                  <ProtectedRoute allowedRoles={["ORGANIZER"]}>
                    <OrganizerEventsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/organizer/events/:id/attendees"
                element={
                  <ProtectedRoute allowedRoles={["ORGANIZER"]}>
                    <EventAttendeesPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/transactions"
                element={
                  <ProtectedRoute allowedRoles={["CUSTOMER", "ORGANIZER"]}>
                    <UserTransactionsPage />
                  </ProtectedRoute>
                }
              />

              {/* Transaction Flow */}
              <Route
                path="/checkout/:id"
                element={
                  <ProtectedRoute allowedRoles={["CUSTOMER", "ORGANIZER"]}>
                    <CheckoutPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/payment-proof/:transactionId"
                element={
                  <ProtectedRoute allowedRoles={["CUSTOMER", "ORGANIZER"]}>
                    <PaymentProofPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/transaction/:transactionId"
                element={
                  <ProtectedRoute allowedRoles={["CUSTOMER", "ORGANIZER"]}>
                    <TransactionDetailPage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/create-event"
                element={
                  <ProtectedRoute allowedRoles={["ORGANIZER"]}>
                    <CreateEvent />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/edit-event/:id"
                element={
                  <ProtectedRoute allowedRoles={["ORGANIZER"]}>
                    <EditEvent />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/organizer/dashboard"
                element={
                  <ProtectedRoute allowedRoles={["ORGANIZER"]}>
                    <OrganizerDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute allowedRoles={["ORGANIZER"]}>
                    <Admin />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Suspense>
        </Router>
      </ErrorBoundary>
    </>
  );
}

export default App;
