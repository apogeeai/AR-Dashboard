'use client';

import { Brain, Sparkles, Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function ARMindfulness() {
  const [selectedTime, setSelectedTime] = useState('morning');

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-3 mb-4">
        <Brain className="w-6 h-6 text-blue-400" />
        <h3 className="text-lg font-semibold">Mindfulness</h3>
      </div>

      {/* Time Selection */}
      <div className="flex gap-2 mb-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl ${
            selectedTime === 'morning'
              ? 'bg-blue-400/20 text-blue-400'
              : 'bg-white/5 text-white/70'
          }`}
          onClick={() => setSelectedTime('morning')}
        >
          <Sun className="w-4 h-4" />
          <span className="text-sm">Morning</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl ${
            selectedTime === 'evening'
              ? 'bg-blue-400/20 text-blue-400'
              : 'bg-white/5 text-white/70'
          }`}
          onClick={() => setSelectedTime('evening')}
        >
          <Moon className="w-4 h-4" />
          <span className="text-sm">Evening</span>
        </motion.button>
      </div>

      {/* Daily Quote */}
      <div className="bg-white/5 rounded-xl p-4 mb-4">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-blue-400" />
          <h4 className="text-sm font-medium">Daily Insight</h4>
        </div>
        <p className="text-sm text-white/90 italic">
          "The present moment is filled with joy and happiness. If you are attentive, you will see it."
        </p>
        <p className="text-xs text-white/70 mt-2">- Thich Nhat Hanh</p>
      </div>

      {/* Stats */}
      <div className="flex-1 grid grid-cols-2 gap-3">
        <div className="bg-white/5 rounded-xl p-3">
          <h5 className="text-xs text-white/70 mb-1">Mindful Minutes</h5>
          <p className="text-2xl font-semibold">127</p>
          <p className="text-xs text-blue-400">+12 today</p>
        </div>

        <div className="bg-white/5 rounded-xl p-3">
          <h5 className="text-xs text-white/70 mb-1">Current Streak</h5>
          <p className="text-2xl font-semibold">8</p>
          <p className="text-xs text-blue-400">days</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-4">
        <h4 className="text-sm font-medium mb-2">Quick Actions</h4>
        <div className="grid grid-cols-2 gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white/5 rounded-xl p-3 text-left"
          >
            <h5 className="text-sm font-medium mb-1">Breathing</h5>
            <p className="text-xs text-white/70">5 min exercise</p>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white/5 rounded-xl p-3 text-left"
          >
            <h5 className="text-sm font-medium mb-1">Body Scan</h5>
            <p className="text-xs text-white/70">10 min practice</p>
          </motion.button>
        </div>
      </div>
    </div>
  );
} 