import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "./ui/button"; // Shadcn Button
import { AnimatedButtonText } from "./ui/animated-button-text";
import { useAuthStore } from "../store/auth.store";
import { Plus, User, LogOut, Ticket, Globe, ChevronDown, Compass } from "lucide-react";
import { Compass, Plus, Search, User, LogOut, Ticket, LayoutDashboard } from "lucide-react";

export const Header = () => {
  const location = useLocation();
  const { user, isAuthenticated, isLoading, logout } = useAuthStore();
  const [scrolled, setScrolled] = useState(false);

  // Check if we are on the home page
  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
  };

  const renderAuthContent = () => {
    if (isLoading) {
      return <div className="h-9 w-24 bg-white/20 rounded animate-pulse"></div>;
    }

    if (isAuthenticated) {
      return (
        <div className="flex items-center gap-4">
          {user?.role?.toUpperCase() === "ORGANIZER" && (
            <Link to="/create-event" className="hidden sm:block">
              <Button size="sm" className="bg-primary hover:bg-orange-600 text-white border-0 shadow-lg shadow-orange-500/20">
                <Plus className="w-4 h-4 mr-2" />
                Create Event
              </Button>
            </Link>
          )}

          <div className="relative group">
            <button
              type="button"
              className={`flex items-center gap-3 pl-2 pr-1 py-1 rounded-full transition-all border ${scrolled || !isHome ? 'hover:bg-gray-100 border-transparent hover:border-gray-200' : 'hover:bg-white/10 border-transparent hover:border-white/20'
                }`}
            >
              <div className="w-8 h-8 rounded-full bg-linear-to-br from-primary to-orange-600 text-white flex items-center justify-center text-sm font-bold shadow-md">
                {user?.name ? user.name.charAt(0).toUpperCase() : <User className="w-4 h-4" />}
              </div>
              <span className={`text-sm font-medium hidden md:block max-w-[100px] truncate ${scrolled || !isHome ? 'text-slate-700' : 'text-white'
                }`}>
                {user?.name || 'User'}
              </span>
            </button>

            {/* Dropdown menu */}
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 border border-gray-100 transform origin-top-right scale-95 group-hover:scale-100">
              <div className="px-4 py-3 border-b border-gray-100 mb-2">
                <p className="text-sm font-semibold text-slate-900 truncate">{user?.name}</p>
                <p className="text-xs text-slate-500 truncate">{user?.email}</p>
              </div>

              <Link
                to="/profile"
                className="flex items-center px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-primary transition-colors"
              >
                <User className="w-4 h-4 mr-3" />
                My Profile
              </Link>

              <Link
                to="/profile"
                className="flex items-center px-4 py-2 text-sm font-bold text-primary hover:bg-orange-50 transition-colors"
                onClick={() => {
                  // Small delay to ensure navigation happened before we try to set state
                  setTimeout(() => {
                    window.dispatchEvent(new CustomEvent('open-profile-edit'));
                  }, 100);
                }}
              >
                <Plus className="w-4 h-4 mr-3" />
                Edit Profile
              </Link>

              {user?.role?.toUpperCase() === "ORGANIZER" && (
                <>
                  <Link
                    to="/organizer/dashboard"
                    className="flex items-center px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-primary transition-colors font-bold"
                  >
                    <LayoutDashboard className="w-4 h-4 mr-3" />
                    Dashboard
                  </Link>
                </>
              )}

              <Link
                to="/transactions"
                className="flex items-center px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-primary transition-colors"
              >
                <Ticket className="w-4 h-4 mr-3" />
                My Transactions
              </Link>

              <div className="border-t border-gray-100 my-2"></div>

              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-4 h-4 mr-3" />
                Logout
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="flex items-center gap-2 sm:gap-4">
         <div className="hidden md:flex items-center">
            <Button variant="ghost" size="sm" className={`gap-2 font-medium ${
                scrolled || !isHome ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100' : 'text-white hover:text-white/80 hover:bg-white/10'
            }`}>
                <Globe className="w-4 h-4" />
                EN
                <ChevronDown className="w-3 h-3 opacity-70" />
            </Button>
         </div>

        <Link to="/login">
          <Button
            variant="ghost"
            className={`font-medium ${
               scrolled || !isHome ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100' : 'text-white hover:text-white hover:bg-white/10' 
            }`}
            size="sm"
            className={`font-medium hidden sm:inline-flex ${scrolled || !isHome ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100' : 'text-white hover:text-white hover:bg-white/10'
              }`}
          >
            Log in
          </Button>
        </Link>
        <Link to="/register">
          <Button className="bg-primary hover:bg-orange-600 text-white shadow-lg shadow-orange-500/20 transition-all transform hover:-translate-y-0.5 border-0 rounded-lg px-6">
            <AnimatedButtonText text="Sign up" />
          </Button>
        </Link>
      </div>
    );
  };

  return (
    <header
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          scrolled || !isHome 
          ? 'bg-white border-b border-gray-100 py-3 shadow-md' 
          : 'bg-transparent py-5'
        }`}
    >
      <div className="relative w-full px-4 md:px-8 h-10 flex items-center justify-between">
        <div className="flex items-center gap-12 z-20"> {/* Added z-20 to ensure it's above absolute nav if overlaps */}
            <Link
            to="/"
            className="hover:opacity-80 transition-opacity"
            >
            <span className={`font-stack-notch font-bold text-2xl tracking-tighter ${
              scrolled || !isHome ? 'text-primary' : 'text-white'
            }`}>TICKETON</span>
            </Link>
      className={`fixed top-0 z-50 w-full px-4 transition-all duration-300 ${scrolled || !isHome
        ? 'bg-white border-b border-gray-100 py-3 shadow-md'
        : 'bg-transparent py-5'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center gap-12">
          <Link
            to="/"
            className="hover:opacity-80 transition-opacity"
          >
            <span className={`text-2xl font-black tracking-tighter ${scrolled || !isHome ? 'text-primary' : 'text-white'
              }`}>TICKETON</span>
          </Link>

          {/* Search Bar - Desktop */}
          <div className={`relative hidden grow md:block lg:max-w-md transition-all duration-300 ${scrolled || !isHome ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
            }`}>
            <div className="group relative flex items-center rounded-full border border-gray-200 bg-slate-50 px-4 py-2 transition-all focus-within:border-primary/50 focus-within:ring-4 focus-within:ring-primary/10">
              <Search className="w-4 h-4 text-slate-400 mr-2" />
              <input
                type="text"
                placeholder="Search events..."
                className="bg-transparent border-none focus:ring-0 text-sm w-full text-slate-900 placeholder:text-slate-400"
              />
            </div>
          </div>
        </div>

        {/* Absolute Centered Nav */}
        <nav className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center gap-8 z-10">
          <Link
            to="/discover"
            className={`flex items-center gap-2 text-sm font-bold transition-colors ${location.pathname === "/discover"
              ? "text-primary"
              : (scrolled || !isHome ? "text-slate-600 hover:text-primary" : "text-white/90 hover:text-white")
              }`}
          >
            <Compass className="w-4 h-4" />
            Discover
          </Link>
          <Link
            to="/create-event"
            className={`flex items-center gap-2 text-sm font-bold transition-colors ${location.pathname === "/create-event"
              ? "text-primary"
              : (scrolled || !isHome ? "text-slate-600 hover:text-primary" : "text-white/90 hover:text-white")
              }`}
          >
            <Plus className="w-4 h-4" />
            Create
          </Link>
        </nav>

        <div className="flex items-center gap-3 z-20">
          {renderAuthContent()}
        </div>
      </div>
    </header>
  );
};