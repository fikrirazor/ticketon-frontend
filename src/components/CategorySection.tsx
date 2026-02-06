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
  { name: 'MUSIC', icon: Music, image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3' },
  { name: 'NIGHTLIFE', icon: Moon, image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3' },
  { name: 'WORKSHOP', icon: Lightbulb, image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3' },
  { name: 'FOOD', icon: Utensils, image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3' },
  { name: 'ARTS', icon: Palette, image: 'https://images.unsplash.com/photo-1460661619275-dcfcd0f305a7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3' },
  { name: 'SPORTS', icon: Trophy, image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3' },
  { name: 'TECH', icon: Cpu, image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3' },
];

export const CategorySection = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  // For redesign, we'll keep all visible or handle slice if needed. 
  // Given the grid layout (upto 7 cols), showing all is fine or slice if mobile.
  // The original code passed STATIC_CATEGORIES directly to displayedCategories.
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
            className="group relative flex flex-col justify-between p-4 rounded-[1.5rem] overflow-hidden aspect-[4/5] hover:-translate-y-2 transition-transform duration-300 shadow-lg hover:shadow-xl"
          >
            {/* Background Image */}
            <div className="absolute inset-0">
                <img 
                    src={category.image} 
                    alt={category.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                {/* Gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
            </div>

            {/* Icon - Top Left */}
            <div className="relative z-10 w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white">
              <category.icon className="w-5 h-5" />
            </div>

            {/* Title - Bottom */}
            <div className="relative z-10">
                <span className="text-sm md:text-base font-bold text-white uppercase tracking-wider">{category.name}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
