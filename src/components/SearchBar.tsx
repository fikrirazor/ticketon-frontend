import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDebounce } from '../hooks/useDebounce';
import { useEventStore } from '../store/event.store';

export const SearchBar = () => {
  const { setSearch } = useEventStore();
  const [localValue, setLocalValue] = useState('');
  const debouncedValue = useDebounce(localValue, 500);

  useEffect(() => {
    setSearch(debouncedValue);
  }, [debouncedValue, setSearch]);

  return (
    <div className="relative w-full group">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
        <Search className="w-5 h-5" />
      </div>
      <input
        type="text"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        placeholder="Cari event atau kategori..."
        className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-[2rem] text-slate-900 font-bold placeholder:text-slate-400 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all shadow-sm"
      />
    </div>
  );
};
