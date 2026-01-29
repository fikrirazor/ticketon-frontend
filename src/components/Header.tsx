import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "./ui/Button";
import { useAuthStore } from "../store/auth.store";

export const Header = () => {
  const location = useLocation();
  const { user, isAuthenticated, isLoading, logout } = useAuthStore();

  useEffect(() => {
    // Tidak perlu melakukan apa-apa di sini karena sudah dihandle di App.tsx
  }, [user, isAuthenticated]);

  const handleLogout = () => {
    logout();
  };

  const renderAuthContent = () => {
    if (isLoading) {
      return <div className="h-8 w-20 bg-gray-200 rounded animate-pulse"></div>;
    }

    if (isAuthenticated) {
      return (
        <div className="flex items-center gap-3">
          {user?.role === "ORGANIZER" && (
            <Link to="/create-event">
              <Button size="sm">Create Event</Button>
            </Link>
          )}
          <div className="relative group">
            <button
              type="button"
              className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                {user?.name ? user.name.charAt(0).toUpperCase() : '?'}
              </div>
              <span>{user?.name || 'User'}</span>
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown menu */}
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
              <Link
                to="/"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                My Profile
              </Link>

              {user?.role === "ORGANIZER" && (
                <Link
                  to="/organizer/events"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Manage Events
                </Link>
              )}

              <Link
                to="/"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                My Transactions
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <>
        <Link to="/login">
          <Button
            variant="ghost"
            size="sm"
            className="hidden sm:inline-flex"
          >
            Sign In
          </Button>
        </Link>
        <Link to="/register">
          <Button size="sm">Sign Up</Button>
        </Link>
      </>
    );
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="text-2xl font-bold bg-linear-to-r from-primary to-orange-600 bg-clip-text text-transparent"
        >
          Ticketon
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className={`text-sm font-medium transition-colors ${location.pathname === "/" ? "text-primary" : "text-gray-600 hover:text-gray-900"}`}
          >
            Find Events
          </Link>
          <Link
            to="/about"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          {renderAuthContent()}
        </div>
      </div>
    </header>
  );
};