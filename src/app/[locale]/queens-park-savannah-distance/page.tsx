import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import DistanceGuide from '@/components/DistanceGuide';
import { routing } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`@/messages/${locale}.json`)).default as any;
  const baseUrl = 'https://queensparksavannahpark.com';
  const selfUrl = `${baseUrl}/${locale}/queens-park-savannah-distance`;

  const langMap: Record<string, string> = {
    'zh': 'zh_CN',
    'en': 'en_US',
    'es': 'es_ES',
  };

  return {
    metadataBase: new URL(baseUrl),
    title: messages.distancePage.metaTitle,
    description: messages.distancePage.description,
    alternates: {
      canonical: selfUrl,
      languages: {
        'en': `${baseUrl}/en/queens-park-savannah-distance`,
        'es': `${baseUrl}/es/queens-park-savannah-distance`,
        'zh': `${baseUrl}/zh/queens-park-savannah-distance`,
        'x-default': `${baseUrl}/en/queens-park-savannah-distance`,
      } as Record<string, string>,
    },
    openGraph: {
      title: messages.distancePage.metaTitle,
      description: messages.distancePage.description,
      url: selfUrl,
      siteName: 'Queen\'s Park Savannah',
      locale: langMap[locale] || 'en_US',
      type: 'article',
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function DistancePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <DistanceGuide locale={locale} />;
}
