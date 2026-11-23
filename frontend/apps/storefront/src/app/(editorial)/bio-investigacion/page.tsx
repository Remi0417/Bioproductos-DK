import type { Metadata } from "next"
import BioInvestigacionPage from "@modules/dk/editorial/bio-investigacion-page"

export const metadata: Metadata = {
  title: "Bio Investigación",
  description:
    "Conoce cómo BioProductos DK conecta investigación, nanotecnología y revalorización de materiales orgánicos.",
}

export default function Page() {
  return <BioInvestigacionPage />
}
