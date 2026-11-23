# PROMPT 01 — HOME PREMIUM | BioProductos DK

Actúa como un equipo sénior integrado por Product Designer, Director de Arte Digital, UX Writer, Arquitecto Frontend, Desarrollador Next.js/TypeScript, Especialista en Accesibilidad, SEO Técnico y QA. Implementa **únicamente la página de inicio (HOME)** de un sitio profesional para BioProductos DK, como parte de una propuesta final universitaria competitiva. El resultado debe sentirse como un producto digital editorial premium, limpio, moderno, preciso y creíble, inspirado en los principios de diseño de Apple, sin copiar su marca, y conservando la personalidad científica, ecológica y humana de BioProductos DK.

## 0. CONTEXTO, FUENTES Y FORMA DE TRABAJO

1. Esta es una propuesta independiente de evaluación para la empresa; NO cuenta con autorización para migrar su Shopify, mover dominios ni intervenir sistemas productivos.
2. Lee primero `AGENTS.md`, `README.md`, `docs/` y `docs/ENTREVISTA_TERRENO_BIO_DK.md`. Contrasta con los textos públicos de `https://bioproductosdk.com/`, `/nosotras/`, `/home-2/`, `/productos/`, `/empresa/` y `/bio-impacto/` solo si la red lo permite. Si hay errores de acceso, trabaja con las fuentes locales y documenta la limitación sin inventar contenido.
3. Conserva la arquitectura y el trabajo previo: identifica si el proyecto usa Medusa 2, Next.js, Postgres y la estructura de carpetas actual. No reinicialices, borres, reemplaces ni dupliques el proyecto. No pierdas los avances de backend y documentación. No interrumpas el frontend por un problema ajeno de instalación del backend; diagnostica y comunica los bloqueos con honestidad.
4. Comienza con una breve auditoría del estado actual, propone los archivos por modificar y luego IMPLEMENTA el Home, sin solicitar aprobación en cada cambio ordinario. Mantén cambios localizados.
5. Distingue contenido confirmado por fuentes, contenido provisional que requiere autorización y propuestas de diseño. No presentes estimaciones como hechos.
6. Haz commits solo si el repositorio está correctamente configurado y puedes seguir las convenciones actuales; de lo contrario informa cambios sin forzar.

## 1. OBJETIVO Y ALCANCE EXACTO

Implementar una página `/` completa, diferenciada de las páginas interiores, con calidad visual de producto final y navegación consistente. NO construir todas las páginas en una sola landing page. Las secciones del Home serán introducciones breves y elegantes que conduzcan a páginas propias.

Arquitectura de navegación prevista, a conservar o crear progresivamente como páginas autónomas:
- `/` Inicio
- `/bio-investigacion` Bio Investigación
- `/nosotras` Nosotras
- `/productos` Productos / Tienda
- `/empresas` Empresas y Distribuidores
- `/bio-impacto` Bio Impacto
- `/donde-comprar` Dónde Comprar
- `/contacto` Contacto

Conservar rutas ya implementadas, si existen, y no eliminar otros flujos como carrito, cuenta, checkout o admin. El menú principal debe ser claro y no sobrecargado: Inicio, Nosotras, Bio Investigación, Productos, Empresas, Bio Impacto, Contacto; Dónde Comprar puede integrarse mediante submenú o CTA secundaria. No abrir enlaces rotos: para páginas todavía no trabajadas crear únicamente rutas-esqueleto mínimas identificadas como trabajo en desarrollo, SIN tratarlas como páginas terminadas, o utilizar rutas existentes. NO desarrollar el contenido completo de esas páginas ahora.

## 2. REGLA CRÍTICA: IMÁGENES Y VIDEO COMPLETAMENTE VACÍOS

El propietario del proyecto aportará TODAS las fotografías, videos y recursos de producto.

PROHIBIDO en esta fase:
- Usar imágenes de stock, Unsplash, Pexels, Google, URLs remotas de imágenes o bancos de fotos.
- Generar fotos por IA, renders de producto, ilustraciones decorativas, mockups de producto ni avatares ficticios.
- Utilizar `background-image`, texturas fotográficas, imágenes aleatorias, placeholders que aparenten fotografías, gradients usados como falsas imágenes, emoticonos gigantes que hagan de fotografía o videos externos.
- Incorporar envases, premios, científicos, equipos o logotipos inventados.

