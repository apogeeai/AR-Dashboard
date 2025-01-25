"use client";

import { Plus, Settings, Image, GripHorizontal, X, Volume2, Maximize2 } from "lucide-react";
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
import ARAssistant from "@/components/widgets/ARAssistant";
import ARCoach from "@/components/widgets/ARCoach";
import ARMeditation from "@/components/widgets/ARMeditation";
import ARWorkout from "@/components/widgets/ARWorkout";
import ARNutrition from "@/components/widgets/ARNutrition";
import { Layout } from 'react-grid-layout';
import RGL, { WidthProvider } from "react-grid-layout";
import 'react-grid-layout/css/styles.css';
import { Raleway, Open_Sans } from 'next/font/google';

const raleway = Raleway({ subsets: ['latin'] });
const openSans = Open_Sans({ subsets: ['latin'] });

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
  { 
    id: 'ar-assistant', 
    name: 'AR Assistant', 
    component: ARAssistant, 
    defaultSize: { w: 4, h: 4 },
    sizes: [{ w: 4, h: 4 }, { w: 8, h: 4 }, { w: 8, h: 8 }]
  },
  { 
    id: 'ar-coach', 
    name: 'Life Coach', 
    component: ARCoach, 
    defaultSize: { w: 4, h: 8 },
    sizes: [{ w: 4, h: 8 }, { w: 8, h: 8 }, { w: 16, h: 8 }]
  },
  { 
    id: 'ar-meditation', 
    name: 'Meditation Guide', 
    component: ARMeditation, 
    defaultSize: { w: 4, h: 4 },
    sizes: [{ w: 4, h: 4 }, { w: 8, h: 4 }, { w: 8, h: 8 }]
  },
  { 
    id: 'ar-workout', 
    name: 'AR Workout', 
    component: ARWorkout, 
    defaultSize: { w: 4, h: 8 },
    sizes: [{ w: 4, h: 8 }, { w: 8, h: 8 }, { w: 16, h: 8 }]
  },
  { 
    id: 'ar-nutrition', 
    name: 'Nutrition Advisor', 
    component: ARNutrition, 
    defaultSize: { w: 4, h: 8 },
    sizes: [{ w: 4, h: 8 }, { w: 8, h: 8 }, { w: 16, h: 8 }]
  }
];

const SOUNDS = [
  {
    name: "White Noise",
    url: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_1b0796efc7.mp3"
  },
  {
    name: "Rain",
    url: "https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3"
  },
  {
    name: "Ocean Waves",
    url: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_1b0796efc7.mp3"
  },
  {
    name: "Forest",
    url: "https://cdn.pixabay.com/download/audio/2021/08/09/audio_dc39bde808.mp3"
  }
];

