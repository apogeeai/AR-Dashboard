import { Moon, Cloud, Sparkles, Brain } from 'lucide-react';

export default function ARDreamAnalyzer() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-full bg-indigo-500/20">
          <Moon className="w-5 h-5 text-indigo-400" />
        </div>
        <div>
          <div className="text-sm text-white/70">Last Night's Dream</div>
          <div className="text-lg font-semibold text-white">Ocean Journey</div>
        </div>
      </div>

      <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20">
        <div className="flex items-center gap-2 mb-2">
          <Cloud className="w-4 h-4 text-purple-400" />
          <span className="text-sm text-white/70">Dream Themes</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {['Adventure', 'Water', 'Journey', 'Discovery'].map((theme) => (
            <span
              key={theme}
              className="px-2 py-1 text-xs rounded-full bg-white/10 text-white/90"
            >
              {theme}
            </span>
          ))}
        </div>
      </div>

      <div className="p-3 rounded-xl bg-white/5">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-yellow-400" />
          <span className="text-sm text-white/70">Symbolism</span>
        </div>
        <div className="text-sm text-white">
          "The ocean represents your emotional depth. Swimming suggests you're navigating feelings confidently."
        </div>
      </div>

      <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20">
        <div className="flex items-center gap-2 mb-2">
          <Brain className="w-4 h-4 text-blue-400" />
          <span className="text-sm text-white/70">Subconscious Insight</span>
        </div>
        <div className="text-sm text-white">
          "Your dreams indicate growing emotional intelligence and readiness for new challenges."
        </div>
      </div>
    </div>
  );
} 