OBLIGATORIO:
- Construir un sistema reutilizable `EditorialMediaSlot` o nombre equivalente para hero, fotografía de laboratorio, producto, retratos, proceso e imagen B2B.
- Cada slot debe reservar proporciones adecuadas (ej. hero 4:5 o 5:4 según pantalla, editorial 16:10, producto 4:5, retratos 3:4), mantener forma responsiva y evitar saltos de layout.
- Mientras no haya archivo, el slot debe quedar VISUALMENTE VACÍO: superficie neutra armoniosa, sin foto y sin icono de imagen rota; puede mostrar SOLO EN MODO DESARROLLO una etiqueta discreta de ubicación (ej. `HERO_FOTO`, `LAB_FOTO`, `PRODUCTO_01`), nunca en una demostración pública.
- Para video del hero preparar un `EditorialVideoSlot`, vacío por defecto, sin poster, autoplay ni video inventado. Cuando reciba un archivo propio, podrá reproducirlo respetando accesibilidad y ahorro de datos.
- Definir un registro central tipado de medios (por ejemplo `src/content/media.ts`) para que luego insertar archivos desde `/public/media/` no requiera rehacer componentes. Los medios deben ser opcionales; si falta un archivo la página debe verse deliberadamente diseñada y no rota.
- Si ya existe un logo ORIGINAL de DK en el proyecto, reutilizarlo sin alterarlo; si no existe usar logotipo tipográfico temporal "BioProductos DK" (no inventar marca gráfica).
- Íconos discretos de interfaz pueden existir; no sustituyen fotografías.

## 3. DIRECCIÓN DE ARTE Y SISTEMA VISUAL

- Preservar la esencia de la identidad actual: verde oscuro ecológico, blanco, superficies claras y acentos vinculados a sus líneas de productos. Inspeccionar primero colores y tipografía existentes; NO fingir que se conocen códigos oficiales. Proponer design tokens versionados con valores provisionales claramente documentados cuando no haya manual de marca.
- Diseño limpio, editorial, premium y técnico a la vez: jerarquía clara, espacios generosos, tipografía de alta legibilidad, módulos de anchura controlada, blancos amplios, rejilla consistente, titulares memorables y fotografías futuras integradas naturalmente.
- No diseñar un mosaico interminable de tarjetas redondeadas. Alternar composición a dos columnas, secciones editoriales full-bleed de color sólido, texto central, grillas tipográficas y bloques de contenido asimétricos equilibrados.
- Preferir fuentes existentes/locales o disponibles en el stack; evitar dependencias innecesarias y la descarga de fuentes privadas. Escalas responsivas fluidas (`clamp`) y line-height cuidado.
- Componentes refinados: botones primario/secundario/textual, estados hover/focus/disabled, bordes sutiles, sombras mínimas, radios medidos, sin glassmorphism excesivo, sin animaciones ruidosas, sin efectos 3D gratuitos.
- Transiciones sutiles y respetuosas con `prefers-reduced-motion`; prioridad absoluta a velocidad, accesibilidad y legibilidad.
- Mantener consistencia con la apariencia que se construirá después en Bio Investigación y demás páginas.

## 4. HOME — ESTRUCTURA EDITORIAL COMPLETA Y FUNCIONAL

Implementar las siguientes secciones en este orden, con ritmo visual profesional. Cada sección debe tener una función y NO duplicar párrafos largos de las páginas interiores.

### H01 — HEADER GLOBAL EXCELENTE
Header semitransparente solo si respeta contraste real; sticky al desplazarse cuando resulte útil. Logotipo original si está disponible o tipográfico. Navegación desktop accesible, enlaces reales, submenús donde sea necesario, buscador de productos solo si está operativo, acceso a carrito con contador real cuando exista motor conectado. Menú móvil bien resuelto con abrir/cerrar, bloqueo de scroll seguro, focus management, cierre con Escape, navegación por teclado, indicadores de página activa y no superposición de contenido. No inventar iconos de cuenta o funcionalidades que no existan.

