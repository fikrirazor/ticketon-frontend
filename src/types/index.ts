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

export type TransactionStatus =
  | 'WAITING_FOR_PAYMENT'
  | 'WAITING_FOR_ADMIN_CONFIRMATION'
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
  pointsUsed: number;
  voucherCode?: string;
  status: TransactionStatus;
  createdAt: string;
  expiresAt: string;
  paymentProofUrl?: string;
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
