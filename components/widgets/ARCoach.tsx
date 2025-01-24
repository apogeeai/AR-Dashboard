'use client';

import { Target, Trophy, TrendingUp, Star } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ARCoach() {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-3 mb-4">
        <Trophy className="w-6 h-6 text-yellow-400" />
        <h3 className="text-lg font-semibold">Life Coach</h3>
      </div>

      <div className="flex-1 space-y-4">
        <div className="p-3 rounded-lg bg-white/5 space-y-3">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-green-400" />
            <h4 className="text-sm font-medium">Today's Focus</h4>
          </div>
          <div className="pl-7">
            <p className="text-sm text-white/90">Complete project presentation</p>
            <div className="mt-2 w-full h-2 rounded-full bg-white/10">
              <div className="h-full w-3/4 rounded-full bg-green-400/50" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-lg bg-white/5">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-blue-400" />
              <span className="text-sm">Progress</span>
            </div>
            <p className="text-lg font-semibold">75%</p>
            <p className="text-xs text-white/70">Weekly goals</p>
          </div>

          <div className="p-3 rounded-lg bg-white/5">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-4 h-4 text-purple-400" />
              <span className="text-sm">Streak</span>
            </div>
            <p className="text-lg font-semibold">5 Days</p>
            <p className="text-xs text-white/70">Keep it up!</p>
          </div>
        </div>

        <div className="p-3 rounded-lg bg-white/5">
          <h4 className="text-sm font-medium mb-2">Next Steps</h4>
          <ul className="space-y-2">
            <li className="flex items-center gap-2 text-sm text-white/90">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              Review presentation with team
            </li>
            <li className="flex items-center gap-2 text-sm text-white/90">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              Schedule client meeting
            </li>
          </ul>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="mt-4 w-full p-2 rounded-lg bg-white/10 hover:bg-white/20 text-sm text-center"
      >
        Update Goals
      </motion.button>
    </div>
  );
} 