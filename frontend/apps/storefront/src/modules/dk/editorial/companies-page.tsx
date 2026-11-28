import Link from "next/link"
import { publicContact } from "../../../content/site"
import { HomePhoto, homePhotoBackdrop } from "./primitives"
import CompanyForm from "./company-form"
import styles from "./companies-page.module.css"

// Los botones llevan al formulario conectado a la API de Django
// (antes abrían un mailto). Con ?tipo=… el formulario llega preseleccionado.
const formHref = "#solicitud-empresa"
const formHrefFor = (tipo: string) => `?tipo=${tipo}${formHref}`

const paths = [
  {
    number: "01",
    type: "COMERCIO · PUNTO DE VENTA",
    title: "Productos DK, más cerca de tu comunidad.",
    text: "Si tienes un comercio y te interesa ofrecer productos BioProductos DK, conversemos sobre tu espacio, tus clientes y la forma de trabajar juntos.",
    detail:
      "Los puntos de venta se incorporarán a la guía pública una vez confirmados sus datos y autorizada su publicación.",
    action: "Quiero vender productos DK",
    tipo: "punto_venta",
    accent: "retail",
  },
  {
    number: "02",
    type: "DISTRIBUCIÓN",
    title: "Una relación comercial que se conversa.",
    text: "Para biodistribuidores y organizaciones interesadas en explorar una relación con DK. Cada propuesta se revisa directamente según el contexto de ambas partes.",
    detail:
      "Las condiciones, el catálogo y el alcance se revisan caso a caso. Esta página no ofrece territorios ni condiciones preestablecidas.",
    action: "Conversar sobre distribución",
    tipo: "distribucion",
    accent: "distribution",
  },
  {
    number: "03",
    type: "EMPRESAS · INSTITUCIONES",
    title: "Hablemos de lo que tu organización necesita.",
    text: "Si buscas alternativas de limpieza o cuidado personal para tu organización, puedes escribir al equipo y contarle qué necesitas evaluar.",
    detail:
      "Los precios publicados en el catálogo corresponden al canal de venta directa. Las consultas de empresa se revisan de forma directa.",
    action: "Enviar una consulta de empresa",
    tipo: "organizacion",
    accent: "organization",
  },
] as const

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M4.5 15.5 15 5" />
      <path d="M6 5h9v9" />
    </svg>
  )
}

