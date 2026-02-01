import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { Button } from '../components/ui/button';
import TransactionStatus from '../components/transactions/TransactionStatus';
import PriceSummary from '../components/transactions/PriceSummary';
import { ReviewForm } from '../components/reviews/ReviewForm';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { useTransactionStore } from '../store/transaction.store';
import { useEventStore } from '../store/event.store';
import { useAuthStore } from '../store/auth.store';
import { getErrorMessage } from '../lib/axiosInstance';
import type { Transaction, Event } from '../types';

const TransactionDetailPage: React.FC = () => {
  const { transactionId } = useParams<{ transactionId: string }>();
  const navigate = useNavigate();
  const { getTransactionById, pollTransactionStatus, isLoading: isTxLoading } = useTransactionStore();
  const { getEventById, isLoading: isEvLoading } = useEventStore();
  const { user } = useAuthStore();
  const [transaction, setTransaction] = React.useState<Transaction | null>(null);
  const [event, setEvent] = React.useState<Event | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const loadTransaction = async () => {
      if (!transactionId) return;
      try {
        const tx = await getTransactionById(transactionId);
        setTransaction(tx);
        
        if (tx && tx.eventId) {
            const ev = await getEventById(tx.eventId);
            if (ev) {
              setEvent(ev);
            } else {
              console.warn('Event not found for eventId:', tx.eventId);
            }
        }
      } catch (err) {
        console.error('Error loading transaction:', err);
        setError(getErrorMessage(err));
      }
    };
    loadTransaction();

    // Polling for status updates
    let interval: ReturnType<typeof setInterval> | undefined;
    if (transactionId && transaction?.status === 'WAITING_ADMIN') {
      interval = setInterval(() => {
        pollTransactionStatus(transactionId).then(() => {
            const currentTx = useTransactionStore.getState().currentTransaction;
            if (currentTx) setTransaction(currentTx);
        });
      }, 5000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [transactionId, getTransactionById, pollTransactionStatus, transaction?.status, getEventById, user]);

  const isLoading = isTxLoading || isEvLoading;

  if (isLoading && !transaction) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-gray-500 font-medium">Loading transaction details...</p>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
          <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
          <h2 className="text-2xl font-black text-slate-900 uppercase">Oops! Something went wrong</h2>
          <p className="text-slate-500 font-medium mt-2 max-w-md">{error}</p>
          <Button onClick={() => navigate('/')} className="mt-8">Back to Home</Button>
        </div>
      </Layout>
    );
  }

  if (!transaction) return null;

  const handleAction = (action: string) => {
    if (action === 'UPLOAD_PROOF') {
      navigate(`/payment-proof/${transaction.id}`);
    } else if (action === 'RETRY') {
      navigate('/checkout');
    }
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Status Column */}
          <div className="lg:col-span-2 space-y-8">
            <header>
              <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight mb-2">Transaction Details</h1>
              <p className="text-slate-500 font-medium">Tracking your ticket reservation</p>
            </header>

            <TransactionStatus 
              status={transaction.status} 
              transactionId={transaction.id}
              onAction={handleAction}
            />

            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
              <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight border-b pb-4">Booking Items</h3>
              <div className="flex items-center space-x-6">
                <div className="w-24 h-24 rounded-2xl overflow-hidden border border-slate-200">
                  <img src={event?.imageUrl} alt={event?.title} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-black text-slate-900">{event?.title}</h4>
                  <p className="text-sm text-slate-500 mt-1 font-medium">{event?.startDate ? new Date(event.startDate).toLocaleDateString() : ''}</p>
                  <p className="text-sm text-slate-500 font-medium">{event?.location || 'Location Unknown'}</p>
                </div>
              </div>
            </div>

            {/* Review Section */}
            {transaction.status === 'DONE' && (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                  <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Event Attended</h3>
                </div>
                <ReviewForm eventId={transaction.eventId} />
              </div>
            )}
          </div>

          {/* Details Column */}
          <div className="space-y-6">
            {event ? (
              <PriceSummary 
                unitPrice={event.price || 0}
                quantity={transaction.items?.[0]?.quantity || 1}
                pointsDiscount={transaction.pointsUsed || 0}
                voucherDiscount={Math.max(0, (transaction.totalPrice || 0) - (transaction.finalPrice || 0) - (transaction.pointsUsed || 0))} 
              />
            ) : (
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="text-lg font-semibold mb-4 border-b pb-2">Order Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-slate-600">
                    <span>Total Price</span>
                    <span className="font-bold">
                      {new Intl.NumberFormat('id-ID', {
                        style: 'currency',
                        currency: 'IDR',
                        minimumFractionDigits: 0
                      }).format(transaction.finalPrice || 0)}
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-4">Customer Info</h4>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500 font-medium">Name</span>
                  <span className="text-slate-900 font-bold">{user?.name || 'User'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500 font-medium">Email</span>
                  <span className="text-slate-900 font-bold">{user?.email || '-'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TransactionDetailPage;
