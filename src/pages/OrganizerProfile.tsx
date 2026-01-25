import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { useReviewStore } from '../store/review.store';
import type { Organizer } from '../types';
import { ReviewList } from '../components/reviews/ReviewList';
import { RatingDistribution } from '../components/reviews/RatingDistribution';
import { Star, Calendar, ArrowLeft, Award, Globe } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const OrganizerProfile: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const decodedName = decodeURIComponent(name || '');
  
  const { fetchOrganizerByName, fetchReviewsByOrganizerId } = useReviewStore();
  const [organizer, setOrganizer] = React.useState<Organizer | null>(null);
  const [loading, setLoading] = React.useState(true);
  
  React.useEffect(() => {
    const loadData = async () => {
        if (!decodedName) {
            setLoading(false);
            return;
        }
        const org = await fetchOrganizerByName(decodedName);
        if (org) {
            setOrganizer(org);
            await fetchReviewsByOrganizerId(org.id);
        }
        setLoading(false);
    };
    loadData();
  }, [decodedName, fetchOrganizerByName, fetchReviewsByOrganizerId]);

  const reviews = useReviewStore((state) => state.reviews);

  if (loading) {
    return (
        <Layout>
          <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-gray-500 font-medium">Loading organizer profile...</p>
          </div>
        </Layout>
      );
  }

  if (!organizer) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
          <h2 className="text-2xl font-black text-slate-900 mb-2 uppercase">Organizer Not Found</h2>
          <p className="text-slate-500 font-medium mb-6">The organizer profile you are looking for does not exist.</p>
          <Link to="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Breadcrumbs/Back Link */}
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-sm font-black text-slate-400 hover:text-primary transition-colors uppercase tracking-widest">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Discovery
          </Link>
        </div>

        {/* Header Section */}
        <div className="bg-white rounded-4xl border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden mb-12">
            <div className="h-48 bg-linear-to-r from-primary/80 to-secondary/80 relative">
                <div className="absolute -bottom-12 left-8 p-1 bg-white rounded-3xl shadow-lg">
                    <img 
                        src={organizer.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(organizer.name)}&background=random`} 
                        alt={organizer.name}
                        className="w-32 h-32 rounded-2xl object-cover border-4 border-white"
                    />
                </div>
            </div>
            
            <div className="pt-16 pb-8 px-8 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                <div className="space-y-2">
                    <div className="flex items-center gap-3">
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight">{organizer.name}</h1>
                        <div className="bg-primary/10 px-2 py-0.5 rounded-lg">
                            <Award className="w-5 h-5 text-primary" />
                        </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-slate-500 font-bold text-sm uppercase tracking-widest">
                        <div className="flex items-center gap-1.5">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-slate-900">{organizer.averageRating}</span>
                            <span>({organizer.totalReviews} reviews)</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4" />
                            <span>{organizer.totalEvents} Events organized</span>
                        </div>
                    </div>
                </div>

                <div className="flex gap-3">
                    <Button variant="outline" className="rounded-2xl border-slate-200">
                        <Globe className="w-4 h-4 mr-2" /> Website
                    </Button>
                    <Button className="rounded-2xl">
                        Follow Organizer
                    </Button>
                </div>
            </div>

            <div className="px-8 pb-8">
                <div className="max-w-3xl">
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-3">About the Organizer</h3>
                    <p className="text-slate-600 leading-relaxed font-medium">
                        {organizer.bio}
                    </p>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content - Reviews List */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-3">
                    Customer Reviews
                    <span className="bg-slate-100 text-slate-500 text-xs px-2 py-1 rounded-lg">{reviews.length}</span>
                </h2>
            </div>
            
            <ReviewList reviews={reviews} />
          </div>

          {/* Sidebar - Statistics */}
          <div className="space-y-8">
            <RatingDistribution reviews={reviews} />
            
            <div className="bg-slate-900 text-white p-8 rounded-4xl shadow-xl shadow-slate-900/20 space-y-6">
                <div className="space-y-1">
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Contact Inquiry</h3>
                    <p className="text-xl font-black italic">Interested in collaborating?</p>
                </div>
                <p className="text-slate-400 text-sm font-medium">
                    Lumina Productions is always open for new partnerships and hosting premium experiences.
                </p>
                <Button className="w-full h-12 rounded-2xl bg-white text-slate-900 hover:bg-slate-100 font-black uppercase tracking-widest text-sm">
                    Send Message
                </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
