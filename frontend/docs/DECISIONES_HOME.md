# Dirección vigente — «Ciencia que se vive»

**2026-10-18.** El usuario autorizó un rediseño completo del Home con las fotografías originales que dejó en `public/images/home`. Se revisaron sus seis archivos antes de editar. La autorización sustituye las restricciones históricas de superficies vacías/solo CSS para estos originales y sus variantes web. Los antecedentes de abajo se conservan para el equipo.

## Dirección de arte y composición

El foco cambia desde marcos abstractos a productos y personas reales. La foto panorámica abre una escena de marca continua: titular grande, verde profundo, acento lima, lectura protegida y una ficha enlazada al catálogo. En móvil la imagen se desplaza hacia la base del hero en vez de comprimirse a una columna pequeña.

El recorrido alterna: hero oscuro fotográfico → manifiesto breve en papel → ADN de cuatro materiales y formas distintas → productos sobre salvia con marcos y alturas alternadas → cuaderno de ciencia y secuencia explorable → interludio técnico oscuro → Empresas con detalle fotográfico y tres caminos → circularidad sobre verde cálido con diagrama → fundadoras con retrato y anotación humana → cierre tipográfico de gran escala → footer institucional. No se repite la misma tarjeta en todas las secciones.

La fotografía individual de champú se identifica por su etiqueta visible, aunque el archivo se llame `jabon modelo.JPG`. Se presentan familias, sin deducir precios, disponibilidad ni fichas vigentes de las etiquetas. No se transcriben sellos, porcentajes o propiedades de los envases como afirmaciones verificadas del sitio.

No se encontró material de laboratorio ni residuos: esas secciones comunican con tipografía, información de la entrevista y diagramas conceptuales. El dibujo de circularidad no declara impacto medido y el mapa I+D no representa moléculas ni resultados. Los logros, proyectos adjudicados, marcas registradas, patentes, licitaciones y participación colaboradora siguen sujetos a documentación; no se anuncian como verificados.

## Interacciones y continuidad

Se conservan menú móvil con Escape, foco y fallback sin JS; enlaces multipágina; tabs del proceso con flechas/Home/End; sticky header y revelado suave que nunca oculta el contenido de base. Se añaden detalles desplegables nativos al índice de Bio Investigación y acercamiento discreto de fotografías al hover. Movimiento reducido elimina transiciones/transformaciones de interacción y cancela revelados. El menú abierto desactiva el filtro del header para que su overlay fijo abarque el viewport incluso después de scroll.

Los seis enlaces principales usan Inicio, Nosotras, Bio Investigación, Productos, Empresas y Contacto. Las ocho páginas interiores continúan con su estado de preparación, sin desarrollar su contenido. No se modifican middleware, API, catálogo nativo, checkout, Medusa ni PostgreSQL. El correo y ubicación públicos previamente documentados permanecen; no se inventan redes ni textos legales.

## Preparación técnica

Cuatro `.JPG` eran HEIC/HEVC y no se podían servir con su extensión aparente. Sips falló y Sharp carecía del decodificador HEVC; se resolvió con conversión local aislada, preservando los seis originales. Los 18 derivados WebP son las únicas fuentes del Home. Registro y decisiones por foto en [INVENTARIO_MEDIOS_HOME.md](INVENTARIO_MEDIOS_HOME.md).

Se respaldó todo archivo editado existente en `.local/home-real-photos-before/`, además de registrar el prefijo y hash del ROADMAP antes de añadir esta sesión. No hay Git inicializado; no se reinició el repositorio. Las verificaciones nuevas se registran como `evidence/home-photos-*`; no se presentan pruebas antiguas como validación del rediseño.

**Alcance de aceptación:** implementación del Home y controles estáticos/compilación, según resultados del ROADMAP. No equivale a aprobación estética, accesibilidad certificada, responsive comprobado en navegador ni operación de comercio. Las pruebas HTTP/Playwright requieren un entorno que permita escuchar en 127.0.0.1:8000. No avanzar a otra página sin aprobación.

---

# Historial de decisiones anteriores

# Decisiones del Home V2 — 2026-10-18

## Dirección vigente: «Laboratorio vivo» — solicitud posterior del usuario

El usuario pidió rehacer el Home por falta de identidad, ritmo y vida. Esta solicitud sustituye la restricción anterior de superficies visualmente vacías: **autoriza expresamente degradados suaves, tramas, composiciones abstractas, overlays, marcos y captions hechos con código**. Permanecen prohibidos los activos de imagen/video generados, descargados, reales o de stock. El registro V2 que sigue más abajo conserva las decisiones de esa entrega; para el diseño actual prevalece esta sección y el último registro de ROADMAP.

