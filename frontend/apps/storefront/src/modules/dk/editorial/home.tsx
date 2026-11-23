import Image from "next/image"
import Link from "next/link"
import { homeContent as content } from "../../../content/home"
import type { HomeMediaId } from "../../../content/media"
import { ActionLink, HomePhoto, SectionHeading } from "./primitives"
import HomeHeroCarousel from "./home-hero-carousel"

const donationPhotos = [
  "home-products-detergent",
  "home-products-shampoo",
  "home-products-bath",
  "home-founders",
] as const satisfies readonly HomeMediaId[]

function Hero() {
  return (
    <section
      className="dk2-hero"
      aria-label="Bienvenida a BioProductos DK"
      data-home-section="S03"
    >
      <HomeHeroCarousel slides={content.hero.slides} />
      <ResidueInvitation />
      <LocationStrip />
    </section>
  )
}

function LocationStrip() {
  return (
    <Link
      className="dk2-location-strip"
      href="/donde-comprar"
      aria-label="Ubícanos aquí: ver dirección y cómo llegar a BioProductos DK"
    >
      <span className="dk2-location-mark" aria-hidden="true">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          focusable="false"
        >
          <path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" />
          <circle cx="12" cy="10" r="2.3" />
        </svg>
      </span>
      <span className="dk2-location-copy">
        <span className="dk2-location-eyebrow">
          BIOPRODUCTOS DK · PADRE HURTADO
        </span>
        <span className="dk2-location-description">
          Estamos más cerca de lo que imaginas.
        </span>
      </span>
      <span className="dk2-location-action">
        Ubícanos aquí
        <svg
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M4 10h11m-4-4 4 4-4 4" />
        </svg>
      </span>
    </Link>
  )
}

function ResidueInvitation() {
  return (
    <section
      id="donaciones-home"
      className="dk2-donate"
      aria-labelledby="donation-heading"
    >
      <div className="dk2-container dk2-donate-layout">
        <span className="dk2-donate-emblem" aria-hidden="true">
          <svg
            viewBox="0 0 64 64"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            focusable="false"
          >
            <g className="dk2-donate-cycle">
              {[0, 120, 240].map((angle) => (
                <path
                  key={angle}
                  d="M20.5 12.08A23 23 0 0 1 51.92 20.5M45.96 18.17l5.96 2.33.96-6.33"
                  transform={`rotate(${angle} 32 32)`}
                />
              ))}
            </g>
            <path
              className="dk2-donate-leaf"
              d="M43 23c-11-1-22 3-22 12a9 9 0 0 0 9 9c9 0 13-10 13-21Z"
            />
            <path d="m20 45 14-14" />
          </svg>
        </span>
        <div className="dk2-donate-copy">
          <h2 id="donation-heading">{content.introduction.title}</h2>
          <p>{content.introduction.body}</p>
        </div>
        <div
          className="dk2-donate-photos"
          role="group"
          aria-label="Productos y equipo de BioProductos DK"
        >
          {donationPhotos.map((id) => (
            <div className="dk2-donate-photo" key={id}>
              <HomePhoto id={id} sizes="(max-width: 1099px) 58px, 80px" />
            </div>
          ))}
        </div>
        <Link
          className="dk2-donate-button"
          href={content.introduction.action.href}
        >
          <span>{content.introduction.action.label}</span>
          <span className="dk2-donate-thanks" aria-hidden="true">
            <svg
              viewBox="0 0 48 40"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              focusable="false"
            >
              <g className="dk2-donate-person dk2-donate-person--left">
                <circle cx="16" cy="10" r="4" />
                <path d="M6 34v-9a8 8 0 0 1 8-8h3" />
                <path
                  className="dk2-donate-hug-arm dk2-donate-hug-arm--left"
                  d="M12 23c5 1 8 8 15 6l6-3"
                />
              </g>
              <g className="dk2-donate-person dk2-donate-person--right">
                <circle cx="32" cy="10" r="4" />
                <path d="M42 34v-9a8 8 0 0 0-8-8h-3" />
                <path
                  className="dk2-donate-hug-arm dk2-donate-hug-arm--right"
                  d="M36 23c-5 1-8 8-15 6l-6-3"
                />
              </g>
              <g className="dk2-donate-spark">
                <path d="M24 2v3m-5-2 2 2m8-2-2 2" />
              </g>
            </svg>
          </span>
        </Link>
      </div>
    </section>
  )
}

