import Link from "next/link"
import { HomePhoto } from "./primitives"
import ResearchMaterialExplorer from "./research-material-explorer"
import ResearchFeatureBanner from "./research-feature-banner"
import styles from "./bio-investigacion-page.module.css"

const researchLines = [
  {
    number: "01",
    name: "Biotecnología aplicada",
    short: "Leer la materia orgánica desde sus componentes.",
    description:
      "Cáscaras, borra de café y hojas son algunos de los materiales mencionados por el equipo. La investigación busca reconocer componentes de interés y explorar nuevas posibilidades de uso.",
    tone: "sage",
  },
  {
    number: "02",
    name: "Nanotecnología",
    short: "Investigar cómo cambia la materia a pequeña escala.",
    description:
      "En la visita se describió el trabajo con nanoemulsiones como una estrategia para encapsular componentes activos y explorar cómo incorporarlos en desarrollos.",
    tone: "blue",
  },
  {
    number: "03",
    name: "Desarrollo y prototipado",
    short: "Convertir preguntas en formulaciones por explorar.",
    description:
      "La experiencia del equipo combina plantas, química, cosmética, nuevos materiales y desarrollo de productos. Cada aplicación depende de la materia prima y del propósito del proyecto.",
    tone: "amber",
  },
]

export default function BioInvestigacionPage() {
  return (
    <main id="contenido" className={styles.page}>
      <section className={styles.hero} aria-labelledby="research-title">
        <div className={styles.heroArt} aria-hidden="true">
          <span />
          <span />
          <span />
          <i />
        </div>
        <div className={`${styles.wrap} ${styles.heroGrid}`}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>
              <span className={styles.signal} /> Bio Investigación · I+D
            </p>
            <h1 id="research-title">
              La ciencia comienza <em>en la materia.</em>
            </h1>
            <p className={styles.heroLead}>
              BioProductos DK investiga materiales orgánicos y explora sus
              posibilidades de aplicación. Su trabajo reúne biotecnología,
              nanotecnología y desarrollo experimental, desde la preparación de
              cada material hasta la exploración de prototipos.
            </p>
            <div className={styles.heroActions}>
              <Link className={styles.buttonPrimary} href="#materia">
                Explorar materiales <span aria-hidden="true">↓</span>
              </Link>
              <Link className={styles.buttonText} href="/contacto">
                Proponer colaboración <span aria-hidden="true">↗</span>
              </Link>
            </div>
            <ul
              className={styles.heroFocus}
              aria-label="Áreas de investigación"
            >
              <li>
                <span>01</span> Material orgánico
              </li>
              <li>
                <span>02</span> Nanoemulsiones
              </li>
              <li>
                <span>03</span> Prototipado
              </li>
            </ul>
          </div>
          <figure className={styles.heroMedia}>
            <HomePhoto
              id="home-hero"
              className={styles.heroPhoto}
              sizes="(max-width: 850px) 100vw, 52vw"
            />
            <figcaption>
              <span>De la investigación a la vida cotidiana</span>
              <span>BioProductos DK</span>
            </figcaption>
            <div className={styles.mediaNote}>
              <span className={styles.noteDot} />
              Ciencia aplicada
            </div>
          </figure>
        </div>
        <nav className={styles.sectionNav} aria-label="En esta página">
          <div className={styles.wrap}>
            <a href="#enfoque">Enfoque</a>
            <a href="#materia">Materiales</a>
            <a href="#investigacion-en-accion">La ciencia DK</a>
            <a href="#trayectoria">Trayectoria</a>
            <a href="#colaborar">Colaboración</a>
          </div>
        </nav>
      </section>

      <section id="enfoque" className={`${styles.section} ${styles.intro}`}>
        <div className={styles.wrap}>
          <div className={styles.introHeading}>
            <p className={styles.kicker}>La pregunta antes del producto</p>
            <h2>
              No empieza en la estantería.
              <br />
              <span>Empieza en lo que aún podemos descubrir.</span>
            </h2>
          </div>
          <div className={styles.introBody}>
            <p>
              BioProductos DK nació a partir de una iniciativa de innovación
              enfocada en desarrollar productos de limpieza desde la
              revalorización de materiales orgánicos. En la visita, el equipo
              describió una forma de trabajo que conecta observación,
              experimentación y desarrollo.
            </p>
            <p>
              Esta página reúne ese recorrido: desde la pregunta científica
              hasta la exploración de aplicaciones, con una mirada clara y
              respetuosa por los límites de cada material y cada proyecto.
            </p>
          </div>
          <div className={styles.domainGrid}>
            {researchLines.map((line) => (
              <article
                className={`${styles.domainCard} ${styles[line.tone]}`}
                key={line.number}
                data-testid="research-line"
              >
                <div className={styles.domainTop}>
                  <span>{line.number}</span>
                  <span aria-hidden="true">↗</span>
                </div>
                <h3>{line.name}</h3>
                <p className={styles.domainShort}>{line.short}</p>
                <p className={styles.domainDescription}>{line.description}</p>
                <div className={styles.domainMark} aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </div>
              </article>
            ))}
          </div>
          <p className={styles.sourceNote}>
            Las líneas de trabajo se describen a partir de la entrevista y del
            contenido institucional público. Sus aplicaciones concretas dependen
            de cada proyecto.
          </p>
        </div>
      </section>

      <ResearchMaterialExplorer />

      <ResearchFeatureBanner />

      <section className={`${styles.section} ${styles.mediaSection}`}>
        <div className={styles.wrap}>
          <div className={styles.mediaHeading}>
            <p className={styles.kicker}>Una mirada desde dentro</p>
            <h2>El laboratorio también cuenta historias.</h2>
            <p>
              Aquí tendrá lugar un recorrido audiovisual por los espacios,
              equipos y procesos de investigación de BioProductos DK.
            </p>
          </div>
          <figure
            className={styles.videoFrame}
            data-testid="research-video-slot"
          >
            <div className={styles.videoArtwork} aria-hidden="true">
              <div className={`${styles.videoOrb} ${styles.videoOrbOne}`} />
              <div className={`${styles.videoOrb} ${styles.videoOrbTwo}`} />
              <svg viewBox="0 0 900 420" fill="none">
                <path
                  d="M0 326h900M0 336h900"
                  stroke="currentColor"
                  opacity=".2"
                />
                <path
                  d="M193 326V174h99v152M228 174v-62h31v62M212 207h61M212 236h61M212 265h61"
                  stroke="currentColor"
                  strokeWidth="2"
                  opacity=".65"
                />
                <path
                  d="M401 326V220h83v106M422 220v-52h41v52M417 249h51M417 277h51"
                  stroke="currentColor"
                  strokeWidth="2"
                  opacity=".5"
                />
                <path
                  d="M600 326V198h113v128M625 198v-73h62v73M618 230h78M618 260h78M618 290h78"
                  stroke="currentColor"
                  strokeWidth="2"
                  opacity=".55"
                />
                <circle cx="450" cy="94" r="5" fill="currentColor" />
                <circle
                  cx="485"
                  cy="77"
                  r="3"
                  fill="currentColor"
                  opacity=".6"
                />
                <circle
                  cx="414"
                  cy="70"
                  r="3"
                  fill="currentColor"
                  opacity=".6"
                />
                <path
                  d="M450 94 414 70m36 24 35-17"
                  stroke="currentColor"
                  strokeDasharray="3 6"
                  opacity=".45"
                />
              </svg>
            </div>
            <div className={styles.videoOverlay}>
              <span className={styles.videoPlay} aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="m9 6 9 6-9 6V6Z" fill="currentColor" />
                </svg>
              </span>
              <span className={styles.videoMeta}>
                <strong>Recorrido por el laboratorio</strong>
                <small>
                  Espacio reservado para material audiovisual autorizado
                </small>
              </span>
              <span className={styles.videoStatus}>VIDEO / PRÓXIMAMENTE</span>
            </div>
            <figcaption>
              El proyecto no contiene aún un video del laboratorio. Este espacio
              queda preparado para integrar el archivo original cuando esté
              disponible.
            </figcaption>
          </figure>
        </div>
      </section>

      <section className={`${styles.section} ${styles.credibility}`}>
        <div className={styles.wrap}>
          <div className={styles.credibilityHead} id="trayectoria">
            <div>
              <p className={styles.kicker}>
                Trayectoria que merece ser contada
              </p>
              <h2>Proyectos, ideas y colaboración.</h2>
            </div>
            <p>
              La empresa ha expresado interés en visibilizar su participación en
              proyectos de innovación, marcas, patentes y colaboraciones.
              Publicaremos cada antecedente con respaldo y autorización.
            </p>
          </div>
          <div className={styles.credibilityGrid}>
            <article>
              <span>01 / PROYECTOS</span>
              <h3>De la idea al desarrollo</h3>
              <p>
                Fondos y proyectos de innovación forman parte del recorrido
                descrito por la empresa. Sus nombres, instituciones y resultados
                se incorporarán al contar con antecedentes aprobados.
              </p>
              <i aria-hidden="true">↗</i>
            </article>
            <article>
              <span>02 / PROPIEDAD INTELECTUAL</span>
              <h3>Marcas y tecnologías</h3>
              <p>
                En la entrevista se mencionaron marcas registradas y una
                patente. Los títulos, estados y alcances requieren verificación
                documental antes de publicarse.
              </p>
              <i aria-hidden="true">↗</i>
            </article>
            <article>
              <span>03 / COLABORACIÓN</span>
              <h3>Investigar en conjunto</h3>
              <p>
                La experiencia compartida incluye colaboración con actores
                estratégicos para análisis y experimentos orientados a
                prototipos y nuevos desarrollos.
              </p>
              <i aria-hidden="true">↗</i>
            </article>
          </div>
          <p className={styles.validationNote}>
            Los antecedentes específicos están en proceso de recopilación y
            revisión. Esta página no atribuye premios, licitaciones ni
            resultados sin documentación.
          </p>
        </div>
      </section>

      <section id="colaborar" className={`${styles.section} ${styles.cta}`}>
        <div className={`${styles.wrap} ${styles.ctaInner}`}>
          <div className={styles.ctaArt} aria-hidden="true">
            <span />
            <span />
            <span />
            <i>DK</i>
          </div>
          <div>
            <p className={styles.kicker}>Una pregunta puede ser el comienzo</p>
            <h2>¿Qué podríamos investigar en conjunto?</h2>
            <p>
              BioProductos DK está abierta a conversar sobre ideas y
              colaboraciones científicas. Cuéntanos brevemente qué te gustaría
              explorar.
            </p>
          </div>
          <Link className={styles.ctaButton} href="/contacto">
            Conversar sobre colaboración <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </main>
  )
}
