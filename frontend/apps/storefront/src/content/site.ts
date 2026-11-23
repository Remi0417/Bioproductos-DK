export type SiteLink = { label: string; href: string }

// Official profile URLs provided by the owner on 2026-10-18.
export const socialProfiles = [
  {
    id: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/bioproductosdk/",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/bioproductos-dk/?originalSubdomain=cl",
  },
  {
    id: "facebook",
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=100086262922142",
  },
] satisfies {
  id: "instagram" | "linkedin" | "facebook"
  label: string
  href: string | null
}[]

// Editorial messages inspired by the interview; no certifications or impact claims.
export const brandMessages = [
  "Hay ciencia detrás de cada producto.",
  "Una nueva mirada para lo cotidiano.",
  "Investigar. Crear. Cuidar.",
  "Más posibilidades para los materiales orgánicos.",
  "Conectemos ideas que puedan transformar.",
] as const

export const primaryNavigation: SiteLink[] = [
  { label: "Inicio", href: "/" },
  { label: "Bio Investigación", href: "/bio-investigacion" },
  { label: "Productos", href: "/productos" },
  { label: "Empresas", href: "/empresas" },
  { label: "Nosotras", href: "/nosotras" },
  { label: "Contacto", href: "/contacto" },
]

export const complementaryNavigation: SiteLink[] = [
  { label: "Bio Impacto", href: "/bio-impacto" },
  { label: "Dónde comprar", href: "/donde-comprar" },
  { label: "Información legal", href: "/informacion-legal" },
]

// Public institutional data read on the official Bio Impacto page, 2026-10-18.
// No private accounts or customer data. Do not infer unverified social URLs.
export const publicContact = {
  email: "biocontacto@bioproductosdk.com",
  location: "Santiago, Chile",
  source: "https://bioproductosdk.com/bio-impacto/",
}

// Exact editorial paths only. Never allow commerce, Admin or API paths here.
export const editorialPaths = [
  ...primaryNavigation,
  ...complementaryNavigation,
  { label: "Dona tus residuos", href: "/donaciones" },
].map(({ href }) => href)

export const pendingPages = {
  "/informacion-legal": {
    label: "Información legal",
    description:
      "Privacidad, términos de venta y gestión de reclamos están pendientes de redacción, revisión y aprobación. Esta página no constituye una política vigente.",
  },
} as const
