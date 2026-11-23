"use client"

import { useEffect, useRef } from "react"
import { attachRibbonDrag } from "@lib/util/ribbon-drag"
import { brandMessages } from "../../../content/site"

// Decorative themes: applied science, nature, growth, recycling and circularity.
const ribbonIconPaths = [
  [
    "M9 3h6M10 3v6l-5.5 9A2 2 0 0 0 6.2 21h11.6a2 2 0 0 0 1.7-3L14 9V3",
    "M8 14h8",
  ],
  ["M20 4C13 4 6 6 6 13a5 5 0 0 0 5 5c7 0 9-7 9-14Z", "m4 20 10-10"],
  [
    "M12 21v-7",
    "M12 14C5 14 3 10 3 5c6 0 9 3 9 9ZM12 14c0-7 3-10 9-10 0 6-3 10-9 10Z",
  ],
  [
    "M9 4h5a3 3 0 0 1 2.6 1.5L19 10m-4-1 4 1 1-4",
    "M20 13l-2.5 4.5A3 3 0 0 1 15 19h-5m2-3-2 3 2 3",
    "M7 19l-3-5a3 3 0 0 1 0-3l3-5M3 7l4-1 1 4",
  ],
  [
    "M20 8A8 8 0 0 0 6.3 5.5L3 9M3 4v5h5",
    "M4 16a8 8 0 0 0 13.7 2.5L21 15m-5 0h5v5",
  ],
] as const

function RibbonIcon({ index }: { index: number }) {
  return (
    <svg
      className="dk2-ribbon-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {ribbonIconPaths[index % ribbonIconPaths.length].map((path) => (
        <path d={path} key={path} />
      ))}
    </svg>
  )
}

// CSS loop survives without JS; pointer/keyboard control enhances it on hydration.
export default function BrandRibbon() {
  const region = useRef<HTMLElement>(null)
  useEffect(() => {
    if (region.current) return attachRibbonDrag(region.current)
  }, [])

  return (
    <section
      ref={region}
      className="dk2-ribbon"
      aria-label="Mensajes de BioProductos DK"
      aria-description="El movimiento se detiene al enfocar esta barra con el teclado."
      tabIndex={0}
      data-home-section="S01"
    >
      <div className="dk2-ribbon-inner">
        <div className="dk2-ribbon-window" id="dk-brand-messages">
          <div className="dk2-ribbon-track">
            {[false, true].map((duplicate) => (
              <ul
                role="list"
                className="dk2-ribbon-group"
                key={String(duplicate)}
                aria-hidden={duplicate || undefined}
              >
                {brandMessages.map((message, index) => (
                  <li key={message}>
                    <span className="dk2-ribbon-message">{message}</span>
                    <span className="dk2-ribbon-separator" aria-hidden="true">
                      <RibbonIcon index={index} />
                    </span>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
