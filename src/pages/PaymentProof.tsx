import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Layout } from "../components/Layout";
import PaymentProofUpload from "../components/transactions/PaymentProofUpload";
import { useTransactionStore } from "../store/transaction.store";
import { getErrorMessage } from "../lib/axiosInstance";
import { toast } from "react-hot-toast";
import type { Transaction } from "../types";

const PaymentProofPage: React.FC = () => {
  const { transactionId } = useParams<{ transactionId: string }>();
  const navigate = useNavigate();
  const {
    getTransactionById,
    uploadPaymentProof,
    submitPaymentProofUrl,
    isLoading,
  } = useTransactionStore();
  const [transaction, setTransaction] = useState<Transaction | null>(null);

  React.useEffect(() => {
    const loadTransaction = async () => {
      if (!transactionId) return;
      try {
        const data = await getTransactionById(transactionId);
        setTransaction(data);
      } catch (err) {
        toast.error(getErrorMessage(err));
      }
    };
    loadTransaction();
  }, [transactionId, getTransactionById]);

  const handleUpload = async (data: File | string) => {
    if (!transactionId) return;
    try {
      if (typeof data === "string") {
        await submitPaymentProofUrl(transactionId, data);
      } else {
        await uploadPaymentProof(transactionId, data);
      }
      toast.success("Payment proof submitted successfully!");
      navigate(`/transaction/${transactionId}`);
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-16">
        <header className="mb-12 text-center space-y-4">
          <div className="inline-flex items-center space-x-2 bg-slate-100 px-4 py-2 rounded-full border border-slate-200">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping"></span>
            <span className="text-xs font-black uppercase tracking-widest text-slate-600">
              Action Required
            </span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tight">
            One Last Step!
          </h1>
          <p className="max-w-xl mx-auto text-slate-500 font-medium">
            Please upload your payment proof for transaction{" "}
            <span className="text-indigo-600 font-black">#{transactionId}</span>{" "}
            to confirm your booking.
          </p>
        </header>

        <PaymentProofUpload
          expiryDate={transaction?.expiresAt || new Date().toISOString()}
          onUpload={handleUpload}
          isLoading={isLoading}
        />

        <div className="mt-12 text-center">
          <button
            onClick={() => navigate("/")}
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
