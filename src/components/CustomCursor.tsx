import { motion, useMotionValue, useSpring } from 'motion/react';
import { useEffect, useState } from 'react';

export function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [isHovering, setIsHovering] = useState(false);

  const springConfig = { damping: 25, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);

      // Check if hovering over interactive elements
      const target = e.target;
      if (target instanceof Element) {
        const isInteractive = 
          target.tagName === 'A' || 
          target.tagName === 'BUTTON' || 
          target.closest('a') !== null || 
          target.closest('button') !== null;
        setIsHovering(isInteractive);
      }
    };

    window.addEventListener('mousemove', moveCursor);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] mix-blend-difference hidden lg:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <motion.div
          animate={{
            scale: isHovering ? 1.5 : 1,
            backgroundColor: isHovering ? '#A78BFA' : '#8B5CF6',
          }}
          className="w-full h-full rounded-full"
        />
      </motion.div>
      <motion.div
        className="fixed top-0 left-0 w-1 h-1 pointer-events-none z-[9999] bg-black rounded-full hidden lg:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: 15,
          translateY: 15,
        }}
      />
    </>
  );
}
