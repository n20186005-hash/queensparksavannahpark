import { useTranslations } from 'next-intl';
import { SITE } from '@/lib/site';

/**
 * Compact "at a glance" bar placed right under the Hero so the most-searched
 * facts (loop distance, address, hours, free admission) are visible without a
 * long scroll — directly addressing the mobile first-screen CTR issue.
 */
export default function QuickGlance() {
  const t = useTranslations('quickGlance');

  const facts = [
    { icon: '🚶', label: t('distance') },
    { icon: '📍', label: t('address') },
    { icon: '🕒', label: t('hours') },
    { icon: '🎟️', label: t('tickets') },
  ];

  return (
    <section className="section-padding" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-5xl mx-auto">
        <h2 className="sr-only">{t('title')}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
          {facts.map((fact, i) => (
            <div
              key={i}
              className="rounded-xl p-4 text-center"
              style={{
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border-color)',
              }}
            >
              <div className="text-xl mb-1.5" aria-hidden="true">{fact.icon}</div>
              <p className="text-sm font-medium leading-snug" style={{ color: 'var(--text-primary)' }}>
                {fact.label}
              </p>
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <a
            href={SITE.mapsShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-white transition-colors"
            style={{ background: 'var(--accent)' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {t('map')}
          </a>
        </div>
      </div>
    </section>
  );
}
