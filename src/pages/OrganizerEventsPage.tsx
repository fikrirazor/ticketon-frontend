import React, { useEffect, useState } from "react";
import { useOrganizerStore } from "../store/organizer.store";
import { OrganizerLayout } from "../components/OrganizerLayout";
import {
  Calendar,
  Users,
  Edit,
  Trash2,
  Search,
  Plus,
  MapPin,
  AlertTriangle,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import toast, { Toaster } from "react-hot-toast";
import type { Event } from "../types";

const OrganizerEventsPage: React.FC = () => {
  const { events, fetchEvents, deleteEvent, isLoading } = useOrganizerStore();
  const [eventToDelete, setEventToDelete] = useState<Event | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const handleDelete = async () => {
    if (!eventToDelete) return;

    setIsDeleting(true);
    try {
      await deleteEvent(eventToDelete.id);
      toast.success("Event berhasil dihapus");
      setEventToDelete(null);
    } catch (error: unknown) {
      const errResponse = error as {
        response?: { data?: { message?: string } };
        message?: string;
      };
      toast.error(
        errResponse.response?.data?.message ||
          errResponse.message ||
          "Gagal menghapus event",
      );
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <OrganizerLayout>
      <Toaster position="top-right" />

      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              List Event
            </h1>
            <p className="text-slate-500 font-medium">
              Kelola semua event yang telah Anda buat.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative group hidden md:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                placeholder="Cari event..."
                className="pl-12 pr-6 py-3 bg-white border border-slate-100 rounded-2xl text-sm font-bold text-slate-900 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all w-64 shadow-sm"
              />
            </div>
            <Link to="/create-event">
              <Button className="bg-primary hover:bg-orange-600 shadow-xl shadow-primary/20 rounded-2xl px-6 py-6 text-sm font-black text-white border-0 group">
                <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform" />
                BUAT EVENT
              </Button>
            </Link>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 p-8 min-h-[600px]">
          {isLoading && events.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">
                Memuat Data...
              </p>
            </div>
          ) : events.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="group bg-slate-50/50 hover:bg-white border border-transparent hover:border-slate-100 rounded-[2rem] p-6 transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50"
                >
                  <div className="aspect-video rounded-2xl overflow-hidden bg-slate-200 mb-6 relative">
                    <img
                      src={
                        event.imageUrl ||
                        "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=400"
                      }
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-lg">
                      <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest">
                        {typeof event.price === "number" && event.price > 0
                          ? new Intl.NumberFormat("id-ID", {
                              style: "currency",
                              currency: "IDR",
                              minimumFractionDigits: 0,
                            }).format(event.price)
                          : "GRATIS"}
                      </p>
                    </div>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 mb-2 truncate group-hover:text-primary transition-colors">
                    {event.title}
                  </h3>

                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                      <Calendar size={14} className="text-slate-400" />
                      {new Date(event.startDate).toLocaleDateString("id-ID", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                      <MapPin size={14} className="text-slate-400" />
                      {typeof event.location === "object"
                        ? event.location.city
                        : event.location || "Location TBA"}
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                      <Users size={14} className="text-slate-400" />
                      {event.seatLeft} Tiket Tersisa
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Link to={`/edit-event/${event.id}`} className="flex-1">
                      <Button className="w-full bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 rounded-xl font-black text-xs py-5">
                        <Edit size={14} className="mr-2" />
                        EDIT
                      </Button>
                    </Link>
                    <Button
                      onClick={() => setEventToDelete(event)}
                      className="w-12 h-12 bg-white hover:bg-red-50 text-slate-400 hover:text-red-500 border border-slate-200 rounded-xl flex items-center justify-center p-0 transition-colors"
                    >
                      <Trash2 size={18} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-32 text-center">
              <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                <Calendar className="w-10 h-10 text-slate-300" />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-2">
                Belum Ada Event
              </h3>
              <p className="text-slate-500 font-medium mb-8 max-w-xs">
                Mulai buat event pertama Anda dan jangkau ribuan peserta.
              </p>
              <Link to="/create-event">
                <Button className="bg-primary hover:bg-orange-600 text-white font-black rounded-2xl px-8 py-6 border-0 shadow-lg shadow-primary/20">
                  BUAT EVENT SEKARANG
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {eventToDelete && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={() => !isDeleting && setEventToDelete(null)}
          />

          <div className="relative bg-white rounded-[2.5rem] shadow-2xl shadow-slate-900/20 w-full max-w-md p-8 overflow-hidden animate-in zoom-in-95 fade-in duration-300">
            {/* Decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-bl-[5rem] -mr-8 -mt-8 -z-0 opacity-50" />

            <div className="relative z-10">
              <div className="w-20 h-20 bg-red-100 rounded-3xl flex items-center justify-center mb-6 ring-8 ring-red-50">
                <AlertTriangle className="w-10 h-10 text-red-500" />
              </div>

              <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight leading-tight">
                Hapus Event?
              </h3>

              <p className="text-slate-500 font-medium mb-8 leading-relaxed">
                Anda akan menghapus{" "}
                <span className="text-slate-900 font-bold">
                  "{eventToDelete.title}"
                </span>
                . Tindakan ini tidak dapat dibatalkan.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white border-0 font-black rounded-2xl py-6 h-auto shadow-lg shadow-red-200 transition-all active:scale-95"
                >
                  {isDeleting ? "MENGHAPUS..." : "YA, HAPUS SEKARANG"}
                </Button>
                <Button
                  onClick={() => setEventToDelete(null)}
                  disabled={isDeleting}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-600 border-0 font-black rounded-2xl py-6 h-auto transition-all active:scale-95"
                >
                  BATAL
                </Button>
              </div>
            </div>

            <button
              onClick={() => !isDeleting && setEventToDelete(null)}
              className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-900 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}
    </OrganizerLayout>
  );
};

export default OrganizerEventsPage;
