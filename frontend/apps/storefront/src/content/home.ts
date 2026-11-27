import type { HomeMediaId } from "./media"
import type { SiteLink } from "./site"

type EditorialBlock = {
  eyebrow: string
  title: string
  body: string
  action: SiteLink
}
export type ProcessStep = { title: string; shortTitle: string; body: string }
type DnaPillar = {
  id: "bio" | "nano" | "innovation" | "circular"
  title: string
  focus: string
  lead: string
  body: string
}
type ProductFamily = {
  id: string
  title: string
  category: string
  body: string
  media?: HomeMediaId
  mediaNote?: string
  action: SiteLink
}
export type HeroSlide = {
  id: "science" | "products" | "purpose"
  eyebrow: string
  title: string
  accent: string
  body: string
  media: HomeMediaId
  photoLabel: string
  action: SiteLink
  secondaryAction?: SiteLink
}
type HomeContent = {
  hero: { slides: HeroSlide[] }
  introduction: { title: string; body: string; action: SiteLink }
  pillars: DnaPillar[]
  products: {
    eyebrow: string
    tagline: string
    families: ProductFamily[]
  }
  process: EditorialBlock & { note: string; steps: ProcessStep[] }
  research: EditorialBlock & { focusAreas: string[] }
  researchTopics: { title: string; body: string }[]
  brands: EditorialBlock & { lines: { title: string; body: string }[] }
  impact: Omit<EditorialBlock, "body">
  founders: EditorialBlock
  business: EditorialBlock & { secondaryAction: SiteLink }
  businessPaths: {
    title: string
    eyebrow: string
    body: string
    action: SiteLink
  }[]
}

