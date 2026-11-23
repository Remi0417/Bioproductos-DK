import type { Metadata } from "next"
import ProductsPage from "@modules/dk/editorial/products-page"

export const metadata: Metadata = {
  title: "Productos",
  description:
    "Explora el catálogo de limpieza y cuidado personal de BioProductos DK.",
}

export default function Page() {
  return <ProductsPage />
}
