import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import type { Metadata, Viewport } from 'next';
import { SITE } from '@/lib/site';
import PwaRegister from '@/components/PwaRegister';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1a3d4a',
};

// ---------------------------------------------------------------------------
// Schema.org helpers (kept in one place so head markup matches body content)
// ---------------------------------------------------------------------------

function attractionJsonLd() {
  return {
    '@context': 'https://schema.org',
    // "Park" + "TouristAttraction" makes the rich result eligible for both
    // local (map/knowledge panel) and travel-related queries.
    '@type': ['Park', 'TouristAttraction'],
    '@id': `${SITE.url}/#attraction`,
    name: SITE.attractionFullName,
    alternateName: [
      SITE.attractionShortName,
      SITE.nameZh,
      `${SITE.attractionFullName} Park`, // matches the domain queensparksavannahpark.com
    ],
    description: `Comprehensive visitor guide to ${SITE.attractionFullName} in ${SITE.addressLocality}, ${SITE.countryName}.`,
    url: SITE.url,
    telephone: SITE.phone,
    image: [`${SITE.url}${SITE.heroImagePath}`],
    isAccessibleForFree: true,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: SITE.rating,
      bestRating: '5',
      reviewCount: Number(SITE.reviewCount.replace(/\D/g, '')),
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.streetAddress,
      addressLocality: SITE.addressLocality,
      addressCountry: SITE.addressCountryCode,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SITE.latitude,
      longitude: SITE.longitude,
    },
    hasMap: SITE.mapsShareUrl,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '00:00',
        closes: '23:59',
      },
    ],
    sameAs: [SITE.mapsShareUrl, SITE.govtTourismPageUrl, SITE.nationalTrustUrl],
  };
}

function faqJsonLd(items: Array<{ q: string; a: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`@/messages/${locale}.json`)).default;
  const baseUrl = SITE.url;

  const zhUrl = `${baseUrl}/zh`;
  const enUrl = `${baseUrl}/en`;
  const esUrl = `${baseUrl}/es`;

  let selfUrl = zhUrl;
  if (locale === 'en') selfUrl = enUrl;
  else if (locale === 'es') selfUrl = esUrl;

  const city = SITE.cities[locale] || SITE.cities.en;
  const heroImage = `${baseUrl}${SITE.heroImagePath}`;

  const localeMap: Record<string, string> = {
    'zh': 'zh_CN',
    'en': 'en_US',
    'es': 'es_ES',
  };

  return {
    metadataBase: new URL(baseUrl),
    title: messages.meta.title,
    description: messages.meta.description,
    keywords: [
      "Queen's Park Savannah",
      '女王公园 Savannah',
      `${SITE.attractionFullName} ${city}`,
      `${city} park`,
      'Port of Spain Trinidad and Tobago',
      'The Magnificent Seven',
      'Trinidad Carnival',
      'visitor guide',
      'location map',
    ],
    alternates: {
      canonical: selfUrl,
      languages: {
        'en': enUrl,
        'es': esUrl,
        'zh': zhUrl,
        // x-default points to English: the audience language for this site.
        'x-default': enUrl,
      } as Record<string, string>,
    },
    openGraph: {
      title: `${SITE.attractionFullName} - ${city} Travel Guide`,
      description: messages.meta.description,
      url: selfUrl,
      siteName: SITE.attractionFullName,
      locale: localeMap[locale] || 'en_US',
      type: 'website',
      images: [
        {
          url: heroImage,
          width: 1200,
          height: 630,
          alt: `${SITE.attractionFullName} in ${city}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: messages.meta.title,
      description: messages.meta.description,
      images: [heroImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    icons: {
      icon: [
        { url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
        { url: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
        { url: '/icons/favicon-32.png', sizes: '32x32', type: 'image/png' },
      ],
      apple: [{ url: '/icons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    },
    manifest: '/manifest.webmanifest',
    appleWebApp: {
      capable: true,
      statusBarStyle: 'default',
      title: SITE.attractionFullName,
    },
    applicationName: SITE.attractionFullName,
    category: 'travel',
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const messagesAny = messages as any;
  const faqItems = (messagesAny?.faq?.items || []) as Array<{ q: string; a: string }>;

  const langMap: Record<string, string> = {
    'zh': 'zh-CN',
    'en': 'en',
    'es': 'es',
  };

  return (
    <html lang={langMap[locale] || 'zh-CN'} suppressHydrationWarning>
      <head>
        <meta name="format-detection" content="telephone=yes" />

        {/* Google AdSense (optional placeholder) */}
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXX" crossOrigin="anonymous" />
        <meta name="google-adsense-account" content="ca-pub-XXXXXXXXXX" />

        {/* Google Analytics 4 */}
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${SITE.ga4Id}`} />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${SITE.ga4Id}', { 'anonymize_ip': true });`,
          }}
        />

        {/* Schema.org: TouristAttraction (entity binding) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(attractionJsonLd()) }}
        />

        {/* Schema.org: FAQPage (matches the visible FAQ section) */}
        {faqItems.length > 0 && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqItems)) }}
          />
        )}

        {/* Theme pre-hydration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark') {
                    document.documentElement.setAttribute('data-theme', 'dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen">
        <NextIntlClientProvider messages={messages}>
          {children}
          <PwaRegister />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
