import { create } from 'zustand';
import type { Event } from '../types';
import { MOCK_EVENTS } from '../utils/mockData';

interface EventState {
  events: Event[];
  filteredEvents: Event[];
  isLoading: boolean;
  filter: {
    category: string;
    location: string;
    search: string;
  };
  setSearch: (search: string) => void;
  setCategory: (category: string) => void;
  setLocation: (location: string) => void;
  getEventById: (id: string) => Event | undefined;
  updateEventPrice: (id: string, newPrice: number) => void;
  applyFilters: () => void;
}

export const useEventStore = create<EventState>((set, get) => ({
  events: MOCK_EVENTS,
  filteredEvents: MOCK_EVENTS,
  isLoading: false,
  filter: {
    category: 'All',
    location: 'All',
    search: '',
  },
  setSearch: (search) => {
    set((state) => ({ filter: { ...state.filter, search } }));
    get().applyFilters();
  },
  setCategory: (category) => {
    set((state) => ({ filter: { ...state.filter, category } }));
    get().applyFilters();
  },
  setLocation: (location) => {
    set((state) => ({ filter: { ...state.filter, location } }));
    get().applyFilters();
  },
  getEventById: (id) => {
    return get().events.find((event) => event.id === id);
  },
  updateEventPrice: (id, newPrice) => {
    set((state) => ({
      events: state.events.map((event) =>
        event.id === id ? { ...event, price: newPrice } : event
      ),
    }));
    get().applyFilters(); // Re-apply filters to update filteredEvents list if needed
  },
  applyFilters: () => {
    const { events, filter } = get();
    let result = events;

    if (filter.search) {
      const searchLower = filter.search.toLowerCase();
      result = result.filter(
        (event) =>
          event.title.toLowerCase().includes(searchLower) ||
          event.description.toLowerCase().includes(searchLower) ||
          event.organizer.toLowerCase().includes(searchLower)
      );
    }

    if (filter.category !== 'All') {
      result = result.filter((event) => event.category === filter.category);
    }

    if (filter.location !== 'All') {
      result = result.filter((event) => event.location === filter.location);
    }

    set({ filteredEvents: result });
  },
}));
