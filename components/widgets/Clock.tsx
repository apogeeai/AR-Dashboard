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
        <div className="w-40 h-40 rounded-full border-4 border-white/20 relative flex items-center justify-center">
          <span className="text-white/50">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="w-40 h-40 rounded-full border-4 border-white/20 relative backdrop-blur-sm">
        {/* Hour markers */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-4 bg-white/50"
            style={{
              transform: `rotate(${i * 30}deg) translateY(-50%)`,
              transformOrigin: "bottom center",
              left: "calc(50% - 2px)",
              top: "4px"
            }}
          />
        ))}

        {/* Hour hand */}
        <div
          className="absolute w-1.5 h-16 bg-white rounded-full shadow-lg"
          style={{
            transform: `rotate(${((time.getHours() % 12) * 30) + (time.getMinutes() * 0.5)}deg)`,
            transformOrigin: "bottom center",
            left: "calc(50% - 3px)",
            bottom: "50%"
          }}
        />

        {/* Minute hand */}
        <div
          className="absolute w-1 h-20 bg-white/90 rounded-full shadow-md"
          style={{
            transform: `rotate(${time.getMinutes() * 6}deg)`,
            transformOrigin: "bottom center",
            left: "calc(50% - 2px)",
            bottom: "50%"
          }}
        />

        {/* Second hand */}
        <div
          className="absolute w-0.5 h-24 bg-purple-400 rounded-full shadow-sm"
          style={{
            transform: `rotate(${time.getSeconds() * 6}deg)`,
            transformOrigin: "bottom center",
            left: "calc(50% - 1px)",
            bottom: "50%"
          }}
        />

        {/* Center dot */}
        <div className="absolute w-4 h-4 bg-white rounded-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 shadow-md">
          <div className="absolute w-2 h-2 bg-purple-400 rounded-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
        </div>
      </div>
    </div>
  );
}