import Link from "next/link"
import { HomePhoto } from "./primitives"
import styles from "./nosotras-page.module.css"

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M4.5 15.5 15 5M6 5h9v9" />
    </svg>
  )
}

function SparkIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M16 3v8m0 10v8M3 16h8m10 0h8M6.8 6.8l5.7 5.7m7 7 5.7 5.7m0-18.4-5.7 5.7m-7 7-5.7 5.7" />
      <circle cx="16" cy="16" r="4.5" />
    </svg>
  )
}

function CycleIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M25.8 12A10.5 10.5 0 0 0 7 8l-2 2m0 0V5m0 5h5m-3.8 10A10.5 10.5 0 0 0 25 24l2-2m0 0v5m0-5h-5" />
    </svg>
  )
}

function HeartCareIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M16 27s-11-6.4-11-14a6 6 0 0 1 11-3.3A6 6 0 0 1 27 13c0 7.6-11 14-11 14Z" />
      <path d="M10 16h3l2-4 3 8 2-4h2" />
    </svg>
  )
}

const principles = [
  {
    number: "01",
    title: "Mirar con curiosidad",
    body: "Preguntarse qué posibilidades existen en materiales que solemos descartar fue parte del punto de partida.",
    icon: <SparkIcon />,
    tone: "curiosity",
  },
  {
    number: "02",
    title: "Investigar con propósito",
    body: "La biotecnología y la nanotecnología acercan el conocimiento científico a la búsqueda de nuevos desarrollos.",
    icon: <CycleIcon />,
    tone: "science",
  },
  {
    number: "03",
    title: "Cuidar cada etapa",
    body: "La experiencia del equipo conecta preparación, experimentación y desarrollo, respetando las características de cada material.",
    icon: <HeartCareIcon />,
    tone: "care",
  },
]

const milestones = [
  {
    marker: "2020",
    title: "Una pregunta en un tiempo incierto.",
    body: "En plena pandemia, sus fundadoras comenzaron postulando a un proyecto de innovación para desarrollar detergentes a partir de la reutilización de residuos orgánicos agroindustriales.",
    label: "EL PRIMER PASO",
  },
  {
    marker: "DK",
    title: "La idea encontró cómo empezar.",
    body: "El fondo de innovación obtenido permitió dar inicio formal a BioProductos DK SpA. La investigación dejó de ser solo una inquietud y encontró un espacio para tomar forma.",
    label: "UNA INICIATIVA QUE CRECE",
  },
  {
    marker: "I+D",
    title: "La ciencia llegó a la vida cotidiana.",
    body: "Los primeros desarrollos fueron detergentes vinculados a la revalorización de materiales orgánicos y el trabajo con nanoemulsiones. La visita de terreno también mostró una búsqueda que hoy incluye limpieza y cuidado personal.",
    label: "DEL ORIGEN A NUEVOS DESARROLLOS",
  },
]

