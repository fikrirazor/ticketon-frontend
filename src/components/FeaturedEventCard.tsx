import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Star, Sparkles } from 'lucide-react';
import { getFullImageUrl } from '../lib/axiosInstance';
import type { Event } from '../types';

interface FeaturedEventCardProps {
  event: Event;
}

export const FeaturedEventCard: React.FC<FeaturedEventCardProps> = ({ event }) => {
  return (
    <Link to={`/event/${event.id}`} className="group block">
      <div className="bg-white rounded-4xl border border-slate-100 overflow-hidden shadow-sm transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2">
        <div className="relative aspect-16/10 overflow-hidden">
          <img
            src={getFullImageUrl(event.imageUrl)}
            alt={event.title}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          />
          {/* Featured Badge */}
          <div className="absolute top-4 right-4 bg-primary text-white text-[10px] font-black px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-xl shadow-primary/30">
            <Sparkles className="w-3 h-3" /> FEATURED
          </div>
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
        </div>

        <div className="p-8 space-y-4">
          <div className="flex items-baseline gap-1.5">
             <span className="text-2xl font-black text-slate-900 leading-tight line-clamp-1 truncate group-hover:text-primary transition-colors">
                {event.title}
             </span>
          </div>

          <div className="flex flex-col gap-2.5">
            <div className="flex items-center gap-3 py-2 px-3 bg-slate-50 rounded-xl border border-slate-100">
              <Calendar className="w-4 h-4 text-primary" />
              <span className="text-xs font-bold text-slate-600">{new Date(event.startDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-3 py-2 px-3 bg-slate-50 rounded-xl border border-slate-100">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="text-xs font-bold text-slate-600 truncate">
                {typeof event.location === 'object' ? event.location.city : (event.location || 'Location TBA')}
              </span>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between border-t border-slate-50 mt-4">
            <div className="flex items-baseline gap-1">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Harga Tiket</span>
              <span className="text-xl font-black text-primary">Rp {event.price.toLocaleString()}</span>
            </div>
            {event.rating && event.rating > 0 && (
              <div className="flex items-center gap-1.5 text-orange-400 font-black text-xs">
                <Star className="w-4 h-4 fill-current" /> {event.rating.toFixed(1)}
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};
