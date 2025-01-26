"use client";

import { Cloud, Sun, Snowflake, CloudSnow, CloudRain, Wind } from "lucide-react";
import { motion } from "framer-motion";

// Winter weather forecast data
const FORECAST = [
  {
    day: "Today",
    icon: CloudSnow,
    temp: 32,
    high: 35,
    low: 13,
    condition: "Light Snow"
  },
  {
    day: "Thu",
    icon: Snowflake,
    temp: 28,
    high: 31,
    low: 15,
    condition: "Snow"
  },
  {
    day: "Fri",
    icon: Cloud,
    temp: 30,
    high: 33,
    low: 18,
    condition: "Cloudy"
  },
  {
    day: "Sat",
    icon: CloudRain,
    temp: 34,
    high: 36,
    low: 21,
    condition: "Wintry Mix"
  },
  {
    day: "Sun",
    icon: Sun,
    temp: 31,
    high: 34,
    low: 16,
    condition: "Sunny"
  }
];

export default function Weather() {
  return (
    <motion.div className="space-y-4">
      {/* Current Weather */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-semibold">Saugus, MA</h3>
          <p className="text-white/70">Light Snow</p>
        </div>
        <div className="flex items-center">
          <CloudSnow className="w-8 h-8 mr-2 text-blue-200" />
          <span className="text-4xl font-bold">32°</span>
        </div>
      </div>

      {/* Current Stats */}
      <div className="grid grid-cols-3 gap-2 text-sm text-white/70">
        <div>H: 35° L: 13°</div>
        <div>Humidity: 45%</div>
        <div>Wind: 12 mph</div>
      </div>

      {/* 5-Day Forecast */}
      <div className="grid grid-cols-5 gap-2 pt-3 border-t border-white/10">
        {FORECAST.map((day, i) => {
          const Icon = day.icon;
          return (
            <div key={i} className="text-center">
              <div className="text-xs text-white/70 mb-1">{day.day}</div>
              <Icon className="w-5 h-5 mx-auto mb-1 text-white/80" />
              <div className="text-sm font-medium">{day.temp}°</div>
              <div className="text-[10px] text-white/50">
                {day.high}° | {day.low}°
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}