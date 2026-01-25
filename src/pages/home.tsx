import { useEffect } from 'react';
import { Layout } from '../components/Layout';
import { EventCard } from '../components/EventCard';
import { useEventStore } from '../store/event.store';
import { SearchBar } from '../components/SearchBar';
import { FilterPanel } from '../components/FilterPanel';
import { Telescope } from 'lucide-react';

export const Home = () => {
    const { events, fetchEvents, isLoading } = useEventStore();

    useEffect(() => {
        fetchEvents();
    }, [fetchEvents]);

    return (
        <Layout>
            <div className="space-y-8">
                {/* Hero Section */}
                <div className="text-center space-y-4 py-8 md:py-12">
                     <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
                        Discover <span className="text-primary">Amazing Events</span> <br className="hidden md:block"/> Around You
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Find and book the best concerts, workshops, and exhibitions happening in your city.
                    </p>
                </div>

                {/* Filters and Search */}
                <div className="sticky top-16 z-40 bg-gray-50/95 backdrop-blur-sm p-4 -mx-4 md:mx-0 rounded-b-xl md:rounded-xl border-b md:border border-gray-200/50 shadow-sm transition-all">
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                         <div className="w-full md:w-96">
                            <SearchBar />
                         </div>
                         <FilterPanel />
                    </div>
                </div>

                {/* Event Grid */}
                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="bg-white rounded-2xl h-80 animate-pulse border border-gray-100 shadow-sm" />
                        ))}
                    </div>
                ) : events.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {events.map((event) => (
                            <EventCard key={event.id} event={event} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="bg-gray-100 p-6 rounded-full mb-4">
                            <Telescope className="w-12 h-12 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">No events found</h3>
                        <p className="text-gray-500">
                            We couldn't find any events matching your search criteria. <br/>
                            Try adjusting your filters or search terms.
                        </p>
                    </div>
                )}
            </div>
        </Layout>
    );
};
