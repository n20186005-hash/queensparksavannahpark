import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://queensparksavannahpark.com';
  const locales = ['zh', 'en', 'es'];
  // Only canonical, indexable pages are listed. Legal/preference pages are
  // intentionally left out (they are noindex,follow) and the distance guide is
  // also registered here.
  const routes = ['', '/queens-park-savannah-distance'];

  const sitemap: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of routes) {
      sitemap.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1 : 0.5,
      });
    }
  }

  return sitemap;
}
