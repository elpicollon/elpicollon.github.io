import { ReactNode, forwardRef } from 'react';

export interface ChapterSectionProps {
    children: ReactNode;
    className?: string;
    id?: string;
}

export const ChapterSection = forwardRef<HTMLElement, ChapterSectionProps>(
    ({ children, className = "", id }, ref) => {
        return (
            <section
                ref={ref}
                id={id}
                className={`py-12 sm:py-16 lg:py-20 ${className}`}
            >
                {children}
            </section>
        );
    }
);

ChapterSection.displayName = 'ChapterSection';
