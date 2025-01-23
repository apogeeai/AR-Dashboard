"use client";

import { Music2, SkipBack, SkipForward, Play } from "lucide-react";
import { motion } from "framer-motion";

export default function Music() {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="p-6 rounded-3xl bg-white/10 backdrop-blur-md text-white shadow-lg"
    >
      <div className="flex items-center mb-4">
        <Music2 className="w-6 h-6 mr-2" />
        <h3 className="text-xl font-semibold">Now Playing</h3>
      </div>
      <div className="flex items-center space-x-4">
        <img
          src="https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
          alt="Album Cover"
          className="w-16 h-16 rounded-lg"
        />
        <div>
          <h4 className="font-medium">Summer Breeze</h4>
          <p className="text-white/70">Ambient Sounds</p>
        </div>
      </div>
      <div className="flex justify-center space-x-6 mt-4">
        <button className="p-2 hover:bg-white/10 rounded-full">
          <SkipBack className="w-6 h-6" />
        </button>
        <button className="p-2 hover:bg-white/10 rounded-full">
          <Play className="w-6 h-6" />
        </button>
        <button className="p-2 hover:bg-white/10 rounded-full">
          <SkipForward className="w-6 h-6" />
        </button>
      </div>
    </motion.div>
  );
}