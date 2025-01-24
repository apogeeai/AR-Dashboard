"use client";

import { Activity } from "lucide-react";
import { motion } from "framer-motion";

export default function FitnessTracker() {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="  "
    >
      <div className="flex items-center mb-4">
        <Activity className="w-6 h-6 mr-2" />
        <h3 className="text-xl font-semibold">Fitness</h3>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center p-3 bg-white/5 rounded-xl">
          <div className="text-2xl font-bold">7,234</div>
          <div className="text-sm text-white/70">Steps</div>
        </div>
        <div className="text-center p-3 bg-white/5 rounded-xl">
          <div className="text-2xl font-bold">2.8</div>
          <div className="text-sm text-white/70">km</div>
        </div>
        <div className="text-center p-3 bg-white/5 rounded-xl">
          <div className="text-2xl font-bold">284</div>
          <div className="text-sm text-white/70">kcal</div>
        </div>
        <div className="text-center p-3 bg-white/5 rounded-xl">
          <div className="text-2xl font-bold">45</div>
          <div className="text-sm text-white/70">min active</div>
        </div>
      </div>
    </motion.div>
  );
}