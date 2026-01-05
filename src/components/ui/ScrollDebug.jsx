import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const ScrollDebug = () => {
  const [scrollInfo, setScrollInfo] = useState({
    y: 0,
    velocity: 0,
    direction: 0,
    isScrolling: false
  });

  useEffect(() => {
    const lenis = window.lenis;
    if (!lenis) return;

    const updateScrollInfo = (e) => {
      setScrollInfo({
        y: Math.round(e.scroll),
        velocity: Math.round(e.velocity * 100) / 100,
        direction: e.direction,
        isScrolling: e.velocity !== 0
      });
    };

    lenis.on('scroll', updateScrollInfo);

    return () => {
      lenis.off('scroll', updateScrollInfo);
    };
  }, []);

  // Only show in development
  if (process.env.NODE_ENV !== 'development') return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed bottom-4 left-4 z-50 bg-black/80 text-white p-3 rounded-lg text-xs font-mono"
    >
      <div>Scroll Y: {scrollInfo.y}px</div>
      <div>Velocity: {scrollInfo.velocity}</div>
      <div>Direction: {scrollInfo.direction === 1 ? '↓' : scrollInfo.direction === -1 ? '↑' : '—'}</div>
      <div>Status: {scrollInfo.isScrolling ? '🟢 Scrolling' : '🔴 Idle'}</div>
    </motion.div>
  );
};

export default ScrollDebug;