### Cómo cambia la composición

- Hero sobre un lienzo verde profundo, tipografía con más carácter, acento lima, composición orgánica integrada y anotaciones flotantes. La gráfica se construye con bordes, sombras y degradados CSS; no representa un envase, una molécula real ni un resultado de laboratorio.
- Pilares con alturas/desplazamientos, tonos y motivos propios; productos con ritmo escalonado en escritorio y alternado en tablet, superficies salvia/oliva/piedra y etiquetas. Se muestran **familias**, no productos/SKU oficiales inventados; sus ventajas descriptivas se limitan a uso y formato confirmados.
- Narrativa «Antes de ser un producto, fue una pregunta», conservando las cinco etapas interactivas y el fallback sin JavaScript. Bio Investigación tiene una trama técnica y áreas de trayectoria futura: no se publican logros, patentes o adjudicaciones como hechos comprobados.
- Tres recorridos comerciales con destino real, economía circular con una composición distinta y contexto explícito sobre la idea futura de colaborar con residuos. La sección humana integra dos marcos superpuestos para fundadoras y marca, sin retratos ni avatares inventados.
- Cierre de mayor contraste, tres CTA y footer institucional más sólido. No se desarrolló ninguna página interior completa.

### Implementación y accesibilidad

`MediaSlot` ahora devuelve una figura con dos capas separadas: un destino `data-media-slot` **vacío**, y una composición CSS `dk2-art` marcada `aria-hidden`. El caption legible identifica «Composición abstracta · fotografía futura». El registro agrega `label`, `caption` y `treatment`; no contiene `src`, poster ni URLs de medios. Al recibir originales se podrá sustituir la capa decorativa sin cambiar el ID de reserva ni la estructura editorial.

`SiteEnhancements` mejora el header al desplazarse y anima los bloques al entrar mediante IntersectionObserver y Web Animations (320 ms). El contenido no se oculta antes de observarlo y permanece visible sin JS o sin soporte. Se cancelan animaciones al activar movimiento reducido y al desmontar. Sin librerías nuevas, parallax ni animaciones automáticas continuas. Menú y tabs conservan sus controles de teclado.

Paleta provisional: bosque `#173F32`, tinta `#183429`, papel `#F8F8F1`, salvia `#E5EDDF`, lima `#D8EE9A` y piedra. Los acentos por familia son recursos editoriales, **no paletas de submarcas verificadas**. Tipografía Manrope existente. CSS aislado bajo `.dk2-*`; no se modificaron backend, checkout, proveedores, stock ni middleware.

Orden actual de los marcadores: S01 barra, S02 header, S03 hero e introducción breve, S04 pilares, S05 familias, S06 ciencia, S07 investigación, S08 empresa/distribución, S09 circularidad, S10 personas/marca, S11 cierre, S12 footer. Ya no corresponden al orden histórico del V2.

### Fuentes y contacto

