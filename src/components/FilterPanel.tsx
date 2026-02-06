import { useEventStore } from "../store/event.store";
import { MapPin, LayoutGrid, Check, ChevronDown, Search } from "lucide-react";
import { cn } from "../lib/utils";
import { useState, useRef, useEffect } from "react";

// Comprehensive list of Indonesian cities
const ALL_CITIES = [
  "Jakarta",
  "Bandung",
  "Bali",
  "Surabaya",
  "Yogyakarta",
  "Medan",
  "Semarang",
  "Makassar",
  "Palembang",
  "Tangerang",
  "Depok",
  "Bekasi",
  "Bogor",
  "Malang",
  "Padang",
  "Denpasar",
  "Samarinda",
  "Banjarmasin",
  "Batam",
  "Pekanbaru",
  "Manado",
  "Balikpapan",
  "Pontianak",
  "Jambi",
  "Cirebon",
  "Sukabumi",
  "Mataram",
  "Serang",
  "Tasikmalaya",
  "Bandar Lampung",
  "Cilegon",
  "Kupang",
  "Ambon",
  "Jayapura",
  "Solo",
  "Magelang",
  "Purwokerto",
  "Tegal",
  "Pekalongan",
  "Kudus",
  "Cilacap",
  "Madiun",
  "Kediri",
  "Blitar",
  "Probolinggo",
  "Pasuruan",
  "Mojokerto",
  "Jember",
  "Banyuwangi",
  "Sidoarjo",
].sort();

export const FilterPanel = () => {
  const { filter, setCategory, setLocation } = useEventStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const categories = [
    "All",
    "MUSIC",
    "NIGHTLIFE",
    "WORKSHOP",
    "FOOD",
    "ARTS",
    "SPORTS",
    "TECH",
  ];
  const popularLocations = [
    "All",
    "Jakarta",
    "Bandung",
    "Bali",
    "Surabaya",
    "Yogyakarta",
    "Medan",
  ];

  // Filter cities based on search query
  const filteredCities = ALL_CITIES.filter((city) =>
    city.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleCategoryClick = (cat: string) => {
    setCategory(cat === "All" ? "" : cat);
  };

  const handleLocationClick = (loc: string) => {
    setLocation(loc === "All" ? "" : loc);
  };

  const handleCitySelect = (city: string) => {
    setLocation(city);
    setIsDropdownOpen(false);
    setSearchQuery("");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <div className="space-y-6">
      {/* Category Pills */}
      <div className="space-y-3">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2 flex items-center gap-2">
          <LayoutGrid className="w-3 h-3 text-primary" /> Kategori Event
        </label>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => {
            const isActive = (filter.category || "All") === cat;
            return (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className={cn(
                  "px-6 py-2.5 rounded-full text-xs font-black transition-all border flex items-center gap-2",
                  isActive
                    ? "bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-105"
                    : "bg-white text-slate-600 border-slate-100 hover:border-primary/30 hover:bg-slate-50",
                )}
              >
                {isActive && <Check className="w-3 h-3" />}
                {cat === "All" ? "SEMUA KATEGORI" : cat.toUpperCase()}
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
          {popularLocations.map((loc) => {
            const isActive = (filter.location || "All") === loc;
            return (
              <button
                key={loc}
                onClick={() => handleLocationClick(loc)}
                className={cn(
                  "px-6 py-2.5 rounded-full text-xs font-black transition-all border flex items-center gap-2",
                  isActive
                    ? "bg-slate-900 text-white border-slate-900 shadow-lg shadow-slate-900/20 scale-105"
                    : "bg-white text-slate-600 border-slate-100 hover:border-slate-900/30 hover:bg-slate-50",
                )}
              >
                {isActive && <Check className="w-3 h-3" />}
                {loc === "All" ? "SELURUH LOKASI" : loc.toUpperCase()}
              </button>
            );
          })}
        </div>
      </div>

      {/* Other Locations Dropdown */}
      <div className="space-y-3" ref={dropdownRef}>
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2 flex items-center gap-2">
          <MapPin className="w-3 h-3 text-slate-600" /> Lokasi Lainnya
        </label>
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full px-6 py-3 rounded-2xl text-sm font-bold bg-white text-slate-700 border-2 border-slate-200 hover:border-slate-300 transition-all flex items-center justify-between group"
          >
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
              {filter.location && !popularLocations.includes(filter.location)
                ? filter.location
                : "Pilih Kota Lainnya"}
            </span>
            <ChevronDown
              className={cn(
                "w-4 h-4 text-slate-400 transition-transform",
                isDropdownOpen && "rotate-180",
              )}
            />
          </button>

          {isDropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-3 bg-white/95 backdrop-blur-xl border border-slate-100 rounded-2xl shadow-3xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200 p-3">
              {/* Search Input */}
              <div className="mb-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Cari kota..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    autoFocus
                  />
                </div>
              </div>

              {/* Cities List */}
              <div className="max-h-[350px] overflow-y-auto scrollbar-hide py-1">
                {filteredCities.length > 0 ? (
                  <>
                    {filteredCities.map((city) => {
                      const isSelected = filter.location === city;
                      return (
                        <button
                          key={city}
                          type="button"
                          onClick={() => handleCitySelect(city)}
                          className={cn(
                            "w-full flex items-center justify-between px-4 py-3 rounded-xl text-left font-bold text-sm transition-all mb-1 last:mb-0",
                            isSelected
                              ? "bg-primary/10 text-primary shadow-sm"
                              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
                          )}
                        >
                          <span className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 opacity-50" />
                            {city}
                          </span>
                          {isSelected && <Check className="w-4 h-4" />}
                        </button>
                      );
                    })}
                  </>
                ) : (
                  <div className="px-4 py-8 text-center text-slate-400 text-sm font-semibold">
                    Kota tidak ditemukan
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
