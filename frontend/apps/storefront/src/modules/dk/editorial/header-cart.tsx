import { getCartId } from "@lib/data/cookies"
import { retrieveCart } from "@lib/data/cart"
import { loadHeaderCartSummary } from "@lib/util/header-cart"
import HeaderCartPopover from "./header-cart-popover"

export default async function HeaderCart() {
  const summary = await loadHeaderCartSummary({
    preview: process.env.DK_DEMO_PREVIEW === "true",
    getCartId,
    retrieveCart,
    defaultCountry: process.env.NEXT_PUBLIC_DEFAULT_REGION,
  })
  return <HeaderCartPopover summary={summary} />
}
