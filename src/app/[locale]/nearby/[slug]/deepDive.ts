type Lang = 'en' | 'es' | 'zh';
type Guide = { heritage: Record<Lang, string>; observation: Record<Lang, string>; stewardship: Record<Lang, string> };

// Site-specific interpretation: heritage listing is not automatically site management.
export const deepDive: Record<string, Guide> = {
  'hayes-court': {
    heritage: {
      en: 'The house takes its name from Bishop Thomas Hayes, who served the Anglican community in Trinidad from 1889. It belongs to the early-twentieth-century transformation of Maraval Road into a row of prominent homes and institutions. Its ecclesiastical association distinguishes it from the merchant-built residences alongside it.',
      es: 'La casa lleva el nombre del obispo Thomas Hayes, vinculado a la comunidad anglicana desde 1889. Forma parte de la transformación de Maraval Road a comienzos del siglo XX en una avenida de residencias e instituciones destacadas. Su historia eclesiástica la distingue de las mansiones comerciales vecinas.',
      zh: '宅邸以 1889 年起在特立尼达任职的圣公会主教 Thomas Hayes 命名。它属于 20 世纪初 Maraval Road 逐步形成重要宅邸与机构建筑群的时期。与邻近商人兴建的私宅不同，这里长期承载宗教职务相关的居住历史。',
    },
    observation: {
      en: 'Start with the wraparound veranda: notice how its shade mediates between the tropical climate and the interior rooms. Then look at the ironwork, columns and proportions of the frontage. A slightly angled view from the public pavement is more revealing than a straight-on photograph.',
      es: 'Empieza por la galería que rodea la casa: su sombra conecta el clima tropical con las estancias interiores. Después observa la forja, las columnas y las proporciones. Un encuadre oblicuo desde la acera pública revela mejor la profundidad de las galerías.',
      zh: '先观察环绕式游廊：遮阴空间让热带气候与室内生活之间形成过渡。再留意铁艺、柱列和正立面比例。从公共人行道略带斜角地观看，比正面直拍更容易呈现游廊的纵深。',
    },
    stewardship: {
      en: 'Hayes Court is associated with the Anglican bishopric and is recorded by the National Trust as privately owned with restricted access. The National Trust documents its heritage significance; that listing is not a public-entry permit or a claim that the Trust operates the residence.',
      es: 'Hayes Court está vinculado al episcopado anglicano. El National Trust registra propiedad privada y acceso restringido: su catalogación patrimonial no significa que gestione las visitas ni que la casa esté abierta al público.',
      zh: 'Hayes Court 与圣公会主教职务相关。国家信托将其列为私人产权、限制进入的遗产建筑；遗产登记代表保护与记录，并不代表国家信托直接运营宅邸或允许游客入内。',
    },
  },
  'ambards-house-roomor': {
    heritage: {
      en: 'Lucien F. Ambard commissioned the family home in 1904. The National Trust records that financial difficulties led to the loss of the house in 1919. Its later name, Roomor, preserves another chapter of the property’s changing ownership while the building remains a lived-in residence.',
      es: 'Lucien F. Ambard construyó su residencia familiar en 1904. Según el National Trust, las dificultades financieras lo llevaron a perderla en 1919. El nombre posterior Roomor refleja otra etapa de sus propietarios; sigue siendo una vivienda habitada.',
      zh: 'Lucien F. Ambard 于 1904 年兴建这座家宅。国家信托记载，他因财务困难于 1919 年失去房产。后来使用的 Roomor 名称折射产权变迁；如今建筑仍具私人居住属性。',
    },
    observation: {
      en: 'Contrast the elaborate roofline and ornamental iron with the more balanced French-inspired façade of nearby Mille Fleurs. Move only along permitted pavement to compare the changing silhouettes. The contrast between exuberant decoration and everyday private use is part of what makes Roomor distinctive.',
      es: 'Compara su cubierta elaborada y la forja ornamental con la fachada francesa más simétrica de Mille Fleurs. Recorre únicamente la acera pública para distinguir sus siluetas. La combinación de decoración exuberante y uso residencial privado define a Roomor.',
      zh: '将其复杂的屋顶线条、装饰铁艺与邻近 Mille Fleurs 较对称的法式立面比较。只在允许的公共步道移动角度，观察建筑轮廓如何变化。繁复装饰与持续的私人居住功能形成了 Roomor 的独特性。',
    },
    stewardship: {
      en: 'Roomor is a privately occupied home and not a walk-in museum. The National Trust records its heritage value and restricted entry; residents control access to the property. Visitors should remain outside gates and boundary walls.',
      es: 'Roomor es una vivienda privada habitada, no un museo de acceso libre. El National Trust documenta su valor patrimonial y las restricciones de entrada; los residentes controlan el acceso. Mantente fuera de verjas y límites.',
      zh: 'Roomor 是仍有人居住的私人宅邸，不是可自由入内的博物馆。国家信托记录其遗产价值及限制进入状态，实际出入由产权及居住方管理。游客应留在大门和围墙之外。',
    },
  },
  'archbishops-palace': {
    heritage: {
      en: 'Archbishop Patrick Vincent Flood commissioned the residence in 1903, and George Brown of the Trinidad Trading Company completed the building in 1904. The project coincided with the development of grand houses by wealthy families along the Savannah, but its enduring purpose was ecclesiastical.',
      es: 'El arzobispo Patrick Vincent Flood encargó la residencia en 1903; George Brown, de Trinidad Trading Company, terminó el edificio en 1904. Surgió en la misma época que las grandes casas del Savannah, pero con una función eclesiástica duradera.',
      zh: 'Patrick Vincent Flood 总主教于 1903 年委托兴建，Trinidad Trading Company 的 George Brown 于 1904 年完成建筑。当时 Savannah 西侧正形成豪宅群，但这座建筑从一开始就与教会及宗教职务相连。',
    },
    observation: {
      en: 'Look for the Indian Empire influence cited by the National Trust, especially in the roof profile and decorative rhythm. Observe how the setback and landscaped frontage create a ceremonial approach, rather than treating it as simply another mansion. Frame photographs from public space with the full façade in view.',
      es: 'Observa las influencias del Imperio británico en la India señaladas por el National Trust, especialmente en el perfil de la cubierta y el ritmo ornamental. El jardín de acceso da al conjunto un carácter ceremonial. Fotografía la fachada completa desde la vía pública.',
      zh: '留意国家信托指出的印度帝国建筑影响，尤其是屋顶轮廓与重复的装饰节奏。前院退界和景观入口带有礼宾性质，不宜只把它当作普通豪宅。拍摄时可从公共位置收入完整立面。',
    },
    stewardship: {
      en: 'The palace remains associated with the Roman Catholic Archdiocese of Port of Spain and its archbishop. National Trust recognition concerns its heritage significance; church use and visitor permissions are distinct matters. Do not assume access to the residence or grounds.',
      es: 'El palacio está vinculado a la Archidiócesis católica de Puerto España y su arzobispo. La inscripción patrimonial del National Trust no regula por sí misma las visitas. No presupongas entrada a la residencia ni al jardín.',
      zh: '大主教府与西班牙港罗马天主教总教区及总主教职务相关。国家信托的遗产登记与教会日常使用、访客许可是不同事项；不能假定庭院和室内对外开放。',
    },
  },
  'whitehall': {
    heritage: {
      en: 'Joseph Leon Agostini began the house known as Rosenweg in 1904. The Henderson family renamed it Whitehall, a reference to its pale coral stone. After government acquisition in 1954 it served different public functions, including a long period as the Office of the Prime Minister; its history therefore crosses private wealth and public administration.',
      es: 'Joseph Leon Agostini inició Rosenweg en 1904. La familia Henderson la llamó Whitehall por su piedra coralina clara. El Estado la adquirió en 1954 y, tras diversos usos públicos, fue durante muchos años sede de la Oficina del Primer Ministro. Su historia une riqueza privada y administración estatal.',
      zh: 'Joseph Leon Agostini 于 1904 年开建当时名为 Rosenweg 的宅邸。Henderson 家族后来以浅色珊瑚石外观将其改称 Whitehall。政府于 1954 年购入后，建筑承担过多种公共职能，并长期作为总理办公室，见证私人财富空间转变为国家行政场所。',
    },
    observation: {
      en: 'Read the light-coloured masonry first, then the Moorish and Mediterranean-inspired forms. Compare its formal government presence with the domestic scale of Roomor and the ecclesiastical character of the Archbishop’s Palace. Security boundaries may change: take the wider photograph only from permitted public ground.',
      es: 'Empieza por la piedra clara y después observa las formas de influencia morisca y mediterránea. Contrasta su presencia institucional con la escala doméstica de Roomor y la función religiosa del Palacio Arzobispal. Respeta siempre el perímetro de seguridad.',
      zh: '先看浅色石材，再观察摩尔与地中海风格影响下的建筑细部。将其庄重的政府建筑气质，与 Roomor 的私人住宅尺度、大主教府的宗教功能相对照。拍摄全景须留在允许的公共区域，注意安保边界。',
    },
    stewardship: {
      en: 'Whitehall is government-owned heritage property. The National Trust provides historical documentation and protection context, while actual access is governed by the responsible public authorities. Its former Prime Minister’s Office role does not establish regular walk-in tourism.',
      es: 'Whitehall es patrimonio de propiedad estatal. El National Trust documenta su historia y protección, mientras las autoridades públicas competentes determinan el acceso. Su uso anterior como oficina del Primer Ministro no implica visitas libres.',
      zh: 'Whitehall 属政府所有的历史公共财产。国家信托提供遗产记录与保护资料，实际进出则由相关公共管理机构决定。它曾是总理办公室，不代表现在设有常规自由参观。',
    },
  },
  'napa-performing-arts': {
    heritage: {
      en: 'Unlike the Magnificent Seven, NAPA is part of Port of Spain’s contemporary cultural infrastructure. The purpose-built venue gives performing arts an architectural presence near the Savannah and connects the area to dance, theatre, music and arts education.',
      es: 'A diferencia de los Siete Magníficos, NAPA forma parte de la infraestructura cultural contemporánea de Puerto España. El recinto dedicado a las artes escénicas conecta el Savannah con danza, teatro, música y enseñanza artística.',
      zh: '与七大历史宅邸不同，NAPA 属于西班牙港当代文化基础设施。专门设计的表演艺术场馆使音乐、戏剧、舞蹈和艺术教育在 Savannah 周边形成鲜明的现代城市地标。',
    },
    observation: {
      en: 'Walk far enough back to read the full sculptural roofline inspired by the Chaconia flower, then study how the curved volumes meet the public approach. A wide street-level view explains the architecture better than a cropped entrance detail; keep circulation routes clear when events are starting.',
      es: 'Aléjate lo suficiente para apreciar la cubierta escultórica inspirada en la flor chaconia y observa cómo sus curvas se encuentran con la entrada. Una vista amplia desde la calle explica mejor el edificio; mantén libres las circulaciones antes de un espectáculo.',
      zh: '从稍远的公共位置观看以 Chaconia 国花为灵感的雕塑式曲线屋顶，再观察弧形体量如何连接入口。街道层面的全景比只拍门廊更能说明设计特点；演出入场时请留出通行空间。',
    },
    stewardship: {
      en: 'NAPA is a national performing-arts institution and venue; the University of Trinidad and Tobago identifies an arts-education presence on the site. Performance admission, programme information and any campus access are determined by the relevant venue, university or event organisers, not by the nearby park.',
      es: 'NAPA es una institución y recinto nacional de artes escénicas; la Universidad de Trinidad y Tobago también identifica allí actividades formativas. Las entradas y el acceso dependen del recinto, la universidad o cada organizador, no del parque vecino.',
      zh: 'NAPA 是国家级表演艺术机构及场馆，特立尼达和多巴哥大学也在此开展艺术教育。演出门票、活动日程和校区出入分别由场馆、大学或主办单位安排，并不归邻近 Savannah 公园管理。',
    },
  },
};
