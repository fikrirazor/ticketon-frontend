import { useEffect, useState, type ReactNode } from "react";
import { cn } from "../../lib/utils";

interface PageRevealProps {
  children: ReactNode;
  className?: string;
}

export const PageReveal = ({ children, className }: PageRevealProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation after a small delay to ensure render
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={cn(
        "transition-all duration-700 ease-out transform",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
        className,
      )}
    >
      {children}
    </div>
  );
};
