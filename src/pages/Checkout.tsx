import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { Button } from '../components/ui/button';
import CheckoutForm from '../components/transactions/CheckoutForm';
import type { CheckoutData } from '../components/transactions/CheckoutForm';
import PriceSummary from '../components/transactions/PriceSummary';
import { useEventStore } from '../store/event.store';
import { useTransactionStore } from '../store/transaction.store';
import { useAuthStore } from '../store/auth.store';
import { toast } from 'react-hot-toast';
import type { Event } from '../types';

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { getEventById, isLoading: isEventsLoading } = useEventStore();
  const { createTransaction, isLoading: isTxLoading } = useTransactionStore();
  const { user } = useAuthStore();
  
  const [event, setEvent] = useState<Event | null>(null);
  const [availablePoints, setAvailablePoints] = useState(0);

  React.useEffect(() => {
    const loadEvent = async () => {
        if (!id) {
          console.warn('No event ID provided in URL');
          return;
        }
        try {
          const data = await getEventById(id);
          if (data) {
            setEvent(data);
            console.log('Event loaded:', data);
          } else {
            console.warn('No event data returned');
          }
        } catch (error) {
          console.error('Error loading event:', error);
        }
        setAvailablePoints(50000); 
    };
    loadEvent();
  }, [id, getEventById, user]);

  const [checkoutValues, setCheckoutValues] = useState<CheckoutData>({
    quantity: 1,
    usePoints: false,
    pointsToUse: 0,
    voucherCode: ''
  });

  const handleCheckoutSubmit = async (data: CheckoutData) => {
    setCheckoutValues(data);
    if (!event) {
      toast.error('Event not found');
      return;
    }

    try {
      const transactionPayload = {
        eventId: event.id,
        pointsUsed: data.usePoints ? availablePoints : 0,
        voucherId: data.voucherId,
        items: [{
          eventId: event.id,
          quantity: data.quantity,
          price: event.price
        }]
      };

      console.log('Creating transaction with:', transactionPayload);
      
      const transaction = await createTransaction(transactionPayload);
      
      console.log('Transaction created:', transaction);
      toast.success('Transaction created! Please complete payment.');
      navigate(`/payment-proof/${transaction.id}`);
    } catch (err: any) {
      console.error('Checkout error details:', {
        status: err.response?.status,
        statusText: err.response?.statusText,
        message: err.response?.data?.message,
        errors: err.response?.data?.errors,
        fullData: err.response?.data,
        requestData: {
          eventId: event.id,
          pointsUsed: data.usePoints ? availablePoints : 0,
          voucherId: data.voucherId,
          items: [{
            eventId: event.id,
            quantity: data.quantity,
            price: event.price
          }]
        }
      });
      
      // Build error message from validation errors
      let errorMsg = err.response?.data?.message || 'Failed to create transaction';
      if (err.response?.data?.errors && Array.isArray(err.response.data.errors)) {
        const validationErrors = err.response.data.errors.map((e: any) => e.message || e).join(', ');
        errorMsg = `Validation Error: ${validationErrors}`;
      }
      
      toast.error(errorMsg);
    }
  };

  if (!event && isEventsLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-500">Loading event details...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!event && !isEventsLoading) {
    return (
        <Layout>
          <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
            <h2 className="text-2xl font-black text-slate-900 uppercase">Event Not Found</h2>
            <p className="text-gray-500 mt-2">Event ID: {id}</p>
            <Button onClick={() => navigate('/')} className="mt-8">Back to Discovery</Button>
          </div>
        </Layout>
      );
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Checkout Section */}
          <div className="flex-1 space-y-8">
            <header className="space-y-2">
              <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tight">Checkout</h1>
              <p className="text-slate-500 font-medium">Complete your ticket booking details</p>
            </header>

            <div className="bg-slate-100 p-6 rounded-2xl flex flex-col md:flex-row gap-6 border border-slate-200">
              <div className="w-full md:w-48 h-32 rounded-xl overflow-hidden shadow-md">
                <img src={event?.imageUrl} alt={event?.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-center space-x-2 text-indigo-600 font-bold text-xs uppercase tracking-widest">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{event?.startDate ? new Date(event.startDate).toLocaleDateString() : ''}</span>
                </div>
                <h2 className="text-2xl font-black text-slate-900 leading-tight">{event?.title}</h2>
                <p className="text-slate-600 font-medium flex items-center">
                  <svg className="w-4 h-4 mr-1 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.828a2 2 0 01-2.828 0L6.343 16.657a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {typeof event?.location === 'object' ? event.location.city : (event?.location || 'Location Unknown')}
                </p>
              </div>
            </div>

            {event && (
              <CheckoutForm 
                eventId={event.id}
                eventPrice={event.price} 
                availablePoints={availablePoints}
                onSubmit={handleCheckoutSubmit}
                isLoading={isTxLoading}
              />
            )}
          </div>

          {/* Sticky Summary Sidebar */}
          <div className="w-full lg:w-96">
            <div className="sticky top-24 space-y-6">
              {event && (
                <PriceSummary 
                  unitPrice={event.price}
                  quantity={checkoutValues.quantity}
                  pointsDiscount={checkoutValues.usePoints ? availablePoints : 0}
                  voucherDiscount={checkoutValues.discountPercent ? (event.price * checkoutValues.quantity * checkoutValues.discountPercent) / 100 : 0} 
                />
              )}
              
              <div className="p-6 bg-slate-900 rounded-2xl text-white">
                <h4 className="font-bold text-lg mb-2 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Secure Transaction
                </h4>
                <p className="text-sm text-slate-400">Your transaction is encrypted and secured by TicketOn. No sensitive data is stored on our servers.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CheckoutPage;
