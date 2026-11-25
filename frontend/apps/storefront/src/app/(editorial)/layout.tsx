import type { Metadata } from "next"
import type { ReactNode } from "react"
import { SiteFooter, SiteHeader } from "@modules/dk/editorial/site-layout"
import TiendaOrderWatcher from "@modules/dk/editorial/tienda-order-watcher"
import "@fontsource-variable/manrope"
import "./editorial.css"

export const metadata: Metadata = {
  title: {
    default: "BioProductos DK | Ciencia, innovación y sostenibilidad",
    template: "%s | BioProductos DK",
  },
  description:
    "Investigación, desarrollo y revalorización de materiales orgánicos para explorar nuevas posibilidades de limpieza e higiene. Propuesta independiente de diseño.",
  openGraph: {
    title: "BioProductos DK | Ciencia, innovación y sostenibilidad",
    description:
      "La ciencia detrás de una nueva forma de cuidar. Propuesta independiente en evaluación.",
    locale: "es_CL",
    type: "website",
    images: [],
  },
  twitter: { card: "summary", images: [] },
  // No production canonical or inherited starter artwork on editorial pages.
  alternates: { canonical: null },
}

export default function EditorialLayout({ children }: { children: ReactNode }) {
  return (
    <div className="dk2-site">
      <SiteHeader />
      {children}
      <SiteFooter />
      {/* Vacía el carrito al volver de Shopify si la compra se completó. */}
      <TiendaOrderWatcher />
    </div>
  )
}
