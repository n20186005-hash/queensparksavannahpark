import { useLocale } from 'next-intl';

const places = [
  { slug: 'royal-botanic-gardens', en: ['Royal Botanic Gardens', 'Historic tropical gardens'], es: ['Jardín Botánico Real', 'Jardines tropicales históricos'], zh: ['皇家植物园', '1818 年建立的热带植物园'] },
  { slug: 'stollmeyers-castle', en: ['Stollmeyer’s Castle', 'Castle-inspired historic mansion'], es: ['Castillo de Stollmeyer', 'Mansión histórica de estilo castillo'], zh: ['斯托尔迈耶城堡', '城堡式历史宅邸'] },
  { slug: 'mille-fleurs', en: ['Mille Fleurs', 'French Provincial mansion'], es: ['Mille Fleurs', 'Mansión de influencia francesa'], zh: ['Mille Fleurs', '法式历史宅邸'] },
  { slug: 'queens-royal-college', en: ['Queen’s Royal College', 'Red façade and clock tower'], es: ['Queen’s Royal College', 'Fachada roja y torre del reloj'], zh: ['女王皇家学院', '红色立面与钟楼'] },
  { slug: 'emperor-valley-zoo', en: ['Emperor Valley Zoo', 'Wildlife and valley pathways'], es: ['Zoológico Emperor Valley', 'Fauna y senderos del valle'], zh: ['皇帝谷动物园', '热带谷地与动物展示'] },
  { slug: 'presidents-house', en: ['President’s House', 'Historic official residence'], es: ['Casa del Presidente', 'Residencia oficial histórica'], zh: ['总统府', '历史国家元首官邸'] },
  { slug: 'hayes-court', en: ['Hayes Court', 'Verandas and cast-iron details'], es: ['Hayes Court', 'Galerías y hierro fundido'], zh: ['海斯府邸', '环廊与铸铁装饰'] },
  { slug: 'ambards-house-roomor', en: ['Ambard’s House (Roomor)', 'French Second Empire architecture'], es: ['Casa de Ambard (Roomor)', 'Arquitectura del Segundo Imperio'], zh: ['安巴德宅邸 Roomor', '法兰西第二帝国风格'] },
  { slug: 'archbishops-palace', en: ['Archbishop’s Palace', 'Ecclesiastical architecture'], es: ['Palacio Arzobispal', 'Arquitectura eclesiástica'], zh: ['大主教府', '宗教官邸建筑'] },
  { slug: 'whitehall', en: ['Whitehall (Rosenweg)', 'Government and architectural heritage'], es: ['Whitehall (Rosenweg)', 'Patrimonio político y arquitectónico'], zh: ['白厅 Whitehall', '政治与建筑遗产'] },
  { slug: 'napa-performing-arts', en: ['Performing Arts Academy (NAPA)', 'Modern Chaconia-inspired building'], es: ['Academia de Artes Escénicas NAPA', 'Edificio moderno inspirado en la chaconia'], zh: ['国家表演艺术学院 NAPA', 'Chaconia 花形现代建筑'] },
] as const;

export default function NearbyExplorer() {
  const locale = useLocale() as 'en' | 'es' | 'zh';
  const text = {
    en: { title: 'Explore 11 nearby attractions', intro: 'Discover individual visitor guides for the historic Magnificent Seven, the Botanic Gardens, zoo, President’s House and the performing-arts district.', all: 'Walking route and visitor planning' },
    es: { title: 'Explora 11 lugares cercanos', intro: 'Guías individuales de los Siete Magníficos, el Jardín Botánico, zoológico, Casa del Presidente y espacios artísticos.', all: 'Ruta a pie y consejos para la visita' },
    zh: { title: '探索 11 个周边景点', intro: '独立游览指南涵盖七大历史建筑、皇家植物园、动物园、总统府和现代演艺地标。', all: '查看步行路线与游览建议' },
  }[locale];

  return (
    <section id="nearby" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>{text.title}</h2>
        <p className="max-w-3xl mb-8 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{text.intro}</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {places.map(place => <a key={place.slug} href={`/${locale}/nearby/${place.slug}`} className="block rounded-xl p-5 hover:underline transition-colors" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}>
            <h3 className="font-display font-semibold text-lg mb-2" style={{ color: 'var(--text-primary)' }}>{place[locale][0]}</h3>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{place[locale][1]}</p>
          </a>)}
        </div>
        <a href={`/${locale}/things-to-do`} className="inline-flex rounded-full px-5 py-3 mt-8 text-white text-sm font-semibold hover:underline" style={{ background: 'var(--accent)' }}>{text.all}</a>
      </div>
    </section>
  );
}
