import { create } from "zustand";
import type { Review } from "../types";
import { reviewAPI } from "../lib/api.service";

interface ReviewState {
  reviews: Review[];
  isLoading: boolean;
  error: string | null;
  addReview: (reviewData: {
    eventId: string;
    rating: number;
    comment: string;
  }) => Promise<Review>;
  fetchReviewsByEventId: (
    eventId: string,
    page?: number,
    limit?: number,
  ) => Promise<void>;
  updateReview: (
    reviewId: string,
    data: { rating?: number; comment?: string },
  ) => Promise<Review>;
  deleteReview: (reviewId: string) => Promise<void>;
  getEligibleEventsForReview: () => Promise<unknown>;
  getAverageRatingForEvent: (eventId: string) => number;
  clearError: () => void;
}

export const useReviewStore = create<ReviewState>((set, get) => ({
  reviews: [],
  isLoading: false,
  error: null,

  addReview: async (reviewData) => {
    set({ isLoading: true, error: null });
    try {
      const review = await reviewAPI.createReview(reviewData.eventId, {
        rating: reviewData.rating,
        comment: reviewData.comment,
      });
      set((state) => ({
        reviews: [review, ...state.reviews],
        error: null,
      }));
      return review;
    } catch (err: unknown) {
      const errResponse = err as { response?: { data?: { message?: string } } };
      const errorMsg =
        errResponse.response?.data?.message || "Failed to add review";
      set({ error: errorMsg });
      throw err;
    } finally {
      set({ isLoading: false });
    }
  },

  fetchReviewsByEventId: async (eventId, page = 1, limit = 10) => {
    set({ isLoading: true, error: null });
    try {
      const result = await reviewAPI.getEventReviews(eventId, page, limit);
      const reviews = result.reviews || [];
      set({ reviews, error: null });
    } catch (err: unknown) {
      console.error("Failed to fetch event reviews:", err);
      const errResponse = err as { response?: { data?: { message?: string } } };
      const errorMsg =
        errResponse.response?.data?.message || "Failed to fetch reviews";
      set({ error: errorMsg, reviews: [] });
    } finally {
      set({ isLoading: false });
    }
  },

  updateReview: async (reviewId, data) => {
    set({ isLoading: true, error: null });
    try {
      const updated = await reviewAPI.updateReview(reviewId, data);
      set((state) => ({
        reviews: state.reviews.map((r) => (r.id === reviewId ? updated : r)),
        error: null,
      }));
      return updated;
    } catch (err: unknown) {
      const errResponse = err as { response?: { data?: { message?: string } } };
      const errorMsg =
        errResponse.response?.data?.message || "Failed to update review";
      set({ error: errorMsg });
      throw err;
    } finally {
      set({ isLoading: false });
    }
  },

  deleteReview: async (reviewId) => {
    set({ isLoading: true, error: null });
    try {
      await reviewAPI.deleteReview(reviewId);
      set((state) => ({
        reviews: state.reviews.filter((r) => r.id !== reviewId),
        error: null,
      }));
    } catch (err: unknown) {
      const errResponse = err as { response?: { data?: { message?: string } } };
      const errorMsg =
        errResponse.response?.data?.message || "Failed to delete review";
      set({ error: errorMsg });
      throw err;
    } finally {
      set({ isLoading: false });
    }
  },

  getEligibleEventsForReview: async () => {
    try {
      return await reviewAPI.getEligibleEventsForReview();
    } catch (err: unknown) {
      const errResponse = err as { response?: { data?: { message?: string } } };
      const errorMsg =
        errResponse.response?.data?.message ||
        "Failed to fetch eligible events";
      set({ error: errorMsg });
      throw err;
    }
  },

  getAverageRatingForEvent: (eventId) => {
    const reviews = get().reviews;
    const eventReviews = reviews.filter((r) => r.eventId === eventId);
    if (eventReviews.length === 0) return 0;
    const sum = eventReviews.reduce((acc, curr) => acc + curr.rating, 0);
    return Number((sum / eventReviews.length).toFixed(1));
  },

  clearError: () => set({ error: null }),
}));

export default useReviewStore;
