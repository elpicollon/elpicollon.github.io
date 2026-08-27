import { useEffect, useRef, useState, VideoHTMLAttributes } from 'react';

interface LazyVideoProps extends VideoHTMLAttributes<HTMLVideoElement> {
    src: string;
    poster?: string;
    className?: string;
    rootMargin?: string;
}

/**
 * LazyVideo component that optimizes network bandwidth and GPU performance:
 * 1. Uses IntersectionObserver to start loading only when near viewport (default: 200px rootMargin)
 * 2. Pauses video decoding when off-screen to save battery and CPU/GPU cycles
 * 3. Uses a lightweight poster image fallback for instant paint without blank frames
 * 4. Strictly enforces muted & playsInline for zero-lag mobile autoplay compatibility
 */
export function LazyVideo({
    src,
    poster,
    className = 'w-full h-full object-cover',
    rootMargin = '200px 0px',
    ...props
}: LazyVideoProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [hasLoaded, setHasLoaded] = useState(false);

    // Infer poster as counterpart .webp if not explicitly provided
    const posterSrc = poster || src.replace(/\.(mp4|webm|mov|ogg|m4v)$/i, '.webp');

    useEffect(() => {
        const el = videoRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setHasLoaded(true);
                    el.play().catch(() => {
                        // Silent catch for browser autoplay policies
                    });
                } else {
                    el.pause();
                }
            },
            { rootMargin, threshold: 0.05 }
        );

        observer.observe(el);

        return () => {
            observer.disconnect();
        };
    }, [rootMargin]);

    return (
        <video
            ref={videoRef}
            src={hasLoaded ? src : undefined}
            data-src={src}
            poster={posterSrc}
            preload="none"
            autoPlay
            loop
            muted
            playsInline
            className={className}
            {...props}
        />
    );
}
