import { useState, useEffect, useRef } from "react";
import Lottie from "lottie-react";

export interface LottieCardMediaProps {
  lottieUrl?: string;
  fallbackImage: string;
  title: string;
}

export function LottieCardMedia({ lottieUrl, fallbackImage, title }: LottieCardMediaProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [animationData, setAnimationData] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || !lottieUrl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { rootMargin: "150px 0px", threshold: 0.05 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [lottieUrl]);

  useEffect(() => {
    if (!isVisible || !lottieUrl || animationData) return;

    let isMounted = true;
    fetch(lottieUrl)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch Lottie JSON");
        return res.json();
      })
      .then((data) => {
        if (isMounted) setAnimationData(data);
      })
      .catch((err) => {
        console.error("Failed to load Lottie animation:", lottieUrl, err);
      });

    return () => {
      isMounted = false;
    };
  }, [isVisible, lottieUrl, animationData]);

  return (
    <div ref={containerRef} className="w-full h-full">
      {animationData ? (
        <Lottie
          animationData={animationData}
          loop={true}
          autoplay={true}
          rendererSettings={{ preserveAspectRatio: "xMidYMid slice" }}
          className="w-full h-full object-cover drop-shadow-[0_24px_60px_rgba(20,24,28,0.35)] transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <img
          src={fallbackImage}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover drop-shadow-[0_24px_60px_rgba(20,24,28,0.35)] transition-transform duration-500 group-hover:scale-105"
        />
      )}
    </div>
  );
}
