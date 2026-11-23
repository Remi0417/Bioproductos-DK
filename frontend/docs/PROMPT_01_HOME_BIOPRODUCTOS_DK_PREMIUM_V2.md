# PROMPT MAESTRO 01 — BIOPRODUCTOS DK | HOME PREMIUM V2

**Estado:** especificación de trabajo para Codex CLI · **Única página a implementar ahora:** `/` (Inicio/Home).  
**Prioridad:** experiencia visual editorial premium, identidad auténtica, navegación multipágina y funcionalidad verificable.  
**No autorizado:** intervenir dominio, Shopify, servicios de producción, pagos reales o datos reales de clientes.

---

## 0. Rol y misión

Actúa como un equipo senior integrado por: Product Designer, Director/a de Arte Digital, UX Researcher, Frontend Lead, especialista en accesibilidad y QA. Trabaja **dentro del repositorio existente de BioProductos DK**; no generes otro proyecto ni empieces desde cero. Tu misión es **rediseñar y terminar exclusivamente la página HOME** con calidad visual y de ingeniería digna de una propuesta comercial real para una empresa científico-tecnológica chilena. No hagas una plantilla genérica, ni una página única que contenga todo el sitio.

El sitio final será multipágina: cada área tendrá una ruta, su composición y su profundidad propias. Hoy solo construyes la portada, el header/footer compartidos y, si es imprescindible, rutas *placeholder mínimas y honestas* para que la navegación no falle. **La próxima etapa será Bio Investigación; no implementes su página completa ahora.**

**Principio creativo:** "La ciencia detrás de una nueva forma de cuidar". La página debe transmitir ciencia aplicada + economía circular + cercanía humana + producto comercial real. Inspiración de calidad: precisión tipográfica, ritmo, espacio y microinteracciones tipo Apple; **NO copies el sitio de Apple ni borres la personalidad ecológica de DK**.

## 1. Fuentes obligatorias y jerarquía de verdad

Antes de programar:

1. Localiza y lee `AGENTS.md` y `README.md` **preferentemente en la raíz** (si hoy solo existen dentro de `docs/`, encuéntralos allí y avisa cómo corregirlo sin perder contenido); busca `docs/PRD.md`, `docs/ROADMAP.md`, `docs/DISENO_UX_UI.md`, `docs/ARQUITECTURA.md` y sus variantes en subcarpetas `docs/diseno/` o `docs/arquitectura/`. Inspecciona las decisiones y criterios de aceptación disponibles; no supongas rutas sin comprobar.
2. Lee completa la entrevista de visita a terreno en `docs/investigacion/ENTREVISTA_TERRENO_BIO_DK.md`, `docs/ENTREVISTA_TERRENO_BIO_DK.md` o en la ubicación donde exista. Si no está, detente y solicita ese archivo en vez de inventar sus contenidos.
3. Revisa las páginas oficiales de contexto: `https://bioproductosdk.com/`, `/nosotras/`, `/home-2/` (corresponde a **Bio Investigación**, NO a un segundo Home), `/productos/`, `/empresa/`, `/startup-contact/` y `/bio-impacto/`. Si la conexión falla, usa la documentación local, explica la limitación y NO inventes una auditoría visual.
4. Inspecciona el código, las dependencias y el diseño ya existentes en `apps/` y el sistema de rutas real. Identifica si el frontend vive en `apps/storefront`, `apps/web` u otra ruta. Conserva lo funcional.
5. Clasifica los textos en: [CONFIRMADO por empresa / web], [PROPUESTA editorial] y [PENDIENTE DE VALIDAR]. No mezcles hipótesis con afirmaciones comerciales o regulatorias.

**Hechos procedentes de la visita:** las fundadoras quieren un inicio bonito donde se vean los productos; Bio Investigación ha de comunicar I+D, colaboración, proyectos logrados, marcas y patentes *solo con datos verificables*; la tienda debe ser accesible inmediatamente. Se habló de **2 detergentes en aromas distintos, 3 champús sólidos para distintos tipos de cabello y 3 tipos de sales de baño (8 referencias, pendiente de validar nombres/precios/stock)**. La empresa transforma residuos orgánicos mediante investigación y procesos como higienización, deshidratación, molienda y formulación; también utiliza técnicas de nanoemulsiones y diversos instrumentos de laboratorio. La web debe conservar la esencia y colores originales. Las fundadoras valoraron el video del detergente en el inicio, pero **aquí solo reserva el contenedor vacío para que el equipo suba ese material después**.

