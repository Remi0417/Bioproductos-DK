"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import SocialLinks from "./social-links"
import {
  primaryNavigation,
  complementaryNavigation,
} from "../../../content/site"

export default function SiteNavigation() {
  const pathname = usePathname()
  const detailsRef = useRef<HTMLDetailsElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const summaryRef = useRef<HTMLElement>(null)
  const [open, setOpen] = useState(false)
  const [enhanced, setEnhanced] = useState(false)

  function closeMenu(restoreFocus = true) {
    if (detailsRef.current) detailsRef.current.open = false
    setOpen(false)
    if (restoreFocus) summaryRef.current?.focus()
  }

  useEffect(() => {
    setEnhanced(true)
  }, [])
  useEffect(() => {
    closeMenu(false)
  }, [pathname])
  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    panelRef.current?.querySelector<HTMLButtonElement>("button")?.focus()
    const desktop = window.matchMedia("(min-width: 1280px)")
    function onResize() {
      if (desktop.matches) closeMenu(false)
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault()
        closeMenu()
        return
      }
      if (event.key !== "Tab") return
      const controls =
        panelRef.current?.querySelectorAll<HTMLElement>("a[href], button")
      if (!controls?.length) return
      const first = controls[0]
      const last = controls[controls.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    window.addEventListener("keydown", onKeyDown)
    desktop.addEventListener("change", onResize)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", onKeyDown)
      desktop.removeEventListener("change", onResize)
    }
  }, [open])

  function links(mobile = false) {
    return (
      mobile
        ? [...primaryNavigation, ...complementaryNavigation]
        : primaryNavigation
    ).map(({ href, label }) => (
      <Link
        key={href}
        href={href}
        aria-current={pathname === href ? "page" : undefined}
        onClick={() => {
          if (mobile) closeMenu()
        }}
      >
        {label}
      </Link>
    ))
  }

  return (
    <>
      <nav className="dk2-desktop-nav" aria-label="Navegación principal">
        {links()}
      </nav>
      <details
        className="dk2-mobile-nav"
        data-enhanced={enhanced || undefined}
        ref={detailsRef}
        onToggle={(event) => setOpen(event.currentTarget.open)}
      >
        <summary
          ref={summaryRef}
          aria-expanded={enhanced ? open : undefined}
          aria-controls="mobile-navigation-panel"
        >
          Menú{" "}
          <span className="dk2-menu-mark" aria-hidden="true">
            <i />
            <i />
          </span>
        </summary>
        <div
          className="dk2-drawer-overlay"
          data-testid="menu-backdrop"
          onPointerDown={(event) => {
            if (event.target === event.currentTarget) closeMenu()
          }}
        >
          <div
            ref={panelRef}
            id="mobile-navigation-panel"
            className="dk2-drawer-panel"
            role={enhanced && open ? "dialog" : undefined}
            aria-modal={enhanced && open ? true : undefined}
            aria-label="Menú del sitio"
          >
            <div className="dk2-drawer-top">
              <span>BioProductos DK</span>
              {enhanced && (
                <button type="button" onClick={() => closeMenu()}>
                  Cerrar <span aria-hidden="true">×</span>
                </button>
              )}
            </div>
            <SocialLinks placement="menu" />
            <nav className="dk2-mobile-links" aria-label="Navegación móvil">
              {links(true)}
            </nav>
            <p className="dk2-small">
              Ciencia, innovación y economía circular.
            </p>
            {!enhanced && (
              <p className="dk2-small">Para cerrar, vuelve a pulsar Menú.</p>
            )}
          </div>
        </div>
      </details>
    </>
  )
}
