import { motion } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { HeroParticleGrid } from '../HeroParticleGrid';
import { useContactModal } from '../../contexts/ContactModalContext';
import { useTranslation } from '../../hooks/useTranslation';
import { useLanguage } from '../../contexts/LanguageContext';
import { getAdjacentProjects } from '../../config/projects';

/**
 * ProjectCTAFooter - Reusable component containing copyright disclaimer, 
 * dynamic project navigation, and CTA section
 * Used consistently across all project pages
 */
export function ProjectCTAFooter() {
    const { openModal } = useContactModal();
    const { t } = useTranslation();
    const { translations } = useLanguage();
    const location = useLocation();

    // Get adjacent projects based on current route
    const { next } = getAdjacentProjects(location.pathname);

    // Helper to get project title from translations
    const getProjectTitle = (translationKey: string): string => {
        const projects = translations?.projects as Record<string, { title?: string }> | undefined;
        return projects?.[translationKey]?.title || translationKey;
    };

    return (
        <>
            {/* Copyright Disclaimer */}
            <div className="bg-slate-100 border-t border-slate-200 py-8 px-6 md:px-12">
                <div className="max-w-4xl mx-auto text-center">
                    <p className="text-sm text-slate-500 font-medium mb-1">
                        {t('projectCTA.copyright')}
                    </p>
                    <p className="text-xs text-slate-400">
                        {t('projectCTA.disclaimer')}
                    </p>
                </div>
            </div>

            {/* Next Project Banner */}
            {next && (
                <Link
                    to={next.route}
                    className="group block relative overflow-hidden h-auto md:h-[400px]"
                    style={{
                        background: `linear-gradient(to bottom, ${next.primaryColor}, ${next.primaryColor}60)`
                    }}
                >
                    {/* Desktop: Image positioned absolutely on left */}
                    <div className="absolute left-0 top-0 w-1/2 h-full hidden md:block">
                        <img
                            src={next.image}
                            alt={getProjectTitle(next.translationKey)}
                            className="w-full h-auto object-contain object-left-top transition-all duration-500 group-hover:scale-105 group-hover:translate-x-2"
                        />
                    </div>

                    {/* Desktop: Override gradient to horizontal */}
                    <div
                        className="absolute inset-0 hidden md:block"
                        style={{
                            background: `linear-gradient(to right, ${next.primaryColor}, ${next.primaryColor}40, #f8fafc)`
                        }}
                    />

                    {/* Desktop: Image on top of gradient */}
                    <div className="absolute left-0 top-0 w-1/2 h-full hidden md:block z-10">
                        <img
                            src={next.image}
                            alt={getProjectTitle(next.translationKey)}
                            className="w-full h-auto object-contain object-left-top transition-all duration-500 group-hover:scale-105 group-hover:translate-x-2"
                        />
                    </div>

                    {/* Content */}
                    <div className="relative z-20 px-6 md:px-12 py-12 md:py-0 md:absolute md:inset-0 md:flex md:items-center">
                        <div className="max-w-7xl mx-auto w-full">
                            <div className="flex flex-col md:flex-row items-center">
                                {/* Spacer for desktop */}
                                <div className="hidden md:block md:w-1/2" />

                                {/* Text Content */}
                                <div className="flex-1 text-center md:text-left md:pl-12">
                                    <p className="text-white/80 text-sm font-medium uppercase tracking-wider mb-3">
                                        {t('projectCTA.nextProject') as string}
                                    </p>
                                    <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                                        {getProjectTitle(next.translationKey)}
                                    </h3>
                                    <motion.span
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full text-slate-900 font-medium shadow-lg group-hover:bg-slate-100 transition-all duration-300"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {t('projectCTA.viewProject') as string || 'Ver Projeto'}
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </motion.span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            )}

            {/* CTA Section */}
            <section className="py-32 px-6 md:px-12 bg-[#f8fafc] relative overflow-hidden flex items-center justify-center">
                {/* Background Effects */}
                <div className="absolute inset-0 z-0">
                    <HeroParticleGrid />
                    <div className="absolute inset-0 bg-gradient-radial from-violet-500/5 via-transparent to-transparent pointer-events-none" />
                </div>

                <div className="max-w-4xl mx-auto relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="flex flex-col items-center gap-8"
                    >
                        <div className="max-w-2xl">
                            <h2
                                className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 tracking-tight"
                                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                            >
                                {t('projectCTA.title')}
                            </h2>
                            <p className="text-lg text-slate-600 leading-relaxed">
                                {t('projectCTA.description')}
                            </p>
                        </div>

                        <div className="flex flex-col items-center gap-4 mt-4">
                            <motion.button
                                onClick={openModal}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 bg-purple-600 text-white rounded-full hover:bg-purple-500 transition-all font-medium shadow-lg shadow-purple-300/50 whitespace-nowrap cursor-pointer"
                            >
                                {t('projectCTA.contactButton')}
                            </motion.button>
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Link
                                    to="/"
                                    className="inline-flex items-center justify-center gap-2 px-6 py-3 text-purple-600 hover:text-purple-700 font-medium whitespace-nowrap"
                                >
                                    <ArrowLeft size={18} />
                                    {t('projectCTA.backButton')}
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </>
    );
}
