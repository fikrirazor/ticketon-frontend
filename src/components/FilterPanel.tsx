import { useEventStore } from '../store/event.store';
import { MapPin, LayoutGrid, Check } from 'lucide-react';
import { cn } from '../lib/utils';

export const FilterPanel = () => {
  const { filter, setCategory, setLocation } = useEventStore();

  const categories = ['All', 'Music', 'Technology', 'Art', 'Business', 'Sports'];
  const locations = ['All', 'Jakarta', 'Bandung', 'Bali', 'Surabaya', 'Yogyakarta', 'Medan'];

  const handleCategoryClick = (cat: string) => {
    setCategory(cat === 'All' ? '' : cat);
  };

  const handleLocationClick = (loc: string) => {
    setLocation(loc === 'All' ? '' : loc);
  };

  return (
    <div className="space-y-6">
      {/* Category Pills */}
      <div className="space-y-3">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2 flex items-center gap-2">
          <LayoutGrid className="w-3 h-3 text-primary" /> Kategori Event
        </label>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => {
            const isActive = (filter.category || 'All') === cat;
            return (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className={cn(
                  "px-6 py-2.5 rounded-full text-xs font-black transition-all border flex items-center gap-2",
                  isActive 
                    ? "bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-105" 
                    : "bg-white text-slate-600 border-slate-100 hover:border-primary/30 hover:bg-slate-50"
                )}
              >
                {isActive && <Check className="w-3 h-3" />}
                {cat === 'All' ? 'SEMUA KATEGORI' : cat.toUpperCase()}
              </button>
            );
          })}
        </div>
      </div>

      {/* Location Pills */}
      <div className="space-y-3">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2 flex items-center gap-2">
          <MapPin className="w-3 h-3 text-primary" /> Lokasi Populer
        </label>
        <div className="flex flex-wrap gap-2">
          {locations.map((loc) => {
            const isActive = (filter.location || 'All') === loc;
            return (
              <button
                key={loc}
                onClick={() => handleLocationClick(loc)}
                className={cn(
                  "px-6 py-2.5 rounded-full text-xs font-black transition-all border flex items-center gap-2",
                  isActive 
                    ? "bg-slate-900 text-white border-slate-900 shadow-lg shadow-slate-900/20 scale-105" 
                    : "bg-white text-slate-600 border-slate-100 hover:border-slate-900/30 hover:bg-slate-50"
                )}
              >
                {isActive && <Check className="w-3 h-3" />}
                {loc === 'All' ? 'SELURUH LOKASI' : loc.toUpperCase()}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
