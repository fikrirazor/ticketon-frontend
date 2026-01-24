import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Layout } from '../components/Layout';
import PaymentProofUpload from '../components/transactions/PaymentProofUpload';

const PaymentProofPage: React.FC = () => {
  const { transactionId } = useParams<{ transactionId: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // 2 hours from now for mock data
  const expiryDate = new Date(new Date().getTime() + 2 * 60 * 60 * 1000).toISOString();

  const handleUpload = (file: File) => {
    setIsLoading(true);
    console.log('Uploading file:', file.name);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigate(`/transaction/${transactionId}`);
    }, 2000);
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-16">
        <header className="mb-12 text-center space-y-4">
          <div className="inline-flex items-center space-x-2 bg-slate-100 px-4 py-2 rounded-full border border-slate-200">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping"></span>
            <span className="text-xs font-black uppercase tracking-widest text-slate-600">Action Required</span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tight">One Last Step!</h1>
          <p className="max-w-xl mx-auto text-slate-500 font-medium">
            Please upload your payment proof for transaction <span className="text-indigo-600 font-black">#{transactionId}</span> to confirm your booking.
          </p>
        </header>

        <PaymentProofUpload 
          expiryDate={expiryDate} 
          onUpload={handleUpload}
          isLoading={isLoading}
        />

        <div className="mt-12 text-center">
          <button 
            onClick={() => navigate('/')}
            className="text-slate-500 font-bold hover:text-indigo-600 transition-colors uppercase tracking-widest text-sm"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default PaymentProofPage;
