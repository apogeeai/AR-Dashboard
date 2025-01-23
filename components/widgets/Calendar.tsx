"use client";

import { Calendar as CalendarIcon } from "lucide-react";
import { motion } from "framer-motion";

export default function Calendar() {
  const events = [
    { time: "9:00 AM", title: "Team Meeting" },
    { time: "12:00 PM", title: "Lunch with Client" },
    { time: "3:00 PM", title: "Project Review" },
  ];

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="p-6 rounded-3xl bg-white/10 backdrop-blur-md text-white shadow-lg"
    >
      <div className="flex items-center mb-4">
        <CalendarIcon className="w-6 h-6 mr-2" />
        <h3 className="text-xl font-semibold">Today's Schedule</h3>
      </div>
      <div className="space-y-3">
        {events.map((event, index) => (
          <div key={index} className="flex items-center">
            <span className="text-white/70 w-24">{event.time}</span>
            <span>{event.title}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}