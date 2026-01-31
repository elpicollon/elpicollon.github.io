import { motion, AnimatePresence } from 'motion/react';
import { X, Linkedin, MessageCircle, Mail, ArrowRight } from 'lucide-react';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { useLanguage } from '../contexts/LanguageContext';

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
    // Block body scroll and elevate custom cursor above modal when open
    useEffect(() => {
        const cursors = document.querySelectorAll('[class*="pointer-events-none"][class*="z-[9999]"]');

        if (isOpen) {
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
            cursors.forEach(cursor => {
                (cursor as HTMLElement).style.zIndex = '9999999';
            });
        } else {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
            cursors.forEach(cursor => {
                (cursor as HTMLElement).style.zIndex = '';
            });
        }
        return () => {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
            cursors.forEach(cursor => {
                (cursor as HTMLElement).style.zIndex = '';
            });
        };
    }, [isOpen]);

    const { t } = useTranslation();
    const { language } = useLanguage();

    // Dynamic LinkedIn URL based on language
    const linkedinUrl = language === 'en-US'
        ? 'https://www.linkedin.com/in/picolodesign/?locale=en_US'
        : 'https://www.linkedin.com/in/picolodesign/';

    // Close modal on Escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop - Glass effect */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={onClose}
                        className="fixed inset-0"
                        style={{
                            zIndex: 999998,
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(20px) saturate(180%)',
                            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                        }}
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[400px]"
                        style={{ zIndex: 999999 }}
                    >
                        <div className="bg-white rounded-3xl shadow-2xl border border-zinc-100">
                            {/* Header */}
                            <div className="p-6 pb-4">
                                <div className="flex items-start justify-between mb-2">
                                    <h2 className="text-3xl font-bold text-zinc-900">
                                        {t('contactModal.title')}
                                    </h2>
                                    <motion.button
                                        onClick={onClose}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        className="w-9 h-9 rounded-full bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center transition-colors cursor-pointer -mt-1 -mr-1"
                                    >
                                        <X size={18} className="text-zinc-500" />
                                    </motion.button>
                                </div>
                                <p className="text-zinc-500 text-sm">
                                    {t('contactModal.subtitle')}
                                </p>

                                {/* Gradient line */}
                                <div className="h-px bg-gradient-to-r from-purple-500 via-violet-400 to-transparent mt-4" />
                            </div>

                            {/* Contact Options */}
                            <div className="px-6 space-y-3" style={{ paddingBottom: '48px' }}>
                                {/* LinkedIn */}
                                <motion.a
                                    href={linkedinUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="group flex items-center gap-4 p-4 rounded-2xl border border-zinc-200 hover:border-sky-400/40 hover:bg-sky-50 transition-all duration-200 cursor-pointer"
                                >
                                    <div
                                        className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-200"
                                        style={{ background: 'linear-gradient(135deg, #0077b5, #005885)' }}
                                    >
                                        <Linkedin size={22} className="text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-base font-semibold text-zinc-900 group-hover:text-sky-600 transition-colors">
                                            {t('contactModal.linkedin.title')}
                                        </h3>
                                        <p className="text-sm text-zinc-500">
                                            {t('contactModal.linkedin.description')}
                                        </p>
                                    </div>
                                    <div className="w-8 h-8 rounded-full bg-zinc-100 group-hover:bg-zinc-200 flex items-center justify-center transition-all duration-200 group-hover:translate-x-1">
                                        <ArrowRight size={16} className="text-zinc-400 group-hover:text-zinc-600" />
                                    </div>
                                </motion.a>

                                {/* WhatsApp */}
                                <motion.a
                                    href="https://wa.me/+5546988281914"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.15 }}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="group flex items-center gap-4 p-4 rounded-2xl border border-zinc-200 hover:border-emerald-400/40 hover:bg-emerald-50 transition-all duration-200 cursor-pointer"
                                >
                                    <div
                                        className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-200"
                                        style={{ background: 'linear-gradient(135deg, #25d366, #128c7e)' }}
                                    >
                                        <MessageCircle size={22} className="text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-base font-semibold text-zinc-900 group-hover:text-emerald-500 transition-colors">
                                            {t('contactModal.whatsapp.title')}
                                        </h3>
                                        <p className="text-sm text-zinc-500">
                                            {t('contactModal.whatsapp.description')}
                                        </p>
                                    </div>
                                    <div className="w-8 h-8 rounded-full bg-zinc-100 group-hover:bg-zinc-200 flex items-center justify-center transition-all duration-200 group-hover:translate-x-1">
                                        <ArrowRight size={16} className="text-zinc-400 group-hover:text-zinc-600" />
                                    </div>
                                </motion.a>

                                {/* Email */}
                                <motion.a
                                    href="mailto:contato@picolodesign.com.br"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="group flex items-center gap-4 p-4 rounded-2xl border border-zinc-200 hover:border-violet-400/40 hover:bg-violet-50 transition-all duration-200 cursor-pointer"
                                >
                                    <div
                                        className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-200"
                                        style={{ background: 'linear-gradient(135deg, #9333ea, #7c3aed)' }}
                                    >
                                        <Mail size={22} className="text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-base font-semibold text-zinc-900 group-hover:text-violet-600 transition-colors">
                                            {t('contactModal.email.title')}
                                        </h3>
                                        <p className="text-sm text-zinc-500">
                                            {t('contactModal.email.description')}
                                        </p>
                                    </div>
                                    <div className="w-8 h-8 rounded-full bg-zinc-100 group-hover:bg-zinc-200 flex items-center justify-center transition-all duration-200 group-hover:translate-x-1">
                                        <ArrowRight size={16} className="text-zinc-400 group-hover:text-zinc-600" />
                                    </div>
                                </motion.a>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>,
        document.body
    );
}
