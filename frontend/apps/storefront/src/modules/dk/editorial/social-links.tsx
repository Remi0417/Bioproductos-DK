import type { SVGProps } from "react"
import { socialProfiles } from "../../../content/site"

function SocialIconFrame(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    />
  )
}

function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <SocialIconFrame {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </SocialIconFrame>
  )
}

function LinkedinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <SocialIconFrame {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <path d="M7.5 10.5v6M11.5 16.5v-6m0 2.5a2.5 2.5 0 0 1 5 0v3.5" />
      <circle cx="7.5" cy="7.5" r="1" fill="currentColor" stroke="none" />
    </SocialIconFrame>
  )
}

function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <SocialIconFrame {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <path d="M13 20.5v-9a3 3 0 0 1 3-3h1M10 13h6.5" />
    </SocialIconFrame>
  )
}

const icons = {
  instagram: InstagramIcon,
  linkedin: LinkedinIcon,
  facebook: FacebookIcon,
}

export default function SocialLinks({
  placement,
}: {
  placement: "header" | "menu" | "footer"
}) {
  return (
    <nav
      className={`dk2-socials dk2-socials--${placement}`}
      aria-label="Redes sociales de BioProductos DK"
    >
      {socialProfiles.map(({ id, label, href }) => {
        const Icon = icons[id]
        return href ? (
          <a
            className="dk2-social-link"
            href={href}
            key={id}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${label} de BioProductos DK (abre en otra pestaña)`}
            title={`${label} · BioProductos DK`}
          >
            <Icon aria-hidden="true" focusable="false" />
          </a>
        ) : (
          <span
            className="dk2-social-link dk2-social-link--pending"
            key={id}
            role="img"
            aria-label={`${label}: enlace por confirmar`}
            title={`${label}: enlace por confirmar`}
          >
            <Icon aria-hidden="true" focusable="false" />
          </span>
        )
      })}
    </nav>
  )
}
