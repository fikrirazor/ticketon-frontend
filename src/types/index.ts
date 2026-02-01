export interface Event {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  address: string;
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
  voucherId?: string;
  pointsUsed: number;
  totalPrice: number;
  finalPrice: number;
  status: TransactionStatus;
  expiresAt: string;
  paymentProofUrl?: string;
  createdAt: string;
  updatedAt: string;
  items?: Array<{
    id: string;
    transactionId: string;
    quantity: number;
    price: number;
  }>;
  event?: Event;
  voucher?: Voucher;
  user?: {
    id: string;
    name: string;
    email: string;
  };
}

export interface Voucher {
  id?: string;
  code: string;
  discountAmount?: number;
  discountPercent?: number;
  maxUsage?: number;
  usedCount?: number;
  startDate?: string;
  endDate?: string;
  eventId?: string;
  createdAt?: string;
  updatedAt?: string;
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
