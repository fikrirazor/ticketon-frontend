import axiosInstance from './axiosInstance';
import type { Event, Transaction, Review } from '../types';

/**
 * EVENTS API SERVICES
 */
export const eventAPI = {
  /**
   * Get all events with pagination and filtering
   */
  getAllEvents: async (params: {
    category?: string;
    location?: string;
    search?: string;
    page?: number;
    limit?: number;
  }) => {
    const response = await axiosInstance.get('/events', { params });
    return {
      events: response.data.data,
      pagination: response.data.pagination
    };
  },

  /**
   * Get single event by ID
   */
  getEventById: async (eventId: string): Promise<Event> => {
    const response = await axiosInstance.get(`/events/${eventId}`);
    return response.data.data;
  },

  /**
   * Create new event (Organizer only)
   */
  createEvent: async (eventData: FormData): Promise<Event> => {
    const response = await axiosInstance.post('/events', eventData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data.data;
  },

  /**
   * Update event (Organizer must own the event)
   */
  updateEvent: async (eventId: string, eventData: Partial<Event>) => {
    const response = await axiosInstance.put(`/events/${eventId}`, eventData);
    return response.data.data;
  },

  /**
   * Delete event (soft delete)
   */
  deleteEvent: async (eventId: string) => {
    const response = await axiosInstance.delete(`/events/${eventId}`);
    return response.data;
  },
};

/**
 * TRANSACTIONS API SERVICES
 */
export const transactionAPI = {
  /**
   * Create new transaction
   */
  createTransaction: async (data: {
    eventId: string;
    voucherId?: string;
    pointsUsed?: number;
    items: { quantity: number }[];
  }): Promise<Transaction> => {
    const response = await axiosInstance.post('/transactions', data);
    return response.data.data;
  },

  /**
   * Get all user transactions (authenticated)
   */
  getUserTransactions: async (page: number = 1, limit: number = 10) => {
    const response = await axiosInstance.get('/transactions/me', {
      params: { page, limit },
    });
    return response.data.data;
  },

  /**
   * Get transaction by ID
   */
  getTransactionById: async (transactionId: string): Promise<Transaction> => {
    const response = await axiosInstance.get(`/transactions/${transactionId}`);
    return response.data.data;
  },

  /**
   * Upload payment proof for transaction
   */
  uploadPaymentProof: async (
    transactionId: string,
    file: File
  ): Promise<Transaction> => {
    const formData = new FormData();
    formData.append('paymentProof', file);
    const response = await axiosInstance.post(
      `/transactions/${transactionId}/payment-proof`,
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );
    return response.data.data;
  },

  /**
   * Cancel transaction
   */
  cancelTransaction: async (transactionId: string) => {
    const response = await axiosInstance.put(
      `/transactions/${transactionId}/cancel`
    );
    return response.data;
  },
};

/**
 * VOUCHERS API SERVICES
 */
export const voucherAPI = {
  /**
   * Create voucher for an event (Organizer must own the event)
   */
  createVoucher: async (
    eventId: string,
    voucherData: {
      code: string;
      discountAmount?: number;
      discountPercent?: number;
      maxUsage: number;
      startDate: string;
      endDate: string;
    }
  ) => {
    const response = await axiosInstance.post(
      `/events/${eventId}/vouchers`,
      voucherData
    );
    return response.data.data;
  },

  /**
   * Validate voucher code
   */
  validateVoucher: async (code: string, eventId: string) => {
    const response = await axiosInstance.get(`/vouchers/${code}/validate`, {
      params: { eventId },
    });
    return response.data.data;
  },
};

/**
 * REVIEWS API SERVICES
 */
export const reviewAPI = {
  /**
   * Get reviews for an event
   */
  getEventReviews: async (eventId: string, page: number = 1, limit: number = 10) => {
    const response = await axiosInstance.get(`/reviews/events/${eventId}`, {
      params: { page, limit },
    });
    return response.data.data;
  },

  /**
   * Create review for an event
   */
  createReview: async (eventId: string, data: {
    rating: number;
    comment: string;
  }): Promise<Review> => {
    const response = await axiosInstance.post(`/reviews/events/${eventId}`, data);
    return response.data.data;
  },

  /**
   * Update review
   */
  updateReview: async (
    reviewId: string,
    data: { rating?: number; comment?: string }
  ): Promise<Review> => {
    const response = await axiosInstance.put(`/reviews/${reviewId}`, data);
    return response.data.data;
  },

  /**
   * Delete review
   */
  deleteReview: async (reviewId: string) => {
    const response = await axiosInstance.delete(`/reviews/${reviewId}`);
    return response.data;
  },

  /**
   * Get eligible events for review (events user has attended)
   */
  getEligibleEventsForReview: async () => {
    const response = await axiosInstance.get('/reviews/me/eligible');
    return response.data.data;
  },
};
