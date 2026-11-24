import type { Metadata } from "next"
import Link from "next/link"
import { publicContact } from "../../../content/site"
import { ActionLink } from "@modules/dk/editorial/primitives"
import CollaborationForm from "@modules/dk/editorial/collaboration-form"

export const metadata: Metadata = {
  title: "Colabora con residuos orgánicos · BioProductos DK",
  description:
    "Conoce cómo BioProductos DK investiga la revalorización de materiales orgánicos y cómo consultar una posible colaboración, con evaluación y coordinación previas.",
}

const examples = [
  {
    number: "01",
    title: "Borra de café",
    note: "Un material mencionado en el trabajo de investigación de DK.",
    tone: "coffee",
  },
  {
    number: "02",
    title: "Cáscaras de huevo",
    note: "Una materia orgánica descrita durante la visita al laboratorio.",
    tone: "shell",
  },
  {
    number: "03",
    title: "Cáscaras de cítricos",
    note: "Se han explorado por sus componentes y posibilidades de uso.",
    tone: "citrus",
  },
]

const researchSteps = [
  {
    number: "01",
    title: "Conocer el origen",
    body: "Identificar de qué material se trata, dónde se genera y si puede mantenerse separado desde su origen.",
    tag: "TRAZABILIDAD",
  },
  {
    number: "02",
    title: "Evaluar el material",
    body: "DK revisa si el material se relaciona con sus necesidades de investigación y si es posible acordar su recepción.",
    tag: "EVALUACIÓN",
  },
  {
    number: "03",
    title: "Acordar condiciones",
    body: "Antes de reunir o trasladar residuos, se deben confirmar con el equipo la separación, conservación y coordinación apropiadas.",
    tag: "PROTOCOLO DK",
  },
  {
    number: "04",
    title: "Explorar posibilidades",
    body: "Cuando existe una colaboración acordada, el material puede evaluarse dentro de un proyecto. Su uso final no se presupone.",
    tag: "CIENCIA APLICADA",
  },
]

// Los botones de la página llevan al formulario conectado a la API de Django
// (antes abrían un mailto con una plantilla de correo).
const formHref = "#formulario-colaboracion"

