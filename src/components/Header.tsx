'use client';

import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import LanguageToggle from './LanguageToggle';
import ThemeToggle from './ThemeToggle';
import { useState, useEffect } from 'react';

export default function Header({ solid = false }: { solid?: boolean }) {
  const t = useTranslations('header');
  const locale = useLocale();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const homeHref = `/${locale}`;

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: (solid || scrolled) ? 'var(--bg-secondary)' : 'transparent',
        borderBottom: (solid || scrolled) ? '1px solid var(--border-color)' : 'none',
        backdropFilter: (solid || scrolled) ? 'blur(12px)' : 'none',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <a href={homeHref} className="font-display text-lg font-semibold tracking-tight" style={{ color: (solid || scrolled) ? 'var(--text-primary)' : '#fff' }}>
          Queen's Park Savannah
        </a>

        <nav className="hidden md:flex items-center gap-6">
          <a href={`/${locale}/#nearby`} className="text-sm font-medium transition-colors" style={{ color: (solid || scrolled) ? 'var(--text-secondary)' : 'rgba(255,255,255,0.85)' }}>{t('explore')}</a>
          {(['gallery', 'reviews', 'map'] as const).map((section) => (
            <a
              key={section}
              href={`/${locale}/#${section}`}
              className="text-sm font-medium transition-colors"
              style={{ color: (solid || scrolled) ? 'var(--text-secondary)' : 'rgba(255,255,255,0.85)' }}
            >
              {t(section)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <LanguageToggle />
        </div>
      </div>
    </header>
  );
}
