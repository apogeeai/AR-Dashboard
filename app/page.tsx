"use client";

import { Plus, Settings, Image, GripHorizontal, X } from "lucide-react";
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

const AVAILABLE_WIDGETS = [
  { id: 'clock', name: 'Clock', component: Clock, span: 2, height: 1 },
  { id: 'weather', name: 'Weather', component: Weather, span: 1, height: 1 },
  { id: 'crypto', name: 'Crypto', component: CryptoTicker, span: 1, height: 1 },
  { id: 'calendar', name: 'Calendar', component: Calendar, span: 1, height: 2 },
  { id: 'fitness', name: 'Fitness', component: FitnessTracker, span: 1, height: 2 },
  { id: 'email', name: 'Email', component: Email, span: 2, height: 2 },
  { id: 'music', name: 'Music', component: Music, span: 1, height: 1 },
  { id: 'smarthome', name: 'Smart Home', component: SmartHome, span: 1, height: 1 },
  { id: 'tasks', name: 'Tasks', component: Tasks, span: 1, height: 1 },
  { id: 'twitter', name: 'Twitter', component: TwitterTrends, span: 2, height: 1 },
  { id: 'messages', name: 'Messages', component: Messages, span: 1, height: 1 },
];

interface Widget {
  id: string;
  name?: string;
  component: React.ComponentType;
  span: number;
  height?: number;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 }
};

export default function Home() {
  const [bgImage, setBgImage] = useState("https://w.wallhaven.cc/full/2y/wallhaven-2y7q2y.png");
  const [widgets, setWidgets] = useState<Widget[]>(AVAILABLE_WIDGETS);
  const [bgImages, setBgImages] = useState<string[]>([]);
  const [showBgSelector, setShowBgSelector] = useState(false);
  const [showAddMenu, setShowAddMenu] = useState(false);

  // Mouse movement parallax effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Enhanced parallax effect
  const springConfig = { damping: 30, stiffness: 200 }; // More responsive spring
  const moveX = useSpring(useTransform(mouseX, [-500, 500], [-30, 30]), springConfig);
  const moveY = useSpring(useTransform(mouseY, [-500, 500], [-30, 30]), springConfig);
  const rotateX = useSpring(useTransform(mouseY, [-500, 500], [3, -3]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-500, 500], [-3, 3]), springConfig);
  const scale = useSpring(1.1, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Get mouse position relative to center of screen
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      mouseX.set(clientX - centerX);
      mouseY.set(clientY - centerY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

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

  const addWidget = (widget: Widget) => {
    setWidgets([...widgets, { ...widget, id: `${widget.id}-${Date.now()}` }]);
    setShowAddMenu(false);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black/20">
      {/* Background Image with enhanced parallax effect */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full"
        style={{
          x: moveX,
          y: moveY,
          rotateX: rotateX,
          rotateY: rotateY,
          scale: scale,
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
        {/* Overlay gradient for depth */}
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

        {/* Static Widgets Grid */}
        <Reorder.Group
          as="div"
          values={widgets}
          onReorder={setWidgets}
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-[minmax(120px,auto)] gap-3 mx-auto pt-16 min-w-[430px] max-w-[1260px] px-4"
        >
          {widgets.map((widget) => (
            <Reorder.Item
              key={widget.id}
              value={widget}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileDrag={{ scale: 1.05, zIndex: 50 }}
              className={`
                ${widget.span === 2 ? 'lg:col-span-2' : ''}
                ${widget.height ? `row-span-${widget.height}` : ''}
                group relative rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 
                shadow-lg hover:bg-white/15 transition-all duration-300 cursor-move
              `}
              style={{
                height: widget.height ? `${widget.height * 120}px` : '120px'
              }}
            >
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute top-2 right-2 p-1 rounded-full bg-black/20 backdrop-blur-sm z-10"
              >
                <GripHorizontal className="w-4 h-4 text-white/70" />
              </motion.div>
              <widget.component />
            </Reorder.Item>
          ))}
        </Reorder.Group>

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

        {/* Settings and Background Selector Buttons */}
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