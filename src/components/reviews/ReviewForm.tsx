import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '../../lib/utils';
import { useReviewStore } from '../../store/review.store';

interface ReviewFormProps {
  eventId: string;
  onSuccess?: () => void;
}

export const ReviewForm: React.FC<ReviewFormProps> = ({ eventId, onSuccess }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { addReview } = useReviewStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    addReview({
      eventId,
      rating,
      comment,
    });

    setIsSubmitting(false);
    setRating(0);
    setComment('');
    if (onSuccess) onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-6">
      <div className="space-y-2">
        <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Rate your experience</h3>
        <p className="text-sm text-slate-500 font-medium">How would you rate this event?</p>
      </div>

      <div className="flex items-center space-x-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className="focus:outline-none transition-transform hover:scale-110"
            onClick={() => setRating(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
          >
            <Star
              className={cn(
                "w-8 h-8 transition-colors",
                (hover || rating) >= star
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-slate-200"
              )}
            />
          </button>
        ))}
        {rating > 0 && (
          <span className="ml-4 text-sm font-bold text-slate-700">
            {rating} / 5
          </span>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="comment" className="text-sm font-bold text-slate-700 uppercase tracking-wider">
          Comment (Optional)
        </label>
        <textarea
          id="comment"
          rows={4}
          className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none text-slate-600 font-medium"
          placeholder="Share your thoughts about the event..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>

      <Button
        type="submit"
        className="w-full rounded-2xl h-12 text-lg font-black uppercase tracking-widest shadow-lg shadow-primary/20"
        disabled={rating === 0 || isSubmitting}
        loading={isSubmitting}
      >
        Submit Review
      </Button>
    </form>
  );
};
