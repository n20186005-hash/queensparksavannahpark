import { useTranslations, useMessages, useLocale } from 'next-intl';
import BoldText from './BoldText';
import { SITE } from '@/lib/site';

/**
 * Nearby semantic cluster section (section 4.3 + heading template 3).
 * Names the surrounding landmarks and anchors them to the attraction.
 */
export default function LandmarksSection() {
  const t = useTranslations('landmarks');
  const messages = useMessages() as any;
  const locale = useLocale();
  const items = (messages?.landmarks?.items || []) as Array<{ name: string; desc: string }>;

  return (
    <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-5xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-8" style={{ background: 'var(--accent)' }} />

        <p className="rich-text text-lg leading-relaxed mb-10" style={{ color: 'var(--text-secondary)' }}>
          <BoldText text={t('intro')} />
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {items.map((item, i) => (
            <div
              key={i}
              className="rounded-xl p-5 sm:p-6"
              style={{
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border-color)',
              }}
            >
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center mb-3 text-xs font-bold"
                style={{ background: 'var(--accent)', color: '#fff' }}
              >
                {String(i + 1).padStart(2, '0')}
              </div>
              <h3 className="font-display text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                {item.name}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          {[
            { slug: 'royal-botanic-gardens', title: locale === 'es' ? 'Jardín Botánico Real' : locale === 'zh' ? '皇家植物园' : 'Royal Botanic Gardens' },
            { slug: 'stollmeyers-castle', title: locale === 'es' ? 'Castillo de Stollmeyer' : locale === 'zh' ? '斯托尔迈耶城堡' : 'Stollmeyer’s Castle' },
          ].map(place => <a key={place.slug} href={`/${locale}/nearby/${place.slug}`} className="rounded-xl p-5 hover:underline font-semibold" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', color: 'var(--accent)' }}>{place.title} →</a>)}
        </div>

        <div className="mt-8 flex justify-center">
          <a href={`/${locale}/things-to-do`} className="inline-flex items-center px-5 py-2.5 mr-3 rounded-full text-sm font-medium text-white" style={{ background: 'var(--accent)' }}>
            {locale === 'es' ? 'Ruta y lugares cercanos' : locale === 'zh' ? '周边游览路线' : 'Explore nearby landmarks'}
          </a>
          <a
            href={SITE.mapsShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-white transition-colors"
            style={{ background: 'var(--accent)' }}
          >
            {t('viewMap')}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
