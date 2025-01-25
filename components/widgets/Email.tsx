"use client";

import { Mail, Star, Clock, Paperclip } from "lucide-react";
import { motion } from "framer-motion";
import ScrollContainer from "../ScrollContainer";

export default function Email() {
  const emails = [
    {
      sender: "Team Figma",
      subject: "New comment on your design",
      time: "2m ago",
      unread: true,
      starred: false,
      hasAttachment: true
    },
    {
      sender: "GitHub",
      subject: "Pull request merged: Feature/ar-widgets",
      time: "15m ago",
      unread: false,
      starred: true,
      hasAttachment: false
    },
    {
      sender: "Slack",
      subject: "3 new messages in #ar-development",
      time: "1h ago",
      unread: true,
      starred: false,
      hasAttachment: false
    },
    {
      sender: "Design Weekly",
      subject: "Top 10 AR Interface Trends for 2024",
      time: "2h ago",
      unread: false,
      starred: true,
      hasAttachment: true
    },
    {
      sender: "Product Team",
      subject: "Q1 Roadmap Review - Please Comment",
      time: "3h ago",
      unread: false,
      starred: false,
      hasAttachment: true
    },
    {
      sender: "AR Conference",
      subject: "Your speaker submission was accepted!",
      time: "4h ago",
      unread: true,
      starred: true,
      hasAttachment: false
    }
  ];

  const emailItems = emails.map((email, index) => (
    <div
      key={index}
      className="p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all mb-2"
    >
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <span className={`font-medium ${email.unread ? 'text-white' : 'text-white/70'}`}>
            {email.sender}
          </span>
          {email.starred && <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />}
        </div>
        <div className="flex items-center gap-2 text-white/50">
          {email.hasAttachment && <Paperclip className="w-3 h-3" />}
          <Clock className="w-3 h-3" />
          <span className="text-xs">{email.time}</span>
        </div>
      </div>
      <p className={`text-sm ${email.unread ? 'text-white/90' : 'text-white/70'}`}>
        {email.subject}
      </p>
    </div>
  ));

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-3 mb-4">
        <Mail className="w-6 h-6 text-blue-400" />
        <h3 className="text-lg font-semibold">Inbox</h3>
      </div>

      <ScrollContainer 
        items={emailItems}
        itemsPerView={3}
        className="pb-8" // Add padding for the navigation controls
      />
    </div>
  );
}