import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { OrganizerLayout } from "../components/OrganizerLayout";
import {
  Users,
  ArrowLeft,
  Search,
  Download,
  Mail,
  Ticket,
  CreditCard,
  User,
} from "lucide-react";
import { Button } from "../components/ui/button";
import axiosInstance from "../lib/axiosInstance";
import { Toaster } from "react-hot-toast";

interface Attendee {
  id: string;
  userId: string;
  eventId: string;
  totalPrice: number;
  finalPrice: number;
  status: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
  items: Array<{
    id: string;
    quantity: number;
    price: number;
  }>;
}

export const EventAttendeesPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchAttendees = async () => {
      try {
        const response = await axiosInstance.get(`/events/${id}/attendees`);
        // Backend returns the transactions with status "DONE"
        setAttendees(response.data.data);
      } catch (error) {
        console.error("Error fetching attendees:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchAttendees();
  }, [id]);

  const filteredAttendees = attendees.filter(
    (a) =>
      a.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalTickets = attendees.reduce(
    (sum, a) =>
      sum + a.items.reduce((itemSum, item) => itemSum + item.quantity, 0),
    0,
  );

  const totalRevenue = attendees.reduce((sum, a) => sum + a.finalPrice, 0);

  return (
    <OrganizerLayout>
      <Toaster position="top-right" />

      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* Breadcrumbs & Back */}
        <div className="flex items-center gap-4">
          <Link to="/organizer/events">
            <Button
              variant="ghost"
              className="rounded-2xl hover:bg-slate-100 px-3"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              <span className="font-bold text-sm">Kembali ke List Event</span>
            </Button>
          </Link>
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
              <Users className="w-8 h-8 text-primary" />
              Daftar Peserta
            </h1>
            <p className="text-slate-500 font-medium ml-11">
              Kelola dan pantau peserta yang telah membeli tiket.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button className="bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 rounded-2xl px-6 h-12 text-sm font-black shadow-sm group">
              <Download className="w-4 h-4 mr-2 group-hover:translate-y-0.5 transition-transform" />
              EXPORT CSV
            </Button>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-4xl shadow-sm border border-slate-100 flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest">
                Total Peserta
              </p>
              <h4 className="text-xl font-black text-slate-900">
                {attendees.length}
              </h4>
            </div>
          </div>
          <div className="bg-white p-6 rounded-4xl shadow-sm border border-slate-100 flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center">
              <Ticket className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest">
                Tiket Terjual
              </p>
              <h4 className="text-xl font-black text-slate-900">
                {totalTickets}
              </h4>
            </div>
          </div>
          <div className="bg-white p-6 rounded-4xl shadow-sm border border-slate-100 flex items-center gap-4">
            <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest">
                Total Pendapatan
              </p>
              <h4 className="text-xl font-black text-slate-900">
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                }).format(totalRevenue)}
              </h4>
            </div>
          </div>
        </div>

        {/* Search & Actions */}
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 p-8">
          <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative group flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cari nama atau email..."
                className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-900 focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all shadow-sm"
              />
            </div>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-slate-100">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Nama Peserta
                  </th>
                  <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Email
                  </th>
                  <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">
                    Jumlah Tiket
                  </th>
                  <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">
                    Total Bayar
                  </th>
                  <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-20 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest">
                          Memuat Peserta...
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : filteredAttendees.length > 0 ? (
                  filteredAttendees.map((attendee) => (
                    <tr
                      key={attendee.id}
                      className="hover:bg-slate-50/50 transition-colors group"
                    >
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-500 font-black group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                            <User size={18} />
                          </div>
                          <p className="text-sm font-black text-slate-900">
                            {attendee.user.name}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2 text-slate-500 font-bold text-sm">
                          <Mail size={14} className="text-slate-400" />
                          {attendee.user.email}
                        </div>
                      </td>
                      <td className="px-6 py-5 text-center">
                        <span className="inline-flex items-center justify-center px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs font-black ring-1 ring-blue-100">
                          {attendee.items.reduce(
                            (sum, item) => sum + item.quantity,
                            0,
                          )}{" "}
                          Tiket
                        </span>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <p className="text-sm font-black text-slate-900">
                          {new Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: "IDR",
                            minimumFractionDigits: 0,
                          }).format(attendee.finalPrice)}
                        </p>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center justify-center gap-2">
                          <Button
                            variant="ghost"
                            className="h-9 w-9 p-0 rounded-lg hover:bg-primary/10 hover:text-primary"
                          >
                            <Mail size={16} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-24 text-center">
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center">
                          <Users className="w-8 h-8 text-slate-300" />
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-lg font-black text-slate-900">
                            Belum Ada Peserta
                          </h4>
                          <p className="text-sm text-slate-500 font-medium">
                            Belum ada transaksi berhasil untuk event ini.
                          </p>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </OrganizerLayout>
  );
};
