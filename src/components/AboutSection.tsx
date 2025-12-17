import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { Linkedin, Download, Award, Briefcase, Smile, Zap } from 'lucide-react';
import { Logos } from '../imports/1';
import imgEu1 from "../assets/image-rp.png";
import { ImageWithFallback } from './figma/ImageWithFallback';

export function AboutSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  
  const stats = [
    {
      id: 1,
      number: "6+",
      label: "Anos em UX",
      icon: Briefcase,
      color: "text-purple-400"
    },
    {
      id: 2,
      number: "50+",
      label: "Projetos",
      icon: Zap,
      color: "text-violet-400"
    },
    {
      id: 4,
      number: "12+",
      label: "Anos Tech",
      icon: Award,
      color: "text-indigo-400"
    }
  ];

  return (
    <section ref={containerRef} className="relative pt-16 pb-0 bg-[#f2f4f7] overflow-hidden z-40">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
          <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-purple-200/40 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-200/30 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="px-6 md:px-12 relative z-10">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-6xl md:text-8xl font-medium text-black mb-6"
          >
            Sobre
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '100%' }}
            transition={{ duration: 1, delay: 0.4 }}
            viewport={{ once: true }}
            className="h-[1px] bg-gradient-to-r from-purple-500 via-violet-500 to-transparent"
          />
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 items-center">
          
          {/* Left: Text Content */}
          <div className="order-2 lg:order-1 lg:pr-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="space-y-6 text-zinc-600 text-lg leading-relaxed w-full">
                <p>
                  Designer estratégico com foco em UX e resultados de negócio, unindo visão analítica, metodologias ágeis e liderança colaborativa. Atuo com Design Systems, prototipação e validação de hipóteses, além da facilitação de workshops e a comunicação com stakeholders. Meu diferencial está na capacidade de resolver problemas complexos, integrar equipes e gerar valor real ao usuário por meio da inovação e performance.
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3 mt-6">
                  {[
                    "Especialista em Design Digital",
                    "Bacharel em Sistemas de Informação",
                    "Experiência com ERPs, SaaS, CRM & PLG",
                    "Professor Universitário",
                    "Product Designer desde 2018",
                    "Desde 2014 atuando em Tecnologia"
                  ].map((item, index) => (
                    <motion.li 
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-2 text-zinc-600 text-base"
                    >
                      <span className="text-purple-600 shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 mb-12">
                {[
                  ...stats,
                  {
                    id: 5,
                    number: "100%",
                    label: "SATISFAÇÃO",
                    icon: ({ size, className }: { size?: number | string; className?: string }) => (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={size}
                        height={size}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={className}
                      >
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                      </svg>
                    ),
                    color: "text-rose-500",
                  },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="flex flex-col gap-2"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <stat.icon size={18} className={stat.color} />
                    </div>
                    <span className="text-3xl md:text-4xl font-bold text-black tracking-tight">{stat.number}</span>
                    <span className="text-xs uppercase tracking-wider text-zinc-500 font-medium">{stat.label}</span>
                  </motion.div>
                ))}
              </div>

              {/* Actions */}

            </motion.div>
          </div>

          {/* Right: Image/Visual */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <motion.div 
              style={{ y }}
              className="relative w-full max-w-xs aspect-[4/5]"
            >
               {/* Decorative background blur */}
               <div className="absolute inset-0 w-full h-full bg-gradient-to-tr from-[#9810fa33] to-[#155dfc33] rounded-[32px] blur-2xl" />

               {/* Decorative rotated circle */}
               <div className="absolute -top-12 left-1/2 w-[114px] h-[114px] border border-purple-200 rounded-full rotate-[78deg] -z-10" />
               
               <div className="relative h-full w-full rounded-[32px] overflow-hidden border border-zinc-200 bg-white shadow-2xl group">
                 <div className="absolute inset-0">
                   <ImageWithFallback
                     src={imgEu1}
                     alt="Rodrigo Picolo"
                     className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                   />
                 </div>
                 
                 {/* Gradient Overlay */}
                 <motion.div 
                   initial={{ opacity: 0 }}
                   whileInView={{ opacity: 0.3 }}
                   viewport={{ once: true }}
                   transition={{ duration: 1.5, ease: "easeOut" }}
                   className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black z-10" 
                 />
                 
                 {/* Glass Badge on Image */}
                 <div className="absolute bottom-6 left-6 right-6 bg-white/20 backdrop-blur-md rounded-[14px] z-20 border border-white/30">
                    <motion.a 
                        href="https://www.linkedin.com/in/picolodesign/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-[14px] p-4 flex items-center justify-between hover:bg-[#0077b5]/90 transition-colors cursor-pointer group/link"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <div>
                            <p className="text-white font-bold text-lg leading-tight">Rodrigo Picolo</p>
                            <p className="text-white/80 text-xs uppercase tracking-wider mt-0.5 group-hover/link:text-white">Conecte-se no Linkedin</p>
                        </div>
                        <div className="h-8 w-8 rounded-full bg-[#0077b5] border border-white/20 flex items-center justify-center text-white shrink-0">
                            <Linkedin size={16} fill="currentColor" strokeWidth={0} />
                        </div>
                    </motion.a>
                 </div>
               </div>
            </motion.div>
          </div>

        </div>

        {/* Carousel moved from MagneticButton */}
        <div className="w-full overflow-hidden mt-20 pb-20" style={{ WebkitMaskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)', maskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)' }}>
          <motion.div 
            className="flex gap-12"
            animate={{ x: "-50%" }}
            transition={{ duration: 40, ease: "linear", repeat: Infinity }}
            style={{ width: "fit-content" }}
          >
            {[...Logos, ...Logos].map((Logo, index) => (
              <div key={index} className="relative w-[240px] h-[110px] shrink-0 overflow-hidden grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                <div className="absolute top-0 left-0 origin-top-left" style={{ transform: 'scale(0.18)' }}>
                  <Logo />
                </div>
              </div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
