import { useTranslations } from 'next-intl';
import BoldText from './BoldText';
import { SITE } from '@/lib/site';

/**
 * Entity-binding section.
 * Semantically equates the official full name (Queen's Park Savannah)
 * with the short, locally used name (the Savannah) in the very first
 * body paragraphs, then exposes the geographic hierarchy and official links.
 */
export default function AboutSection() {
  const t = useTranslations('about');

  return (
    <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-4xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-8" style={{ background: 'var(--accent)' }} />

        <p className="rich-text text-lg leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
          <BoldText text={t('welcome')} />
        </p>
        <p className="rich-text text-lg leading-relaxed mb-10" style={{ color: 'var(--text-secondary)' }}>
          <BoldText text={t('detail')} />
        </p>

        {/* Geographic hierarchy (4.2) */}
        <div
          className="rounded-xl p-5 mb-4 flex flex-col sm:flex-row sm:items-center gap-3"
          style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
        >
          <div className="flex items-center gap-2 flex-shrink-0 text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--accent)' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {t('geoLabel')}
          </div>
          <p className="text-sm font-medium leading-relaxed" style={{ color: 'var(--text-primary)' }}>
            {t('geoCrumb')}
          </p>
        </div>

        {/* Official outbound authority link (section 5) */}
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          {t('official')}{' '}
          <a
            href={SITE.govtTourismUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium hover:underline"
            style={{ color: 'var(--accent)' }}
          >
            {t('officialLinkLabel')}
          </a>
          .
        </p>
      </div>
    </section>
  );
}
