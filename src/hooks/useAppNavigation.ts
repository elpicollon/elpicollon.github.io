import { useCallback } from "react";
import { useLocation } from "react-router-dom";
import { useChannel } from "../components/crt/channelContext";

export function useAppNavigation() {
  const location = useLocation();
  const { tune } = useChannel();

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const navigateToSection = useCallback(
    (sectionId: string) => {
      if (sectionId === "home") {
        if (location.pathname === "/") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          tune(3);
        }
        return;
      }

      if (sectionId === "sobre") {
        tune(4);
        return;
      }

      if (location.pathname === "/") {
        scrollToSection(sectionId);
      } else {
        tune(3);
        requestAnimationFrame(() => {
          setTimeout(() => {
            scrollToSection(sectionId);
          }, 300);
        });
      }
    },
    [location.pathname, tune, scrollToSection]
  );

  const navigateToHome = useCallback(() => {
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      tune(3);
    }
  }, [location.pathname, tune]);

  const navigateToAbout = useCallback((sectionId?: string) => {
    const validSectionId = typeof sectionId === 'string' && sectionId.trim() !== '' ? sectionId : undefined;

    if (validSectionId) {
      sessionStorage.setItem('scroll_to_section', validSectionId);
    }

    if (location.pathname === "/sobre") {
      if (validSectionId) {
        scrollToSection(validSectionId);
        sessionStorage.removeItem('scroll_to_section');
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }

    tune(4);
    if (validSectionId) {
      const delays = [350, 500, 700];
      delays.forEach((delay) => {
        setTimeout(() => {
          const el = document.getElementById(validSectionId);
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
          }
        }, delay);
      });
    }
  }, [location.pathname, tune, scrollToSection]);

  return {
    navigateToSection,
    navigateToHome,
    navigateToAbout,
    scrollToSection,
    tune,
  };
}