function Pillars() {
  return (
    <section
      className="dk2-dna dk2-container"
      aria-labelledby="pillars-heading"
      data-home-section="S04"
    >
      <div className="dk2-dna-banner">
        <div className="dk2-dna-header">
          <div>
            <p className="dk2-eyebrow">El ADN de BioProductos DK</p>
            <h2 id="pillars-heading">
              La naturaleza inspira. <span>La ciencia conecta.</span>
            </h2>
          </div>
        </div>
        <div className="dk2-dna-blocks">
          {content.pillars.map((pillar) => (
            <article className="dk2-dna-block" key={pillar.id}>
              <div className="dk2-dna-block-top">
                <span className="dk2-dna-focus">{pillar.focus}</span>
                <span className="dk2-dna-icon" aria-hidden="true">
                  <svg
                    viewBox="0 0 32 32"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    focusable="false"
                  >
                    {pillar.id === "bio" ? (
                      <>
                        <path d="M16 28V15m0 6C7 21 4 15 5 7c8 0 13 5 11 14Zm0-6C15 7 20 3 28 4c0 7-5 12-12 11Z" />
                        <path d="m10 13 6 8m7-12-7 6" />
                      </>
                    ) : pillar.id === "nano" ? (
                      <>
                        <circle cx="16" cy="16" r="4" />
                        <ellipse
                          cx="16"
                          cy="16"
                          rx="13"
                          ry="7"
                          transform="rotate(-35 16 16)"
                        />
                        <circle cx="16" cy="16" r="11" strokeDasharray="1 4" />
                      </>
                    ) : pillar.id === "innovation" ? (
                      <>
                        <path d="M11 4h10m-8 0v10L6 25a3 3 0 0 0 3 4h14a3 3 0 0 0 3-4l-7-11V4M10 21h12" />
                        <path d="M25 6h4m-2-2v4" />
                      </>
                    ) : (
                      <>
                        <path d="M6 12a11 11 0 0 1 20-3m-1-5 1 5-5-1M26 20A11 11 0 0 1 6 23m1 5-1-5 5 1" />
                        <path d="M21 12c-7 0-11 3-10 7a4 4 0 0 0 4 4c4 0 7-5 6-11Zm-11 12 8-8" />
                      </>
                    )}
                  </svg>
                </span>
              </div>
              <h3>{pillar.title}</h3>
              <p>
                <strong>{pillar.lead}</strong> {pillar.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProductFamilyPreview() {
  return (
    <section
      className="dk2-products dk2-section"
      aria-labelledby="products-heading"
      data-home-section="S05"
    >
      <svg
        className="dk2-products-art"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        aria-hidden="true"
        focusable="false"
      >
        <g
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        >
          <path d="m1160 64 72 42v84l-72 42-72-42v-84l72-42Zm72 126 72 42v84l-72 42-72-42v-84m-144 0 72-42 72 42m0-84 72-42 72 42" />
          <circle cx="1160" cy="106" r="8" />
          <circle cx="1088" cy="190" r="8" />
          <circle cx="1232" cy="190" r="8" />
          <circle cx="1304" cy="232" r="8" />
          <circle cx="1232" cy="316" r="8" />
          <path d="M214 594h54m-44 0v58l-38 70a14 14 0 0 0 12 21h86a14 14 0 0 0 12-21l-38-70v-58m-55 100h77m-62-26h48" />
          <path d="M219 570h44m-34 0v24m24-24v24" />
          <circle cx="334" cy="644" r="28" />
          <circle cx="392" cy="612" r="9" />
          <circle cx="402" cy="682" r="13" />
          <path d="m358 630 26-14m-22 38 28 22" />
        </g>
        <g fill="currentColor">
          <circle cx="1160" cy="106" r="3" />
          <circle cx="1088" cy="190" r="3" />
          <circle cx="1232" cy="190" r="3" />
          <circle cx="1304" cy="232" r="3" />
          <circle cx="1232" cy="316" r="3" />
        </g>
      </svg>
      <div className="dk2-container">
        <div className="dk2-products-intro" data-reveal>
          <div className="dk2-heading">
            <h2 id="products-heading">{content.products.eyebrow}</h2>
            <p className="dk2-products-tagline">{content.products.tagline}</p>
          </div>
        </div>
        <div className="dk2-product-families">
          {content.products.families.map((family) => (
            <article className="dk2-family" key={family.id} data-reveal>
              <Link
                className="dk2-family-link"
                href={family.action.href}
                aria-labelledby={`product-${family.id}-title product-${family.id}-action`}
              >
                <div className="dk2-family-visual">
                  {family.media ? (
                    <HomePhoto
                      id={family.media}
                      sizes="(max-width: 699px) calc(100vw - 40px), (max-width: 1099px) 45vw, 30vw"
                    />
                  ) : (
                    <div
                      className="dk2-family-placeholder"
                      data-product-photo-pending={family.id}
                    >
                      <span className="dk2-eyebrow">BioProductos DK</span>
                      <span className="dk2-family-placeholder-name">
                        {family.title}
                      </span>
                      <span>Fotografía por incorporar</span>
                    </div>
                  )}
                  {family.mediaNote && (
                    <span className="dk2-family-photo-note">
                      {family.mediaNote}
                    </span>
                  )}
                </div>
                <div className="dk2-family-body">
                  <p className="dk2-eyebrow">{family.category}</p>
                  <h3 id={`product-${family.id}-title`}>{family.title}</h3>
                  <p className="dk2-family-description">{family.body}</p>
                  <span
                    className="dk2-family-action"
                    id={`product-${family.id}-action`}
                  >
                    {family.action.label}
                    <span className="dk2-family-arrow" aria-hidden="true">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        focusable="false"
                      >
                        <path d="M5 12h14m-6-6 6 6-6 6" />
                      </svg>
                    </span>
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>
        <div className="dk2-collection-more">
          <Link className="dk2-link dk2-link--primary" href="/productos">
            <span>Ver todo</span>
            <span aria-hidden="true">
              <svg
                className="dk2-collection-bag"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                focusable="false"
              >
                <path d="M6.5 7.5h11l1.1 11.2a1.6 1.6 0 0 1-1.6 1.8H7a1.6 1.6 0 0 1-1.6-1.8L6.5 7.5Z" />
                <path d="M9 8V6a3 3 0 0 1 6 0v2" />
                <g className="dk2-collection-bag-leaf">
                  <path d="M10 16c-2-4 1-5 5-5 0 4-1 7-5 5Zm-1 1 4-4" />
                </g>
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}

function ResearchTeaser() {
  return (
    <section
      className="dk2-research-preview dk2-container"
      aria-labelledby="research-heading"
      data-home-section="S07"
    >
      <div className="dk2-research-card">
        <div className="dk2-research-preview-copy" data-reveal>
          <svg
            className="dk2-research-ambient"
            viewBox="0 0 680 460"
            preserveAspectRatio="none"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            aria-hidden="true"
            focusable="false"
          >
            <path d="M-24 309C103 238 131 437 294 373s169 26 236 87" />
            <path d="M220-28c76 122 203 20 309 93s105 23 181-19" />
            <circle cx="410" cy="74" r="2" />
            <circle cx="429" cy="89" r="1.5" fill="currentColor" />
            <circle cx="443" cy="68" r="2.5" />
          </svg>
          <p className="dk2-eyebrow">{content.research.eyebrow}</p>
          <h2 id="research-heading">{content.research.title}</h2>
          <p className="dk2-research-preview-description">
            {content.research.body}
          </p>
          <ul className="dk2-research-focus" aria-label="Áreas de enfoque">
            {content.research.focusAreas.map((area) => (
              <li key={area}>{area}</li>
            ))}
          </ul>
          <Link
            className="dk2-link dk2-link--primary dk2-research-action"
            href={content.research.action.href}
          >
            <span>{content.research.action.label}</span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              focusable="false"
            >
              <path d="M9 3h6m-5 0v6l-5.2 8.3A2.4 2.4 0 0 0 6.8 21h10.4a2.4 2.4 0 0 0 2-3.7L14 9V3" />
              <path d="M7.7 15h8.6" />
              <circle
                cx="11"
                cy="17.8"
                r=".6"
                fill="currentColor"
                stroke="none"
              />
              <circle
                cx="14.5"
                cy="16.8"
                r=".45"
                fill="currentColor"
                stroke="none"
              />
            </svg>
          </Link>
        </div>
        <div
          className="dk2-research-media"
          data-research-photo-slot
          data-research-photo-temporary
        >
          <HomePhoto
            id="home-products-shampoo"
            className="dk2-research-photo"
            sizes="(max-width: 899px) calc(100vw - 40px), 44vw"
          />
        </div>
      </div>
    </section>
  )
}

function BusinessTeaser() {
  return (
    <section
      className="dk2-business dk2-section dk2-container"
      aria-labelledby="business-heading"
      data-home-section="S08"
    >
      <div className="dk2-business-story">
        <figure className="dk2-business-photo" data-reveal>
          <HomePhoto
            id="home-business"
            sizes="(max-width: 699px) calc(100vw - 40px), 42vw"
          />
          <figcaption>
            <span>El universo DK, más cerca.</span>
            <span>Productos originales / DK</span>
          </figcaption>
        </figure>
        <div data-reveal>
          <SectionHeading id="business-heading" {...content.business}>
            <p>{content.business.body}</p>
          </SectionHeading>
          <ActionLink {...content.business.action} variant="secondary" />
        </div>
      </div>
      <div className="dk2-business-paths">
        {content.businessPaths.map((path, index) => (
          <article key={path.title} data-reveal>
            <div className="dk2-business-path-top">
              <p className="dk2-eyebrow">{path.eyebrow}</p>
              <span aria-hidden="true">0{index + 1}</span>
            </div>
            <h3>{path.title}</h3>
            <p>{path.body}</p>
            <ActionLink {...path.action} />
          </article>
        ))}
      </div>
    </section>
  )
}

function CircularCommitment() {
  return (
    <section
      className="dk2-impact"
      aria-labelledby="impact-heading"
      data-home-section="S09"
    >
      <div className="dk2-container dk2-impact-inner">
        <svg
          className="dk2-impact-art"
          viewBox="0 0 1200 250"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M560 242C646 183 673 178 751 184S852 111 931 110s144 68 257-74" />
          <path d="M593 250c88-61 122-26 192-56s84-99 163-82 139 40 258-98" />
          <path d="M719 250c45-38 98-20 149-53s66-69 134-51 114 23 203-58" />
          <circle cx="751" cy="184" r="3" />
          <circle cx="931" cy="110" r="4" />
          <circle cx="1002" cy="146" r="3" />
        </svg>
        <div className="dk2-impact-masthead" data-reveal>
          <div className="dk2-impact-intro">
            <div className="dk2-impact-title">
              <p className="dk2-impact-eyebrow">
                <span className="dk2-impact-mark" aria-hidden="true" />
                {content.impact.eyebrow}
                <span aria-hidden="true">/</span>
                <span>Economía circular</span>
              </p>
              <h2 id="impact-heading">{content.impact.title}</h2>
            </div>
            <Image
              src="/images/brand/logo-dk-impact.png"
              alt="Logotipo circular original de BioProductos DK"
              width={1254}
              height={1254}
              sizes="(max-width: 699px) 145px, (max-width: 899px) 170px, 205px"
              className="dk2-impact-logo"
              loading="lazy"
            />
          </div>
        </div>
        <div className="dk2-impact-track" data-reveal>
          <ol className="dk2-impact-sequence" aria-label="Enfoque circular">
            <li>
              <span aria-hidden="true">01</span>Materia orgánica
              <svg
                className="dk2-impact-step-art"
                viewBox="0 0 32 32"
                aria-hidden="true"
                focusable="false"
              >
                <path d="M26 6C14 6 6 11 6 20a6 6 0 0 0 6 6C21 26 26 18 26 6Z" />
                <path d="M8 24c4-5 9-9 15-12" />
              </svg>
            </li>
            <li>
              <span aria-hidden="true">02</span>Ciencia aplicada
              <svg
                className="dk2-impact-step-art"
                viewBox="0 0 32 32"
                aria-hidden="true"
                focusable="false"
              >
                <path d="M12 4h8m-6 0v9L7 24a3 3 0 0 0 2.6 4h12.8a3 3 0 0 0 2.6-4l-7-11V4" />
                <path d="M10 21h12m-7-4h2" />
              </svg>
            </li>
            <li>
              <span aria-hidden="true">03</span>Nueva utilidad
              <svg
                className="dk2-impact-step-art"
                viewBox="0 0 32 32"
                aria-hidden="true"
                focusable="false"
              >
                <path d="M25 13a9 9 0 0 0-15-6L7 10m0-5v5h5M7 19a9 9 0 0 0 15 6l3-3m0 5v-5h-5" />
              </svg>
            </li>
          </ol>
          <Link className="dk2-impact-cta" href={content.impact.action.href}>
            <span>{content.impact.action.label}</span>
            <span className="dk2-impact-cta-icon" aria-hidden="true">
              ↗
            </span>
          </Link>
        </div>
        <div className="dk2-impact-footer">
          <p className="dk2-impact-caveat">
            La colaboración con residuos requiere coordinación y un protocolo
            acordado con DK. Aún no hay recepción pública habilitada.
          </p>
          <Link className="dk2-impact-contact" href="/contacto">
            Hablemos de colaboración <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </section>
  )
}

function FoundersTeaser() {
  return (
    <section
      className="dk2-founders dk2-section dk2-container"
      aria-labelledby="founders-heading"
      data-home-section="S10"
    >
      <div className="dk2-human-visual" data-reveal>
        <figure className="dk2-founders-photo">
          <HomePhoto
            id="home-founders"
            sizes="(max-width: 699px) calc(100vw - 40px), 45vw"
          />
          <figcaption>Las fundadoras / BioProductos DK</figcaption>
        </figure>
        <div className="dk2-human-note">
          <span className="dk2-eyebrow">La ciencia también es esto.</span>
          <p>
            Curiosidad.
            <br />
            Convicción.
            <br />
            <em>Personas.</em>
          </p>
        </div>
      </div>
      <div className="dk2-editorial-copy" data-reveal>
        <SectionHeading id="founders-heading" {...content.founders}>
          <p>{content.founders.body}</p>
        </SectionHeading>
        <p className="dk2-founders-purpose">
          Acercar la investigación a la vida cotidiana. Ese es el propósito que
          da sentido al camino.
        </p>
        <ActionLink {...content.founders.action} variant="secondary" />
        <div className="dk2-human-signature">
          <span>
            BioProductos <strong>DK</strong>
          </span>
          <span>Ciencia. Personas. Propósito.</span>
        </div>
      </div>
    </section>
  )
}

export default function EditorialHome() {
  return (
    <main id="contenido" tabIndex={-1}>
      <Hero />
      <Pillars />
      <ProductFamilyPreview />
      <ResearchTeaser />
      <BusinessTeaser />
      <CircularCommitment />
      <FoundersTeaser />
    </main>
  )
}
