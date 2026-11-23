"use client"

import { useState } from "react"
import styles from "./research-material-explorer.module.css"

const materials = [
  {
    id: "cafe",
    label: "Borra de café",
    note: "Un residuo cotidiano que puede convertirse en punto de partida para investigar componentes de interés.",
    question: "¿Qué contiene y qué vale la pena estudiar?",
    symbol: "C",
    color: "coffee",
  },
  {
    id: "huevo",
    label: "Cáscara de huevo",
    note: "En la visita se describió su acondicionamiento y molienda como parte del trabajo con materiales orgánicos.",
    question: "¿Cómo cambia el material al prepararlo?",
    symbol: "Ca",
    color: "shell",
  },
  {
    id: "citricos",
    label: "Cáscaras cítricas",
    note: "Las cáscaras de naranja y limón se mencionaron en relación con extractos y obtención de aceites esenciales.",
    question: "¿Qué posibilidades ofrece cada fracción?",
    symbol: "C₆",
    color: "citrus",
  },
  {
    id: "nuez",
    label: "Cáscara de nuez",
    note: "El equipo explicó que la dureza y las características del residuo influyen en cómo se explora su transformación.",
    question: "¿Qué preparación requiere este material?",
    symbol: "N",
    color: "walnut",
  },
  {
    id: "palta",
    label: "Cuesco de palta",
    note: "Fue uno de los ejemplos de materiales duros mencionados al describir etapas de reducción de tamaño.",
    question: "¿Qué técnicas se ajustan a su estructura?",
    symbol: "A",
    color: "avocado",
  },
  {
    id: "hojas",
    label: "Hojas y restos vegetales",
    note: "Hojas de beterraga, orégano y romero aparecieron como ejemplos de materiales que pueden estudiarse.",
    question: "¿Qué componentes podrían orientar nuevas preguntas?",
    symbol: "V",
    color: "leaf",
  },
]

const lenses = [
  {
    eyebrow: "01 / MATERIA",
    title: "Cada origen plantea otra pregunta.",
    body: "No todos los materiales se comportan igual. Su origen, dureza, humedad y composición orientan cómo se estudian y preparan.",
  },
  {
    eyebrow: "02 / MÉTODO",
    title: "La técnica sigue al material.",
    body: "Durante la visita se describieron procesos como lavado, deshidratación, molienda, tamizado y extracción. Su uso depende de cada caso.",
  },
  {
    eyebrow: "03 / POSIBILIDAD",
    title: "Investigar antes de prometer.",
    body: "Una posibilidad de aplicación requiere estudio y desarrollo. La investigación no equivale por sí sola a una propiedad comprobada de un producto.",
  },
]

