'use client';

import { Apple, Coffee, Utensils, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ARNutrition() {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-3 mb-4">
        <Apple className="w-6 h-6 text-green-400" />
        <h3 className="text-lg font-semibold">Nutrition Advisor</h3>
      </div>

      {/* Daily Progress */}
      <div className="bg-white/5 rounded-xl p-4 mb-4">
        <div className="flex justify-between items-center mb-2">
          <h4 className="text-sm font-medium">Daily Progress</h4>
          <span className="text-xs text-white/70">1,850 / 2,200 cal</span>
        </div>
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-green-400"
            initial={{ width: "0%" }}
            animate={{ width: "84%" }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Meals Today */}
      <div className="flex-1">
        <div className="flex justify-between items-center mb-3">
          <h4 className="text-sm font-medium">Meals Today</h4>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-1 rounded-lg bg-green-400/20 text-green-400"
          >
            <Plus className="w-4 h-4" />
          </motion.button>
        </div>

        <div className="space-y-3">
          {/* Breakfast */}
          <div className="bg-white/5 rounded-xl p-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-green-400/20 flex items-center justify-center">
                <Coffee className="w-5 h-5 text-green-400" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium">Breakfast</p>
                  <span className="text-xs text-white/70">450 cal</span>
                </div>
                <p className="text-xs text-white/70">Oatmeal with berries, coffee</p>
              </div>
            </div>
          </div>

          {/* Lunch */}
          <div className="bg-white/5 rounded-xl p-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-green-400/20 flex items-center justify-center">
                <Utensils className="w-5 h-5 text-green-400" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium">Lunch</p>
                  <span className="text-xs text-white/70">680 cal</span>
                </div>
                <p className="text-xs text-white/70">Grilled chicken salad, quinoa</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="mt-4">
        <h4 className="text-sm font-medium mb-2">Recommendations</h4>
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white/5 rounded-xl p-3 cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-green-400/20 flex items-center justify-center">
              <Apple className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <p className="text-sm font-medium">Healthy Snack Time</p>
              <p className="text-xs text-white/70">Try some nuts or fruit (~200 cal)</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 