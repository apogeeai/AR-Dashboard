'use client';

import { Brain, MessageSquare, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ARAssistant() {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-3 mb-4">
        <Brain className="w-6 h-6 text-blue-400" />
        <h3 className="text-lg font-semibold">AR Assistant</h3>
      </div>
      
      <div className="flex-1 space-y-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-4 h-4 text-blue-400" />
          </div>
          <div className="flex-1 space-y-2">
            <p className="text-sm text-white/90">
              I noticed you've been working for 2 hours straight. Would you like to take a short break?
            </p>
            <div className="flex gap-2">
              <button className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-sm">
                Yes, remind me in 5 min
              </button>
              <button className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-sm">
                No, thanks
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
            <MessageSquare className="w-4 h-4 text-purple-400" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-white/70">
              How can I help you today? You can ask me anything or try voice commands.
            </p>
          </div>
        </div>
      </div>

    
    </div>
  );
} 