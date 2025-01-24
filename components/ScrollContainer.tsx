"use client";

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ScrollContainerProps {
  items: React.ReactNode[];
  itemsPerView?: number;
}

export default function ScrollContainer({ items, itemsPerView = 3 }: ScrollContainerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalItems = items.length;
  const maxIndex = Math.max(0, totalItems - itemsPerView);

  const showPrevious = currentIndex > 0;
  const showNext = currentIndex < maxIndex;

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < maxIndex) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className="relative flex-1">
      <div className="h-full overflow-hidden">
        <motion.div
          className="h-full space-y-3"
          initial={false}
          animate={{ y: -currentIndex * (100 / itemsPerView) + '%' }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {items}
        </motion.div>
      </div>

      <AnimatePresence>
        {showPrevious && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handlePrevious}
            className="absolute left-1/2 bottom-2 -translate-x-[calc(50%+16px)] p-1 rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/40 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showNext && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleNext}
            className="absolute left-1/2 bottom-2 translate-x-[calc(-50%+16px)] p-1 rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/40 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}