**Restricciones de veracidad:** No atribuyas porcentajes exactos de reducción de CO₂, ahorros de agua, certificaciones, patentes concedidas, marcas registradas, propiedades hipoalergénicas, declaraciones "100% natural/biodegradable", métricas, reseñas, premios ni promesas de seguridad sin fuentes verificadas y aprobación. El material de la entrevista es una transcripción automática: corrige erratas evidentes para la presentación, pero NO conviertas palabras ambiguas en datos nuevos. No divulgues fórmulas confidenciales ni parámetros detallados de fabricación. No des a entender que **todas** las líneas de productos usan exactamente el mismo proceso.

## 2. Alcance de esta entrega

**Sí:** HOME completo (`/`), sistema visual compartido, navegación global multipágina, footer, slots de medios vacíos, componentes accesibles, copy original apoyado en fuentes, metadatos, pruebas y documentación. Si ya existe integración del backend, reutilízala. Respetar el proyecto monorepo, Medusa, PostgreSQL y su trabajo anterior.

**No:** no reconstruyas el repositorio, no elimines el frontend existente sin revisión, no cambies versiones para "hacer que se vea", no restaures dependencia rota ocultando errores, no intentes migrar Shopify ni DNS, no implementes Bio Investigación/Nosotras/Productos/Empresas/Contacto completos en esta fase, no actives pagos reales y **NO AÑADAS IMÁGENES**.

## 3. NORMA ABSOLUTA SOBRE IMÁGENES Y VIDEOS

Esta instrucción tiene prioridad sobre cualquier plantilla o librería:

- **NO buscar, generar, descargar, copiar, insertar ni importar fotos, ilustraciones, renders, productos 3D, videos de prueba, gifs, stock o imágenes remotas.** No Unsplash, Pexels, Lorem Picsum, imágenes generadas por IA, fotos actuales extraídas del sitio ni `next/image` con URL externa.
- Todos los espacios de medios deben quedar **intencionalmente vacíos**, con una composición estética neutra y proporcionada. Mantén áreas reales de imagen/video, con `aspect-ratio` adecuado y dimensiones reservadas para evitar CLS. No pongas imágenes rotas. Evita degradados gigantes que aparenten sustituir una foto; prioriza fondos blanco roto/verde muy suave.
- Crea un componente reutilizable, por ejemplo `MediaSlot`, con `id`, `kind` (`image|video`), `ratio`, `altFuture`, `className`. Debe renderizar un rectángulo elegante vacío con borde sutil. Opcionalmente, en **desarrollo únicamente**, una etiqueta pequeña `Foto pendiente: home-hero` que no aparezca en la presentación final (usar bandera de entorno o prop). En producción, solo la superficie vacía, sin iconografía ni texturas inventadas.
- Documenta un inventario de slots (`docs/diseno/INVENTARIO_MEDIOS_HOME.md`) con ID, ubicación, finalidad, relación sugerida, resolución orientativa y texto alternativo pendiente. El componente debe estar preparado para conectar imágenes locales **cuando el usuario las aporte**, sin que sea obligatorio poner imágenes para que la web funcione.
- Conserva un logo ya existente **solo si el proyecto ya lo contiene y está aprobado**. Si no, utiliza marca tipográfica "BioProductos DK", sin crear ni descargar logotipos.

**Slots mínimos:** `home-hero-video` (16:9 o vertical según composición); `home-products-detergent`, `home-products-shampoo`, `home-products-bath`; `home-science-process`; `home-research-lab`; `home-brands`; `home-founders`; `home-impact`; `home-business`. Puedes agregar slots si mejoran el diseño, nunca añadir activos.

## 4. Sistema de diseño global (preparar para páginas futuras)

