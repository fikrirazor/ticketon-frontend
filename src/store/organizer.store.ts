import { create } from 'zustand';
import axiosInstance from '../lib/axiosInstance';

interface OrganizerStats {
    totalEvents: number;
    activeEvents: number;
    totalRevenue: number;
    totalTicketsSold: number;
}

interface OrganizerStore {
    stats: OrganizerStats | null;
    events: any[];
    transactions: any[];
    isLoading: boolean;
    error: string | null;
    fetchStats: () => Promise<void>;
    fetchEvents: () => Promise<void>;
    fetchTransactions: () => Promise<void>;
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
            const response = await axiosInstance.get('/organizer/stats');
            set({ stats: response.data.data });
        } catch (error: any) {
            set({ error: error.response?.data?.message || 'Failed to fetch stats' });
        } finally {
            set({ isLoading: false });
        }
    },

    fetchEvents: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.get('/organizer/events');
            set({ events: response.data.data });
        } catch (error: any) {
            set({ error: error.response?.data?.message || 'Failed to fetch events' });
        } finally {
            set({ isLoading: false });
        }
    },

    fetchTransactions: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.get('/organizer/transactions');
            set({ transactions: response.data.data });
        } catch (error: any) {
            set({ error: error.response?.data?.message || 'Failed to fetch transactions' });
        } finally {
            set({ isLoading: false });
        }
    },
}));
