"use client"

import { ShoppingCart } from "@medusajs/icons"
import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react"
import Link from "next/link"
import {
  productCatalog,
  type CatalogProduct,
  type ProductCategory,
} from "../../../content/products"
import {
  addDemoCartEntry,
  DEMO_CART_EVENT,
  DEMO_CART_LIMIT,
  DEMO_CART_STORAGE_KEY,
  demoPrices,
  formatDemoPrice,
  getDemoCartLines,
  readDemoCart,
  setDemoCartQuantity,
  type DemoCartEntry,
} from "../../../lib/util/demo-cart"
import { HomePhoto } from "./primitives"
import styles from "./products-page.module.css"

type Filter = "Todo" | ProductCategory
type AddedToast = {
  product: CatalogProduct
  quantity: number
  sequence: number
}

const filters: Filter[] = ["Todo", "Hogar", "Cuidado personal"]

function ProductArtwork({ product }: { product: CatalogProduct }) {
  if (product.media) {
    return (
      <HomePhoto
        id={product.media}
        className={styles.productImage}
        sizes="(max-width: 620px) 92vw, (max-width: 1000px) 45vw, 30vw"
      />
    )
  }

  return (
    <div
      className={`${styles.artwork} ${styles[`artwork--${product.accent}`]}`}
      aria-hidden="true"
    >
      <span className={styles.artworkLine} />
      <span className={styles.artworkOrb} />
      <span className={styles.artworkLabel}>
        BIOPRODUCTOS <b>DK</b>
      </span>
      <span className={styles.artworkName}>{product.name}</span>
      <span className={styles.artworkMark}>DK</span>
    </div>
  )
}

