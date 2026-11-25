/**
 * Carrito conectado a Shopify (modo tienda).
 * Se guarda aparte del carrito de simulación de Byron (demo-cart) para no
 * mezclar productos locales con productos de Shopify.
 */
export const TIENDA_CART_STORAGE_KEY = "dk-tienda-cart-v1"

/** Resumen listo para mostrar en el carrito del encabezado (header-cart-popover). */
export const TIENDA_SUMMARY_STORAGE_KEY = "dk-tienda-cart-resumen-v1"

export type TiendaCartSummaryItem = {
  id: string
  title: string
  quantity: number
  total: number
}

export function writeTiendaSummary(items: TiendaCartSummaryItem[]) {
  try {
    window.localStorage.setItem(
      TIENDA_SUMMARY_STORAGE_KEY,
      JSON.stringify({ items }),
    )
  } catch {
    // Sin almacenamiento disponible: el encabezado simplemente no muestra el resumen.
  }
}

export function clearTiendaSummary() {
  try {
    window.localStorage.removeItem(TIENDA_SUMMARY_STORAGE_KEY)
  } catch {
    // Nada que limpiar.
  }
}

/** Lee el resumen guardado; devuelve null si no existe o está dañado. */
export function readTiendaSummary(
  serialized: string | null,
): TiendaCartSummaryItem[] | null {
  if (!serialized) return null
  try {
    const value: unknown = JSON.parse(serialized)
    if (!value || typeof value !== "object") return null
    const items = (value as { items?: unknown }).items
    if (!Array.isArray(items)) return null
    return items.filter(
      (item): item is TiendaCartSummaryItem =>
        Boolean(item) &&
        typeof item.id === "string" &&
        typeof item.title === "string" &&
        Number.isSafeInteger(item.quantity) &&
        item.quantity > 0 &&
        Number.isSafeInteger(item.total) &&
        item.total >= 0,
    )
  } catch {
    return null
  }
}
