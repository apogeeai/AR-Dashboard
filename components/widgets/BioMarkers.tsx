"use client";

import { Heart, Activity, Droplets, Brain, Gauge, Dna } from "lucide-react";
import { motion } from "framer-motion";

// Simulated live biomarker data
const BIOMARKERS = [
  {
    name: "Blood Glucose",
    value: "98",
    unit: "mg/dL",
    icon: Droplets,
    status: "normal", // normal, high, low
    range: "70-140",
    color: "text-blue-400"
  },
  {
    name: "Blood Pressure",
    value: "120/80",
    unit: "",
    icon: Heart,
    status: "normal",
    range: "90/60-140/90",
    color: "text-red-400"
  },
  {
    name: "Heart Rate",
    value: "72",
    unit: "bpm",
    icon: Activity,
    status: "normal",
    range: "60-100",
    color: "text-pink-400"
  },
  {
    name: "Oxygen Level",
    value: "98",
    unit: "%",
    icon: Brain,
    status: "normal",
    range: "95-100",
    color: "text-purple-400"
  },
  {
    name: "Cortisol",
    value: "14",
    unit: "μg/dL",
    icon: Gauge,
    status: "normal",
    range: "6-23",
    color: "text-yellow-400"
  },
  {
    name: "HRV",
    value: "65",
    unit: "ms",
    icon: Dna,
    status: "normal",
    range: "50-100",
    color: "text-green-400"
  }
];

export default function BioMarkers() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Live Biomarkers</h3>
        <div className="text-xs text-white/50">Updated 2m ago</div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {BIOMARKERS.map((marker, i) => {
          const Icon = marker.icon;
          return (
            <motion.div
              key={i}
              className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className={`${marker.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-sm text-white/70">{marker.name}</span>
              </div>
              
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-semibold">{marker.value}</span>
                <span className="text-xs text-white/50">{marker.unit}</span>
              </div>
              
              <div className="mt-1 text-[10px] text-white/40">
                Normal Range: {marker.range}
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="p-2 rounded-lg bg-white/5 text-center">
        <span className="text-xs text-white/50">All biomarkers within normal ranges</span>
      </div>
    </div>
  );
} 