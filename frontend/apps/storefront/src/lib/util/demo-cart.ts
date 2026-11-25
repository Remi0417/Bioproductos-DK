import type { CatalogProduct } from "../../content/products"

export const DEMO_CART_STORAGE_KEY = "dk-demo-cart-v1"
export const DEMO_CART_EVENT = "dk-demo-cart-updated"
export const DEMO_CART_LIMIT = 20

/** These values exist only for the local UI simulation; they are not DK prices. */
export const demoPrices: Readonly<Record<string, number>> = {
  "detergent-citrus": 6990,
  "detergent-eucalyptus": 6990,
  "solid-shampoo": 5490,
  "bath-salts": 3990,
  soap: 3490,
  conditioner: 5990,
}

export type DemoCartEntry = {
  productId: string
  variant?: string
  quantity: number
}

export type DemoCartLine = {
  key: string
  product: DemoProduct
  variant?: string
  quantity: number
  unitPrice: number
  total: number
}

export type DemoProduct = CatalogProduct

export function demoCartKey(productId: string, variant?: string) {
  return `${productId}::${variant ?? ""}`
}

function validEntry(
  value: unknown,
  catalog: readonly DemoProduct[],
): value is DemoCartEntry {
  if (!value || typeof value !== "object") return false
  const entry = value as Partial<DemoCartEntry>
  const product = catalog.find((item) => item.id === entry.productId)
  if (
    !product ||
    !Number.isSafeInteger(entry.quantity) ||
    (entry.quantity as number) < 1 ||
    (entry.quantity as number) > DEMO_CART_LIMIT ||
    (entry.variant !== undefined &&
      (typeof entry.variant !== "string" ||
        !product.variants?.includes(entry.variant)))
  )
    return false
  return !product.variants || Boolean(entry.variant)
}

export function normalizeDemoCart(
  value: unknown,
  catalog: readonly DemoProduct[],
): DemoCartEntry[] {
  if (!Array.isArray(value)) return []
  const entries = new Map<string, DemoCartEntry>()
  for (const candidate of value) {
    if (!validEntry(candidate, catalog)) continue
    const key = demoCartKey(candidate.productId, candidate.variant)
    const current = entries.get(key)
    entries.set(key, {
      productId: candidate.productId,
      ...(candidate.variant ? { variant: candidate.variant } : {}),
      quantity: Math.min(
        DEMO_CART_LIMIT,
        (current?.quantity ?? 0) + candidate.quantity,
      ),
    })
  }
  return Array.from(entries.values())
}

export function readDemoCart(
  serialized: string | null,
  catalog: readonly DemoProduct[],
): DemoCartEntry[] {
  if (!serialized) return []
  try {
    return normalizeDemoCart(JSON.parse(serialized), catalog)
  } catch {
    return []
  }
}

export function addDemoCartEntry(
  entries: DemoCartEntry[],
  productId: string,
  catalog: readonly DemoProduct[],
  variant?: string,
  quantity = 1,
): DemoCartEntry[] {
  return normalizeDemoCart(
    [...entries, { productId, ...(variant ? { variant } : {}), quantity }],
    catalog,
  )
}

export function setDemoCartQuantity(
  entries: DemoCartEntry[],
  key: string,
  quantity: number,
  catalog: readonly DemoProduct[],
): DemoCartEntry[] {
  if (quantity <= 0)
    return entries.filter(
      (entry) => demoCartKey(entry.productId, entry.variant) !== key,
    )
  return normalizeDemoCart(
    entries.map((entry) =>
      demoCartKey(entry.productId, entry.variant) === key
        ? { ...entry, quantity: Math.min(quantity, DEMO_CART_LIMIT) }
        : entry,
    ),
    catalog,
  )
}

export function getDemoCartLines(
  entries: DemoCartEntry[],
  catalog: readonly DemoProduct[],
  // En modo tienda los precios vienen de Shopify; si no, se usan los de demostración.
  prices: Readonly<Record<string, number>> = demoPrices,
): DemoCartLine[] {
  return normalizeDemoCart(entries, catalog).flatMap((entry) => {
    const product = catalog.find((item) => item.id === entry.productId)
    const unitPrice = prices[entry.productId]
    if (!product || !Number.isSafeInteger(unitPrice)) return []
    return [
      {
        key: demoCartKey(entry.productId, entry.variant),
        product,
        variant: entry.variant,
        quantity: entry.quantity,
        unitPrice,
        total: unitPrice * entry.quantity,
      },
    ]
  })
}

export function formatDemoPrice(amount: number) {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(amount)
}
