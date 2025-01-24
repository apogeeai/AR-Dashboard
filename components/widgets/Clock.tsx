"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Clock() {
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Only render the time after component has mounted on the client
  if (!mounted) {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="  "
      >
        <h2 className="text-6xl font-bold">--:--</h2>
        <p className="text-white/70 mt-2">Loading...</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="  "
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