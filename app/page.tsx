"use client";

import { Plus, Settings, Image, GripHorizontal, X, Volume2 } from "lucide-react";
import { motion, Reorder, useDragControls, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import Clock from "@/components/widgets/Clock";
import Weather from "@/components/widgets/Weather";
import Calendar from "@/components/widgets/Calendar";
import Music from "@/components/widgets/Music";
import Tasks from "@/components/widgets/Tasks";
import Messages from "@/components/widgets/Messages";
import Email from "@/components/widgets/Email";
import TwitterTrends from "@/components/widgets/TwitterTrends";
import CryptoTicker from "@/components/widgets/CryptoTicker";
import FitnessTracker from "@/components/widgets/FitnessTracker";
import SmartHome from "@/components/widgets/SmartHome";
import { Layout } from 'react-grid-layout';
import RGL, { WidthProvider } from "react-grid-layout";
import 'react-grid-layout/css/styles.css';

const ReactGridLayout = WidthProvider(RGL);

interface Widget {
  id: string;
  name: string;
  component: React.ComponentType;
  defaultSize: {
    w: number;
    h: number;
  };
  sizes: Array<{ w: number; h: number }>;  // Available size configurations
}

const AVAILABLE_WIDGETS: Widget[] = [
  { 
    id: 'clock', 
    name: 'Clock', 
    component: Clock, 
    defaultSize: { w: 4, h: 4 },
    sizes: [{ w: 4, h: 4 }, { w: 8, h: 4 }, { w: 8, h: 8 }]
  },
  { 
    id: 'weather', 
    name: 'Weather', 
    component: Weather, 
    defaultSize: { w: 4, h: 4 },
    sizes: [{ w: 4, h: 4 }, { w: 8, h: 4 }]
  },
  { 
    id: 'crypto', 
    name: 'Crypto', 
    component: CryptoTicker, 
    defaultSize: { w: 4, h: 4 },
    sizes: [{ w: 4, h: 4 }, { w: 8, h: 4 }]
  },
  { 
    id: 'calendar', 
    name: 'Calendar', 
    component: Calendar, 
    defaultSize: { w: 4, h: 8 },
    sizes: [{ w: 4, h: 8 }, { w: 8, h: 8 }]
  },
  { 
    id: 'fitness', 
    name: 'Fitness', 
    component: FitnessTracker, 
    defaultSize: { w: 4, h: 8 },
    sizes: [{ w: 4, h: 8 }, { w: 8, h: 8 }]
  },
  { 
    id: 'email', 
    name: 'Email', 
    component: Email, 
    defaultSize: { w: 8, h: 8 },
    sizes: [{ w: 8, h: 8 }, { w: 8, h: 12 }]
  },
  { 
    id: 'music', 
    name: 'Music', 
    component: Music, 
    defaultSize: { w: 4, h: 4 },
    sizes: [{ w: 4, h: 4 }, { w: 8, h: 4 }]
  },
  { 
    id: 'smarthome', 
    name: 'Smart Home', 
    component: SmartHome, 
    defaultSize: { w: 4, h: 4 },
    sizes: [{ w: 4, h: 4 }, { w: 8, h: 4 }]
  },
  { 
    id: 'tasks', 
    name: 'Tasks', 
    component: Tasks, 
    defaultSize: { w: 4, h: 4 },
    sizes: [{ w: 4, h: 4 }, { w: 8, h: 8 }]
  },
  { 
    id: 'twitter', 
    name: 'Twitter', 
    component: TwitterTrends, 
    defaultSize: { w: 8, h: 4 },
    sizes: [{ w: 8, h: 4 }, { w: 8, h: 8 }]
  },
  { 
    id: 'messages', 
    name: 'Messages', 
    component: Messages, 
    defaultSize: { w: 4, h: 4 },
    sizes: [{ w: 4, h: 4 }, { w: 8, h: 8 }]
  },
];

interface Sound {
  id: string;
  name: string;
  file: string;
}

const SOUNDS: Sound[] = [
  { id: 'white-noise', name: 'White Noise', file: '/sounds/white-noise.mp3' },
  { id: 'rain', name: 'Rain', file: '/sounds/rain.mp3' },
  { id: 'ocean', name: 'Ocean', file: '/sounds/ocean.mp3' },
  { id: 'jungle', name: 'Jungle', file: '/sounds/jungle.mp3' },
];

// Improved layout generation
const generateLayout = (widgets: Widget[]): Layout[] => {
  const maxCols = 16;
  let x = 0;
  let y = 0;
  let maxRowHeight = 0;

  return widgets.map((widget) => {
    // If this widget won't fit in current row, move to next row
    if (x + widget.defaultSize.w > maxCols) {
      x = 0;
      y += maxRowHeight;
      maxRowHeight = 0;
    }

    const layout = {
      i: widget.id,
      x,
      y,
      w: widget.defaultSize.w,
      h: widget.defaultSize.h,
      minW: widget.defaultSize.w,
      maxW: widget.defaultSize.w,
      minH: widget.defaultSize.h,
      maxH: widget.defaultSize.h,
    };

    // Update position for next widget
    x += widget.defaultSize.w;
    maxRowHeight = Math.max(maxRowHeight, widget.defaultSize.h);

    return layout;
  });
};

export default function Home() {
  const [bgImage, setBgImage] = useState("https://w.wallhaven.cc/full/2y/wallhaven-2y7q2y.png");
  const [activeWidgets, setActiveWidgets] = useState<Widget[]>(AVAILABLE_WIDGETS);
  const [layout, setLayout] = useState<Layout[]>(() => generateLayout(AVAILABLE_WIDGETS));
  const [bgImages, setBgImages] = useState<string[]>([]);
  const [showBgSelector, setShowBgSelector] = useState(false);
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [widgetSizes, setWidgetSizes] = useState<Record<string, number>>({});
  const [showSoundMenu, setShowSoundMenu] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSound, setCurrentSound] = useState<string>('white-noise');
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  // Autonomous smooth parallax effect
  const time = useMotionValue(0);
  const springConfig = { damping: 100, stiffness: 50, mass: 3 };
  
  const moveX = useSpring(
    useTransform(time, [0, 100], [-10, 10]), 
    springConfig
  );
  
  const moveY = useSpring(
    useTransform(time, [0, 100], [-5, 5]), 
    springConfig
  );
  
  const rotateX = useSpring(
    useTransform(time, [0, 100], [-1, 1]), 
    springConfig
  );
  
  const rotateY = useSpring(
    useTransform(time, [0, 100], [-1, 1]), 
    springConfig
  );

  useEffect(() => {
    const interval = setInterval(() => {
      time.set(Math.sin(Date.now() / 5000) * 100);
    }, 16);
    return () => clearInterval(interval);
  }, [time]);

  // Load background images from public/images directory
  useEffect(() => {
    const loadImages = async () => {
      try {
        const response = await fetch('/api/images');
        const images = await response.json();
        setBgImages(images);
      } catch (error) {
        console.error('Error loading background images:', error);
      }
    };
    loadImages();
  }, []);

  // Initialize audio with the first sound
  useEffect(() => {
    if (typeof Audio !== 'undefined') {
      const newAudio = new Audio(SOUNDS[0].file);
      newAudio.loop = true;
      setAudio(newAudio);
    }
  }, []);

  const addWidget = (widget: Widget) => {
    const newWidget = { ...widget, id: `${widget.id}-${Date.now()}` };
    const lastLayout = layout[layout.length - 1];
    const newLayout: Layout = {
      i: newWidget.id,
      x: (lastLayout?.x || 0) + (lastLayout?.w || 0),
      y: lastLayout?.y || 0,
      w: widget.defaultSize.w,
      h: widget.defaultSize.h,
      minW: widget.defaultSize.w,
      maxW: widget.defaultSize.w,
      minH: widget.defaultSize.h,
      maxH: widget.defaultSize.h,
    };

    setActiveWidgets([...activeWidgets, newWidget]);
    setLayout([...layout, newLayout]);
    setShowAddMenu(false);
  };

  const cycleWidgetSize = (widget: Widget) => {
    const currentSizeIndex = widgetSizes[widget.id] || 0;
    const nextSizeIndex = (currentSizeIndex + 1) % widget.sizes.length;
    const newSize = widget.sizes[nextSizeIndex];
    
    setWidgetSizes({
      ...widgetSizes,
      [widget.id]: nextSizeIndex
    });

    setLayout(layout.map(item => {
      if (item.i === widget.id) {
        return {
          ...item,
          w: newSize.w,
          h: newSize.h,
          minW: newSize.w,
          maxW: newSize.w,
          minH: newSize.h,
          maxH: newSize.h,
        };
      }
      return item;
    }));
  };

  // Handle sound changes
  const changeSound = (soundId: string) => {
    if (audio) {
      const newSound = SOUNDS.find(s => s.id === soundId);
      if (newSound) {
        const wasPlaying = !audio.paused;
        audio.src = newSound.file;
        audio.load();
        if (wasPlaying) {
          audio.play();
        }
        setCurrentSound(soundId);
      }
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black/20">
      {/* Background with autonomous parallax */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full"
        style={{
          x: moveX,
          y: moveY,
          rotateX: rotateX,
          rotateY: rotateY,
          scale: 1.05,
          transformStyle: "preserve-3d",
          transformOrigin: "center center"
        }}
      >
        <motion.img
          key={bgImage}
          src={bgImage}
          alt="Background"
          className="absolute top-0 left-0 w-[110%] h-[110%] object-cover"
          initial={{ opacity: 0, scale: 1.2 }}
          animate={{ opacity: 1, scale: 1.1 }}
          transition={{ duration: 0.8 }}
          style={{
            x: "-5%",
            y: "-5%",
            transformOrigin: "center center"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </motion.div>

      {/* Static Content Overlay */}
      <div className="relative z-10 min-h-screen p-4">
        {/* Add Widget Button */}
        <motion.button
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAddMenu(!showAddMenu)}
          className="absolute top-4 right-4 p-3 rounded-full bg-white/10 backdrop-blur-xl hover:bg-white/20 transition-all border border-white/20 shadow-lg"
        >
          <Plus className="w-6 h-6 text-white" />
        </motion.button>

        {/* Add Widget Menu */}
        <AnimatePresence>
          {showAddMenu && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-16 right-4 w-64 p-4 rounded-lg bg-black/50 backdrop-blur-xl border border-white/20 shadow-lg"
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-white/90 text-sm font-medium">Add Widget</h3>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowAddMenu(false)}
                  className="p-1 rounded-full hover:bg-white/10"
                >
                  <X className="w-4 h-4 text-white/70" />
                </motion.button>
              </div>
              <div className="grid gap-2 max-h-[400px] overflow-y-auto">
                {AVAILABLE_WIDGETS.map((widget) => (
                  <motion.button
                    key={widget.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => addWidget(widget)}
                    className="flex items-center gap-3 w-full p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all"
                  >
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                      <Plus className="w-4 h-4 text-white/70" />
                    </div>
                    <span className="text-white/90 text-sm">{widget.name}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bento Grid Layout */}
        <div className="pt-16 px-4 mx-auto max-w-[1260px]">
          <ReactGridLayout
            className="layout"
            layout={layout}
            cols={16}
            rowHeight={75}
            margin={[8, 8]}
            containerPadding={[0, 0]}
            onLayoutChange={setLayout}
            draggableHandle=".drag-handle"
            isBounded
            isResizable={false}
          >
            {activeWidgets.map((widget) => (
              <div key={widget.id} className="group">
                <div
                  className="relative h-full p-6 rounded-3xl backdrop-blur-xl
                           border border-white/20 shadow-lg transition-all duration-300
                           hover:bg-white/5 cursor-pointer bg-white/10 text-white"
                  onClick={() => cycleWidgetSize(widget)}
                >
                  <div className="drag-handle absolute top-2 right-2 p-1.5 rounded-full 
                                bg-black/20 backdrop-blur-sm z-10 opacity-0 
                                group-hover:opacity-100 transition-opacity cursor-move">
                    <GripHorizontal className="w-4 h-4 text-white/70" />
                  </div>
                  <div className="absolute top-2 left-2 p-1.5 rounded-full 
                                bg-black/20 backdrop-blur-sm z-10 opacity-0 
                                group-hover:opacity-100 transition-opacity">
                    <span className="text-xs text-white/70">
                      {widgetSizes[widget.id] ? 
                        `${widget.sizes[widgetSizes[widget.id]].w}×${widget.sizes[widgetSizes[widget.id]].h}` : 
                        `${widget.defaultSize.w}×${widget.defaultSize.h}`}
                    </span>
                  </div>
                  <widget.component />
                </div>
              </div>
            ))}
          </ReactGridLayout>
        </div>

        {/* Background Image Selector */}
        <AnimatePresence>
          {showBgSelector && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed bottom-20 right-4 p-4 rounded-lg bg-black/50 backdrop-blur-xl border border-white/20 shadow-lg"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-white/90 text-sm font-medium">Choose Background</h3>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowBgSelector(false)}
                  className="p-1 rounded-full hover:bg-white/10"
                >
                  <X className="w-4 h-4 text-white/70" />
                </motion.button>
              </div>
              <div className="grid grid-cols-3 gap-2 max-h-[300px] overflow-y-auto">
                {bgImages.map((image, index) => (
                  <motion.button
                    key={image}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setBgImage(image)}
                    className="relative aspect-video rounded-lg overflow-hidden border-2 border-transparent hover:border-white/50 transition-all"
                  >
                    <img 
                      src={`${image}?w=200`} // Add width parameter for smaller thumbnails
                      alt={`Background ${index + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sound Menu */}
        <AnimatePresence>
          {showSoundMenu && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed bottom-20 right-4 p-4 rounded-lg bg-black/50 backdrop-blur-xl border border-white/20 shadow-lg"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-white/90 text-sm font-medium">Ambient Sounds</h3>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowSoundMenu(false)}
                  className="p-1 rounded-full hover:bg-white/10"
                >
                  <X className="w-4 h-4 text-white/70" />
                </motion.button>
              </div>
              <div className="grid gap-2 w-48">
                {SOUNDS.map((sound) => (
                  <motion.button
                    key={sound.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      changeSound(sound.id);
                      setShowSoundMenu(false);
                    }}
                    className={`flex items-center gap-3 w-full p-2 rounded-lg 
                              transition-all ${
                                currentSound === sound.id ? 
                                'bg-white/20' : 
                                'bg-white/5 hover:bg-white/10'
                              }`}
                  >
                    <Volume2 className={`w-4 h-4 ${
                      currentSound === sound.id ? 
                      'text-white' : 
                      'text-white/70'
                    }`} />
                    <span className="text-white/90 text-sm">{sound.name}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Control Buttons */}
        <div className="fixed bottom-4 right-4 flex gap-2">
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ delay: 1.2 }}
            onClick={() => setShowBgSelector(!showBgSelector)}
            className="p-3 rounded-full bg-white/10 backdrop-blur-xl hover:bg-white/20 transition-all border border-white/20 shadow-lg"
          >
            <Image className="w-6 h-6 text-white" />
          </motion.button>
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              if (audio) {
                if (isPlaying) {
                  audio.pause();
                } else {
                  audio.play();
                }
                setIsPlaying(!isPlaying);
              }
              setShowSoundMenu(!showSoundMenu);
            }}
            className={`p-3 rounded-full backdrop-blur-xl transition-all border border-white/20 shadow-lg
                      ${isPlaying ? 'bg-white/20' : 'bg-white/10 hover:bg-white/20'}`}
          >
            <Volume2 className="w-6 h-6 text-white" />
          </motion.button>
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ delay: 1.2 }}
            className="p-3 rounded-full bg-white/10 backdrop-blur-xl hover:bg-white/20 transition-all border border-white/20 shadow-lg"
          >
            <Settings className="w-6 h-6 text-white" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}