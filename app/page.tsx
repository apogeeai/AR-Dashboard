"use client";

import { Plus, Settings } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import Clock from "@/components/widgets/Clock";
import Weather from "@/components/widgets/Weather";
import Calendar from "@/components/widgets/Calendar";
import Music from "@/components/widgets/Music";
import Tasks from "@/components/widgets/Tasks";
import Messages from "@/components/widgets/Messages";
import Email from "@/components/widgets/Email";
import TwitterTrends from "@/components/widgets/TwitterTrends";
import CryptoTicker from "@/components/widgets/CryptoTicker";
import FitnessTracker from "@/components/widgets/FitnessTracker";
import SmartHome from "@/components/widgets/SmartHome";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image */}
      <img
        src="https://w.wallhaven.cc/full/2y/wallhaven-2y7q2y.png"
        alt="Dark Forest Background"
        className="absolute top-0 left-0 w-full h-full object-cover"
      />

      {/* Content Overlay */}
      <div className="relative z-10 min-h-screen p-4">
        {/* Header */}
        <motion.button
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-4 right-4 p-3 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all border border-white/10"
        >
          <Plus className="w-6 h-6 text-white" />
        </motion.button>

        {/* Widgets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mx-auto pt-16 min-w-[430px] max-w-[1260px] px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <Clock />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Weather />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <CryptoTicker />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Calendar />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <FitnessTracker />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="lg:col-span-2"
          >
            <Email />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 }}
          >
            <Music />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
          >
            <SmartHome />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9 }}
          >
            <Tasks />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.0 }}
          >
            <TwitterTrends />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.1 }}
          >
            <Messages />
          </motion.div>
        </div>

        {/* Settings Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2 }}
          className="fixed bottom-4 right-4 p-3 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all border border-white/10"
        >
          <Settings className="w-6 h-6 text-white" />
        </motion.button>
      </div>
    </div>
  );
}