import { pendingPages } from "../../../content/site"
import { ActionLink } from "./primitives"

export default function PendingPage({
  path,
}: {
  path: keyof typeof pendingPages
}) {
  const page = pendingPages[path]
  return (
    <main id="contenido" tabIndex={-1} className="dk2-container dk2-pending">
      <p className="dk2-eyebrow">{page.label}</p>
      <h1>Esta sección se está preparando.</h1>
      <p>{page.description}</p>
      <ActionLink label="Volver al inicio" href="/" variant="primary" />
    </main>
  )
}
