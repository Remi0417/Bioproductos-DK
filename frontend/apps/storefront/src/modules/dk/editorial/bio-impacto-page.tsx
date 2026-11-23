import Link from "next/link"
import styles from "./bio-impacto-page.module.css"

const materialStories = [
  {
    number: "01",
    name: "Borra de café",
    category: "Origen cafetero",
    description:
      "Un material mencionado en la experiencia de colaboración con cafeterías. Su separación desde el origen permite evaluar si puede tener un nuevo uso.",
    tone: "coffee",
  },
  {
    number: "02",
    name: "Cáscara de huevo",
    category: "Origen gastronómico",
    description:
      "La entrevista describe su recepción separada y su preparación previa en el laboratorio. La aplicación depende de cada investigación.",
    tone: "shell",
  },
  {
    number: "03",
    name: "Cáscaras de cítricos",
    category: "Origen agroindustrial",
    description:
      "Se mencionan cáscaras de limón y naranja dentro del trabajo con materiales orgánicos y de destilación por arrastre de vapor.",
    tone: "citrus",
  },
  {
    number: "04",
    name: "Cuescos y cáscaras",
    category: "Origen vegetal",
    description:
      "Cuescos de palta y cáscaras de nuez aparecen en el recorrido como materiales que requieren una preparación acorde a sus características.",
    tone: "seed",
  },
]

const circularPath = [
  {
    number: "01",
    title: "Acordar el origen",
    description:
      "La colaboración comienza identificando el material y quién lo genera. No se trata de mezclar residuos ni de recibir cualquier descarte.",
  },
  {
    number: "02",
    title: "Separar con intención",
    description:
      "En la experiencia descrita, cafeterías y reposterías reúnen materiales por separado. Cada flujo requiere coordinación previa.",
  },
  {
    number: "03",
    title: "Investigar la materia",
    description:
      "El equipo relata etapas de limpieza, acondicionamiento y transformación en laboratorio. Los métodos cambian según el material y el propósito.",
  },
  {
    number: "04",
    title: "Explorar posibilidades",
    description:
      "La investigación busca reconocer componentes y estudiar aplicaciones. No todo material se convierte necesariamente en un producto.",
  },
]

const principles = [
  { label: "Repensar", detail: "Mirar el material desde otra pregunta." },
  { label: "Reducir", detail: "Prevenir descartes desde las decisiones." },
  { label: "Reutilizar", detail: "Explorar nuevos usos cuando es viable." },
  { label: "Reciclar", detail: "Mantener recursos en circulación." },
]

function CircularMark() {
  return (
    <svg viewBox="0 0 120 120" fill="none" aria-hidden="true">
      <g className={styles.orbitTrack}>
        <g transform="rotate(-34 60 60)">
          <ellipse
            cx="60"
            cy="60"
            rx="58"
            ry="32"
            stroke="#6F9460"
            strokeOpacity=".48"
            strokeWidth="1.25"
          />
          <circle cx="118" cy="60" r="4.2" fill="#6F9E58" />
          <circle cx="118" cy="60" r="7" stroke="#6F9E58" strokeOpacity=".25" />
        </g>
      </g>
      <g className={styles.orbitTrackReverse}>
        <g transform="rotate(42 60 60)">
          <ellipse
            cx="60"
            cy="60"
            rx="52"
            ry="25"
            stroke="#A5B981"
            strokeOpacity=".55"
            strokeWidth="1.1"
          />
          <circle cx="112" cy="60" r="3.4" fill="#BDD28B" />
          <circle
            cx="112"
            cy="60"
            r="5.2"
            stroke="#8EA86D"
            strokeOpacity=".34"
          />
        </g>
      </g>
      <path
        d="M27 86C22 53 47 22 94 20 92 65 65 98 27 86Z"
        fill="#A8CB78"
        stroke="#4F8751"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        d="M32 82C48 64 65 46 87 29"
        stroke="#315F3D"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <path
        d="m53 59-2-14m15 2 12-8M44 69l-11-2m23 3 10 8"
        stroke="#4F8751"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  )
}

