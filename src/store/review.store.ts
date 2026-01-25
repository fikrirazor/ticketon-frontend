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
      await axiosInstance.post('/reviews', reviewData);
      await get().fetchReviewsByEventId(reviewData.eventId);
    } finally {
      set({ isLoading: false });
    }
  },

  fetchReviewsByEventId: async (eventId) => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.get(`/reviews/events/${eventId}`);
      set({ reviews: response.data });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchReviewsByOrganizerId: async (organizerId) => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.get(`/reviews/organizers/${organizerId}`);
      set({ reviews: response.data });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchOrganizerByName: async (name) => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.get(`/organizers/name/${encodeURIComponent(name)}`);
      set((state) => ({ 
        organizers: [...state.organizers.filter(org => org.name !== name), response.data] 
      }));
      return response.data;
    } catch {
      return undefined;
    } finally {
      set({ isLoading: false });
    }
  },

  getAverageRatingForEvent: (eventId) => {
    const eventReviews = get().reviews.filter(r => r.eventId === eventId);
    if (eventReviews.length === 0) return 0;
    const sum = eventReviews.reduce((acc, curr) => acc + curr.rating, 0);
    return Number((sum / eventReviews.length).toFixed(1));
  }
}));
