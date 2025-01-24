"use client";

import { Home } from "lucide-react";
import { motion } from "framer-motion";

export default function SmartHome() {
  const devices = [
    { name: "Living Room Lights", status: "On", type: "light" },
    { name: "Temperature", status: "72°F", type: "thermostat" },
    { name: "Front Door", status: "Locked", type: "security" },
  ];

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="  "
    >
      <div className="flex items-center mb-4">
        <Home className="w-6 h-6 mr-2" />
        <h3 className="text-xl font-semibold">Smart Home</h3>
      </div>
      <div className="space-y-3">
        {devices.map((device, index) => (
          <div key={index} className="flex justify-between items-center">
            <span>{device.name}</span>
            <span className="px-3 py-1 bg-white/10 rounded-full text-sm">
              {device.status}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}