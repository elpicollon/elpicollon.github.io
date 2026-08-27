import { CSSProperties, ReactNode, useEffect, useRef } from "react";

interface ColorBarsProps {
  className?: string;
  style?: CSSProperties;
}

/* Color bars (SMPTE-style signature strip) */
export function ColorBars({ className = "", style }: ColorBarsProps) {
  return (
    <div className={`bars ${className}`} style={style} aria-hidden="true">
      <i className="w" /><i className="y" /><i className="c" /><i className="g" />
      <i className="m" /><i className="r" /><i className="b" />
    </div>
  );
}

interface BroadcastStripProps {
  tag?: string;
  seg: string;
  tc?: string;
}

export function BroadcastStrip({ tag, seg }: BroadcastStripProps) {
  return (
    <div className="sec-strip reveal">
      <span className="label">
        {tag ? <b>{tag}</b> : null}
        {tag && seg ? " · " : ""}
        {seg}
      </span>
      <hr className="gradline" />
    </div>
  );
}

interface FrameProps {
  cut?: number;
  className?: string;
  faceClassName?: string;
  style?: CSSProperties;
  faceStyle?: CSSProperties;
  children: ReactNode;
}

/* Chamfered panel with the green corner-kiss. */
export function Frame({ cut, className = "", faceClassName = "", style, faceStyle, children }: FrameProps) {
  const cssVar = cut ? ({ "--cut": `${cut}px` } as CSSProperties) : undefined;
  return (
    <div className={`frame cut ${className}`} style={{ ...cssVar, ...style }}>
      <div className={`face cut ${faceClassName}`} style={faceStyle}>
        {children}
      </div>
    </div>
  );
}

/* Right-pointing arrow used in buttons. */
export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true" className={`size-[11px] shrink-0 ${className}`.trim()}>
      <path d="M1 10L10 1M10 1H3M10 1V8" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

/* Reveal-on-scroll: re-runs whenever `key` (e.g. the channel) changes. */
export function useReveal(rootRef: React.RefObject<HTMLElement | null>, key: number) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const els = root.querySelectorAll(".reveal");
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.1 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [rootRef, key]);
}
export { useRef };
