import { Search } from 'lucide-react';
import { Button } from './ui/Button';

export const Sidebar = () => {
    return (
        <aside className="w-full lg:w-72 shrink-0 space-y-8">
            <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6">Filter Events</h2>

                <div className="space-y-6">
                    {/* Location */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700">Location</label>
                        <select className="w-full p-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all">
                            <option>India</option>
                            <option>USA</option>
                            <option>Europe</option>
                        </select>
                    </div>

                    {/* Name */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700">Name</label>
                        <select className="w-full p-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all">
                            <option>Model</option>
                        </select>
                    </div>

                    {/* Date */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700">Date</label>
                        <div className="flex gap-2">
                            <select className="w-full p-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all">
                                <option>From</option>
                            </select>
                            <select className="w-full p-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all">
                                <option>To</option>
                            </select>
                        </div>
                    </div>

                    {/* Event Type */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700">Event Type</label>
                        <select className="w-full p-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all">
                            <option>Type</option>
                        </select>
                    </div>

                    {/* Event Type 2 (Paid/Free) */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700">Event Type</label>
                        <select className="w-full p-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all">
                            <option>Paid Event</option>
                            <option>Free Event</option>
                        </select>
                    </div>
                </div>
            </div>

            <Button className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white border-none">
                <Search className="w-4 h-4 mr-2" />
                Apply Filters
            </Button>
        </aside>
    );
};
