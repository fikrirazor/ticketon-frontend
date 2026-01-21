import { useEventStore } from '../store/event.store';
import { Filter, MapPin } from 'lucide-react';

export const FilterPanel = () => {
  const { filter, setCategory, setLocation } = useEventStore();

  const categories = ['All', 'Music', 'Technology', 'Art', 'Business', 'Sports'];
  const locations = ['All', 'Jakarta', 'Bandung', 'Bali', 'Surabaya'];

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-center">
      <div className="flex items-center gap-2 text-gray-700 font-medium">
        <Filter className="w-5 h-5 text-primary" />
        <span>Filters:</span>
      </div>

      <div className="flex flex-wrap gap-2 w-full md:w-auto">
        <select
          value={filter.category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none cursor-pointer"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat === 'All' ? 'All Categories' : cat}
            </option>
          ))}
        </select>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none text-gray-500">
            <MapPin className="w-4 h-4" />
          </div>
          <select
            value={filter.location}
            onChange={(e) => setLocation(e.target.value)}
            className="pl-8 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none cursor-pointer"
          >
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc === 'All' ? 'All Locations' : loc}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