export default function NosotrasPage() {
  return (
    <main id="contenido" className={styles.page}>
      <section className={styles.hero} aria-labelledby="about-title">
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>
              <span aria-hidden="true" /> BIOPRODUCTOS DK <i>/</i> NUESTRA
              HISTORIA
            </p>
            <h1 id="about-title">
              Una idea que creció
              <br />
              <em>con ciencia y cuidado.</em>
            </h1>
            <p className={styles.heroLead}>
              Dos mujeres, una convicción compartida y muchas ganas de hacer
              algo distinto: explorar cómo la ciencia puede abrir nuevas
              posibilidades para cuidar lo cotidiano.
            </p>
            <div className={styles.heroActions}>
              <a className={styles.primaryAction} href="#historia">
                Recorrer nuestra historia <span aria-hidden="true">↓</span>
              </a>
              <Link className={styles.textAction} href="/bio-investigacion">
                La ciencia detrás de DK <ArrowIcon />
              </Link>
            </div>
            <div className={styles.heroSignature}>
              <span className={styles.signatureLine} />
              <span>Una historia que sigue en movimiento</span>
            </div>
          </div>

          <figure className={styles.portrait}>
            <HomePhoto
              id="home-founders"
              className={styles.portraitImage}
              sizes="(max-width: 720px) 86vw, (max-width: 1100px) 44vw, 520px"
              priority
            />
            <figcaption className={styles.photoCaption}>
              <span className={styles.captionMark} aria-hidden="true">
                DK
              </span>
              <span>
                <b>Las personas detrás de la idea</b>
                <small>Fundadoras de BioProductos DK</small>
              </span>
              <span className={styles.captionIndex}>01 — 03</span>
            </figcaption>
            <span className={styles.photoOrbit} aria-hidden="true" />
            <span className={styles.photoNote} aria-hidden="true">
              CIENCIA <i>·</i> CONVICCIÓN <i>·</i> CUIDADO
            </span>
          </figure>
        </div>
        <div className={styles.heroFoot}>
          <span>DE UNA PREGUNTA A UN PROYECTO PROPIO</span>
          <span>
            PADRE HURTADO <i>·</i> CHILE
          </span>
        </div>
      </section>

      <section className={styles.manifesto} aria-label="La convicción de DK">
        <div className={styles.manifestoInner}>
          <span className={styles.manifestoSymbol} aria-hidden="true">
            “
          </span>
          <p>
            Limpiar sin ensuciar.
            <br />
            <em>Con ciencia, se puede lograr.</em>
          </p>
          <span className={styles.manifestoNote}>
            UNA IDEA QUE GUÍA A BIOPRODUCTOS DK
          </span>
          <svg
            className={styles.manifestoLines}
            viewBox="0 0 440 230"
            fill="none"
            aria-hidden="true"
          >
            <path d="M440 14C322 14 352 216 232 216S142 46 0 46" />
            <path d="M440 36C338 36 363 194 244 194S140 68 0 68" />
            <path d="M440 58C352 58 374 172 256 172S140 90 0 90" />
          </svg>
        </div>
      </section>

      <section
        id="historia"
        className={styles.story}
        aria-labelledby="story-title"
      >
        <div className={styles.storyIntro}>
          <p className={styles.eyebrow}>
            EL COMIENZO <i>/</i> 2020
          </p>
          <h2 id="story-title">
            No partió con una respuesta.
            <br />
            <em>Partió con una pregunta.</em>
          </h2>
          <p>
            ¿Y si aquello que queda fuera del ciclo pudiera convertirse en el
            comienzo de algo nuevo? Desde esa inquietud, sus fundadoras buscaron
            unir investigación, materiales orgánicos y necesidades cotidianas.
          </p>
          <p>
            No fue un camino de un día. Fue imaginar, aprender, ordenar el
            trabajo y seguir probando hasta acercar una idea científica a
            productos que acompañan la vida diaria.
          </p>
        </div>

        <div className={styles.timeline} aria-label="Hitos de la historia DK">
          {milestones.map((milestone, index) => (
            <article className={styles.milestone} key={milestone.marker}>
              <div className={styles.timelineMarker}>
                <span>{milestone.marker}</span>
                {index < milestones.length - 1 && (
                  <i className={styles.timelineStem} aria-hidden="true" />
                )}
              </div>
              <div className={styles.milestoneCopy}>
                <p className={styles.milestoneLabel}>{milestone.label}</p>
                <h3>{milestone.title}</h3>
                <p>{milestone.body}</p>
              </div>
              <span className={styles.milestoneNumber}>0{index + 1}</span>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.values} aria-labelledby="values-title">
        <div className={styles.valuesHeading}>
          <div>
            <p className={styles.eyebrow}>
              LO QUE NOS MUEVE <i>/</i> ADN DK
            </p>
            <h2 id="values-title">
              Ciencia con sentido.
              <br />
              <em>Cuidado en cada decisión.</em>
            </h2>
          </div>
          <p>
            Detrás de cada desarrollo hay una manera de mirar: con curiosidad,
            rigor y respeto por el origen de los materiales.
          </p>
        </div>

        <div className={styles.principles}>
          {principles.map((principle) => (
            <article
              className={`${styles.principle} ${styles[principle.tone]}`}
              key={principle.number}
            >
              <div className={styles.principleTop}>
                <span className={styles.principleNumber}>
                  {principle.number} <i>/ DK</i>
                </span>
                <span className={styles.principleIcon}>{principle.icon}</span>
              </div>
              <h3>{principle.title}</h3>
              <p>{principle.body}</p>
              <span className={styles.principleRule} aria-hidden="true" />
            </article>
          ))}
        </div>
      </section>

      <section className={styles.work} aria-labelledby="work-title">
        <div className={styles.workVisual}>
          <div className={styles.workPhotoFrame}>
            <HomePhoto
              id="home-hero"
              className={styles.workPhoto}
              sizes="(max-width: 720px) 90vw, 45vw"
            />
            <span className={styles.workPhotoLabel}>
              DE LA INVESTIGACIÓN A LO COTIDIANO
            </span>
          </div>
          <div className={styles.workStamp}>
            <span>DK</span>
            <i>CIENCIA</i>
            <i>Y CUIDADO</i>
          </div>
        </div>
        <div className={styles.workCopy}>
          <p className={styles.eyebrow}>UN TRABAJO COMPARTIDO</p>
          <h2 id="work-title">Crecer también es aprender a organizarse.</h2>
          <p>
            En la visita, el equipo mostró cómo cada material requiere atención
            propia y cómo el trabajo de laboratorio se organiza por etapas y
            espacios. Esa dedicación —preparar, observar, probar y revisar— es
            parte de la historia que hay detrás de cada desarrollo.
          </p>
          <p>
            Y nada de esto se construye en soledad: la empresa también ha
            compartido experiencias de colaboración con otras organizaciones
            para realizar análisis y explorar prototipos.
          </p>
          <Link href="/bio-investigacion" className={styles.workLink}>
            Conocer Bio Investigación <ArrowIcon />
          </Link>
          <div className={styles.workNote}>
            <span>OBSERVAR</span>
            <i aria-hidden="true">·</i>
            <span>APRENDER</span>
            <i aria-hidden="true">·</i>
            <span>SEGUIR CRECIENDO</span>
          </div>
        </div>
      </section>

      <section className={styles.closing} aria-labelledby="closing-title">
        <span className={styles.closingGlow} aria-hidden="true" />
        <div className={styles.closingCopy}>
          <p className={styles.eyebrow}>UNA HISTORIA QUE SIGUE</p>
          <h2 id="closing-title">
            Lo que empezó como una idea
            <br />
            <em>todavía tiene mucho por crear.</em>
          </h2>
          <p>
            La convicción permanece: poner la ciencia al servicio de nuevas
            posibilidades y acercarla, con cuidado, a la vida de las personas.
          </p>
        </div>
        <div className={styles.closingActions}>
          <Link href="/productos" className={styles.primaryAction}>
            Explorar productos <ArrowIcon />
          </Link>
          <Link href="/bio-investigacion" className={styles.closingSecondary}>
            Seguir el recorrido científico <ArrowIcon />
          </Link>
        </div>
        <p className={styles.closingFoot}>
          BIOPRODUCTOS DK <i>·</i> CIENCIA, INNOVACIÓN Y CUIDADO
        </p>
      </section>
    </main>
  )
}