export default function ProductsPage() {
  const [filter, setFilter] = useState<Filter>("Todo")
  const [query, setQuery] = useState("")
  const [variants, setVariants] = useState<Record<string, string>>({})
  const [quantities, setQuantities] = useState<Record<string, number>>({})
  const [cart, setCart] = useState<DemoCartEntry[]>([])
  const [cartReady, setCartReady] = useState(false)
  const [isSelectionOpen, setIsSelectionOpen] = useState(false)
  const [cartStep, setCartStep] = useState<"cart" | "checkout" | "success">(
    "cart",
  )
  const [demoOrderId, setDemoOrderId] = useState("")
  const [completedSummary, setCompletedSummary] = useState({
    count: 0,
    total: 0,
  })
  const [notice, setNotice] = useState("")
  const [addedToast, setAddedToast] = useState<AddedToast | null>(null)
  const [addedProduct, setAddedProduct] = useState<{
    id: string
    sequence: number
  } | null>(null)
  const feedbackSequence = useRef(0)
  const toastTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const lastFocusedRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    try {
      setCart(
        readDemoCart(
          window.localStorage.getItem(DEMO_CART_STORAGE_KEY),
          productCatalog,
        ),
      )
    } catch {
      setCart([])
    }
    setCartReady(true)
    function syncOtherTab(event: StorageEvent) {
      if (event.key === DEMO_CART_STORAGE_KEY)
        setCart(readDemoCart(event.newValue, productCatalog))
    }
    window.addEventListener("storage", syncOtherTab)
    return () => window.removeEventListener("storage", syncOtherTab)
  }, [])

  useEffect(() => {
    if (!cartReady) return
    try {
      window.localStorage.setItem(DEMO_CART_STORAGE_KEY, JSON.stringify(cart))
    } catch {
      // The shopping simulation remains usable in restricted storage contexts.
    }
    window.dispatchEvent(new Event(DEMO_CART_EVENT))
  }, [cart, cartReady])

  useEffect(() => {
    function openDemoCart() {
      setCartStep("cart")
      setIsSelectionOpen(true)
    }
    window.addEventListener("dk-demo-cart-open", openDemoCart)
    return () => window.removeEventListener("dk-demo-cart-open", openDemoCart)
  }, [])

  useEffect(
    () => () => {
      if (toastTimeout.current) clearTimeout(toastTimeout.current)
    },
    [],
  )

  useEffect(() => {
    if (!isSelectionOpen) return
    lastFocusedRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null
    closeButtonRef.current?.focus()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsSelectionOpen(false)
        return
      }
      if (event.key !== "Tab") return
      const focusable = document.querySelectorAll<HTMLElement>(
        `.${styles.drawer} a[href], .${styles.drawer} button:not([disabled])`,
      )
      if (!focusable.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = previousOverflow
      lastFocusedRef.current?.focus()
    }
  }, [isSelectionOpen])

  const visibleProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("es-CL")
    return productCatalog.filter((product) => {
      const matchesFilter = filter === "Todo" || product.category === filter
      const searchable =
        `${product.name} ${product.category} ${product.description} ${product.variants?.join(" ") ?? ""}`.toLocaleLowerCase(
          "es-CL",
        )
      return (
        matchesFilter &&
        (!normalizedQuery || searchable.includes(normalizedQuery))
      )
    })
  }, [filter, query])

  const cartLines = useMemo(
    () => getDemoCartLines(cart, productCatalog),
    [cart],
  )
  const cartCount = cartLines.reduce((sum, line) => sum + line.quantity, 0)
  const cartTotal = cartLines.reduce((sum, line) => sum + line.total, 0)
  const categoryLabels: Record<Filter, string> = {
    Todo: "Ver todo",
    Hogar: "Cuidado del hogar",
    "Cuidado personal": "Cuidado personal",
  }

  function addToSelection(product: CatalogProduct) {
    const variant = variants[product.id]
    const quantity = quantities[product.id] ?? 1
    if (product.variants && !variant) {
      setNotice(`Elige una opción para ${product.name} antes de agregarlo.`)
      return
    }
    setCart((current) =>
      addDemoCartEntry(current, product.id, productCatalog, variant, quantity),
    )
    feedbackSequence.current += 1
    const sequence = feedbackSequence.current
    setAddedProduct({ id: product.id, sequence })
    setAddedToast({ product, quantity, sequence })
    if (toastTimeout.current) clearTimeout(toastTimeout.current)
    toastTimeout.current = setTimeout(() => setAddedToast(null), 3200)
    setNotice(
      `${quantity} ${quantity === 1 ? "unidad" : "unidades"} de ${product.name} se ${quantity === 1 ? "agregó" : "agregaron"} al carrito de demostración.`,
    )
  }

  function changeQuantity(key: string, quantity: number) {
    setCart((current) =>
      setDemoCartQuantity(current, key, quantity, productCatalog),
    )
  }

  function startCheckout() {
    setCartStep("checkout")
  }

  function confirmDemoOrder() {
    setCompletedSummary({ count: cartCount, total: cartTotal })
    setDemoOrderId(
      `DK-DEMO-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
    )
    setCart([])
    setCartStep("success")
    setNotice("Simulación completada. No se envió ni cobró ningún pedido.")
  }

  function closeCart() {
    setIsSelectionOpen(false)
    setCartStep("cart")
  }

  function selectCategory(category: Filter) {
    setFilter(category)
    document
      .getElementById("catalogo")
      ?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <main id="contenido" className={styles.page}>
      <section className={styles.hero} aria-labelledby="products-title">
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>
              <span /> BIOPRODUCTOS DK <i aria-hidden="true">/</i> CATÁLOGO
            </p>
            <h1 id="products-title">
              Cuidado para <em>cada día.</em>
            </h1>
            <p className={styles.heroLead}>
              Limpieza del hogar y cuidado personal, reunidos en la colección
              DK.
            </p>
          </div>
          <div
            className={styles.categoryChoices}
            role="group"
            aria-label="Filtrar productos por categoría"
          >
            {filters.map((item) => {
              const count =
                item === "Todo"
                  ? productCatalog.length
                  : productCatalog.filter(
                      (product) => product.category === item,
                    ).length
              return (
                <button
                  key={item}
                  type="button"
                  className={`${styles.categoryChoice} ${filter === item ? styles.categoryChoiceActive : ""}`}
                  aria-label={categoryLabels[item]}
                  aria-pressed={filter === item}
                  onClick={() => selectCategory(item)}
                >
                  <span className={styles.categoryChoiceText}>
                    {categoryLabels[item]}
                  </span>
                  <span className={styles.categoryChoiceCount}>
                    {String(count).padStart(2, "0")}
                    <span> productos</span>
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      <section
        id="catalogo"
        className={styles.catalog}
        aria-labelledby="catalog-title"
      >
        <div className={styles.catalogHead}>
          <div>
            <p className={styles.sectionEyebrow}>CATÁLOGO BIOPRODUCTOS DK</p>
            <h2 id="catalog-title">Descubre la colección.</h2>
          </div>
          <p className={styles.catalogIntro}>
            Conoce las líneas disponibles y agrega tus favoritas a una selección
            para consultar.
          </p>
        </div>

        <div className={styles.demoNotice}>
          <span>SIMULACIÓN LOCAL</span>
          <p>
            Precios ficticios de demostración. No se procesan pagos, pedidos ni
            despachos reales.
          </p>
        </div>

        <div className={styles.toolbar}>
          <label className={styles.search}>
            <span className={styles.searchIcon} aria-hidden="true">
              ⌕
            </span>
            <span className={styles.srOnly}>Buscar en el catálogo</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar un producto"
            />
            {query && (
              <button
                type="button"
                aria-label="Limpiar búsqueda"
                onClick={() => setQuery("")}
              >
                ×
              </button>
            )}
          </label>
        </div>
        <p className={styles.resultCount} aria-live="polite">
          <strong>{categoryLabels[filter]}</strong>
          <span aria-hidden="true"> · </span>
          {visibleProducts.length}{" "}
          {visibleProducts.length === 1 ? "producto" : "productos"}
        </p>

        <div className={styles.grid}>
          {visibleProducts.map((product, index) => (
            <article
              className={styles.card}
              key={product.id}
              style={{ "--card-order": index } as CSSProperties}
            >
              <div className={styles.cardVisual}>
                <ProductArtwork product={product} />
                <span className={styles.categoryTag}>{product.category}</span>
                <span className={styles.cardIndex}>
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <div className={styles.cardBody}>
                {product.imageCaption && (
                  <p className={styles.imageCaption}>{product.imageCaption}</p>
                )}
                <h3>{product.name}</h3>
                <p className={styles.productDescription}>
                  {product.description}
                </p>
                <div className={styles.productPrice}>
                  <span>Precio de demostración</span>
                  <strong>{formatDemoPrice(demoPrices[product.id])}</strong>
                </div>
                {product.variants && (
                  <fieldset className={styles.variantGroup}>
                    <legend>
                      {product.id === "solid-shampoo"
                        ? "Elige tu tipo de cabello"
                        : "Elige una variedad"}
                    </legend>
                    <div className={styles.variantOptions}>
                      {product.variants.map((variant) => (
                        <button
                          key={variant}
                          type="button"
                          className={
                            variants[product.id] === variant
                              ? styles.variantSelected
                              : styles.variant
                          }
                          aria-pressed={variants[product.id] === variant}
                          onClick={() =>
                            setVariants((current) => ({
                              ...current,
                              [product.id]: variant,
                            }))
                          }
                        >
                          {variant}
                        </button>
                      ))}
                    </div>
                    {product.variantNote && (
                      <small>{product.variantNote}</small>
                    )}
                  </fieldset>
                )}
                <div
                  className={styles.productQuantity}
                  role="group"
                  aria-label={`Cantidad de ${product.name}`}
                >
                  <span>Cantidad</span>
                  <div className={styles.quantityStepper}>
                    <button
                      type="button"
                      aria-label={`Disminuir cantidad de ${product.name}`}
                      disabled={(quantities[product.id] ?? 1) <= 1}
                      onClick={() =>
                        setQuantities((current) => ({
                          ...current,
                          [product.id]: Math.max(
                            1,
                            (current[product.id] ?? 1) - 1,
                          ),
                        }))
                      }
                    >
                      <span aria-hidden="true">−</span>
                    </button>
                    <output aria-label={`Unidades de ${product.name}`}>
                      {quantities[product.id] ?? 1}
                    </output>
                    <button
                      type="button"
                      aria-label={`Aumentar cantidad de ${product.name}`}
                      disabled={
                        (quantities[product.id] ?? 1) >= DEMO_CART_LIMIT
                      }
                      onClick={() =>
                        setQuantities((current) => ({
                          ...current,
                          [product.id]: Math.min(
                            DEMO_CART_LIMIT,
                            (current[product.id] ?? 1) + 1,
                          ),
                        }))
                      }
                    >
                      <span aria-hidden="true">+</span>
                    </button>
                  </div>
                </div>
                <button
                  className={`${styles.addButton} ${addedProduct?.id === product.id ? styles.addButtonSuccess : ""}`}
                  type="button"
                  onClick={() => addToSelection(product)}
                  disabled={Boolean(product.variants && !variants[product.id])}
                >
                  Agregar al carrito
                  <span aria-hidden="true">
                    <ShoppingCart
                      key={
                        addedProduct?.id === product.id
                          ? addedProduct.sequence
                          : "idle"
                      }
                      width={17}
                      height={17}
                    />
                  </span>
                </button>
                {product.variants && !variants[product.id] && (
                  <small className={styles.variantHint}>
                    Elige una opción para continuar.
                  </small>
                )}
              </div>
            </article>
          ))}
        </div>
        {visibleProducts.length === 0 && (
          <p className={styles.empty}>
            No encontramos productos con esa búsqueda. Prueba con otra palabra.
          </p>
        )}
      </section>

      <aside
        className={`${styles.drawerLayer} ${isSelectionOpen ? styles.drawerLayerOpen : ""}`}
        aria-hidden={!isSelectionOpen}
      >
        <button
          className={styles.scrim}
          type="button"
          aria-label="Cerrar selección"
          tabIndex={isSelectionOpen ? 0 : -1}
          onClick={closeCart}
        />
        <section
          className={styles.drawer}
          role="dialog"
          aria-modal="true"
          aria-labelledby="cart-title"
          aria-describedby="cart-description"
          aria-hidden={!isSelectionOpen}
        >
          <div className={styles.drawerHeader}>
            <div>
              <p className={styles.sectionEyebrow}>BIOPRODUCTOS DK · DEMO</p>
              <h2 id="cart-title">
                {cartStep === "checkout"
                  ? "Revisar pedido"
                  : cartStep === "success"
                    ? "Compra simulada"
                    : "Tu carrito"}
              </h2>
            </div>
            <button
              ref={closeButtonRef}
              type="button"
              className={styles.closeButton}
              aria-label="Cerrar carrito"
              onClick={closeCart}
            >
              ×
            </button>
          </div>
          <p id="cart-description" className={styles.drawerNote}>
            Compra de demostración. Los importes son ficticios y solo sirven
            para probar el recorrido de compra.
          </p>
          {cartStep === "success" ? (
            <div className={styles.demoSuccess} role="status">
              <span className={styles.successMark} aria-hidden="true">
                ✓
              </span>
              <p className={styles.sectionEyebrow}>SIMULACIÓN COMPLETADA</p>
              <h3>Así se vería tu compra.</h3>
              <p>
                No se envió ningún pedido ni se realizó un cobro. No guardamos
                datos personales.
              </p>
              <div className={styles.demoReceipt}>
                <span>Referencia de prueba</span>
                <strong>{demoOrderId}</strong>
                <span>{completedSummary.count} productos · total ficticio</span>
                <strong>{formatDemoPrice(completedSummary.total)}</strong>
              </div>
              <button
                type="button"
                className={styles.checkoutButton}
                onClick={closeCart}
              >
                Seguir explorando
              </button>
            </div>
          ) : cartStep === "checkout" ? (
            <div className={styles.checkoutReview}>
              <div className={styles.checkoutProgress}>
                <span>01 · Carrito</span>
                <span aria-current="step">02 · Confirmación demo</span>
              </div>
              <h3>Resumen de tu pedido</h3>
              <ul>
                {cartLines.map((line) => (
                  <li key={line.key}>
                    <span>
                      {line.product.name}
                      {line.variant && <small>{line.variant}</small>}
                      <small>Cantidad: {line.quantity}</small>
                    </span>
                    <strong>{formatDemoPrice(line.total)}</strong>
                  </li>
                ))}
              </ul>
              <div className={styles.checkoutTotal}>
                <span>Total de demostración</span>
                <strong>{formatDemoPrice(cartTotal)}</strong>
              </div>
              <div className={styles.checkoutNotice}>
                <strong>Sin datos, pago ni despacho real</strong>
                <p>
                  Esta etapa solo muestra cómo se vería la confirmación. No
                  escribas datos personales: no se necesitan para la prueba.
                </p>
              </div>
              <button
                type="button"
                className={styles.checkoutButton}
                onClick={confirmDemoOrder}
              >
                Confirmar compra de demostración
                <span aria-hidden="true">↗</span>
              </button>
              <button
                type="button"
                className={styles.backToCart}
                onClick={() => setCartStep("cart")}
              >
                Volver al carrito
              </button>
            </div>
          ) : cartLines.length ? (
            <>
              <div className={styles.cartStatus}>
                <span>
                  {cartCount} {cartCount === 1 ? "producto" : "productos"}
                </span>
                <span>Valores de demostración</span>
              </div>
              <ul className={styles.cartList}>
                {cartLines.map((line) => (
                  <li key={line.key}>
                    <div className={styles.cartThumbnail}>
                      <ProductArtwork product={line.product} />
                    </div>
                    <div className={styles.cartLineInfo}>
                      <strong>{line.product.name}</strong>
                      {line.variant && <small>{line.variant}</small>}
                      <span className={styles.cartLinePrice}>
                        {formatDemoPrice(line.total)}
                      </span>
                      <div className={styles.quantityControl}>
                        <button
                          type="button"
                          aria-label={`Disminuir ${line.product.name}`}
                          onClick={() =>
                            changeQuantity(line.key, line.quantity - 1)
                          }
                        >
                          −
                        </button>
                        <output aria-label={`Cantidad: ${line.quantity}`}>
                          {line.quantity}
                        </output>
                        <button
                          type="button"
                          aria-label={`Aumentar ${line.product.name}`}
                          onClick={() =>
                            changeQuantity(line.key, line.quantity + 1)
                          }
                        >
                          +
                        </button>
                        <button
                          className={styles.removeLine}
                          type="button"
                          aria-label={`Quitar ${line.product.name} del carrito`}
                          onClick={() => changeQuantity(line.key, 0)}
                        >
                          Quitar
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className={styles.cartTotal}>
                <div>
                  <span>Subtotal demo</span>
                  <strong>{formatDemoPrice(cartTotal)}</strong>
                </div>
                <small>Despacho no incluido · No hay cobro real</small>
              </div>
              <button
                type="button"
                className={styles.checkoutButton}
                onClick={startCheckout}
              >
                Continuar con compra de prueba
                <span aria-hidden="true">→</span>
              </button>
              <button
                type="button"
                className={styles.clearButton}
                onClick={() => setCart([])}
              >
                Vaciar carrito
              </button>
            </>
          ) : (
            <div className={styles.selectionEmpty}>
              <span aria-hidden="true">＋</span>
              <strong>Tu carrito está listo para empezar.</strong>
              <p>
                Agrega productos para probar la experiencia de compra local.
              </p>
              <button type="button" onClick={closeCart}>
                Volver al catálogo
              </button>
            </div>
          )}
          <p className={styles.drawerLegal}>
            Simulación únicamente visual y local. No conecta con Shopify,
            Medusa, pasarelas de pago, despacho ni crea pedidos reales.
          </p>
        </section>
      </aside>
      {addedToast && (
        <div
          key={addedToast.sequence}
          className={styles.addedToast}
          aria-hidden="true"
        >
          <span className={styles.addedToastThumb}>
            {addedToast.product.media ? (
              <HomePhoto
                id={addedToast.product.media}
                className={styles.addedToastPhoto}
                sizes="52px"
              />
            ) : (
              <ProductArtwork product={addedToast.product} />
            )}
            <span className={styles.toastCheck}>✓</span>
          </span>
          <span className={styles.addedToastCopy}>
            <strong>Producto agregado</strong>
            <span>
              {addedToast.quantity}{" "}
              {addedToast.quantity === 1 ? "unidad" : "unidades"} ·{" "}
              {addedToast.product.name}
            </span>
          </span>
          <span className={styles.toastSpark} aria-hidden="true">
            ✦
          </span>
        </div>
      )}
      <p className={styles.srOnly} role="status">
        {notice}
      </p>
      <div className={styles.mobileBag}>
        <button
          type="button"
          onClick={() => {
            setCartStep("cart")
            setIsSelectionOpen(true)
          }}
        >
          <span>Mi carrito demo</span>
          <b>{cartCount}</b>
        </button>
      </div>
      <div className={styles.pageEnd}>
        <span>¿Buscas una línea para tu negocio?</span>
        <Link href="/empresas">
          Conoce Empresas DK <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </main>
  )
}
