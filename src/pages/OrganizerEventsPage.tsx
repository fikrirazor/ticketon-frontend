// src/pages/OrganizerEventsPage.tsx
import React, { useEffect } from 'react';
import { Layout } from '../components/Layout';
import { useEventStore } from '../store/event.store';

const OrganizerEventsPage: React.FC = () => {
  const { events, fetchEvents, isLoading } = useEventStore();

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <Layout>
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <h1 className="text-3xl font-bold mb-6">My Events</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
            <p className="text-gray-500">Loading events...</p>
          </div>
        ) : events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {events.map(event => (
              <div key={event.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-gray-900">{event.title}</h3>
                <p className="text-sm text-gray-600">
                  {typeof event.location === 'object' ? event.location.city : (event.location || 'Location TBA')}
                </p>
                <p className="text-sm text-gray-500">IDR {event.price.toLocaleString()}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">Belum ada acara yang dibuat.</p>
        )}
      </div>
    </div>
    </Layout>
  );
};

export default OrganizerEventsPage;