### H02 — HERO EDITORIAL DE ALTO IMPACTO
Microetiqueta: `CIENCIA · INNOVACIÓN · ECONOMÍA CIRCULAR`.
Título editorial sugerido: `Ciencia que transforma residuos en nuevas posibilidades.`
Descripción breve: `En BioProductos DK desarrollamos soluciones de limpieza e higiene a partir de investigación científica y la revalorización de residuos orgánicos.`
CTA principal: `Descubrir productos` a `/productos`.
CTA secundaria: `Explorar nuestra ciencia` a `/bio-investigacion`.
Slot visual totalmente vacío `HERO_MEDIA` preparado para foto o video propio; preservar el concepto del video de detergente que a las fundadoras les gustó en su web anterior. Hero adaptado a desktop y mobile sin perder jerarquía.

### H03 — PRESENTACIÓN DE IDENTIDAD EN POCAS PALABRAS
Bloque de texto limpio "Ciencia y productos que cuidan el planeta" como claim identificado en su comunicación. Una declaración corta y comprensible sobre el vínculo entre laboratorio, sostenibilidad y productos cotidianos. Enlace `Conoce BioProductos DK` a `/nosotras`. NO reproducir el manifiesto completo aquí.

### H04 — CUATRO PILARES DE DK
Biotecnología, Nanotecnología, Innovación, Sostenibilidad: cuatro ítems breves, de precisión científica y con diseños elegantes basados principalmente en tipografía/íconos sencillos; evitar afirmar manipulación genética sin respaldo contextual. En escritorio grilla equilibrada; en teléfono apilado o carrusel accesible con botones reales. CTA a Bio Investigación.

### H05 — PRODUCTOS DESTACADOS COMERCIALES
Sección relevante y clara porque la empresa pidió ver sus productos apenas se entra. Mostrar categorías verificadas en entrevista: 2 detergentes de ropa (dos aromas), 3 champús sólidos por tipo de cabello y 3 variantes de sales de baño; total referido en terreno: 8 referencias, sujeto a confirmar catálogo actual. Priorizar entre 3 y 4 tarjetas destacadas si existen registros reales, con slots vacíos para fotos de producto. Nombres oficiales, precios, variantes, disponibilidad y enlaces deben venir del backend/catálogo real cuando esté funcionando: jamás inventar nombres de sales, aromas específicos no confirmados, precios ni stocks. Categorías y cantidades pueden mostrarse como información editorial de referencia si está claramente registrada como tal. Botones de agregar al carrito solo habilitados si la acción está conectada y se verificó la mutación real; en caso contrario priorizar `Ver producto` y mostrar un estado honesto, sin botones falsos. Enlace `Ver todos los productos` a `/productos`.

### H06 — LA CIENCIA DETRÁS DE CADA PRODUCTO
Presentación concisa del proceso explicado durante la visita, sin revelar procedimientos confidenciales: selección de biorresiduos, preparación, investigación/transformación, formulación, control de calidad y producto final. Diseñar un recorrido editorial interactivo con selector por etapas o acordeón completamente accesible, actualizando contenido al pulsar y mostrando el estado activo. Mantener precisión: la transcripción puede tener errores y no todos los productos pasan por una secuencia idéntica. Señalar que es un esquema general ilustrativo, no un protocolo industrial completo. Enlace profundo a `/bio-investigacion`.

### H07 — BLOQUE ESTRELLA: BIO INVESTIGACIÓN
Bloque con identidad más tecnológica, fondo de color sólido premium y composición editorial con slot vacío `LABORATORIO_FOTO`. Explicar investigación, desarrollo, colaboración científica y aplicaciones de nanotecnología/nanoemulsiones, a nivel divulgativo correcto. Mencionar que la empresa quiere mostrar proyectos, logros, marcas registradas, patentes y participación en proyectos, pero NO inventar listado, números, patentes específicas ni adjudicaciones. Enlace `Descubre nuestra investigación` a `/bio-investigacion`.

### H08 — MARCAS Y SOLUCIONES
Introducción a las líneas asociadas a BioProductos DK, mostrando claramente la empresa matriz y distinguiendo productos de limpieza de desarrollos de cuidado personal. La línea `Bio-Renua` aparece en comunicaciones recientes de la empresa; no afirmar disponibilidad de productos concretos sin catalogación actual y autorización. Otras denominaciones o colores deben verificarse con los materiales proporcionados por el equipo. No inventar nuevas marcas o logotipos. CTA a catálogo y Bio Investigación, con espacios de medios vacíos si los necesita la composición.

