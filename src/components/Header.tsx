import { Phone, Mail, Globe, User, Plus } from 'lucide-react';
import { Button } from './ui/Button';
import { Link } from 'react-router-dom';

export const Header = () => {
    return (
        <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
            <div className="container mx-auto px-4 h-20 flex items-center justify-between">
                {/* Left: Logo & Contact */}
                <div className="flex items-center gap-8">
                    <Link to="/" className="flex items-center gap-2">
                        <div className="text-2xl font-bold text-gray-800">
                            PWDK<span className="text-primary">EVENT</span>
                        </div>
                    </Link>

                    <div className="hidden lg:flex items-center gap-6 text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4" />
                            <span>+1 (678) 999 3323</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            <span>info@PwdkEvent.com</span>
                        </div>
                    </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-4">
                    <button className="p-2 text-gray-500 hover:bg-gray-50 rounded-full">
                        <Globe className="w-5 h-5" />
                    </button>

                    <div className="flex items-center gap-2 text-sm text-gray-500 px-4 border-l border-r border-gray-100 h-8">
                        <User className="w-4 h-4" />
                        <Link to="/login" className="hover:text-primary">Login</Link>
                        <span>/</span>
                        <Link to="/register" className="hover:text-primary">Register</Link>
                    </div>

                    <Button className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 border-none shadow-lg shadow-orange-500/20">
                        <Plus className="w-4 h-4 mr-2" />
                        Create Event
                    </Button>
                </div>
            </div>
        </header>
    );
};
