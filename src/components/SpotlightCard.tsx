import React, { useRef, useState } from "react";

interface SpotlightCardProps extends React.PropsWithChildren {
  className?: string;
  spotlightColor?: `rgba(${number}, ${number}, ${number}, ${number})`;
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = "",
  spotlightColor = "rgba(255, 255, 255, 0.25)",
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (!divRef.current || isFocused) return;

    const rect = divRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    divRef.current.style.setProperty("--mouse-x", `${x}px`);
    divRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  const handleFocus = () => {
    setIsFocused(true);
    if (divRef.current) divRef.current.style.setProperty("--opacity", "0.6");
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (divRef.current) divRef.current.style.setProperty("--opacity", "0");
  };

  const handleMouseEnter = () => {
    if (divRef.current) divRef.current.style.setProperty("--opacity", "0.6");
  };

  const handleMouseLeave = () => {
    if (divRef.current) divRef.current.style.setProperty("--opacity", "0");
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={
        {
          "--mouse-x": "0px",
          "--mouse-y": "0px",
          "--opacity": "0",
        } as React.CSSProperties
      }
      className={`relative rounded-3xl border border-neutral-800 bg-neutral-900 overflow-hidden ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-in-out z-10"
        style={{
          opacity: "var(--opacity)",
          background: `radial-gradient(circle at var(--mouse-x) var(--mouse-y), ${spotlightColor}, transparent 80%)`,
        }}
      />
      {children}
    </div>
  );
};

export default SpotlightCard;
