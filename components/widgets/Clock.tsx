"use client";

import { useEffect, useState } from 'react';
import { Clock as ClockIcon } from 'lucide-react';

interface WorldClock {
  city: string;
  timezone: string;
  offset: number;
}

const WORLD_CLOCKS: WorldClock[] = [
  { city: "London", timezone: "GMT", offset: 0 },
  { city: "Tokyo", timezone: "JST", offset: 9 },
  { city: "New York", timezone: "EST", offset: -5 }
];

function WorldTimeDisplay({ date, city, timezone }: { date: Date, city: string, timezone: string }) {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes.toString().padStart(2, '0');

  return (
    <div className="flex flex-col items-center">
      <div className="w-24 text-center">
        {/* City name */}
        <div className="text-[11px] font-medium text-white/70 mb-1">{city}</div>
        
        {/* Time display */}
        <div className="flex items-baseline justify-center gap-0.5">
          <span className="text-2xl font-bold tracking-tight">{formattedHours}</span>
          <span className="text-2xl font-bold tracking-tight">:</span>
          <span className="text-2xl font-bold tracking-tight">{formattedMinutes}</span>
          <span className="text-sm font-medium ml-1 text-white/70">{ampm}</span>
        </div>
        
        {/* Timezone */}
        <div className="text-[10px] font-medium text-white/40 mt-1">{timezone}</div>
      </div>
    </div>
  );
}

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
          <span className="text-7xl font-bold tracking-tight">{hours}</span>
          <span className="text-7xl font-bold tracking-tight">:</span>
          <span className="text-7xl font-bold tracking-tight">{minutes}</span>
          <span className="text-3xl font-medium ml-2 text-white/70">{ampm}</span>
        </div>
        <div className="text-md font-medium text-white/50 mt-1">
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