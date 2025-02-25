"use client";

import { Plus, Settings, Image, GripHorizontal, X, Volume2, Maximize2, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, Reorder, useDragControls, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
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
import ARSocialPulse from "@/components/widgets/ARSocialPulse";
import ARMemoryJournal from "@/components/widgets/ARMemoryJournal";
import ARMoodTracker from "@/components/widgets/ARMoodTracker";
import ARHabitGarden from "@/components/widgets/ARHabitGarden";
import ARDreamAnalyzer from "@/components/widgets/ARDreamAnalyzer";
import BioMarkers from "@/components/widgets/BioMarkers";
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
    sizes: [{ w: 4, h: 4 }, { w: 8, h: 4 }, { w: 4, h: 8 }, { w: 8, h: 8 }]
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
    sizes: [{ w: 4, h: 4 }, { w: 8, h: 4 }, { w: 8, h: 8 }]
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
  },
  { 
    id: 'ar-social-pulse', 
    name: 'Social Pulse', 
    component: ARSocialPulse, 
    defaultSize: { w: 4, h: 4 },
    sizes: [{ w: 4, h: 4 }, { w: 8, h: 8 }]
  },
  { 
    id: 'ar-memory-journal', 
    name: 'Memory Journal', 
    component: ARMemoryJournal, 
    defaultSize: { w: 4, h: 8 },
    sizes: [{ w: 4, h: 8 }, { w: 8, h: 8 }]
  },
  { 
    id: 'ar-mood-tracker', 
    name: 'Mood Insights', 
    component: ARMoodTracker, 
    defaultSize: { w: 4, h: 8 },
    sizes: [{ w: 4, h: 8 }, { w: 8, h: 4 }]
  },
  { 
    id: 'ar-habit-garden', 
    name: 'Habit Garden', 
    component: ARHabitGarden, 
    defaultSize: { w: 4, h: 8 },
    sizes: [{ w: 4, h: 8 }, { w: 8, h: 8 }]
  },
  { 
    id: 'ar-dream-analyzer', 
    name: 'Dream Analyzer', 
    component: ARDreamAnalyzer, 
    defaultSize: { w: 4, h: 8 },
    sizes: [{ w: 4, h: 8 }, { w: 8, h: 8 }]
  },
  { 
    id: 'biomarkers', 
    name: 'BioMarkers', 
    component: BioMarkers, 
    defaultSize: { w: 4, h: 8 },
    sizes: [{ w: 8, h: 8 }, { w: 12, h: 8 }, { w: 16, h: 8 }]
  },
];

