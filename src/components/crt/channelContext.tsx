import { createContext, useCallback, useContext, useEffect, useRef, useState, ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CHANNELS, HOME_CHANNEL, channelByNumber, channelByPath, channelOrder, ChannelConfig } from "./channels";

interface ChannelContextType {
  channels: ChannelConfig[];
  channel: number;
  current: ChannelConfig | undefined;
  tune: (n: number) => void;
  tuneStep: (dir: number) => void;
  guideOpen: boolean;
  setGuideOpen: (open: boolean) => void;
  tuning: boolean;
  banner: { n: number; name: string } | null;
  flashBanner: (n: number) => void;
}

const ChannelCtx = createContext<ChannelContextType | null>(null);

export const useChannel = () => {
  const context = useContext(ChannelCtx);
  if (!context) {
    throw new Error("useChannel must be used within a ChannelProvider");
  }
  return context;
};

const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function ChannelProvider({ children }: { children: ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();

  // Determine initial channel from the current URL path
  const [channel, setChannel] = useState(() => {
    const initialChan = channelByPath(location.pathname);
    return (initialChan && initialChan.n !== undefined) ? initialChan.n : HOME_CHANNEL;
  });

  const [guideOpen, setGuideOpen] = useState(false);

  // Transient TV effects
  const [tuning, setTuning] = useState(false);     // drives the static overlay
  const [banner, setBanner] = useState<{ n: number; name: string } | null>(null); // banner shown briefly on change
  const bannerTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const swapTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const endTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const flashBanner = useCallback((n: number) => {
    const c = channelByNumber(n);
    setBanner({ n, name: (c?.name || "").toUpperCase() });
    if (bannerTimer.current) clearTimeout(bannerTimer.current);
    bannerTimer.current = setTimeout(() => setBanner(null), 1700);
  }, []);

  // Sync state when location.pathname changes (e.g. back/forward button)
  useEffect(() => {
    const matchingChannel = channelByPath(location.pathname);
    if (matchingChannel && matchingChannel.n !== undefined && matchingChannel.n !== channel) {
      setChannel(matchingChannel.n);
      flashBanner(matchingChannel.n);
    }
  }, [location.pathname, channel, flashBanner]);

  // Change channel with the CRT static "tuning" transition
  const tune = useCallback(
    (n: number) => {
      const c = channelByNumber(n);
      if (!c) return;

      setGuideOpen(false);
      flashBanner(n);

      if (prefersReduced()) {
        setChannel(n);
        navigate(c.path);
        window.scrollTo(0, 0);
        return;
      }

      setTuning(true);
      if (swapTimer.current) clearTimeout(swapTimer.current);
      if (endTimer.current) clearTimeout(endTimer.current);

      swapTimer.current = setTimeout(() => {
        setChannel(n);
        navigate(c.path);
        window.scrollTo(0, 0);
      }, 220);

      endTimer.current = setTimeout(() => setTuning(false), 440);
    },
    [flashBanner, navigate]
  );

  const tuneStep = useCallback(
    (dir: number) => {
      const i = channelOrder.indexOf(channel);
      if (i === -1) return;
      const ni = (i + dir + channelOrder.length) % channelOrder.length;
      tune(channelOrder[ni]);
    },
    [channel, tune]
  );

  // Keyboard controls: arrows change channel, G toggles guide, Esc closes
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setGuideOpen(false);
      } else if (e.key.toLowerCase() === "g") {
        // Only toggle guide if not typing in form fields (like contact forms)
        const activeEl = document.activeElement;
        const isInput = activeEl && (
          activeEl.tagName === "INPUT" || 
          activeEl.tagName === "TEXTAREA" || 
          activeEl.getAttribute("contenteditable") === "true"
        );
        if (!isInput) {
          e.preventDefault();
          setGuideOpen((v) => !v);
        }
      } else if (!guideOpen) {
        const activeEl = document.activeElement;
        const isInput = activeEl && (
          activeEl.tagName === "INPUT" || 
          activeEl.tagName === "TEXTAREA" || 
          activeEl.getAttribute("contenteditable") === "true"
        );
        if (!isInput) {
          if (e.key === "ArrowUp") {
            e.preventDefault();
            tuneStep(1);
          } else if (e.key === "ArrowDown") {
            e.preventDefault();
            tuneStep(-1);
          }
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [guideOpen, tuneStep]);

  useEffect(() => {
    return () => {
      if (bannerTimer.current) clearTimeout(bannerTimer.current);
      if (swapTimer.current) clearTimeout(swapTimer.current);
      if (endTimer.current) clearTimeout(endTimer.current);
    };
  }, []);

  const value = {
    channels: CHANNELS,
    channel,
    current: channelByNumber(channel),
    tune,
    tuneStep,
    guideOpen,
    setGuideOpen,
    tuning,
    banner,
    flashBanner,
  };

  return <ChannelCtx.Provider value={value}>{children}</ChannelCtx.Provider>;
}
