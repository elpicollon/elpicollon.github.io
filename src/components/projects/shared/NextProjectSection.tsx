import { ArrowRight } from 'lucide-react';
import { getAdjacentProjects } from '../../../config/projects';
import { channelByPath } from '../../crt/channels';
import { useTranslation } from '../../../hooks/useTranslation';
import { useAppNavigation } from '../../../hooks/useAppNavigation';

interface NextProjectSectionProps {
  currentRoute: string;
}

const NEXT_PROJECT_BG_MAP: Record<string, string> = {
  transcricoes: 'next-project-bg-transcricoes',
  medical: 'next-project-bg-medical',
  notetaker: 'next-project-bg-notetaker',
  importacao: 'next-project-bg-importacao',
};

export function NextProjectSection({ currentRoute }: NextProjectSectionProps) {
  const { t } = useTranslation();
  const { tune } = useAppNavigation();

  const { next } = getAdjacentProjects(currentRoute);

  if (!next) {
    return null;
  }

  const nextChannel = channelByPath(next.route);
  const bgClass = NEXT_PROJECT_BG_MAP[next.panelTheme] || 'next-project-bg-medical';

  // Translate title or fallback to channel show/name
  const translatedTitleKey = `projects.${next.translationKey}.title` as const;
  const translatedTitle = t(translatedTitleKey as any);
  const projectTitle = translatedTitle !== translatedTitleKey
    ? translatedTitle
    : (nextChannel?.show || nextChannel?.name || next.id);

  const handleNavigate = () => {
    if (nextChannel?.n !== undefined) {
      tune(nextChannel.n);
    }
  };

  return (
    <section className="w-full my-0 overflow-hidden">
      <div
        onClick={handleNavigate}
        className={`w-full rounded-none transition-all duration-300 group cursor-pointer overflow-hidden md:h-[320px] lg:h-[340px] md:max-h-[400px] ${bgClass}`}
      >
        <div className="w-full h-full grid grid-cols-1 md:grid-cols-12 items-stretch">
          {/* Left: Project Image taking FULL height, filled and aligned to top left */}
          <div className="col-span-12 md:col-span-6 lg:col-span-7 relative h-64 md:h-full overflow-hidden flex items-start justify-start">
            {next.image ? (
              <img
                src={next.image}
                alt={projectTitle}
                className="w-full h-full object-cover object-top object-left group-hover:scale-[1.02] transition-transform duration-700 ease-out"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white/50 text-sm">
                {projectTitle}
              </div>
            )}
          </div>

          {/* Right: Text & Action CTA */}
          <div className="col-span-12 md:col-span-6 lg:col-span-5 p-6 md:p-8 lg:p-10 flex flex-col justify-center items-start text-left">
            <span className="text-xs sm:text-sm font-semibold tracking-widest text-white/90 uppercase mb-2 md:mb-3 drop-shadow-sm">
              {t('projectPage.nextProject.label')}
            </span>

            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight mb-5 md:mb-6 leading-tight drop-shadow-sm">
              {projectTitle}
            </h3>

            <div className="next-project-btn inline-flex items-center gap-3 px-6 py-3 shadow-md transition-all duration-300 text-sm md:text-base font-bold">
              <span className="font-semibold">{t('projectPage.nextProject.button')}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
