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

  // Calculate hand angles
  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours() % 12;

  const secondDegrees = (seconds / 60) * 360;
  const minuteDegrees = ((minutes + seconds / 60) / 60) * 360;
  const hourDegrees = ((hours + minutes / 60) / 12) * 360;

  if (!mounted) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <div className="w-40 h-40 rounded-full border-4 border-white/20 flex items-center justify-center">
          <span className="text-white/50">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="relative w-40 h-40">
        {/* Clock face */}
        <div className="absolute inset-0 rounded-full border-4 border-white/20 bg-black/20 backdrop-blur-sm" />
        
        {/* Hour markers */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-full h-full"
            style={{ transform: `rotate(${i * 30}deg)` }}
          >
            <div className={`absolute top-0 left-1/2 -translate-x-1/2 bg-white/60
              ${i % 3 === 0 ? 'w-1.5 h-3' : 'w-1 h-2'}`} />
          </div>
        ))}

        {/* Hour hand */}
        <div
          className="absolute w-full h-full transition-transform duration-500"
          style={{ transform: `rotate(${hourDegrees}deg)` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[4px] h-[35%] bg-white rounded-full origin-bottom shadow-lg" />
        </div>

        {/* Minute hand */}
        <div
          className="absolute w-full h-full transition-transform duration-200"
          style={{ transform: `rotate(${minuteDegrees}deg)` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[3px] h-[45%] bg-white/90 rounded-full origin-bottom shadow-md" />
        </div>

        {/* Second hand */}
        <div
          className="absolute w-full h-full"
          style={{ transform: `rotate(${secondDegrees}deg)` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[2px] h-[50%] bg-blue-400 rounded-full origin-bottom shadow" />
        </div>

        {/* Center dot with ring */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-4 h-4 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-blue-400 shadow-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}