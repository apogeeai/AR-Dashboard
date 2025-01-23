"use client";

import { CheckSquare } from "lucide-react";
import { motion } from "framer-motion";

export default function Tasks() {
  const tasks = [
    { title: "Review Project Proposal", completed: true },
    { title: "Team Meeting at 2 PM", completed: false },
    { title: "Update Documentation", completed: false },
  ];

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="p-6 rounded-3xl bg-white/10 backdrop-blur-md text-white shadow-lg"
    >
      <div className="flex items-center mb-4">
        <CheckSquare className="w-6 h-6 mr-2" />
        <h3 className="text-xl font-semibold">Tasks</h3>
      </div>
      <div className="space-y-3">
        {tasks.map((task, index) => (
          <div key={index} className="flex items-center">
            <input
              type="checkbox"
              checked={task.completed}
              className="mr-3"
              readOnly
            />
            <span className={task.completed ? "line-through text-white/50" : ""}>
              {task.title}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}