function PathIcon({ kind }: { kind: string }) {
  if (kind === "retail") {
    return (
      <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <path d="M8 20h32l-3-10H11L8 20Z" />
        <path d="M11 20v18h26V20M18 38V26h12v12" />
        <path d="M8 20c0 3 5 4 8 1 2 3 7 3 9 0 2 3 7 3 9 0 3 3 6 2 6-1" />
      </svg>
    )
  }
  if (kind === "distribution") {
    return (
      <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <path d="M6 15h22v20H6zM28 22h8l7 8v5H28z" />
        <circle cx="15" cy="37" r="4" />
        <circle cx="36" cy="37" r="4" />
        <path d="M11 21h12M11 26h8" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="M24 7 40 16v17l-16 9-16-9V16l16-9Z" />
      <path d="M8 16l16 9 16-9M24 25v17M16 12l16 9" />
      <circle cx="24" cy="25" r="3" />
    </svg>
  )
}

export default function CompaniesPage() {
  return (
    <main id="contenido" className={styles.page}>
      <section className={styles.hero} aria-labelledby="companies-title">
        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>
              <span className={styles.eyebrowMark} aria-hidden="true" />
              BIOPRODUCTOS DK <i>/</i> EMPRESAS
            </p>
            <h1 id="companies-title">
              Una buena relación comercial <em>empieza conversando.</em>
            </h1>
            <p className={styles.heroLead}>
              Una puerta de entrada para comercios, distribuidores y
              organizaciones que quieren conocer los productos DK y explorar una
              oportunidad de colaboración.
            </p>
            <div className={styles.heroActions}>
              <a className={styles.primaryAction} href={formHref}>
                Conversemos sobre una alianza <ArrowIcon />
              </a>
              <Link className={styles.secondaryAction} href="/productos">
                Conocer los productos <span aria-hidden="true">↓</span>
              </Link>
            </div>
            <div className={styles.heroNote}>
              <span className={styles.noteDot} />
              Atención directa · Santiago, Chile
            </div>
          </div>

          <div className={styles.heroVisual}>
            <div
              className={`${styles.photoFrame} dk2-photo-fit`}
              style={homePhotoBackdrop("home-business")}
            >
              <HomePhoto
                id="home-business"
                className={styles.heroPhoto}
                sizes="(max-width: 900px) 90vw, 48vw"
                priority
              />
              <div className={styles.photoCaption}>
                <span>01 — PORTAFOLIO DK</span>
                <b>Limpieza y cuidado personal</b>
              </div>
            </div>
            <div className={styles.visualTag}>
              <span className={styles.tagGlyph} aria-hidden="true">
                DK
              </span>
              <span>
                <b>Ciencia aplicada</b>
                <small>en productos cotidianos</small>
              </span>
            </div>
            <span className={styles.visualIndex} aria-hidden="true">
              DK / 01
            </span>
          </div>
        </div>
        <nav className={styles.sectionNav} aria-label="En esta página">
          <span>PARA CADA FORMA DE COLABORAR</span>
          <a href="#alternativas">
            Alternativas <b>01</b>
          </a>
          <a href="#catalogo">
            Productos <b>02</b>
          </a>
          <a href="#conversacion">
            Contacto <b>03</b>
          </a>
        </nav>
      </section>

      <section
        id="alternativas"
        className={styles.routes}
        aria-labelledby="routes-title"
      >
        <div className={styles.sectionHead}>
          <div>
            <p className={styles.sectionLabel}>COLABORACIÓN COMERCIAL</p>
            <h2 id="routes-title">¿Cómo te gustaría acercarte a DK?</h2>
          </div>
          <p>
            Cada organización tiene una realidad distinta. El primer paso es
            contarnos quién eres y qué oportunidad te interesa explorar.
          </p>
        </div>

        <div className={styles.pathList}>
          {paths.map((path) => (
            <article
              className={`${styles.path} ${styles[`path--${path.accent}`]}`}
              key={path.number}
            >
              <div className={styles.pathNumber}>
                {path.number}
                <span>/ 03</span>
              </div>
              <div className={styles.pathIcon}>
                <PathIcon kind={path.accent} />
              </div>
              <div className={styles.pathContent}>
                <p className={styles.pathType}>{path.type}</p>
                <h3>{path.title}</h3>
                <p className={styles.pathText}>{path.text}</p>
                <p className={styles.pathDetail}>{path.detail}</p>
              </div>
              <a className={styles.pathAction} href={formHrefFor(path.tipo)}>
                {path.action}
                <ArrowIcon />
              </a>
            </article>
          ))}
        </div>
      </section>

      <section
        className={styles.catalogBand}
        id="catalogo"
        aria-labelledby="catalog-title"
      >
        <div className={styles.catalogIntro}>
          <p className={styles.sectionLabel}>UN PORTAFOLIO CON IDENTIDAD</p>
          <h2 id="catalog-title">Conoce primero lo que hacemos.</h2>
          <p>
            El catálogo reúne productos de limpieza para el hogar y alternativas
            de cuidado personal, incluida cosmética sólida. La oferta visible
            puede revisarse en la página de Productos.
          </p>
          <Link className={styles.catalogLink} href="/productos">
            Explorar el catálogo <ArrowIcon />
          </Link>
        </div>
        <div className={styles.catalogManifesto}>
          <span className={styles.manifestoTop}>
            BIOPRODUCTOS DK <i>·</i> CIENCIA APLICADA
          </span>
          <p>
            Del conocimiento
            <br />a lo cotidiano.
          </p>
          <div className={styles.manifestoFoot}>
            <span>LIMPIEZA DEL HOGAR</span>
            <b>+</b>
            <span>CUIDADO PERSONAL</span>
          </div>
          <span className={styles.manifestoOrb} aria-hidden="true" />
        </div>
      </section>

      <section className={styles.retailSection} aria-labelledby="retail-title">
        <div className={styles.retailHeading}>
          <p className={styles.sectionLabel}>RED DE PUNTOS DE VENTA</p>
          <h2 id="retail-title">Que encontrar DK sea cada vez más fácil.</h2>
          <p>
            BioProductos DK quiere acercar sus productos a más espacios y
            comunidades. Los comercios podrán aparecer en una guía con su
            nombre, dirección y marca cuando la información esté confirmada y
            autorizada.
          </p>
          <Link href="/donde-comprar" className={styles.retailLink}>
            Ver información de puntos de venta <ArrowIcon />
          </Link>
        </div>
        <div className={styles.retailCard}>
          <div className={styles.mapLines} aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
            <i className={styles.mapPin}>
              <b />
            </i>
          </div>
          <div className={styles.retailCardCopy}>
            <span className={styles.cardIndex}>DK / RED ABIERTA</span>
            <h3>¿Tienes un local?</h3>
            <p>
              Conversemos para conocer tu comercio y evaluar una posible
              colaboración.
            </p>
            <a href={formHrefFor("punto_venta")}>
              Presentar mi comercio <ArrowIcon />
            </a>
          </div>
          <span className={styles.retailFoot}>
            CHILE <i>·</i> INFORMACIÓN POR CONFIRMAR
          </span>
        </div>
      </section>

      <section className={styles.howSection} aria-labelledby="how-title">
        <div className={styles.howTitle}>
          <p className={styles.sectionLabel}>UNA CONVERSACIÓN CLARA</p>
          <h2 id="how-title">Partamos por tu idea.</h2>
          <p>
            Escríbenos directamente. Así el equipo puede conocer tu contexto
            antes de conversar alternativas.
          </p>
        </div>
        <ol className={styles.steps}>
          <li>
            <span>01</span>
            <div>
              <b>Cuéntanos quién eres</b>
              <p>Nombre del comercio u organización y dónde está.</p>
            </div>
          </li>
          <li>
            <span>02</span>
            <div>
              <b>Comparte tu interés</b>
              <p>
                Venta en tienda, distribución, abastecimiento u otra propuesta.
              </p>
            </div>
          </li>
          <li>
            <span>03</span>
            <div>
              <b>Revisemos opciones</b>
              <p>
                Las condiciones se conversan directamente y según cada caso.
              </p>
            </div>
          </li>
        </ol>
      </section>

      <CompanyForm />

      <section
        id="conversacion"
        className={styles.contactBand}
        aria-labelledby="contact-title"
      >
        <div className={styles.contactCopy}>
          <p className={styles.sectionLabel}>
            EMPRESAS · COMERCIO · COLABORACIÓN
          </p>
          <h2 id="contact-title">
            Construyamos una relación comercial con sentido.
          </h2>
          <p>
            Cuéntanos qué necesita tu organización y qué oportunidad te gustaría
            explorar con BioProductos DK.
          </p>
        </div>
        <a className={styles.contactAction} href={formHref}>
          Iniciar conversación comercial <ArrowIcon />
        </a>
        <a
          className={styles.contactEmail}
          href={`mailto:${publicContact.email}`}
        >
          {publicContact.email}
        </a>
      </section>
    </main>
  )
}
