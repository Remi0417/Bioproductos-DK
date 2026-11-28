import Link from "next/link"
import type { CSSProperties, ReactNode } from "react"
import { homeMedia, type HomeMediaId } from "../../../content/media"
import type { SiteLink } from "../../../content/site"

export function ActionLink({
  label,
  href,
  variant = "text",
}: SiteLink & { variant?: "primary" | "secondary" | "text" }) {
  return (
    <Link className={`dk2-link dk2-link--${variant}`} href={href}>
      <span>{label}</span>
      <span aria-hidden="true">↗</span>
    </Link>
  )
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string
  eyebrow: string
  title: string
  children?: ReactNode
}) {
  return (
    <div className="dk2-heading">
      <p className="dk2-eyebrow">{eyebrow}</p>
      <h2 id={id}>{title}</h2>
      {children}
    </div>
  )
}

/**
 * Fondo desenfocado para marcos con la clase "dk2-photo-fit": la foto se ve
 * completa (sin recortes) y el espacio sobrante muestra la misma foto difuminada.
 */
export function photoBackdrop(url?: string | null): CSSProperties {
  return url ? ({ "--dk2-photo-bg": `url("${url}")` } as CSSProperties) : {}
}

export function homePhotoBackdrop(id: HomeMediaId): CSSProperties {
  const photo = homeMedia[id]
  return photoBackdrop(
    `/images/home/optimized/${photo.slug}-${photo.widths[0]}.webp`,
  )
}

export function HomePhoto({
  id,
  className = "",
  sizes,
  priority = false,
}: {
  id: HomeMediaId
  className?: string
  sizes: string
  priority?: boolean
}) {
  const photo = homeMedia[id]
  const source = (width: number) =>
    `/images/home/optimized/${photo.slug}-${width}.webp`
  // The starter globally disables Next image optimization. Native srcSet here
  // delivers our pre-optimized local sizes without changing commerce settings.
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={`dk2-photo ${className}`}
      data-home-photo={id}
      src={source(photo.widths[1])}
      srcSet={photo.widths
        .map((width) => `${source(width)} ${width}w`)
        .join(", ")}
      sizes={sizes}
      width={photo.width}
      height={photo.height}
      alt={photo.alt}
      style={{ objectPosition: photo.position }}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
    />
  )
}