export default function ResearchMaterialExplorer() {
  const [selectedMaterial, setSelectedMaterial] = useState(0)
  const [selectedLens, setSelectedLens] = useState(0)
  const material = materials[selectedMaterial]
  const lens = lenses[selectedLens]

  return (
    <section
      id="materia"
      className={styles.explorer}
      aria-labelledby="matter-title"
    >
      <div className={styles.wrap}>
        <header className={styles.heading}>
          <div className={styles.headingMeta}>
            <p className={styles.kicker}>
              <span>DK</span>
              <i aria-hidden="true" />
              Cuaderno de campo
            </p>
            <span className={styles.headingCode}>
              BIO INVESTIGACIÓN <i aria-hidden="true" /> REGISTRO 01—06
            </span>
          </div>
          <h2 id="matter-title">
            La investigación empieza
            <br />
            <span>mirando de cerca.</span>
          </h2>
          <div className={styles.headingAside}>
            <span className={styles.asideLabel}>
              MATERIA <i aria-hidden="true" /> OBSERVACIÓN
            </span>
            <p>
              En la visita, el equipo compartió materiales presentes en sus
              exploraciones. Selecciona uno para conocer las preguntas que puede
              abrir su estudio.
            </p>
            <div className={styles.headingSequence} aria-hidden="true">
              <span>ORIGEN</span>
              <i />
              <span>MÉTODO</span>
              <i />
              <span>POSIBILIDAD</span>
            </div>
          </div>
        </header>

        <div className={styles.experiment}>
          <div className={styles.specimen}>
            <div
              className={`${styles.orbit} ${styles[material.color]}`}
              aria-hidden="true"
            >
              <span className={styles.orbitRing} />
              <span className={styles.orbitRingInner} />
              <span className={styles.specimenCore}>{material.symbol}</span>
              <i className={styles.particleOne} />
              <i className={styles.particleTwo} />
              <i className={styles.particleThree} />
              <svg
                viewBox="0 0 460 300"
                role="img"
                aria-labelledby="specimen-title specimen-desc"
              >
                <title id="specimen-title">
                  Ilustración conceptual del material seleccionado
                </title>
                <desc id="specimen-desc">
                  Una composición abstracta de partículas y órbitas, creada como
                  arte editorial.
                </desc>
                <path d="M27 216C94 167 105 53 193 51c60-2 62 72 116 75 55 3 74-76 124-58" />
                <path d="M11 249c76-22 106-93 158-95 65-3 73 78 139 75 59-3 76-55 141-60" />
                <circle cx="27" cy="216" r="4" />
                <circle cx="193" cy="51" r="5" />
                <circle cx="309" cy="126" r="4" />
                <circle cx="433" cy="68" r="5" />
                <circle cx="308" cy="229" r="3" />
              </svg>
              <span className={styles.specimenCaption}>
                MATERIA / EN OBSERVACIÓN
              </span>
            </div>
            <div className={styles.specimenIndex}>
              <span>DK · CUADERNO DE CAMPO</span>
              <span>{String(selectedMaterial + 1).padStart(2, "0")} / 06</span>
            </div>
          </div>

          <div className={styles.exploreCopy}>
            <div
              className={styles.materialPicker}
              role="group"
              aria-label="Seleccionar material orgánico"
            >
              {materials.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  data-testid="research-material-button"
                  className={
                    selectedMaterial === index ? styles.materialActive : ""
                  }
                  aria-pressed={selectedMaterial === index}
                  onClick={() => setSelectedMaterial(index)}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {item.label}
                  <span className={styles.materialArrow} aria-hidden="true">
                    ↗
                  </span>
                </button>
              ))}
            </div>
            <div
              className={styles.materialNote}
              aria-live="polite"
              key={material.id}
            >
              <p className={styles.materialTag}>
                MATERIAL / {material.label.toUpperCase()}
              </p>
              <h3>{material.question}</h3>
              <p>{material.note}</p>
            </div>
          </div>
        </div>

        <div className={styles.lensPanel}>
          <div className={styles.lensIntro}>
            <span className={styles.lensEyebrow}>{lens.eyebrow}</span>
            <h3 aria-live="polite" key={lens.title}>
              {lens.title}
            </h3>
          </div>
          <div className={styles.lensBody}>
            <p aria-live="polite" key={lens.body}>
              {lens.body}
            </p>
            <div
              className={styles.lensControls}
              role="group"
              aria-label="Cambiar enfoque de investigación"
            >
              {lenses.map((item, index) => (
                <button
                  key={item.eyebrow}
                  type="button"
                  aria-label={`Ver enfoque ${index + 1}: ${item.eyebrow.split(" / ")[1]}`}
                  aria-pressed={selectedLens === index}
                  className={selectedLens === index ? styles.lensActive : ""}
                  onClick={() => setSelectedLens(index)}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <i aria-hidden="true" />
                </button>
              ))}
            </div>
          </div>
        </div>

        <p className={styles.sourceNote}>
          Ejemplos y procesos relatados por el equipo durante la visita. No
          implican que todos los materiales se utilicen en productos ni que
          exista un programa público de recepción.
        </p>
      </div>
    </section>
  )
}
