import { motion, useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { Sparkles, Zap, Target, Layers, Palette, Mic, ArrowUpRight } from 'lucide-react';

const features = [
  {
    icon: Sparkles,
    title: 'Design Inovador',
    description: 'Soluções visuais que quebram paradigmas',
    span: 'md:col-span-2',
    gradient: 'from-purple-600/20 to-violet-600/20',
  },
  {
    icon: Target,
    title: 'UX Design',
    description: 'Decisões baseadas em dados',
    span: 'md:col-span-1',
    gradient: 'from-pink-600/20 to-purple-600/20',
  },
  {
    icon: Palette,
    title: 'UI Design',
    description: 'Interfaces que encantam',
    span: 'md:col-span-1',
    gradient: 'from-blue-600/20 to-violet-600/20',
  },
  {
    icon: Zap,
    title: 'Prototipagem',
    description: 'Validação rápida de conceitos',
    span: 'md:col-span-1',
    gradient: 'from-violet-600/20 to-pink-600/20',
  },
  {
    icon: Layers,
    title: 'Design Systems',
    description: 'Escalabilidade e consistência',
    span: 'md:col-span-1 md:row-span-2',
    gradient: 'from-purple-600/20 to-blue-600/20',
  },
  {
    icon: Mic,
    title: 'Palestras & Eventos',
    description: 'Compartilhando conhecimento',
    span: 'md:col-span-1 md:row-span-2',
    gradient: 'from-violet-600/20 to-purple-600/20',
  },
];

export function BentoGrid() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="expertise" ref={ref} className="py-32 px-6 md:px-12 bg-[#f2f4f7] relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#f2f4f7] via-purple-100/20 to-[#f2f4f7]" />

      <div className="relative z-10 -mt-12">
        {/* Minimalist Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-12 md:mb-20"
        >
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl font-medium text-black mb-6"
          >
            Expertise
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: '100%' } : {}}
            transition={{ duration: 1, delay: 0.4 }}
            className="h-[1px] bg-gradient-to-r from-purple-500 via-violet-500 to-transparent"
          />
        </motion.div>

        {/* Disruptive Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-zinc-50 border border-zinc-200 rounded-3xl p-8 md:p-10 hover:bg-zinc-100 transition-all duration-500 overflow-hidden cursor-default"
            >
              {/* Animated Gradient Blob */}
              <div
                className="absolute -right-20 -top-20 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              />

              <div className="relative z-10 flex flex-col h-full">
                <div className="mb-6 inline-flex p-3 rounded-2xl bg-white border border-zinc-200 group-hover:border-purple-500/30 group-hover:bg-purple-500/10 transition-all duration-500 w-fit">
                  <feature.icon className="w-8 h-8 text-zinc-500 group-hover:text-purple-600 transition-colors duration-500" />
                </div>

                <h3 className="text-3xl md:text-4xl font-medium text-zinc-900 group-hover:text-black transition-colors duration-500 mb-4">
                  {feature.title}
                </h3>

                <p className="text-zinc-600 group-hover:text-zinc-800 transition-colors duration-500 text-lg leading-relaxed mt-auto">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}