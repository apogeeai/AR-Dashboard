"use client";

import { Calendar as CalendarIcon, Clock, Users, MapPin } from "lucide-react";
import ScrollContainer from "../ScrollContainer";

export default function Calendar() {
  const events = [
    {
      time: "9:00 AM",
      title: "Team Standup",
      location: "Virtual Meeting",
      attendees: 8,
      duration: "30min"
    },
    {
      time: "10:30 AM",
      title: "Project Planning",
      location: "Conference Room A",
      attendees: 5,
      duration: "1h"
    },
    {
      time: "2:00 PM",
      title: "Design Review",
      location: "Virtual Meeting",
      attendees: 6,
      duration: "1h 30min"
    },
    {
      time: "4:00 PM",
      title: "Client Meeting",
      location: "Main Office",
      attendees: 4,
      duration: "1h"
    },
   
  ];

  const eventItems = events.map((event, index) => (
    <div
      key={index}
      className="p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all mb-2"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-blue-400" />
          <span className="font-medium">{event.time}</span>
          <span className="text-xs text-white/50">({event.duration})</span>
        </div>
      </div>
      <h4 className="font-medium mb-2">{event.title}</h4>
      <div className="flex items-center gap-4 text-sm text-white/70">
        <div className="flex items-center gap-1">
          <MapPin className="w-3 h-3" />
          <span>{event.location}</span>
        </div>
        <div className="flex items-center gap-1">
          <Users className="w-3 h-3" />
          <span>{event.attendees}</span>
        </div>
      </div>
    </div>
  ));

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-3 mb-4">
        <CalendarIcon className="w-6 h-6 text-blue-400" />
        <h3 className="text-lg font-semibold">Today's Schedule</h3>
      </div>

      <ScrollContainer 
        items={eventItems}
        itemsPerView={3}
        className="pb-8" // Add padding for the navigation controls
      />
    </div>
  );
}