"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';

interface ScrollContainerProps {
  items: React.ReactNode[];
  itemsPerView?: number;
  className?: string;
}

export default function ScrollContainer({ items, itemsPerView = 3, className = '' }: ScrollContainerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalItems = items.length;
  const maxIndex = Math.max(0, totalItems - itemsPerView);

  const handleScroll = (e: React.WheelEvent) => {
    if (e.deltaY > 0 && currentIndex < maxIndex) {
      setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
    } else if (e.deltaY < 0 && currentIndex > 0) {
      setCurrentIndex(prev => Math.max(prev - 1, 0));
    }
  };

  return (
    <div className={`relative flex-1 ${className}`}>
      <div className="h-full overflow-hidden" onWheel={handleScroll}>
        <motion.div
          className="h-full"
          initial={false}
          animate={{ y: -currentIndex * (100 / itemsPerView) + '%' }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {items}
        </motion.div>
      </div>
    </div>
  );
}