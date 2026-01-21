import React from 'react';
import { Header } from './Header';

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <Header />
            <main className="pt-24 px-4 pb-12 w-full max-w-7xl mx-auto">
                {children}
            </main>
        </div>
    );
};
