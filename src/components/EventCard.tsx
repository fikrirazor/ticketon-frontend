import React from 'react';
import { MapPin, Calendar, Users } from 'lucide-react';
import type { Event } from '../types';
import { Button } from './ui/Button';
import { Link } from 'react-router-dom';
import { getFullImageUrl } from '../lib/axiosInstance';

interface EventCardProps {
  event: Event;
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const date = new Date(event.startDate).toLocaleDateString('en-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group flex flex-col h-full">
      <div className="relative h-48 w-full shrink-0 overflow-hidden">
        <img
          src={getFullImageUrl(event.imageUrl)}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-md text-sm font-bold text-gray-800 shadow-sm">
          Rp {event.price.toLocaleString('id-ID')}
        </div>
        <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-medium text-white">
          {event.category}
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <div className="mb-2">
          <span className="text-xs font-semibold text-primary uppercase tracking-wide">
            {event.organizer.name}
          </span>
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {event.title}
        </h3>

        <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-grow">
          {event.description}
        </p>

        <div className="space-y-2 mb-4 border-t border-gray-100 pt-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4 text-gray-400" />
            <span className="truncate">{event.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Users className="w-4 h-4 text-gray-400" />
            <span>
              <span className="font-semibold text-gray-900">{event.seatLeft}</span> / {event.seatTotal} seats left
            </span>
          </div>
        </div>

        <Link to={`/event/${event.id}`} className="mt-auto">
          <Button className="w-full bg-primary hover:bg-orange-600 text-white">
            View Details
          </Button>
        </Link>
      </div>
    </div>
  );
};
