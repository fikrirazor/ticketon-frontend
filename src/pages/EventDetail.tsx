import React from "react";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import { Layout } from "../components/Layout";
import { useAuthStore } from "../store/auth.store";
import { getFullImageUrl } from "../lib/axiosInstance";
import { ReviewList } from "../components/reviews/ReviewList";
import { RatingDistribution } from "../components/reviews/RatingDistribution";
import {
  Star,
  Calendar,
  MapPin,
  Users,
  Clock,
  ArrowLeft,
  Share2,
  Heart,
  ShieldCheck,
  Zap,
  Info,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { Button } from "../components/ui/button";
import type { Event } from "../types";

import { useEvent } from "../hooks/useEvents";
import { useEventReviews } from "../hooks/useReviews";

export const EventDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { data: event, isLoading: isEventLoading } = useEvent(id || "");
  const { data: reviewsData, isLoading: isReviewsLoading } = useEventReviews(
    id || "",
  );
  const reviews = reviewsData?.reviews || [];
  const { isAuthenticated, user } = useAuthStore();

  const handleReserveClick = () => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: location.pathname } });
      return;
    }

    if (!user) {
      return;
    }

    navigate(`/checkout/${event?.id}`);
  };

  if (isEventLoading || isReviewsLoading) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-500 font-bold animate-pulse">
            Menyiapkan detail event...
          </p>
        </div>
      </Layout>
    );
  }

  if (!event) {
    return (
      <Layout>
        <div className="max-w-2xl mx-auto py-32 px-4 text-center">
          <div className="bg-red-50 w-24 h-24 rounded-[2rem] flex items-center justify-center mx-auto mb-8 text-red-500 shadow-xl shadow-red-100">
            <Info className="w-12 h-12" />
          </div>
          <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">
            Event Tidak Ditemukan
          </h2>
          <p className="text-slate-500 mb-10 text-lg font-medium">
            Halaman yang kamu cari mungkin sudah dihapus atau dipindahkan.
          </p>
          <Button
            onClick={() => navigate("/")}
            className="px-10 py-6 rounded-2xl text-lg font-black bg-primary hover:bg-orange-600 shadow-xl shadow-primary/20 border-0"
          >
            <ArrowLeft className="w-5 h-5 mr-2" /> KEMBALI KE BERANDA
          </Button>
        </div>
      </Layout>
    );
  }

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce(
            (acc: number, r: { rating: number }) => acc + r.rating,
            0,
          ) / reviews.length
        ).toFixed(1)
      : "0.0";

  return (
    <Layout>
      <div className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb & Actions */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
              <Link to="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3 h-3" />
              <Link
                to="/discover"
                className="hover:text-primary transition-colors"
              >
                Discover
              </Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-slate-900 truncate max-w-[200px]">
                {event.title}
              </span>
            </div>
            <div className="flex gap-2">
              <button className="p-2.5 rounded-xl border border-slate-100 bg-white text-slate-400 hover:text-primary hover:bg-slate-50 transition-all shadow-sm">
                <Share2 className="w-4 h-4" />
              </button>
              <button className="p-2.5 rounded-xl border border-slate-100 bg-white text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all shadow-sm">
                <Heart className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Main Content (Left) */}
            <div className="lg:col-span-8 space-y-12">
              {/* Header Image */}
              <div className="relative group aspect-video rounded-3xl overflow-hidden shadow-2xl border border-slate-100">
                <img
                  src={getFullImageUrl(event.imageUrl)}
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute top-6 left-6 flex gap-2">
                  <span className="px-4 py-2 bg-white/95 backdrop-blur-md rounded-xl text-primary font-bold text-xs shadow-xl flex items-center gap-2 border border-slate-100 uppercase tracking-wider">
                    <Zap className="w-3.5 h-3.5 fill-primary" />{" "}
                    {event.category}
                  </span>
                  {event.seatLeft < 20 && event.seatLeft > 0 && (
                    <span className="px-4 py-2 bg-red-500 rounded-xl text-white font-bold text-xs shadow-xl border border-red-400/20">
                      SISA SEDIKIT!
                    </span>
                  )}
                </div>
              </div>

              {/* Quick Info Bar */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-slate-50/50 border border-slate-100 p-6 rounded-3xl">
                <div className="flex flex-col gap-1 p-2">
                  <div className="flex items-center gap-2 text-slate-400">
                    <Calendar className="w-3.5 h-3.5" />
                    <span className="text-[10px] uppercase font-bold tracking-wider">
                      Tanggal
                    </span>
                  </div>
                  <p className="text-sm font-bold text-slate-900">
                    {new Date(event.startDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex flex-col gap-1 p-2 border-l border-slate-100">
                  <div className="flex items-center gap-2 text-slate-400">
                    <Clock className="w-3.5 h-3.5" />
                    <span className="text-[10px] uppercase font-bold tracking-wider">
                      Waktu
                    </span>
                  </div>
                  <p className="text-sm font-bold text-slate-900">19:00 WIB</p>
                </div>
                <div className="flex flex-col gap-1 p-2 border-l border-slate-100">
                  <div className="flex items-center gap-2 text-slate-400">
                    <MapPin className="w-3.5 h-3.5" />
                    <span className="text-[10px] uppercase font-bold tracking-wider">
                      Lokasi
                    </span>
                  </div>
                  <p className="text-sm font-bold text-slate-900 truncate">
                    {typeof event.location === "object"
                      ? event.location.city
                      : event.location || "Lokasi TBA"}
                  </p>
                </div>
                <div className="flex flex-col gap-1 p-2 border-l border-slate-100">
                  <div className="flex items-center gap-2 text-slate-400">
                    <Star className="w-3.5 h-3.5" />
                    <span className="text-[10px] uppercase font-bold tracking-wider">
                      Rating
                    </span>
                  </div>
                  <p className="text-sm font-bold text-slate-900">
                    {event.rating && event.rating > 0
                      ? event.rating.toFixed(1)
                      : "BARU"}
                  </p>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-8">
                <div className="flex items-center gap-6">
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                    Tentang Event
                  </h2>
                  <div className="h-2 flex-1 bg-slate-50 rounded-full">
                    <div className="h-full w-24 bg-primary rounded-full" />
                  </div>
                </div>
                <p className="text-slate-600 leading-loose text-lg font-medium whitespace-pre-wrap">
                  {event.description}
                </p>
              </div>

              {/* Organizer */}
              <div className="bg-slate-50 p-8 md:p-10 rounded-3xl border border-slate-100 flex flex-col md:flex-row items-center gap-8 group">
                <div className="w-20 h-20 rounded-2xl bg-white shadow-sm flex items-center justify-center text-3xl font-bold text-primary border border-slate-100">
                  {event.organizer?.name
                    ? event.organizer.name.charAt(0).toUpperCase()
                    : "?"}
                </div>

                <div className="text-center md:text-left flex-1 min-w-0">
                  <p className="text-slate-400 font-bold uppercase tracking-wider text-[10px] mb-1">
                    Diselenggarakan Oleh
                  </p>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2 truncate">
                    {event.organizer?.name || "Organizer"}
                  </h3>
                  <div className="flex flex-wrap justify-center md:justify-start gap-4">
                    <span className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                      <ShieldCheck className="w-4 h-4 text-emerald-500" />
                      Verified
                    </span>
                    {event.rating && event.rating > 4.5 && (
                      <span className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                        <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                        Top Rated
                      </span>
                    )}
                  </div>
                </div>

                <Link
                  to={`/organizer/${encodeURIComponent(event.organizer.id)}`}
                  className="px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 rounded-xl font-bold text-xs transition-all shadow-sm"
                >
                  LIHAT PROFIL
                </Link>
              </div>

              {/* Reviews */}
              <div className="space-y-12 pt-10">
                <div className="flex items-end justify-between">
                  <div className="space-y-2">
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                      Review Komunitas
                    </h2>
                    <p className="text-slate-500 font-medium">
                      Apa kata mereka yang sudah merasakan keseruannya
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-5xl font-black text-slate-900 flex items-center gap-3 justify-end">
                      {averageRating}{" "}
                      <Star className="w-10 h-10 text-yellow-400 fill-current" />
                    </div>
                    <p className="text-slate-400 font-bold mt-1 text-xs uppercase tracking-widest">
                      {reviews.length} TOTAL REVIEWS
                    </p>
                  </div>
                </div>
                <div className="bg-slate-50 rounded-[3rem] p-10 border border-slate-100">
                  <RatingDistribution reviews={reviews} />
                  <div className="mt-12">
                    <ReviewList reviews={reviews} />
                  </div>
                </div>
              </div>
            </div>

            {/* Checkout Sticky (Right) */}
            <div className="lg:col-span-4">
              <div className="sticky top-28 space-y-8">
                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40 relative overflow-hidden group">
                  <div className="relative z-10">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-6">
                      Informasi Tiket
                    </p>
                    <div className="flex flex-col mb-8">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                        Harga Mulai Dari
                      </span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-black text-slate-900">
                          Rp {event.price.toLocaleString()}
                        </span>
                        <span className="text-slate-400 font-bold text-sm">
                          /pax
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3 mb-8">
                      <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                        <span className="flex items-center gap-2.5 text-slate-500 font-bold text-xs">
                          <Users className="w-4 h-4 text-primary/70" />{" "}
                          Kapasitas
                        </span>
                        <span className="text-slate-900 font-bold text-sm">
                          {event.seatLeft}{" "}
                          <span className="text-slate-400 text-[10px]">
                            Tersisa
                          </span>
                        </span>
                      </div>
                      <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                        <span className="flex items-center gap-2.5 text-slate-500 font-bold text-xs">
                          <ShieldCheck className="w-4 h-4 text-primary/70" />{" "}
                          Jaminan
                        </span>
                        <span className="text-slate-900 font-bold text-[10px] uppercase tracking-wider">
                          Tiket 100% Aman
                        </span>
                      </div>
                    </div>

                    <Button
                      onClick={handleReserveClick}
                      disabled={event.seatLeft <= 0}
                      className="w-full py-7 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold uppercase tracking-wider transition-all border-0"
                    >
                      {event.seatLeft > 0
                        ? isAuthenticated
                          ? "PESAN SEKARANG"
                          : "MASUK UNTUK PESAN"
                        : "HABIS TERJUAL"}
                    </Button>

                    <p className="text-center text-[10px] text-slate-400 font-medium mt-6 tracking-wide uppercase">
                      Konfirmasi Instan &bull; E-Ticket Langsung Dikirim
                    </p>
                  </div>
                </div>

                {/* Promo Card */}
                <div className="bg-slate-900 p-8 rounded-3xl text-white relative overflow-hidden group">
                  <div className="absolute -right-6 -bottom-6 opacity-10 transform rotate-12 transition-transform group-hover:rotate-0">
                    <Sparkles className="w-24 h-24" />
                  </div>
                  <div className="relative z-10">
                    <h4 className="font-bold text-lg mb-2">
                      Beli Banyak Lebih Hemat!
                    </h4>
                    <p className="text-slate-400 text-xs font-medium leading-relaxed mb-6">
                      Gunakan kode PROMOEVENT untuk diskon 10% untuk pembelian
                      minimal 5 tiket.
                    </p>
                    <button className="text-primary font-bold text-[10px] uppercase tracking-widest hover:text-primary/80 transition-colors">
                      Cek Promo Lainnya →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
