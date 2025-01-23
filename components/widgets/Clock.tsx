"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="p-6 rounded-3xl bg-white/10 backdrop-blur-md text-white shadow-lg"
    >
      <h2 className="text-6xl font-bold">
        {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
      </h2>
      <p className="text-white/70 mt-2">
        {time.toLocaleDateString(undefined, {
          weekday: "long",
          month: "long",
          day: "numeric",
        })}
      </p>
    </motion.div>
  );
}