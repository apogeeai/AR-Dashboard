import { Users, Brain, Sparkles } from 'lucide-react';

export default function ARSocialPulse() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-full bg-purple-500/20">
          <Users className="w-5 h-5 text-purple-400" />
        </div>
        <div>
          <div className="text-sm text-white/70">Current Social Energy</div>
          <div className="text-lg font-semibold text-white">85% - Energized</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="p-3 rounded-xl bg-white/5">
          <div className="flex items-center gap-2 mb-2">
            <Brain className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-white/70">Empathy Score</span>
          </div>
          <div className="text-lg font-medium text-white">92%</div>
        </div>
        <div className="p-3 rounded-xl bg-white/5">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span className="text-sm text-white/70">Charisma</span>
          </div>
          <div className="text-lg font-medium text-white">78%</div>
        </div>
      </div>

      <div className="p-3 rounded-xl bg-white/5">
        <div className="text-sm text-white/70 mb-2">Real-time Insights</div>
        <div className="text-sm text-white">
          "Your voice tone is warm and engaging. Consider maintaining more eye contact to build stronger connections."
        </div>
      </div>
    </div>
  );
} 