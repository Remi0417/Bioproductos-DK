import { api } from "./client"

// Formato que entrega Django en GET /api/tienda/productos/ (backend/tienda/views.py)
export type TiendaImagen = { url: string; alt: string }

export type TiendaVariante = {
  id: string
  titulo: string
  disponible: boolean
  precio: number
  moneda: string
  imagen: TiendaImagen | null
}

export type TiendaProducto = {
  handle: string
  titulo: string
  descripcion: string
  tipo: string
  disponible: boolean
  imagen: TiendaImagen | null
  imagenes: TiendaImagen[]
  variantes: TiendaVariante[]
}

export type LineaCheckout = { variante_id: string; cantidad: number }

// Mismo límite que el serializer de Django (backend/tienda/serializer.py).
export const MAX_UNIDADES_POR_LINEA = 10

export async function obtenerProductos(): Promise<TiendaProducto[]> {
  const respuesta = await api.get<TiendaProducto[]>("/api/tienda/productos/")
  return Array.isArray(respuesta.data) ? respuesta.data : []
}

/** Crea el carrito en Shopify (vía Django) y devuelve el enlace de pago y su id. */
export async function crearCheckout(
  lineas: LineaCheckout[],
): Promise<{ url: string; carritoId: string | null }> {
  const respuesta = await api.post<{
    checkout_url?: unknown
    carrito_id?: unknown
  }>("/api/tienda/checkout/", { lineas })
  const url = respuesta.data.checkout_url
  if (typeof url !== "string" || !url.startsWith("https://")) {
    throw new Error("Shopify no devolvió un enlace de pago válido.")
  }
  const carritoId = respuesta.data.carrito_id
  return { url, carritoId: typeof carritoId === "string" ? carritoId : null }
}

/** ¿El carrito enviado a Shopify ya se convirtió en pedido? */
export async function carritoCompletado(carritoId: string): Promise<boolean> {
  const respuesta = await api.get<{ completado?: unknown }>(
    "/api/tienda/carrito/",
    { params: { id: carritoId } },
  )
  return respuesta.data.completado === true
}
