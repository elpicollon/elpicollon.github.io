import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause } from 'lucide-react';
import { useLocation } from 'react-router-dom';

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

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [hasAudio, setHasAudio] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Extract project slug from route (e.g., /projeto/transcricoes-insights-ia -> transcricoes-insights-ia)
    const getProjectSlug = useCallback(() => {
        const match = location.pathname.match(/\/projeto\/([^/]+)/);
        return match ? match[1] : null;
    }, [location.pathname]);

    // Build audio path from slug
    const getAudioPath = useCallback(() => {
        if (audioSrc) return audioSrc;

        const slug = getProjectSlug();
        if (!slug) return null;

        return `/assets/projects/${slug}/${slug}.m4a`;
    }, [audioSrc, getProjectSlug]);

    // Check if audio file exists and set up audio element
    useEffect(() => {
        const audioPath = getAudioPath();

        if (!audioPath) {
            setHasAudio(false);
            setIsLoading(false);
            return;
        }

        setIsLoading(true);

        // Create audio element to test if file exists
        const audio = new Audio(audioPath);
        audioRef.current = audio;

        const handleCanPlay = () => {
            setHasAudio(true);
            setDuration(audio.duration);
            setIsLoading(false);
        };

        const handleError = () => {
            setHasAudio(false);
            setIsLoading(false);
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

    // Don't render if no audio or still loading
    if (isLoading || !hasAudio) {
        return null;
    }

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, x: 20, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.9 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="audio-mini-player"
            >
                {/* Play/Pause Button */}
                <button
                    onClick={togglePlayPause}
                    className="audio-mini-player-button"
                    aria-label={isPlaying ? 'Pausar áudio' : 'Reproduzir áudio'}
                >
                    {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                </button>

                {/* Time Display */}
                <div className="audio-mini-player-time">
                    <span>{formatTime(currentTime)}</span>
                    <span className="audio-mini-player-time-separator">/</span>
                    <span>{formatTime(duration)}</span>
                </div>

                {/* Label */}
                <div className="audio-mini-player-label">
                    <span className="audio-label-desktop">Ouça aqui um breve resumo deste case!</span>
                    <span className="audio-label-mobile">Ouça um breve resumo!</span>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
