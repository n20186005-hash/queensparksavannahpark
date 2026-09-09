import { useTranslations, useMessages } from 'next-intl';

// SEO-focused "Top Things to Do" list: scannable numbered items that answer the
// dominant search intent ("what to do at Queen's Park Savannah") right after
// the intro, while reinforcing long-tail phrases (roundabout, coconut vendors,
// Magnificent Seven, botanic gardens, night market, Carnival).
export default function TopThingsSection() {
  const t = useTranslations('thingsToDo');
  const messages = useMessages() as any;
  const items: Array<{ t: string; d: string }> = messages?.thingsToDo?.items || [];

  return (
    <section id="top-things-to-do" className="section-padding">
      <div className="max-w-5xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-6" style={{ background: 'var(--accent)' }} />
        <p className="text-lg mb-10" style={{ color: 'var(--text-secondary)' }}>
          {t('subtitle')}
        </p>

        <ol className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {items.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-4 rounded-xl p-5"
              style={{
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border-color)',
              }}
            >
              <span
                aria-hidden="true"
                className="mt-0.5 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                style={{ background: 'var(--accent)', color: '#fff' }}
              >
                {i + 1}
              </span>
              <div>
                <h3
                  className="font-display text-lg font-semibold mb-1"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {item.t}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {item.d}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
