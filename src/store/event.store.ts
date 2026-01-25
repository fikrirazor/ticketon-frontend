import { create } from 'zustand';
import type { Event } from '../types';
import axiosInstance from '../lib/axiosInstance';

interface EventState {
  events: Event[];
  isLoading: boolean;
  filter: {
    category: string;
    location: string;
    search: string;
    page: number;
    limit: number;
  };
  pagination: {
    total: number;
    totalPages: number;
  };
  setSearch: (search: string) => void;
  setCategory: (category: string) => void;
  setLocation: (location: string) => void;
  setPage: (page: number) => void;
  fetchEvents: () => Promise<void>;
  getEventById: (id: string) => Promise<Event | undefined>;
  createEvent: (eventData: FormData) => Promise<Event>;
  createVoucher: (eventId: string, voucherData: any) => Promise<void>;
  updateEventPrice: (id: string, newPrice: number) => Promise<void>;
}

export const useEventStore = create<EventState>((set, get) => ({
  events: [],
  isLoading: false,
  filter: {
    category: 'All',
    location: 'All',
    search: '',
    page: 1,
    limit: 10,
  },
  pagination: {
    total: 0,
    totalPages: 0,
  },

  setSearch: (search) => {
    set((state) => ({ filter: { ...state.filter, search, page: 1 } }));
    get().fetchEvents();
  },

  setCategory: (category) => {
    set((state) => ({ filter: { ...state.filter, category, page: 1 } }));
    get().fetchEvents();
  },

  setLocation: (location) => {
    set((state) => ({ filter: { ...state.filter, location, page: 1 } }));
    get().fetchEvents();
  },

  setPage: (page) => {
    set((state) => ({ filter: { ...state.filter, page } }));
    get().fetchEvents();
  },

  fetchEvents: async () => {
    set({ isLoading: true });
    try {
      const { filter } = get();
      const params = new URLSearchParams();
      if (filter.search) params.append('search', filter.search);
      if (filter.category !== 'All') params.append('category', filter.category);
      if (filter.location !== 'All') params.append('location', filter.location);
      params.append('page', filter.page.toString());
      params.append('limit', filter.limit.toString());

      const response = await axiosInstance.get(`/events?${params.toString()}`);
      const { data, pagination } = response.data;
      
      set({ 
        events: data || [], 
        pagination: {
          total: pagination?.total || 0,
          totalPages: pagination?.totalPages || 0,
        }
      });
    } catch (err) {
      console.error('Failed to fetch events:', err);
      set({ events: [], pagination: { total: 0, totalPages: 0 } });
    } finally {
      set({ isLoading: false });
    }
  },

  getEventById: async (id) => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.get(`/events/${id}`);
      return response.data.data;
    } catch {
      return undefined;
    } finally {
      set({ isLoading: false });
    }
  },

  createEvent: async (eventData) => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.post('/events', eventData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      await get().fetchEvents();
      return response.data.data;
    } finally {
      set({ isLoading: false });
    }
  },

  createVoucher: async (eventId, voucherData) => {
    set({ isLoading: true });
    try {
      await axiosInstance.post(`/events/${eventId}/vouchers`, voucherData);
    } finally {
      set({ isLoading: false });
    }
  },

  updateEventPrice: async (id, newPrice) => {
    set({ isLoading: true });
    try {
      await axiosInstance.put(`/events/${id}`, { price: newPrice });
      await get().fetchEvents();
    } finally {
      set({ isLoading: false });
    }
  },
}));
