import { useTranslation } from '../../../hooks/useTranslation';

export function ProjectCopyrightSection() {
  const { t } = useTranslation();

  return (
    <div className="w-full py-8 md:py-10 text-center">
      <p className="text-xs md:text-sm font-medium text-slate-400 tracking-wide mb-1">
        {t('projectPage.copyright.title')}
      </p>
      <p className="text-[11px] md:text-xs text-slate-500 max-w-2xl mx-auto leading-relaxed">
        {t('projectPage.copyright.subtitle')}
      </p>
    </div>
  );
}
