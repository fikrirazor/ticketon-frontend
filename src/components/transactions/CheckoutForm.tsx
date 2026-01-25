import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { useTransactionStore } from '../../store/transaction.store';
import { toast } from 'react-hot-toast';

interface CheckoutFormProps {
  eventId: string;
  eventPrice: number;
  availablePoints: number;
  onSubmit: (data: CheckoutData) => void;
  isLoading?: boolean;
}

export interface CheckoutData {
  quantity: number;
  usePoints: boolean;
  pointsToUse: number;
  voucherCode: string;
  voucherId?: string;
  discountPercent?: number;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({
  eventId,
  availablePoints,
  onSubmit,
  isLoading = false
}) => {
  const { validateVoucher } = useTransactionStore();
  const [quantity, setQuantity] = useState(1);
  const [usePoints, setUsePoints] = useState(false);
  const [voucherCode, setVoucherCode] = useState('');
  const [validatedVoucher, setValidatedVoucher] = useState<{
    id: string;
    code: string;
    discountPercent?: number;
  } | null>(null);
  const [isValidating, setIsValidating] = useState(false);

  const handleIncrement = () => setQuantity((prev: number) => prev + 1);
  const handleDecrement = () => setQuantity((prev: number) => (prev > 1 ? prev - 1 : 1));

  const handleApplyVoucher = async () => {
    if (!voucherCode) return;
    setIsValidating(true);
    try {
      const data = await validateVoucher(voucherCode, eventId);
      setValidatedVoucher(data.voucher);
      toast.success('Voucher applied!');
    } catch (err: any) {
      setValidatedVoucher(null);
      toast.error(err.response?.data?.message || 'Invalid voucher');
    } finally {
      setIsValidating(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      quantity,
      usePoints,
      pointsToUse: usePoints ? availablePoints : 0,
      voucherCode: validatedVoucher ? validatedVoucher.code : '',
      voucherId: validatedVoucher ? validatedVoucher.id : undefined,
      discountPercent: validatedVoucher ? validatedVoucher.discountPercent : 0
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
      {/* Quantity Selector */}
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-slate-700 uppercase tracking-wider">
          Number of Tickets
        </label>
        <div className="flex items-center space-x-6">
          <button
            type="button"
            onClick={handleDecrement}
            className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-slate-200 hover:border-indigo-500 hover:text-indigo-600 transition-all text-xl font-bold"
          >
            −
          </button>
          <span className="text-3xl font-black w-8 text-center tabular-nums">
            {quantity}
          </span>
          <button
            type="button"
            onClick={handleIncrement}
            className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-slate-200 hover:border-indigo-500 hover:text-indigo-600 transition-all text-xl font-bold"
          >
            +
          </button>
        </div>
      </div>

      {/* Points Usage */}
      <div className="space-y-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-bold text-slate-800">Use Your Points</h4>
            <p className="text-sm text-slate-500">Available: {availablePoints.toLocaleString()} Points</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={usePoints}
              onChange={(e) => setUsePoints(e.target.checked)}
              disabled={availablePoints <= 0}
            />
            <div className="w-14 h-7 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-indigo-600"></div>
          </label>
        </div>
      </div>

      {/* Voucher Input */}
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-slate-700 uppercase tracking-wider">
          Voucher / Coupon Code
        </label>
        <div className="flex space-x-2">
          <input
            type="text"
            value={voucherCode}
            onChange={(e) => setVoucherCode(e.target.value)}
            placeholder="Enter code here..."
            className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
          />
          <button
            type="button"
            onClick={handleApplyVoucher}
            disabled={isValidating || !voucherCode}
            className="px-6 py-3 bg-slate-800 text-white font-bold rounded-xl hover:bg-slate-900 transition-colors disabled:opacity-50"
          >
            {isValidating ? '...' : 'Apply'}
          </button>
        </div>
        {validatedVoucher && (
           <p className="text-xs text-green-600 font-bold">
             ✓ Applied: {validatedVoucher.discountPercent}% OFF
           </p>
        )}
      </div>

      {/* Payment Method Selector (Simplified for UI) */}
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-slate-700 uppercase tracking-wider">
          Payment Method
        </label>
        <div className="grid grid-cols-2 gap-3">
          <div className="p-4 border-2 border-indigo-500 bg-indigo-50 rounded-xl flex items-center space-x-3 cursor-pointer">
            <div className="w-4 h-4 rounded-full border-4 border-indigo-600 bg-white"></div>
            <span className="font-bold text-indigo-900">Bank Transfer</span>
          </div>
          <div className="p-4 border-2 border-slate-100 bg-white rounded-xl flex items-center space-x-3 cursor-not-allowed opacity-50">
            <div className="w-4 h-4 rounded-full border-2 border-slate-300 bg-white"></div>
            <span className="font-bold text-slate-400">Credit Card</span>
          </div>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full py-4 text-lg font-black uppercase tracking-widest shadow-lg shadow-indigo-200"
        loading={isLoading}
      >
        Proceed to Payment
      </Button>
    </form>
  );
};

export default CheckoutForm;
