"use client";

import { useEffect, useState } from 'react';

export default function Clock() {
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <div className="text-white/50">Loading...</div>
      </div>
    );
  }

  const formatTime = (date: Date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes.toString().padStart(2, '0');
    return { hours: formattedHours, minutes: formattedMinutes, ampm };
  };

  const { hours, minutes, ampm } = formatTime(time);

  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <div className="text-center">
        <div className="flex items-baseline">
          <span className="text-6xl font-bold tracking-tight">{hours}</span>
          <span className="text-6xl font-bold tracking-tight">:</span>
          <span className="text-6xl font-bold tracking-tight">{minutes}</span>
          <span className="text-xl font-medium ml-2 text-white/70">{ampm}</span>
        </div>
        <div className="text-sm font-medium text-white/50 mt-1">
          {time.toLocaleDateString(undefined, { 
            weekday: 'long', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </div>
    </div>
  );
}