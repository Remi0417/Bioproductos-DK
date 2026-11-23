import type { Metadata } from "next"
import DkHome from "@modules/dk/home"
import "@fontsource-variable/manrope"
import "./demo.css"

export const metadata: Metadata = {
  title: "Ciencia para lo cotidiano",
  description:
    "Vista previa de la identidad BioProductos DK: cuidado del hogar, cuidado personal e investigación. Referencias e ilustraciones de prueba.",
}

export default function DemoPage() {
  return <DkHome />
}
