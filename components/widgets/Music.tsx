"use client";

import { Music2, Pause, Volume2, Play, SkipBack, SkipForward } from "lucide-react";
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface MusicProps {
  currentSound?: HTMLAudioElement | null;
  isPlaying?: boolean;
  onTogglePlay?: () => void;
  onSeek?: (time: number) => void;
  onPrevSound?: () => void;
  onNextSound?: () => void;
}

export default function Music({ currentSound, isPlaying, onTogglePlay, onSeek, onPrevSound, onNextSound }: MusicProps) {
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showVolume, setShowVolume] = useState(false);
  const [volume, setVolume] = useState(0.5);

  useEffect(() => {
    if (!currentSound) return;

    const updateProgress = () => {
      setProgress((currentSound.currentTime / currentSound.duration) * 100);
      setCurrentTime(currentSound.currentTime);
      setDuration(currentSound.duration);
    };

    // Update immediately and then every 100ms
    updateProgress();
    const interval = setInterval(updateProgress, 100);

    // Update when the sound is loaded
    currentSound.addEventListener('loadedmetadata', updateProgress);

    return () => {
      clearInterval(interval);
      currentSound.removeEventListener('loadedmetadata', updateProgress);
    };
  }, [currentSound]);

  useEffect(() => {
    if (currentSound) {
      currentSound.volume = volume;
    }
  }, [volume, currentSound]);

  const getCurrentSoundName = () => {
    if (!currentSound) return 'No sound selected';
    const url = currentSound.src;
    const match = url.match(/\/sounds\/(.+)\.mp3$/);
    if (!match) return 'Unknown';
    
    // Special handling for Café
    if (match[1] === 'cafe') return 'Café';
    
    // Default case: capitalize first letter
    return match[1].charAt(0).toUpperCase() + match[1].slice(1);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!currentSound || !onSeek) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const newTime = percentage * duration;
    onSeek(newTime);
  };

  const handleVolumeChange = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!currentSound) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const y = rect.bottom - e.clientY;
    const percentage = Math.max(0, Math.min(1, y / rect.height));
    setVolume(percentage);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-3 mb-4">
        <Music2 className="w-6 h-6 text-purple-400" />
        <h3 className="text-lg font-semibold">Ambient Sounds</h3>
      </div>

      <div className="bg-white/5 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h4 className="font-medium">{getCurrentSoundName()}</h4>
            <p className="text-sm text-white/70">Ambient Sound</p>
          </div>
          <div className="flex items-center gap-3 relative">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowVolume(!showVolume)}
              className="relative p-1 rounded-full hover:bg-white/10"
            >
              <Volume2 className="w-4 h-4 text-white/50 hover:text-white cursor-pointer" />
            </motion.button>
            {showVolume && (
              <div 
                className="absolute bottom-full right-0 mb-2 w-6 h-24 bg-black/50 backdrop-blur-xl rounded-lg overflow-hidden cursor-pointer"
                onClick={handleVolumeChange}
              >
                <div className="absolute bottom-0 left-0 w-full bg-purple-400 transition-all duration-150"
                     style={{ height: `${volume * 100}%` }} />
                <div className="absolute inset-0 hover:bg-white/5 transition-colors" />
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onTogglePlay}
            className="w-10 h-10 rounded-full bg-purple-400 flex items-center justify-center hover:bg-purple-500 transition-colors"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 text-white" />
            ) : (
              <Play className="w-5 h-5 text-white" />
            )}
          </motion.button>

          {currentSound && (
            <div className="flex-1">
              <div 
                className="relative h-1 bg-white/10 rounded-full overflow-hidden cursor-pointer group"
                onClick={handleProgressClick}
              >
                <motion.div
                  className="absolute left-0 top-0 h-full bg-purple-400"
                  style={{ width: `${progress}%` }}
                />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="h-full bg-white/10" />
                </div>
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-xs text-white/50">{formatTime(currentTime)}</span>
                <span className="text-xs text-white/50">{formatTime(duration)}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-center gap-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-2 rounded-full bg-white/5 hover:bg-white/10"
          onClick={onPrevSound}
        >
          <SkipBack className="w-5 h-5 text-white" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-2 rounded-full bg-white/5 hover:bg-white/10"
          onClick={onNextSound}
        >
          <SkipForward className="w-5 h-5 text-white" />
        </motion.button>
      </div>
    </div>
  );
}