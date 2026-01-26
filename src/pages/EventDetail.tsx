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
  Info
} from 'lucide-react';
import { Button } from '../components/ui/Button';
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
      console.warn('User not authenticated, redirecting to login');
      navigate('/login', { state: { from: location.pathname } });
      return;
    }

    if (!user) {
      console.warn('User data not loaded, waiting...');
      return;
    }

    console.log('User authenticated, navigating to checkout:', { eventId: event?.id, user });
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
          <p className="text-gray-500 font-medium animate-pulse">Loading event details...</p>
        </div>
      </Layout>
    );
  }

  if (!event) {
    return (
      <Layout>
        <div className="max-w-2xl mx-auto py-20 px-4 text-center">
          <div className="bg-red-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-red-500">
            <Info className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Event Not Found</h2>
          <p className="text-gray-600 mb-8 text-lg">The event you're looking for might have been canceled or removed.</p>
          <Button onClick={() => navigate('/')} className="px-8 py-6 rounded-2xl text-lg font-bold">
            <ArrowLeft className="w-5 h-5 mr-2" /> Back to Discovery
          </Button>
        </div>
      </Layout>
    );
  }

  const averageRating = getAverageRatingForEvent(event.id);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb & Actions */}
        <div className="flex justify-between items-center mb-8">
          <Link to="/" className="inline-flex items-center text-gray-500 hover:text-primary transition-colors font-medium">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Events
          </Link>
          <div className="flex gap-2">
            <button className="p-2.5 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 transition-all hover:border-gray-300 shadow-sm">
              <Share2 className="w-5 h-5" />
            </button>
            <button className="p-2.5 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 transition-all hover:border-gray-300 shadow-sm">
              <Heart className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Content (Left) */}
          <div className="lg:col-span-8 space-y-10">
            {/* Header Image */}
            <div className="relative group aspect-[16/9] md:aspect-[21/9] rounded-[2.5rem] overflow-hidden shadow-2xl bg-gray-100">
              <img 
                src={getFullImageUrl(event.imageUrl)} 
                alt={event.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
              <div className="absolute top-6 left-6 flex gap-2">
                <span className="px-5 py-2.5 bg-white/95 backdrop-blur-md rounded-2xl text-primary font-bold text-sm shadow-xl flex items-center gap-2">
                  <Zap className="w-4 h-4" /> {event.category}
                </span>
                {event.seatLeft < 20 && event.seatLeft > 0 && (
                  <span className="px-5 py-2.5 bg-orange-500/95 backdrop-blur-md rounded-2xl text-white font-bold text-sm shadow-xl border border-white/20">
                    Low Spots LEFT
                  </span>
                )}
              </div>
            </div>

            {/* Quick Info Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white/50 backdrop-blur-xl border border-white p-6 rounded-[2.5rem] shadow-xl shadow-gray-200/50">
              <div className="flex items-center gap-4 px-4 py-2 border-r border-gray-100 last:border-0">
                <div className="p-3 bg-primary/10 rounded-2xl">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider font-extrabold text-gray-400">Date</p>
                  <p className="text-sm font-black text-gray-900 truncate">{new Date(event.startDate).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 px-4 py-2 border-r border-gray-100 last:border-0">
                <div className="p-3 bg-blue-500/10 rounded-2xl">
                  <Clock className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider font-extrabold text-gray-400">Time</p>
                  <p className="text-sm font-black text-gray-900">19:00 - 23:00</p>
                </div>
              </div>
              <div className="flex items-center gap-4 px-4 py-2 border-r border-gray-100 last:border-0">
                <div className="p-3 bg-purple-500/10 rounded-2xl">
                  <MapPin className="w-6 h-6 text-purple-500" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider font-extrabold text-gray-400">Location</p>
                  <p className="text-sm font-black text-gray-900 truncate">{event.location.split(',')[0]}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 px-4 py-2 last:border-0">
                <div className="p-3 bg-green-500/10 rounded-2xl">
                  <Star className="w-6 h-6 text-green-500 fill-green-500" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider font-extrabold text-gray-400">Rating</p>
                  <p className="text-sm font-black text-gray-900">{averageRating || 'New'}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-6 px-4">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-4">
                About this Event <div className="h-1 flex-1 bg-gray-50 rounded-full"></div>
              </h2>
              <p className="text-gray-600 leading-loose text-lg font-medium whitespace-pre-wrap">
                {event.description}
              </p>
            </div>

            {/* Organizer */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                <div className="w-24 h-24 rounded-[2rem] bg-gradient-to-tr from-primary to-orange-400 p-1">
                  <div className="w-full h-full rounded-[1.8rem] bg-white flex items-center justify-center text-3xl font-black text-primary">
                    {event.organizer?.name ? event.organizer.name.charAt(0) : '?'}
                  </div>
                </div>
                <div className="text-center md:text-left flex-1">
                  <p className="text-primary font-black uppercase tracking-[0.2em] text-xs mb-2">Organized By</p>
                  <h3 className="text-3xl font-black mb-3">{event.organizer?.name || 'Unknown Organizer'}</h3>
                  <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm font-bold text-slate-300">
                    <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-green-400" /> Verified Organizer</span>
                    <span className="flex items-center gap-2"><Star className="w-4 h-4 text-yellow-400" /> Top Rated</span>
                  </div>
                </div>
                <Link 
                  to={`/organizer/${encodeURIComponent(event.organizer.id)}`}
                  className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/10 rounded-2xl font-black transition-all hover:scale-105 active:scale-95"
                >
                  View Profile
                </Link>
              </div>
            </div>

            {/* Reviews */}
            <div className="space-y-8 px-4 pt-10">
              <div className="flex justify-between items-end">
                <div>
                   <h2 className="text-3xl font-black text-gray-900 tracking-tight">Community Reviews</h2>
                   <p className="text-gray-500 font-bold mt-1">What people are saying about this event</p>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-black text-gray-900">{averageRating}</div>
                  <div className="flex gap-0.5 mt-1">
                    {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-primary text-primary" />)}
                  </div>
                </div>
              </div>
              <RatingDistribution reviews={reviews} />
              <ReviewList reviews={reviews} />
            </div>
          </div>

          {/* Checkout (Right) */}
          <div className="lg:col-span-4">
            <div className="sticky top-10 space-y-6">
              <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-2xl shadow-gray-200/50 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-primary/10 transition-colors"></div>
                
                <p className="text-xs font-black uppercase tracking-[0.3em] text-gray-400 mb-4">Official Ticket</p>
                <div className="flex items-baseline gap-2 mb-8">
                  <span className="text-4xl font-black text-gray-900">Rp {event.price.toLocaleString()}</span>
                  <span className="text-gray-400 font-bold">/ Person</span>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="p-5 rounded-3xl bg-gray-50 border border-gray-100 flex items-center justify-between group-hover:bg-white group-hover:border-primary/20 transition-all">
                    <span className="flex items-center gap-3 text-gray-600 font-bold"><Users className="w-5 h-5 text-primary" /> Availability</span>
                    <span className="text-gray-900 font-black">{event.seatLeft} / {event.seatTotal}</span>
                  </div>
                  <div className="p-5 rounded-3xl bg-gray-50 border border-gray-100 flex items-center justify-between group-hover:bg-white group-hover:border-primary/20 transition-all">
                    <span className="flex items-center gap-3 text-gray-600 font-bold"><ShieldCheck className="w-5 h-5 text-primary" /> Multi-Day Entry</span>
                    <span className="text-gray-900 font-black">Inc.</span>
                  </div>
                </div>

                <Button 
                  onClick={handleReserveClick}
                  disabled={event.seatLeft <= 0}
                  className="w-full py-8 rounded-[2rem] bg-gradient-to-r from-primary to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-2xl shadow-orange-500/40 text-lg font-black uppercase tracking-widest transition-all hover:-translate-y-1 active:scale-95"
                >
                  {event.seatLeft > 0 ? 'Reserve Spot' : 'Sold Out'}
                </Button>

                <p className="text-center text-xs text-gray-400 font-bold mt-6 tracking-tight">
                  Price inclusive of all taxes. Free cancellation within 24h.
                </p>
              </div>

              {/* Promo Card */}
              <div className="bg-primary/5 p-8 rounded-[2.5rem] border border-primary/10">
                <h4 className="font-black text-gray-900 mb-2">Planning for group?</h4>
                <p className="text-sm text-gray-600 font-medium leading-relaxed mb-4">Get 10% off for bookings over 5 people. Limited time offer!</p>
                <button className="text-primary font-black text-sm hover:underline">Learn More →</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

