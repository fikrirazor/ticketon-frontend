import React, { useEffect, useState } from 'react';
import { Layout } from '../components/Layout';
import { useTransactionStore } from '../store/transaction.store';
import { useAuthStore } from '../store/auth.store';
import type { Transaction } from '../types';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { ArrowLeft } from 'lucide-react';

const UserTransactionsPage: React.FC = () => {
  const { getUserTransactions, isLoading } = useTransactionStore();
  const { user } = useAuthStore();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        setError(null);
        const userTransactions = await getUserTransactions();
        setTransactions(userTransactions);
      } catch (err: any) {
        console.error('Failed to load user transactions:', err);
        setError(err.message || 'Failed to load transactions. Please try again.');
      }
    };

    if (user) {
      loadTransactions();
    }
  }, [user]);

  if (isLoading) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-gray-500 font-medium">Loading transactions...</p>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
          <h2 className="text-2xl font-black text-slate-900 uppercase">Error Loading Transactions</h2>
          <p className="text-gray-500 mt-2">{error}</p>
          <Button onClick={() => window.location.reload()} className="mt-8">Retry</Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-gray-500 hover:text-primary mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Events
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Transactions</h1>
            <p className="text-gray-500">Track all your ticket reservations and payments.</p>
          </div>
        </div>

        {transactions.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
            <h3 className="text-lg font-bold text-gray-900 mb-2">No Transactions Yet</h3>
            <p className="text-gray-500 mb-4">When you book events, your transactions will appear here.</p>
            <Link to="/">
              <Button>Browse Events</Button>
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4 font-semibold text-gray-900">Event</th>
                    <th className="px-6 py-4 font-semibold text-gray-900">Date</th>
                    <th className="px-6 py-4 font-semibold text-gray-900">Amount</th>
                    <th className="px-6 py-4 font-semibold text-gray-900">Status</th>
                    <th className="px-6 py-4 font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {transactions.map((transaction) => (
                    <tr key={transaction.id} className="hover:bg-gray-50/50">
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {transaction.event?.title || 'Event Title'}
                      </td>
                      <td className="px-6 py-4 text-gray-500">
                        {new Date(transaction.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-semibold text-gray-900">
                          Rp {transaction.finalPrice.toLocaleString('id-ID')}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${
                          transaction.status === 'DONE' ? 'bg-green-100 text-green-800' :
                          transaction.status === 'WAITING_PAYMENT' ? 'bg-yellow-100 text-yellow-800' :
                          transaction.status === 'WAITING_ADMIN' ? 'bg-blue-100 text-blue-800' :
                          transaction.status === 'REJECTED' ? 'bg-red-100 text-red-800' :
                          transaction.status === 'EXPIRED' ? 'bg-gray-100 text-gray-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {transaction.status.replace(/_/g, ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <Link to={`/transaction/${transaction.id}`}>
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default UserTransactionsPage;