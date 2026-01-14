import { Outlet, Link } from 'react-router';

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="border-b bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold text-primary">Ticketon</Link>
          <nav className="flex items-center gap-6">
             <Link to="/events" className="text-sm font-medium hover:text-primary transition-colors">Events</Link>
             <Link to="/login" className="text-sm font-medium hover:text-primary transition-colors">Login</Link>
             <Link to="/register" className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">Get Started</Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t py-6 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Ticketon. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