- **Identidad:** conservar predominio verde oscuro de DK, blancos y fondos cálidos naturales. Identificar tokens actuales antes de cambiarlos. Propuesta editable inicial, NO afirmar que son códigos oficiales: verde bosque aproximado `#173F32`, fondo cálido `#F7F8F3`, blanco `#FFFFFF`, tinta `#17251E`, gris verdoso `#65756D`. Si hay paleta real en archivos locales, **prevalece la paleta real**.
- Permitir acentos naranja/celeste muy moderados vinculados a submarcas **solo si sus identidades/nombres y paletas se verifican**; no convertir todo el sitio en degradados arcoíris.
- Diseño **light first**; no forzar dark mode si no es requisito. Mucho espacio negativo, grilla de 12 columnas desktop, contenedor aprox. 1200–1360 px, ritmo vertical respirable, composición editorial asimétrica equilibrada, secciones alternadas con intención.
- Tipografía legible, contemporánea y controlada. Priorizar la fuente disponible con licencia en el proyecto; si no, system font stack. Titulares generosos pero no exagerados, longitud de línea controlada, cuerpos con 1.5–1.7 line-height, no mayúsculas extensas para párrafos.
- Responsive real 320, 375, 390, 768, 1024, 1440 y 1920 px; sin scroll horizontal, texto cortado, botones inaccesibles ni slots desbordados. Navegación móvil real, toque mínimo 44 px.
- Botones sobrios primario sólido verde / secundario contorno; estados hover, focus-visible, active, disabled, loading según corresponda. Animaciones de aparición discretas, 150–350 ms, sin scroll-jacking, sin parallax agresivo, deshabilitadas con `prefers-reduced-motion`.
- No crear todas las secciones con el mismo patrón de tres tarjetas. Alterna hero editorial, bloques a dos columnas, full-width con aire, proceso horizontal accesible, listados elegantes y llamados a la acción breves. Los slots vacíos **no deben hacer que la página parezca una maqueta defectuosa**.
- Accesibilidad: landmarks semánticos, encabezados secuenciales, contraste WCAG AA, navegación por teclado, menú móvil con `aria-expanded` y focus handling, etiquetas discernibles, validaciones y foco visible. No depender del color para transmitir sentido.

## 5. Arquitectura global de navegación (separada del Home)

Diseña Header y Footer compartidos para todo el futuro sitio. Mapa primario:

| Menú | Ruta canónica | Desarrollo ahora |
| --- | --- | --- |
| Inicio | `/` | **Completo** |
| Nosotras | `/nosotras` | Placeholder mínimo solo si la ruta aún no existe |
| Bio Investigación | `/bio-investigacion` | Placeholder mínimo; futura etapa 02 |
| Productos | `/productos` | Si ya existe, conservar; si no, placeholder mínimo |
| Empresas | `/empresas` | Placeholder mínimo si falta |
| Contacto | `/contacto` | Placeholder mínimo si falta |

Rutas complementarias previstas: `/bio-impacto`, `/donde-comprar`, y subpáginas de I+D, colaboraciones, proyectos, patentes y servicios **que se detallarán más adelante**. Ubícalas en footer o menú contextual, sin llenar el header de opciones. Si existen rutas equivalentes ya implementadas, conecta y evita duplicados.

**Crítico:** ningún CTA debe ser `href="#"` ni conducir a una ruta inexistente. Si un destino todavía no tiene página completa, renderiza una ruta ligera con mensaje honesto "Esta sección se está preparando" y volver al Home, o usa la ruta real existente. No sustituyas navegación por scroll hacia el Home; son páginas distintas. Header sticky discreto, estado activo accesible, mobile drawer con cierre por Escape y click exterior, bloqueo razonable de scroll, navegación teclado. Iconos solo para acciones puntuales (buscar si funciona, carrito si existe); nunca controles decorativos inertes.

## 6. HOME: orden editorial y requisitos sección por sección

El Home funciona como **portada y mapa**: introduce y deriva; no reproduce por completo las futuras páginas. Implementa estas secciones con espaciado, composiciones y densidad apropiadas. Se pueden ajustar detalles visuales sin omitir funcionalidades.

### S01. Encabezado global premium
- Marca a la izquierda (logo existente aprobado o texto elegante).
- En desktop: Inicio, Nosotras, Bio Investigación, Productos, Empresas, Contacto; CTA destacado `Explorar productos` si cabe sin congestión; indicador visual de página activa.
- En móvil: marca, menú accesible desplegable y, si existe y funciona, carrito con estado real; no inventar contador. Navegación siempre utilizable.

### S02. Hero principal (primera pantalla de alto impacto)
- Eyebrow: `BIOPRODUCTOS DK · CIENCIA E INNOVACIÓN SOSTENIBLE`.
- H1 recomendado: **«La ciencia detrás de una nueva forma de cuidar.»**
- Bajada redactada sin exageración: **«Investigamos y desarrollamos productos de limpieza e higiene a partir de innovación científica y la revalorización de materiales orgánicos.»**
- CTA 1 `Explorar productos` -> `/productos`; CTA 2 `Conoce nuestra ciencia` -> `/bio-investigacion`.
- Composición editorial: texto de gran impacto a la izquierda y **gran slot vacío** `home-hero-video` a la derecha o en distribución adaptable; contemplar futura inserción del video original del detergente si la empresa lo autoriza. Pueden existir subtítulos o etiqueta "Un proyecto con ciencia en su origen", nunca estadísticas fabricadas.
- El Hero NO debe ser fondo completo de imagen ni carrusel automático.

