import { Layout } from '../components/Layout';
import { EventCard } from '../components/EventCard';
import { useEventStore } from '../store/event.store';
import { SearchBar } from '../components/SearchBar';
import { FilterPanel } from '../components/FilterPanel';
import { Telescope, Compass } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { PageReveal } from '../components/ui/PageReveal';

export const DiscoverEvents = () => {
    const { events, isLoading, setLocation, setCategory, fetchEvents } = useEventStore();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const locationParam = searchParams.get('location');
        const categoryParam = searchParams.get('category');
        
        let hasParam = false;
        if (locationParam) {
            setLocation(locationParam);
            hasParam = true;
        }
        if (categoryParam) {
            setCategory(categoryParam);
            hasParam = true;
        }

        if (!hasParam) {
            fetchEvents();
        }
    }, [searchParams, setLocation, setCategory, fetchEvents]);

    return (
        <Layout>
             <PageReveal className="space-y-16 pb-20">
                {/* Header Section */}
                <section className="relative pt-32 pb-20 overflow-hidden bg-slate-900 text-white rounded-b-[4rem] shadow-2xl">
                    <div className="absolute inset-0 opacity-20">
                        <img 
                            src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop" 
                            className="w-full h-full object-cover"
                            alt="Discover events"
                        />
                    </div>
                    <div className="absolute inset-0 bg-linear-to-b from-slate-900 via-slate-900/80 to-slate-900" />
                    
                    <div className="relative z-10 max-w-7xl mx-auto px-6 space-y-12">
                        <div className="text-center space-y-6">
                            <div className="inline-flex items-center gap-2 px-4 py-1 bg-primary/20 rounded-full border border-primary/20 text-primary text-xs font-black uppercase tracking-[0.2em]">
                                <Compass className="w-3 h-3" /> EKSPLORASI TANPA BATAS
                            </div>
                            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
                                Temukan <span className="text-primary italic">Pengalaman</span> Barumu
                            </h1>
                        </div>

                        <div className="max-w-4xl mx-auto space-y-8 bg-white/5 backdrop-blur-2xl p-8 rounded-[3rem] border border-white/10 shadow-3xl">
                             <SearchBar />
                             <div className="pt-4 border-t border-white/10">
                                <FilterPanel />
                             </div>
                        </div>
                    </div>
                </section>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {isLoading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                                <div key={i} className="bg-slate-100 rounded-3xl h-96 animate-pulse" />
                            ))}
                        </div>
                    ) : events.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            {events.map((event) => (
                                <EventCard key={event.id} event={event} />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-32 text-center bg-slate-50 rounded-[4rem] border-2 border-dashed border-slate-200">
                            <div className="bg-white p-8 rounded-full mb-8 shadow-2xl shadow-slate-200 border border-slate-100 text-slate-400">
                                <Telescope className="w-16 h-16" />
                            </div>
                            <h3 className="text-3xl font-black text-slate-900 mb-2">Belum ada event ditemukan</h3>
                            <p className="text-slate-500 font-medium max-w-sm mx-auto">
                                Coba ubah kata kunci pencarianmu atau atur ulang filter lokasinya ya!
                            </p>
                        </div>
                    )}
                </div>
            </PageReveal>
        </Layout>
    );
};
