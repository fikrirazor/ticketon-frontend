import React, { useState } from 'react';
import { Star, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Review } from '../../types';
import { cn } from '../../lib/utils';
import { Button } from '../ui/Button';

interface ReviewListProps {
  reviews: Review[];
}

export const ReviewList: React.FC<ReviewListProps> = ({ reviews }) => {
  const [filterRating, setFilterRating] = useState<number | 'all'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredReviews = filterRating === 'all' 
    ? reviews 
    : reviews.filter(r => r.rating === filterRating);

  const totalPages = Math.ceil(filteredReviews.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedReviews = filteredReviews.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: document.getElementById('reviews-list')?.offsetTop || 0, behavior: 'smooth' });
  };

  return (
    <div id="reviews-list" className="space-y-8">
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
        <div className="flex items-center gap-2 text-slate-500 mr-2">
          <Filter className="w-4 h-4" />
          <span className="text-xs font-black uppercase tracking-widest">Filter by</span>
        </div>
        
        <button
          onClick={() => { setFilterRating('all'); setCurrentPage(1); }}
          className={cn(
            "px-4 py-2 rounded-xl text-xs font-bold transition-all border",
            filterRating === 'all' 
              ? "bg-primary text-white border-primary shadow-sm" 
              : "bg-white text-slate-500 border-slate-200 hover:border-primary hover:text-primary"
          )}
        >
          All Reviews
        </button>

        {[5, 4, 3, 2, 1].map((rating) => (
          <button
            key={rating}
            onClick={() => { setFilterRating(rating); setCurrentPage(1); }}
            className={cn(
              "flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all border",
              filterRating === rating 
                ? "bg-primary text-white border-primary shadow-sm" 
                : "bg-white text-slate-500 border-slate-200 hover:border-primary hover:text-primary"
            )}
          >
            {rating} <Star className={cn("w-3 h-3", filterRating === rating ? "fill-white" : "fill-slate-400")} />
          </button>
        ))}
      </div>

      {/* List */}
      <div className="space-y-6">
        {paginatedReviews.length > 0 ? (
          paginatedReviews.map((review) => (
            <div key={review.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4 hover:border-primary/20 transition-colors group">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-slate-50 shadow-sm">
                    <img 
                      src={review.userAvatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(review.userName)}&background=random`} 
                      alt={review.userName} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 leading-tight">{review.userName}</h4>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-0.5">
                      {new Date(review.createdAt).toLocaleDateString('en-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1.5 rounded-xl border border-yellow-100">
                  <span className="text-sm font-black text-yellow-700">{review.rating}</span>
                  <Star className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500" />
                </div>
              </div>

              {review.comment && (
                <p className="text-slate-600 leading-relaxed font-medium pl-1">
                  "{review.comment}"
                </p>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
            <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">No reviews found for this filter</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <Button
            variant="outline"
            size="sm"
            className="rounded-xl w-10 h-10 p-0"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          
          <span className="text-sm font-black text-slate-700 uppercase tracking-widest">
            Page {currentPage} of {totalPages}
          </span>

          <Button
            variant="outline"
            size="sm"
            className="rounded-xl w-10 h-10 p-0"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      )}
    </div>
  );
};
