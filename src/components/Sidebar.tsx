import { Search, LayoutGrid, MapPin, Calendar, CreditCard } from 'lucide-react';
import { Button } from './ui/button';

export const Sidebar = () => {
    return (
        <aside className="w-full lg:w-80 shrink-0 space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
            <div className="bg-white rounded-[2.5rem] p-8 shadow-2xl shadow-slate-200/50 border border-slate-100">
                <div className="flex items-center gap-3 mb-10">
                    <div className="p-3 bg-primary/10 rounded-2xl text-primary">
                        <LayoutGrid className="w-6 h-6" />
                    </div>
                    <h2 className="text-xl font-black text-slate-900 tracking-tight">Filter Event</h2>
                </div>

                <div className="space-y-8">
                    {/* Location */}
                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Lokasi</label>
                        <div className="relative group">
                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                            <select className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-900 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all appearance-none cursor-pointer">
                                <option>Indonesia (Seluruh)</option>
                                <option>Jakarta</option>
                                <option>Bandung</option>
                                <option>Bali</option>
                                <option>Surabaya</option>
                            </select>
                        </div>
                    </div>

                    {/* Date */}
                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Rentang Tanggal</label>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="relative group">
                                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                                <input type="text" placeholder="Dari" className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-900 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all" />
                            </div>
                            <div className="relative group">
                                <input type="text" placeholder="Hingga" className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-900 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all" />
                            </div>
                        </div>
                    </div>

                    {/* Event Type */}
                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Tipe Event</label>
                        <div className="relative group">
                            <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                            <select className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-900 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all appearance-none cursor-pointer">
                                <option>Seluruh Tipe</option>
                                <option>Berbayar</option>
                                <option>Gratis</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="mt-12">
                    <Button className="w-full py-6 bg-primary hover:bg-orange-600 text-white font-black rounded-2xl border-0 shadow-xl shadow-primary/20 transition-all hover:-translate-y-1 active:scale-95">
                        <Search className="w-5 h-5 mr-3" />
                        TERAPKAN FILTER
                    </Button>
                    <button className="w-full mt-4 text-[10px] font-black text-slate-400 hover:text-primary transition-colors uppercase tracking-[0.2em] focus:outline-none">
                        RESET FILTER
                    </button>
                </div>
            </div>

            {/* Help Card */}
            <div className="bg-slate-900 rounded-[2rem] p-8 text-white relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-2xl -mr-16 -mt-16 group-hover:bg-primary/30 transition-colors" />
                <div className="relative z-10">
                    <h4 className="font-black text-lg mb-2">Butuh Bantuan?</h4>
                    <p className="text-slate-400 text-xs font-medium leading-relaxed mb-6">Tim support kami siap membantu perjalanan event kamu 24/7.</p>
                    <button className="text-primary font-black text-[10px] uppercase tracking-widest hover:underline">Hubungi Kami →</button>
                </div>
            </div>
        </aside>
    );
};
