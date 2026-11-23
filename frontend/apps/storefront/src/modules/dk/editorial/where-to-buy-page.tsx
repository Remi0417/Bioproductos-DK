import Link from "next/link"
import styles from "./where-to-buy-page.module.css"

const mapsUrl =
  "https://www.google.com/maps/place/Papa+Juan+Pablo+I+2104,+9710000+Padre+Hurtado,+Regi%C3%B3n+Metropolitana/@-33.5776268,-70.8332212,17z/data=!3m1!4b1!4m6!3m5!1s0x9662e76bf0b807d1:0xc0f011dd8ae38477!8m2!3d-33.5776313!4d-70.8306463!16s%2Fg%2F11q3ltpgmv"
const embeddedMapUrl =
  "https://maps.google.com/maps?q=Papa+Juan+Pablo+I+2104,+9710000+Padre+Hurtado,+Regi%C3%B3n+Metropolitana&t=&z=17&ie=UTF8&iwloc=&output=embed"

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" />
      <circle cx="12" cy="10" r="2.3" />
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M4.5 15.5 15 5M6 5h9v9" />
    </svg>
  )
}

export default function WhereToBuyPage() {
  return (
    <main id="contenido" className={styles.page}>
      <section className={styles.hero} aria-labelledby="location-title">
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>
              <span aria-hidden="true" /> BIOPRODUCTOS DK <i>/</i> UBICACIÓN
            </p>
            <h1 id="location-title">
              Ven a encontrarnos.
              <br />
              <em>Te esperamos en DK.</em>
            </h1>
            <p className={styles.lead}>
              Visítanos en nuestra ubicación de Padre Hurtado. Revisa el mapa y
              encuentra la ruta más cómoda para llegar.
            </p>
            <div className={styles.locationChip}>
              <span className={styles.pinIcon}>
                <PinIcon />
              </span>
              <span>
                <small>DIRECCIÓN</small>
                <b>Papa Juan Pablo I 2104</b>
                <small>9710000 Padre Hurtado · Región Metropolitana</small>
              </span>
            </div>
            <a
              className={styles.directionsButton}
              href={mapsUrl}
              target="_blank"
              rel="noreferrer"
            >
              Cómo llegar en Google Maps <ArrowIcon />
            </a>
            <p className={styles.visitNote}>
              Abre las indicaciones para revisar tu recorrido antes de salir.
            </p>
          </div>

          <div className={styles.mapShell}>
            <div className={styles.mapHeader}>
              <div className={styles.mapBrand}>
                <span>
                  <PinIcon />
                </span>
                <div>
                  <b>BioProductos DK</b>
                  <small>Ubicación compartida</small>
                </div>
              </div>
              <span className={styles.mapStatus}>
                <i /> MAPA INTERACTIVO
              </span>
            </div>
            <div className={styles.mapFrame}>
              <iframe
                title="Google Maps interactivo: BioProductos DK, Papa Juan Pablo I 2104, Padre Hurtado"
                src={embeddedMapUrl}
                loading="eager"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <a
                className={styles.mapOpenOverlay}
                href={mapsUrl}
                target="_blank"
                rel="noreferrer"
              >
                Abrir mapa completo <ArrowIcon />
              </a>
            </div>
            <div className={styles.mapFooter}>
              <span>
                GOOGLE MAPS <i>·</i> PADRE HURTADO
              </span>
              <span>
                01 <b>/</b> 01
              </span>
            </div>
          </div>
        </div>
        <div className={styles.heroBottom}>
          <span>UNA VISITA, UNA CONVERSACIÓN</span>
          <span>
            BioProductos DK <i>·</i> Padre Hurtado, Chile
          </span>
        </div>
      </section>

      <section className={styles.visitSection} aria-labelledby="visit-title">
        <div className={styles.visitIntro}>
          <p className={styles.sectionLabel}>ANTES DE VENIR</p>
          <h2 id="visit-title">Planea tu recorrido con tranquilidad.</h2>
          <p>
            Estamos en Papa Juan Pablo I 2104, 9710000 Padre Hurtado. Usa el
            mapa para comprobar la ruta y las indicaciones actualizadas antes de
            salir.
          </p>
        </div>
        <div className={styles.visitDetails}>
          <article>
            <span>01</span>
            <div>
              <b>Abre el mapa</b>
              <p>La dirección es Papa Juan Pablo I 2104, Padre Hurtado.</p>
            </div>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Abrir la ubicación exacta en Google Maps"
            >
              <ArrowIcon />
            </a>
          </article>
          <article>
            <span>02</span>
            <div>
              <b>Revisa cómo llegar</b>
              <p>
                Google Maps te permite elegir tu punto de partida y medio de
                transporte.
              </p>
            </div>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Ver indicaciones para llegar en Google Maps"
            >
              <ArrowIcon />
            </a>
          </article>
          <article>
            <span>03</span>
            <div>
              <b>¿Tienes una consulta?</b>
              <p>
                Escríbenos antes de visitarnos para coordinar tu contacto con el
                equipo.
              </p>
            </div>
            <a
              href="mailto:biocontacto@bioproductosdk.com"
              aria-label="Enviar correo a BioProductos DK"
            >
              <ArrowIcon />
            </a>
          </article>
        </div>
      </section>

      <section className={styles.endBand}>
        <div>
          <p className={styles.sectionLabel}>
            BIOPRODUCTOS DK <i>/</i> SANTIAGO, CHILE
          </p>
          <h2>
            El mapa te guía.
            <br />
            <em>La conversación empieza aquí.</em>
          </h2>
        </div>
        <Link href="/empresas" className={styles.endLink}>
          Conocer opciones para empresas <ArrowIcon />
        </Link>
      </section>
    </main>
  )
}
