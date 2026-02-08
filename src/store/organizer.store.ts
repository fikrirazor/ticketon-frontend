import { create } from "zustand";
import axiosInstance from "../lib/axiosInstance";
import type { Event, Transaction } from "../types";

interface OrganizerStats {
  totalEvents: number;
  activeEvents: number;
  totalRevenue: number;
  totalTicketsSold: number;
}

interface OrganizerStore {
  stats: OrganizerStats | null;
  events: Event[];
  transactions: Transaction[];
  isLoading: boolean;
  error: string | null;
  fetchStats: () => Promise<void>;
  fetchEvents: () => Promise<void>;
  fetchTransactions: () => Promise<void>;
  deleteEvent: (id: string) => Promise<void>;
  approveTransaction: (id: string) => Promise<void>;
  rejectTransaction: (id: string) => Promise<void>;
}

export const useOrganizerStore = create<OrganizerStore>((set) => ({
  stats: null,
  events: [],
  transactions: [],
  isLoading: false,
  error: null,

  fetchStats: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/organizer/stats");
      set({ stats: response.data.data });
    } catch (error: unknown) {
      const errResponse = error as {
        response?: { data?: { message?: string } };
      };
      set({
        error: errResponse.response?.data?.message || "Failed to fetch stats",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchEvents: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/organizer/events");
      set({ events: response.data.data });
    } catch (error: unknown) {
      const errResponse = error as {
        response?: { data?: { message?: string } };
      };
      set({
        error: errResponse.response?.data?.message || "Failed to fetch events",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchTransactions: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/organizer/transactions");
      set({ transactions: response.data.data || [] });
    } catch (error: unknown) {
      const errResponse = error as {
        response?: { data?: { message?: string } };
      };
      set({
        error:
          errResponse.response?.data?.message || "Failed to fetch transactions",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  deleteEvent: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      await axiosInstance.delete(`/events/${id}`);
      set((state) => ({
        events: state.events.filter((event) => event.id !== id),
        error: null,
      }));
    } catch (error: unknown) {
      const errResponse = error as {
        response?: { data?: { message?: string } };
      };
      set({
        error: errResponse.response?.data?.message || "Failed to delete event",
      });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  approveTransaction: async (id: string) => {
    if (!window.confirm("Apakah Anda yakin ingin menyetujui (APPROVE) transaksi ini?")) return;
    
    set({ isLoading: true, error: null });
    try {
      await axiosInstance.patch(`/transactions/${id}/approve`);
      set((state) => ({
        transactions: state.transactions.map((t) =>
          t.id === id ? { ...t, status: "DONE" } : t,
        ),
      }));
    } catch (error) {
      const errResponse = error as { response?: { data?: { message?: string } } };
      set({ error: errResponse.response?.data?.message || "Failed to approve transaction" });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  rejectTransaction: async (id: string) => {
    if (!window.confirm("Apakah Anda yakin ingin menolak (REJECT) transaksi ini?")) return;

    set({ isLoading: true, error: null });
    try {
      await axiosInstance.patch(`/transactions/${id}/reject`);
      set((state) => ({
        transactions: state.transactions.map((t) =>
          t.id === id ? { ...t, status: "REJECTED" } : t,
        ),
      }));
    } catch (error) {
      const errResponse = error as { response?: { data?: { message?: string } } };
      set({ error: errResponse.response?.data?.message || "Failed to reject transaction" });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
}));
