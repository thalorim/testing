'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isMounted, setIsMounted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 8, stiffness: 2000, mass: 0.01 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    setIsMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.tagName.toLowerCase() === 'button' ||
        target.tagName.toLowerCase() === 'a' ||
        target.classList.contains('interactive');
      setIsHovering(isInteractive);
    };

    const handleMouseOut = () => setIsHovering(false);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    window.addEventListener('mouseout', handleMouseOut, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
    };
  }, [mouseX, mouseY]);

  // Don't render anything on the server or before mounting
  if (!isMounted) return null;

  return (
    <>
      <motion.div
        className={`cursor-ring ${isHovering ? 'hovering' : ''}`}
        style={{
          opacity: 1,
          left: cursorX,
          top: cursorY,
          transform: 'translate(-50%, -50%)',
        }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ 
          scale: isHovering ? 1.1 : 1,
          opacity: 1
        }}
        transition={{
          duration: 0.05,
          scale: {
            type: "spring",
            damping: 8,
            stiffness: 2000,
            mass: 0.01
          },
        }}
      />
      <motion.div
        className={`cursor-dot ${isHovering ? 'hovering' : ''}`}
        style={{
          opacity: 1,
          left: cursorX,
          top: cursorY,
          transform: 'translate(-50%, -50%)',
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: isHovering ? 1.2 : 1,
          opacity: 1
        }}
        transition={{
          duration: 0.05,
          type: "spring",
          damping: 8,
          stiffness: 2000,
          mass: 0.01
        }}
      />
    </>
  );
} 