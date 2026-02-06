import React, { useState, useEffect, useCallback } from "react";

interface CountdownTimerProps {
  expiryDate: string; // ISO string
  onExpire?: () => void;
  className?: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  expiryDate,
  onExpire,
  className = "",
}) => {
  const calculateTimeLeft = useCallback(() => {
    const difference = +new Date(expiryDate) - +new Date();
    let timeLeft = {
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      timeLeft = {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }, [expiryDate]);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);

      const totalSeconds =
        newTimeLeft.hours * 3600 +
        newTimeLeft.minutes * 60 +
        newTimeLeft.seconds;

      if (totalSeconds <= 0 && !isExpired) {
        setIsExpired(true);
        if (onExpire) onExpire();
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft, isExpired, onExpire]);

  const formatNumber = (num: number) => num.toString().padStart(2, "0");

  if (isExpired) {
    return <div className={`text-red-600 font-bold ${className}`}>EXPIRED</div>;
  }

  return (
    <div className={`font-mono text-xl tabular-nums ${className}`}>
      <span className="bg-slate-100 px-2 py-1 rounded shadow-sm">
        {formatNumber(timeLeft.hours)}
      </span>
      <span className="mx-1">:</span>
      <span className="bg-slate-100 px-2 py-1 rounded shadow-sm">
        {formatNumber(timeLeft.minutes)}
      </span>
      <span className="mx-1">:</span>
      <span className="bg-slate-100 px-2 py-1 rounded shadow-sm">
        {formatNumber(timeLeft.seconds)}
      </span>
    </div>
  );
};

export default CountdownTimer;
