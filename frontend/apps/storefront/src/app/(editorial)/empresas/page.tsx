import type { Metadata } from "next"
import CompaniesPage from "@modules/dk/editorial/companies-page"

export const metadata: Metadata = {
  title: "Empresas",
  description:
    "Conoce las alternativas para que comercios, distribuidores y organizaciones conversen con BioProductos DK.",
}

export default function Page() {
  return <CompaniesPage />
}
