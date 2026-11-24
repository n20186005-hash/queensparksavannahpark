import Header from './Header';
import Footer from './Footer';
import places from '@/lib/city-places.json';

type Locale = 'en' | 'es' | 'zh';
type Place = (typeof places)[number];

const labels = {
  en: { back: 'Nearby attractions', route: 'Walking route', place: 'History and details to notice', care: 'Management and access', faq: 'Visitor questions', map: 'Open the location on Google Maps', photos: 'Heritage photograph', source: 'Heritage record', next: 'Another place to explore' },
  es: { back: 'Lugares cercanos', route: 'Recorrido a pie', place: 'Historia y detalles que observar', care: 'Gestión y acceso', faq: 'Preguntas frecuentes', map: 'Abrir el lugar en Google Maps', photos: 'Fotografía patrimonial', source: 'Ficha patrimonial', next: 'Otro lugar para descubrir' },
  zh: { back: '周边景点', route: '步行游线', place: '历史与现场看点', care: '管理与参观', faq: '游客常见问题', map: '在 Google 地图查看本景点', photos: '遗产实景照片', source: '遗产档案', next: '继续探索' },
};

export default function CityHeritageGuide({ place, locale }: { place: Place; locale: Locale }) {
  const c = place.copy[locale];
  const t = labels[locale];
  const map = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(place.copy.en.name + ', ' + place.address);
  const next = places[(places.indexOf(place) + 1) % places.length];
  return <><Header solid /><main className="min-h-screen px-4 sm:px-6 pt-24 pb-14 sm:pt-28 sm:pb-20" style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
    <article className="max-w-4xl mx-auto">
      <a className="text-sm underline" href={`/${locale}#nearby`}>{t.back}</a>
      <h1 className="font-display text-3xl sm:text-5xl font-bold mt-10 mb-4">{c.name}</h1>
      <p className="mb-2">{place.address}</p>
      <a className="inline-flex rounded-full px-5 py-2.5 mb-8 text-white font-semibold" style={{ background: 'var(--accent)' }} href={map}>{t.map}</a>
      <figure className="mb-10"><img className="w-full max-h-[480px] object-contain rounded-xl" src={`/city/${place.slug}.webp`} alt={c.name} /><figcaption className="text-xs mt-2">{c.name} · <a className="underline" href={place.photoSource}>{t.photos}</a> · National Trust of Trinidad and Tobago</figcaption></figure>
      <section className="mb-9"><h2 className="font-display text-2xl font-semibold mb-4">{t.place}</h2><p className="leading-relaxed">{c.history}</p></section>
      <section className="rounded-xl p-6 mb-9" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}><h2 className="font-display text-2xl font-semibold mb-3">{t.care}</h2><p className="leading-relaxed">{c.management}</p></section>
      <section className="mb-9"><h2 className="font-display text-2xl font-semibold mb-3">{t.route}</h2><p className="leading-relaxed">{c.route}</p></section>
      <section className="mb-10"><h2 className="font-display text-2xl font-semibold mb-3">{t.faq}</h2><dl>{c.faq.map(([q,a]) => <div className="mb-4" key={q}><dt className="font-semibold">{q}</dt><dd className="leading-relaxed">{a}</dd></div>)}</dl></section>
      <div className="flex flex-wrap gap-5"><a className="underline" href={place.source}>{t.source} · National Trust of Trinidad and Tobago</a><a className="underline" href={`/${locale}/nearby/${next.slug}`}>{t.next} · {next.copy[locale].name}</a></div>
    </article>
  </main><Footer /></>;
}
