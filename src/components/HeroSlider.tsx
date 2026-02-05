import { useEffect, useState, useRef } from 'react';
import { Search, MapPin, ChevronDown, Check, LayoutGrid } from 'lucide-react';

import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';


const LocationDropdown = ({ selected, onSelect }: { selected: string, onSelect: (val: string) => void }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const locations = ['Di Mana Saja', 'Jakarta', 'Bandung', 'Surabaya', 'Bali', 'Yogyakarta'];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative w-full h-full" ref={dropdownRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "w-full h-full pl-14 pr-10 py-5 bg-slate-50 border border-slate-100 rounded-[2rem] text-slate-900 font-bold text-left text-lg transition-all flex items-center justify-between group",
                    isOpen && "ring-4 ring-primary/10 border-primary bg-white"
                )}
            >
                <div className="absolute left-6 flex items-center">
                    <MapPin className={cn("w-5 h-5 transition-colors", isOpen ? "text-primary" : "text-slate-400")} />
                </div>
                <span className="truncate">{selected}</span>
                <ChevronDown className={cn("w-5 h-5 text-slate-400 transition-transform duration-300", isOpen && "rotate-180 text-primary")} />
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 right-0 mt-3 bg-white/95 backdrop-blur-xl border border-slate-100 rounded-[2.5rem] shadow-3xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200 p-3">
                    <div className="max-h-[350px] overflow-y-auto scrollbar-hide py-1">

                        {locations.map((loc) => (
                            <button
                                key={loc}
                                type="button"
                                onClick={() => {
                                    onSelect(loc);
                                    setIsOpen(false);
                                }}
                                className={cn(
                                    "w-full flex items-center justify-between px-6 py-4 rounded-2xl text-left font-bold text-base transition-all mb-1 last:mb-0",
                                    selected === loc 
                                        ? "bg-primary/10 text-primary shadow-sm" 
                                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                )}
                            >
                                <span className="flex items-center gap-3">
                                    {loc === 'Di Mana Saja' ? <LayoutGrid className="w-4 h-4" /> : <MapPin className="w-4 h-4 opacity-50" />}
                                    {loc}
                                </span>
                                {selected === loc && <Check className="w-4 h-4" />}
                            </button>
                        ))}
                    </div>
                </div>
            )}

        </div>
    );
};

export const HeroSlider = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('Di Mana Saja');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const searchParams = new URLSearchParams();
        if (searchTerm.trim()) searchParams.append('search', searchTerm);
        if (selectedLocation !== 'Di Mana Saja') searchParams.append('location', selectedLocation);
        
        navigate(`/discover?${searchParams.toString()}`);
    };


    return (
        <div className="relative w-full h-[550px] md:h-screen flex items-center justify-center">
            {/* Scenic Background Image (Tiket.com style) - Overflow hidden moved here */}
            <div className="absolute inset-0 overflow-hidden">
                <img 
                    src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073&auto=format&fit=crop" 
                    alt="Scenic Background" 
                    className="w-full h-full object-cover scale-105 animate-pulse-slow"
                />
                <div className="absolute inset-0 bg-black/30" />
            </div>


            {/* Content Container */}
            <div className="relative z-10 w-full max-w-5xl px-6 text-center space-y-8">
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <h1 className="text-4xl font-extrabold md:text-6xl font-black text-white leading-tight drop-shadow-xl">
                        CARI EVENT <span className="text-primary italic">IMPIANMU</span>
                    </h1>
                    <p className="text-white/90 text-lg md:text-xl font-medium max-w-2xl mx-auto drop-shadow-lg">
                        Cari event seru, konser, workshop, dan banyak lagi di Ticketon.
                    </p>
                </div>

                {/* Floating Search/Filter Box (Tiket.com iconic element) */}
                <div className="bg-white rounded-[3rem] shadow-3xl p-4 md:p-8 animate-in fade-in zoom-in-95 delay-200 duration-700 max-w-4xl mx-auto">
                    <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative group">
                            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                                <Search className="w-5 h-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                            </div>
                            <input 
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Cari Event, Konser, atau Webinar..."
                                className="w-full pl-14 pr-4 py-5 bg-slate-50 border border-slate-100 rounded-[2rem] text-slate-900 font-bold focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-lg placeholder:text-slate-400"
                            />
                        </div>
                        
                        <div className="md:w-px h-8 md:h-auto bg-slate-100 self-center hidden md:block mx-2" />

                        <div className="flex-1 relative group hidden md:block">
                            <LocationDropdown 
                                selected={selectedLocation} 
                                onSelect={setSelectedLocation} 
                            />
                        </div>


                        <Button type="submit" className="md:w-40 py-5 h-auto bg-primary hover:bg-orange-600 text-white font-black rounded-[2rem] text-lg shadow-xl shadow-primary/30 border-0 transition-all hover:-translate-y-1 active:scale-95">
                            CARI
                        </Button>
                    </form>
                </div>
            </div>
            
            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
                    <div className="w-1 h-2 bg-white/60 rounded-full" />
                </div>
            </div>
        </div>
    );
};
