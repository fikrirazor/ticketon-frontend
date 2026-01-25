export interface Event {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  price: number;
  seatTotal: number;
  seatLeft: number;
  category: string;
  organizer: {
    id: string;
    name: string;
    email: string;
  };
  imageUrl: string;
  isPromoted?: boolean;
}

export type EventCategory = 'Music' | 'Technology' | 'Art' | 'Business' | 'Sports' | 'All';

export type TransactionStatus =
  | 'WAITING_PAYMENT'
  | 'WAITING_ADMIN'
  | 'DONE'
  | 'REJECTED'
  | 'EXPIRED'
  | 'CANCELED';

export interface Transaction {
  id: string;
  eventId: string;
  userId: string;
  quantity: number;
  totalPrice: number;
  finalPrice: number;
  pointsUsed: number;
  voucherId?: string;
  status: TransactionStatus;
  createdAt: string;
  expiresAt: string;
  paymentProofUrl?: string;
  event?: Event;
}

export interface Voucher {
  code: string;
  discountAmount: number;
  discountType: 'percentage' | 'fixed';
  expiryDate: string;
}

export interface UserPoints {
  total: number;
}

export interface Review {
  id: string;
  eventId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment?: string;
  createdAt: string;
}

export interface Organizer {
  id: string;
  name: string;
  bio: string;
  avatarUrl?: string;
  totalEvents: number;
  averageRating: number;
  totalReviews: number;
}
