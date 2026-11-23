import type { Metadata } from "next"
import PendingPage from "@modules/dk/editorial/pending-page"

export const metadata: Metadata = {
  title: "Información legal",
  description:
    "Sección en preparación de la propuesta independiente BioProductos DK.",
}

export default function Page() {
  return <PendingPage path="/informacion-legal" />
}
