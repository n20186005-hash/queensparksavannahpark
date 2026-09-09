import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  // English is the primary language: Trinidad and Tobago's official language
  // and the language of ~99% of searches for "Queen's Park Savannah".
  locales: ['en', 'es', 'zh'],
  defaultLocale: 'en',
  localePrefix: 'always',
  pathnames: {
    '/': '/',
    '/privacy-policy': '/privacy-policy',
    '/terms-of-service': '/terms-of-service',
    '/cookie-settings': '/cookie-settings',
  },
});

export type Locale = (typeof routing.locales)[number];

export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
