"use client"

import Link from "next/link"
import { ShoppingCart } from "@medusajs/icons"
import type { HeaderCartSummary } from "@lib/util/header-cart"
import { useEffect, useId, useRef, useState } from "react"
import { usePathname } from "next/navigation"
import { productCatalog } from "../../../content/products"
import {
  DEMO_CART_EVENT,
  DEMO_CART_STORAGE_KEY,
  formatDemoPrice,
  getDemoCartLines,
  readDemoCart,
} from "../../../lib/util/demo-cart"
import {
  readTiendaSummary,
  TIENDA_SUMMARY_STORAGE_KEY,
} from "../../../lib/util/tienda-cart"

export default function HeaderCartPopover({
  summary,
}: {
  summary: HeaderCartSummary
}) {
  const detailsRef = useRef<HTMLDetailsElement>(null)
  const triggerRef = useRef<HTMLElement>(null)
  const [enhanced, setEnhanced] = useState(false)
  const [open, setOpen] = useState(false)
  const [demoSummary, setDemoSummary] = useState(summary)
  // Origen del resumen: carrito de Shopify (tienda), simulación local con
  // productos (demo) o sin productos todavía (vacio).
  const [origen, setOrigen] = useState<"tienda" | "demo" | "vacio">("vacio")
  const isDemo = origen === "demo"
  const titleId = useId()
  const pathname = usePathname()
  const displayedSummary = summary.status === "preview" ? demoSummary : summary

  function close(restoreFocus = false) {
    if (detailsRef.current) detailsRef.current.open = false
    setOpen(false)
    if (restoreFocus) triggerRef.current?.focus()
  }

  useEffect(() => setEnhanced(true), [])
  useEffect(() => {
    if (summary.status !== "preview") return
    function syncDemoCart() {
      try {
        // Modo tienda: /productos guarda un resumen del carrito de Shopify.
        const tienda = readTiendaSummary(
          window.localStorage.getItem(TIENDA_SUMMARY_STORAGE_KEY),
        )
        if (tienda) {
          setOrigen("tienda")
          const count = tienda.reduce((sum, item) => sum + item.quantity, 0)
          const subtotal = tienda.reduce((sum, item) => sum + item.total, 0)
          setDemoSummary({
            status: "preview",
            count,
            items: tienda.map((item) => ({
              id: item.id,
              title: item.title,
              quantity: item.quantity,
              price: formatDemoPrice(item.total),
            })),
            subtotal: count ? formatDemoPrice(subtotal) : null,
            cartHref: count ? "/productos#catalogo" : null,
          })
          return
        }
        const entries = readDemoCart(
          window.localStorage.getItem(DEMO_CART_STORAGE_KEY),
          productCatalog,
        )
        const lines = getDemoCartLines(entries, productCatalog)
        const count = lines.reduce((total, line) => total + line.quantity, 0)
        const subtotal = lines.reduce((total, line) => total + line.total, 0)
        setOrigen(count ? "demo" : "vacio")
        setDemoSummary({
          status: "preview",
          count,
          items: lines.map((line) => ({
            id: line.key,
            title: `${line.product.name}${line.variant ? ` · ${line.variant}` : ""}`,
            quantity: line.quantity,
            price: formatDemoPrice(line.total),
          })),
          subtotal: count ? formatDemoPrice(subtotal) : null,
          cartHref: count ? "/productos#catalogo" : null,
        })
      } catch {
        setDemoSummary(summary)
      }
    }
    syncDemoCart()
    window.addEventListener(DEMO_CART_EVENT, syncDemoCart)
    window.addEventListener("storage", syncDemoCart)
    return () => {
      window.removeEventListener(DEMO_CART_EVENT, syncDemoCart)
      window.removeEventListener("storage", syncDemoCart)
    }
  }, [summary])
  useEffect(() => close(), [pathname])
  useEffect(() => {
    if (!open) return
    function outside(event: Event) {
      if (
        event.target instanceof Node &&
        !detailsRef.current?.contains(event.target)
      )
        close()
    }
    function keyboard(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault()
        close(true)
      }
    }
    document.addEventListener("pointerdown", outside)
    document.addEventListener("focusin", outside)
    document.addEventListener("keydown", keyboard)
    return () => {
      document.removeEventListener("pointerdown", outside)
      document.removeEventListener("focusin", outside)
      document.removeEventListener("keydown", keyboard)
    }
  }, [open])

  const countLabel =
    displayedSummary.count === null
      ? "Abrir carrito"
      : `Abrir carrito, ${displayedSummary.count} ${displayedSummary.count === 1 ? "producto" : "productos"}`

  return (
    <details
      className="dk2-cart"
      ref={detailsRef}
      onToggle={(event) => setOpen(event.currentTarget.open)}
    >
      <summary
        className="dk2-cart-trigger"
        aria-label={countLabel}
        ref={triggerRef}
      >
        <ShoppingCart width={24} height={24} aria-hidden="true" />
        <span className="dk2-cart-count" aria-hidden="true">
          {displayedSummary.count === null
            ? "—"
            : displayedSummary.count > 99
              ? "99+"
              : displayedSummary.count}
        </span>
      </summary>
      <section
        className="dk2-cart-panel"
        aria-labelledby={titleId}
        data-cart-state={displayedSummary.status}
      >
        <div className="dk2-cart-heading">
          <div>
            <p className="dk2-cart-eyebrow">
              {displayedSummary.status !== "preview"
                ? "Tu selección"
                : isDemo
                  ? "Simulación local"
                  : "BioProductos DK · Tienda"}
            </p>
            <h2 id={titleId}>Tu carrito</h2>
          </div>
          {enhanced && (
            <button
              className="dk2-cart-close"
              type="button"
              onClick={() => close(true)}
              aria-label="Cerrar carrito"
            >
              <span aria-hidden="true">×</span>
            </button>
          )}
        </div>
        {displayedSummary.status === "loading" ||
        displayedSummary.status === "unavailable" ? (
          <div className="dk2-cart-empty" role="status">
            <p className="dk2-cart-message">
              {displayedSummary.status === "loading"
                ? "Consultando tu selección…"
                : "No pudimos consultar tu carrito."}
            </p>
            {displayedSummary.status === "unavailable" && (
              <p>Vuelve a intentarlo recargando la página.</p>
            )}
          </div>
        ) : displayedSummary.items.length ? (
          <>
            <ul className="dk2-cart-items">
              {displayedSummary.items.map((item) => (
                <li key={item.id}>
                  <span className="dk2-cart-unit" aria-hidden="true">
                    {item.quantity}
                  </span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>Cantidad: {item.quantity}</p>
                  </div>
                  {item.price && <strong>{item.price}</strong>}
                </li>
              ))}
            </ul>
            {displayedSummary.subtotal && (
              <div className="dk2-cart-subtotal">
                <span>Subtotal</span>
                <strong>{displayedSummary.subtotal}</strong>
              </div>
            )}
          </>
        ) : (
          <div className="dk2-cart-empty">
            <span className="dk2-cart-empty-icon" aria-hidden="true">
              <ShoppingCart width={32} height={32} />
            </span>
            <p className="dk2-cart-message">Tu carrito está esperando ideas.</p>
            <p>
              {displayedSummary.status !== "preview"
                ? "Todavía no has agregado productos. Encuentra tu próxima elección."
                : isDemo
                  ? "Agrega productos para probar el carrito y completar una compra demostrativa."
                  : "Agrega productos y completa tu compra en el checkout seguro de Shopify."}
            </p>
          </div>
        )}
        {displayedSummary.status === "preview" && (
          <p className="dk2-cart-note">
            {isDemo
              ? "Precios ficticios · Sin pagos ni pedidos reales"
              : "Precios en CLP desde Shopify · Tienda en modo de prueba"}
          </p>
        )}
        <Link
          className="dk2-cart-link"
          href={
            displayedSummary.items.length && displayedSummary.cartHref
              ? displayedSummary.cartHref
              : "/productos"
          }
          onClick={(event) => {
            if (
              displayedSummary.status === "preview" &&
              displayedSummary.items.length &&
              pathname === "/productos"
            ) {
              event.preventDefault()
              window.dispatchEvent(new Event("dk-demo-cart-open"))
            }
            close()
          }}
        >
          {displayedSummary.items.length && displayedSummary.cartHref
            ? isDemo
              ? "Ver carrito de demostración"
              : "Ver carrito"
            : "Descubrir productos"}
          <span aria-hidden="true">↗</span>
        </Link>
      </section>
    </details>
  )
}
