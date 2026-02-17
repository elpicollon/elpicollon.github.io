import { useRef, useState, useEffect, ReactNode } from 'react';

interface LazyLoadProps {
    children: ReactNode;
    threshold?: number; // 0 to 1 (percentage of visibility to trigger)
    rootMargin?: string; // CSS margin around root to trigger earlier/later
}

export function LazyLoad({
    children,
    threshold = 0.1,
    rootMargin = '200px 0px 0px 0px' // Load 200px before it comes into view
}: LazyLoadProps) {
    const [isVisible, setIsVisible] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // If IntersectionObserver is not supported, show immediately (fallback)
        if (!('IntersectionObserver' in window)) {
            setIsVisible(true);
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        // Once visible, disconnect to keep it rendered
                        if (containerRef.current) {
                            observer.unobserve(containerRef.current);
                        }
                    }
                });
            },
            {
                threshold,
                rootMargin,
            }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current);
            }
        };
    }, [threshold, rootMargin]);

    return (
        <div ref={containerRef} style={{ minHeight: '10px' }}>
            {isVisible ? children : null}
        </div>
    );
}
