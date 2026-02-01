import { 
  Music, 
  Moon, 
  Lightbulb, 
  Utensils, 
  Palette, 
  Trophy, 
  Cpu,
  ChevronDown, 
  ChevronUp 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const STATIC_CATEGORIES = [
  { name: 'MUSIC', icon: Music, text: 'text-rose-500', bg: 'bg-rose-50', border: 'border-rose-100', hover: 'hover:bg-rose-100' },
  { name: 'NIGHTLIFE', icon: Moon, text: 'text-indigo-500', bg: 'bg-indigo-50', border: 'border-indigo-100', hover: 'hover:bg-indigo-100' },
  { name: 'WORKSHOP', icon: Lightbulb, text: 'text-amber-500', bg: 'bg-amber-50', border: 'border-amber-100', hover: 'hover:bg-amber-100' },
  { name: 'FOOD', icon: Utensils, text: 'text-orange-500', bg: 'bg-orange-50', border: 'border-orange-100', hover: 'hover:bg-orange-100' },
  { name: 'ARTS', icon: Palette, text: 'text-sky-500', bg: 'bg-sky-50', border: 'border-sky-100', hover: 'hover:bg-sky-100' },
  { name: 'SPORTS', icon: Trophy, text: 'text-emerald-500', bg: 'bg-emerald-50', border: 'border-emerald-100', hover: 'hover:bg-emerald-100' },
  { name: 'TECH', icon: Cpu, text: 'text-slate-500', bg: 'bg-slate-50', border: 'border-slate-100', hover: 'hover:bg-slate-100' },
];

export const CategorySection = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const displayedCategories = STATIC_CATEGORIES; 
  return (
    <section className="py-4">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Eksplor Kategori</h2>
        
        {STATIC_CATEGORIES.length > 8 && (
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

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {displayedCategories.map((category) => (
          <Link 
            key={category.name} 
            to={`/discover?category=${category.name}`}
            className={`flex flex-col items-center justify-center p-5 rounded-2xl transition-all duration-300 border ${category.border} ${category.bg} ${category.hover} group shadow-sm hover:shadow-md hover:-translate-y-1`}
          >
            <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center mb-3 group-hover:scale-105 transition-transform border border-slate-50">
              <category.icon className={`w-6 h-6 ${category.text}`} />
            </div>
            <span className="text-[11px] font-bold text-slate-700 text-center uppercase tracking-wider">{category.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
};
