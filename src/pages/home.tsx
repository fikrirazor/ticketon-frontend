import { Layout } from '../components/Layout';
import { Sidebar } from '../components/Sidebar';
import { EventCard } from '../components/EventCard';
import { useEventStore } from '../store/useEventStore';
import { ChevronDown } from 'lucide-react';

export const Home = () => {
    const { events, buyTicket } = useEventStore();

    return (
        <Layout>
            <div className="flex flex-col lg:flex-row gap-8">
                <Sidebar />

                <div className="flex-1">
                    {/* Top Bar */}
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-6 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex gap-8 text-sm font-medium">
                            <button className="text-primary border-b-2 border-primary pb-4 -mb-4 px-2">Upcoming Events</button>
                            <button className="text-gray-500 hover:text-gray-800 pb-4 -mb-4 px-2">Past Events</button>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-600 mt-4 sm:mt-0">
                            <span>Sort by</span>
                            <button className="font-bold flex items-center gap-1">
                                Recommended <ChevronDown className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {events.map((event) => (
                            <EventCard key={event.id} event={event} onBuy={buyTicket} />
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
};