### S03. Presentación institucional corta
- Encabezado: `Innovación que nace de lo que otros descartan`.
- Redactar un párrafo breve sobre la misión de aprovechar residuos orgánicos, desarrollar ingredientes y ofrecer alternativas de limpieza e higiene. Subrayar el origen científico sin explicar en detalle procesos propios.
- Enlace `Conoce nuestra historia` -> `/nosotras`.
- Tratar esta sección como manifiesto breve, no como cuatro tarjetas repetidas.

### S04. Cuatro áreas que definen a DK
- Biotecnología aplicada, Nanotecnología, Innovación, Economía circular / sostenibilidad.
- Cada concepto con 1–2 frases rigurosas, sencillas y originales basadas en la empresa. **No repetir la definición genérica de la web si sugiere prácticas no comprobadas (p. ej. "manipulación genética")**. Sin fotografías ni iconos ornamentales; preferir números/typography.
- CTA contextual de ciencia hacia `/bio-investigacion`.

### S05. Nuestros productos: adelanto comercial real
- Título `Productos desarrollados con propósito` y subtítulo claro.
- Tres bloques editoriales para familias: **Detergentes para ropa (2 aromas)**; **Champús sólidos (3 tipos de cabello)**; **Sales de baño (3 variedades)**. Esto deriva de la entrevista, los nombres comerciales exactos/variantes deben validarse antes de mostrarlos como SKU oficiales.
- Cada bloque con su MediaSlot vacío (`home-products-*`), breve descripción prudente y enlace a `/productos`.
- Si el backend Medusa y catálogo real ya funcionan, conectar los productos destacados mediante la capa de datos existente con estados de carga/error/vacío; no crear otro carrito, no duplicar inventario. Si el backend está bloqueado, presentar únicamente las tres familias sin precios ni stock ficticios. No afirmar "comprar ahora" si aún no puede comprar.
- CTA general `Ver catálogo completo` -> `/productos`.

### S06. De un residuo a una nueva posibilidad (microexperiencia interactiva)
- Título `Lo que parece un residuo puede convertirse en innovación`.
- Mini recorrido con 5 pasos **informativos y accesibles**: 1) selección y separación del residuo; 2) limpieza y acondicionamiento; 3) deshidratación y reducción de tamaño cuando corresponda; 4) investigación de ingredientes/formulaciones según el producto; 5) control y preparación del producto.
- Cada paso debe activar un panel de texto pertinente, usando tabs/buttons reales con estado; funcional en touch, click y teclado. No imagen, no SVG que finja fotografía, no animación invasiva. El recorrido es **esquemático** y no representa un procedimiento uniforme ni revela secretos industriales.
- Enlace `Descubre nuestros procesos` -> `/bio-investigacion`.

### S07. Avance de Bio Investigación
- Bloque editorial más científico con texto `Detrás de cada producto hay preguntas, ensayos y conocimiento.`
- Introducir I+D, colaboración científica, nanotecnología, nuevos ingredientes y experiencia de laboratorio, a partir de la entrevista y página institucional. No enumerar proyectos ganados, patentes o licitaciones específicas sin evidencias aprobadas.
- MediaSlot `home-research-lab`. CTA `Explorar Bio Investigación` -> `/bio-investigacion`.
- No convertir esta sección en toda la página de investigación.

### S08. Marcas y soluciones que nacen de la investigación
- Explicar que la empresa desarrolla distintas líneas/marcas; diseño con espacio `home-brands` disponible para fotografía o gráfica propia más adelante.
- Si los nombres Bio-Renua/Bio-Clean aparecen en documentos validados, utilizarlos cuidadosamente. Si no hay seguridad en nombres/categorías, dejar textos editables de marca desde un archivo de contenido, sin logos fabricados.
- CTAs hacia `/bio-investigacion` y `/productos`, no abrir una nueva tienda ficticia.

### S09. Impacto y economía circular
- Encabezado: `Producir también es repensar los recursos.`
- Mensaje sobre reutilización/revalorización y separación de materias primas. Evitar indicadores no respaldados (`92`, `100%`, `cero residuos`, `menos CO₂`) y formulaciones absolutas.
- Slot vacío `home-impact`. Link `Conoce Bio Impacto` -> `/bio-impacto`.
- Puede mencionar futura posibilidad de colaboración con recolección de residuos, pero no afirmar que existe ya un programa público de donación con incentivos (se planteó como **idea**, no implementación aprobada).

