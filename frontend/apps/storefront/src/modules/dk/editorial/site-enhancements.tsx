"use client"

import { useEffect } from "react"

export default function SiteEnhancements() {
  useEffect(() => {
    const site = document.querySelector(".dk2-site")
    const header = site?.querySelector<HTMLElement>(".dk2-header")
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    const animations = new Set<Animation>()
    let frame = 0
    function scrollPosition() {
      const bottom = Math.max(
        0,
        document.documentElement.scrollHeight - window.innerHeight,
      )
      return Math.min(bottom, Math.max(0, window.scrollY))
    }
    let previousY = scrollPosition()
    let headerOffset = 0
    function setHeaderOffset(offset: number) {
      if (!header) return
      const limit = header.offsetHeight
      headerOffset = Math.min(limit, Math.max(0, offset))
      header.style.setProperty("--dk2-header-offset", `${headerOffset}px`)
      header.dataset.scrollShifted = String(headerOffset > 0)
      header.dataset.scrollHidden = String(limit > 0 && headerOffset >= limit)
    }
    function revealHeader() {
      setHeaderOffset(0)
    }
    function updateHeader() {
      frame = 0
      const y = scrollPosition()
      if (header) {
        const delta = y - Math.max(previousY, header.offsetHeight)
        header.dataset.scrolled = String(y > 24)
        if (
          y <= header.offsetHeight ||
          header.querySelector("details[open], :focus-visible")
        )
          revealHeader()
        else if (reduceMotion.matches) {
          if (delta < 0) revealHeader()
          else if (delta > 0) setHeaderOffset(header.offsetHeight)
        } else {
          // One pixel of scroll moves the header one pixel. No timed easing:
          // the user's speed, pauses and reversals directly drive its position.
          setHeaderOffset(headerOffset + delta)
        }
      }
      previousY = y
    }
    function onScroll() {
      if (!frame) frame = requestAnimationFrame(updateHeader)
    }
    function onHeaderToggle() {
      if (header?.querySelector("details[open]")) revealHeader()
    }
    revealHeader()
    updateHeader()
    window.addEventListener("scroll", onScroll, { passive: true })
    header?.addEventListener("focusin", revealHeader)
    header?.addEventListener("toggle", onHeaderToggle, true)

    const observer =
      "IntersectionObserver" in window
        ? new IntersectionObserver(
            (entries) => {
              for (const entry of entries) {
                if (!entry.isIntersecting) continue
                observer?.unobserve(entry.target)
                if (reduceMotion.matches || !entry.target.animate) continue
                const animation = entry.target.animate(
                  [
                    { opacity: 0.78, transform: "translateY(12px)" },
                    { opacity: 1, transform: "translateY(0)" },
                  ],
                  { duration: 320, easing: "cubic-bezier(.2,.65,.3,1)" },
                )
                animations.add(animation)
                animation.finished
                  .then(() => animations.delete(animation))
                  .catch(() => animations.delete(animation))
              }
            },
            { threshold: 0.12 },
          )
        : null
    site
      ?.querySelectorAll("[data-reveal]")
      .forEach((element) => observer?.observe(element))
    function onMotionChange() {
      revealHeader()
      if (reduceMotion.matches)
        animations.forEach((animation) => animation.cancel())
    }
    reduceMotion.addEventListener("change", onMotionChange)
    return () => {
      window.removeEventListener("scroll", onScroll)
      header?.removeEventListener("focusin", revealHeader)
      header?.removeEventListener("toggle", onHeaderToggle, true)
      reduceMotion.removeEventListener("change", onMotionChange)
      if (frame) cancelAnimationFrame(frame)
      observer?.disconnect()
      animations.forEach((animation) => animation.cancel())
    }
  }, [])
  return null
}
