import { useEffect } from 'react';
import { Layout } from '../components/Layout';
import { EventCard } from '../components/EventCard';
import { HeroSlider } from '../components/HeroSlider';
import { CategorySection } from '../components/CategorySection';
import { LocationSection } from '../components/LocationSection';
import { Newsletter } from '../components/Newsletter';
import { useEventStore } from '../store/event.store';
import { Telescope, Sparkles } from 'lucide-react';

export const Home = () => {
    const { events, isLoading, fetchEvents } = useEventStore();

    useEffect(() => {
        fetchEvents();
    }, [fetchEvents]);

    const recentEvents = events.slice(0, 8);

    return (
        <Layout>
            <div className="space-y-20 pb-20">
                {/* Hero Slider */}
                <HeroSlider />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
                    {/* Categories */}
                    <CategorySection />

                    {/* Locations */}
                    <LocationSection />

                    {/* All Events / Recommended */}
                    <section className="space-y-10">
                         <div className="flex items-end justify-between">
                            <div className="space-y-2">
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 rounded-full border border-blue-100">
                                    <Sparkles className="w-3 h-3 text-blue-500" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-blue-500">Just for you</span>
                                </div>
                                <h2 className="text-3xl font-black text-slate-900 tracking-tight">Event Rekomendasi</h2>
                                <p className="text-slate-500 font-medium">Eksplorasi ribuan event menarik lainnya</p>
                            </div>
                         </div>

                        {isLoading ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="bg-slate-100 rounded-3xl h-96 animate-pulse" />
                                ))}
                            </div>
                        ) : events.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                {(recentEvents.length > 0 ? recentEvents : events).map((event) => (
                                    <EventCard key={event.id} event={event} />
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-24 text-center bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
                                <div className="bg-white p-6 rounded-full mb-6 shadow-xl shadow-slate-200/50 border border-slate-100">
                                    <Telescope className="w-12 h-12 text-slate-400" />
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 mb-2">Belum ada event nih</h3>
                                <p className="text-slate-500 font-medium max-w-sm mx-auto">
                                    Coba atur filter pencarianmu atau cari kata kunci lain ya!
                                </p>
                            </div>
                        )}
                    </section>

                    <Newsletter />
                </div>
            </div>
        </Layout>
    );
};
