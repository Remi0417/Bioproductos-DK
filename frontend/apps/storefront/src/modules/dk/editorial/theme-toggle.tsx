"use client"

import { useEffect, useRef, useState } from "react"

const THEME_KEY = "dk-color-theme"
type Theme = "light" | "dark"

function readSavedTheme(): Theme | null {
  try {
    const saved = window.localStorage.getItem(THEME_KEY)
    return saved === "light" || saved === "dark" ? saved : null
  } catch {
    return null
  }
}

function setDocumentTheme(theme: Theme, persist = true, animate = true) {
  const root = document.documentElement
  if (animate) root.classList.add("theme-transitioning")
  root.dataset.theme = theme
  root.classList.toggle("dark", theme === "dark")
  root.style.colorScheme = theme

  if (persist) {
    try {
      window.localStorage.setItem(THEME_KEY, theme)
    } catch {
      // The current page theme still changes when storage is unavailable.
    }
  }

  if (animate)
    window.setTimeout(() => root.classList.remove("theme-transitioning"), 520)
}

function MoonAndStars() {
  return (
    <svg
      className="dk-theme-icon dk-theme-icon--moon"
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M25.8 7.5a13.1 13.1 0 1 0 7 22.7A14.5 14.5 0 0 1 25.8 7.5Z"
        fill="currentColor"
      />
      <path
        d="m10 9 .8 2.1L13 12l-2.2.8L10 15l-.8-2.2L7 12l2.2-.9L10 9Z"
        fill="currentColor"
      />
      <path
        d="m31 11 .6 1.5 1.5.5-1.5.6-.6 1.4-.5-1.4-1.5-.6 1.5-.5.5-1.5Z"
        fill="currentColor"
      />
      <circle cx="8" cy="22" r="1.2" fill="currentColor" />
    </svg>
  )
}

function WinkingSun() {
  return (
    <svg
      className="dk-theme-icon dk-theme-icon--sun"
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <g
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="20" cy="20" r="8.2" />
        <path d="M20 4.5v3M20 32.5v3M35.5 20h-3M7.5 20h-3M31 9l-2.1 2.1M11.1 28.9 9 31M31 31l-2.1-2.1M11.1 11.1 9 9" />
        <path d="M16.5 18.2v.2M21.7 18.5c1.1-1.2 2.3-1.2 3.5 0M16.5 22.5c2.1 2.1 4.9 2.1 7 0" />
      </g>
    </svg>
  )
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light")
  const manualPreference = useRef(false)

  useEffect(() => {
    const saved = readSavedTheme()
    manualPreference.current = saved !== null
    const system = window.matchMedia("(prefers-color-scheme: dark)")
    const current = document.documentElement.dataset.theme
    const initial =
      current === "dark" || current === "light"
        ? current
        : saved || (system.matches ? "dark" : "light")

    setTheme(initial)
    setDocumentTheme(initial, false, false)

    const onSystemTheme = (event: MediaQueryListEvent) => {
      if (manualPreference.current) return
      const next = event.matches ? "dark" : "light"
      setTheme(next)
      setDocumentTheme(next, false)
    }

    system.addEventListener("change", onSystemTheme)
    return () => system.removeEventListener("change", onSystemTheme)
  }, [])

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark"
    manualPreference.current = true
    setTheme(next)
    setDocumentTheme(next)
  }

  return (
    <button
      type="button"
      className="dk-theme-toggle"
      onClick={toggleTheme}
      aria-label={
        theme === "dark" ? "Activar modo claro" : "Activar modo oscuro"
      }
      aria-pressed={theme === "dark"}
      title={
        theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"
      }
    >
      <span className="dk-theme-toggle-orbit" aria-hidden="true" />
      <MoonAndStars />
      <WinkingSun />
    </button>
  )
}
