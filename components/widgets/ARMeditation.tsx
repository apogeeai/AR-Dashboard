'use client';

import { Flower2, Play, Pause, SkipForward } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function ARMeditation() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  // Simulated meditation session
  const totalTime = 600; // 10 minutes in seconds
  const currentTime = Math.floor(totalTime * (progress / 100));
  const remainingTime = totalTime - currentTime;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-3 mb-4">
        <Flower2 className="w-6 h-6 text-purple-400" />
        <h3 className="text-lg font-semibold">Meditation Guide</h3>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="relative w-32 h-32">
          {/* Progress Ring */}
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="64"
              cy="64"
              r="60"
              className="stroke-white/5"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="64"
              cy="64"
              r="60"
              className="stroke-purple-400/50"
              strokeWidth="8"
              fill="none"
              strokeDasharray={2 * Math.PI * 60}
              strokeDashoffset={2 * Math.PI * 60 * (1 - progress / 100)}
              strokeLinecap="round"
            />
          </svg>
          
          {/* Time Display */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-semibold">{formatTime(remainingTime)}</span>
            <span className="text-xs text-white/70">remaining</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4 mt-6">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20"
            onClick={() => setProgress(0)}
          >
            <SkipForward className="w-5 h-5 text-white" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-4 rounded-full bg-purple-400/20 hover:bg-purple-400/30"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 text-purple-400" />
            ) : (
              <Play className="w-6 h-6 text-purple-400" />
            )}
          </motion.button>

          <div className="w-10 h-10" /> {/* Spacer for symmetry */}
        </div>
      </div>

      <div className="mt-4 text-center">
        <h4 className="text-sm font-medium mb-1">Mindful Breathing</h4>
        <p className="text-xs text-white/70">Guided session with voice assistance</p>
      </div>
    </div>
  );
} 