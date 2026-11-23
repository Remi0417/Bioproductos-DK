import type { Metadata } from "next"
import WhereToBuyPage from "@modules/dk/editorial/where-to-buy-page"

export const metadata: Metadata = {
  title: "Dónde comprar",
  description:
    "Encuentra BioProductos DK en Papa Juan Pablo I 2104, Padre Hurtado, y consulta cómo llegar en Google Maps.",
}

export default function Page() {
  return <WhereToBuyPage />
}
