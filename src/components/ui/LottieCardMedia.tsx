import { useState, useEffect, useRef, ComponentType } from "react";

export interface LottieCardMediaProps {
  lottieUrl?: string;
  fallbackImage: string;
  title: string;
}

export function LottieCardMedia({ lottieUrl, fallbackImage, title }: LottieCardMediaProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [animationData, setAnimationData] = useState<any>(null);
  const [LottieComponent, setLottieComponent] = useState<ComponentType<any> | null>(null);
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
    
    // Load both the Lottie library and the animation JSON asynchronously in parallel only when visible
    Promise.all([
      import("lottie-react").then((m) => m.default),
      fetch(lottieUrl).then((res) => {
        if (!res.ok) throw new Error("Failed to fetch Lottie JSON");
        return res.json();
      })
    ])
      .then(([LottieComp, data]) => {
        if (isMounted) {
          setLottieComponent(() => LottieComp);
          setAnimationData(data);
        }
      })
      .catch((err) => {
        console.error("Failed to load Lottie animation:", lottieUrl, err);
      });

    return () => {
      isMounted = false;
    };
  }, [isVisible, lottieUrl, animationData]);

  const Lottie = LottieComponent;

  return (
    <div ref={containerRef} className="w-full h-full">
      {Lottie && animationData ? (
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
          width="480"
          height="270"
          className="w-full h-full object-cover drop-shadow-[0_24px_60px_rgba(20,24,28,0.35)] transition-transform duration-500 group-hover:scale-105"
        />
      )}
    </div>
  );
}
