import React from 'react';

interface PriceSummaryProps {
  unitPrice: number;
  quantity: number;
  pointsDiscount?: number;
  voucherDiscount?: number;
  className?: string;
}

const PriceSummary: React.FC<PriceSummaryProps> = ({
  unitPrice,
  quantity,
  pointsDiscount = 0,
  voucherDiscount = 0,
  className = ''
}) => {
  const subtotal = unitPrice * quantity;
  const totalDiscount = pointsDiscount + voucherDiscount;
  const finalPrice = Math.max(0, subtotal - totalDiscount);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className={`bg-white p-6 rounded-xl border border-slate-200 shadow-sm ${className}`}>
      <h3 className="text-lg font-semibold mb-4 border-b pb-2">Order Summary</h3>
      
      <div className="space-y-3">
        <div className="flex justify-between text-slate-600">
          <span>Subtotal ({quantity} ticket{quantity > 1 ? 's' : ''})</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>

        {pointsDiscount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Points Discount</span>
            <span>-{formatCurrency(pointsDiscount)}</span>
          </div>
        )}

        {voucherDiscount > 0 && (
          <div className="flex justify-between text-indigo-600 font-medium">
            <span>Voucher Discount</span>
            <span>-{formatCurrency(voucherDiscount)}</span>
          </div>
        )}

        <div className="pt-4 border-t border-slate-100 flex justify-between items-center mt-2">
          <span className="text-xl font-bold text-slate-900">Total Price</span>
          <span className="text-2xl font-black text-indigo-600">
            {formatCurrency(finalPrice)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PriceSummary;
