import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Layout } from "../components/Layout";
import { organizerAPI, reviewAPI } from "../lib/api.service";
import type { Event, Organizer, Review } from "../types";
import {
  Calendar,
  Star,
  MapPin,
  Users,
  Award,
  CheckCircle,
  MessageSquare,
} from "lucide-react";

export const OrganizerProfile: React.FC = () => {
  const { organizerId } = useParams<{ organizerId: string }>();
  const [organizer, setOrganizer] = useState<Organizer | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!organizerId) return;
      setIsLoading(true);
      try {
        // Fetch Organizer Info
        let orgData: Organizer;
        try {
          orgData = await organizerAPI.getOrganizerProfile(organizerId);
        } catch {
          console.warn(
            "Organizer API not found, using Mock Simulation for Demo",
          );
          // Mock Data for Demo
          orgData = {
            id: organizerId,
            name: "Organizer Name",
            bio: "Kami adalah penyelenggara event profesional yang berfokus pada pengalaman musik dan teknologi terbaik. Menghadirkan inovasi dalam setiap pertunjukan.",
            totalEvents: 12,
            averageRating: 4.8,
            totalReviews: 156,
          };
        }
        setOrganizer(orgData);

        // Fetch Events
        let orgEvents: Event[] = [];
        try {
          orgEvents = await organizerAPI.getOrganizerEvents(organizerId);
          setEvents(orgEvents || []);
        } catch {
          // Fallback: mock events if needed, but let's try to fetch all and filter
        }

        // Fetch Aggregate Reviews
        try {
          const result = await reviewAPI.getOrganizerReviews(organizerId);
          setReviews(result.reviews || []);
        } catch {
          /* ignore */
        }
      } catch (error) {
        console.error("Error fetching organizer profile:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [organizerId]);

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  if (!organizer) {
    return (
      <Layout>
        <div className="text-center py-20">
          <h2 className="text-2xl font-black text-slate-900">
            Organizer Not Found
          </h2>
          <Link
            to="/"
            className="text-primary hover:underline mt-4 inline-block font-bold"
          >
            Return to Home
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-white">
        {/* Header/Hero Section */}
        <div className="bg-slate-900 py-20 px-4 text-white">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
            <div className="w-32 h-32 md:w-40 md:h-40 bg-primary/10 rounded-4xl flex items-center justify-center text-4xl font-black shadow-2xl shadow-primary/20 overflow-hidden border-2 border-primary/20">
              {organizer.avatarUrl ? (
                <img
                  src={organizer.avatarUrl}
                  alt={organizer.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-primary">{organizer.name.charAt(0)}</span>
              )}
            </div>
            <div className="flex-1 text-center md:text-left space-y-4">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <h1 className="text-4xl md:text-5xl font-black tracking-tight uppercase">
                  {organizer.name}
                </h1>
                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full border border-white/20 w-fit mx-auto md:mx-0">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  <span className="text-xs font-black uppercase tracking-widest">
                    Verified Producer
                  </span>
                </div>
              </div>
              <p className="text-slate-400 max-w-2xl font-medium leading-relaxed">
                {organizer.bio}
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <span className="font-black">
                    {organizer.averageRating} Rating
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  <span className="font-black">
                    {organizer.totalEvents} Events
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-primary" />
                  <span className="font-black">
                    {organizer.totalReviews} Reviews
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-6xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Events List */}
          <div className="lg:col-span-2 space-y-12">
            <section>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
                  Upcoming Events
                </h2>
                <div className="h-1 flex-1 bg-slate-100 mx-6 hidden md:block"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {events.length > 0 ? (
                  events.map((event) => (
                    <Link
                      key={event.id}
                      to={`/event/${event.id}`}
                      className="group space-y-4"
                    >
                      <div className="aspect-4/3 rounded-4xl overflow-hidden border border-slate-100 shadow-sm relative">
                        <img
                          src={
                            event.imageUrl ||
                            "https://images.unsplash.com/photo-1540575861501-7ad05823c9f5?w=500"
                          }
                          alt={event.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl border border-white shadow-lg">
                          <span className="text-xs font-black text-slate-900 uppercase tracking-widest">
                            {event.category}
                          </span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-black text-slate-900 text-lg group-hover:text-primary transition-colors truncate uppercase tracking-tight">
                          {event.title}
                        </h3>
                        <div className="flex items-center gap-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
                          <span className="flex items-center gap-1">
                            <Calendar size={12} />{" "}
                            {new Date(event.startDate).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin size={12} />{" "}
                            {typeof event.location === "object"
                              ? event.location.city
                              : event.location}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="col-span-full py-12 text-center bg-slate-50 rounded-4xl border border-dashed border-slate-300">
                    <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">
                      No events scheduled yet
                    </p>
                  </div>
                )}
              </div>
            </section>

            {/* Reviews Section */}
            <section>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
                  Recent Reviews
                </h2>
                <div className="h-1 flex-1 bg-slate-100 mx-6 hidden md:block"></div>
              </div>

              <div className="space-y-6">
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="p-8 rounded-4xl bg-slate-50 border border-slate-100 space-y-4 hover:shadow-lg hover:shadow-slate-200/50 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center font-black text-primary overflow-hidden">
                          {review.userAvatar ? (
                            <img
                              src={review.userAvatar}
                              alt={review.userName}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            review.userName.charAt(0)
                          )}
                        </div>
                        <div>
                          <p className="font-black text-slate-900 uppercase tracking-tight">
                            {review.userName}
                          </p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={
                              i < review.rating
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-slate-200"
                            }
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-slate-600 font-medium leading-relaxed italic">
                      "{review.comment}"
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar / Badges */}
          <div className="space-y-8">
            <div className="bg-slate-900 rounded-4xl p-10 text-white space-y-8 sticky top-32">
              <div className="space-y-4">
                <h3 className="text-xl font-black uppercase tracking-tight">
                  Achievements
                </h3>
                <div className="space-y-4">
                  <BadgeItem
                    icon={<Award className="text-yellow-400" />}
                    title="Top Rated 2024"
                    description="Menerima rating rata-rata di atas 4.5 tahun ini."
                  />
                  <BadgeItem
                    icon={<Users className="text-blue-400" />}
                    title="Community Leader"
                    description="Telah menyelenggarakan lebih dari 10 event sukses."
                  />
                  <BadgeItem
                    icon={<TrendingUp className="text-emerald-400" />}
                    title="Rapid Growth"
                    description="Penyelenggara dengan pertumbuhan tercepat bulan ini."
                  />
                </div>
              </div>

              <div className="pt-8 border-t border-white/10">
                <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4">
                  Contact Organizer
                </p>
                <button className="w-full py-4 bg-primary text-white font-black rounded-2xl uppercase tracking-widest hover:bg-primary/90 transition-all">
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const BadgeItem: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
}> = ({ icon, title, description }) => (
  <div className="flex gap-4 items-start">
    <div className="p-3 bg-white/10 rounded-2xl">{icon}</div>
    <div>
      <p className="font-black text-sm uppercase tracking-tight">{title}</p>
      <p className="text-xs text-white/50 font-medium mt-1 leading-relaxed">
        {description}
      </p>
    </div>
  </div>
);

const TrendingUp: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
    <polyline points="17 6 23 6 23 12"></polyline>
  </svg>
);
