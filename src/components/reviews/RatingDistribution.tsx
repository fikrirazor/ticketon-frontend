import { Star } from 'lucide-react';
import type { Review } from '../../types';

interface RatingDistributionProps {
  reviews: Review[];
}

export const RatingDistribution: React.FC<RatingDistributionProps> = ({ reviews }) => {
  const safeReviews = Array.isArray(reviews) ? reviews : [];
  const totalReviews = safeReviews.length;
  const distribution = [5, 4, 3, 2, 1].map((rating) => {
    const count = safeReviews.filter((r) => r.rating === rating).length;
    const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
    return { rating, count, percentage };
  });

  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
      <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest border-b border-slate-50 pb-3">Rating Distribution</h3>
      
      <div className="space-y-3">
        {distribution.map(({ rating, count, percentage }) => (
          <div key={rating} className="flex items-center gap-4 group">
            <div className="flex items-center gap-1 w-8">
              <span className="text-sm font-black text-slate-600">{rating}</span>
              <Star className="w-3 h-3 fill-slate-400 text-slate-400 group-hover:fill-yellow-400 group-hover:text-yellow-400 transition-colors" />
            </div>
            
            <div className="flex-1 h-3 bg-slate-50 rounded-full overflow-hidden border border-slate-100/50">
              <div 
                className="h-full bg-primary transition-all duration-500 ease-out rounded-full" 
                style={{ width: `${percentage}%` }}
              />
            </div>
            
            <div className="w-10 text-right">
              <span className="text-xs font-bold text-slate-400">{count}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-4 border-t border-slate-50">
        <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest text-slate-400">
          <span>Total Reviews</span>
          <span className="text-slate-900">{totalReviews}</span>
        </div>
      </div>
    </div>
  );
};
