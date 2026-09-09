// ============================================================================
// Site-wide entity configuration for Queen's Park Savannah.
// Keep NAP (Name/Address/Phone) data in sync with the official Google Maps
// listing so that Search Console / Knowledge Graph signals stay consistent.
// ============================================================================

export const SITE = {
  domain: 'queensparksavannahpark.com',
  url: 'https://queensparksavannahpark.com',

  // Entity identity
  attractionFullName: "Queen's Park Savannah",
  attractionShortName: 'the Savannah',
  nameZh: '女王公园 Savannah',

  // NAP
  phone: '+1 868-622-1670',
  plusCode: 'MF9P+97',
  streetAddress: "11 Queen's Park E",
  postalAddress: "11 Queen's Park E, Port of Spain, Trinidad and Tobago",
  addressLocality: 'Port of Spain',
  addressCountryCode: 'TT',
  countryName: 'Trinidad and Tobago',

  // Localized display names (fallback strings used in <head>/JSON-LD)
  cities: {
    zh: '西班牙港',
    en: 'Port of Spain',
    es: 'Puerto España',
  } as Record<string, string>,
  countries: {
    zh: '特立尼达和多巴哥',
    en: 'Trinidad and Tobago',
    es: 'Trinidad y Tobago',
  } as Record<string, string>,

  // Geo (matches the official Google Maps place card)
  latitude: 10.6684925,
  longitude: -61.5142594,

  // Google Maps
  mapsShareUrl: 'https://maps.app.goo.gl/YuLjuPMHowrSose38',
  mapsEmbedSrc:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6968.704115489896!2d-61.5142594!3d10.668492499999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8c3608757d0f84eb%3A0x7891e3ceea281d80!2sQueen\'s%20Park%20Savannah!5e1!3m2!1szh-CN!2s!4v1788950462250!5m2!1szh-CN!2s',

  // Ratings (latest Google listing)
  rating: '4.4',
  reviewCount: '9,778',

  // Nearby semantic landmarks (used for entity clustering)
  nearbyLandmark1: 'Royal Botanic Gardens',
  nearbyLandmark2: 'The Magnificent Seven',

  // Authoritative outbound / sameAs links
  govtTourismUrl: 'https://visittrinidad.tt/',
  govtTourismPageUrl: 'https://visittrinidad.tt/things-to-do/sites-attractions/queens-park-savannah/',
  nationalTrustUrl: 'https://nationaltrust.tt/location/queens-park-savannah/',

  // Canonical hero image (copied from the gallery to a clean URL)
  heroImagePath: '/images/hero.jpg',

  // GA4 measurement id
  ga4Id: 'G-HXM22WWPKP',
} as const;

export type Locale = 'zh' | 'en' | 'es';

export const LOCALES: Locale[] = ['zh', 'en', 'es'];

export function cityName(locale: Locale): string {
  return SITE.cities[locale] || SITE.cities.en;
}

export function countryName(locale: Locale): string {
  return SITE.countries[locale] || SITE.countries.en;
}

export function heroImageUrl(): string {
  return `${SITE.url}${SITE.heroImagePath}`;
}
