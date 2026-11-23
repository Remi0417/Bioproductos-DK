import type { Metadata } from "next"
import NosotrasPage from "@modules/dk/editorial/nosotras-page"

export const metadata: Metadata = {
  title: "Nosotras · Una historia hecha de ciencia y cuidado",
  description:
    "Conoce la historia de BioProductos DK: una iniciativa creada por dos mujeres que une investigación, revalorización de materiales orgánicos y cuidado cotidiano.",
}

export default function Page() {
  return <NosotrasPage />
}
