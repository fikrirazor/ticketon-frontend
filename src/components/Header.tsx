import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/Button';

export const Header = () => {
    const location = useLocation();
    
    return (
        <header className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link to="/" className="text-2xl font-bold bg-linear-to-r from-primary to-orange-600 bg-clip-text text-transparent">
                    Ticketon
                </Link>
                
                <nav className="hidden md:flex items-center gap-6">
                    <Link to="/" className={`text-sm font-medium transition-colors ${location.pathname === '/' ? 'text-primary' : 'text-gray-600 hover:text-gray-900'}`}>
                        Find Events
                    </Link>
                    <Link to="/about" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                        About
                    </Link>
                    <Link to="/contact" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                        Contact
                    </Link>
                </nav>

                <div className="flex items-center gap-3">
                    <Link to="/login">
                        <Button variant="ghost" size="sm" className="hidden sm:inline-flex">Sign In</Button>
                    </Link>
                    <Link to="/create-event">
                        <Button size="sm">Create Event</Button>
                    </Link>
                </div>
            </div>
        </header>
    );
};
