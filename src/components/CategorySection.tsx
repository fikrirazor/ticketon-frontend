import { Music, Briefcase, Palette, Trophy, Utensils, Zap, Users, Monitor, LayoutGrid, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEventStore } from '../store/event.store';
import { useState, useMemo } from 'react';

// Icon mapping helper
const getCategoryIcon = (categoryName: string) => {
  const normalized = categoryName.toLowerCase();
  if (normalized.includes('music') || normalized.includes('concert')) return Music;
  if (normalized.includes('tech') || normalized.includes('code')) return Monitor;
  if (normalized.includes('business') || normalized.includes('career')) return Briefcase;
  if (normalized.includes('art') || normalized.includes('exhibition')) return Palette;
  if (normalized.includes('sport') || normalized.includes('game')) return Trophy;
  if (normalized.includes('food') || normalized.includes('dining')) return Utensils;
  if (normalized.includes('workshop') || normalized.includes('learn')) return Zap;
  if (normalized.includes('community') || normalized.includes('meetup')) return Users;
  return LayoutGrid; // Default icon
};

const getCategoryColor = (index: number) => {
  const colors = [
    { text: 'text-pink-600', bg: 'bg-pink-50', border: 'border-pink-100', hover: 'hover:bg-pink-100' },
    { text: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100', hover: 'hover:bg-blue-100' },
    { text: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-100', hover: 'hover:bg-purple-100' },
    { text: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-100', hover: 'hover:bg-orange-100' },
    { text: 'text-green-600', bg: 'bg-green-50', border: 'border-green-100', hover: 'hover:bg-green-100' },
    { text: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-100', hover: 'hover:bg-yellow-100' },
    { text: 'text-cyan-600', bg: 'bg-cyan-50', border: 'border-cyan-100', hover: 'hover:bg-cyan-100' },
    { text: 'text-indigo-600', bg: 'bg-indigo-50', border: 'border-indigo-100', hover: 'hover:bg-indigo-100' },
  ];
  return colors[index % colors.length];
};

export const CategorySection = () => {
  const { events } = useEventStore();
  const [isExpanded, setIsExpanded] = useState(false);

  // Extract unique categories from events
  const categories = useMemo(() => {
    const uniqueNames = Array.from(new Set(events.map(e => e.category).filter(Boolean)));
    return uniqueNames.map((name, index) => ({
      name,
      icon: getCategoryIcon(name),
      ...getCategoryColor(index)
    }));
  }, [events]);
  
  if (categories.length === 0) return null;

  const displayedCategories = isExpanded ? categories : categories.slice(0, 8); // Show 8 initially
  return (
    <section className="py-4">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-black text-slate-900 tracking-tight tracking-tight">Eksplor Kategori</h2>
        
        {categories.length > 8 && (
             <button 
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center gap-1 text-primary font-black hover:underline text-sm focus:outline-none uppercase tracking-widest"
             >
                {isExpanded ? (
                    <>Sembunyikan <ChevronUp className="w-4 h-4" /></>
                ) : (
                    <>Lihat Semua <ChevronDown className="w-4 h-4" /></>
                )}
             </button>
        )}
      </div>

      <div className={`grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6 ${isExpanded ? 'animate-in fade-in zoom-in-95 duration-300' : ''}`}>
        {displayedCategories.map((category) => (
          <Link 
            key={category.name} 
            to={`/discover?category=${category.name}`}
            className={`flex flex-col items-center justify-center p-6 rounded-[2rem] transition-all duration-300 border ${category.border} ${category.bg} ${category.hover} group shadow-sm hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1`}
          >
            <div className="w-14 h-14 rounded-2xl bg-white shadow-xl shadow-slate-200/50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <category.icon className={`w-7 h-7 ${category.text}`} />
            </div>
            <span className="text-xs font-black text-slate-800 text-center line-clamp-1 uppercase tracking-tight">{category.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
};
