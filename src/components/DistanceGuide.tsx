import { useTranslations, useMessages } from 'next-intl';
import { SITE } from '@/lib/site';

export default function DistanceGuide({ locale }: { locale: string }) {
  const t = useTranslations('distancePage');
  const messages = useMessages() as any;
  const pace: Array<{ label: string; time: string; detail: string }> =
    messages?.distancePage?.pace || [];
  const faq: Array<{ q: string; a: string }> = messages?.distancePage?.faq || [];
  const homeHref = `/${locale}`;
  const selfUrl = `${SITE.url}/${locale}/queens-park-savannah-distance`;

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${SITE.url}/${locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: t('title'),
        item: selfUrl,
      },
    ],
  };

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  return (
    <div style={{ background: 'var(--bg-primary)' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <a
          href={homeHref}
          className="inline-flex items-center gap-2 text-sm font-medium mb-10 transition-colors"
          style={{ color: 'var(--accent)' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          {t('backHome')}
        </a>

        <h1
          className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h1>
        <p className="text-lg leading-relaxed mb-12" style={{ color: 'var(--text-secondary)' }}>
          {t('hero')}
        </p>

        {/* Pace table */}
        <section className="mb-14">
          <h2
            className="font-display text-2xl sm:text-3xl font-semibold mb-3"
            style={{ color: 'var(--text-primary)' }}
          >
            {t('paceTitle')}
          </h2>
          <div className="w-12 h-0.5 mb-6" style={{ background: 'var(--accent)' }} />
          <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
            {t('paceNote')}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {pace.map((row, i) => (
              <div
                key={i}
                className="rounded-xl p-5 text-center"
                style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
              >
                <p className="text-sm mb-1" style={{ color: 'var(--text-muted)' }}>{row.label}</p>
                <p className="font-display text-2xl font-bold mb-1" style={{ color: 'var(--accent)' }}>
                  {row.time}
                </p>
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{row.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Terrain & start */}
        <section className="mb-14">
          <h2
            className="font-display text-2xl sm:text-3xl font-semibold mb-3"
            style={{ color: 'var(--text-primary)' }}
          >
            {t('terrainTitle')}
          </h2>
          <div className="w-12 h-0.5 mb-6" style={{ background: 'var(--accent)' }} />
          <p className="leading-relaxed mb-8" style={{ color: 'var(--text-secondary)' }}>
            {t('terrain')}
          </p>

          <h2
            className="font-display text-2xl sm:text-3xl font-semibold mb-3"
            style={{ color: 'var(--text-primary)' }}
          >
            {t('startTitle')}
          </h2>
          <div className="w-12 h-0.5 mb-6" style={{ background: 'var(--accent)' }} />
          <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {t('start')}
          </p>
        </section>

        {/* Night */}
        <section className="mb-14">
          <h2
            className="font-display text-2xl sm:text-3xl font-semibold mb-3"
            style={{ color: 'var(--text-primary)' }}
          >
            {t('nightTitle')}
          </h2>
          <div className="w-12 h-0.5 mb-6" style={{ background: 'var(--accent)' }} />
          <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {t('night')}
          </p>
        </section>

        {/* Amenities */}
        <section className="mb-14">
          <h2
            className="font-display text-2xl sm:text-3xl font-semibold mb-3"
            style={{ color: 'var(--text-primary)' }}
          >
            {t('amenitiesTitle')}
          </h2>
          <div className="w-12 h-0.5 mb-6" style={{ background: 'var(--accent)' }} />
          <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {t('amenities')}
          </p>
        </section>

        {/* Map */}
        <section className="mb-14">
          <h2
            className="font-display text-2xl sm:text-3xl font-semibold mb-3"
            style={{ color: 'var(--text-primary)' }}
          >
            {t('mapTitle')}
          </h2>
          <div className="w-12 h-0.5 mb-6" style={{ background: 'var(--accent)' }} />
          <div
            className="relative rounded-xl overflow-hidden"
            style={{ border: '1px solid var(--map-border)' }}
          >
            <iframe
              src={SITE.mapsEmbedSrc}
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              title="Google Maps - Queen's Park Savannah loop, Port of Spain"
            />
          </div>
          <div className="mt-5 flex justify-center">
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
              {t('mapTitle')}
            </a>
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2
            className="font-display text-2xl sm:text-3xl font-semibold mb-3"
            style={{ color: 'var(--text-primary)' }}
          >
            {t('faqTitle')}
          </h2>
          <div className="w-12 h-0.5 mb-6" style={{ background: 'var(--accent)' }} />
          <div className="space-y-6">
            {faq.map((item, i) => (
              <div key={i}>
                <h3 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                  {item.q}
                </h3>
                <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
