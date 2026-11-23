"use client"

import { useState } from "react"
import catalog from "../../../../../data/demo-catalog.json"
import ProductArt from "./product-art"

const categories = [
  "Todas",
  "Cuidado del hogar",
  "Cuidado personal",
  "Bienestar cotidiano",
]
const money = new Intl.NumberFormat("es-CL", {
  style: "currency",
  currency: "CLP",
  maximumFractionDigits: 0,
})
const navigation = [
  ["Productos", "#productos"],
  ["Bio Investigación", "#investigacion"],
  ["Nosotras", "#nosotras"],
  ["Dónde comprar", "#donde-comprar"],
]

export default function DkHome() {
  const [category, setCategory] = useState("Todas")
  const products = catalog.filter(
    (p) => category === "Todas" || p.category === category,
  )
  return (
    <div className="dk-site">
      <a className="dk-skip" href="#contenido">
        Saltar al contenido
      </a>
      <div className="dk-demo-bar">
        PROPUESTA INDEPENDIENTE <span aria-hidden="true">·</span> Entorno DEMO,
        sin venta real
      </div>
      <header className="dk-header dk-container">
        <a href="#" className="dk-brand" aria-label="BioProductos DK, inicio">
          <span className="dk-monogram">
            dk<span>.</span>
          </span>
          <span>
            BIOPRODUCTOS
            <br />
            <small>CIENCIA EN LO COTIDIANO</small>
          </span>
        </a>
        <nav className="dk-desktop-nav" aria-label="Navegación principal">
          {navigation.map(([label, href]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>
        <a className="dk-contact-link" href="#contacto">
          Conversemos <span aria-hidden="true">↗</span>
        </a>
        <details className="dk-mobile-nav">
          <summary>
            Menú <span aria-hidden="true">☰</span>
          </summary>
          <nav aria-label="Navegación móvil">
            {[...navigation, ["Contacto", "#contacto"]].map(([label, href]) => (
              <a
                key={href}
                href={href}
                onClick={(e) =>
                  e.currentTarget.closest("details")?.removeAttribute("open")
                }
              >
                {label}
              </a>
            ))}
          </nav>
        </details>
      </header>
      <main id="contenido" tabIndex={-1}>
        <section className="dk-hero dk-container" aria-labelledby="hero-title">
          <div className="dk-hero-copy">
            <p className="dk-eyebrow">
              <span className="dk-dot" /> UNA MIRADA DESDE LA CIENCIA
            </p>
            <h1 id="hero-title">
              La ciencia se
              <br />
              encuentra con
              <br />
              <em>lo cotidiano.</em>
            </h1>
            <p className="dk-lead">
              Explora una propuesta que conecta investigación, cuidado personal
              y cuidado del hogar.
            </p>
            <div className="dk-actions">
              <a className="dk-button" href="#productos">
                Explorar productos <span aria-hidden="true">↗</span>
              </a>
              <a className="dk-text-link" href="#investigacion">
                Conocer la investigación <span aria-hidden="true">↗</span>
              </a>
            </div>
            <p className="dk-hero-note">
              Diseño y contenido provisionales.
              <br />
              Una alternativa para evaluar junto a BioProductos DK.
            </p>
          </div>
          <figure className="dk-hero-art">
            <div className="dk-orbit dk-orbit-one" />
            <div className="dk-orbit dk-orbit-two" />
            <span className="dk-art-label">
              MATERIA · CIENCIA · POSIBILIDADES
            </span>
            <div className="dk-hero-product dk-hero-product-one">
              <ProductArt kind="detergent" id="hero-det" />
            </div>
            <div className="dk-hero-product dk-hero-product-two">
              <ProductArt kind="shampoo" id="hero-cha" />
            </div>
            <div className="dk-hero-product dk-hero-product-three">
              <ProductArt kind="salt" id="hero-sal" />
            </div>
            <span className="dk-figure-marker" aria-hidden="true">
              01 / EXPLORACIÓN
            </span>
            <figcaption>
              Ilustración conceptual propia · envases y marcas sin aprobar
            </figcaption>
          </figure>
        </section>
        <div className="dk-manifesto">
          <div className="dk-container">
            <span>CUIDADO DEL HOGAR</span>
            <span aria-hidden="true">✳</span>
            <span>COSMÉTICA SÓLIDA</span>
            <span aria-hidden="true">✳</span>
            <span>INVESTIGACIÓN Y DESARROLLO</span>
          </div>
        </div>
        <section
          id="productos"
          className="dk-products dk-container"
          aria-labelledby="products-title"
        >
          <div className="dk-section-heading">
            <div>
              <p className="dk-eyebrow">01 / UNIVERSO DE PRODUCTOS</p>
              <h2 id="products-title">
                Pequeños rituales.
                <br />
                <em>Nuevas posibilidades.</em>
              </h2>
            </div>
            <p>
              Ocho referencias mencionadas en la visita.
              <br />
              Nombres, precios y stock de prueba; fórmulas,
              <br className="dk-desktop-break" /> aromas y formatos por
              confirmar.
            </p>
          </div>
          <div
            className="dk-filter"
            role="group"
            aria-label="Filtrar referencias por categoría"
          >
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={category === c}
                onClick={() => setCategory(c)}
              >
                {c}
              </button>
            ))}
          </div>
          <p className="dk-result-count" role="status" aria-live="polite">
            {products.length} referencias de prueba · precios ficticios en CLP
          </p>
          <div className="dk-product-grid">
            {products.map((product, index) => (
              <article
                className={`dk-product dk-product-${product.kind}`}
                key={product.sku}
              >
                <div className="dk-product-visual">
                  <span className="dk-product-tag">
                    DEMO / {String(index + 1).padStart(2, "0")}
                  </span>
                  <ProductArt kind={product.kind} id={product.sku} />
                  <span className="dk-product-caption">
                    Ilustración conceptual
                  </span>
                </div>
                <div className="dk-product-info">
                  <p className="dk-eyebrow">{product.category}</p>
                  <h3>{product.name}</h3>
                  <div className="dk-price">
                    <span>{money.format(product.price)}</span>
                    <small>Precio ficticio</small>
                  </div>
                  <details>
                    <summary>
                      Ver referencia de prueba <span aria-hidden="true">+</span>
                    </summary>
                    <p>
                      {product.sku} · Stock ficticio: {product.stock} unidades.
                      Ingredientes, tamaño, aroma, uso y precauciones pendientes
                      de validación. Esta ficha no permite comprar.
                    </p>
                  </details>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section
          id="investigacion"
          className="dk-research"
          aria-labelledby="research-title"
        >
          <div className="dk-container dk-research-grid">
            <div className="dk-research-art" aria-hidden="true">
              <div className="dk-science-circle">
                <span>C</span>
                <i />
                <i />
                <i />
              </div>
              <p>OBSERVAR / EXPLORAR / COMPRENDER</p>
              <span className="dk-specimen-label">
                ESQUEMA CONCEPTUAL
                <br />
                NO REPRESENTA UNA FÓRMULA
              </span>
            </div>
            <div className="dk-research-copy">
              <p className="dk-eyebrow">02 / BIO INVESTIGACIÓN</p>
              <h2 id="research-title">
                Cada pregunta abre
                <br />
                <em>un nuevo camino.</em>
              </h2>
              <p>
                El recorrido por el laboratorio puso sobre la mesa la
                revalorización de residuos orgánicos, la formulación y la
                cosmética sólida. Este espacio propone acercar esas preguntas a
                las personas.
              </p>
              <p className="dk-research-disclaimer">
                Los procesos, resultados y aplicaciones requieren revisión del
                equipo científico antes de publicarse.
              </p>
              <a
                className="dk-button dk-button-light"
                href="#ciencia-pendiente"
              >
                Explorar líneas de investigación{" "}
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </section>
        <section
          id="ciencia-pendiente"
          className="dk-science dk-container"
          aria-labelledby="science-title"
        >
          <div className="dk-section-heading">
            <div>
              <p className="dk-eyebrow">LA EVIDENCIA VA PRIMERO</p>
              <h2 id="science-title">
                Ciencia que merece
                <br />
                <em>ser bien contada.</em>
              </h2>
            </div>
            <p>
              Una estructura editorial propuesta.
              <br />
              Sin patentes, alianzas ni certificaciones
              <br />
              publicadas sin respaldo.
            </p>
          </div>
          <div className="dk-science-cards">
            {[
              [
                "01",
                "Investigación y desarrollo",
                "Un espacio para explicar líneas de trabajo y procesos con contenidos revisados por el equipo.",
              ],
              [
                "02",
                "Colaboración y proyectos",
                "Historias que se incorporarán cuando existan fuentes, permisos y resultados publicables.",
              ],
              [
                "03",
                "Marcas y patentes",
                "Antecedentes que requieren documentación verificable y aprobación antes de mostrarse.",
              ],
            ].map(([number, title, body]) => (
              <article key={number}>
                <span>{number} /</span>
                <h3>{title}</h3>
                <p>{body}</p>
                <small>Contenido pendiente de aprobación</small>
              </article>
            ))}
          </div>
        </section>
        <section
          id="nosotras"
          className="dk-about dk-container"
          aria-labelledby="about-title"
        >
          <p className="dk-eyebrow">03 / EL ORIGEN DE ESTA PROPUESTA</p>
          <h2 id="about-title">
            Una conversación en terreno.
            <br />
            <em>Una experiencia por construir.</em>
          </h2>
          <p>
            Esta candidatura académica nace de una visita a BioProductos DK.
            Propone una nueva experiencia para descubrir sus productos y
            acercarse a la investigación. La empresa ha expresado su preferencia
            por conservar Shopify; esta demostración independiente permite
            evaluar otra alternativa sin intervenir su operación.
          </p>
          <span className="dk-inline-note">
            Identidad visual provisional · historia y fotografías oficiales
            pendientes
          </span>
        </section>
        <section className="dk-practical dk-container">
          <div id="donde-comprar">
            <p className="dk-eyebrow">04 / DÓNDE ENCONTRARNOS</p>
            <h2>
              Puntos de venta,
              <br />
              <em>con información confiable.</em>
            </h2>
            <p>
              Las direcciones, ubicaciones y logos se incorporarán después de
              ser confirmados por DK. Esta propuesta no publica establecimientos
              sin autorización.
            </p>
          </div>
          <div id="contacto">
            <p className="dk-eyebrow">05 / CONVERSEMOS</p>
            <h2>
              Las buenas ideas
              <br />
              <em>empiezan conversando.</em>
            </h2>
            <p>
              El canal de contacto y el formulario de colaboración están
              pendientes de aprobación. Esta vista previa no recoge datos
              personales.
            </p>
            <a className="dk-text-link" href="#investigacion">
              Volver a Bio Investigación <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>
      </main>
      <footer className="dk-footer">
        <div className="dk-container">
          <div className="dk-footer-top">
            <a href="#" className="dk-brand">
              <span className="dk-monogram">
                dk<span>.</span>
              </span>
              <span>
                BIOPRODUCTOS
                <br />
                <small>UNA PROPUESTA DESDE LA CIENCIA</small>
              </span>
            </a>
            <p>
              Materia, ciencia
              <br />
              <em>y nuevas posibilidades.</em>
            </p>
            <nav aria-label="Navegación del pie">
              <a href="#productos">Productos DEMO</a>
              <a href="#investigacion">Bio Investigación</a>
              <a href="#contacto">Contacto</a>
              <a href="#alcance">Alcance de la demostración</a>
            </nav>
          </div>
          <div className="dk-footer-bottom" id="alcance">
            <p>
              Propuesta académica independiente · 2026
              <br />
              Sin ventas, pagos ni documentos tributarios. Precios, stock e
              ilustraciones ficticios.
            </p>
            <p>
              Privacidad y términos comerciales pendientes de revisión.
              <br />
              Identidad, fichas y contenido científico sujetos a aprobación de
              DK.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