Se reconsultaron en modo texto el Home, Bio Impacto y Contacto oficiales. Home y Contacto fallaron por timeout; respondió [Bio Impacto](https://bioproductosdk.com/bio-impacto/). No se hizo auditoría visual ni se siguieron enlaces de medios. Se usa el propósito de revalorización junto con la entrevista; se excluyen los porcentajes/absolutos ambientales de la página pública.

El footer incluye `biocontacto@bioproductosdk.com` y «Santiago, Chile», publicados en esa fuente, con enlace de procedencia. El enlace `mailto:` abre el cliente del visitante; el proyecto no envía correos ni recopila datos. No se publican teléfonos ni redes inferidas. URLs sociales y textos legales siguen pendientes. La descripción mínima de `/contacto` se ajustó para reconocer el correo ya visible en footer.

Antes de editar se respaldaron Home, CSS, contenido, primitivas, layout y spec en `.local/home-v3-before/`. No hay `.git`; no se hizo commit ni se reinicializó el proyecto. Verificación y limitaciones actuales en ROADMAP y `evidence/home-v3-*`.

---

## Registro conservado de la entrega V2

## Especificación y alcance

Se localizó y leyó íntegramente `docs/PROMPT_01_HOME_BIOPRODUCTOS_DK_PREMIUM_V2.md`. La ubicación recibida `docs/prompts/...` sigue sin existir; no se movió ni duplicó el documento del usuario. V2 sustituye al prompt anterior solo para Home. El registro anterior de archivo ausente en ROADMAP se conserva como historia de la primera auditoría.

Frontend: Next.js App Router en `apps/storefront`, backend Medusa en `apps/backend`, dependencias y motor comercial conservados. No se instalaron paquetes ni se cambiaron versiones. No se modificaron Shopify, dominios, servicios productivos, pagos, datos personales ni inventario.

`AGENTS.md` y `README.md` completos estaban en `docs/`. Se añadieron entradas en la raíz: AGENTS dirige a las reglas íntegras conservadas; README explica el Home V2 y enlaza la guía histórica. No se borraron documentos.

## Arquitectura y navegación

- Grupo `src/app/(editorial)/`: layout compartido, Home `/` y ocho rutas mínimas independientes. Las rutas `[countryCode]` del starter se conservan.
- `src/content/home.ts`: `homeContent` tipado, textos originales separados de JSX; `site.ts`: mapa de navegación/estados mínimos; `media.ts`: registro de diez espacios vacíos.
- `src/modules/dk/editorial/`: Home, navegación, layout, primitivas, proceso y estado de preparación. Contenido estático en servidor; solo navegación y proceso son componentes cliente.
- Header y footer compartidos, marca tipográfica "BioProductos DK" sin inventar logo gráfico. No hay activos oficiales aprobados en el proyecto.
- Navegación principal: `/`, `/nosotras`, `/bio-investigacion`, `/productos`, `/empresas`, `/contacto`. Footer: `/bio-impacto`, `/donde-comprar`, `/informacion-legal`.
- Solo `/` tiene contenido desarrollado. Los demás destinos muestran "Esta sección se está preparando" y volver al inicio. No equivalen a páginas terminadas. No se implementó Bio Investigación.
- El middleware permite únicamente rutas editoriales exactas GET/HEAD antes de consultar regiones Medusa. En modo preview mantiene bloqueo comercial y de mutaciones, sin abrir subrutas privadas por prefijo. No se requieren base, API key ni sesión para el Home.
- `/demo`, su CSS y SVG anteriores quedan conservados como antecedente, fuera de los enlaces del Home V2. No se usan ni importan en la nueva portada. Respaldo del spec E2E y smoke anteriores en `.local/home-v2-before/` (ignorado). No hay repositorio `.git` disponible; no se creó un commit.

## Composición S01–S12

| Bloque | Implementación                                                                                |
| ------ | --------------------------------------------------------------------------------------------- |
| S01    | Header sticky, navegación activa, marca textual y menú móvil                                  |
| S02    | Hero editorial asimétrico, dos CTA a páginas propias y slot de video vacío                    |
| S03    | Manifiesto breve, composición tipográfica 1:2                                                 |
| S04    | Cuatro pilares numerados sin ilustraciones ni afirmaciones genéticas                          |
| S05    | Tres familias editoriales y sus espacios vacíos; sin precios, stock, compra ni SKU inventados |
| S06    | Cinco etapas con selector accesible y paneles de contenido; slot de proceso                   |
| S07    | Avance científico sobre verde sólido; slot de laboratorio y CTA                               |
| S08    | Líneas de cuidado del hogar/personal y slot; nombres comerciales aún excluidos                |
| S09    | Economía circular con slot, sin indicadores ni servicio público de donación                   |
| S10    | Introducción breve a las dos fundadoras y espacio para retrato                                |
| S11    | Relación institucional/distribución, condiciones privadas y destino dónde comprar             |
| S12    | Cierre con dos CTA y footer agrupado, copyright dinámico y estado legal honesto               |

## Identidad provisional

Tokens en `src/app/(editorial)/editorial.css`, bajo `.dk2-site`, sin alterar el tema del comercio ni el de `/demo`. Se conserva la familia de verdes existente y se refina según V2: bosque `#173F32`, tinta `#17251E`, fondo `#F7F8F3`, superficie `#E9EEE5`, texto secundario `#53675C`, borde `#D6DED4`. **Propuesta editorial; no códigos oficiales.** El gris secundario se oscurece respecto de la sugerencia V2 para legibilidad. Sin degradados, fondos fotográficos ni iconos ornamentales.

Manrope Variable autoalojada ya instalada (OFL), sin descargas de fuentes. Contenedor máximo 1456 px incluyendo gutters, área útil hasta 1328 px, rejillas proporcionales y tipografía fluida. Hero a dos columnas; bloques de texto, pilares y dos secciones verdes alternan con medios vacíos. Breakpoints 1100/768/450 px y ajuste amplio a 1600. Objetivos de revisión: 320/375/390/768/1024/1440/1920 px. Todos los slots reservan espacio mediante `aspect-ratio`.

## Interacción, accesibilidad y metadatos

Menú móvil basado en `details/summary`, utilizable sin JavaScript. Con JS se mejora a panel modal: Escape, cierre exterior, botón cerrar, foco inicial y retorno, ciclo de Tab, bloqueo/restauración de scroll y cierre al cambiar a escritorio. Rutas activas con `aria-current`. Skip link y main enfocable. No se muestran buscadores, cuentas ni contadores comerciales inertes.

Proceso con tabs y flechas izquierda/derecha, Home/End, Enter/Espacio y toque; estado `aria-selected`, panel asociado y foco visible. Alternativa legible sin JavaScript. No es una receta ni un proceso uniforme: la advertencia expresa las variaciones según material/producto. Transiciones 200 ms limitadas a enlaces/estados; movimiento reducido desactiva animaciones y transiciones. Sin bibliotecas de animación ni contenido condicionado a scroll.

Metadatos textuales, un H1 por página, español de Chile y noindex del entorno. Sin canonical productivo. `openGraph.images` y `twitter.images` vacíos en el layout editorial para excluir imágenes heredadas del starter sin borrar sus archivos. La compilación y comprobación del HTML deben confirmar la ausencia de esas etiquetas. Ningún `MediaSlot` finge que ya contiene una fotografía.

## Trazabilidad del contenido

| Clasificación                                        | Fuente / uso                                                                                                                                                                                              |
| ---------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CONFIRMADO en entrevista                             | Prioridad de inicio/productos/ciencia; dos fundadoras; trabajo con residuos, cosmética sólida, nanoemulsiones, ensayos y controles; relación B2B privada                                                  |
| CONFIRMADO como relato de visita, no catálogo actual | Dos aromas de detergente, tres tipos de champú y tres variedades de sales; marcado como referencia histórica y disponibilidad por confirmar                                                               |
| CONFIRMADO como propósito institucional              | Revalorización de materiales y economía circular; entrevista y texto de `/bio-impacto/` consultado el 18 de octubre                                                                                       |
| PROPUESTA editorial                                  | Titulares, bajadas, nombres de etapas, CTA y estructura visual de `homeContent`; copy original, sin copiar párrafos oficiales                                                                             |
| PENDIENTE DE VALIDAR / excluido                      | Bio-Renua/Bio-Clean, paletas/logos oficiales, biografías/nombres individuales, patentes, proyectos adjudicados, premios, cifras ambientales, certificaciones, precios, stock, locales, políticas y medios |

La consulta textual de `https://bioproductosdk.com/bio-impacto/` respondió. Se consideró únicamente su propósito de economía circular; no se trasladaron porcentajes, absolutos ambientales ni afirmaciones comerciales. Home, Nosotras, `/home-2/`, Empresa y Contacto fallaron por timeout; Productos no estuvo accesible mediante la herramienta. No se afirma haber auditado visualmente el sitio ni verificado sus otras páginas. No se siguieron enlaces de imágenes ni se descargaron medios. Aunque Bio Impacto muestra contacto, no se publica hasta ratificar vigencia/autorización: `/contacto` explicita ese pendiente.

La entrevista se conserva íntegra, sin difundir parámetros de fabricación ni tratar errores de transcripción como hechos. No se afirma fecha de origen no corroborada ni autorizaciones sanitarias generales.

## Comercio y edición posterior

El backend no tiene catálogo persistente validado; Home utiliza las familias editoriales permitidas por V2. No intenta una consulta que dependa de PostgreSQL ni presenta fixtures como inventario. No se duplicó carrito o stock. La conexión futura usará la capa nativa Medusa y requerirá estados reales de carga/error/vacío y ensayos de persistencia, antes de activar compra.

Para cambiar textos: editar `homeContent`, manteniendo destinos existentes y contrastando fuentes; no cambiar JSX para actualizar bajadas. Los nombres de marcas están excluidos hasta validación. Para fotografías originales: seguir `diseno/INVENTARIO_MEDIOS_HOME.md`; hoy no existe ningún archivo de medios nuevo ni rama activa de renderizado de imagen/video.

Las verificaciones y bloqueos reales de esta entrega se registran en ROADMAP y `evidence/`. Ninguna compilación sustituye una revisión visual o una prueba de navegador. La próxima página completa requiere aprobación del usuario.
