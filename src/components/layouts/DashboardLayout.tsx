import { Outlet } from 'react-router';
import { useAuthStore } from '@/store/useAuthStore';

const DashboardLayout = () => {
  const { user, logout } = useAuthStore();

  return (
    <div className="min-h-screen bg-gray-100 flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-md flex flex-col hidden md:flex">
            <div className="h-16 flex items-center justify-center border-b">
                <span className="text-xl font-bold text-primary">Ticketon Dashboard</span>
            </div>
            <nav className="flex-1 p-4 space-y-2">
                 {/* Navigation Links would go here */}
                 <div className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer">Dashboard</div>
                 <div className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer">Events</div>
                 <div className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer">Settings</div>
            </nav>
            <div className="p-4 border-t">
                 <button onClick={logout} className="w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded">Logout</button>
            </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
            {/* Header */}
            <header className="h-16 bg-white shadow-sm flex items-center justify-between px-6 z-10">
                <div className="font-medium text-gray-800">Welcome back, {user?.name || 'User'}</div>
                <div className="flex items-center space-x-4">
                     {/* User Profile / Notifications */}
                     <div className="w-8 h-8 rounded-full bg-gray-200"></div>
                </div>
            </header>
            
            {/* Content Area */}
            <main className="flex-1 p-6 overflow-auto">
                <Outlet />
            </main>
        </div>
    </div>
  );
};

export default DashboardLayout;
