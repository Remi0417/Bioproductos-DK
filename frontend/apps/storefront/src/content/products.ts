import type { HomeMediaId } from "./media"

export type ProductCategory = "Hogar" | "Cuidado personal"

export type CatalogProduct = {
  id: string
  name: string
  category: ProductCategory
  description: string
  media?: HomeMediaId
  imageCaption?: string
  variants?: readonly string[]
  variantNote?: string
  accent: "citrus" | "eucalyptus" | "hair" | "bath" | "soap" | "conditioner"
}

// Catálogo editorial basado en la entrevista y las familias ya documentadas.
// Sin precios, stock, claims de desempeño ni disponibilidad no confirmada.
export const productCatalog: readonly CatalogProduct[] = [
  {
    id: "detergent-citrus",
    name: "Detergente para ropa · aroma cítrico",
    category: "Hogar",
    description:
      "Una alternativa para el lavado cotidiano de tu ropa, con aroma cítrico. Consulta sus detalles y disponibilidad antes de elegir.",
    media: "home-products-detergent",
    imageCaption: "Lavado de ropa · aroma cítrico",
    accent: "citrus",
  },
  {
    id: "detergent-eucalyptus",
    name: "Detergente para ropa · aroma a eucalipto",
    category: "Hogar",
    description:
      "Una opción para el lavado de ropa con aroma a eucalipto. Revisa sus características y disponibilidad antes de comprar.",
    media: "home-business",
    imageCaption: "Lavado de ropa · aroma a eucalipto",
    accent: "eucalyptus",
  },
  {
    id: "solid-shampoo",
    name: "Shampoo sólido",
    category: "Cuidado personal",
    description:
      "Shampoo en formato sólido para tu rutina capilar. Elige la opción descrita para cabello seco, graso o normal.",
    media: "home-products-shampoo",
    imageCaption: "Opción para cabello graso",
    variants: ["Cabello seco", "Cabello graso", "Cabello normal"],
    accent: "hair",
  },
  {
    id: "bath-salts",
    name: "Sales de baño",
    category: "Cuidado personal",
    description:
      "Tres variedades para acompañar tus momentos de cuidado personal. Consulta los nombres y detalles de cada opción antes de elegir.",
    media: "home-products-bath",
    imageCaption: "Colección de sales de baño",
    variants: ["Variedad 01", "Variedad 02", "Variedad 03"],
    variantNote: "Nombres y detalles de las variedades por confirmar.",
    accent: "bath",
  },
  {
    id: "soap",
    name: "Jabón de cuidado personal",
    category: "Cuidado personal",
    description:
      "Una alternativa de cuidado personal de la colección DK. Consulta su formato, composición e indicaciones antes de elegir.",
    accent: "soap",
  },
  {
    id: "conditioner",
    name: "Acondicionador capilar",
    category: "Cuidado personal",
    description:
      "Una opción de cuidado capilar para sumar a tu rutina. Consulta su formato, composición e indicaciones antes de elegir.",
    accent: "conditioner",
  },
]
