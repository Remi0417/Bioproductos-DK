/** Never log request objects, headers, URLs, tokens or server payloads. */
export default function medusaError(error: unknown): never {
  const status = (error as { response?: { status?: number } } | null)?.response
    ?.status
  if (status === 401)
    throw new Error("Tu sesión expiró. Inicia sesión nuevamente.")
  if (status === 403)
    throw new Error("No tienes permiso para realizar esta acción.")
  if (status === 404) throw new Error("No encontramos el recurso solicitado.")
  if (status === 409)
    throw new Error(
      "La disponibilidad cambió. Revisa tu carrito e inténtalo nuevamente.",
    )
  throw new Error(
    "No pudimos completar la solicitud. Revisa la conexión con el servidor local e inténtalo nuevamente.",
  )
}
