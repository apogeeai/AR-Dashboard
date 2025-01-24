"use client";

import { MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

export default function Messages() {
  const messages = [
    {
      sender: "Alice",
      message: "Hey, can we review the designs?",
      time: "5m ago",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
    {
      sender: "Bob",
      message: "Project update completed!",
      time: "15m ago",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
  ];

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="  "
    >
      <div className="flex items-center mb-4">
        <MessageSquare className="w-6 h-6 mr-2" />
        <h3 className="text-xl font-semibold">Messages</h3>
      </div>
      <div className="space-y-4">
        {messages.map((message, index) => (
          <div key={index} className="flex items-center space-x-3">
            <img
              src={message.avatar}
              alt={message.sender}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-medium">{message.sender}</span>
                <span className="text-sm text-white/50">{message.time}</span>
              </div>
              <p className="text-white/70">{message.message}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}