import { Smile, TrendingUp, Zap } from 'lucide-react';

export default function ARMoodTracker() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-full bg-green-500/20">
          <Smile className="w-5 h-5 text-green-400" />
        </div>
        <div>
          <div className="text-sm text-white/70">Current Mood</div>
          <div className="text-lg font-semibold text-white">Optimistic & Calm</div>
        </div>
      </div>

      <div className="p-3 rounded-xl bg-white/5">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="w-4 h-4 text-blue-400" />
          <span className="text-sm text-white/70">Mood Pattern</span>
        </div>
        <div className="h-10 flex items-end gap-1">
          {[60, 75, 65, 80, 85, 70, 90].map((value, i) => (
            <div
              key={i}
              style={{ height: `${value}%` }}
              className="flex-1 bg-gradient-to-t from-blue-500/50 to-green-500/50 rounded-t-sm"
            />
          ))}
        </div>
      </div>

      <div className="p-3 rounded-xl bg-gradient-to-r from-green-500/20 to-blue-500/20">
        <div className="flex items-center gap-2 mb-2">
          <Zap className="w-4 h-4 text-yellow-400" />
          <span className="text-sm text-white/70">Insight</span>
        </div>
        <div className="text-sm text-white">
          "Your mood improves significantly after morning meditation and social interactions."
        </div>
      </div>
    </div>
  );
} 