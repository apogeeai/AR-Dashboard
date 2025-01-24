"use client";

import { Cloud, Sun } from "lucide-react";
import { motion } from "framer-motion";

export default function Weather() {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="  "
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-semibold">Yosemite, CA</h3>
          <p className="text-white/70">Partly Cloudy</p>
        </div>
        <div className="flex items-center">
          <Sun className="w-8 h-8 mr-2" />
          <span className="text-4xl font-bold">72°</span>
        </div>
      </div>
      <div className="mt-4 flex justify-between text-sm">
        <div>H: 75° L: 65°</div>
        <div>Humidity: 45%</div>
      </div>
    </motion.div>
  );
}