const SOUNDS = [
  {
    name: "Rain",
    url: "/sounds/rain.mp3"
  },
  {
    name: "Forest",
    url: "/sounds/forest.mp3"
  },

  {
    name: "Café",
    url: "/sounds/cafe.mp3"
  },
  {
    name: "Space",
    url: "/sounds/space.mp3"
  },
  {
    name: "Waterfall",
    url: "/sounds/waterfall.mp3"
  },
  {
    name: "White Noise",
    url: "/sounds/white-noise.mp3"
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
  const [bgImage, setBgImage] = useState("/images/wallhaven-exk17r.jpg");
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
  const [theme, setTheme] = useState('dark');
  const [layoutMode, setLayoutMode] = useState('comfortable');
  const [parallaxEnabled, setParallaxEnabled] = useState(true);
  const [transitionsEnabled, setTransitionsEnabled] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 16; // Maximum rows per page
  const [widgetPage, setWidgetPage] = useState(0);

  // Autonomous smooth parallax effect
  const time = useMotionValue(0);
  const springConfig = { damping: 70, stiffness: 55, mass: 2.5 };
  
  const moveX = useSpring(
    useTransform(time, [0, 100], [-16, 16]),
    springConfig
  );
  
  const moveY = useSpring(
    useTransform(time, [0, 100], [-8, 8]),
    springConfig
  );
  
  const rotateX = useSpring(
    useTransform(time, [0, 100], [-2, 2]),
    springConfig
  );
  
  const rotateY = useSpring(
    useTransform(time, [0, 100], [-2, 2]),
    springConfig
  );

  useEffect(() => {
    const interval = setInterval(() => {
      time.set(Math.sin(Date.now() / 3500) * 100);
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

  // Initialize audio only if window is defined
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const audio = new Audio(SOUNDS[0].url);
      audio.loop = true;
      audio.volume = 0.5;
      setCurrentSound(audio);
    }

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

  const handleResizeDrag = (widget: Widget, startX: number, startY: number, currentSize: { w: number; h: number }) => {
    const onPointerMove = (e: PointerEvent) => {
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;
      const dragThreshold = 20;

      // Calculate the direction of drag
      const isDraggingLeft = deltaX < -dragThreshold;
      const isDraggingRight = deltaX > dragThreshold;
      const isDraggingUp = deltaY < -dragThreshold;
      const isDraggingDown = deltaY > dragThreshold;

      // Find available sizes
      const availableSizes = widget.sizes;
      const currentIndex = widgetSizes[widget.id] || 0;

      // Helper to find closest size
      const findClosestSize = (targetW: number, targetH: number) => {
        return availableSizes.findIndex(size => 
          size.w <= targetW && size.h <= targetH
        );
      };

      // Determine target size based on drag direction
      let targetIndex = currentIndex;

      // Prioritize vertical resizing when dragging up/down
      if (isDraggingUp) {
        // Find next smaller height while maintaining width
        targetIndex = availableSizes.findIndex(size => 
          size.w === currentSize.w && size.h < currentSize.h
        );
      } else if (isDraggingDown) {
        // Find next larger height while maintaining width
        const nextSize = availableSizes.find(size => 
          size.w === currentSize.w && size.h > currentSize.h
        );
        if (nextSize) {
          targetIndex = availableSizes.indexOf(nextSize);
        }
      } else if (isDraggingLeft && isDraggingUp) {
        // Shrink both dimensions
        targetIndex = findClosestSize(currentSize.w - 4, currentSize.h - 4);
      } else if (isDraggingRight && isDraggingDown) {
        // Grow both dimensions
        const nextSize = availableSizes[currentIndex + 1];
        if (nextSize) targetIndex = currentIndex + 1;
      } else if (isDraggingLeft) {
        // Shrink width only
        targetIndex = availableSizes.findIndex(size => 
          size.w < currentSize.w && size.h === currentSize.h
        );
      } else if (isDraggingRight) {
        // Grow width only
        const nextSize = availableSizes.find(size => 
          size.w > currentSize.w && size.h === currentSize.h
        );
        if (nextSize) {
          targetIndex = availableSizes.indexOf(nextSize);
        }
      }

      // Apply the size change if different and valid
      if (targetIndex !== -1 && targetIndex !== currentIndex) {
        cycleWidgetSize(widget, targetIndex);
        document.removeEventListener('pointermove', onPointerMove);
        document.removeEventListener('pointerup', onPointerUp);
      }
    };

    const onPointerUp = () => {
      document.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerup', onPointerUp);
    };

    document.addEventListener('pointermove', onPointerMove);
    document.addEventListener('pointerup', onPointerUp);
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

  // Filter layout items for current page
  const paginatedLayout = useMemo(() => {
    return layout.reduce((pages, item) => {
      const pageIndex = Math.floor(item.y / itemsPerPage);
      if (!pages[pageIndex]) pages[pageIndex] = [];
      pages[pageIndex].push({
        ...item,
        y: item.y % itemsPerPage // Adjust y position for current page
      });
      return pages;
    }, [] as Layout[][]);
  }, [layout, itemsPerPage]);

  const totalPages = paginatedLayout.length;

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black/20">
      {/* Background with autonomous parallax */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full"
        style={{
          x: parallaxEnabled ? moveX : 0,
          y: parallaxEnabled ? moveY : 0,
          rotateX: parallaxEnabled ? rotateX : 0,
          rotateY: parallaxEnabled ? rotateY : 0,
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
              className="absolute top-16 right-4 w-64 p-4 rounded-lg bg-black/50 backdrop-blur-xl border-[1px] border-white/30 shadow-lg z-50"
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
                {AVAILABLE_WIDGETS.slice(widgetPage * 9, (widgetPage + 1) * 9).map((widget) => (
                  <motion.button
                    key={widget.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => addWidget(widget)}
                    className="flex items-center gap-3 w-full h-[49.55px] px-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all"
                  >
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                      <Plus className="w-4 h-4 text-white/70" />
                    </div>
                    <span className="text-white/90 text-sm">{widget.name}</span>
                  </motion.button>
                ))}
              </div>
              {Math.ceil(AVAILABLE_WIDGETS.length / 10) > 1 && (
                <div className="flex items-center justify-center gap-2 mt-4 pt-3 border-t border-white/10">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setWidgetPage(prev => Math.max(0, prev - 1))}
                    disabled={widgetPage === 0}
                    className={`p-1.5 rounded-full ${widgetPage === 0 ? 'text-white/30' : 'text-white hover:bg-white/10'}`}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </motion.button>
                  <span className="text-sm font-medium text-white">
                    {widgetPage + 1} / {Math.ceil(AVAILABLE_WIDGETS.length / 9)}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setWidgetPage(prev => Math.min(Math.ceil(AVAILABLE_WIDGETS.length / 9) - 1, prev + 1))}
                    disabled={widgetPage === Math.ceil(AVAILABLE_WIDGETS.length / 9) - 1}
                    className={`p-1.5 rounded-full ${widgetPage === Math.ceil(AVAILABLE_WIDGETS.length / 9) - 1 ? 'text-white/30' : 'text-white hover:bg-white/10'}`}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </motion.button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bento Grid Layout */}
        <div className="pt-16 px-4 mx-auto max-w-[1260px]">
          <div className="hidden md:block"> {/* Desktop Layout */}
            <ReactGridLayout
              className="layout"
              layout={paginatedLayout[currentPage] || []}
              cols={16}
              rowHeight={75}
              maxRows={16}
              margin={[8, 8]}
              containerPadding={[0, 0]}
              onLayoutChange={(newLayout) => {
                if (!newLayout.length) return;
                
                const updatedLayout = layout.map(item => {
                  const newItem = newLayout.find(l => l.i === item.i);
                  if (newItem && Math.floor(item.y / itemsPerPage) === currentPage) {
                    return {
                      ...item,
                      ...newItem,
                      y: newItem.y + (currentPage * itemsPerPage)
                    };
                  }
                  return item;
                });

                if (JSON.stringify(updatedLayout) !== JSON.stringify(layout)) {
                  setLayout(updatedLayout);
                }
              }}
              draggableHandle=".drag-handle"
              isBounded
              isResizable={false}
            >
              {activeWidgets.filter(widget => {
                const layoutItem = layout.find(l => l.i === widget.id);
                return layoutItem && Math.floor(layoutItem.y / itemsPerPage) === currentPage;
              }).map((widget) => {
                const WidgetComponent = widget.component;
                // Special handling for Music widget
                if (widget.id.startsWith('music')) {
                  return (
                    <div key={widget.id} className="group">
                      <motion.div className={`relative h-full p-6 rounded-3xl backdrop-blur-xl shadow-lg transition-all duration-300 
                        hover:bg-white/10 cursor-pointer bg-white/5 text-white select-none overflow-hidden
                        before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/[0.18] before:to-transparent before:rounded-3xl before:pointer-events-none
                        border-[1px] border-white/30 ${openSans.className}`}
                        whileHover={{ scale: 1.02 }}>
                        <div className="relative z-10">
                          <h3 className={`text-lg font-semibold ${raleway.className}`}>{widget.name}</h3>
                          <Music 
                            currentSound={currentSound}
                            isPlaying={isPlaying}
                            onTogglePlay={() => {
                              if (currentSound) {
                                if (isPlaying) {
                                  currentSound.pause();
                                } else {
                                  currentSound.play().catch(console.error);
                                }
                                setIsPlaying(!isPlaying);
                              }
                            }}
                            onSeek={(time) => {
                              if (currentSound) {
                                currentSound.currentTime = time;
                              }
                            }}
                            onPrevSound={() => {
                              if (!currentSound) return;
                              const currentIndex = SOUNDS.findIndex(s => currentSound.src.includes(s.url));
                              if (currentIndex === -1) return;
                              const prevIndex = (currentIndex - 1 + SOUNDS.length) % SOUNDS.length;
                              const audio = new Audio(SOUNDS[prevIndex].url);
                              audio.loop = true;
                              audio.volume = currentSound.volume;
                              currentSound.pause();
                              audio.play().catch(console.error);
                              setCurrentSound(audio);
                              setIsPlaying(true);
                            }}
                            onNextSound={() => {
                              if (!currentSound) return;
                              const currentIndex = SOUNDS.findIndex(s => currentSound.src.includes(s.url));
                              if (currentIndex === -1) return;
                              const nextIndex = (currentIndex + 1) % SOUNDS.length;
                              const audio = new Audio(SOUNDS[nextIndex].url);
                              audio.loop = true;
                              audio.volume = currentSound.volume;
                              currentSound.pause();
                              audio.play().catch(console.error);
                              setCurrentSound(audio);
                              setIsPlaying(true);
                            }}
                          />
                        </div>
                        {/* Drag handle */}
                        <div className="drag-handle absolute top-2 right-2 p-1.5 rounded-full bg-black/20 backdrop-blur-sm z-10 opacity-0 group-hover:opacity-100 transition-opacity cursor-move">
                          <GripHorizontal className="w-4 h-4 text-white/70" />
                        </div>

                        {/* Delete button */}
                        <motion.button
                          className="absolute bottom-2 left-2 p-2 rounded-full bg-black/30 backdrop-blur-sm z-10 opacity-0 group-hover:opacity-100 transition-opacity"
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
                          className="absolute bottom-2 right-2 p-2 rounded-full bg-black/30 backdrop-blur-sm z-10 opacity-0 group-hover:opacity-100 transition-opacity cursor-se-resize"
                          onPointerDown={(e) => {
                            e.preventDefault();
                            const targetWidget = activeWidgets.find(w => w.id === widget.id);
                            if (!targetWidget) return;
                            const startX = e.clientX;
                            const startY = e.clientY;
                            const currentSize = widget.sizes[widgetSizes[widget.id] || 0];
                            handleResizeDrag(targetWidget, startX, startY, currentSize);
                          }}
                        >
                          <Maximize2 className="w-4 h-4 text-white/70" />
                        </motion.div>
                      </motion.div>
                    </div>
                  );
                }
                // Regular widget rendering
                return (
                  <div key={widget.id} className="group">
                    <motion.div className={`relative h-full p-6 rounded-3xl backdrop-blur-xl shadow-lg transition-all duration-300 
                      hover:bg-white/10 cursor-pointer bg-white/5 text-white select-none overflow-hidden
                      before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/[0.18] before:to-transparent before:rounded-3xl before:pointer-events-none
                      border-[1px] border-white/30 ${openSans.className}`}
                      whileHover={{ scale: 1.02 }}>
                      <div className="relative z-10">
                        <h3 className={`text-lg font-semibold ${raleway.className}`}>{widget.name}</h3>
                        <WidgetComponent />
                      </div>

                      {/* Drag handle */}
                      <div className="drag-handle absolute top-2 right-2 p-1.5 rounded-full bg-black/20 backdrop-blur-sm z-10 opacity-0 group-hover:opacity-100 transition-opacity cursor-move">
                        <GripHorizontal className="w-4 h-4 text-white/70" />
                      </div>

                      {/* Delete button */}
                      <motion.button
                        className="absolute bottom-2 left-2 p-2 rounded-full bg-black/30 backdrop-blur-sm z-10 opacity-0 group-hover:opacity-100 transition-opacity"
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
                        className="absolute bottom-2 right-2 p-2 rounded-full bg-black/30 backdrop-blur-sm z-10 opacity-0 group-hover:opacity-100 transition-opacity cursor-se-resize"
                        onPointerDown={(e) => {
                          e.preventDefault();
                          const targetWidget = activeWidgets.find(w => w.id === widget.id);
                          if (!targetWidget) return;
                          const startX = e.clientX;
                          const startY = e.clientY;
                          const currentSize = widget.sizes[widgetSizes[widget.id] || 0];
                          handleResizeDrag(targetWidget, startX, startY, currentSize);
                        }}
                      >
                        <Maximize2 className="w-4 h-4 text-white/70" />
                      </motion.div>
                    </motion.div>
                  </div>
                );
              })}
            </ReactGridLayout>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden space-y-4">
            {activeWidgets.filter(widget => {
              const layoutItem = layout.find(l => l.i === widget.id);
              return layoutItem && Math.floor(layoutItem.y / itemsPerPage) === currentPage;
            }).map((widget) => {
              const WidgetComponent = widget.component;
              return (
                <div key={widget.id} className="group">
                  <motion.div className={`relative h-full p-6 rounded-3xl backdrop-blur-xl border-[1px] border-white/30 shadow-lg transition-all duration-300 
                    hover:bg-white/10 cursor-pointer bg-white/5 text-white select-none overflow-hidden
                    before:absolute before:inset-0 before:bg-gradient-to-tr before:from-white/[0.15] before:to-transparent before:rounded-3xl before:pointer-events-none
                    after:absolute after:bottom-0 after:left-0 after:w-24 after:h-24 after:bg-gradient-radial after:from-white/20 after:to-transparent after:opacity-0 after:transition-opacity
                    after:pointer-events-none group-hover:after:opacity-100 ${openSans.className}`}
                    whileHover={{ scale: 1.02 }}>
                    {/* Shine effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity blur-xl pointer-events-none" />

                    {/* Delete button */}
                    <motion.button
                      className="absolute top-2 right-2 p-2 rounded-full bg-black/30 backdrop-blur-sm z-10"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeWidget(widget.id);
                      }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <X className="w-4 h-4 text-white/70" />
                    </motion.button>

                    <div>
                      <h3 className={`text-lg font-semibold ${raleway.className}`}>{widget.name}</h3>
                      <WidgetComponent />
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>

          {/* Control Buttons */}
          <div className="fixed bottom-4 right-4 flex gap-2">
            {totalPages > 1 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-2"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                  disabled={currentPage === 0}
                  className={`p-3 rounded-full backdrop-blur-xl border-[1px] border-white/30 shadow-lg ${
                    currentPage === 0 ? 'bg-white/5 text-white/30' : 'bg-white/10 hover:bg-white/20 text-white'
                  }`}
                >
                  <ChevronLeft className="w-6 h-6" />
                </motion.button>

                <div className="px-3 py-2 rounded-full bg-white/10 backdrop-blur-xl border-[1px] border-white/30">
                  <span className="text-sm font-medium text-white">
                    {currentPage + 1} / {totalPages}
                  </span>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
                  disabled={currentPage === totalPages - 1}
                  className={`p-3 rounded-full backdrop-blur-xl border-[1px] border-white/30 shadow-lg ${
                    currentPage === totalPages - 1 ? 'bg-white/5 text-white/30' : 'bg-white/10 hover:bg-white/20 text-white'
                  }`}
                >
                  <ChevronRight className="w-6 h-6" />
                </motion.button>
              </motion.div>
            )}
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ delay: 1.2 }}
              onClick={() => setShowBgSelector(!showBgSelector)}
              className="p-3 rounded-full bg-white/10 backdrop-blur-xl hover:bg-white/20 transition-all border-[1px] border-white/30 shadow-lg"
            >
              <Image className="w-6 h-6 text-white" />
            </motion.button>
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowSoundMenu(!showSoundMenu)}
              className={`p-3 rounded-full backdrop-blur-xl transition-all border-[1px] border-white/30 shadow-lg
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
              className="p-3 rounded-full bg-white/10 backdrop-blur-xl hover:bg-white/20 transition-all border-[1px] border-white/30 shadow-lg"
            >
              <Settings className="w-6 h-6 text-white" />
            </motion.button>
          </div>
        </div>

        {/* Background Image Selector */}
        <AnimatePresence>
          {showBgSelector && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed bottom-20 right-4 p-4 rounded-lg bg-black/50 backdrop-blur-xl border-[1px] border-white/30 shadow-lg"
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
              className="fixed bottom-20 right-4 p-4 rounded-lg bg-black/50 backdrop-blur-xl border-[1px] border-white/30 shadow-lg"
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
                {SOUNDS.map((sound, index) => {
                  const isCurrentSound = currentSound?.src.includes(sound.url);
                  return (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        if (currentSound) {
                          currentSound.pause();
                          if (currentSound.src === sound.url && isPlaying) {
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
                                  isCurrentSound && isPlaying
                                    ? 'bg-white/30 text-white'
                                    : 'bg-white/5 hover:bg-white/10 text-white/70'
                                }`}
                    >
                      <Volume2 className="w-4 h-4" />
                      <span className="text-sm">{sound.name}</span>
                    </motion.button>
                  );
                })}
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
                className="w-[400px] bg-black/50 backdrop-blur-xl p-6 rounded-2xl border-[1px] border-white/30 shadow-lg"
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
                      <button 
                        onClick={() => setTheme('light')}
                        className={`p-3 rounded-xl ${
                          theme === 'light' 
                            ? 'bg-white/20 border-white/20' 
                            : 'bg-white/5 hover:bg-white/10 border-white/10'
                        } border text-left`}
                      >
                        <span className="text-sm font-medium text-white/90">Light</span>
                      </button>
                      <button 
                        onClick={() => setTheme('dark')}
                        className={`p-3 rounded-xl ${
                          theme === 'dark' 
                            ? 'bg-white/20 border-white/20' 
                            : 'bg-white/5 hover:bg-white/10 border-white/10'
                        } border text-left`}
                      >
                        <span className="text-sm font-medium text-white">Dark</span>
                      </button>
                    </div>
                  </div>

                  {/* Layout */}
                  <div>
                    <h3 className="text-sm font-medium text-white/90 mb-3">Layout</h3>
                    <div className="space-y-2">
                      <button 
                        onClick={() => {
                          setLayoutMode('compact');
                          setLayout(layout.map(item => ({
                            ...item,
                            y: Math.floor(item.y * 0.8),
                            h: Math.floor(item.h * 0.8)
                          })));
                        }}
                        className={`w-full p-3 rounded-xl ${
                          layoutMode === 'compact' 
                            ? 'bg-white/20 border-white/20' 
                            : 'bg-white/5 hover:bg-white/10 border-white/10'
                        } border text-left`}
                      >
                        <span className="text-sm font-medium text-white/90">Compact</span>
                      </button>
                      <button 
                        onClick={() => {
                          setLayoutMode('comfortable');
                          setLayout(layout.map(item => ({
                            ...item,
                            y: Math.floor(item.y * 1.25),
                            h: Math.floor(item.h * 1.25)
                          })));
                        }}
                        className={`w-full p-3 rounded-xl ${
                          layoutMode === 'comfortable' 
                            ? 'bg-white/20 border-white/20' 
                            : 'bg-white/5 hover:bg-white/10 border-white/10'
                        } border text-left`}
                      >
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
                        <input 
                          type="checkbox" 
                          className="toggle" 
                          checked={parallaxEnabled}
                          onChange={(e) => setParallaxEnabled(e.target.checked)}
                        />
                      </label>
                      <label className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10">
                        <span className="text-sm text-white/90">Transitions</span>
                        <input 
                          type="checkbox" 
                          className="toggle" 
                          checked={transitionsEnabled}
                          onChange={(e) => setTransitionsEnabled(e.target.checked)}
                        />
                      </label>
                    </div>
                  </div>

                  {/* Reset */}
                  <button 
                    onClick={() => {
                      setTheme('dark');
                      setLayoutMode('comfortable');
                      setParallaxEnabled(true);
                      setTransitionsEnabled(true);
                      setLayout(generateLayout(AVAILABLE_WIDGETS));
                    }}
                    className="w-full p-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-500 text-sm font-medium"
                  >
                    Reset All Settings
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}