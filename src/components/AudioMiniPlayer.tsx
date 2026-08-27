import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import { useLanguage } from '../contexts/LanguageContext';

interface AudioMiniPlayerProps {
    /** Override the default audio path detection */
    audioSrc?: string;
}

/**
 * Floating audio mini player for project pages.
 * Automatically detects audio files based on the current route's project slug.
 * Audio path follows the pattern: /assets/projects/{slug}/{slug}.m4a
 */
export function AudioMiniPlayer({ audioSrc }: AudioMiniPlayerProps) {
    const location = useLocation();
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const { t } = useTranslation();
    const { language } = useLanguage();

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [hasAudio, setHasAudio] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const isPlayingRef = useRef(isPlaying);
    const currentTimeRef = useRef(currentTime);

    // Keep refs updated for async effects
    useEffect(() => {
        isPlayingRef.current = isPlaying;
    }, [isPlaying]);

    useEffect(() => {
        currentTimeRef.current = currentTime;
    }, [currentTime]);

    // Extract project slug from route (e.g., /projeto/transcricoes-insights-ia -> transcricoes-insights-ia)
    const getProjectSlug = useCallback(() => {
        const match = location.pathname.match(/\/projeto\/([^/]+)/);
        return match ? match[1] : null;
    }, [location.pathname]);

    // Build audio path from slug with language prefix
    const getAudioPath = useCallback(() => {
        if (audioSrc) return audioSrc;

        const slug = getProjectSlug();
        if (!slug) return null;

        // Determine language prefix: PT for pt-BR, EN for en-US
        const langPrefix = language === 'pt-BR' ? 'PT' : 'EN';

        return `/assets/projects/${slug}/[${langPrefix}]${slug}.m4a`;
    }, [audioSrc, getProjectSlug, language]);

    // Check if audio file exists and set up audio element
    useEffect(() => {
        const audioPath = getAudioPath();

        if (!audioPath) {
            setHasAudio(false);
            setIsLoading(false);
            setIsPlaying(false);
            return;
        }

        setIsLoading(true);

        const shouldResumePlay = isPlayingRef.current;
        const savedTime = currentTimeRef.current;
        let hasAutoStarted = false;

        // Create audio element to test if file exists
        const audio = new Audio(audioPath);
        audioRef.current = audio;

        const handleCanPlay = () => {
            setHasAudio(true);
            setDuration(audio.duration);
            setIsLoading(false);

            if (!hasAutoStarted) {
                hasAutoStarted = true;

                // Sync position to the new language audio
                if (savedTime > 0 && savedTime < audio.duration) {
                    audio.currentTime = savedTime;
                    setCurrentTime(savedTime);
                }

                // If audio was playing before language switch, resume playback automatically
                if (shouldResumePlay) {
                    audio.play()
                        .then(() => {
                            setIsPlaying(true);
                        })
                        .catch((err) => {
                            console.warn("Audio autoplay blocked or failed:", err);
                            setIsPlaying(false);
                        });
                }
            }
        };

        const handleError = () => {
            setHasAudio(false);
            setIsLoading(false);
            setIsPlaying(false);
        };

        const handleTimeUpdate = () => {
            setCurrentTime(audio.currentTime);
        };

        const handleEnded = () => {
            setIsPlaying(false);
            setCurrentTime(0);
            audio.currentTime = 0;
        };

        const handleLoadedMetadata = () => {
            setDuration(audio.duration);
        };

        audio.addEventListener('canplay', handleCanPlay);
        audio.addEventListener('error', handleError);
        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('ended', handleEnded);
        audio.addEventListener('loadedmetadata', handleLoadedMetadata);

        // Try to load the audio
        audio.load();

        return () => {
            audio.removeEventListener('canplay', handleCanPlay);
            audio.removeEventListener('error', handleError);
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('ended', handleEnded);
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
            audio.pause();
            audioRef.current = null;
        };
    }, [getAudioPath]);

    // Stop audio when navigating away
    useEffect(() => {
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
                setIsPlaying(false);
            }
        };
    }, [location.pathname]);

    // Format time as MM:SS
    const formatTime = (seconds: number): string => {
        if (!isFinite(seconds) || isNaN(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    // Toggle play/pause
    const togglePlayPause = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.play();
            setIsPlaying(true);
        }
    };

    // Handle seek slider change
    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTime = parseFloat(e.target.value);
        if (audioRef.current) {
            audioRef.current.currentTime = newTime;
            setCurrentTime(newTime);
        }
    };

    // Calculate progress percentage for background fill
    const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

    // Don't render if no audio or still loading
    if (isLoading || !hasAudio) {
        return null;
    }

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="audio-mini-player"
            >
                {/* Play/Pause Button */}
                <button
                    onClick={togglePlayPause}
                    className="audio-mini-player-button"
                    aria-label={isPlaying ? t('audioPlayer.pause') : t('audioPlayer.play')}
                >
                    {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                </button>

                {/* Time Display */}
                <div className="audio-mini-player-time">
                    <span>{formatTime(currentTime)}</span>
                    <span className="audio-mini-player-time-separator">/</span>
                    <span>{formatTime(duration)}</span>
                </div>

                {/* Progress Bar */}
                <div className="audio-mini-player-progress-wrapper">
                    <input
                        type="range"
                        min={0}
                        max={duration || 100}
                        step={0.1}
                        value={currentTime}
                        onChange={handleSeek}
                        className="audio-mini-player-progress"
                        aria-label="Progresso do áudio"
                        style={{
                            background: `linear-gradient(to right, #0E8A4D ${progressPercent}%, rgba(17, 19, 22, 0.12) ${progressPercent}%)`
                        }}
                    />
                </div>

                {/* Label */}
                <div className="audio-mini-player-label">
                    <span className="audio-label-desktop">{t('audioPlayer.labelDesktop')}</span>
                    <span className="audio-label-mobile">{t('audioPlayer.labelMobile')}</span>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
