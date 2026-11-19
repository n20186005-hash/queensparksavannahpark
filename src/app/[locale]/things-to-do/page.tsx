import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { SITE } from '@/lib/site';
import GuideBasics from '@/components/GuideBasics';

const copy = {
  en: {
    title: "Things to Do Around Queen's Park Savannah",
    description: "A practical Port of Spain walking guide to the Magnificent Seven, Royal Botanic Gardens, Emperor Valley Zoo and cultural landmarks beside Queen's Park Savannah.",
    lead: "Queen's Park Savannah is more than an open green space: its perimeter connects historic architecture, gardens, performance venues and everyday city life. Use this guide to plan a short visit or a relaxed half day.",
    sections: [
      ["Start at the Savannah", "Begin with views across the broad grassland and the tree-lined perimeter. The park is used for walking, running and major cultural events, particularly during Carnival. Keep to established pedestrian areas and check for temporary event restrictions."],
      ["See the Magnificent Seven", "On the western side, look for the celebrated row of historic mansions. Stollmeyer's Castle, Mille Fleurs and Queen's Royal College offer contrasting architectural details. Admire private or restricted properties from public viewpoints; interior access varies."],
      ["Visit the Royal Botanic Gardens", "Continue towards the north side for mature trees, shaded paths and botanical collections. The gardens were established in 1818. Check current entry arrangements and hours before travelling."],
      ["Add Emperor Valley Zoo", "The zoo sits near the Botanic Gardens and is an optional family stop. Allow extra time and confirm its separate ticket prices and opening schedule directly with the operator."],
      ["Look towards the cultural district", "The National Academy for the Performing Arts (NAPA) is a distinctive modern landmark on the city side of the Savannah. Queen's Hall is another nearby venue; check performance calendars if you hope to attend an event."],
      ["Finish with a loop or refreshments", "A full perimeter circuit is commonly described as approximately 3.5 km, although the tourism authority describes it as about two miles. Actual distance depends on your path and start point. Late-afternoon light can be pleasant for photographs; take care when crossing roads."],
    ],
    plan: 'Suggested visit order', steps: ['Savannah overview and perimeter', 'Magnificent Seven exterior views', 'Royal Botanic Gardens', 'Optional zoo or performance venue'],
    practical: 'Before you go', notes: ['The Savannah is an open public landscape; individual attractions operate their own schedules.', 'Use designated crossings around the busy perimeter roads.', 'Carry water and sun protection; rain can change walking conditions.', 'Check official event announcements during Carnival and other large gatherings.'],
    distance: 'Detailed loop distance and walking times', home: 'Back to Queen’s Park Savannah', sources: 'Official visitor references', map: 'Open Queen’s Park Savannah in Google Maps',
  },
  es: {
    title: 'Qué hacer cerca de Queen’s Park Savannah',
    description: 'Ruta práctica por Puerto España: los Siete Magníficos, Jardín Botánico Real, zoológico Emperor Valley y lugares culturales alrededor de Queen’s Park Savannah.',
    lead: 'Queen’s Park Savannah es más que un gran espacio verde: su perímetro conecta arquitectura histórica, jardines, salas culturales y la vida cotidiana de la ciudad. Esta guía ayuda a organizar una visita breve o medio día tranquilo.',
    sections: [
      ['Empieza en el Savannah', 'Observa la amplia pradera y el perímetro arbolado. Se utiliza para caminar, correr y celebrar grandes acontecimientos culturales, especialmente durante el Carnaval. Respeta las zonas peatonales y las restricciones temporales.'],
      ['Descubre los Siete Magníficos', 'En el lado oeste se encuentra la famosa hilera de mansiones históricas. Stollmeyer’s Castle, Mille Fleurs y Queen’s Royal College muestran estilos arquitectónicos distintos. Contempla los edificios privados o de acceso restringido desde espacios públicos.'],
      ['Pasea por el Jardín Botánico Real', 'Dirígete al norte para disfrutar de árboles maduros, caminos sombreados y colecciones botánicas. Los jardines fueron fundados en 1818. Comprueba los horarios y las condiciones de entrada antes de ir.'],
      ['Añade el zoológico Emperor Valley', 'El zoológico está cerca de los jardines y es una opción para familias. Reserva tiempo adicional y consulta directamente las entradas y los horarios.'],
      ['Explora los espacios culturales', 'La Academia Nacional de Artes Escénicas (NAPA) es un edificio moderno destacado cerca del Savannah. Queen’s Hall es otra sala próxima; consulta la programación si quieres asistir a un espectáculo.'],
      ['Termina con un paseo circular', 'El circuito perimetral suele estimarse en unos 3,5 km, aunque la autoridad turística habla de unas dos millas. La distancia depende del recorrido exacto. La luz de la tarde favorece las fotos; cruza las calles con precaución.'],
    ],
    plan: 'Orden de visita sugerido', steps: ['Panorámica y perímetro del Savannah', 'Fachadas de los Siete Magníficos', 'Jardín Botánico Real', 'Zoológico o espacio cultural opcional'],
    practical: 'Antes de salir', notes: ['El Savannah es un espacio abierto; los lugares vecinos tienen horarios propios.', 'Usa los pasos habilitados en las calles del perímetro.', 'Lleva agua y protección solar; la lluvia puede afectar el paseo.', 'Consulta los anuncios oficiales durante el Carnaval y otros eventos.'],
    distance: 'Distancia del circuito y tiempos a pie', home: 'Volver a Queen’s Park Savannah', sources: 'Referencias turísticas oficiales', map: 'Abrir Queen’s Park Savannah en Google Maps',
  },
  zh: {
    title: 'Queen’s Park Savannah 周边景点与步行游览路线',
    description: '西班牙港 Queen’s Park Savannah 周边游览指南：七大历史建筑、皇家植物园、皇帝谷动物园与表演艺术场馆的步行安排。',
    lead: 'Queen’s Park Savannah 不只是一片城市绿地。沿着公园周边，可以串联历史建筑、植物园、文化场馆和当地城市生活。这份指南适合短暂停留，也适合安排轻松的半日游。',
    sections: [
      ['从 Savannah 草地开始', '先欣赏广阔草坪与绿树成荫的外缘。这里是散步、跑步及大型文化活动的场所，狂欢节期间尤其热闹。请沿适合行人的区域活动，并留意临时交通管制。'],
      ['欣赏七大历史建筑', '公园西侧有著名的 Magnificent Seven 建筑群。Stollmeyer’s Castle、Mille Fleurs 和 Queen’s Royal College 展现不同的历史建筑风格。部分建筑不开放内部参观，请从公共区域欣赏外观。'],
      ['走进皇家植物园', '往北侧可到达拥有成熟树木、林荫小径和植物收藏的皇家植物园。园区建于 1818 年。出发前请查看当日开放时间与入园安排。'],
      ['选择皇帝谷动物园', 'Emperor Valley Zoo 位于植物园附近，适合家庭另行安排。动物园有独立的开放时间与门票安排，建议向运营方查询。'],
      ['观察文化地标', '国家表演艺术学院 NAPA 是公园城市一侧醒目的现代建筑。附近还有 Queen’s Hall；如计划观看演出，请先查询节目和场次。'],
      ['以环线散步收尾', '公园周长常按约 3.5 公里介绍，旅游主管机构也使用约两英里的描述。实际步行距离取决于路线和起点。傍晚适合拍摄，但过马路时应留意车辆。'],
    ],
    plan: '建议游览顺序', steps: ['Savannah 草坪和外缘', '七大历史建筑外观', '皇家植物园', '选访动物园或表演场馆'],
    practical: '出发前须知', notes: ['Savannah 是开放式公共空间，周边各景点的营业安排并不相同。', '外围道路车流较多，请使用指定过街处。', '准备饮水和防晒用品；降雨后步行条件可能改变。', '狂欢节及大型活动期间，请查询官方现场公告。'],
    distance: '查看环线距离与步行时间', home: '返回 Queen’s Park Savannah 首页', sources: '官方旅游资料', map: '在 Google 地图打开 Queen’s Park Savannah',
  },
} as const;

