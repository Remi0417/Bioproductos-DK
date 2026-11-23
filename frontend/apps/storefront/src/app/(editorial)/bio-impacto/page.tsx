import type { Metadata } from "next"
import BioImpactoPage from "@modules/dk/editorial/bio-impacto-page"

export const metadata: Metadata = {
  title: "Bio Impacto | Economía circular",
  description:
    "Conoce el enfoque de BioProductos DK para investigar materiales orgánicos, revalorizar recursos y explorar nuevas posibilidades desde la economía circular.",
}

export default function Page() {
  return <BioImpactoPage />
}
