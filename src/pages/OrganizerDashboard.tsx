import React, { useEffect } from "react";
import { useOrganizerStore } from "../store/organizer.store";
import { useAuthStore } from "../store/auth.store";
import {
  Calendar,
  DollarSign,
  Users,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { OrganizerLayout } from "../components/OrganizerLayout";

export const OrganizerDashboard: React.FC = () => {
  const { user } = useAuthStore();
  const {
    stats,
    events,
    transactions,
    isLoading,
    error: storeError,
    fetchStats,
    fetchEvents,
    fetchTransactions,
  } = useOrganizerStore();

  useEffect(() => {
    fetchStats();
    fetchEvents();
    fetchTransactions();
  }, [fetchStats, fetchEvents, fetchTransactions]);

  if (isLoading && !stats) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "DONE":
      case "SUCCESS":
        return "bg-green-100 text-green-700 border-green-200";
      case "WAITING_PAYMENT":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "WAITING_ADMIN":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "CANCELED":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  return (
    <OrganizerLayout>
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* Error Display */}
        {storeError && (
          <div className="bg-red-50 border border-red-100 text-red-700 px-6 py-4 rounded-[2rem] flex items-center gap-3">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p className="text-sm font-bold">{storeError}</p>
          </div>
        )}
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Dashboard Penyelenggara
            </h1>
            <p className="text-slate-500 font-medium">
              Selamat datang kembali, {user?.name}.
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Pendapatan"
            value={formatCurrency(stats?.totalRevenue || 0)}
            icon={<DollarSign className="w-6 h-6 text-emerald-600" />}
            trend="+12.5%"
            color="bg-emerald-50"
          />
          <StatCard
            title="Tiket Terjual"
            value={stats?.totalTicketsSold?.toString() || "0"}
            icon={<Users className="w-6 h-6 text-blue-600" />}
            trend="+8.2%"
            color="bg-blue-50"
          />
          <StatCard
            title="Total Event"
            value={stats?.totalEvents?.toString() || "0"}
            icon={<Calendar className="w-6 h-6 text-orange-600" />}
            color="bg-orange-50"
          />
          <StatCard
            title="Event Aktif"
            value={stats?.activeEvents?.toString() || "0"}
            icon={<TrendingUp className="w-6 h-6 text-purple-600" />}
            color="bg-purple-50"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Events List */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 p-8">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-black text-slate-900">
                  Event Anda
                </h3>
                <Link
                  to="/organizer/events"
                  className="text-sm font-black text-primary hover:underline uppercase tracking-wider"
                >
                  Lihat Semua
                </Link>
              </div>

              <div className="space-y-4">
                {events.length > 0 ? (
                  events.slice(0, 5).map((event) => (
                    <div
                      key={event.id}
                      className="group flex items-center gap-4 p-4 rounded-3xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all"
                    >
                      <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 flex-shrink-0">
                        <img
                          src={
                            event.imageUrl ||
                            "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=200"
                          }
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-black text-slate-900 truncate">
                          {event.title}
                        </h4>
                        <div className="flex items-center gap-3 text-xs text-slate-500 font-bold mt-1">
                          <span className="flex items-center gap-1">
                            <Calendar size={12} />{" "}
                            {new Date(event.startDate).toLocaleDateString(
                              "id-ID",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              },
                            )}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users size={12} /> {event.seatLeft} Sisa
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <AlertCircle className="w-8 h-8 text-slate-300" />
                    </div>
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">
                      Belum Ada Event
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="space-y-6">
            <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 p-8">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-black text-slate-900">
                  Transaksi Terbaru
                </h3>
              </div>

              <div className="space-y-6">
                {transactions.length > 0 ? (
                  transactions.slice(0, 5).map((tx) => (
                    <div
                      key={tx.id}
                      className="relative pl-6 border-l-2 border-slate-100"
                    >
                      <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-white border-2 border-primary"></div>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-black text-slate-900 truncate pr-2">
                            {tx.user?.name || "Unknown User"}
                          </p>
                          <p className="text-xs font-black text-primary">
                            {formatCurrency(tx.finalPrice)}
                          </p>
                        </div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider truncate mb-2">
                          {tx.event?.title || "Unknown Event"}
                        </p>
                        <div className="flex items-center justify-between">
                          <span
                            className={`text-[8px] font-black px-2 py-1 rounded-full border uppercase tracking-widest ${getStatusColor(tx.status)}`}
                          >
                            {tx.status}
                          </span>
                          <span className="text-[8px] font-bold text-slate-400">
                            {new Date(tx.createdAt).toLocaleDateString(
                              "id-ID",
                              { day: "2-digit", month: "2-digit" },
                            )}{" "}
                            {new Date(tx.createdAt).toLocaleTimeString(
                              "id-ID",
                              { hour: "2-digit", minute: "2-digit" },
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">
                      Belum Ada Transaksi
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </OrganizerLayout>
  );
};

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: string;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  trend,
  color,
}) => (
  <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 p-8 hover:shadow-xl hover:shadow-slate-200/50 transition-all group">
    <div className="flex items-start justify-between">
      <div
        className={`p-4 rounded-2xl ${color} group-hover:scale-110 transition-transform`}
      >
        {icon}
      </div>
      {trend && (
        <span className="flex items-center text-xs font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
          {trend}
        </span>
      )}
    </div>
    <div className="mt-6">
      <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">
        {title}
      </p>
      <h4 className="text-2xl font-black text-slate-900 tracking-tight">
        {value}
      </h4>
    </div>
  </div>
);
