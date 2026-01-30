import React from 'react';
import { FieldArray, useFormikContext } from 'formik';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';
import type { EventFormValues, VoucherValue } from './EventForm';

export const VoucherForm: React.FC = () => {
  const { values, handleChange, handleBlur } = useFormikContext<EventFormValues>();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b pb-2">
        <h3 className="text-lg font-semibold text-gray-800">Event Vouchers</h3>
        <p className="text-sm text-gray-500">Add promotional codes for your event</p>
      </div>

      <FieldArray name="vouchers">
        {({ push, remove }) => (
          <div className="space-y-4">
            {values.vouchers && values.vouchers.length > 0 ? (
              values.vouchers.map((voucher: VoucherValue, index: number) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-xl relative group">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-gray-600">Code</label>
                    <input
                      name={`vouchers.${index}.code`}
                      value={voucher.code}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="e.g. EARLYBIRD"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-gray-600">Amount (%)</label>
                    <input
                      type="number"
                      name={`vouchers.${index}.amount`}
                      value={voucher.amount}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="10"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1 md:col-span-1">
                    <label className="text-xs font-semibold text-gray-600">Expiry Date</label>
                    <input
                      type="date"
                      name={`vouchers.${index}.expiryDate`}
                      value={voucher.expiryDate}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none"
                    />
                  </div>
                  <div className="flex items-end justify-end">
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-6 border-2 border-dashed border-gray-200 rounded-xl">
                <p className="text-gray-500 mb-2">No vouchers added yet</p>
                <Button
                  type="button"
                  onClick={() => push({ code: '', amount: 0, expiryDate: '' })}
                  className="bg-secondary text-primary hover:bg-secondary/80"
                >
                  <Plus className="w-4 h-4 mr-1" /> Add First Voucher
                </Button>
              </div>
            )}

            {values.vouchers && values.vouchers.length > 0 && (
              <Button
                type="button"
                onClick={() => push({ code: '', amount: 0, expiryDate: '' })}
                variant="outline"
                className="w-full border-dashed"
              >
                <Plus className="w-4 h-4 mr-1" /> Add Another Voucher
              </Button>
            )}
          </div>
        )}
      </FieldArray>
    </div>
  );
};
