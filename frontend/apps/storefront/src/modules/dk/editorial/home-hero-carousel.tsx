"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import type {
  FocusEvent as ReactFocusEvent,
  KeyboardEvent as ReactKeyboardEvent,
  PointerEvent as ReactPointerEvent,
} from "react"
import type { HeroSlide } from "../../../content/home"
import { ActionLink, HomePhoto, homePhotoBackdrop } from "./primitives"

type DragState = {
  pointerId: number
  startX: number
  startY: number
  dragging: boolean
}

export default function HomeHeroCarousel({ slides }: { slides: HeroSlide[] }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const activeSlide = slides[activeIndex]
  const carouselRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLDivElement>(null)
  const dragRef = useRef<DragState | null>(null)
  const draggedRef = useRef(false)
  const pauseReasonsRef = useRef({ focus: false, drag: false })

  const syncPaused = useCallback(() => {
    const reasons = pauseReasonsRef.current
    setPaused(reasons.focus || reasons.drag)
  }, [])

  const move = useCallback(
    (direction: number) => {
      setActiveIndex(
        (current) => (current + direction + slides.length) % slides.length,
      )
    },
    [slides.length],
  )

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)")
    const updatePreference = () => setPrefersReducedMotion(preference.matches)
    updatePreference()
    preference.addEventListener("change", updatePreference)
    return () => preference.removeEventListener("change", updatePreference)
  }, [])

  useEffect(() => {
    if (paused || prefersReducedMotion || slides.length < 2) return
    const timer = window.setTimeout(() => {
      setActiveIndex((current) => (current + 1) % slides.length)
    }, 7200)
    return () => window.clearTimeout(timer)
  }, [activeIndex, paused, prefersReducedMotion, slides.length])

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      const drag = dragRef.current
      if (!drag || event.pointerId !== drag.pointerId) return

      const deltaX = event.clientX - drag.startX
      const deltaY = event.clientY - drag.startY
      if (!drag.dragging) {
        if (Math.max(Math.abs(deltaX), Math.abs(deltaY)) < 12) return
        if (Math.abs(deltaX) <= Math.abs(deltaY)) {
          dragRef.current = null
          return
        }

        drag.dragging = true
        draggedRef.current = true
        pauseReasonsRef.current.drag = true
        syncPaused()
        canvasRef.current?.setAttribute("data-dragging", "true")
      }

      canvasRef.current?.style.setProperty("--dk2-hero-drag-x", `${deltaX}px`)
    }

    const onPointerEnd = (event: PointerEvent) => {
      const drag = dragRef.current
      if (!drag || event.pointerId !== drag.pointerId) return

      const deltaX = event.clientX - drag.startX
      const threshold = Math.max(
        48,
        (canvasRef.current?.getBoundingClientRect().width ?? 0) * 0.1,
      )
      if (drag.dragging && Math.abs(deltaX) >= threshold) {
        move(deltaX < 0 ? 1 : -1)
      }

      dragRef.current = null
      pauseReasonsRef.current.drag = false
      syncPaused()
      canvasRef.current?.removeAttribute("data-dragging")
      canvasRef.current?.style.removeProperty("--dk2-hero-drag-x")
    }

    window.addEventListener("pointermove", onPointerMove)
    window.addEventListener("pointerup", onPointerEnd)
    window.addEventListener("pointercancel", onPointerEnd)
    return () => {
      window.removeEventListener("pointermove", onPointerMove)
      window.removeEventListener("pointerup", onPointerEnd)
      window.removeEventListener("pointercancel", onPointerEnd)
    }
  }, [move, slides.length, syncPaused])

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (
      !event.isPrimary ||
      (event.pointerType === "mouse" && event.button !== 0)
    )
      return
    draggedRef.current = false
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      dragging: false,
    }
  }

  const onKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault()
      move(1)
    } else if (event.key === "ArrowLeft") {
      event.preventDefault()
      move(-1)
    }
  }

  const onBlur = (event: ReactFocusEvent<HTMLDivElement>) => {
    if (
      event.relatedTarget instanceof Node &&
      event.currentTarget.contains(event.relatedTarget)
    )
      return
    pauseReasonsRef.current.focus = false
    syncPaused()
  }

  return (
    <div
      ref={carouselRef}
      className="dk2-hero-carousel"
      role="group"
      aria-roledescription="carrusel"
      aria-label="Historias destacadas de BioProductos DK"
      tabIndex={0}
      onFocusCapture={() => {
        pauseReasonsRef.current.focus = true
        syncPaused()
      }}
      onBlurCapture={onBlur}
      onKeyDownCapture={onKeyDown}
      onClickCapture={(event) => {
        if (!draggedRef.current) return
        event.preventDefault()
        event.stopPropagation()
        draggedRef.current = false
      }}
    >
      <div
        ref={canvasRef}
        className="dk2-hero-canvas"
        onPointerDown={onPointerDown}
      >
        {slides.map((slide, index) => {
          const isActive = index === activeIndex

          return (
            <article
              key={slide.id}
              className={`dk2-hero-slide dk2-hero-slide--${slide.id}${
                isActive ? " is-active" : ""
              }`}
              role="group"
              aria-roledescription="diapositiva"
              aria-label={`${index + 1} de ${slides.length}`}
              aria-hidden={!isActive}
              inert={!isActive}
            >
              <div
                className="dk2-hero-media dk2-photo-fit"
                style={homePhotoBackdrop(slide.media)}
              >
                <HomePhoto
                  id={slide.media}
                  className="dk2-hero-photo"
                  sizes={
                    index === 0 ? "100vw" : "(max-width: 699px) 100vw, 55vw"
                  }
                  priority={index === 0}
                />
              </div>
              <div className="dk2-hero-wash" aria-hidden="true" />
              <div className="dk2-container dk2-hero-inner">
                <div className="dk2-hero-copy">
                  <p className="dk2-hero-eyebrow">
                    <span className="dk2-signal" aria-hidden="true" />
                    {slide.eyebrow}
                  </p>
                  {index === 0 ? (
                    <h1 id="hero-heading" className="dk2-hero-title">
                      {slide.title} <span>{slide.accent}</span>
                    </h1>
                  ) : (
                    <h2 className="dk2-hero-title">
                      {slide.title} <span>{slide.accent}</span>
                    </h2>
                  )}
                  <p className="dk2-hero-lead">{slide.body}</p>
                  <div className="dk2-hero-actions">
                    <ActionLink {...slide.action} variant="primary" />
                    {slide.secondaryAction ? (
                      <ActionLink
                        {...slide.secondaryAction}
                        variant="secondary"
                      />
                    ) : null}
                  </div>
                </div>
                <p className="dk2-hero-photo-label">
                  <span aria-hidden="true" />
                  {slide.photoLabel}
                </p>
              </div>
            </article>
          )
        })}
      </div>
      {!prefersReducedMotion && slides.length > 1 ? (
        <div className="dk2-hero-progress" aria-hidden="true">
          <span
            key={`${activeIndex}-${paused}`}
            className="dk2-hero-progress-fill"
            data-running={!paused}
          />
        </div>
      ) : null}
      <p
        className="dk2-hero-live"
        role="status"
        aria-live={paused || prefersReducedMotion ? "polite" : "off"}
        aria-atomic="true"
      >
        Historia {activeIndex + 1} de {slides.length}: {activeSlide.title}{" "}
        {activeSlide.accent}
      </p>
    </div>
  )
}
