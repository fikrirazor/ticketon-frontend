import { cn } from "../../lib/utils";

interface AnimatedButtonTextProps {
  text: string;
  className?: string;
}

export const AnimatedButtonText = ({
  text,
  className,
}: AnimatedButtonTextProps) => {
  return (
    <div
      className={cn(
        "relative overflow-hidden h-[1.2rem] flex items-center",
        className,
      )}
    >
      <span className="block transition-all duration-300 ease-out group-hover:-translate-y-[150%]">
        {text}
      </span>
      <span className="absolute top-0 left-0 block translate-y-[150%] transition-all duration-300 ease-out group-hover:translate-y-0 text-inherit">
        {text}
      </span>
    </div>
  );
};
