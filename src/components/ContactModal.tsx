import { motion, AnimatePresence } from 'motion/react';
import { X, Linkedin, MessageCircle, Mail } from 'lucide-react';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { useLanguage } from '../contexts/LanguageContext';
import { Frame, Arrow } from './crt/parts';

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

    const { t, isPortuguese } = useTranslation();
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
                        className="fixed inset-0 bg-[#0A0B0E]/60 backdrop-blur-xl z-[999998]"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[400px] z-[999999]"
                    >
                        <Frame cut={24} className="crt-modal" faceStyle={{ padding: 0, overflow: 'hidden' }}>
                            {/* Header */}
                            <div className="m-head">
                                <span className="tag">{isPortuguese ? "CONEXÕES" : "CONNECT"}</span>
                                <h2>{t('contactModal.title')}</h2>
                                <p>{t('contactModal.subtitle')}</p>
                                <button
                                    onClick={onClose}
                                    className="m-close"
                                >
                                    <X size={16} />
                                </button>
                            </div>

                            {/* Contact Options */}
                            <div className="m-body">
                                {/* LinkedIn */}
                                <motion.a
                                    href={linkedinUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                    className="m-opt"
                                >
                                    <div className="m-ic">
                                        <Linkedin size={18} />
                                    </div>
                                    <div className="m-info">
                                        <h3>LinkedIn</h3>
                                        <p>{t('contactModal.linkedin.description')}</p>
                                    </div>
                                    <div className="m-arr">
                                        <Arrow />
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
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                    className="m-opt"
                                >
                                    <div className="m-ic">
                                        <MessageCircle size={18} />
                                    </div>
                                    <div className="m-info">
                                        <h3>WhatsApp</h3>
                                        <p>{t('contactModal.whatsapp.description')}</p>
                                    </div>
                                    <div className="m-arr">
                                        <Arrow />
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
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                    className="m-opt"
                                >
                                    <div className="m-ic">
                                        <Mail size={18} />
                                    </div>
                                    <div className="m-info">
                                        <h3>Email</h3>
                                        <p>{t('contactModal.email.description')}</p>
                                    </div>
                                    <div className="m-arr">
                                        <Arrow />
                                    </div>
                                </motion.a>
                            </div>
                        </Frame>
                    </motion.div>
                </>
            )}
        </AnimatePresence>,
        document.body
    );
}
