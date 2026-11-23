// Seek the existing CSS animation instead of replacing its infinite loop.
export function attachRibbonDrag(region: HTMLElement) {
  const track = region.querySelector<HTMLElement>(".dk2-ribbon-track")
  const group = region.querySelector<HTMLElement>(".dk2-ribbon-group")
  if (!track?.getAnimations || !group) return () => {}

  const motion = window.matchMedia("(prefers-reduced-motion: reduce)")
  const description = region.getAttribute("aria-description")
  const inertiaDuration = 1600
  const maximumSpeed = 0.45 // CSS pixels/ms, independent of viewport/cycle width.
  let frame = 0
  let coast: {
    started: number
    startTime: number
    velocity: number
    animation: Animation
    width: number
    duration: number
  } | null = null
  let drag: {
    pointerId: number
    startX: number
    startTime: number
    width: number
    duration: number
    animation: Animation
    distance: number
    samples: { x: number; time: number }[]
  } | null = null

  function animation() {
    return track!
      .getAnimations()
      .find(
        (item) => (item as CSSAnimation).animationName === "dk2-ribbon-loop",
      )
  }
  function timing(item: Animation) {
    const duration = item.effect?.getComputedTiming().duration
    const width = group!.getBoundingClientRect().width
    if (typeof duration !== "number" || duration <= 0 || width <= 0) return null
    return { duration, width }
  }
  function seek(item: Animation, time: number, duration: number) {
    item.currentTime = ((time % duration) + duration) % duration
  }
  function resume() {
    if (!motion.matches && !region.matches(":focus-visible"))
      animation()?.play()
  }
  function stopInertia() {
    if (frame) window.cancelAnimationFrame(frame)
    frame = 0
    coast = null
    delete region.dataset.coasting
  }
  function coastFrame(now: number) {
    frame = 0
    if (!coast) return
    const elapsed = Math.min(inertiaDuration, Math.max(0, now - coast.started))
    const progress = elapsed / inertiaDuration
    const baseSpeed = coast.width / coast.duration
    // Integral of a cubic velocity decay: reaches the normal speed smoothly,
    // including when a rightward flick briefly reverses the leftward loop.
    const travel =
      baseSpeed * elapsed +
      ((coast.velocity - baseSpeed) *
        inertiaDuration *
        (1 - (1 - progress) ** 4)) /
        4
    seek(
      coast.animation,
      coast.startTime + (travel / coast.width) * coast.duration,
      coast.duration,
    )
    if (elapsed === inertiaDuration) {
      stopInertia()
      resume()
    } else frame = window.requestAnimationFrame(coastFrame)
  }
  function startInertia(previous: NonNullable<typeof drag>) {
    const last = previous.samples[previous.samples.length - 1]
    const first = previous.samples[0]
    const now = window.performance.now()
    const elapsed = last.time - first.time
    if (
      previous.distance < 12 ||
      elapsed <= 0 ||
      now - last.time > 80 ||
      motion.matches ||
      region.matches(":focus-visible")
    )
      return false
    const velocity = (last.x - first.x) / elapsed
    if (Math.abs(velocity) < 0.12) return false
    coast = {
      started: now,
      startTime:
        typeof previous.animation.currentTime === "number"
          ? previous.animation.currentTime
          : 0,
      velocity: Math.max(
        -maximumSpeed,
        Math.min(maximumSpeed, -velocity * 0.65),
      ),
      animation: previous.animation,
      width: previous.width,
      duration: previous.duration,
    }
    region.dataset.coasting = "true"
    frame = window.requestAnimationFrame(coastFrame)
    return true
  }
  function finishDrag(withInertia = false) {
    const previous = drag
    if (!previous) return
    drag = null
    delete region.dataset.dragging
    if (region.hasPointerCapture(previous.pointerId))
      region.releasePointerCapture(previous.pointerId)
    if (!withInertia || !startInertia(previous)) resume()
  }
  function cancelMotion() {
    stopInertia()
    if (drag) finishDrag()
    else resume()
  }
  function onPointerDown(event: PointerEvent) {
    if (drag || !event.isPrimary || event.button !== 0 || motion.matches) return
    const item = animation()
    const size = item && timing(item)
    if (!item || !size) return
    stopInertia()
    drag = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startTime: typeof item.currentTime === "number" ? item.currentTime : 0,
      animation: item,
      distance: 0,
      samples: [{ x: event.clientX, time: window.performance.now() }],
      ...size,
    }
    item.pause()
    region.dataset.dragging = "true"
    try {
      region.setPointerCapture(event.pointerId)
    } catch {
      // Window listeners still handle movement/release if capture is unavailable.
    }
  }
  function onPointerMove(event: PointerEvent) {
    if (!drag || event.pointerId !== drag.pointerId) return
    if (event.cancelable) event.preventDefault()
    const now = window.performance.now()
    const last = drag.samples[drag.samples.length - 1]
    drag.distance += Math.abs(event.clientX - last.x)
    // A held pointer must not dilute a fresh flick; wait for a new movement
    // sample rather than estimating speed across the stationary interval.
    if (now - last.time > 90) drag.samples = [{ x: event.clientX, time: now }]
    else {
      drag.samples.push({ x: event.clientX, time: now })
      while (drag.samples.length > 2 && drag.samples[1].time < now - 90)
        drag.samples.shift()
    }
    seek(
      drag.animation,
      drag.startTime -
        ((event.clientX - drag.startX) / drag.width) * drag.duration,
      drag.duration,
    )
  }
  function onPointerEnd(event: PointerEvent) {
    if (event.pointerId === drag?.pointerId)
      finishDrag(event.type === "pointerup")
  }
  function onFocus() {
    if (!motion.matches && region.matches(":focus-visible")) {
      stopInertia()
      animation()?.pause()
    }
  }
  function onBlur() {
    if (!drag && !coast && !motion.matches) animation()?.play()
  }
  function onKeyDown(event: KeyboardEvent) {
    if (
      motion.matches ||
      drag ||
      event.altKey ||
      event.ctrlKey ||
      event.metaKey ||
      !["ArrowLeft", "ArrowRight"].includes(event.key)
    )
      return
    const item = animation()
    const size = item && timing(item)
    if (!item || !size) return
    event.preventDefault()
    stopInertia()
    item.pause()
    const direction = event.key === "ArrowRight" ? 1 : -1
    const time = typeof item.currentTime === "number" ? item.currentTime : 0
    seek(
      item,
      time + (direction * 120 * size.duration) / size.width,
      size.duration,
    )
  }
  function onMotionChange() {
    cancelMotion()
    if (motion.matches) {
      delete region.dataset.draggable
      if (description === null) region.removeAttribute("aria-description")
      else region.setAttribute("aria-description", description)
    } else {
      region.dataset.draggable = "true"
      region.setAttribute(
        "aria-description",
        "Arrastra hacia los lados para mover los mensajes; al soltar un gesto rápido continúa con inercia suave. Con teclado, usa las flechas izquierda y derecha; al salir de la barra continúa el movimiento.",
      )
    }
  }

  onMotionChange()
  region.addEventListener("pointerdown", onPointerDown)
  region.addEventListener("lostpointercapture", onPointerEnd)
  region.addEventListener("focusin", onFocus)
  region.addEventListener("focusout", onBlur)
  region.addEventListener("keydown", onKeyDown)
  window.addEventListener("pointermove", onPointerMove, { passive: false })
  window.addEventListener("pointerup", onPointerEnd)
  window.addEventListener("pointercancel", onPointerEnd)
  window.addEventListener("resize", cancelMotion)
  window.addEventListener("blur", cancelMotion)
  motion.addEventListener("change", onMotionChange)
  return () => {
    cancelMotion()
    region.removeEventListener("pointerdown", onPointerDown)
    region.removeEventListener("lostpointercapture", onPointerEnd)
    region.removeEventListener("focusin", onFocus)
    region.removeEventListener("focusout", onBlur)
    region.removeEventListener("keydown", onKeyDown)
    window.removeEventListener("pointermove", onPointerMove)
    window.removeEventListener("pointerup", onPointerEnd)
    window.removeEventListener("pointercancel", onPointerEnd)
    window.removeEventListener("resize", cancelMotion)
    window.removeEventListener("blur", cancelMotion)
    motion.removeEventListener("change", onMotionChange)
    delete region.dataset.draggable
    if (description === null) region.removeAttribute("aria-description")
    else region.setAttribute("aria-description", description)
  }
}
