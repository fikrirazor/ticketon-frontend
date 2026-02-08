import { create } from "zustand";
import type { Transaction } from "../types";
import { transactionAPI, voucherAPI } from "../lib/api.service";

interface CreateTransactionData {
  eventId: string;
  pointsUsed?: number;
  voucherId?: string;
  items: { quantity: number }[];
}

interface TransactionState {
  transactions: Transaction[];
  currentTransaction: Transaction | null;
  isLoading: boolean;
  error: string | null;
  createTransaction: (data: CreateTransactionData) => Promise<Transaction>;
  getTransactionById: (id: string) => Promise<Transaction>;
  getUserTransactions: (
    page?: number,
    limit?: number,
  ) => Promise<Transaction[]>;
  uploadPaymentProof: (
    transactionId: string,
    file: File,
  ) => Promise<Transaction>;
  submitPaymentProofUrl: (
    transactionId: string,
    url: string,
  ) => Promise<Transaction>;
  cancelTransaction: (transactionId: string) => Promise<void>;
  pollTransactionStatus: (id: string) => Promise<void>;
  validateVoucher: (code: string, eventId: string) => Promise<unknown>;
  clearError: () => void;
}

export const useTransactionStore = create<TransactionState>((set) => ({
  transactions: [],
  currentTransaction: null,
  isLoading: false,
  error: null,

  createTransaction: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const transaction = await transactionAPI.createTransaction(data);
      set((state) => ({
        transactions: [transaction, ...state.transactions],
        currentTransaction: transaction,
        error: null,
      }));
      return transaction;
    } catch (err: unknown) {
      const errResponse = err as { response?: { data?: { message?: string } } };
      const errorMsg =
        errResponse.response?.data?.message || "Failed to create transaction";
      set({ error: errorMsg });
      throw err;
    } finally {
      set({ isLoading: false });
    }
  },

  getTransactionById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const transaction = await transactionAPI.getTransactionById(id);
      set({ currentTransaction: transaction, error: null });
      return transaction;
    } catch (err: unknown) {
      const errResponse = err as { response?: { data?: { message?: string } } };
      const errorMsg =
        errResponse.response?.data?.message || "Failed to fetch transaction";
      set({ error: errorMsg });
      throw err;
    } finally {
      set({ isLoading: false });
    }
  },

  getUserTransactions: async (page = 1, limit = 10) => {
    set({ isLoading: true, error: null });
    try {
      const result = await transactionAPI.getUserTransactions(page, limit);
      const transactions = Array.isArray(result)
        ? result
        : result.transactions || [];
      set({ transactions, error: null });
      return transactions;
    } catch (err: unknown) {
      const errResponse = err as { response?: { data?: { message?: string } } };
      const errorMsg =
        errResponse.response?.data?.message || "Failed to fetch transactions";
      set({ error: errorMsg });
      return [];
    } finally {
      set({ isLoading: false });
    }
  },

  uploadPaymentProof: async (transactionId, file) => {
    set({ isLoading: true, error: null });
    try {
      const updated = await transactionAPI.uploadPaymentProof(
        transactionId,
        file,
      );
      set((state) => ({
        currentTransaction:
          state.currentTransaction?.id === transactionId
            ? updated
            : state.currentTransaction,
        transactions: state.transactions.map((t) =>
          t.id === transactionId ? updated : t,
        ),
        error: null,
      }));
      return updated;
    } catch (err: unknown) {
      const errResponse = err as { response?: { data?: { message?: string } } };
      const errorMsg =
        errResponse.response?.data?.message || "Failed to upload payment proof";
      set({ error: errorMsg });
      throw err;
    } finally {
      set({ isLoading: false });
    }
  },

  submitPaymentProofUrl: async (transactionId, url) => {
    set({ isLoading: true, error: null });
    try {
      const updated = await transactionAPI.submitPaymentProofUrl(
        transactionId,
        url,
      );
      set((state) => ({
        currentTransaction:
          state.currentTransaction?.id === transactionId
            ? updated
            : state.currentTransaction,
        transactions: state.transactions.map((t) =>
          t.id === transactionId ? updated : t,
        ),
        error: null,
      }));
      return updated;
    } catch (err: unknown) {
      const errResponse = err as { response?: { data?: { message?: string } } };
      const errorMsg =
        errResponse.response?.data?.message || "Failed to submit payment URL";
      set({ error: errorMsg });
      throw err;
    } finally {
      set({ isLoading: false });
    }
  },

  cancelTransaction: async (transactionId) => {
    set({ isLoading: true, error: null });
    try {
      await transactionAPI.cancelTransaction(transactionId);
      set((state) => ({
        transactions: state.transactions.filter((t) => t.id !== transactionId),
        currentTransaction:
          state.currentTransaction?.id === transactionId
            ? null
            : state.currentTransaction,
        error: null,
      }));
    } catch (err: unknown) {
      const errResponse = err as { response?: { data?: { message?: string } } };
      const errorMsg =
        errResponse.response?.data?.message || "Failed to cancel transaction";
      set({ error: errorMsg });
      throw err;
    } finally {
      set({ isLoading: false });
    }
  },

  pollTransactionStatus: async (id) => {
    try {
      const transaction = await transactionAPI.getTransactionById(id);
      set((state) => ({
        currentTransaction:
          state.currentTransaction?.id === id
            ? transaction
            : state.currentTransaction,
        transactions: state.transactions.map((t) =>
          t.id === id ? transaction : t,
        ),
      }));
    } catch {
      // Ignore polling errors
    }
  },

  validateVoucher: async (code, eventId) => {
    try {
      return await voucherAPI.validateVoucher(code, eventId);
    } catch (err: unknown) {
      const errResponse = err as { response?: { data?: { message?: string } } };
      const errorMsg = errResponse.response?.data?.message || "Invalid voucher";
      set({ error: errorMsg });
      throw err;
    }
  },

  clearError: () => set({ error: null }),
}));

export default useTransactionStore;
