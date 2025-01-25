"use client";

import { Music2, Pause, Volume2, Shuffle, Repeat, ListMusic } from "lucide-react";
import ScrollContainer from "../ScrollContainer";

export default function Music() {
  const queue = [
    {
      title: "Ambient Flow",
       duration: "5:32"
    },

  ];

  const queueItems = queue.map((track, index) => (
    <div
      key={index}
      className="p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all mb-2"
    >
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-medium mb-1">{track.title}</h4>
          <p className="text-sm text-white/70">{track.artist}</p>
        </div>
        <span className="text-sm text-white/50">{track.duration}</span>
      </div>
    </div>
  ));

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-3 mb-4">
        <Music2 className="w-6 h-6 text-purple-400" />
        <h3 className="text-lg font-semibold">Now Playing</h3>
      </div>

      <div className="bg-white/5 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h4 className="font-medium">Focus Mix</h4>
            <p className="text-sm text-white/70">AI Generated</p>
          </div>
          <div className="flex items-center gap-3">
            <Shuffle className="w-4 h-4 text-white/50 hover:text-white cursor-pointer" />
            <Repeat className="w-4 h-4 text-white/50 hover:text-white cursor-pointer" />
            <Volume2 className="w-4 h-4 text-white/50 hover:text-white cursor-pointer" />
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="w-10 h-10 rounded-full bg-purple-400 flex items-center justify-center hover:bg-purple-500 transition-colors">
            <Pause className="w-5 h-5 text-white" />
          </button>
          <div className="flex-1">
            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full w-2/3 bg-purple-400 rounded-full" />
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-xs text-white/50">2:14</span>
              <span className="text-xs text-white/50">3:45</span>
            </div>
          </div>
        </div>
      </div>


      <ScrollContainer 
        items={queueItems}
        itemsPerView={3}
        className="pb-8" // Add padding for the navigation controls
      />
    </div>
  );
}