import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';
import { Layout } from '../components/Layout';
import { EventForm } from '../components/events/EventForm';
import type { EventFormValues, VoucherValue } from '../components/events/EventForm';
import { ArrowLeft, MapPin, Calendar, Users, Tag, X } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useEventStore } from '../store/event.store';
import { getErrorMessage } from '../lib/axiosInstance';

export const CreateEvent: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [previewData, setPreviewData] = useState<EventFormValues | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const { createEvent, createVoucher } = useEventStore();

  const handleSubmit = async (values: EventFormValues) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      Object.keys(values).forEach(key => {
        if (key === 'vouchers') {
            // Vouchers are created separately
        } else if (key === 'image' && values.image) {
            formData.append(key, values.image);
        } else if (key === 'isPromotion') {
             formData.append(key, String(values.isPromotion));
        } else {
            formData.append(key, String(values[key as keyof EventFormValues]));
        }
      });

      const newEvent = await createEvent(formData);
      
      // Create vouchers if enabled and present
      if (values.isPromotion && values.vouchers && values.vouchers.length > 0) {
        for (const voucher of values.vouchers) {
          await createVoucher(newEvent.id, {
            code: voucher.code,
            discountPercent: voucher.amount,
            maxUsage: 100, // Default for now
            startDate: values.startDate,
            endDate: voucher.expiryDate
          });
        }
      }
      
      toast.success('Event created successfully!');
      setTimeout(() => navigate('/admin'), 1500);
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  const handlePreview = (values: EventFormValues) => {
    setPreviewData(values);
    setShowPreview(true);
  };

  return (
    <Layout>
      <Toaster position="top-right" />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto mb-8 flex items-center justify-between">
          <div>
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-500 hover:text-primary transition-colors mb-2"
            >
              <ArrowLeft className="w-4 h-4 mr-1" /> Back
            </button>
            <h1 className="text-3xl font-extrabold text-gray-900">Create New Event</h1>
            <p className="text-gray-500">Fill in the details below to host your amazing event</p>
          </div>
        </div>

        <EventForm
          onSubmit={handleSubmit}
          onPreview={handlePreview}
          isLoading={isLoading}
        />
      </main>

      {/* Preview Modal */}
      {showPreview && previewData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative shadow-2xl">
            <button
              onClick={() => setShowPreview(false)}
              className="absolute top-4 right-4 p-2 bg-white/80 hover:bg-white rounded-full text-gray-800 shadow-md z-10"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="p-0">
              {/* Cover Image Preview */}
              <div className="h-64 md:h-80 bg-gray-200 relative overflow-hidden">
                {previewData.image ? (
                  <img
                    src={URL.createObjectURL(previewData.image)}
                    alt="Cover"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    No image uploaded
                  </div>
                )}
                <div className="absolute top-4 left-4">
                  <span className="px-4 py-1 bg-primary text-white text-xs font-bold rounded-full uppercase tracking-wider">
                    {previewData.category || 'Category'}
                  </span>
                </div>
              </div>

              {/* Content Preview */}
              <div className="p-8 space-y-6">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="space-y-2">
                    <h2 className="text-4xl font-black text-gray-900 leading-tight">
                      {previewData.title || 'Event Title'}
                    </h2>
                    <div className="flex items-center text-gray-600 gap-4 flex-wrap">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span className="text-sm">{previewData.location || 'Location'}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-primary" />
                        <span className="text-sm">{previewData.startDate ? new Date(previewData.startDate).toLocaleString() : 'Date'}</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-primary/5 p-4 rounded-2xl min-w-[150px] text-center">
                    <span className="text-xs font-medium text-gray-500 uppercase block mb-1">Ticket Price</span>
                    <span className="text-2xl font-bold text-primary">
                      {previewData.price === 0 ? 'FREE' : `IDR ${Number(previewData.price).toLocaleString()}`}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2 space-y-4">
                    <h3 className="text-xl font-bold text-gray-900 border-b pb-2">Description</h3>
                    <p className="text-gray-600 whitespace-pre-wrap leading-relaxed">
                      {previewData.description || 'No description provided.'}
                    </p>
                  </div>
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-900 border-b pb-2">Details</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Users className="w-5 h-5" />
                          <span>Total Capacity</span>
                        </div>
                        <span className="font-bold text-gray-900">{previewData.seatTotal || '0'} Seats</span>
                      </div>
                      {previewData.isPromotion && (
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-gray-600">
                            <Tag className="w-5 h-5" />
                            <span>Available Offers</span>
                          </div>
                          {previewData.vouchers.map((v: VoucherValue, i: number) => (
                            <div key={i} className="bg-yellow-50 border border-yellow-100 p-2 rounded-lg flex justify-between items-center">
                              <span className="text-xs font-bold text-yellow-800">{v.code}</span>
                              <span className="text-xs font-medium text-yellow-700">{v.amount}% OFF</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-8">
                  <Button onClick={() => setShowPreview(false)} className="px-8">
                    Close Preview
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};
