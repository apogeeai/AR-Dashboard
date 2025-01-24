'use client';

import { Dumbbell, Flame, Heart, Timer } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ARWorkout() {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-3 mb-4">
        <Dumbbell className="w-6 h-6 text-orange-400" />
        <h3 className="text-lg font-semibold">AR Workout</h3>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-white/5 rounded-xl p-3">
          <div className="flex items-center gap-2 mb-1">
            <Flame className="w-4 h-4 text-orange-400" />
            <span className="text-xs text-white/70">Calories</span>
          </div>
          <p className="text-lg font-semibold">324</p>
        </div>

        <div className="bg-white/5 rounded-xl p-3">
          <div className="flex items-center gap-2 mb-1">
            <Timer className="w-4 h-4 text-orange-400" />
            <span className="text-xs text-white/70">Duration</span>
          </div>
          <p className="text-lg font-semibold">32:15</p>
        </div>
      </div>

      {/* Current Exercise */}
      <div className="flex-1 bg-white/5 rounded-xl p-4">
        <h4 className="text-sm font-medium mb-3">Current Exercise</h4>
        <div className="flex items-center justify-between mb-2">
          <span className="text-lg font-semibold">Squats</span>
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-red-400" />
            <span className="text-sm">125 bpm</span>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-orange-400"
            initial={{ width: "0%" }}
            animate={{ width: "65%" }}
            transition={{ duration: 0.5 }}
          />
        </div>
        
        <div className="flex justify-between mt-2 text-sm">
          <span className="text-white/70">13/20 reps</span>
          <span className="text-white/70">Set 2/3</span>
        </div>
      </div>

      {/* Next Up */}
      <div className="mt-4">
        <h4 className="text-sm font-medium mb-2">Next Up</h4>
        <div className="flex items-center justify-between bg-white/5 rounded-xl p-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-orange-400/20 flex items-center justify-center">
              <Dumbbell className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <p className="text-sm font-medium">Lunges</p>
              <p className="text-xs text-white/70">3 sets × 15 reps</p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-3 py-1 rounded-lg bg-orange-400/20 text-orange-400 text-sm"
          >
            Skip
          </motion.button>
        </div>
      </div>
    </div>
  );
} 