// Restore the original layout generation
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
  const [currentSound, setCurrentSound] = useState<HTMLAudioElement | null>(null);
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  // Autonomous smooth parallax effect
  const time = useMotionValue(0);
  const springConfig = { damping: 85, stiffness: 45, mass: 3 };
  
  const moveX = useSpring(
    useTransform(time, [0, 100], [-13.2, 13.2]),
    springConfig
  );
  
  const moveY = useSpring(
    useTransform(time, [0, 100], [-6.6, 6.6]),
    springConfig
  );
  
  const rotateX = useSpring(
    useTransform(time, [0, 100], [-1.32, 1.32]),
    springConfig
  );
  
  const rotateY = useSpring(
    useTransform(time, [0, 100], [-1.32, 1.32]),
    springConfig
  );

  useEffect(() => {
    const interval = setInterval(() => {
      time.set(Math.sin(Date.now() / 4500) * 100);
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

  // Initialize audio only if window is defined and audio isn't already initialized
  useEffect(() => {
    if (typeof window !== 'undefined' && !currentSound) {
      const audio = new Audio(SOUNDS[0].url);
      audio.loop = true;
      audio.volume = 0.5; // Set a comfortable default volume
      setCurrentSound(audio);
    }

    // Cleanup
    return () => {
      if (currentSound) {
        currentSound.pause();
        setCurrentSound(null);
      }
    };
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

  const removeWidget = (widgetId: string) => {
    setActiveWidgets(activeWidgets.filter(w => w.id !== widgetId));
    setLayout(layout.filter(l => l.i !== widgetId));
  };

  const handleResizeDrag = (widgetId: string, dragX: number, dragY: number) => {
    const widget = activeWidgets.find(w => w.id === widgetId);
    if (!widget) return;

    const currentSizeIndex = widgetSizes[widgetId] || 0;
    const dragThreshold = 20;

    // Dragging up-left (make smaller)
    if (dragX < -dragThreshold && dragY < -dragThreshold && currentSizeIndex > 0) {
      cycleWidgetSize(widget, currentSizeIndex - 1);
    }
    // Dragging down-right (make bigger)
    else if (dragX > dragThreshold && dragY > dragThreshold && currentSizeIndex < widget.sizes.length - 1) {
      cycleWidgetSize(widget, currentSizeIndex + 1);
    }
  };

  // Update cycleWidgetSize to accept specific index
  const cycleWidgetSize = (widget: Widget, specificIndex?: number) => {
    const currentSizeIndex = widgetSizes[widget.id] || 0;
    const nextSizeIndex = specificIndex !== undefined ? 
      specificIndex : 
      (currentSizeIndex + 1) % widget.sizes.length;
    
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

  const toggleSound = () => {
    if (!currentSound) return;

    if (isPlaying) {
      currentSound.pause();
    } else {
      // Handle playback failure
      const playPromise = currentSound.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error("Playback failed:", error);
        });
      }
    }
    setIsPlaying(!isPlaying);
    setShowSoundMenu(false);
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
              className="absolute top-16 right-4 w-64 p-4 rounded-lg bg-black/50 backdrop-blur-xl border border-white/20 shadow-lg z-50"
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
              <div className="grid gap-2">
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
            {activeWidgets.map((widget) => {
              const WidgetComponent = widget.component;
              return (
                <div key={widget.id} className="group">
                  <div className={`relative h-full p-6 rounded-3xl backdrop-blur-xl
                               border border-white/20 shadow-lg transition-all duration-300
                               hover:bg-white/5 cursor-pointer bg-white/10 text-white ${openSans.className}`}>
                    {/* Drag handle */}
                    <div className="drag-handle absolute top-2 right-2 p-1.5 rounded-full 
                                  bg-black/20 backdrop-blur-sm z-10 opacity-0 
                                  group-hover:opacity-100 transition-opacity cursor-move">
                      <GripHorizontal className="w-4 h-4 text-white/70" />
                    </div>

                    {/* Size indicator */}
                    <div className="absolute top-2 left-2 p-1.5 rounded-full 
                                  bg-black/20 backdrop-blur-sm z-10 opacity-0 
                                  group-hover:opacity-100 transition-opacity">
                      <span className="text-xs text-white/70">
                        {widgetSizes[widget.id] ? 
                          `${widget.sizes[widgetSizes[widget.id]].w}×${widget.sizes[widgetSizes[widget.id]].h}` : 
                          `${widget.defaultSize.w}×${widget.defaultSize.h}`}
                      </span>
                    </div>

                    {/* Delete button */}
                    <motion.button
                      className="absolute bottom-2 left-2 p-2 rounded-full 
                                bg-black/30 backdrop-blur-sm z-10 opacity-0 
                                group-hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeWidget(widget.id);
                      }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <X className="w-4 h-4 text-white/70" />
                    </motion.button>

                    {/* Resize handle */}
                    <motion.div
                      className="absolute bottom-2 right-2 p-2 rounded-full 
                                bg-black/30 backdrop-blur-sm z-10 opacity-0 
                                group-hover:opacity-100 transition-opacity cursor-se-resize"
                      onPointerDown={(e) => {
                        const targetWidget = activeWidgets.find(w => w.id === widget.id);
                        if (!targetWidget) return;

                        const startX = e.clientX;
                        const startY = e.clientY;
                        const currentSize = widget.sizes[widgetSizes[widget.id] || 0];

                        const onPointerMove = (e: PointerEvent) => {
                          const deltaX = e.clientX - startX;
                          const deltaY = e.clientY - startY;
                          const dragThreshold = 20;

                          // Dragging up only (vertical resize)
                          if (Math.abs(deltaX) < dragThreshold && deltaY < -dragThreshold) {
                            if (currentSize.h === 16) {
                              const smallerSize = widget.sizes.findIndex(s => s.w === currentSize.w && s.h === 4);
                              if (smallerSize !== -1) {
                                cycleWidgetSize(targetWidget, smallerSize);
                                document.removeEventListener('pointermove', onPointerMove);
                                document.removeEventListener('pointerup', onPointerUp);
                              }
                            }
                          }
                          // Dragging up-left (make smaller)
                          else if (deltaX < -dragThreshold && deltaY < -dragThreshold) {
                            if (currentSize.w === 16 && currentSize.h === 16) {
                              const smallestSize = widget.sizes.findIndex(s => s.w === 4 && s.h === 4);
                              if (smallestSize !== -1) {
                                cycleWidgetSize(targetWidget, smallestSize);
                                document.removeEventListener('pointermove', onPointerMove);
                                document.removeEventListener('pointerup', onPointerUp);
                              }
                            }
                          }
                        };

                        const onPointerUp = () => {
                          document.removeEventListener('pointermove', onPointerMove);
                          document.removeEventListener('pointerup', onPointerUp);
                        };

                        document.addEventListener('pointermove', onPointerMove);
                        document.addEventListener('pointerup', onPointerUp);
                      }}
                    >
                      <Maximize2 className="w-4 h-4 text-white/70" />
                    </motion.div>

                    <div onClick={() => cycleWidgetSize(widget)}>
                      <h3 className={`text-lg font-semibold ${raleway.className}`}>{widget.name}</h3>
                      <WidgetComponent />
                    </div>
                  </div>
                </div>
              );
            })}
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
                {SOUNDS.map((sound, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      if (currentSound) {
                        currentSound.pause();
                        if (currentSound.src === sound.url) {
                          setIsPlaying(false);
                          return;
                        }
                      }
                      const audio = new Audio(sound.url);
                      audio.loop = true;
                      audio.volume = 0.5;
                      audio.play().catch(console.error);
                      setCurrentSound(audio);
                      setIsPlaying(true);
                    }}
                    className={`flex items-center gap-3 w-full p-2 rounded-lg 
                              transition-all ${
                                isPlaying && currentSound?.src === sound.url
                                  ? 'bg-white/20'
                                  : 'bg-white/5 hover:bg-white/10'
                              }`}
                  >
                    <Volume2 className={`w-4 h-4 ${
                      isPlaying && currentSound?.src === sound.url
                        ? 'text-white'
                        : 'text-white/70'
                    }`} />
                    <span className="text-white/90 text-sm">{sound.name}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Settings Modal */}
        <AnimatePresence>
          {showSettingsModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
              onClick={() => setShowSettingsModal(false)}
            >
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
                className="w-[400px] bg-black/50 backdrop-blur-xl p-6 rounded-2xl border border-white/20 shadow-lg"
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className={`text-xl font-semibold text-white ${raleway.className}`}>Settings</h2>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowSettingsModal(false)}
                    className="p-2 rounded-full hover:bg-white/10"
                  >
                    <X className="w-5 h-5 text-white/70" />
                  </motion.button>
                </div>

                <div className="space-y-6">
                  {/* Theme */}
                  <div>
                    <h3 className="text-sm font-medium text-white/90 mb-3">Theme</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <button className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-left">
                        <span className="text-sm font-medium text-white/90">Light</span>
                      </button>
                      <button className="p-3 rounded-xl bg-white/10 border border-white/20 text-left">
                        <span className="text-sm font-medium text-white">Dark</span>
                      </button>
                    </div>
                  </div>

                  {/* Layout */}
                  <div>
                    <h3 className="text-sm font-medium text-white/90 mb-3">Layout</h3>
                    <div className="space-y-2">
                      <button className="w-full p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-left">
                        <span className="text-sm font-medium text-white/90">Compact</span>
                      </button>
                      <button className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-left">
                        <span className="text-sm font-medium text-white">Comfortable</span>
                      </button>
                    </div>
                  </div>

                  {/* Animations */}
                  <div>
                    <h3 className="text-sm font-medium text-white/90 mb-3">Animations</h3>
                    <div className="space-y-3">
                      <label className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10">
                        <span className="text-sm text-white/90">Parallax Effect</span>
                        <input type="checkbox" className="toggle" defaultChecked />
                      </label>
                      <label className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10">
                        <span className="text-sm text-white/90">Transitions</span>
                        <input type="checkbox" className="toggle" defaultChecked />
                      </label>
                    </div>
                  </div>

                  {/* Reset */}
                  <button className="w-full p-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-500 text-sm font-medium">
                    Reset All Settings
                  </button>
                </div>
              </motion.div>
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
              if (!showSoundMenu) {
                toggleSound();
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
            onClick={() => setShowSettingsModal(true)}
            className="p-3 rounded-full bg-white/10 backdrop-blur-xl hover:bg-white/20 transition-all border border-white/20 shadow-lg"
          >
            <Settings className="w-6 h-6 text-white" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}