export function generateStaticParams() { return ['en', 'es', 'zh'].map(locale => ({ locale })); }

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!(locale in copy)) return {};
  const c = copy[locale as keyof typeof copy];
  const base = SITE.url;
  return { title: c.title, description: c.description, alternates: { canonical: `${base}/${locale}/things-to-do`, languages: { en: `${base}/en/things-to-do`, es: `${base}/es/things-to-do`, zh: `${base}/zh/things-to-do`, 'x-default': `${base}/en/things-to-do` } }, openGraph: { title: c.title, description: c.description, type: 'article', url: `${base}/${locale}/things-to-do` } };
}

export default async function ThingsToDo({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!(locale in copy)) notFound();
  setRequestLocale(locale);
  const c = copy[locale as keyof typeof copy];
  const pageUrl = `${SITE.url}/${locale}/things-to-do`;
  const breadcrumb = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Queen’s Park Savannah', item: `${SITE.url}/${locale}` }, { '@type': 'ListItem', position: 2, name: c.title, item: pageUrl }] };
  return <main className="min-h-screen px-4 sm:px-6 py-14 sm:py-20" style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
    <article className="max-w-4xl mx-auto">
      <a className="text-sm hover:underline" href={`/${locale}`} style={{ color: 'var(--accent)' }}>← {c.home}</a>
      <h1 className="font-display text-3xl sm:text-5xl font-bold mt-8 mb-6">{c.title}</h1>
      <p className="text-lg leading-relaxed mb-12" style={{ color: 'var(--text-secondary)' }}>{c.lead}</p>
      <GuideBasics locale={locale} />
      <div className="grid sm:grid-cols-2 gap-5 mb-14">{c.sections.map(([title, body], i) => <section key={title} className="rounded-xl p-6" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}><span className="text-sm font-semibold" style={{ color: 'var(--accent)' }}>{String(i + 1).padStart(2, '0')}</span><h2 className="font-display text-xl font-semibold mt-2 mb-3">{title}</h2><p className="leading-relaxed text-sm" style={{ color: 'var(--text-secondary)' }}>{body}</p></section>)}</div>
      <section className="mb-12"><h2 className="font-display text-2xl font-semibold mb-5">{c.plan}</h2><ol className="space-y-3 list-decimal pl-6">{c.steps.map(item => <li key={item} className="pl-2">{item}</li>)}</ol></section>
      <section className="mb-12"><h2 className="font-display text-2xl font-semibold mb-5">{c.practical}</h2><ul className="space-y-3 list-disc pl-6">{c.notes.map(item => <li key={item} className="pl-2" style={{ color: 'var(--text-secondary)' }}>{item}</li>)}</ul></section>
      <div className="flex flex-wrap gap-4 mb-12"><a className="rounded-full px-5 py-3 text-white text-sm font-medium" style={{ background: 'var(--accent)' }} href={`/${locale}/queens-park-savannah-distance`}>{c.distance}</a><a className="rounded-full px-5 py-3 text-sm font-medium" style={{ border: '1px solid var(--border-color)' }} href={SITE.mapsShareUrl} target="_blank" rel="noopener noreferrer">{c.map}</a></div>
      <nav className="grid sm:grid-cols-2 gap-4 mb-12" aria-label="Nearby attractions"><a className="rounded-xl p-5 hover:underline" style={{ border: '1px solid var(--border-color)', color: 'var(--accent)' }} href={`/${locale}/nearby/royal-botanic-gardens`}>Royal Botanic Gardens →</a><a className="rounded-xl p-5 hover:underline" style={{ border: '1px solid var(--border-color)', color: 'var(--accent)' }} href={`/${locale}/nearby/stollmeyers-castle`}>Stollmeyer’s Castle →</a></nav>
      <section className="text-sm border-t pt-6" style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}><h2 className="font-semibold mb-3">{c.sources}</h2><a className="underline" href="https://visittrinidad.tt/things-to-do/sites-attractions/queens-park-savannah/" target="_blank" rel="noopener noreferrer">Visit Trinidad — Queen’s Park Savannah</a><span className="mx-2">·</span><a className="underline" href="https://visittrinidad.tt/attractions/royal-botanical-gardens/" target="_blank" rel="noopener noreferrer">Visit Trinidad — Royal Botanic Gardens</a></section>
    </article>
  </main>;
}
