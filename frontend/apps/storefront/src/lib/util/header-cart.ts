import type { HttpTypes } from "@medusajs/types"

export type HeaderCartSummary = {
  status: "preview" | "ready" | "unavailable" | "loading"
  count: number | null
  items: { id: string; title: string; quantity: number; price: string | null }[]
  subtotal: string | null
  cartHref: string | null
}

export const emptyHeaderCart = (
  status: HeaderCartSummary["status"],
): HeaderCartSummary => ({
  status,
  count: status === "preview" || status === "ready" ? 0 : null,
  items: [],
  subtotal: null,
  cartHref: null,
})

type CartReader = {
  preview: boolean
  getCartId: () => Promise<string | undefined>
  retrieveCart: (id: string) => Promise<HttpTypes.StoreCart | null>
  defaultCountry?: string
}

// Read the native Medusa cart only. Never create a second cart or a demo order.
export async function loadHeaderCartSummary({
  preview,
  getCartId,
  retrieveCart,
  defaultCountry,
}: CartReader): Promise<HeaderCartSummary> {
  if (preview) return emptyHeaderCart("preview")
  try {
    const id = await getCartId()
    if (!id) return emptyHeaderCart("ready")
    const cart = await retrieveCart(id)
    if (!cart) return emptyHeaderCart("unavailable")

    const money = (amount: number | undefined) =>
      typeof amount === "number" && Number.isFinite(amount)
        ? new Intl.NumberFormat("es-CL", {
            style: "currency",
            currency: cart.currency_code,
          }).format(amount)
        : null
    const items = (cart.items || []).map((item) => {
      if (!Number.isSafeInteger(item.quantity) || item.quantity < 1)
        throw new Error("Invalid cart quantity")
      return {
        id: item.id,
        title: item.product_title || item.title,
        quantity: item.quantity,
        price: money(item.total),
      }
    })
    const country = (
      cart.shipping_address?.country_code ||
      cart.region?.countries?.[0]?.iso_2 ||
      defaultCountry ||
      ""
    ).toLowerCase()
    return {
      status: "ready",
      count: items.reduce((sum, item) => sum + item.quantity, 0),
      items,
      subtotal: money(cart.subtotal),
      cartHref: /^[a-z]{2}$/.test(country) ? `/${country}/cart` : null,
    }
  } catch {
    // A failed read must not masquerade as an empty cart.
    return emptyHeaderCart("unavailable")
  }
}
