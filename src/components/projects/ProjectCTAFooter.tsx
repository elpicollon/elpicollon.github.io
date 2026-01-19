import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { HeroParticleGrid } from '../HeroParticleGrid';
import { useContactModal } from '../../contexts/ContactModalContext';

/**
 * ProjectCTAFooter - Reusable component containing copyright disclaimer and CTA section
 * Used consistently across all project pages
 */
export function ProjectCTAFooter() {
    const { openModal } = useContactModal();

    return (
        <>
            {/* Copyright Disclaimer */}
            <div className="bg-slate-100 border-t border-slate-200 py-8 px-6 md:px-12">
                <div className="max-w-4xl mx-auto text-center">
                    <p className="text-sm text-slate-500 font-medium mb-1">
                        © Picolo Design Digital - Todos os direitos reservados.
                    </p>
                    <p className="text-xs text-slate-400">
                        É proibida qualquer reprodução, total ou parcial, cópia ou divulgação deste conteúdo sem expressa autorização do autor.
                    </p>
                </div>
            </div>

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
                                Vamos criar algo incrível juntos?
                            </h2>
                            <p className="text-lg text-slate-600 leading-relaxed">
                                Se você gostou deste projeto e quer discutir como posso ajudar sua equipe, entre em contato!
                            </p>
                        </div>

                        <div className="flex flex-col items-center gap-4 mt-4">
                            <motion.button
                                onClick={openModal}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 bg-purple-600 text-white rounded-full hover:bg-purple-500 transition-all font-medium shadow-lg shadow-purple-300/50 whitespace-nowrap cursor-pointer"
                            >
                                Entre em Contato
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
                                    Voltar
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </>
    );
}
