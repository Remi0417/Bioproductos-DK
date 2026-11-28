export type MediaDefinition = {
  original: string
  slug: string
  widths: readonly number[]
  width: number
  height: number
  alt: string
  position: string
}

// Only owner-supplied photographs. No remote sources or invented lab imagery.
// Responsive WebP derivatives: scripts/prepare-home-photos.mjs.
export const homeMedia = {
  "home-hero": {
    original: "foto principal.JPG",
    slug: "coleccion",
    widths: [640, 1280, 2240],
    width: 4000,
    height: 1848,
    alt: "Productos de BioProductos DK: detergentes, sales de baño y cosmética sólida, sobre una mesa con flores y elementos de madera.",
    position: "58% 50%",
  },
  "home-products-detergent": {
    original: "detergente modelo.JPG",
    slug: "detergente",
    widths: [480, 960, 1600],
    width: 3024,
    height: 4032,
    alt: "Botella de detergente líquido DK aroma cítrico, acompañada de flores violetas sobre un fondo claro.",
    position: "50% 47%",
  },
  "home-products-shampoo": {
    original: "jabon modelo.JPG",
    slug: "champu",
    widths: [480, 960, 1600],
    width: 3024,
    height: 3024,
    alt: "Champú sólido junto a su envase metálico, cuya etiqueta indica cabello graso, sobre una rodaja de madera.",
    position: "50% 50%",
  },
  "home-products-bath": {
    original: "sales de bañoo.JPG",
    slug: "sales",
    widths: [480, 960, 1600],
    width: 3024,
    height: 4032,
    alt: "Tres bolsas kraft de sales de baño de DK, con sales y pétalos en primer plano.",
    position: "50% 50%",
  },
  "home-business": {
    original: "detergente.JPG",
    slug: "botellas",
    widths: [480, 960, 1600],
    width: 3024,
    height: 4032,
    alt: "Botellas de detergente DK ordenadas en una repisa, con etiquetas visibles de aroma eucaliptus.",
    position: "50% 50%",
  },
  "home-products-gift": {
    original: "pack de regalo.JPG",
    slug: "pack-regalo",
    widths: [480, 960, 1600],
    width: 3456,
    height: 5184,
    alt: "Pack de regalo de DK: caja con dos detergentes líquidos concentrados, latas de champú sólido BIO-Renua y flores, sobre un fondo claro.",
    position: "50% 55%",
  },
  "home-founders": {
    original: "Dueñas dk.JPG",
    slug: "fundadoras",
    widths: [480, 960, 1440],
    width: 1848,
    height: 4000,
    alt: "Las dos fundadoras de BioProductos DK sonríen con chaquetas verdes frente a los pendones de la marca.",
    position: "50% 63%",
  },
  // Foto horizontal para el carrusel del inicio (se ve completa en el marco).
  "home-founders-wide": {
    original: "fundadoras pendones.JPG",
    slug: "fundadoras-pendones",
    widths: [640, 1280, 2240],
    width: 5184,
    height: 3456,
    alt: "Las dos fundadoras de BioProductos DK sonríen abrazadas, con chaquetas verdes, frente a los pendones de la marca.",
    position: "50% 50%",
  },
} as const satisfies Record<string, MediaDefinition>

export type HomeMediaId = keyof typeof homeMedia
