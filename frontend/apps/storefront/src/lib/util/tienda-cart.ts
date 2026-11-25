/**
 * Carrito conectado a Shopify (modo tienda).
 * Se guarda aparte del carrito de simulación de Byron (demo-cart) para no
 * mezclar productos locales con productos de Shopify.
 */
export const TIENDA_CART_STORAGE_KEY = "dk-tienda-cart-v1"

/** Resumen listo para mostrar en el carrito del encabezado (header-cart-popover). */
export const TIENDA_SUMMARY_STORAGE_KEY = "dk-tienda-cart-resumen-v1"

/** Evento que avisa a /productos que la compra en Shopify se completó. */
export const TIENDA_ORDER_COMPLETED_EVENT = "dk-tienda-compra-completada"

/** Id del último carrito enviado a Shopify, para saber al volver si se compró. */
export const TIENDA_PENDING_CHECKOUT_KEY = "dk-tienda-checkout-pendiente-v1"

// Shopify también "olvida" un carrito sin pagar a los ~10 días; para no confundir
// eso con una compra, solo se revisan carritos enviados hace menos de 7 días.
const PENDING_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000

export function savePendingCheckout(carritoId: string) {
  try {
    window.localStorage.setItem(
      TIENDA_PENDING_CHECKOUT_KEY,
      JSON.stringify({ id: carritoId, fecha: Date.now() }),
    )
  } catch {
    // Sin almacenamiento: el carrito no se vaciará solo, pero la compra funciona.
  }
}

export function readPendingCheckout(): string | null {
  try {
    const serialized = window.localStorage.getItem(TIENDA_PENDING_CHECKOUT_KEY)
    if (!serialized) return null
    const value = JSON.parse(serialized) as { id?: unknown; fecha?: unknown }
    const fresh =
      typeof value.fecha === "number" &&
      Date.now() - value.fecha < PENDING_MAX_AGE_MS
    if (typeof value.id !== "string" || !fresh) {
      clearPendingCheckout()
      return null
    }
    return value.id
  } catch {
    clearPendingCheckout()
    return null
  }
}

export function clearPendingCheckout() {
  try {
    window.localStorage.removeItem(TIENDA_PENDING_CHECKOUT_KEY)
  } catch {
    // Nada que limpiar.
  }
}

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
