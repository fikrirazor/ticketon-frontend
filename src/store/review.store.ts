import { create } from 'zustand';
import type { Review, Organizer } from '../types';
import { MOCK_REVIEWS, MOCK_ORGANIZERS } from '../utils/mockData';

interface ReviewState {
  reviews: Review[];
  organizers: Organizer[];
  addReview: (review: Omit<Review, 'id' | 'createdAt'>) => void;
  getReviewsByEventId: (eventId: string) => Review[];
  getReviewsByOrganizerName: (organizerName: string, events: any[]) => Review[];
  getOrganizerByName: (name: string) => Organizer | undefined;
  getAverageRatingForEvent: (eventId: string) => number;
}

export const useReviewStore = create<ReviewState>((set, get) => ({
  reviews: MOCK_REVIEWS,
  organizers: MOCK_ORGANIZERS,
  
  addReview: (reviewData) => {
    const newReview: Review = {
      ...reviewData,
      id: `r${get().reviews.length + 1}`,
      createdAt: new Date().toISOString(),
    };
    set((state) => ({ reviews: [newReview, ...state.reviews] }));
  },

  getReviewsByEventId: (eventId) => {
    return get().reviews.filter((review) => review.eventId === eventId);
  },

  getReviewsByOrganizerName: (organizerName, events) => {
    const organizerEvents = events.filter(e => e.organizer === organizerName);
    const eventIds = organizerEvents.map(e => e.id);
    return get().reviews.filter(review => eventIds.includes(review.eventId));
  },

  getOrganizerByName: (name) => {
    return get().organizers.find(org => org.name === name);
  },

  getAverageRatingForEvent: (eventId) => {
    const eventReviews = get().reviews.filter(r => r.eventId === eventId);
    if (eventReviews.length === 0) return 0;
    const sum = eventReviews.reduce((acc, curr) => acc + curr.rating, 0);
    return Number((sum / eventReviews.length).toFixed(1));
  }
}));
