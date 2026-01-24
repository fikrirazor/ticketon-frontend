import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import TransactionStatus from '../components/transactions/TransactionStatus';
import PriceSummary from '../components/transactions/PriceSummary';
import type { TransactionStatus as TStatus } from '../types';

const TransactionDetailPage: React.FC = () => {
  const { transactionId } = useParams<{ transactionId: string }>();
  const navigate = useNavigate();

  // Mock data - In real app, this would come from an API
  const transaction = {
    id: transactionId || 'tx-123456',
    status: 'WAITING_FOR_ADMIN_CONFIRMATION' as TStatus,
    quantity: 2,
    pointsUsed: 0,
    voucherCode: 'PROMO100',
    event: {
      title: 'Coldplay: Music of the Spheres World Tour',
      price: 1500000,
      imageUrl: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      date: 'Oct 25, 2026',
      location: 'Gelora Bung Karno Stadium, Jakarta'
    }
  };

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
                  <img src={transaction.event.imageUrl} alt={transaction.event.title} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-black text-slate-900">{transaction.event.title}</h4>
                  <p className="text-sm text-slate-500 mt-1 font-medium">{transaction.event.date}</p>
                  <p className="text-sm text-slate-500 font-medium">{transaction.event.location}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Details Column */}
          <div className="space-y-6">
            <PriceSummary 
              unitPrice={transaction.event.price}
              quantity={transaction.quantity}
              pointsDiscount={transaction.pointsUsed}
              voucherDiscount={transaction.voucherCode ? 100000 : 0}
            />

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-4">Customer Info</h4>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500 font-medium">Name</span>
                  <span className="text-slate-900 font-bold">Rozan Fikri</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500 font-medium">Email</span>
                  <span className="text-slate-900 font-bold">rozan@example.com</span>
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
