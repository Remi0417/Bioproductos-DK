import EditorialHome from "@modules/dk/editorial/home"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: { absolute: "BioProductos DK | Ciencia que transforma" },
  description:
    "Ciencia aplicada, materiales orgánicos y una nueva mirada sobre el cuidado. Explora la propuesta BioProductos DK, sus familias de productos y su investigación.",
}

export default function HomePage() {
  return <EditorialHome />
}
