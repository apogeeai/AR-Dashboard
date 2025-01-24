"use client";

import { Twitter } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function TwitterTrends() {
  const scrollRef = useRef(null);

  const trends = [
    { topic: "#AugmentedReality", tweets: "125K" },
    { topic: "Apple Vision Pro", tweets: "89K" },
    { topic: "#AI", tweets: "250K" },
    { topic: "Meta Quest", tweets: "45K" },
    { topic: "#FutureOfWork", tweets: "78K" },
    { topic: "Spatial Computing", tweets: "32K" },
  ];

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="   border border-white/10"
    >
      <div className="flex items-center mb-4">
        <Twitter className="w-6 h-6 mr-2" />
        <h3 className="text-xl font-semibold">Trending</h3>
      </div>
      <div className="space-y-3 max-h-[200px] overflow-y-auto" ref={scrollRef}>
        {trends.map((trend, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex justify-between items-center p-2 hover:bg-white/10 rounded-lg transition-all"
          >
            <span className="font-medium">{trend.topic}</span>
            <span className="text-sm text-white/70">{trend.tweets} tweets</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}