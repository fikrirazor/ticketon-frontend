import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { Layout } from "../components/Layout";
import { EventForm } from "../components/events/EventForm";
import type { EventFormValues } from "../components/events/EventForm";
import { ArrowLeft, MapPin, Calendar, Users, X } from "lucide-react";
import { Button } from "../components/ui/button";
import { useEventStore } from "../store/event.store";
import { getErrorMessage } from "../lib/axiosInstance";

export const EditEvent: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [previewData, setPreviewData] = useState<EventFormValues | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [initialData, setInitialData] =
    useState<Partial<EventFormValues> | null>(null);

  const { updateEvent, getEventById, createVoucher } = useEventStore();

  useEffect(() => {
    const fetchEvent = async () => {
      if (!id) return;
      try {
        const event = await getEventById(id);
        if (event) {
          // Map event to form values
          setInitialData({
            title: event.title,
            description: event.description,
            location:
              typeof event.location === "object"
                ? event.location.city
                : event.location,
            address: event.address || "",
            startDate: new Date(event.startDate).toISOString().slice(0, 16),
            endDate: new Date(event.endDate).toISOString().slice(0, 16),
            price: event.price,
            seatTotal: event.seatTotal,
            category: event.category,
            imageUrl: event.imageUrl || "",
            isPromoted: event.isPromoted, // Use actual value from event if available
            vouchers: [],
          });
        } else {
          toast.error("Event not found");
          navigate("/organizer/events");
        }
      } catch {
        toast.error("Failed to fetch event details");
        navigate("/organizer/events");
      } finally {
        setIsFetching(false);
      }
    };

    fetchEvent();
  }, [id, getEventById, navigate]);

  const handleSubmit = async (values: EventFormValues) => {
    if (!id) return;
    setIsLoading(true);
    try {
      const payload: Partial<EventFormValues> & Record<string, unknown> = {
        ...values,
      };
      delete payload.vouchers;

      await updateEvent(id, payload);

      // Note: Voucher handling for update might be more complex
      // depending on backend implementation. For now just following Create logic.
      if (values.isPromoted && values.vouchers && values.vouchers.length > 0) {
        for (const voucher of values.vouchers) {
          await createVoucher(id, {
            code: voucher.code,
            discountPercent: voucher.amount,
            maxUsage: 100,
            startDate: values.startDate,
            endDate: voucher.expiryDate,
          });
        }
      }

      toast.success("Event updated successfully!");
      setTimeout(() => navigate("/organizer/events"), 1500);
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

  if (isFetching) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

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
            <h1 className="text-3xl font-extrabold text-gray-900">
              Edit Event
            </h1>
            <p className="text-gray-500">Update the details of your event</p>
          </div>
        </div>

        <EventForm
          initialValues={initialData || undefined}
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
                {previewData.imageUrl ? (
                  <img
                    src={previewData.imageUrl}
                    alt="Cover"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    No image URL provided
                  </div>
                )}
                <div className="absolute top-4 left-4">
                  <span className="px-4 py-1 bg-primary text-white text-xs font-bold rounded-full uppercase tracking-wider">
                    {previewData.category || "Category"}
                  </span>
                </div>
              </div>

              {/* Content Preview */}
              <div className="p-8 space-y-6">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="space-y-2">
                    <h2 className="text-4xl font-black text-gray-900 leading-tight">
                      {previewData.title || "Event Title"}
                    </h2>
                    <div className="flex items-center text-gray-600 gap-4 flex-wrap">
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-4 h-4 text-primary" />
                          <span className="text-sm">
                            {previewData.location || "Location"}
                          </span>
                        </div>
                        {previewData.address && (
                          <span className="text-xs text-gray-500 ml-5.5">
                            {previewData.address}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-primary" />
                        <span className="text-sm">
                          {previewData.startDate
                            ? new Date(previewData.startDate).toLocaleString()
                            : "Date"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-primary/5 p-4 rounded-2xl min-w-[150px] text-center">
                    <span className="text-xs font-medium text-gray-500 uppercase block mb-1">
                      Ticket Price
                    </span>
                    <span className="text-2xl font-bold text-primary">
                      {previewData.price === 0
                        ? "FREE"
                        : `IDR ${Number(previewData.price).toLocaleString()}`}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2 space-y-4">
                    <h3 className="text-xl font-bold text-gray-900 border-b pb-2">
                      Description
                    </h3>
                    <p className="text-gray-600 whitespace-pre-wrap leading-relaxed">
                      {previewData.description || "No description provided."}
                    </p>
                  </div>
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-900 border-b pb-2">
                      Details
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Users className="w-5 h-5" />
                          <span>Total Capacity</span>
                        </div>
                        <span className="font-bold text-gray-900">
                          {previewData.seatTotal || "0"} Seats
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-8">
                  <Button
                    onClick={() => setShowPreview(false)}
                    className="px-8"
                  >
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
