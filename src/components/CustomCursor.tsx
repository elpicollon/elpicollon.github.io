import { motion, useMotionValue } from 'motion/react';
import { useEffect, useState } from 'react';

const ARROW_PATTERN = [
  "B           ",
  "BB          ",
  "BFB         ",
  "BFFB        ",
  "BFFFB       ",
  "BFFFFB      ",
  "BFFFFFB     ",
  "BFFFFFFB    ",
  "BFFFFFFFB   ",
  "BFFFFFFFFB  ",
  "BFFFFFBBBBB ",
  "BFFBFFB     ",
  "BFB BFFB    ",
  "BB  BFFB    ",
  "     BFFB   ",
  "     BFFB   ",
  "      BB    ",
];

const HAND_PATTERN = [
  "     BB         ",
  "    BFFB        ",
  "    BFFB        ",
  "    BFFB        ",
  "    BFFB  BB    ",
  "    BFFB BFFB   ",
  " BBBBFFBBFFFB   ",
  "BFFFBFFBFFFFFB  ",
  "BFFFFFFFFFFFFB  ",
  "BFFFFFFFFFFFFB  ",
  " BFFBFFFFFFFFB  ",
  "  BFFFFFFFFFFB  ",
  "   BFFFFFFFFB   ",
  "    BFFFFFFB    ",
  "    BFFFFFFB    ",
  "     BBBBBB     "
];

interface PixelGridProps {
  pattern: string[];
  isHovering: boolean;
}

function PixelGrid({ pattern, isHovering }: PixelGridProps) {
  return (
    <>
      {pattern.map((row, y) =>
        row.split('').map((char, x) => {
          if (char === ' ') return null;
          const className =
            char === 'B'
              ? 'cursor-pixel-black'
              : isHovering
              ? 'cursor-pixel-fill-secondary'
              : 'cursor-pixel-fill-primary';
          return (
            <rect
              key={`${x}-${y}`}
              x={x}
              y={y}
              width={1}
              height={1}
              className={className}
            />
          );
        })
      )}
    </>
  );
}

export function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      const target = e.target;
      if (target instanceof Element) {
        const isInteractive =
          target.closest('a, button, input, select, textarea, label, [role="button"], .cursor-pointer, [data-cursor="pointer"], .btn, .wcard, .g-row, .stage-wrap, .about-wcard, .timeline-item, .clickable') !== null;
        setIsHovering(isInteractive);
      }
    };

    window.addEventListener('mousemove', moveCursor);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, [cursorX, cursorY]);

  const scale = 1.5;
  const gridWidth = isHovering ? 16 : 12;
  const gridHeight = isHovering ? 16 : 17;
  const width = gridWidth * scale;
  const height = gridHeight * scale;

  // Hotspot offsets (index finger is at col 5, arrow is at col 0)
  const translateX = isHovering ? -5 * scale : 0;
  const translateY = 0;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden lg:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX,
          translateY,
        }}
      >
        <svg
          viewBox={`0 0 ${gridWidth} ${gridHeight}`}
          width={width}
          height={height}
          shapeRendering="crispEdges"
          className={isHovering ? "cursor-phosphor-glow-hover" : "cursor-phosphor-glow"}
        >
          <PixelGrid pattern={isHovering ? HAND_PATTERN : ARROW_PATTERN} isHovering={isHovering} />
        </svg>
      </motion.div>
    </>
  );
}
