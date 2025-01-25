import { Flower2, Droplets, Sun, Wind } from 'lucide-react';

export default function ARHabitGarden() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Flower2 className="w-5 h-5 text-pink-400" />
          <span className="text-sm text-white/70">Your Habit Garden</span>
        </div>
        <div className="text-sm text-white">Level 7</div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="p-3 rounded-xl bg-gradient-to-br from-pink-500/20 to-purple-500/20">
          <div className="flex items-center gap-2 mb-2">
            <Droplets className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-white/70">Meditation</span>
          </div>
          <div className="text-xs text-white/70">21 day streak</div>
          <div className="mt-2 h-1 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full w-3/4 bg-blue-400 rounded-full" />
          </div>
        </div>

        <div className="p-3 rounded-xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20">
          <div className="flex items-center gap-2 mb-2">
            <Sun className="w-4 h-4 text-yellow-400" />
            <span className="text-sm text-white/70">Exercise</span>
          </div>
          <div className="text-xs text-white/70">15 day streak</div>
          <div className="mt-2 h-1 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full w-1/2 bg-yellow-400 rounded-full" />
          </div>
        </div>
      </div>

      <div className="p-3 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20">
        <div className="flex items-center gap-2 mb-2">
          <Wind className="w-4 h-4 text-emerald-400" />
          <span className="text-sm text-white/70">Garden Status</span>
        </div>
        <div className="text-sm text-white">
          "Your habit garden is thriving! Your meditation flower is about to bloom."
        </div>
        <div className="mt-3 text-xs text-white/70">
          Next Achievement: "Zen Master" (2 days remaining)
        </div>
      </div>
    </div>
  );
} 