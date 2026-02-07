import React from "react";
import { Link } from "react-router-dom";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { getFullImageUrl } from "../lib/axiosInstance";
import type { Event } from "../types";

interface EventCardProps {
  event: Event;
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <Link to={`/event/${event.id}`} className="group block h-full">
      <div className="flex flex-col h-full bg-white rounded-3xl border border-slate-100 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-2 relative">
        {/* Category Label */}
        <div className="absolute top-4 left-4 z-10">
          <span className="px-3 py-1.5 bg-white/95 backdrop-blur-md border border-slate-100 rounded-xl text-[10px] font-black text-slate-900 uppercase tracking-widest shadow-lg">
            {event.category}
          </span>
        </div>

        {/* Image Section */}
        <div className="relative aspect-4/3 overflow-hidden">
          <img
            src={getFullImageUrl(event.imageUrl, 600, 450)}
            alt={event.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-linear-to-t from-slate-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* Content Section */}
        <div className="p-6 flex flex-col grow bg-white">
          <h3 className="text-lg font-black text-slate-900 mb-3 line-clamp-2 leading-tight group-hover:text-primary transition-colors">
            {event.title}
          </h3>

          <div className="space-y-2 mb-6">
            <div className="flex items-center text-slate-500 gap-2">
              <Calendar className="w-4 h-4 text-primary/60" />
              <span className="text-xs font-bold">
                {new Date(event.startDate).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center text-slate-500 gap-2">
              <MapPin className="w-4 h-4 text-primary/60" />
              <span className="text-xs font-bold truncate">
                {typeof event.location === "object"
                  ? event.location.city
                  : event.location || "Location TBA"}
              </span>
            </div>
          </div>

          <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">
                Harga Tiket
              </span>
              <span className="text-primary font-black text-xl">
                Rp {event.price.toLocaleString()}
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all transform group-hover:rotate-12">
              <ArrowRight className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
