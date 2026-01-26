import { create } from 'zustand';
import type { Review, Organizer } from '../types';
import axiosInstance from '../lib/axiosInstance';

interface ReviewState {
  reviews: Review[];
  organizers: Organizer[];
  isLoading: boolean;
  addReview: (reviewData: { eventId: string; rating: number; comment?: string }) => Promise<void>;
  fetchReviewsByEventId: (eventId: string) => Promise<void>;
  fetchReviewsByOrganizerId: (organizerId: string) => Promise<void>;
  fetchOrganizerByName: (name: string) => Promise<Organizer | undefined>;
  getAverageRatingForEvent: (eventId: string) => number;
}

export const useReviewStore = create<ReviewState>((set, get) => ({
  reviews: [],
  organizers: [],
  isLoading: false,
  
  addReview: async (reviewData) => {
    set({ isLoading: true });
    try {
      await axiosInstance.post(`/reviews/events/${reviewData.eventId}`, {
        rating: reviewData.rating,
        comment: reviewData.comment
      });
      await get().fetchReviewsByEventId(reviewData.eventId);
    } catch (error) {
      console.error('Failed to add review:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  fetchReviewsByEventId: async (eventId) => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.get(`/reviews/events/${eventId}`);
      const reviewsData = Array.isArray(response.data) ? response.data : response.data?.data || [];
      set({ reviews: Array.isArray(reviewsData) ? reviewsData : [] });
    } catch (error) {
      console.error('Failed to fetch event reviews:', error);
      set({ reviews: [] });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchReviewsByOrganizerId: async (organizerId) => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.get(`/reviews/organizers/${organizerId}`);
      const reviewsData = Array.isArray(response.data) ? response.data : response.data?.data || [];
      set({ reviews: Array.isArray(reviewsData) ? reviewsData : [] });
    } catch (error) {
      console.error('Failed to fetch organizer reviews:', error);
      set({ reviews: [] });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchOrganizerByName: async () => {
    // TODO: Endpoint /organizers/name/:name tidak ada di routing table
    // Perlu implementasi di backend atau gunakan alternative API
    console.warn('fetchOrganizerByName: Endpoint /organizers/name/:name belum tersedia');
    return undefined;
  },

  getAverageRatingForEvent: (eventId) => {
    const reviews = get().reviews;
    if (!Array.isArray(reviews)) return 0;
    
    const eventReviews = reviews.filter(r => r.eventId === eventId);
    if (eventReviews.length === 0) return 0;
    const sum = eventReviews.reduce((acc, curr) => acc + curr.rating, 0);
    return Number((sum / eventReviews.length).toFixed(1));
  }
}));
