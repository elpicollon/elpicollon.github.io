import { ReactNode } from "react";

export interface SectionHeaderProps {
  label?: string;
  sublabel?: string;
  title: ReactNode;
  hlTitle?: string;
  showLine?: boolean;
  className?: string;
  bgNumber?: string;
}

export function SectionHeader({
  label,
  sublabel,
  title,
  hlTitle,
  showLine = true,
  className = "mb-6 sm:mb-8 md:mb-10",
  bgNumber
}: SectionHeaderProps) {
  return (
    <div className={`sec-head-container relative ${className}`}>
      {bgNumber && (
        <span 
          className="absolute -top-8 -left-4 sm:-top-12 sm:-left-6 font-display font-extrabold text-7xl sm:text-9xl md:text-[11rem] text-[var(--project-primary,var(--color-primary))] opacity-10 pointer-events-none select-none z-0 leading-none"
        >
          {bgNumber}
        </span>
      )}
      <div className="relative z-10">
        {label && (
          <div className="sec-strip mb-3">
            <span className="label">
              <b className="text-[var(--project-primary,var(--color-primary))]">{label}</b>
              {sublabel && (
                <>
                  <br className="sm:hidden" />
                  <span className="hidden sm:inline"> · </span>
                  {sublabel}
                </>
              )}
            </span>
            <hr className="gradline" />
          </div>
        )}
        <div className="sec-head flex gap-6 sm:gap-10 items-center">
          <h2>
            {title} {hlTitle && <span className="hl-p">{hlTitle}</span>}
          </h2>
          {showLine && <div className="sec-head-line" />}
        </div>
      </div>
    </div>
  );
}