### H09 — COMPROMISO CON LA ECONOMÍA CIRCULAR
Sección educativa breve y potente sobre revalorización de biorresiduos, separación de materiales y aprovechamiento responsable, con lenguaje cercano. La entrevista identifica ejemplos de cáscaras de huevo, borra de café, cáscaras y hojas; no afirmar que aceptan indiscriminadamente donaciones ni mostrar indicadores ambientales sin fuentes. Un botón `Conocer nuestro impacto` lleva a `/bio-impacto`. Una línea secundaria puede anticipar la idea **a validar** de colaborar donando residuos con protocolo de recepción, sin anunciar servicio existente.

### H10 — QUIÉNES ESTÁN DETRÁS
Presentación cálida de BioProductos DK como empresa científica liderada por dos fundadoras. Slot de retratos completamente vacío (`FUNDADORAS_FOTO`) y copy conciso sobre el origen en 2020, investigación e innovación. No inventar citas, biografías ni títulos académicos individuales que no estén confirmados. CTA `Nuestra historia` a `/nosotras`.

### H11 — SOLUCIONES PARA EMPRESAS Y DISTRIBUIDORES
Composición de contraste suave con el objetivo B2B: presentar compras institucionales, consulta comercial y posibilidades de distribución. Aclarar que condiciones comerciales y precios para distribuidores se acuerdan empresa a empresa; en el sitio público solo deben aparecer precios finales de venta directa. CTA `Soluciones para empresas` a `/empresas`; enlace secundario a `/donde-comprar` para ubicar puntos de venta. Slot vacío si es necesario.

### H12 — CIERRE / CONTACTO / FOOTER COMPLETO
CTA final breve: `Hablemos de soluciones con ciencia.` Accesos diferenciados a compra, I+D y colaboración. Pie de página robusto con navegación agrupada (Empresa, Explorar, Ayuda, Legal), contacto obtenido de fuente oficial vigente, enlaces de redes solo si URLs verificadas, privacidad/venta/reclamos solo si existen páginas aprobadas (si no, documentar faltantes y dejar sin falsas políticas), copyright dinámico. No mostrar certificaciones, pagos seguros o partners por logos ficticios.

## 5. REGLAS DE CONTENIDO Y TONO

- Redactar español de Chile profesional, humano, elegante y directo, sin sobrecargar con tecnicismos.
- Los términos y propósitos de investigación deben corresponder a lo escuchado en terreno. Se mencionaron nanoemulsiones, aprovechamiento de residuos, cosmética sólida, controles de calidad y laboratorio autorizado para cosmética sólida de bajo riesgo. Estas referencias no autorizan publicar secretos industriales ni afirmar que cualquier producto de DK cuenta con una aprobación específica sin documentación.
- Diferenciar explícitamente el propósito de `/` (descubrimiento y orientación) y `/bio-investigacion` (profundidad técnica), `/nosotras` (historia), `/productos` (venta), `/empresas` (B2B), `/bio-impacto` (economía circular).
- No copiar párrafos extensos de la web original. Crear copy original fiel al fondo de lo que comunica DK.
- No inventar métricas de huella de carbono, porcentajes de reducción, patentes, premios, laboratorios certificados, testimonios, reviews, socios, direcciones de puntos de venta, precios, promociones o imágenes.
- Las áreas no verificadas deben poder ocultarse por configuración o quedar marcadas `PENDIENTE_VALIDACIÓN` solo en docs, nunca como hechos de la web pública.

## 6. ESTÁNDARES DE IMPLEMENTACIÓN

