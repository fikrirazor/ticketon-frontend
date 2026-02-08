import React, { useState } from "react";
import { Star, AlertTriangle } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";
import { useReviewStore } from "../../store/review.store";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

interface ReviewFormProps {
  eventId: string;
  onSuccess?: () => void;
}

export const ReviewForm: React.FC<ReviewFormProps> = ({
  eventId,
  onSuccess,
}) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const { addReview } = useReviewStore();

  const handleActualSubmit = async () => {
    if (rating === 0) return;

    setIsSubmitting(true);
    try {
      await addReview({
        eventId,
        rating,
        comment,
      });

      setRating(0);
      setComment("");
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Submission failed:", error);
    } finally {
      setIsSubmitting(false);
      setShowConfirm(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-6">
      <div className="space-y-2">
        <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">
          Rate your experience
        </h3>
        <p className="text-sm text-slate-500 font-medium">
          How would you rate this event?
        </p>
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
                  : "text-slate-200",
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
        <label
          htmlFor="comment"
          className="text-sm font-bold text-slate-700 uppercase tracking-wider"
        >
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

      <AlertDialog open={showConfirm} onOpenChange={setShowConfirm}>
        <AlertDialogTrigger asChild>
          <Button
            type="button"
            className="w-full rounded-2xl h-12 text-lg font-black uppercase tracking-widest shadow-lg shadow-primary/20"
            disabled={rating === 0 || isSubmitting}
          >
            Submit Review
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="rounded-3xl border-0 shadow-2xl p-8 max-w-md">
          <AlertDialogHeader className="space-y-4">
            <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center text-primary mx-auto sm:mx-0">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <AlertDialogTitle className="text-2xl font-black text-slate-900 uppercase tracking-tight leading-tight">
              Yakin Ingin Beri Review?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-slate-500 font-medium text-base leading-relaxed">
              Review yang sudah dikirim{" "}
              <span className="text-red-500 font-bold underline decoration-2 underline-offset-4">
                tidak dapat diubah lagi
              </span>
              . Pastikan penilaian dan komentar kamu sudah sesuai kenyamananmu.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-8 gap-3 sm:gap-0">
            <AlertDialogCancel className="h-14 rounded-xl border-slate-100 bg-slate-50 text-slate-400 hover:text-slate-600 font-bold uppercase tracking-widest text-[10px]">
              BATAL
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                handleActualSubmit();
              }}
              disabled={isSubmitting}
              className="h-14 rounded-xl bg-primary hover:bg-orange-600 text-white font-black uppercase tracking-widest text-[10px] shadow-lg shadow-primary/20 border-0"
            >
              {isSubmitting ? "MENGIRIM..." : "YA, KIRIM REVIEW"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