// Original editorial copy. Source/classification and exclusions: docs/DECISIONES_HOME.md.
export const homeContent: HomeContent = {
  hero: {
    slides: [
      {
        id: "science",
        eyebrow: "BioProductos DK · Ciencia aplicada",
        title: "Todo nace",
        accent: "de la ciencia.",
        body: "Investigamos materiales orgánicos para desarrollar productos de limpieza y cuidado personal.",
        media: "home-hero",
        photoLabel: "Productos BioProductos DK",
        action: { label: "Donaciones", href: "#donaciones-home" },
        secondaryAction: {
          label: "Conocer la ciencia",
          href: "/bio-investigacion",
        },
      },
      {
        id: "products",
        eyebrow: "Del laboratorio a tu día",
        title: "Cuidado que",
        accent: "toma forma.",
        body: "Detergentes, champús sólidos y sales de baño. Conoce la colección de DK.",
        media: "home-products-shampoo",
        photoLabel: "Cuidado personal · Champú sólido",
        action: { label: "Explorar productos", href: "/productos" },
      },
      {
        id: "purpose",
        eyebrow: "Nuestro propósito",
        title: "Mirar el origen.",
        accent: "Imaginar más.",
        body: "Somos un equipo que investiga nuevas utilidades para materiales orgánicos.",
        media: "home-founders",
        photoLabel: "Las fundadoras de BioProductos DK",
        action: { label: "Conoce Bio Impacto", href: "/bio-impacto" },
        secondaryAction: { label: "Conócenos", href: "/nosotras" },
      },
    ],
  },
  introduction: {
    title: "Tus residuos pueden tener un nuevo comienzo.",
    body: "Un pequeño aporte. Una nueva posibilidad.",
    action: { label: "Dona aquí", href: "/donaciones" },
  },
  pillars: [
    {
      id: "bio",
      title: "Biotecnología",
      focus: "El origen",
      lead: "La naturaleza abre posibilidades.",
      body: "Exploramos componentes de cáscaras y borra de café.",
    },
    {
      id: "nano",
      title: "Nanotecnología",
      focus: "La escala",
      lead: "Ciencia a pequeña escala.",
      body: "Estudiamos nanoemulsiones para incorporar componentes de interés en formulaciones.",
    },
    {
      id: "innovation",
      title: "Innovación",
      focus: "Las ideas",
      lead: "Ideas que toman forma.",
      body: "Unimos investigación y ensayos para desarrollar productos cotidianos.",
    },
    {
      id: "circular",
      title: "Sustentabilidad",
      focus: "El ciclo",
      lead: "Un nuevo valor para el origen.",
      body: "Buscamos revalorizar residuos orgánicos mediante la ciencia.",
    },
  ],
  products: {
    eyebrow: "Nuestra colección",
    tagline: "Para tu hogar. Para ti.",
    families: [
      {
        id: "detergents",
        title: "Detergente aroma cítrico",
        category: "Cuidado del hogar",
        body: "Una alternativa para la limpieza y el cuidado cotidiano de tu ropa.",
        media: "home-products-detergent",
        action: { label: "Descubrir detergentes", href: "/productos" },
      },
      {
        id: "shampoo",
        title: "Champús sólidos",
        category: "Cuidado personal",
        body: "Para cabello seco, graso y normal. Tu rutina, en formato sólido.",
        media: "home-products-shampoo",
        action: { label: "Descubrir champús", href: "/productos" },
      },
      {
        id: "bath-salts",
        title: "Sales de baño",
        category: "Cuidado personal",
        body: "Un espacio en tu día para el cuidado personal.",
        media: "home-products-bath",
        action: { label: "Descubrir sales de baño", href: "/productos" },
      },
      {
        id: "detergent-eucalyptus",
        title: "Detergente aroma eucaliptus",
        category: "Cuidado del hogar",
        body: "Una segunda alternativa aromática para el lavado de ropa.",
        media: "home-business",
        action: { label: "Descubrir detergentes", href: "/productos" },
      },
      {
        id: "gift-pack",
        title: "Pack de regalo",
        category: "Regalos",
        body: "Detergentes y champú sólido en una caja lista para regalar.",
        media: "home-products-gift",
        action: { label: "Descubrir el pack", href: "/productos" },
      },
      {
        id: "conditioner",
        title: "Acondicionador",
        category: "Cuidado personal",
        body: "Un complemento para tu rutina capilar.",
        // Sin foto propia todavía: se muestra la tarjeta "Fotografía por incorporar".
        action: { label: "Descubrir acondicionador", href: "/productos" },
      },
    ],
  },
  process: {
    eyebrow: "La ciencia detrás del producto",
    title: "Antes de ser un producto, fue una pregunta.",
    body: "¿Qué posibilidades guarda lo que descartamos? Investigamos materiales orgánicos y exploramos ingredientes y formulaciones. El vínculo entre economía circular, nanotecnología y vida cotidiana empieza aquí.",
    note: "Recorrido esquemático basado en la visita. Las etapas y su orden dependen del material y del producto; no constituyen un protocolo de fabricación.",
    action: { label: "Descubre nuestros procesos", href: "/bio-investigacion" },
    steps: [
      {
        shortTitle: "Seleccionar",
        title: "Selección y separación",
        body: "El punto de partida es identificar los materiales y separarlos según su origen. Cáscaras, hojas y borra de café son algunos ejemplos mencionados durante la visita.",
      },
      {
        shortTitle: "Preparar",
        title: "Limpieza y acondicionamiento",
        body: "Los materiales requieren preparación antes de investigarlos. La limpieza y el acondicionamiento se definen según las características de cada residuo.",
      },
      {
        shortTitle: "Transformar",
        title: "Deshidratación y reducción de tamaño",
        body: "Cuando corresponde, se retira humedad y se reduce el tamaño de los materiales. El tratamiento varía según el residuo y el desarrollo previsto.",
      },
      {
        shortTitle: "Investigar",
        title: "Ingredientes y formulaciones",
        body: "El laboratorio estudia componentes y evalúa alternativas de formulación. Los ensayos y las técnicas utilizadas responden a cada producto y a sus objetivos de desarrollo.",
      },
      {
        shortTitle: "Controlar",
        title: "Control y preparación del producto",
        body: "El trabajo incluye controles y registros de elaboración. La preparación del producto responde a sus requisitos particulares y a la evaluación del equipo.",
      },
    ],
  },
  research: {
    eyebrow: "Bio Investigación",
    title: "El origen es la ciencia.",
    body: "Investigamos materiales orgánicos y exploramos nuevas formulaciones para conectar ciencia, circularidad y cuidado. En el laboratorio estudiamos componentes y ensayamos nuevas posibilidades de desarrollo.",
    focusAreas: ["I+D", "Circularidad", "Nuevas formulaciones"],
    action: { label: "Conoce Bio Investigación", href: "/bio-investigacion" },
  },
  researchTopics: [
    {
      title: "I+D",
      body: "Ingredientes, formulaciones y desarrollo de productos.",
    },
    {
      title: "Colaboración científica",
      body: "Un espacio para conectar conocimientos y explorar proyectos.",
    },
    {
      title: "Proyectos y licitaciones",
      body: "Área prevista para antecedentes documentados y autorizados.",
    },
    {
      title: "Marcas y patentes",
      body: "Sus antecedentes se incorporarán solo con respaldo verificado.",
    },
  ],
  brands: {
    eyebrow: "Una investigación, distintas aplicaciones",
    title: "Soluciones que comparten un origen científico.",
    body: "BioProductos DK reúne líneas de desarrollo que llevan la investigación hacia distintos ámbitos del cuidado. Su identidad parte de una misma idea: explorar nuevas posibilidades en los materiales orgánicos.",
    action: { label: "Explorar nuestras líneas", href: "/productos" },
    lines: [
      {
        title: "Cuidado del hogar",
        body: "Desarrollos para la limpieza y el cuidado cotidiano de los espacios.",
      },
      {
        title: "Cuidado personal",
        body: "Investigación aplicada a productos de higiene y cosmética sólida.",
      },
    ],
  },
  impact: {
    eyebrow: "Bio Impacto",
    title: "Nada cambia si lo miramos siempre igual.",
    action: { label: "Conoce Bio Impacto", href: "/bio-impacto" },
  },
  founders: {
    eyebrow: "Las personas detrás de la ciencia",
    title: "Dos miradas. Una misma inquietud.",
    body: "Dos fundadoras impulsan BioProductos DK desde la investigación y el emprendimiento. Su interés por acercar la ciencia a la vida cotidiana da sentido a cada nueva pregunta y a cada desarrollo.",
    action: { label: "Conoce a las fundadoras", href: "/nosotras" },
  },
  business: {
    eyebrow: "Conectemos posibilidades",
    title: "Las buenas ideas crecen cuando conectamos.",
    body: "Las instituciones y los distribuidores tienen necesidades propias. Las posibilidades de colaboración y las condiciones comerciales se conversan empresa a empresa, con atención a cada proyecto.",
    action: { label: "Soluciones para empresas", href: "/empresas" },
    secondaryAction: {
      label: "Dónde encontrar nuestros productos",
      href: "/donde-comprar",
    },
  },
  businessPaths: [
    {
      eyebrow: "Empresa",
      title: "Soluciones con contexto.",
      body: "Conversemos sobre las necesidades de tu institución o empresa y las posibilidades de trabajo conjunto.",
      action: { label: "Explorar posibilidades", href: "/empresas" },
    },
    {
      eyebrow: "Distribución",
      title: "Nuevas formas de llegar.",
      body: "Las relaciones con distribuidores y sus condiciones comerciales se conversan de manera individual.",
      action: { label: "Conversemos de distribución", href: "/contacto" },
    },
    {
      eyebrow: "Puntos de venta",
      title: "Más cerca de lo cotidiano.",
      body: "Un espacio para encontrar los establecimientos que venden DK, una vez confirmados sus datos.",
      action: { label: "Dónde comprar", href: "/donde-comprar" },
    },
  ],
}
