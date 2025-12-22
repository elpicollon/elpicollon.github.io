import { motion, useMotionValue, useSpring } from 'motion/react';
import { useRef, useEffect, useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ExternalLink } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'Modern UI Dashboard',
    category: 'Web Design',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1684569547117-e2d19fc6d796?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBVSSUyMGRlc2lnbnxlbnwxfHx8fDE3NjE5MDI4NDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 2,
    title: 'Mobile Banking App',
    category: 'Mobile Design',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1658953229625-aad99d7603b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzYxODgwMjM1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 3,
    title: 'Workspace Platform',
    category: 'Product Design',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1548761013-f4c9d4f524ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9kdWN0JTIwZGVzaWduJTIwd29ya3NwYWNlfGVufDF8fHx8MTc2MTg1NzA0NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 4,
    title: 'Minimal Portfolio',
    category: 'Web Design',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1597534458220-9fb4969f2df5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwd2Vic2l0ZSUyMGRlc2lnbnxlbnwxfHx8fDE3NjE4MzYwNzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 5,
    title: 'E-commerce Platform',
    category: 'Product Design',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1642756063091-0b6abb1bf595?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwcHJvZHVjdCUyMGRlc2lnbnxlbnwxfHx8fDE3NjE4MTYwNDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
];

export function HorizontalScroll() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const smoothX = useSpring(x, {
    stiffness: 100,
    damping: 30,
    mass: 0.5
  });
  const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0 });

  useEffect(() => {
    const updateConstraints = () => {
      if (scrollContainerRef.current) {
        const scrollWidth = scrollContainerRef.current.scrollWidth;
        const viewportWidth = window.innerWidth;
        // Constraints: right is 0 (start), left is negative (scroll distance)
        // Add some buffer for overscroll feel or just precise? Precise is better for carousel.
        setDragConstraints({ left: -(scrollWidth - viewportWidth), right: 0 });
      }
    };

    updateConstraints();
    window.addEventListener('resize', updateConstraints);
    return () => window.removeEventListener('resize', updateConstraints);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const scrollContainer = scrollContainerRef.current;

    if (!section || !scrollContainer) return;

    const handleWheel = (e: WheelEvent) => {
      const rect = section.getBoundingClientRect();
      const sectionHeight = rect.height;
      const viewportHeight = window.innerHeight;

      // Check if section is visible (at least 50% in viewport)
      const visibleTop = Math.max(0, rect.top);
      const visibleBottom = Math.min(viewportHeight, rect.bottom);
      const visibleHeight = visibleBottom - visibleTop;
      const isVisible = visibleHeight > sectionHeight * 0.3;

      if (!isVisible) return;

      const scrollWidth = scrollContainer.scrollWidth;
      const viewportWidth = window.innerWidth;
      const maxScroll = -(scrollWidth - viewportWidth + 48); // Account for padding
      const currentX = x.get();

      // Calculate new position
      let newX = currentX - e.deltaY * 1.5;

      // Clamp the value
      newX = Math.max(maxScroll, Math.min(0, newX));

      // If we're at the limits and trying to scroll further, allow vertical scroll
      if ((currentX >= -1 && e.deltaY < 0) || (currentX <= maxScroll + 1 && e.deltaY > 0)) {
        return;
      }

      // Otherwise prevent default and scroll horizontally
      e.preventDefault();
      x.set(newX);
    };

    section.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      section.removeEventListener('wheel', handleWheel);
    };
  }, [x]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const current = x.get();
      const target = current - 300;
      x.set(Math.max(dragConstraints.left, target));
    }
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const current = x.get();
      const target = current + 300;
      x.set(Math.min(dragConstraints.right, target));
    }
  };

  return (
    <section
      id="projetos"
      ref={sectionRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="relative py-16 md:py-20 bg-[#f2f4f7] z-0 isolate mb-32 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
      aria-label="Galeria de projetos em destaque"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#f2f4f7] via-purple-100/40 to-[#f2f4f7] -z-10" />

      {/* Content wrapper */}
      <div className="relative flex flex-col overflow-hidden">
        {/* Title */}
        <div className="px-6 md:px-12 mb-6 md:mb-8">
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-6xl md:text-8xl font-medium text-black"
          >
            Projetos
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '300px' }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
            className="h-[2px] bg-gradient-to-r from-purple-500 to-transparent mt-4"
          />
        </div>

        {/* Projects horizontal scroll */}
        <div className="flex items-center overflow-hidden">
          <motion.div
            ref={scrollContainerRef}
            style={{ x: smoothX }}
            drag="x"
            dragConstraints={dragConstraints}
            className="flex gap-6 md:gap-8 px-6 md:px-12 will-change-transform cursor-grab active:cursor-grabbing"
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                className="relative flex-shrink-0 group cursor-pointer"
                style={{
                  width: 'clamp(300px, 70vw, 600px)',
                  height: 'clamp(280px, 50vh, 380px)'
                }}
                whileHover={{ scale: 0.98 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative w-full h-full rounded-3xl overflow-hidden">
                  {/* Image */}
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />

                  {/* Gradient overlay - Keep dark for text readability over images */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                  {/* Content */}
                  <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between">
                    {/* Top - Number */}
                    <div className="flex justify-between items-start">
                      <span className="text-5xl md:text-6xl font-medium text-white/30">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 45 }}
                        className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-xl border border-white/20 flex items-center justify-center"
                      >
                        <ExternalLink className="text-white" size={20} />
                      </motion.div>
                    </div>

                    {/* Bottom - Info */}
                    <div>
                      <p className="text-purple-300 mb-2 tracking-wider text-sm md:text-base">
                        {project.category} • {project.year}
                      </p>
                      <h3 className="text-3xl md:text-4xl lg:text-5xl font-medium text-white">
                        {project.title}
                      </h3>
                    </div>
                  </div>

                  {/* Hover effect border */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 border-2 border-purple-500/50 rounded-3xl pointer-events-none"
                  />
                </div>
              </motion.div>
            ))}

            {/* End card */}
            <div
              className="flex-shrink-0 rounded-3xl bg-gradient-to-br from-purple-50 to-white backdrop-blur-xl border border-purple-100 flex items-center justify-center shadow-lg"
              style={{
                width: 'clamp(300px, 70vw, 600px)',
                height: 'clamp(280px, 50vh, 380px)'
              }}
            >
              <div className="text-center p-8">
                <motion.h3
                  whileHover={{ scale: 1.05 }}
                  className="text-3xl md:text-5xl lg:text-6xl font-medium text-purple-900 mb-6"
                >
                  Mais projetos em breve
                </motion.h3>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-purple-600 text-white rounded-full hover:bg-purple-500 transition-colors"
                >
                  Ver Todos
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
