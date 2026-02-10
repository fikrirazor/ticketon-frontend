import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-4 py-10">
      <Button
        variant="outline"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="rounded-2xl w-12 h-12 p-0 border-slate-200 hover:bg-primary hover:text-white transition-all duration-300 disabled:opacity-30"
      >
        <ChevronLeft className="w-5 h-5" />
      </Button>

      <div className="flex items-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-12 h-12 rounded-2xl text-sm font-black transition-all duration-300 ${
              currentPage === page
                ? "bg-primary text-white shadow-lg shadow-primary/20 scale-110"
                : "bg-white text-slate-400 hover:text-slate-900 hover:bg-slate-50 border border-slate-100"
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      <Button
        variant="outline"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="rounded-2xl w-12 h-12 p-0 border-slate-200 hover:bg-primary hover:text-white transition-all duration-300 disabled:opacity-30"
      >
        <ChevronRight className="w-5 h-5" />
      </Button>
    </div>
  );
};