### S10. Conoce a las personas detrás de DK
- Introducir con calidez el carácter de empresa impulsada por dos científicas/emprendedoras; más detalle y nombres biográficos solo si están confirmados en fuentes del proyecto.
- Slot vacío `home-founders` para futuros retratos reales. CTA `Conoce a las fundadoras` -> `/nosotras`.
- No generar retratos ni avatares.

### S11. Empresas, distribución y dónde comprar
- Composición comercial limpia que separe **venta directa** de **relaciones comerciales**. Redactar sobre la posibilidad de soluciones para instituciones/distribuidores con contacto individualizado.
- CTA `Soluciones para empresas` -> `/empresas` y `Dónde encontrar nuestros productos` -> `/donde-comprar`.
- Slot `home-business` para futura imagen real. No mostrar precios mayoristas en público: entrevistadas indicaron que son condiciones negociadas empresa a empresa. No inventar direcciones de distribuidores.

### S12. Cierre de conversión y footer
- CTA final con una sola idea, por ejemplo **«Conoce lo que sucede cuando la ciencia y el cuidado se encuentran.»**; botones `Ver productos` y `Escríbenos`.
- Footer completo y elegante: mapa multipágina, accesos a investigación/impacto/empresa, contacto con datos confirmados, espacio para redes **solo si sus URLs son oficiales y verificadas**, enlace a políticas/privacidad/términos preparados con estado honesto si todavía no existen.
- Usa datos institucionales confirmados; no inventes números, correos ni horarios. No anuncies "sitio legalmente conforme" sin revisión.

## 7. Contenido y arquitectura técnica limpia

- Inspecciona el App Router existente. Mantén el Home en la ruta real `/`; respeta TypeScript y Tailwind existentes. Reutiliza librerías locales aprobadas. No introduzcas dependencias innecesarias ni frameworks visuales incompatibles.
- Separa contenido de presentación con `homeContent` tipado (puede vivir en `src/content/home.ts` o la ruta equivalente del frontend). Cada sección debe poder editarse sin buscar cadenas dentro de JSX gigante.
- Componentes propuestos (ajusta a estructura existente): `SiteHeader`, `MobileNav`, `SiteFooter`, `MediaSlot`, `SectionHeading`, `ActionLink`, `FeatureGrid`, `ProductFamilyPreview`, `CircularProcessSteps`, `ResearchTeaser`.
- No concentrar todo en un único archivo `page.tsx` kilométrico; conservar estructuras de carpetas actuales.
- Reutilizar la capa de datos Medusa si existe; no hacer llamadas públicas con secretos, no exponer credenciales en frontend, no depender de servicios no verificados para mostrar el Home.
- No poner datos personales, RUT ni información real de compradores. No crear facturas, ventas ni reseñas ficticias para decorar.
- Metadata de la página: título legible `BioProductos DK | Ciencia, innovación y sostenibilidad`, description fiel, OpenGraph textual sin imagen si no se aportó, URL canónica solo si corresponde al entorno real (no declarar dominio productivo del demo como canónico), estructura H1 única. No añadir claims de schema.org no verificados.
- Mantén la compatibilidad Mac Intel/entorno actual. Si Medusa backend no compila, no escondas el fallo. El frontend puede validarse por separado con diagnóstico preciso; documenta dependencias y bloqueos.

## 8. Interactividad y funcionalidad verificable

1. Todos los enlaces y botones realizan una acción correcta y accesible; no enlaces `#` vacíos, menús inertes ni CTAs que simulen llevar a páginas existentes.
2. Menú móvil abre/cierra, Escape cierra, foco manejado, active route actualizado.
3. Componente de proceso responde por mouse, táctil, Enter/Espacio y teclado conforme al patrón elegido; mantiene estado claro.
4. Tarjetas enlazadas a categorías/rutas válidas; si la tienda no está lista, no se presenta como venta operativa.
5. Estados de carga/error/vacío de las consultas reales. Nada de silenciosamente fabricar productos o cantidades.
6. Preservar layout cuando medios todavía no existen.
7. Comprobar scroll, headers, anchor offsets cuando corresponda, enlaces externos con `rel` apropiado.

## 9. Controles visuales y estándares de calidad