export default function BioImpactoPage() {
  return (
    <main id="contenido" className={styles.page}>
      <section className={styles.hero} aria-labelledby="impact-title">
        <div className={styles.heroTexture} aria-hidden="true" />
        <div className={styles.wrap}>
          <p className={styles.eyebrow}>
            <span /> BIO IMPACTO <i>/</i> ECONOMÍA CIRCULAR
          </p>
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <h1 id="impact-title">
                Lo que vuelve al ciclo
                <em> abre nuevas posibilidades.</em>
              </h1>
              <p className={styles.heroLead}>
                BioProductos DK investiga materiales orgánicos y explora cómo
                revalorizar recursos desde la ciencia aplicada. Una mirada
                circular que comienza en el origen y se desarrolla con
                investigación, colaboración y cuidado.
              </p>
              <div className={styles.heroActions}>
                <a className={styles.primaryButton} href="#recorrido">
                  Explorar el recorrido <span aria-hidden="true">↓</span>
                </a>
                <Link className={styles.secondaryButton} href="/donaciones">
                  Conocer cómo colaborar <span aria-hidden="true">↗</span>
                </Link>
              </div>
              <div className={styles.heroFootnote}>
                <span>CIENCIA APLICADA</span>
                <b aria-hidden="true">·</b>
                <span>MATERIA ORGÁNICA</span>
                <b aria-hidden="true">·</b>
                <span>NUEVAS POSIBILIDADES</span>
              </div>
            </div>
            <div
              className={styles.heroVisual}
              role="img"
              aria-label="Diagrama conceptual del ciclo entre materia, ciencia y nuevas posibilidades"
            >
              <div className={styles.visualOrb}>
                <div className={styles.visualHalo} />
                <div className={styles.visualMark}>
                  <CircularMark />
                </div>
                <span className={`${styles.orbitLabel} ${styles.orbitTop}`}>
                  MATERIA
                </span>
                <span className={`${styles.orbitLabel} ${styles.orbitRight}`}>
                  CIENCIA
                </span>
                <span className={`${styles.orbitLabel} ${styles.orbitBottom}`}>
                  POSIBILIDAD
                </span>
              </div>
              <p className={styles.visualCaption}>
                <span>01 — 04</span> Un ciclo que se investiga, no se presume.
              </p>
            </div>
          </div>
          <nav className={styles.sectionNav} aria-label="En esta página">
            <a href="#enfoque">El enfoque</a>
            <a href="#materiales">Materiales</a>
            <a href="#recorrido">Recorrido</a>
            <a href="#colaboracion">Colaboración</a>
          </nav>
        </div>
      </section>

      <section id="enfoque" className={`${styles.section} ${styles.intro}`}>
        <div className={styles.wrap}>
          <div className={styles.sectionHeading}>
            <p className={styles.kicker}>UNA FORMA DE MIRAR</p>
            <h2>
              El impacto no empieza al final.
              <br />
              <em>Empieza en cómo elegimos mirar.</em>
            </h2>
          </div>
          <div className={styles.introGrid}>
            <p className={styles.introStatement}>
              Un residuo separado puede convertirse en una pregunta para la
              ciencia.
            </p>
            <div className={styles.introBody}>
              <p>
                La economía circular propone mantener los recursos en uso y
                reducir la generación de descartes. En BioProductos DK, este
                enfoque se conecta con la búsqueda de componentes presentes en
                ciertos materiales orgánicos y con la exploración de nuevas
                aplicaciones.
              </p>
              <p>
                La entrevista de terreno describe colaboraciones de origen con
                cafeterías y reposterías, además de un intercambio de cáscaras
                de limón con una empresa que aprovecha otra parte del fruto.
                Cada material se evalúa según su procedencia y características.
              </p>
            </div>
          </div>
          <div
            className={styles.principleRail}
            aria-label="Principios de economía circular"
          >
            {principles.map((principle, index) => (
              <article className={styles.principle} key={principle.label}>
                <span>0{index + 1}</span>
                <div>
                  <h3>{principle.label}</h3>
                  <p>{principle.detail}</p>
                </div>
                <span className={styles.principleArrow} aria-hidden="true">
                  ↗
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="materiales"
        className={`${styles.section} ${styles.materialSection}`}
      >
        <div className={styles.wrap}>
          <div className={styles.materialHeading}>
            <div>
              <p className={styles.kicker}>MATERIALES CON HISTORIA</p>
              <h2>Una segunda mirada empieza por conocer su origen.</h2>
            </div>
            <p>
              Estos ejemplos aparecen en la visita de terreno. No representan
              una lista de recepción abierta ni materiales aceptados
              automáticamente.
            </p>
          </div>
          <div className={styles.materialGrid}>
            {materialStories.map((material) => (
              <details
                className={`${styles.materialCard} ${styles[material.tone]}`}
                key={material.number}
              >
                <summary>
                  <span className={styles.materialNumber}>
                    {material.number}
                  </span>
                  <span className={styles.materialGlyph} aria-hidden="true">
                    <i />
                  </span>
                  <span className={styles.materialCategory}>
                    {material.category}
                  </span>
                  <span className={styles.materialName}>{material.name}</span>
                  <span className={styles.materialAction}>
                    <span className={styles.srOnly}>Ver contexto</span>
                    <b aria-hidden="true">+</b>
                  </span>
                </summary>
                <p>{material.description}</p>
              </details>
            ))}
          </div>
          <p className={styles.sourceNote}>
            Materiales mencionados por el equipo durante la visita; sus usos y
            aplicaciones requieren evaluación para cada proyecto.
          </p>
        </div>
      </section>

      <section
        id="recorrido"
        className={`${styles.section} ${styles.pathSection}`}
      >
        <div className={styles.wrap}>
          <div className={styles.pathIntro}>
            <p className={styles.kicker}>DEL ORIGEN A LA INVESTIGACIÓN</p>
            <h2>
              Una circularidad responsable
              <em> se construye paso a paso.</em>
            </h2>
            <p>
              El recorrido relatado por DK combina coordinación, preparación de
              materiales y trabajo experimental. No es una receta única: las
              etapas dependen del material y del objetivo de investigación.
            </p>
            <Link href="/bio-investigacion" className={styles.inlineLink}>
              Conocer Bio Investigación <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <ol className={styles.pathList}>
            {circularPath.map((step, index) => (
              <li className={styles.pathStep} key={step.number}>
                <span className={styles.pathNumber}>{step.number}</span>
                <span className={styles.pathConnector} aria-hidden="true">
                  {index < circularPath.length - 1 ? "↓" : "↗"}
                </span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className={styles.pathDisclaimer}>
          <div className={styles.wrap}>
            <span aria-hidden="true">i</span>
            <p>
              Una descripción editorial basada en la visita. No constituye un
              protocolo para almacenar, transportar o procesar residuos.
            </p>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.impactSection}`}>
        <div className={styles.wrap}>
          <div className={styles.impactPanel}>
            <div className={styles.impactArt} aria-hidden="true">
              <span />
              <span />
              <CircularMark />
            </div>
            <div className={styles.impactCopy}>
              <p className={styles.kicker}>UN COMPROMISO QUE SE CONSTRUYE</p>
              <h2>
                Circularidad con criterio.
                <em> Investigación con propósito.</em>
              </h2>
              <p>
                Revalorizar no es aceptar cualquier material ni prometer que
                todo tendrá una nueva vida. Es comprender su origen, estudiar
                sus posibilidades y comunicar con honestidad lo que cada
                investigación puede —y todavía no puede— demostrar.
              </p>
              <div className={styles.impactTags}>
                <span>Origen claro</span>
                <span>Evaluación científica</span>
                <span>Impacto sin cifras inventadas</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="colaboracion"
        className={`${styles.section} ${styles.collaboration}`}
      >
        <div className={styles.wrap}>
          <div className={styles.collabEyebrow}>
            <span>COLABORAR DESDE EL ORIGEN</span>
            <span>DK / BIO IMPACTO</span>
          </div>
          <div className={styles.collabGrid}>
            <h2>
              ¿Tienes un material o una idea?
              <em> Conversemos primero.</em>
            </h2>
            <div>
              <p>
                Las colaboraciones necesitan coordinación y un protocolo
                acordado con BioProductos DK. Actualmente no hay un programa
                público de recepción de residuos habilitado. Consulta antes de
                separar, almacenar o trasladar materiales.
              </p>
              <div className={styles.collabActions}>
                <Link href="/donaciones" className={styles.primaryButton}>
                  Cómo proponer un material <span aria-hidden="true">↗</span>
                </Link>
                <Link href="/contacto" className={styles.secondaryButton}>
                  Contactar al equipo <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </div>
          </div>
          <div className={styles.collabFooter}>
            <span>CIENCIA · CIRCULARIDAD · COLABORACIÓN</span>
            <Link href="/">Volver al inicio ↑</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
