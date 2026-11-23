import Link from "next/link"
import Image from "next/image"
import { Suspense } from "react"
import { emptyHeaderCart } from "@lib/util/header-cart"
import HeaderCart from "./header-cart"
import HeaderCartPopover from "./header-cart-popover"
import SiteNavigation from "./navigation"
import SiteEnhancements from "./site-enhancements"
import BrandRibbon from "./brand-ribbon"
import SocialLinks from "./social-links"
import {
  primaryNavigation,
  complementaryNavigation,
  publicContact,
} from "../../../content/site"

export function SiteHeader() {
  return (
    <>
      <a href="#contenido" className="dk2-skip">
        Saltar al contenido
      </a>
      <SiteEnhancements />
      <header className="dk2-header" data-home-section="S02">
        <div className="dk2-container dk2-header-inner">
          <div className="dk2-header-branding">
            <Link
              href="/"
              className="dk2-brand"
              aria-label="BioProductos DK, inicio"
            >
              <Image
                src="/images/brand/logo-dk-header.webp"
                alt="BioProductos DK"
                width={288}
                height={288}
                className="dk2-brand-image"
                loading="eager"
              />
            </Link>
            <SocialLinks placement="header" />
          </div>
          <SiteNavigation />
          <div className="dk2-header-actions">
            <Link href="/donaciones" className="dk2-header-cta">
              Donaciones
              <span aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  focusable="false"
                >
                  <path d="M20 4C13 4 6 6 6 13a5 5 0 0 0 5 5c7 0 9-7 9-14Z" />
                  <path d="m4 20 10-10" />
                </svg>
              </span>
            </Link>
            {process.env.DK_DEMO_PREVIEW === "true" ? (
              <HeaderCartPopover summary={emptyHeaderCart("preview")} />
            ) : (
              <Suspense
                fallback={
                  <HeaderCartPopover summary={emptyHeaderCart("loading")} />
                }
              >
                <HeaderCart />
              </Suspense>
            )}
          </div>
        </div>
      </header>
      <BrandRibbon />
    </>
  )
}

export function SiteFooter() {
  return (
    <footer className="dk2-footer" data-home-section="S12">
      <div className="dk2-container">
        <div className="dk2-footer-grid">
          <div className="dk2-footer-brand">
            <Link
              href="/"
              className="dk2-footer-brand-link"
              aria-label="BioProductos DK, inicio"
            >
              <span className="dk2-footer-brand-name">
                BioProductos <strong>DK</strong>
              </span>
            </Link>
            <p>
              Ciencia aplicada, productos y nuevas posibilidades para materiales
              orgánicos.
            </p>
            <a
              className="dk2-footer-email"
              href={`mailto:${publicContact.email}`}
            >
              {publicContact.email}
            </a>
            <p className="dk2-footer-location">{publicContact.location}</p>
            <SocialLinks placement="footer" />
          </div>
          <nav className="dk2-footer-nav" aria-label="Explorar el sitio">
            <h3>Explorar</h3>
            {primaryNavigation
              .filter(({ href }) =>
                ["/", "/nosotras", "/bio-investigacion", "/productos"].includes(
                  href,
                ),
              )
              .map((link) => (
                <Link href={link.href} key={link.href}>
                  {link.label}
                </Link>
              ))}
          </nav>
          <nav className="dk2-footer-nav" aria-label="Colaborar y conectar">
            <h3>Conectar</h3>
            {[
              { label: "Empresas", href: "/empresas" },
              ...complementaryNavigation.slice(0, 2),
              { label: "Dona tus residuos", href: "/donaciones" },
              { label: "Contacto", href: "/contacto" },
            ].map((link) => (
              <Link href={link.href} key={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>
          <aside
            className="dk2-footer-legal"
            aria-labelledby="footer-legal-heading"
          >
            <div className="dk2-footer-legal-head">
              <h3 id="footer-legal-heading">Información legal</h3>
              <span>En preparación</span>
            </div>
            <p>
              Privacidad · Términos de uso y venta · Despachos, cambios y
              reclamos.
            </p>
            <small>Documentos pendientes de aprobación.</small>
            <div className="dk2-footer-legal-links">
              <Link href="/informacion-legal">
                Estado de documentos <span aria-hidden="true">↗</span>
              </Link>
              <a
                href="https://www.sernac.cl/portal/604/w3-propertyvalue-20982.html"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Derechos en comercio electrónico, guía oficial SERNAC (abre en otra pestaña)"
              >
                Derechos del consumidor · SERNAC
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </aside>
        </div>
        <div className="dk2-footer-bottom">
          <p>
            © {new Date().getFullYear()} BioProductos DK. Propuesta
            independiente en evaluación.
          </p>
          <p>Sin compras ni pagos en este sitio.</p>
          <a
            href={publicContact.source}
            target="_blank"
            rel="noopener noreferrer"
          >
            Fuente del correo institucional <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </footer>
  )
}
