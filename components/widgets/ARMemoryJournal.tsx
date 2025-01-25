import { BookOpen, Camera, Star, Heart } from 'lucide-react';

export default function ARMemoryJournal() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-teal-400" />
          <span className="text-sm text-white/70">Today's Memories</span>
        </div>
        <button className="p-2 rounded-full bg-white/10 hover:bg-white/20">
          <Camera className="w-4 h-4 text-white" />
        </button>
      </div>

      <div className="space-y-3">
        <div className="p-3 rounded-xl bg-white/5">
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-4 h-4 text-yellow-400" />
            <span className="text-sm text-white/70">10:30 AM - Peak Moment</span>
          </div>
          <div className="text-sm text-white">
            "Successfully presented your project! Your confidence was radiating through the room."
          </div>
        </div>

        <div className="p-3 rounded-xl bg-white/5">
          <div className="flex items-center gap-2 mb-2">
            <Heart className="w-4 h-4 text-red-400" />
            <span className="text-sm text-white/70">2:15 PM - Gratitude</span>
          </div>
          <div className="text-sm text-white">
            "Coffee with Sarah - great conversation about personal growth and future plans."
          </div>
        </div>
      </div>

      <div className="p-3 rounded-xl bg-gradient-to-r from-teal-500/20 to-blue-500/20">
        <div className="text-sm text-white/70 mb-2">Memory Insight</div>
        <div className="text-sm text-white">
          "You're building meaningful connections. These moments contribute to your long-term happiness."
        </div>
      </div>
    </div>
  );
} 