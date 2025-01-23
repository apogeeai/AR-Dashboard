"use client";

import { Bitcoin } from "lucide-react";
import { motion } from "framer-motion";

export default function CryptoTicker() {
  const cryptos = [
    { name: "BTC", price: "43,521.23", change: "+2.4%" },
    { name: "ETH", price: "2,853.12", change: "+1.8%" },
    { name: "SOL", price: "98.45", change: "+5.2%" },
  ];

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="p-6 rounded-3xl bg-white/10 backdrop-blur-md text-white shadow-lg border border-white/10"
    >
      <div className="flex items-center mb-4">
        <Bitcoin className="w-6 h-6 mr-2" />
        <h3 className="text-xl font-semibold">Crypto</h3>
      </div>
      <div className="space-y-3">
        {cryptos.map((crypto, index) => (
          <div key={index} className="flex justify-between items-center">
            <span className="font-medium">{crypto.name}</span>
            <div className="text-right">
              <div className="font-bold">${crypto.price}</div>
              <div className="text-sm text-emerald-400">{crypto.change}</div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}