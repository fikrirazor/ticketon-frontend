export interface Event {
  id: string;
  title: string;
  description: string;
  date: string; // ISO string for easier serialization
  location: string;
  price: number;
  seatsTotal: number;
  seatsLeft: number;
  category: string;
  organizer: string;
  imageUrl: string;
}

export type EventCategory = 'Music' | 'Technology' | 'Art' | 'Business' | 'Sports' | 'All';