- Usar el framework y convenciones que ya tenga el repositorio; si es Next.js App Router, descomponer `/` en componentes independientes bien nombrados, tipados y reutilizables (p. ej. `src/components/home/*`, `src/components/layout/*`, `src/content/*`). No implementar un solo archivo de miles de líneas ni duplicar componentes globales existentes.
- Definir tokens y estilo central en CSS/Tailwind sin romper el tema del resto del proyecto. No hardcodear miles de estilos en JSX.
- Utilizar renderizado servidor donde corresponda, y client components únicamente para interacciones reales. Optimizar bundle, carga de fuentes y navegación.
- Si existe backend Medusa, crear/usar un adapter tipado para `featuredProducts`; NO fijar datos de productos falsos como si fueran inventario real. Si el backend está bloqueado, el Home igual debe arrancar con estado vacío editorial y enlaces informativos, y la dependencia comercial debe quedar registrada en el ROADMAP. No fingir compras.
- Respetar la separación entre publicación pública y panel administrativo. No tocar pagos, DTE o producción durante este sprint Home.
- Crear un esquema de medios `key`, `src?`, `alt?`, `aspectRatio` con datos mínimos y comportamiento sin imagen por defecto. Facilitar integración futura de fotos del usuario sin reescribir el layout.
- SEO: title, description, canonical configurable, open graph solo cuando haya recursos autorizados, estructura semántica correcta, H1 único, H2 por bloques, enlaces descriptivos y metadatos en español. No usar imágenes OG ficticias.
- Accesibilidad WCAG 2.2 AA como objetivo: contraste suficiente, navegación de teclado, foco visible, aria correcto, labels, touch targets, no trampas de foco, `prefers-reduced-motion`, evitar movimiento automático y contenido que desaparezca al hacer scroll.
- Responsive probado al menos en 360px, 390px, 768px, 1024px y 1440px; sin scroll horizontal, desbordes ni superposiciones. En móvil, botones fáciles de usar y encabezado compactado.
- Motion solo donde aporte claridad: apariciones suaves con fallback sin JS, estados hover/focus, transiciones de navegación y un proceso interactivo agradable. Evitar animaciones costosas en scroll y librerías innecesarias.
- Performance: Core Web Vitals, no imágenes externas, tamaño CSS/JS razonable; optimizar CLS/LCP y estabilidad de layout.
- Agregar pruebas de componentes/interacciones y smoke test de la ruta `/` cuando la infraestructura permita. No inventar pruebas exitosas.

## 7. CRITERIOS DE ACEPTACIÓN DEL HOME

1. `/` muestra un Home terminado visualmente y diferenciado de las demás páginas.
2. Header, menú móvil, navegación por teclado y CTAs responden correctamente, sin enlaces muertos.
3. Los 12 bloques H01–H12 están implementados con composición editorial consistente; contenido no repetitivo.
4. Ninguna fotografía/video remoto, stock, IA, render ni imagen de ejemplo fue agregado por Codex.
5. Todos los espacios de fotografías están realmente vacíos, estilizados, adaptativos y listos para cargar archivos propios.
6. El recorrido de ciencia permite interacción real y funciona con teclado.
7. Los productos destacados usan datos reales disponibles; sin backend se declara limitación y no se habilitan compras falsas.
8. El Home es responsive, accesible y conserva la identidad cromática original hasta donde se pueda verificar.
9. No se modificaron dominios, Shopify, facturación productiva ni infraestructura de la empresa.
10. `typecheck`, `lint`, `build` y pruebas relevantes se intentan y reportan con resultados concretos (PASS/FAIL/BLOCKED). No afirmar éxito si falla.
11. Documentar en `docs/HOME_DESIGN_DECISIONS.md` la arquitectura de bloques, design tokens, copy verificado, medios reservados y cómo insertar fotos futuras.
12. Actualizar `docs/ROADMAP.md` con avance real, tareas incompletas y próximo sprint `BIO INVESTIGACIÓN`.

## 8. ENTREGA FINAL DE ESTE PROMPT

Al terminar, responde en español con: (a) breve diagnóstico de lo que había, (b) archivos creados/editados, (c) cómo levantar localmente la web, (d) URLs de vista previa reales comprobadas, (e) pruebas y errores reales, (f) mapa de los slots vacíos y ruta exacta donde insertar medios, (g) qué queda pendiente antes de avanzar a Bio Investigación. Incluye comandos exactos para mi Mac, sin inventar rutas, terminales o resultados. No sigas con Bio Investigación ni ninguna página interior hasta mi próxima instrucción.

Comienza ahora. Prioriza el resultado visual y funcional del HOME sin sacrificar la integridad del proyecto existente.
