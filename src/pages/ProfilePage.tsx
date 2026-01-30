// src/pages/ProfilePage.tsx
import React from 'react';
import { Layout } from '../components/Layout';
import { useAuthStore } from '../store/auth.store';

const ProfilePage: React.FC = () => {
  const { user, logout } = useAuthStore();

  return (
    <Layout>
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-6">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl font-bold mr-4">
            {user?.name ? user.name.charAt(0).toUpperCase() : '?'}
          </div>
          <div>
            <h2 className="text-xl font-semibold">{user?.name || 'Unknown User'}</h2>
            <p className="text-gray-600">{user?.email}</p>
            <p className="text-sm text-gray-500">Role: {user?.role}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-lg p-4">
            <h3 className="font-medium text-gray-700">Personal Information</h3>
            <p className="mt-2">Email: {user?.email}</p>
          </div>
          
          <div className="border rounded-lg p-4">
            <h3 className="font-medium text-gray-700">Account Status</h3>
            <p className="mt-2">Active</p>
          </div>
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default ProfilePage;