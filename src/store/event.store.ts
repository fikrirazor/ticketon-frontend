import { create } from "zustand";
import type { Event } from "../types";
import { eventAPI, voucherAPI } from "../lib/api.service";

interface EventState {
  events: Event[];
  currentEvent: Event | null;
  isLoading: boolean;
  error: string | null;
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
  createEvent: (
    eventData: FormData | Record<string, unknown>,
  ) => Promise<Event>;
  updateEvent: (
    id: string,
    eventData: FormData | Partial<Event>,
  ) => Promise<Event>;
  deleteEvent: (id: string) => Promise<void>;
  createVoucher: (
    eventId: string,
    voucherData: {
      code: string;
      discountAmount?: number;
      discountPercent?: number;
      maxUsage: number;
      startDate: string;
      endDate: string;
    },
  ) => Promise<void>;
  clearError: () => void;
}

export const useEventStore = create<EventState>((set, get) => ({
  events: [],
  currentEvent: null,
  isLoading: false,
  error: null,
  filter: {
    category: "",
    location: "",
    search: "",
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
    set({ isLoading: true, error: null });
    try {
      const { filter } = get();
      const result = await eventAPI.getAllEvents({
        search: filter.search || undefined,
        category:
          filter.category && filter.category !== "All"
            ? filter.category
            : undefined,
        location:
          filter.location && filter.location !== "All"
            ? filter.location
            : undefined,
        page: filter.page,
        limit: filter.limit,
      });

      set({
        events: result.events || [],
        pagination: result.pagination || { total: 0, totalPages: 0 },
        error: null,
      });
    } catch (err: unknown) {
      console.error("Failed to fetch events:", err);
      const errResponse = err as { response?: { data?: { message?: string } } };
      set({
        events: [],
        pagination: { total: 0, totalPages: 0 },
        error: errResponse.response?.data?.message || "Failed to fetch events",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  getEventById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const event = await eventAPI.getEventById(id);
      set({ currentEvent: event, error: null });
      return event;
    } catch (err: unknown) {
      const errResponse = err as { response?: { data?: { message?: string } } };
      set({
        error: errResponse.response?.data?.message || "Failed to fetch event",
      });
      return undefined;
    } finally {
      set({ isLoading: false });
    }
  },

  createEvent: async (eventData) => {
    set({ isLoading: true, error: null });
    try {
      const newEvent = await eventAPI.createEvent(eventData);
      set((state) => ({
        events: [newEvent, ...state.events],
        error: null,
      }));
      return newEvent;
    } catch (err: unknown) {
      const errResponse = err as { response?: { data?: { message?: string } } };
      const errorMsg =
        errResponse.response?.data?.message || "Failed to create event";
      set({ error: errorMsg });
      throw err;
    } finally {
      set({ isLoading: false });
    }
  },

  updateEvent: async (id, eventData) => {
    set({ isLoading: true, error: null });
    try {
      const updatedEvent = await eventAPI.updateEvent(id, eventData);
      set((state) => ({
        events: state.events.map((event) =>
          event.id === id ? updatedEvent : event,
        ),
        currentEvent:
          state.currentEvent?.id === id ? updatedEvent : state.currentEvent,
        error: null,
      }));
      return updatedEvent;
    } catch (err: unknown) {
      const errResponse = err as { response?: { data?: { message?: string } } };
      const errorMsg =
        errResponse.response?.data?.message || "Failed to update event";
      set({ error: errorMsg });
      throw err;
    } finally {
      set({ isLoading: false });
    }
  },

  deleteEvent: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await eventAPI.deleteEvent(id);
      set((state) => ({
        events: state.events.filter((event) => event.id !== id),
        error: null,
      }));
    } catch (err: unknown) {
      const errResponse = err as { response?: { data?: { message?: string } } };
      const errorMsg =
        errResponse.response?.data?.message || "Failed to delete event";
      set({ error: errorMsg });
      throw err;
    } finally {
      set({ isLoading: false });
    }
  },

  createVoucher: async (eventId, voucherData) => {
    set({ isLoading: true, error: null });
    try {
      await voucherAPI.createVoucher(eventId, voucherData);
      set({ error: null });
    } catch (err: unknown) {
      const errorMsg =
        err instanceof Error ? err.message : "Failed to create voucher";
      set({ error: errorMsg });
      throw err;
    } finally {
      set({ isLoading: false });
    }
  },

  clearError: () => set({ error: null }),
}));

export default useEventStore;
