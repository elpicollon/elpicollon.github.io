import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { Sparkles, Zap, Target, Layers, Palette, Mic, Award, Briefcase, Heart, Settings2, PenTool } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

export function BentoGrid() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.05 });
  const { t } = useTranslation();

  const stats = [
    {
      id: 1,
      number: "7+",
      label: t('expertise.stats.yearsUX'),
      icon: Briefcase,
    },
    {
      id: 2,
      number: "12+",
      label: t('expertise.stats.yearsTech'),
      icon: Award,
    },
    {
      id: 3,
      number: "50+",
      label: t('expertise.stats.projects'),
      icon: Zap,
    },
    {
      id: 4,
      number: "100%",
      label: t('expertise.stats.satisfaction'),
      icon: Heart,
    }
  ];

  const features = [
    {
      icon: Sparkles,
      title: t('expertise.features.innovativeDesign.title'),
      description: t('expertise.features.innovativeDesign.description'),
    },
    {
      icon: Target,
      title: t('expertise.features.uxDesign.title'),
      description: t('expertise.features.uxDesign.description'),
    },
    {
      icon: Palette,
      title: t('expertise.features.uiDesign.title'),
      description: t('expertise.features.uiDesign.description'),
    },
    {
      icon: Zap,
      title: t('expertise.features.prototyping.title'),
      description: t('expertise.features.prototyping.description'),
    },
    {
      icon: Layers,
      title: t('expertise.features.designSystems.title'),
      description: t('expertise.features.designSystems.description'),
    },
    {
      icon: Settings2,
      title: t('expertise.features.designOps.title'),
      description: t('expertise.features.designOps.description'),
    },
    {
      icon: PenTool,
      title: t('expertise.features.visualIdentity.title'),
      description: t('expertise.features.visualIdentity.description'),
    },
    {
      icon: Mic,
      title: t('expertise.features.speaking.title'),
      description: t('expertise.features.speaking.description'),
    },
  ];

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
          className="mb-12 md:mb-16"
        >
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl font-medium text-black mb-6"
          >
            {t('expertise.sectionTitle')}
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: '100%' } : {}}
            transition={{ duration: 1, delay: 0.4 }}
            className="h-[1px] bg-gradient-to-r from-purple-500 via-violet-500 to-transparent"
          />
        </motion.div>

        {/* Unified Bento Grid - Stats + Features */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">

          {/* Stats Cards - First Row */}
          {stats.map((stat, i) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              style={{ backgroundColor: "rgba(236,229,249,0)" }}
              whileHover={{
                backgroundColor: "rgba(236,229,249,1)",
                boxShadow: "inset 0 0 0 1px #d4c5ed",
                transition: { duration: 0.15 }
              }}
              className="group relative rounded-3xl p-6 md:p-8 cursor-pointer w-full h-full"
            >
              <div className="flex flex-col items-center text-center pointer-events-none">
                <stat.icon className="expertise-icon-mobile w-6 h-6 text-zinc-700 group-hover:text-purple-600 transition-colors duration-300 mb-4" />
                <span className="text-4xl md:text-5xl font-bold text-zinc-900 tracking-tight leading-none">
                  {stat.number}
                </span>
                <span className="text-xs uppercase tracking-widest text-zinc-400 font-medium mt-4">
                  {stat.label}
                </span>
              </div>
            </motion.div>
          ))}

          {/* Feature Cards - Spanning across grid */}
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
              className="bento-feature-card group relative bg-zinc-50 border border-zinc-200 rounded-3xl p-8 md:p-10 hover:bg-zinc-100 transition-all duration-500 overflow-hidden cursor-default col-span-2 md:col-span-2 lg:col-span-1"
            >
              {/* Animated Gradient Blob */}
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="relative z-10 flex flex-col h-full">
                <div className="expertise-icon-container-mobile mb-6 inline-flex p-3 rounded-2xl bg-white border border-zinc-200 group-hover:border-purple-500/30 group-hover:bg-purple-500/10 transition-all duration-500 w-fit">
                  <feature.icon className="expertise-icon-mobile w-8 h-8 text-zinc-500 group-hover:text-purple-600 transition-colors duration-500" />
                </div>

                <h3
                  style={{ fontSize: '28px' }}
                  className="md:text-[34px] font-medium text-zinc-900 group-hover:text-black transition-colors duration-500 mb-3"
                >
                  {feature.title}
                </h3>

                <p className="text-zinc-600 group-hover:text-zinc-800 transition-colors duration-500 text-base leading-relaxed mt-auto">
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