export default function DonationsPage() {
  return (
    <main
      id="contenido"
      tabIndex={-1}
      className="dk2-container dk2-donation-page"
    >
      <Link href="/" className="dk2-donation-back">
        <span aria-hidden="true">←</span> Volver al inicio
      </Link>

      <section className="dk3-donation-hero" aria-labelledby="donation-title">
        <div className="dk3-donation-hero-copy">
          <p className="dk2-eyebrow">
            BIO IMPACTO <i>/</i> CIENCIA CIRCULAR
          </p>
          <h1 id="donation-title">
            Lo que separas hoy
            <span>puede abrir otra posibilidad.</span>
          </h1>
          <p className="dk3-donation-lead">
            BioProductos DK investiga materiales orgánicos para explorar nuevos
            ingredientes y aplicaciones. Si tu hogar, cafetería o empresa genera
            alguno, conversemos primero: cada material requiere evaluación y
            coordinación.
          </p>
          <div className="dk3-donation-hero-actions">
            <a className="dk3-donation-button" href={formHref}>
              Quiero explorar una colaboración <span aria-hidden="true">↓</span>
            </a>
            <a className="dk3-donation-text-link" href="#recorrido">
              Conocer cómo comienza <span aria-hidden="true">↓</span>
            </a>
          </div>
          <div className="dk3-donation-hero-meta">
            <span>SEPARAR</span>
            <i aria-hidden="true">·</i>
            <span>INVESTIGAR</span>
            <i aria-hidden="true">·</i>
            <span>REVALORIZAR</span>
          </div>
        </div>

        <div className="dk3-cycle-art" aria-hidden="true">
          <svg viewBox="0 0 520 440" fill="none">
            <path
              className="dk3-cycle-line"
              d="M126 122C186 45 334 48 397 136"
            />
            <path
              className="dk3-cycle-line dk3-cycle-line-two"
              d="M408 177C443 272 365 356 270 365"
            />
            <path
              className="dk3-cycle-line dk3-cycle-line-three"
              d="M222 358C126 354 64 272 91 183"
            />
            <circle cx="260" cy="218" r="103" className="dk3-cycle-core" />
            <circle cx="260" cy="218" r="79" className="dk3-cycle-inner" />
          </svg>
          <div className="dk3-cycle-center">
            <svg
              className="dk3-recycle-mark"
              viewBox="0 0 120 120"
              fill="none"
              aria-hidden="true"
            >
              <defs>
                <linearGradient
                  id="dk3-recycle-gradient"
                  x1="19"
                  y1="15"
                  x2="102"
                  y2="105"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#79B840" />
                  <stop offset=".52" stopColor="#25834C" />
                  <stop offset="1" stopColor="#0E573D" />
                </linearGradient>
                <marker
                  id="dk3-recycle-arrow"
                  markerWidth="10"
                  markerHeight="10"
                  refX="7.2"
                  refY="5"
                  orient="auto"
                  markerUnits="userSpaceOnUse"
                >
                  <path d="M1 1 9 5 1 9 3.1 5 1 1Z" fill="#25834C" />
                </marker>
              </defs>
              <g
                stroke="url(#dk3-recycle-gradient)"
                strokeWidth="8"
                strokeLinecap="round"
                markerEnd="url(#dk3-recycle-arrow)"
              >
                <path d="M49 22a39 39 0 0 1 39 23" />
                <path d="M94 63a39 39 0 0 1-37 35" />
                <path d="M39 91a39 39 0 0 1-16-46" />
              </g>
              <path
                d="M60 43c-11 0-19 7-19 17 0 8 7 14 16 14h3c10 0 18-7 18-17 0-8-7-14-18-14Z"
                fill="rgb(var(--dk2-forest-rgb) / 0.1)"
              />
              <path
                d="M48 68c6-9 13-15 24-20M58 59l-1-8m5 12 8-1"
                stroke="#25834C"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="dk3-cycle-node dk3-cycle-node-one">
            <b>01</b>
            <span>Materia</span>
            <i aria-hidden="true">✳</i>
          </div>
          <div className="dk3-cycle-node dk3-cycle-node-two">
            <b>02</b>
            <span>Investigación</span>
            <i aria-hidden="true">⌕</i>
          </div>
          <div className="dk3-cycle-node dk3-cycle-node-three">
            <b>03</b>
            <span>Nueva mirada</span>
            <i aria-hidden="true">↗</i>
          </div>
          <p className="dk3-cycle-caption">
            NO ES DESCARTE. ES UNA PREGUNTA POR EXPLORAR.
          </p>
        </div>
      </section>

      <aside
        className="dk3-donation-status"
        aria-label="Estado de la colaboración"
      >
        <span className="dk3-status-indicator" aria-hidden="true" />
        <div>
          <b>Una invitación a conversar, con coordinación responsable.</b>
          <p>
            La recepción pública de residuos aún no está habilitada. No hay un
            punto de entrega ni retiro automático: contacta a DK y espera su
            confirmación antes de preparar o trasladar materiales.
          </p>
        </div>
        <a href={`mailto:${publicContact.email}`}>
          Consultar por correo <span aria-hidden="true">↗</span>
        </a>
      </aside>

      <section
        className="dk3-material-section"
        aria-labelledby="materials-title"
      >
        <div className="dk3-section-heading">
          <p className="dk2-eyebrow">MATERIALES QUE INSPIRAN PREGUNTAS</p>
          <h2 id="materials-title">
            La circularidad comienza por mirar de cerca.
          </h2>
          <p>
            En la visita, el equipo mencionó estos materiales como parte de su
            exploración. Son referencias de investigación, no una lista de
            recepción ni ingredientes confirmados en cada producto.
          </p>
        </div>
        <div className="dk3-material-grid">
          {examples.map((example) => (
            <article
              className={`dk3-material-card dk3-material-${example.tone}`}
              key={example.number}
            >
              <div className="dk3-material-art" aria-hidden="true">
                <span>{example.number}</span>
                <i />
                <b>
                  {example.tone === "coffee"
                    ? "C"
                    : example.tone === "shell"
                      ? "Ca"
                      : "O"}
                </b>
              </div>
              <p className="dk3-material-index">
                MATERIAL ORGÁNICO <span>{example.number}</span>
              </p>
              <h3>{example.title}</h3>
              <p>{example.note}</p>
            </article>
          ))}
        </div>
        <p className="dk3-material-footnote">
          Durante la visita también se mencionaron cáscaras de nuez y de frutas,
          cuescos de palta, hojas de beterraga, romero y orégano. La pertinencia
          de cada material depende de una evaluación específica.
        </p>
      </section>

      <section
        id="recorrido"
        className="dk3-research-section"
        aria-labelledby="research-title"
      >
        <div className="dk3-research-heading">
          <div>
            <p className="dk2-eyebrow">DEL ORIGEN A LA INVESTIGACIÓN</p>
            <h2 id="research-title">
              Cada material tiene su propio recorrido.
            </h2>
          </div>
          <p>
            No existe una receta única para todos los residuos. El equipo ha
            descrito etapas y técnicas que se exploran según las características
            del material y la pregunta de investigación.
          </p>
        </div>
        <div
          className="dk3-research-track"
          aria-label="Etapas generales de evaluación y colaboración"
        >
          {researchSteps.map((step) => (
            <article className="dk3-research-step" key={step.number}>
              <div className="dk3-step-marker">
                <span>{step.number}</span>
                <i aria-hidden="true">↗</i>
              </div>
              <p>{step.tag}</p>
              <h3>{step.title}</h3>
              <div>{step.body}</div>
            </article>
          ))}
        </div>
        <div className="dk3-tech-note">
          <div className="dk3-tech-symbol" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <div>
            <p className="dk2-eyebrow">CIENCIA APLICADA · SIN ATAJOS</p>
            <h3>Preparar la materia también es parte de investigar.</h3>
            <p>
              En su relato de laboratorio, DK describió limpieza y desinfección,
              deshidratación, molienda y tamizado. También explicó la
              destilación por arrastre de vapor para explorar aceites esenciales
              de ciertos materiales. Las técnicas no se aplican de manera
              idéntica a todos los residuos y no constituyen un protocolo de
              recepción para el público.
            </p>
          </div>
          <span className="dk3-tech-index">
            I+D <i>·</i> DK
          </span>
        </div>
      </section>

      <section
        className="dk3-participation"
        aria-labelledby="participation-title"
      >
        <div className="dk3-participation-copy">
          <p className="dk2-eyebrow">UNA COLABORACIÓN EMPIEZA EN EL ORIGEN</p>
          <h2 id="participation-title">
            Tu aporte puede ser el comienzo de una buena pregunta.
          </h2>
          <p>
            Separar un material y contarnos de dónde viene ayuda a evaluar si
            puede tener sentido para una investigación. No es necesario
            comprometer una cantidad ni llevarlo a un lugar: primero se conversa
            y DK confirma si existe una posibilidad concreta.
          </p>
          <a className="dk3-donation-button" href={formHref}>
            Escribir a BioProductos DK <span aria-hidden="true">↓</span>
          </a>
        </div>
        <div className="dk3-participation-checklist">
          <p className="dk2-eyebrow">PARA QUE LA CONVERSACIÓN SEA ÚTIL</p>
          <ul>
            <li>
              <span>01</span>
              <div>
                <b>Qué material es</b>
                <small>Por ejemplo, borra de café o cáscara de huevo.</small>
              </div>
            </li>
            <li>
              <span>02</span>
              <div>
                <b>De dónde proviene</b>
                <small>Hogar, cafetería, comercio u otra actividad.</small>
              </div>
            </li>
            <li>
              <span>03</span>
              <div>
                <b>Cuánto y con qué frecuencia</b>
                <small>Una estimación basta para iniciar la consulta.</small>
              </div>
            </li>
            <li>
              <span>04</span>
              <div>
                <b>En qué comuna estás</b>
                <small>La logística se define caso a caso con DK.</small>
              </div>
            </li>
          </ul>
          <p className="dk3-checklist-note">
            El formulario de abajo te pide estos mismos puntos; tú decides
            cuánto detalle compartir.
          </p>
        </div>
      </section>

      <CollaborationForm />

      <section className="dk3-donation-faq" aria-labelledby="faq-title">
        <div className="dk3-faq-heading">
          <p className="dk2-eyebrow">ANTES DE ESCRIBIR</p>
          <h2 id="faq-title">
            Una colaboración consciente también hace buenas preguntas.
          </h2>
        </div>
        <div className="dk3-faq-list">
          <details>
            <summary>¿Puedo llevar mis residuos directamente?</summary>
            <p>
              No por ahora. No hay un punto público de recepción habilitado.
              Primero escribe a DK y espera una confirmación explícita antes de
              reunir o trasladar materiales.
            </p>
          </details>
          <details>
            <summary>¿Puedo mezclar distintos residuos?</summary>
            <p>
              La entrevista destaca la importancia de separar los materiales por
              tipo. Consulta a DK qué requiere antes de preparar una posible
              colaboración; no existe aquí un protocolo público de recepción.
            </p>
          </details>
          <details>
            <summary>¿Todo lo que envío se transforma en un producto?</summary>
            <p>
              No necesariamente. Cada material debe evaluarse y su eventual uso
              depende del proyecto, de sus características y de la decisión del
              equipo de BioProductos DK.
            </p>
          </details>
          <details>
            <summary>¿Recibo un descuento o una recompensa?</summary>
            <p>
              No hay descuentos ni recompensas confirmados para esta iniciativa.
              La propuesta es abrir una conversación sobre investigación y
              revalorización de materiales.
            </p>
          </details>
        </div>
      </section>

      <section
        className="dk3-donation-footer-cta"
        aria-labelledby="donation-cta-title"
      >
        <div className="dk3-footer-orbit" aria-hidden="true">
          <span>DK</span>
        </div>
        <p className="dk2-eyebrow">
          UNA MATERIA · UNA PREGUNTA · UNA POSIBILIDAD
        </p>
        <h2 id="donation-cta-title">Hagamos espacio para una nueva mirada.</h2>
        <p>
          Cuéntanos qué material tienes en mente. El primer paso es escucharnos.
        </p>
        <div className="dk3-donation-footer-actions">
          <a className="dk3-donation-button" href={formHref}>
            Consultar una colaboración <span aria-hidden="true">↑</span>
          </a>
          <ActionLink
            label="Conocer Bio Impacto"
            href="/bio-impacto"
            variant="secondary"
          />
        </div>
        <small>
          La recepción requiere evaluación y coordinación previa con
          BioProductos DK.
        </small>
      </section>
    </main>
  )
}
