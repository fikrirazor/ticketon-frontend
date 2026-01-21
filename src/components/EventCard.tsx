import React from 'react';
import { MapPin, Calendar, Bookmark } from 'lucide-react';
import type { Event } from '../store/useEventStore';
import { Button } from './ui/Button';
import { cn } from '../lib/utils';

interface EventCardProps {
    event: Event;
    onBuy: (id: string) => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onBuy }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group flex flex-col h-full">
            {/* Image Section */}
            <div className="relative h-48 w-full shrink-0">
                <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-md text-sm font-bold text-gray-800 shadow-sm">
                    {event.price === 0 ? 'Free' : `$${event.price}`}
                </div>
                <button className="absolute top-3 right-3 p-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/40 transition-colors text-white">
                    <Bookmark className="w-4 h-4" />
                </button>

                <div className="absolute bottom-3 left-3 flex gap-2">
                    <span className={cn(
                        "px-3 py-1 rounded-md text-xs font-semibold text-white",
                        event.isPaid ? "bg-teal-500" : "bg-yellow-500"
                    )}>
                        {event.isPaid ? 'Paid' : 'Free'}
                    </span>
                </div>
                <div className="absolute bottom-3 right-3 flex items-center gap-1 text-white text-xs font-medium bg-black/50 px-2 py-1 rounded-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-400"></span>
                    Online Event
                </div>
            </div>

            {/* Content Section */}
            <div className="p-5 flex flex-col flex-grow">
                <div className="flex items-center gap-2 mb-2">
                    <div className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 text-xs font-bold">
                        {event.organizer[0]}
                    </div>
                    <span className="text-xs text-gray-500 font-medium">{event.organizer}</span>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                    {event.title}
                </h3>

                <div className="space-y-2 mb-4">
                    <div className="flex items-start gap-3 text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mt-0.5 text-gray-400" />
                        <div className="flex gap-4">
                            <div>
                                <p className="text-xs text-gray-400">From</p>
                                <p className="font-medium">{event.dateStart}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-400">To</p>
                                <p className="font-medium">{event.dateEnd}</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="truncate">{event.location}</span>
                    </div>
                </div>

                {/* Stats */}
                <div className="mt-auto">
                    <div className="grid grid-cols-2 gap-y-2 text-xs text-gray-500 border-t border-gray-100 pt-4 mb-2">
                        <div className="flex justify-between pr-4 items-center">
                            <span>Rating</span>
                            <span>{event.rating}%</span>
                        </div>
                        <div className="flex justify-between pl-4 border-l border-gray-100 items-center">
                            <span>Upcoming</span>
                            <span>{event.upcoming}</span>
                        </div>
                    </div>
                    <div className="w-full bg-gray-100 h-1 rounded-full mb-2 overflow-hidden">
                        <div className="bg-yellow-400 h-full" style={{ width: `${event.rating}%` }}></div>
                    </div>

                    <div className="grid grid-cols-2 gap-y-2 text-xs text-gray-500 mb-2">
                        <div className="flex justify-between pr-4 items-center">
                            <span>Recommended</span>
                            <span>{event.recommended}%</span>
                        </div>
                        <div className="flex justify-between pl-4 border-l border-gray-100 items-center">
                            <span>Past</span>
                            <span>{event.past}</span>
                        </div>
                    </div>
                    <div className="w-full bg-gray-100 h-1 rounded-full mb-4 overflow-hidden">
                        <div className="bg-yellow-400 h-full" style={{ width: `${event.recommended}%` }}></div>
                    </div>

                    <Button onClick={() => onBuy(event.id)} className="w-full">
                        Buy Ticket
                    </Button>
                </div>
            </div>
        </div>
    );
};
