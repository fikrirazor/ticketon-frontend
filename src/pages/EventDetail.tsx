import { useParams, Link } from 'react-router-dom';
import { useEventStore } from '../store/event.store';
import { Layout } from '../components/Layout';
import { Button } from '../components/ui/Button';
import { Calendar, MapPin, Users, Share2, Heart, ArrowLeft, Star } from 'lucide-react';
import { useReviewStore } from '../store/review.store';
import { ReviewList } from '../components/reviews/ReviewList';
import { RatingDistribution } from '../components/reviews/RatingDistribution';

export const EventDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { getEventById } = useEventStore();
  const { getReviewsByEventId, getAverageRatingForEvent } = useReviewStore();
  
  const event = getEventById(id || '');
  const reviews = getReviewsByEventId(id || '');
  const averageRating = getAverageRatingForEvent(id || '');

  if (!event) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Event Not Found</h2>
          <p className="text-gray-500 mb-6">The event you are looking for does not exist or has been removed.</p>
          <Link to="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const date = new Date(event.date).toLocaleDateString('en-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <Layout>
      <div className="mb-6">
        <Link to="/" className="inline-flex items-center text-sm text-gray-500 hover:text-primary transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Events
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100 bg-white">
            <div className="relative h-64 md:h-96 w-full">
              <img
                src={event.imageUrl}
                alt={event.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 flex gap-2">
                <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full text-gray-700 hover:text-primary transition-colors shadow-sm">
                  <Share2 className="w-5 h-5" />
                </button>
                <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full text-gray-700 hover:text-red-500 transition-colors shadow-sm">
                  <Heart className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 md:p-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full uppercase tracking-wider">
                  {event.category}
                </span>
                <span className={`px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wider ${event.seatsLeft > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {event.seatsLeft > 0 ? 'Available' : 'Sold Out'}
                </span>
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-2">{event.title}</h1>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-yellow-50 rounded-xl border border-yellow-100">
                  <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                  <span className="text-sm font-black text-yellow-700">{averageRating || 'No rating'}</span>
                  <span className="text-xs text-yellow-600 font-bold ml-1">({reviews.length} reviews)</span>
                </div>
                <div className="h-4 w-px bg-slate-200" />
                <Link to={`/organizer/${encodeURIComponent(event.organizer)}`} className="text-sm font-bold text-slate-500 hover:text-primary transition-colors uppercase tracking-widest">
                  View Organizer Profle
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                 <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                        <Calendar className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Date & Time</p>
                        <p className="font-semibold text-gray-900">{date}</p>
                    </div>
                 </div>
                 
                 <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                        <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Location</p>
                        <p className="font-semibold text-gray-900">{event.location}</p>
                    </div>
                 </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900">About this event</h3>
                <p className="text-gray-600 leading-relaxed">
                  {event.description}
                </p>
                <p className="text-gray-600 leading-relaxed">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>

               <div className="mt-8 pt-8 border-t border-gray-100">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-xl font-bold text-gray-500">
                        {event.organizer.charAt(0)}
                    </div>
                </div>
               </div>
            </div>

            {/* Reviews Section */}
            <div className="p-6 md:p-8 space-y-10 border-t border-gray-100 bg-slate-50/30">
               <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Event Reviews</h2>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                  <div className="md:col-span-4">
                     <RatingDistribution reviews={reviews} />
                  </div>
                  <div className="md:col-span-8">
                     <ReviewList reviews={reviews} />
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* Sidebar / Ticket Panel */}
        <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-4">
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                    <div className="mb-6">
                        <p className="text-sm text-gray-500 mb-1">Ticket Price</p>
                        <div className="flex items-baseline gap-1">
                            <span className="text-3xl font-bold text-primary">Rp {event.price.toLocaleString('id-ID')}</span>
                            <span className="text-gray-400 text-sm">/person</span>
                        </div>
                    </div>

                    <div className="space-y-4 mb-6">
                       <div className="flex justify-between items-center text-sm py-2 border-b border-gray-50">
                            <span className="flex items-center gap-2 text-gray-600"><Users className="w-4 h-4"/> Seats Left</span>
                            <span className="font-semibold">{event.seatsLeft}</span>
                       </div>
                       <div className="flex justify-between items-center text-sm py-2 border-b border-gray-50">
                            <span className="text-gray-600">Total Capacity</span>
                            <span className="font-semibold">{event.seatsTotal}</span>
                       </div>
                    </div>

                    <Button className="w-full h-12 text-lg font-semibold bg-primary hover:bg-orange-600 shadow-xl shadow-orange-500/20" disabled={event.seatsLeft === 0}>
                        {event.seatsLeft > 0 ? 'Book Ticket Now' : 'Sold Out'}
                    </Button>
                    
                    <p className="text-center text-xs text-gray-400 mt-4">
                        Secure payment powered by Ticketon
                    </p>
                </div>
            </div>
        </div>
      </div>
    </Layout>
  );
};
