"use client";

import { Activity, Heart, Flame, Timer, TrendingUp } from "lucide-react";
import ScrollContainer from "../ScrollContainer";

export default function FitnessTracker() {
  const workouts = [
    {
      type: "Morning Run",
      duration: "45 min",
      distance: "5.2 km",
      calories: 420,
      avgHeartRate: 145,
      pace: "5:30 /km"
    },
    {
      type: "HIIT Training",
      duration: "30 min",
      distance: "-",
      calories: 380,
      avgHeartRate: 165,
      pace: "-"
    },
    {
      type: "Evening Yoga",
      duration: "60 min",
      distance: "-",
      calories: 180,
      avgHeartRate: 95,
      pace: "-"
    },
    {
      type: "Cycling",
      duration: "1h 15min",
      distance: "25 km",
      calories: 550,
      avgHeartRate: 138,
      pace: "3:00 /km"
    }
  ];

  const workoutItems = workouts.map((workout, index) => (
    <div
      key={index}
      className="p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all mb-2"
    >
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-medium">{workout.type}</h4>
        <div className="flex items-center gap-2">
          <Timer className="w-3 h-3 text-white/50" />
          <span className="text-sm text-white/70">{workout.duration}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-2 text-sm">
        <div className="flex items-center gap-1">
          <TrendingUp className="w-3 h-3 text-green-400" />
          <span>{workout.distance}</span>
        </div>
        <div className="flex items-center gap-1">
          <Flame className="w-3 h-3 text-orange-400" />
          <span>{workout.calories}</span>
        </div>
        <div className="flex items-center gap-1">
          <Heart className="w-3 h-3 text-red-400" />
          <span>{workout.avgHeartRate}</span>
        </div>
      </div>
      
      {workout.pace !== "-" && (
        <div className="mt-2 text-xs text-white/50">
          Pace: {workout.pace}
        </div>
      )}
    </div>
  ));

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-3 mb-4">
        <Activity className="w-6 h-6 text-green-400" />
        <h3 className="text-lg font-semibold">Fitness Tracker</h3>
      </div>

      <ScrollContainer 
        items={workoutItems}
        itemsPerView={3}
        className="pb-8" // Add padding for the navigation controls
      />
    </div>
  );
}