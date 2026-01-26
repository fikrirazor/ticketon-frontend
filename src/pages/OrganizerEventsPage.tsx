// src/pages/OrganizerEventsPage.tsx
import React from 'react';

const OrganizerEventsPage: React.FC = () => {
  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <h1 className="text-3xl font-bold mb-6">My Events</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-600">Daftar acara yang kamu kelola akan muncul di sini.</p>
        {/* Implementasi daftar acara milik organizer */}
      </div>
    </div>
  );
};

export default OrganizerEventsPage;