import { create } from 'zustand';
import type { Transaction } from '../types';
import axiosInstance from '../lib/axiosInstance';

interface CreateTransactionData {
  eventId: string;
  pointsUsed: number;
  voucherId?: string;
  items: { quantity: number }[];
}

interface TransactionState {
  currentTransaction: Transaction | null;
  isLoading: boolean;
  createTransaction: (data: CreateTransactionData) => Promise<Transaction>;
  getTransactionById: (id: string) => Promise<Transaction>;
  uploadPaymentProof: (transactionId: string, file: File) => Promise<void>;
  pollTransactionStatus: (id: string) => Promise<void>;
  validateVoucher: (code: string, eventId: string) => Promise<{
    valid: boolean;
    voucher: {
      id: string;
      code: string;
      discountAmount?: number;
      discountPercent?: number;
      eventId: string;
      eventName: string;
    };
  }>;
}

export const useTransactionStore = create<TransactionState>((set) => ({
  currentTransaction: null,
  isLoading: false,

  createTransaction: async (data) => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.post('/transactions', data);
      set({ currentTransaction: response.data.data });
      return response.data.data;
    } finally {
      set({ isLoading: false });
    }
  },

  getTransactionById: async (id) => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.get(`/transactions/${id}`);
      set({ currentTransaction: response.data.data });
      return response.data.data;
    } finally {
      set({ isLoading: false });
    }
  },

  uploadPaymentProof: async (transactionId, file) => {
    set({ isLoading: true });
    try {
      const formData = new FormData();
      formData.append('paymentProof', file);
      await axiosInstance.post(`/transactions/${transactionId}/payment-proof`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      // Optionally refresh transaction status
    } finally {
      set({ isLoading: false });
    }
  },

  pollTransactionStatus: async (id) => {
    // Basic polling logic (could be improved with a timer)
    try {
      const response = await axiosInstance.get(`/transactions/${id}`);
      const updatedTransaction = response.data.data;
      set((state) => ({
        currentTransaction: state.currentTransaction?.id === id 
          ? updatedTransaction
          : state.currentTransaction
      }));
    } catch {
      // Ignore polling errors
    }
  },

  validateVoucher: async (code, eventId) => {
    const response = await axiosInstance.get(`/vouchers/${code}/validate?eventId=${eventId}`);
    return response.data.data;
  },
}));
