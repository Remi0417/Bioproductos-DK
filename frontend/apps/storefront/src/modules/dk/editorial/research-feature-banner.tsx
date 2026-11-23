"use client"

import { useRef, useState, type KeyboardEvent } from "react"
import Link from "next/link"
import { HomePhoto } from "./primitives"
import styles from "./research-feature-banner.module.css"

const stories = [
  {
    id: "materiales",
    label: "Materiales",
    eyebrow: "01 / MATERIA ORGÁNICA",
    title: "Investigar lo que la materia aún puede ofrecer.",
    copy: "BioProductos DK explora materiales como borra de café, cáscaras de huevo y frutas, hojas, nueces y cuescos de palta. En la visita se describieron etapas de preparación como limpieza, deshidratación y molienda, ajustadas a cada material.",
    signal: "ORIGEN · PREPARACIÓN · REVALORIZACIÓN",
  },
  {
    id: "nanotecnologia",
    label: "Nanotecnología",
    eyebrow: "02 / OTRA ESCALA",
    title: "Comprender la materia desde lo pequeño.",
    copy: "En la visita se explicaron nanoemulsiones como una estrategia para encapsular componentes activos y explorar su incorporación en desarrollos. También se mencionó el ultrasonido y la exploración de liposomas en cosmética. Cada formulación necesita su propio estudio.",
    signal: "NANOEMULSIONES · ULTRASONIDO · EXPLORACIÓN",
  },
  {
    id: "laboratorio",
    label: "Laboratorio",
    eyebrow: "03 / DESARROLLO EXPERIMENTAL",
    title: "De la pregunta a la exploración de prototipos.",
    copy: "El recorrido de laboratorio descrito incluye homogeneización, ultrasonido, molienda, tamizado y destilación por vapor. Las técnicas, variables y posibles aplicaciones dependen del material y del propósito de cada proyecto.",
    signal: "OBSERVAR · EXPERIMENTAR · DESARROLLAR",
  },
  {
    id: "colaboracion",
    label: "Colaboración I+D",
    eyebrow: "04 / CIENCIA EN CONJUNTO",
    title: "Investigar también es conectar capacidades.",
    copy: "BioProductos DK ha descrito colaboraciones con otras organizaciones para análisis y experimentos vinculados al desarrollo de prototipos. Cada propuesta puede conversar sobre objetivos, materiales y capacidades requeridas.",
    signal: "I+D · ANÁLISIS · PROTOTIPOS",
  },
]

export default function ResearchFeatureBanner() {
  const [active, setActive] = useState(0)
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])
  const story = stories[active]

  function move(direction: number) {
    setActive(
      (current) => (current + direction + stories.length) % stories.length,
    )
  }

  function handleTabKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    let nextIndex: number | undefined

    if (event.key === "ArrowRight") nextIndex = (index + 1) % stories.length
    if (event.key === "ArrowLeft")
      nextIndex = (index - 1 + stories.length) % stories.length
    if (event.key === "Home") nextIndex = 0
    if (event.key === "End") nextIndex = stories.length - 1

    if (nextIndex !== undefined) {
      event.preventDefault()
      setActive(nextIndex)
      tabRefs.current[nextIndex]?.focus()
    }
  }

  return (
    <section
      id="investigacion-en-accion"
      className={styles.banner}
      aria-labelledby="feature-title"
      data-testid="research-feature-banner"
    >
      <div className={styles.bannerGrid}>
        <div className={styles.artField} aria-hidden="true">
          <svg viewBox="0 0 680 620" fill="none">
            <path d="M-32 472C92 431 106 227 232 219s142 147 258 129c83-13 111-113 220-151" />
            <path d="M-26 518C95 484 133 288 249 279c112-9 136 125 245 104 94-18 122-82 219-108" />
            <path d="M-12 429C108 391 152 165 274 166c117 1 140 108 235 86 69-16 124-91 204-113" />
            <path d="M86 111c65 53 112 70 172 53 72-20 104-84 171-80 48 3 74 39 121 51" />
            <path d="M122 585c94-58 177-44 244-79 56-29 85-91 159-102" />
            <circle cx="232" cy="219" r="3" />
            <circle cx="490" cy="348" r="3" />
            <circle cx="274" cy="166" r="2" />
          </svg>
          <span className={styles.artIndex}>
            BIO INVESTIGACIÓN <i /> DK
          </span>
        </div>

        <div className={styles.copy}>
          <p className={styles.eyebrow}>
            <span /> BIO INVESTIGACIÓN · I+D
          </p>
          <p className={styles.overline}>
            Ciencia aplicada · Desarrollo experimental
          </p>
          <h2 id="feature-title">
            Investigar con método.
            <br />
            <em>Desarrollar posibilidades.</em>
          </h2>
          <p className={styles.intro}>
            BioProductos DK explora materiales orgánicos mediante biotecnología,
            nanotecnología y trabajo experimental. Cada pregunta se estudia
            según el material y el propósito de desarrollo.
          </p>

          <div
            className={styles.storyPicker}
            role="tablist"
            aria-label="Explorar áreas de Bio Investigación"
            aria-orientation="horizontal"
          >
            {stories.map((item, index) => (
              <button
                key={item.id}
                ref={(element) => {
                  tabRefs.current[index] = element
                }}
                type="button"
                id={`research-tab-${item.id}`}
                role="tab"
                aria-selected={active === index}
                aria-controls="research-feature-panel"
                tabIndex={active === index ? 0 : -1}
                onKeyDown={(event) => handleTabKeyDown(event, index)}
                onClick={() => setActive(index)}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{item.label}</strong>
                <i aria-hidden="true">↗</i>
              </button>
            ))}
          </div>

          <div
            className={styles.story}
            id="research-feature-panel"
            role="tabpanel"
            aria-labelledby={`research-tab-${story.id}`}
            tabIndex={0}
            aria-live="polite"
            aria-atomic="true"
            key={story.id}
          >
            <p className={styles.storyEyebrow}>{story.eyebrow}</p>
            <h3>{story.title}</h3>
            <p className={styles.storyCopy}>{story.copy}</p>
            <p className={styles.signal}>{story.signal}</p>
          </div>

          <div className={styles.controls}>
            <div className={styles.arrows}>
              <button
                type="button"
                aria-label="Área anterior"
                onClick={() => move(-1)}
              >
                <span aria-hidden="true">←</span> <span>Anterior</span>
              </button>
              <button
                type="button"
                aria-label="Área siguiente"
                onClick={() => move(1)}
              >
                <span>Siguiente</span> <span aria-hidden="true">→</span>
              </button>
            </div>
            <span className={styles.counter}>
              Área {String(active + 1).padStart(2, "0")} de{" "}
              {String(stories.length).padStart(2, "0")}
            </span>
            <Link className={styles.cta} href="/contacto">
              Proponer colaboración I+D <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>

        <figure className={styles.researchVisual}>
          <HomePhoto
            id="home-products-bath"
            className={styles.photo}
            sizes="(max-width: 850px) 100vw, 40vw"
          />
          <div className={styles.photoVeil} aria-hidden="true" />
          <figcaption>
            <span className={styles.visualMark}>DK</span>
            <span>
              <small>IMAGEN TEMPORAL DE CATÁLOGO</small>
              <strong>Reemplazar por fotografía de Bio Investigación</strong>
            </span>
          </figcaption>
          <span className={styles.photoTag}>
            RECURSO TEMPORAL · NO REPRESENTA EL LABORATORIO
          </span>
        </figure>
      </div>
    </section>
  )
}
