import React from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { useReviewStore } from '../store/review.store';
import { useEventStore } from '../store/event.store';
import { useAuthStore } from '../store/auth.store';
import { getFullImageUrl } from '../lib/axiosInstance';
import { ReviewList } from '../components/reviews/ReviewList';
import { RatingDistribution } from '../components/reviews/RatingDistribution';
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
  Sparkles
} from 'lucide-react';
import { Button } from '../components/ui/button';
import type { Event } from '../types';

export const EventDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { getEventById, isLoading: isEventsLoading } = useEventStore();
  const { reviews, fetchReviewsByEventId, getAverageRatingForEvent } = useReviewStore();
  const { isAuthenticated, user } = useAuthStore();
  
  const [event, setEvent] = React.useState<Event | null>(null);
  const [loading, setLoading] = React.useState(true);

  const handleReserveClick = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: location.pathname } });
      return;
    }

    if (!user) {
      return;
    }

    navigate(`/checkout/${event?.id}`);
  };

  React.useEffect(() => {
    const loadData = async () => {
      if (id) {
        try {
            const data = await getEventById(id);
            setEvent(data || null);
            await fetchReviewsByEventId(id);
        } finally {
            setLoading(false);
        }
      }
    };
    loadData();
  }, [id, getEventById, fetchReviewsByEventId]);

  if (loading || isEventsLoading) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-500 font-bold animate-pulse">Menyiapkan detail event...</p>
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
          <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Event Tidak Ditemukan</h2>
          <p className="text-slate-500 mb-10 text-lg font-medium">Halaman yang kamu cari mungkin sudah dihapus atau dipindahkan.</p>
          <Button onClick={() => navigate('/')} className="px-10 py-6 rounded-2xl text-lg font-black bg-primary hover:bg-orange-600 shadow-xl shadow-primary/20 border-0">
            <ArrowLeft className="w-5 h-5 mr-2" /> KEMBALI KE BERANDA
          </Button>
        </div>
      </Layout>
    );
  }

  const averageRating = getAverageRatingForEvent(event.id);

  return (
    <Layout>
      <div className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb & Actions */}
          <div className="flex justify-between items-center mb-10">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-400">
              <Link to="/" className="hover:text-primary transition-colors">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <Link to="/discover" className="hover:text-primary transition-colors">Discover</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-slate-900 truncate max-w-[200px]">{event.title}</span>
            </div>
            <div className="flex gap-3">
              <button className="p-3 rounded-2xl border border-slate-100 bg-white text-slate-400 hover:text-primary hover:bg-slate-50 transition-all shadow-sm hover:shadow-xl hover:-translate-y-1">
                <Share2 className="w-5 h-5" />
              </button>
              <button className="p-3 rounded-2xl border border-slate-100 bg-white text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all shadow-sm hover:shadow-xl hover:-translate-y-1">
                <Heart className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Main Content (Left) */}
            <div className="lg:col-span-8 space-y-12">
              {/* Header Image */}
              <div className="relative group aspect-video rounded-[3rem] overflow-hidden shadow-3xl shadow-slate-200/50 border border-slate-100">
                <img 
                  src={getFullImageUrl(event.imageUrl)} 
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute top-8 left-8 flex gap-3">
                  <span className="px-6 py-3 bg-white/95 backdrop-blur-md rounded-2xl text-primary font-black text-sm shadow-2xl flex items-center gap-2 border border-orange-100">
                    <Zap className="w-4 h-4 fill-primary" /> {event.category.toUpperCase()}
                  </span>
                  {event.seatLeft < 20 && event.seatLeft > 0 && (
                    <span className="px-6 py-3 bg-red-500/90 backdrop-blur-md rounded-2xl text-white font-black text-sm shadow-2xl border border-red-400/20 animate-pulse">
                      SISA SEDIKIT!
                    </span>
                  )}
                </div>
              </div>

              {/* Quick Info Bar */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-white border border-slate-100 p-8 rounded-[2.5rem] shadow-2xl shadow-slate-100">
                <div className="flex items-center gap-4 px-2 border-r border-slate-100 last:border-0">
                  <div className="p-4 bg-orange-50 rounded-2xl text-primary">
                    <Calendar className="w-7 h-7" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-400 mb-0.5">Tanggal</p>
                    <p className="text-sm font-black text-slate-900 truncate">{new Date(event.startDate).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 px-2 border-r border-slate-100 last:border-0">
                  <div className="p-4 bg-blue-50 rounded-2xl text-blue-500">
                    <Clock className="w-7 h-7" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-400 mb-0.5">Waktu</p>
                    <p className="text-sm font-black text-slate-900">19:00 WIB</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 px-2 border-r border-slate-100 last:border-0">
                  <div className="p-4 bg-purple-50 rounded-2xl text-purple-500">
                    <MapPin className="w-7 h-7" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-400 mb-0.5">Lokasi</p>
                    <p className="text-sm font-black text-slate-900 truncate">
                      {event.location ? (typeof event.location === 'string' ? event.location.split(',')[0] : 'Lokasi TBA') : 'Lokasi TBA'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 px-2 last:border-0">
                  <div className="p-4 bg-yellow-50 rounded-2xl text-yellow-500">
                    <Star className="w-7 h-7 fill-current" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-400 mb-0.5">Rating</p>
                    <p className="text-sm font-black text-slate-900">{averageRating || 'BARU'}</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-8">
                <div className="flex items-center gap-6">
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight">Tentang Event</h2>
                  <div className="h-2 flex-1 bg-slate-50 rounded-full">
                    <div className="h-full w-24 bg-primary rounded-full" />
                  </div>
                </div>
                <p className="text-slate-600 leading-loose text-lg font-medium whitespace-pre-wrap">
                  {event.description}
                </p>
              </div>

              {/* Organizer */}
              <div className="bg-slate-50 p-12 rounded-[3.5rem] border border-slate-100 flex flex-col md:flex-row items-center gap-10 group overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary opacity-[0.03] rounded-full blur-3xl -mr-32 -mt-32" />
                
                <div className="w-28 h-28 rounded-3xl bg-white shadow-2xl flex items-center justify-center text-4xl font-black text-primary border border-slate-100 transform group-hover:rotate-6 transition-transform">
                  {event.organizer?.name ? event.organizer.name.charAt(0).toUpperCase() : '?'}
                </div>
                
                <div className="text-center md:text-left flex-1 min-w-0">
                  <p className="text-primary font-black uppercase tracking-[0.3em] text-[10px] mb-3">Diselenggarakan Oleh</p>
                  <h3 className="text-3xl font-black text-slate-900 mb-4 truncate">{event.organizer?.name || 'Organizer'}</h3>
                  <div className="flex flex-wrap justify-center md:justify-start gap-6">
                    <span className="flex items-center gap-2 text-xs font-bold text-slate-500"><ShieldCheck className="w-5 h-5 text-green-500" /> Verified Organizer</span>
                    <span className="flex items-center gap-2 text-xs font-bold text-slate-500 group-hover:text-primary transition-colors"><Star className="w-5 h-5 text-yellow-500 fill-current" /> High Rating</span>
                  </div>
                </div>
                
                <Link 
                  to={`/organizer/${encodeURIComponent(event.organizer.id)}`}
                  className="px-8 py-5 bg-white hover:bg-primary hover:text-white border border-slate-200 hover:border-primary text-slate-900 rounded-2xl font-black text-sm transition-all shadow-sm hover:shadow-xl hover:shadow-primary/20"
                >
                  LIHAT PROFIL
                </Link>
              </div>

              {/* Reviews */}
              <div className="space-y-12 pt-10">
                <div className="flex items-end justify-between">
                  <div className="space-y-2">
                     <h2 className="text-3xl font-black text-slate-900 tracking-tight">Review Komunitas</h2>
                     <p className="text-slate-500 font-medium">Apa kata mereka yang sudah merasakan keseruannya</p>
                  </div>
                  <div className="text-right">
                    <div className="text-5xl font-black text-slate-900 flex items-center gap-3 justify-end">
                      {averageRating} <Star className="w-10 h-10 text-yellow-400 fill-current" />
                    </div>
                    <p className="text-slate-400 font-bold mt-1 text-xs uppercase tracking-widest">{reviews.length} TOTAL REVIEWS</p>
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
                <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-3xl shadow-slate-200/50 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-primary/10 transition-colors" />
                  
                  <div className="relative z-10">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6">Informasi Tiket</p>
                    <div className="flex flex-col mb-10">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Harga Mulai Dari</span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-5xl font-black text-slate-900 tracking-tighter">Rp {event.price.toLocaleString()}</span>
                        <span className="text-slate-400 font-bold text-sm">/pax</span>
                      </div>
                    </div>

                    <div className="space-y-4 mb-10">
                      <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100 flex items-center justify-between group-hover:border-primary/20 transition-all">
                        <span className="flex items-center gap-3 text-slate-500 font-bold"><Users className="w-5 h-5 text-primary" /> Kapasitas</span>
                        <span className="text-slate-900 font-black">{event.seatLeft} <span className="text-slate-400 text-xs">Tersisa</span></span>
                      </div>
                      <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100 flex items-center justify-between group-hover:border-primary/20 transition-all">
                        <span className="flex items-center gap-3 text-slate-500 font-bold"><ShieldCheck className="w-5 h-5 text-primary" /> Keamanan</span>
                        <span className="text-slate-900 font-black uppercase text-xs tracking-widest">Terjamin</span>
                      </div>
                    </div>

                    <Button 
                      onClick={handleReserveClick}
                      disabled={event.seatLeft <= 0}
                      className="w-full py-8 rounded-2xl bg-primary hover:bg-orange-600 text-white shadow-2xl shadow-primary/30 text-xl font-black uppercase tracking-widest transition-all hover:-translate-y-1 active:scale-95 border-0"
                    >
                      {event.seatLeft > 0 ? (isAuthenticated ? 'PESAN SEKARANG' : 'MASUK UNTUK PESAN') : 'HABIS TERJUAL'}
                    </Button>

                    <p className="text-center text-[10px] text-slate-400 font-bold mt-8 tracking-tight uppercase tracking-[0.1em]">
                      Konfirmasi Instan &bull; E-Ticket Langsung Dikirim
                    </p>
                  </div>
                </div>

                {/* Promo Card */}
                <div className="bg-primary p-8 rounded-[2.5rem] text-white shadow-2xl shadow-primary/20 relative overflow-hidden group">
                  <div className="absolute -right-8 -bottom-8 opacity-20 transform rotate-12 transition-transform group-hover:rotate-0">
                    <Sparkles className="w-32 h-32" />
                  </div>
                  <div className="relative z-10">
                    <h4 className="font-black text-xl mb-2">Beli Banyak Lebih Hemat!</h4>
                    <p className="text-white/80 text-sm font-medium leading-relaxed mb-6">Gunakan kode PROMOEVENT untuk diskon 10% untuk pembelian minimal 5 tiket.</p>
                    <button className="text-white font-black text-xs underline decoration-2 underline-offset-4 hover:text-orange-100 transition-colors uppercase tracking-widest">Cek Promo Lainnya →</button>
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
