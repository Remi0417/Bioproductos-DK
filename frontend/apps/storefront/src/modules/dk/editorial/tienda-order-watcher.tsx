"use client"

import { useEffect } from "react"
import Swal from "sweetalert2"
import { carritoCompletado } from "@lib/api/tienda"
import { DEMO_CART_EVENT } from "../../../lib/util/demo-cart"
import {
  clearPendingCheckout,
  readPendingCheckout,
  TIENDA_CART_STORAGE_KEY,
  TIENDA_ORDER_COMPLETED_EVENT,
  writeTiendaSummary,
} from "../../../lib/util/tienda-cart"

// Shopify tarda unos segundos en convertir el carrito en pedido después del pago.
// Si el cliente vuelve de inmediato, se reintenta durante ~40 segundos.
const RETRY_EVERY_MS = 4000
const MAX_RETRIES = 10

/**
 * Vigila, en todas las páginas, si el último carrito enviado a Shopify ya se
 * convirtió en pedido. Cuando ocurre: vacía el carrito, actualiza el ícono del
 * encabezado y muestra el agradecimiento.
 */
export default function TiendaOrderWatcher() {
  useEffect(() => {
    let active = true
    let checking = false
    let retries = 0
    let timer: ReturnType<typeof setTimeout> | null = null

    function scheduleRetry() {
      if (timer) clearTimeout(timer)
      if (retries >= MAX_RETRIES) return
      retries += 1
      timer = setTimeout(() => void check(), RETRY_EVERY_MS)
    }

    async function check() {
      if (checking || !active) return
      const carritoId = readPendingCheckout()
      if (!carritoId) return
      checking = true
      let completado = false
      try {
        completado = await carritoCompletado(carritoId)
      } catch {
        // Sin respuesta de Django: se reintenta más tarde.
      } finally {
        checking = false
      }
      if (!active) return
      if (!completado) {
        scheduleRetry()
        return
      }

      clearPendingCheckout()
      try {
        window.localStorage.setItem(TIENDA_CART_STORAGE_KEY, "[]")
      } catch {
        // Sin almacenamiento disponible.
      }
      writeTiendaSummary([])
      window.dispatchEvent(new Event(TIENDA_ORDER_COMPLETED_EVENT))
      window.dispatchEvent(new Event(DEMO_CART_EVENT))
      await Swal.fire({
        confirmButtonColor: "#1b563c", // --dk2-forest
        icon: "success",
        title: "¡Gracias por tu compra!",
        text: "Tu pedido quedó registrado en BioProductos DK. Vaciamos tu carrito para que puedas seguir explorando.",
        confirmButtonText: "Seguir explorando",
      })
    }

    // Al volver a la página (botón Atrás, otra pestaña o la app de correo).
    function restart() {
      retries = 0
      void check()
    }
    function onVisibility() {
      if (document.visibilityState === "visible") restart()
    }

    void check()
    window.addEventListener("pageshow", restart)
    window.addEventListener("focus", restart)
    document.addEventListener("visibilitychange", onVisibility)
    return () => {
      active = false
      if (timer) clearTimeout(timer)
      window.removeEventListener("pageshow", restart)
      window.removeEventListener("focus", restart)
      document.removeEventListener("visibilitychange", onVisibility)
    }
  }, [])

  return null
}
