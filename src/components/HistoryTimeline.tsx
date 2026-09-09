'use client';

import { useMessages, useTranslations } from 'next-intl';

export default function HistoryTimeline() {
  const t = useTranslations('historyTimeline');
  const messages = useMessages() as any;

  const timeline: Array<{ title: string; story: string }> = messages?.historyTimeline?.items ?? [];
  const lore: Array<{ title: string; story: string }> = messages?.historyTimeline?.lore ?? [];

  return (
    <section className="section-padding" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-4xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-6 text-center"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-12 mx-auto" style={{ background: 'var(--accent)' }} />

        <div className="relative border-l-2 border-dashed ml-4 md:ml-8 mb-12" style={{ borderColor: 'var(--border-color)' }}>
          {timeline.map((item, index) => (
            <div key={index} className="mb-10 ml-6 md:ml-10 relative">
              {/* Timeline dot */}
              <div 
                className="absolute w-4 h-4 rounded-full -left-[33px] md:-left-[49px] top-1.5"
                style={{ background: 'var(--accent)', border: '4px solid var(--bg-primary)' }}
              />
              
              <div className="bg-opacity-50 rounded-xl p-6 shadow-sm" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
                <span className="text-sm font-bold tracking-wider uppercase mb-2 block" style={{ color: 'var(--accent)' }}>
                  {t(`items.${index}.year`)}
                </span>
                <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                  {t(`items.${index}.title`)}
                </h3>
                <div className="text-sm font-medium mb-3 py-1 px-3 inline-block rounded-full" style={{ background: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}>
                  📍 {t(`items.${index}.plaque`)}
                </div>
                <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {t(`items.${index}.description`)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-xl p-6 md:p-8" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}>
          <h4 className="text-lg font-bold mb-3 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
            💡 {t('guideTitle')}
          </h4>
          <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }} dangerouslySetInnerHTML={{
            __html: t('guideContent')
              .replace(/\*\*(.*?)\*\*/g, '<strong style="color: var(--text-primary)">$1</strong>')
          }} />
        </div>

        {lore.length > 0 && (
          <div className="mt-10 rounded-xl p-6 md:p-8" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}>
            <h4 className="text-lg font-bold mb-1 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
              <span role="img" aria-label="scroll">📜</span> {t('loreTitle')}
            </h4>
            <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
              {t('loreNote')}
            </p>
            <div className="space-y-4">
              {lore.map((item, index) => (
                <div key={index} className="rounded-lg p-5" style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)' }}>
                  <div className="flex items-start gap-3">
                    <span
                      className="w-7 h-7 shrink-0 rounded-full flex items-center justify-center text-xs font-bold"
                      style={{ background: 'var(--accent)', color: '#fff' }}
                    >
                      {index + 1}
                    </span>
                    <div>
                      <h5 className="font-semibold mb-1.5" style={{ color: 'var(--text-primary)' }}>
                        {item.title}
                      </h5>
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                        {item.story}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs mt-6 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              {t('sourceNote')}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
