"use client";

import { Mail } from "lucide-react";
import { motion } from "framer-motion";

export default function Email() {
  const emails = [
    {
      sender: "Team Figma",
      subject: "New comment on your design",
      time: "2m ago",
      unread: true,
    },
    {
      sender: "GitHub",
      subject: "Pull request merged: Feature/ar-widgets",
      time: "15m ago",
      unread: false,
    },
    {
      sender: "Slack",
      subject: "3 new messages in #ar-development",
      time: "1h ago",
      unread: true,
    },
  ];

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="p-6 rounded-3xl bg-white/10 backdrop-blur-md text-white shadow-lg border border-white/10"
    >
      <div className="flex items-center mb-4">
        <Mail className="w-6 h-6 mr-2" />
        <h3 className="text-xl font-semibold">Inbox</h3>
      </div>
      <div className="space-y-3">
        {emails.map((email, index) => (
          <div
            key={index}
            className={`p-2 rounded-lg ${
              email.unread ? "bg-white/10" : ""
            } hover:bg-white/20 transition-all`}
          >
            <div className="flex justify-between items-center">
              <span className="font-medium">{email.sender}</span>
              <span className="text-xs text-white/70">{email.time}</span>
            </div>
            <p className="text-sm text-white/80 truncate">{email.subject}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}