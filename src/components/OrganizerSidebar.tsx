import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Calendar, Plus, Home } from 'lucide-react';

export const OrganizerSidebar: React.FC = () => {
    const menuItems = [
        {
            title: 'Dashboard',
            icon: <LayoutDashboard size={20} />,
            path: '/organizer/dashboard'
        },
        {
            title: 'List Event',
            icon: <Calendar size={20} />,
            path: '/organizer/events'
        }
    ];

    return (
        <aside className="w-72 bg-white border-r border-slate-100 flex flex-col h-screen sticky top-0 animate-in fade-in slide-in-from-left duration-500">
            <div className="p-8">
                <div className="flex items-center gap-3 mb-10 px-2">
                    <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/30">
                        <span className="font-black text-xl">T</span>
                    </div>
                    <span className="text-xl font-black text-slate-900 tracking-tight">Ticketon</span>
                </div>

                <nav className="space-y-2">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4 mb-4">Main Menu</p>
                    {menuItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300 font-bold text-sm ${isActive
                                    ? 'bg-primary text-white shadow-xl shadow-primary/20'
                                    : 'text-slate-500 hover:bg-slate-50 hover:text-primary'
                                }`
                            }
                        >
                            {item.icon}
                            {item.title}
                        </NavLink>
                    ))}
                </nav>
            </div>

            <div className="mt-auto p-8 space-y-4">
                <NavLink
                    to="/create-event"
                    className="flex items-center justify-center gap-2 w-full py-4 px-4 bg-slate-900 text-white rounded-2xl font-black text-sm hover:bg-slate-800 transition-all shadow-xl shadow-slate-200"
                >
                    <Plus size={18} />
                    BUAT EVENT
                </NavLink>

                <NavLink
                    to="/"
                    className="flex items-center gap-4 px-4 py-4 rounded-2xl text-slate-500 hover:bg-slate-50 hover:text-primary transition-all font-bold text-sm"
                >
                    <Home size={20} />
                    Beranda
                </NavLink>
            </div>
        </aside>
    );
};