- Revisa en 320 / 375 / 390 / 768 / 1024 / 1440 / 1920 px.
- Audita overflow horizontal, saltos de layout, jerarquía, legibilidad y contraste, `prefers-reduced-motion`, `focus-visible`, estado del drawer móvil, pie de página, botones y links.
- Evita por defecto más de dos CTAs primarios visuales en un mismo bloque, textos ilegibles sobre fondos, exceso de sombras, 3D gratuito, carouseles automáticos, secciones duplicadas y "falso lujo".
- La navegación global debe seguir siendo usable sin JavaScript en lo posible; prioriza componentes de servidor para contenido estático y componentes cliente solamente donde hay interacción.
- Debe percibirse **concluida a nivel visual aun con todos los MediaSlot vacíos**; use balance tipográfico y composición, no dependas de imágenes que todavía no tenemos.

## 10. Plan de ejecución: Codex debe hacer, no solo describir

**Fase A — Reconocimiento (breve).** Enumera estructura detectada, ruta frontend, fuentes disponibles, riesgos técnicos y archivos que pretendes modificar. Si hay código Home previo, consérvalo en control de versiones; no borres trabajo sin motivo.

**Fase B — Sistema base.** Ajusta tokens de color/tipo/espaciado, SiteHeader, MobileNav, SiteFooter y MediaSlot. Configura rutas reales o placeholder mínimos. No toques pantallas admin.

**Fase C — Implementar el Home COMPLETO.** Construye todas las secciones S01–S12 y el contenido conectado; añade microinteracciones donde aporten utilidad. No introduzcas imágenes.

**Fase D — Validación.** Ejecuta formato/lint/typecheck/build y pruebas apropiadas **con comandos detectados del repo**, no asumas scripts inexistentes. Si está instalado Playwright, usa test de navegación y responsive; si no, no afirmes que lo ejecutaste. Prueba manual o automatizada de accesibilidad básica. **Reporta resultados exactos y errores**.

**Fase E — Documentar.** Crea/actualiza:
- `docs/diseno/INVENTARIO_MEDIOS_HOME.md` (slots vacíos y recomendaciones de medios futuros).
- `docs/ROADMAP.md` (S01–S12 y evidencia de aceptación; estado real).
- `docs/DECISIONES_HOME.md` o su equivalente existente (decisiones y tradeoffs).
- Guía muy breve para cambiar los textos desde `homeContent` y para incorporar fotos propias cuando el usuario las entregue.

**Fase F — Entrega.** Al terminar responde en español con: (1) resumen de lo construido; (2) árbol corto de archivos modificados; (3) comandos reales de arranque; (4) ruta localhost real; (5) resultados de validaciones y bloqueos; (6) lista de MediaSlots creados; (7) preguntas mínimas sobre contenido/fotos por validar. No afirmes que terminaste algo que no funciona.

## 11. Criterios de aceptación obligatorios

- [ ] El Home no es una landing genérica ni sustituye las páginas independientes.
- [ ] Existen navegación y rutas reales para Inicio, Nosotras, Bio Investigación, Productos, Empresas y Contacto; rutas complementarias accesibles de forma ordenada.
- [ ] Header y footer compartidos, responsive, teclado y móvil.
- [ ] S01–S12 construidas con calidad editorial, variedad compositiva y contenido respaldado.
- [ ] Las áreas fotográficas y de video están completamente vacías, sin recursos generados, descargados o inventados.
- [ ] MediaSlot es reutilizable y el inventario de fotografías futuras está documentado.
- [ ] Los CTAs navegan a destinos válidos; no enlaces vacíos.
- [ ] No hay cifras, certificaciones, precios, patentes, logros ni reseñas sin validar.
- [ ] Se conservaron datos, código, documentación y configuración ajenos a esta etapa.
- [ ] Se registraron pruebas de lint/typecheck/build y responsive de acuerdo con lo disponible, sin ocultar problemas.
- [ ] Todos los cambios aparecen en `docs/ROADMAP.md` con el estado real.

## 12. Orden explícita de trabajo

**COMIENZA AHORA con esta Etapa 01, no te detengas en propuestas teóricas.** Implementa y verifica el Home hasta cumplir los criterios de aceptación razonablemente alcanzables con las dependencias actuales. Prioriza calidad, funcionamiento, rigor científico y legibilidad por encima de cantidad de efectos. Si falta una fuente esencial o una operación pone en riesgo código/datos, pregunta antes de actuar. **NO continúes automáticamente a Bio Investigación ni a ninguna otra página completa**: espera el Prompt Maestro 02.
