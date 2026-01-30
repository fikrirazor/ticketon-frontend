import React from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';

export const OrganizerProfile: React.FC = () => {
  // TODO: Implement organizer profile functionality
  // This feature requires backend support for fetching organizer details
  // and their reviews based on organizer ID or name parameter
  
  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[70vh] text-center">
        <div className="space-y-4">
          <ArrowLeft className="w-12 h-12 text-gray-400 mx-auto" />
          <h2 className="text-3xl font-bold text-gray-800">Feature Coming Soon</h2>
          <p className="text-gray-500 max-w-md">
            Organizer profile pages are being developed. Check back soon!
          </p>
          <Link to="/">
            <Button variant="primary" className="rounded-lg">
              ← Back to Discovery
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};
