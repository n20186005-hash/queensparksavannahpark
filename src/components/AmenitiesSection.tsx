'use client';

import { useTranslations } from 'next-intl';

const ITEM_ICONS = ['🚻', '🅿️', '🍽️', '🏨', '🛒', '⛽'];

export default function AmenitiesSection() {
  const t = useTranslations('amenities');
  const itemCount = 6;
  const indices = Array.from({ length: itemCount }, (_, i) => i);

  return (
    <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-5xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-3 text-center"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <p className="text-center mb-10 max-w-3xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
          {t('subtitle')}
        </p>
        <div className="w-12 h-0.5 mb-12 mx-auto" style={{ background: 'var(--accent)' }} />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {indices.map((i) => (
            <div
              key={i}
              className="rounded-xl p-6 shadow-sm flex flex-col"
              style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)' }}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-xl mb-4"
                style={{ background: 'var(--bg-tertiary)' }}
                aria-hidden="true"
              >
                {ITEM_ICONS[i]}
              </div>
              <h3 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                {t(`items.${i}.name`)}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {t(`items.${i}.tip`)}
              </p>
            </div>
          ))}
        </div>

        <p className="text-xs mt-8 text-center max-w-3xl mx-auto leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          {t('note')}
        </p>
      </div>
    </section>
  );
}
