import type { Metadata } from "next"
import ContactPage from "@modules/dk/editorial/contact-page"

export const metadata: Metadata = {
  title: "Contacto · Conversemos con BioProductos DK",
  description:
    "Escribe, llama o coordina una conversación con BioProductos DK sobre productos, investigación y colaboración.",
}

export default function Page() {
  return <ContactPage />
}
