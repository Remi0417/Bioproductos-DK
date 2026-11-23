# BIOPRODUCTOS DK — MASTER CONTEXT / CONTEXTO MAESTRO DEL PROYECTO

**Versión:** 1.0 · 18 de octubre de 2026  
**Tipo de documento:** Fuente central de contexto para Codex CLI, diseño UX/UI, frontend, backend, QA y presentación final.  
**Estado:** Propuesta académica independiente; NO es el sistema oficial de BioProductos DK.  
**Regla de interpretación:** Las afirmaciones de la entrevista son testimonios de la visita, no sustituyen documentación oficial, contratos, datos técnicos o autorizaciones de publicación.

> **Lee este documento completo antes de trabajar en cualquier página.** Luego lee `AGENTS.md`, `docs/PRD.md`, `docs/ROADMAP.md`, documentos técnicos vigentes y el prompt específico de la etapa. Si hay conflicto, respeta la seguridad y restricciones operacionales de `AGENTS.md`, identifica la contradicción y solicita confirmación si puede afectar datos, dinero, permisos o alcance. No reescribas el repositorio.

---

## 0. LA MISIÓN EN UNA FRASE

Crear una **plataforma digital premium, viva, científica, sostenible y completamente coherente con BioProductos DK** que integre un sitio corporativo multipágina, una tienda funcional de pruebas, un panel administrativo usable y una demostración convincente para que las fundadoras consideren seleccionar a nuestro equipo frente a otras propuestas académicas.

No basta un diseño bonito ni una landing. Debe tener contenido fundamentado, secciones independientes, funciones reales demostrables, arquitectura mantenible, seguridad y una identidad visual claramente superior a un template comercial genérico.

### Naturaleza del proyecto — decisión irrevocable durante el concurso

- **Es un PROYECTO FINAL COMPETITIVO / CANDIDATURA** realizado por estudiantes de Diseño e Informática de INACAP Maipú; hay otros equipos presentando alternativas.
- **No tenemos autorización para intervenir la tienda real** de las fundadoras. No modificar `bioproductosdk.com`, `bioproductosdk.cl`, DNS, hosting, Shopify, inventario, clientes, redes sociales, cuentas bancarias ni pasarelas de producción.
- El objetivo sí es **demostrar una plataforma alternativa propia** tan sólida y simple de administrar que pueda motivar a la empresa a considerar una futura migración; eso se decide **después** de una aprobación expresa.
- Para el prototipo, **el sitio web, el comercio, el carrito, el backend, la base de datos, el login de administración, el inventario, el control de pedidos, los filtros y los reportes deben funcionar realmente** en un entorno independiente con datos de prueba.
- Los servicios externos que requieran contratos/credenciales (Webpay, Mercado Pago, Blue Express, SII/DTE) deben integrarse en SANDBOX cuando exista acceso. Si no hay credenciales, construir interfaces/adaptadores probables y pruebas locales bien delimitadas, **sin afirmar conexión real**. No se efectuarán cargos reales ni se emitirán documentos tributarios reales.
- El costo y soporte futuros importan. La empresa tiene un presupuesto limitado y experiencia adquirida en Shopify. No afirmar que lo propio será más barato sin un cálculo íntegro.
- **Se avanza de UNA PÁGINA POR VEZ.** La página actual se considera terminada solamente tras revisión visual, revisión funcional y aprobación del responsable del proyecto.

### Rol del responsable del proyecto y equipo

La persona que dirige estas instrucciones trabaja en diseño y colabora estrechamente con los compañeros de Informática. Quiere liderar el diseño UX/UI y la experiencia frontend, participar en decisiones de arquitectura de producto, documentar requerimientos y conectar diseño-negocio-ingeniería. Codex debe explicar decisiones técnicas y comandos en español claro, sin infantilizar ni ocultar detalles; código, nombres de variables y tests pueden quedar en inglés. Respeta que es un proyecto en equipo, documenta los cambios y evita sobrescribir aportes ajenos.

---

## 1. QUÉ ES BIOPRODUCTOS DK

### Identidad y propuesta de valor

BioProductos DK es una iniciativa/empresa chilena de base científica que **investiga, desarrolla y comercializa productos de limpieza e higiene**, usando conocimiento en biotecnología, nanotecnología y revalorización de determinados residuos orgánicos. Su relato corporativo se apoya en **ciencia aplicada, innovación, economía circular y sostenibilidad**.

Las fundadoras mencionadas en investigaciones previas son **Sindy Devis Ruiz** y **Carolina Klagges**. Verificar ortografía, cargos, fotografías autorizadas y biografías contra el material oficial antes de publicarlos.

**Idea que debe atravesar todo el sitio:** *«Detrás de cada producto hay ciencia.»* Esto sintetiza la intención manifestada en terreno; no usar una cita literal atribuida a una fundadora sin revisar el audio.

### Cuatro ejes visibles de la marca

1. **Biotecnología** — aprovechar procesos y conocimiento científico en soluciones de limpieza e higiene.
2. **Nanotecnología** — investigación sobre tamaño de partículas y nanoemulsiones; explicar de forma comprensible y técnicamente precisa.
3. **Innovación** — investigación, prototipado, mejora de formulaciones y proyectos.
4. **Sostenibilidad / economía circular** — revalorizar residuos orgánicos seleccionados y promover prácticas responsables.

### Áreas que el sitio debe distinguir

- **Productos al consumidor final (B2C):** catálogo público, compra, checkout de pruebas.
- **Bio Investigación e I+D:** ciencia, laboratorio, proyectos, colaboración, resultados verificables, tecnologías, marcas y patentes acreditadas.
- **Empresas y distribuidores (B2B):** oportunidades comerciales y contacto/cotización privados; no publicar listas de precios de distribuidores.
- **Bio Impacto y economía circular:** materias primas recuperadas, educación, procesos y posibles colaboraciones.
- **Quiénes somos:** fundadoras, misión, visión, trayectoria y legitimidad.

### Marcas y líneas

BioProductos DK es la marca/empresa paraguas y se mencionaron al menos dos líneas o marcas derivadas de investigación. En las conversaciones aparecieron nombres semejantes a **Bio-Renua/Bio-Renova** y **Bio-Clean**, con referencias visuales **naranja** y **celeste**, respectivamente; el nombre exacto, su escritura, la asignación de colores, registros y productos autorizados **DEBEN verificarse** con logos/documentos oficiales antes de ponerlos como hecho. El verde oscuro se mantiene como identidad paraguas. No inventar logotipos ni marcas.

### Público objetivo

- Hogares y personas que buscan productos de higiene/limpieza, información y compra confiable.
- Negocios que venden físicamente los productos.
- Empresas/instituciones que buscan abastecimiento o acuerdos específicos.
- Distribuidores potenciales.
- Investigadores, universidades, laboratorios, colaboradores científicos y organismos que evalúan proyectos.
- Organizaciones que generan residuos orgánicos separados y desean explorar colaboración.

No confundir estas audiencias: cada una necesita mensajes y flujos distintos.

---

## 2. QUÉ SOLICITARON LAS FUNDADORAS EN LA VISITA — REQUISITOS CONFIRMADOS

**Fuente principal:** transcripción de audio de visita a terreno facilitada por el responsable, actualmente denominada `ENTREVISTA_TERRENO_BIO_DK.md`; colocar versión canónica en `docs/investigacion/`. La transcripción tiene marcas de tiempo y errores del reconocimiento de voz. Úsala para detectar intenciones y preguntas, no para copiar literalmente textos con erratas.

### Contenidos y navegación

- Home atractivo, con productos recientes/destacados.
- Pestaña propia de **Bio Investigación / Investigación**, posiblemente subdividida en **I+D, proyectos, logros, colaboraciones, participación como entidad colaboradora, patentes y marcas registradas**.
- **Tienda / Catálogo** muy visible, con acceso directo a productos y compra.
- Dar protagonismo a *lo que hacen* y cómo nacen sus productos desde la ciencia.
- Mostrar **dónde se venden sus productos** mediante establecimientos, logos autorizados y direcciones verificadas.
- Explorar blog, colaboradores y empleo solamente como expansión. **«Trabaja con nosotros» no fue prioridad de primera entrega.**
- Conservar identidad y aspectos apreciados del sitio original: colores, esencia, presentación atractiva del producto/video inicial; corregir fallos de contenido, navegación e imágenes incongruentes.
- **No quieren que aparezca el zorro de imagen de ejemplo** que estaba en una sección de la web original; eliminar cualquier imagen genérica de ese tipo.

### Productos y catálogo

A la fecha de la entrevista se informaron aproximadamente **8 referencias de venta**:

| Grupo | Cantidad | Observaciones |
|---|---:|---|
| Detergentes de ropa | 2 | Dos aromas/variantes, nombres exactos por confirmar |
| Champús sólidos | 3 | Para cabello seco, graso y normal (verificar denominaciones comerciales) |
| Sales de baño | 3 | Tres tipos no especificados en la transcripción |
| **Total informado** | **8** | No inventar precio, gramaje, SKU, inventario ni fotos oficiales |

**Actualización del responsable — 2026-10-18:** confirma expresamente que también existen **jabones y acondicionador** y solicita incorporarlos al adelanto de productos del Home. La colección pasa a mostrar cinco familias: detergentes, champús sólidos, sales de baño, jabones y acondicionador. Las ocho referencias de la tabla corresponden al relato histórico de la entrevista; no constituyen un total actualizado. No se han aportado fotografías individuales identificadas para jabones o acondicionador, ni sus variantes, formatos, fórmulas, precios o disponibilidad. No inferir esos atributos ni reutilizar la foto del champú como si fuera jabón. Esta confirmación autoriza su presentación en el Home, no habilita venta real ni acredita propiedades.

- Stock interno visible para personal autorizado; el stock exacto en público es opcional, no requisito obligatorio.
- Solo mostrar **precio final B2C** en la web. Precios y condiciones B2B/distribuidores se conversan **empresa a empresa**, no se exponen en el catálogo general.
- La administración del catálogo debe poder hacerse de forma sencilla **desde smartphone**, una ventaja de Shopify que la alternativa debe preservar.

### Registro/contacto/checkout

- Para colaboración, se mencionó un formulario simple de **nombre y apellido, correo y teléfono**. Puede agregarse asunto/mensaje si se justifica, minimizando datos.
- Para despachos necesitan datos suficientes de identidad/contacto/dirección y documento solicitado; mencionaron **RUT, dirección, nombre, correo, teléfono, boleta o factura**. Pedir solo lo legal y operativamente necesario en la etapa apropiada, en formularios protegidos.
- Preferencia por recibir boleta al correo del comprador, sujeto a integración real con un emisor DTE autorizado.
- No obligar a crear cuenta para explorar el catálogo. Evaluar checkout de invitado y cuenta opcional.

### Pagos, logística y documentos

- La empresa declaró trabajar/conocer **Webpay** y **Mercado Pago**.
- Tiene convenio de despacho con **Blue Express**; aún no ha comprobado desempeño en ventas masivas. No simular como capacidad verificada de producción.
- Quiere considerar distribuidores y reparto local en RM y nuevas regiones a futuro.
- Requiere poder **exportar pedidos diarios a Excel/CSV** con datos necesarios para logística.
- Si a un pedido le falta un dato obligatorio, marcarlo para gestión interna y evitar despacho incorrecto.
- Emite o necesita **boleta y factura**; la emisión real deberá cumplir SII, sin sustituirla por PDFs arbitrarios.

### Analítica y gestión

La empresa pidió poder ver al menos:

1. **Ventas por mes**.
2. **Ventas por producto**.
3. **Ventas por tipo de cliente**.

También son útiles, como propuesta nuestra, conversión, solicitudes de colaboración, estado de pedidos, recurrencia y productos más consultados. Para una demo, todas las estadísticas deben derivar de datos de prueba persistentes o quedar claramente etiquetadas DEMO.

### Presupuesto y continuidad

- En la visita las fundadoras expresaron preferencia inicial por **mantener Shopify** por capacitación pagada, familiaridad y facilidad móvil; describieron un gasto aproximado de **$50.000 CLP/mes** (dato testimonial, no tarifa a prometer).
- Están abiertas a alternativas si no generan gastos extras y si aprender a usarlas es razonable; nada garantiza su decisión posterior.
- Dominio habitual **`.com`**, con una variante `.cl` que según la entrevista redirige al `.com`. Dato de contexto, no permiso para tocar DNS.
- Hosting existente contratado por adelantado, proveedor nombrado aproximadamente «B2network»; verificar identificación exacta cuando sea pertinente.
- Se mencionó la necesidad de políticas de privacidad, términos de venta, reclamos y textos legales; deben revisarse por quien tenga competencia y autoridad antes de publicarse como definitivos.

### Problemas relatados del sitio actual

- Algunas imágenes incongruentes o de muestra.
- Descripciones faltantes (por ejemplo una fundadora sin texto descriptivo).
- Fragmentos/códigos visibles al usuario.
- Periodos de caída/inestabilidad informados.
- Experiencia de compra todavía muy poco utilizada: el volumen de ventas web citado era pequeño (aproximado, anecdótico), no una cifra oficial para marketing.

### Distinguir solicitudes de ideas sugeridas

La opción **«Dona tus residuos»** fue recibida como idea interesante, pero requeriría **protocolos de separación, conservación y recolección aprobados por la empresa**. Ofrecer descuentos a quienes donen fue una sugerencia de estudiantes, NO un programa aprobado. No prometer puntos de recolección, cupones, cifras ambientales o recogidas automáticas sin confirmación.

---

## 3. LO APRENDIDO DEL RECORRIDO POR EL LABORATORIO

Este contenido es una ventaja competitiva porque los otros diseños podrían limitarse a vender productos. Nosotros podemos **convertir la ciencia real en una experiencia educativa rigurosa**.

### Materias primas mencionadas

Cáscaras de huevo y frutas, borra de café, cáscaras de nuez, cuescos de palta, cáscaras de cítricos y hojas vegetales como beterraga, romero u orégano, según proyecto/protocolo. No todas se usan necesariamente en todos los productos. Mostrar ejemplos con precisión, sin adjudicar un ingrediente a una fórmula comercial específica sin prueba.

### Flujo general de valorización (no fórmula química industrial)

1. **Selección y recepción** de residuos orgánicos previamente separados.
2. **Lavado y desinfección** siguiendo protocolos propios.
3. **Deshidratación controlada**, para estabilidad y conservación de ciertos compuestos.
4. **Reducción de tamaño** con chancadora/molinos según el material.
5. **Tamizado / clasificación** por tamaño de partícula donde corresponda.
6. **Extracción/prototipado** mediante distintos métodos, por ejemplo destilación con vapor para ciertos aceites esenciales.
7. **Investigación de formulaciones** y tecnologías como nanoemulsiones/liposomas en contextos mencionados.
8. **Control de calidad y registro** de lotes y muestras para productos sujetos a exigencias del ISP.
9. **Envasado, almacenamiento y distribución** según el producto y permisos aplicables.

**IMPORTANTE:** Esta es una descripción editorial de alto nivel, no un procedimiento químico replicable ni un diagrama exacto de una única línea de producción. No publicar concentraciones químicas, parámetros sensibles, formulaciones internas, protocolos detallados, información de proveedores confidenciales ni secretos de investigación.

### Equipos que se vieron o mencionaron

- Homogeneizadores de alto cizallamiento (llamados «Ultra-Turrax» en la entrevista).
- Equipos de ultrasonido.
- Molino de bolas y tamices.
- Chancadora y otros equipos de molienda.
- Deshidratador con control de temperatura/tiempo.
- Sistema de destilación por arrastre de vapor.
- Equipos de llenado y control de dosificación.

Se puede presentar un **recorrido visual de ciencia** usando los nombres correctos, glosario, interacción por etapas y fotografías reales que el usuario agregará después.

### Espacios e I+D

- Se describió un **laboratorio autorizado para fabricar determinados cosméticos sólidos de bajo riesgo**. La entrevistada aclaró que ese permiso NO cubría cremas en ese momento. Nunca presentar licencias como generales para todos los cosméticos.
- En ese laboratorio se explicaron zonas diferenciadas para fraccionamiento, fabricación, control de calidad, envasado y almacenamiento, además de EPP, controles de temperatura/humedad, registros y contramuestras por lote.
- Se mencionó un área separada/proyectada para elaborar detergentes. NO afirmar que una instalación aún en construcción está operativa.
- Las fundadoras mencionaron desarrollo de nanoemulsiones y una patente. Antes de publicarla como titular o claim legal, verificar **número de patente, titular, jurisdicción, alcance y estado**.
- Se habló de ensayos de liposomas: tratarlos como investigación/prototipado, NO tecnología probada de todos los productos.
- El audio contiene errores de transcripción como «ISPI» por ISP, inconsistencias de tiempos de conservación y frases claramente mal reconocidas. Corregir editorialmente solo después de validar con fuente técnica; ante duda, omitir cifra/especificidad.

### Narrativa recomendada

**«De los residuos a la ciencia; de la investigación a soluciones reales.»**

Contar el proceso sin exagerar atributos ambientales ni hacer greenwashing. No afirmar «100% ecológico», «no contamina» o «hipoalergénico» como promesa general sin soporte documental aplicable.

---

## 4. ARQUITECTURA DE INFORMACIÓN — SITIO MULTIPÁGINA

**Principio:** NO hacer una sola landing gigante. Cada página tiene contenido propio, personalidad, objetivo, jerarquía y rutas reales. El Home introduce y enlaza, no reemplaza las demás. El header y el footer son consistentes en todas las páginas.

### Navegación principal (preferencia estética y comercial)

1. **Inicio** — `/`
2. **Nosotras** — `/nosotras`
3. **Bio Investigación** — `/bio-investigacion`
4. **Productos** — `/productos`
5. **Empresas** — `/empresas`
6. **Contacto** — `/contacto`

Rutas secundarias propias: `/bio-impacto`, `/donde-comprar`, `/productos/[slug]`, `/carrito`, `/checkout` en entorno de pruebas, páginas legales cuando exista contenido aprobado, y espacio de administración independiente (ruta según el starter de Medusa, habitualmente en backend). No crear enlaces vacíos ni botones que no hagan nada. Cuando una página aún no esté implementada, dejar un estado honesto y navegable sin simular que existe su contenido completo.

### A. HOME / INICIO — primera prioridad actual

**Objetivo:** en segundos debe quedar claro qué es BioProductos DK, qué produce, qué tiene de científico y dónde comprar/explorar. Debe ser un espectáculo editorial serio, no una plantilla uniforme y tampoco una página saturada.

Secciones sugeridas, con **ritmo y composiciones diferentes**:

1. Franja superior discreta de contexto de proyecto/empresa, sin estorbar.
2. Header con logo oficial existente si está disponible y autorizado, menú desktop/mobile, carrito de pruebas y CTA sutil.
3. **Hero memorable/cinematográfico**: titular con carácter, breve explicación, CTA «Explorar productos» y «Descubrir la ciencia». Área visual grande reservada para fotos/video que el usuario pondrá luego. El resto de la composición debe verse diseñado aunque falte esa imagen.
4. Introducción emocional: cómo la ciencia se convierte en productos cotidianos.
5. Cuatro pilares (biotecnología, nanotecnología, innovación, sostenibilidad) tratados editorialmente: no cuatro tarjetas genéricas iguales.
6. Productos destacados: 2–4 fichas basadas en datos disponibles; sin precios oficiales inventados, y con tarjetas enlazables si hay catálogo. Si el precio es prueba, indicar DEMO.
7. Storytelling «Del residuo al desarrollo» con secuencia explicativa de alto nivel.
8. Adelanto de Bio Investigación: I+D, investigación, tecnologías, proyectos y colaboración; CTA a página completa.
9. Presentación de marcas/líneas, solamente si nombres y atributos están verificados; caso contrario diseñar módulo preparado para rellenar.
10. Bio Impacto: circularidad y valorización con hechos autorizados.
11. Mini introducción a las fundadoras y CTA a Nosotras.
12. Empresas y puntos de venta: dos rutas claras para compradores y aliados.
13. CTA final contundente pero sobrio.
14. Footer profundo, organizado, datos validados, enlaces reales y estado de demo cuando aplique.

**No todas las secciones requieren gran altura.** Priorizar jerarquía: hero, comercio e investigación. No repetir textos, enormes vacíos o la misma cuadrícula en todo el Home.

### B. NOSOTRAS — `/nosotras`

Página independiente y humana: historia y origen de la empresa, fundadoras (nombres/biografías autorizadas), misión y visión, hitos en línea de tiempo si se verifican, valores, ciencia como origen del proyecto, equipo y cultura de colaboración. Layout editorial alternado y espacios reservados para retratos reales. Sin biografías inventadas ni fechas no verificadas.

### C. BIO INVESTIGACIÓN — `/bio-investigacion`

Debe ser la página estrella científica, con mucha más profundidad que un teaser de Home:

- Hero de ciencia y valor de I+D.
- Introducción a la filosofía de investigación y economía circular.
- Subsecciones/ancoras reales: **I+D, Biotecnología, Nanotecnología, Nanoemulsiones, Laboratorios, Equipamiento, Proceso general, Control de calidad, Proyectos, Logros verificables, Patentes y marcas registradas verificadas, Colaboraciones y oportunidades de investigación**.
- Recorrido interactivo «Del residuo al producto» con etapas y explicaciones concisas; versión accesible sin animaciones.
- Galerías previstas para fotos auténticas del laboratorio aportadas por el usuario, SIN completar automáticamente.
- Diferenciar investigación en curso de capacidades/servicios operativos; no atribuir derechos, licencias, patentes o premios sin número/fuente.
- Contacto orientado a colaboración científico-tecnológica.

### D. PRODUCTOS / TIENDA — `/productos`

Debe ser una experiencia e-commerce premium REAL dentro del entorno de pruebas:

- Catálogo accesible, buscador, filtrado por categorías, orden, ficha individual `/productos/[slug]`, variantes según datos reales, stock, precio DEMO si falta precio autorizado, unidades, carrito, cantidades, subtotal, validación y persistencia.
- Tres grupos conocidos en visita: detergentes, champús sólidos, sales de baño. Ocho referencias reportadas; validar productos comerciales concretos.
- Fichas: descripción, uso, tamaño, componentes permitidos para publicación, FAQ, información de stock comercial si se aprueba; jamás inventar propiedades dermatológicas ni certificaciones.
- Checkout en sandbox: datos necesarios, envíos de prueba, opciones de boleta/factura informativas, validación de dirección/identidad según necesidad; pagos solo en entorno autorizado de pruebas.
- Estados de stock correctos, evitar sobreventa, coherencia en backend, pedidos y resumen.
- Sin imágenes externas: medios vacíos preparados para subir archivos reales después.

### E. EMPRESAS — `/empresas`

Página B2B diferenciada del checkout consumidor:

- Presentar abastecimiento institucional, alianzas de distribución, interés de comercios y soluciones a empresas, sin prometer condiciones inexistentes.
- «Quiero distribuir», «Solicitar cotización», «Soy un comercio», formularios validados con estados de envío/error/éxito y almacenamiento de solicitudes con acceso administrativo.
- NO mostrar precios mayoristas, descuentos ni mínimos de compra no confirmados.
- Destacar venta presencial y colaboración comercial, CTA a Dónde comprar.

### F. DÓNDE COMPRAR — `/donde-comprar`

Directorio real **solo con locales autorizados/confirmados**: logo que el usuario aporte, nombre, dirección, comuna/región, mapa/enlace de ubicación si se valida, filtros por región/comuna, estado de carga/vacío. El panel administrativo puede gestionar puntos de venta. Sin negocios ficticios publicados como reales.

### G. BIO IMPACTO — `/bio-impacto`

Economía circular, valorización, materias primas, beneficios validados, explicación de buenas prácticas. Incluir como **propuesta futura** una vía «Quiero colaborar con residuos» con protocolo revisado por DK; no habilitar donaciones con instrucciones sanitarias inventadas, descuentos automáticos ni recolección sin aprobación. Diferenciar metas, compromisos y resultados medidos.

### H. CONTACTO — `/contacto`

Página independiente: datos oficiales verificados, canales de contacto, formulario con nombre, apellido, email, teléfono opcional/según propósito, motivo y mensaje; validación cliente/servidor, antispam, privacidad, feedback de envío y almacenamiento/entrega en modo demostración. Canales de ventas, B2B e investigación dirigidos al equipo correspondiente. No inventar direcciones ni correos.

### Futuro, no primera prioridad

Blog/noticias con CMS, colaboradores, empleo, centro de ayuda, cuentas B2B, programa de donaciones, fidelización, expansión nacional y mayor automatización logística; incluir en roadmap sin fingir que la empresa ya los aprobó.

---

## 5. DIRECCIÓN DE ARTE / UX/UI — LO MÁS IMPORTANTE

### Diagnóstico de versiones anteriores

El usuario mostró capturas del Home original y de un Home nuevo generado por Codex. En el original percibe **vida, movimiento, diferencias entre bloques, narrativa, energía visual y uso poderoso del producto**. El nuevo desarrollo resultó **excesivamente plano**, con tipografía correcta pero un gran rectángulo vacío, amplios espacios muertos y ausencia de identidad distintiva. Esa ejecución fue rechazada.

**NO repetir el Home anterior.** Rehacer la dirección de arte sin desechar la aplicación ni las funcionalidades útiles.

### Visión creativa

**«Biociencia viva: la precisión de un laboratorio + la calidez de la naturaleza + la calidad de una marca premium.»**

Inspirarse en principios de diseño de Apple (jerarquía, refinamiento, fluidez, tipografía, microinteracciones, sensación de producto) sin copiar sus interfaces, imágenes o identidad. Evitar la estética corporativa genérica, panel de cajas pastel o una landing de startup vacía.

### Características visuales obligatorias

- **Conservar la esencia DK**: verde natural profundo, verde suave, blancos cálidos, tonos orgánicos y acentos secundarios discretos asociados a submarcas solo una vez verificados.
- Validar colores/tipografías/logotipo originales desde material existente; no asumir que los códigos hex propuestos son oficiales.
- Narrativa visual con secciones distintas: hero editorial, ancho completo cuando aporte, grillas asimétricas, módulos invertidos, bloques tipográficos, composiciones de producto y cronologías.
- Tipografía con mucha personalidad y excelente legibilidad; titulares contundentes y subtítulos breves; textos largos solo donde corresponde.
- Alternancia intencional de espacios, fondos, contraste, densidad y encuadres. «Limpio» NO significa «vacío». Evitar 12 tarjetas idénticas y gigantes sin contenido.
- Encabezado pulido, menú móvil sólido, estados activos, scroll inteligente solo si no molesta, CTA claros y footer trabajado.
- Motion refinado en hover, scroll y transiciones; soporte `prefers-reduced-motion`; no añadir animación por espectáculo si sacrifica rendimiento/accesibilidad.
- Diseño excelente en anchos ~360, 390, 768, 1024 y 1440 px, sin desbordes horizontales y con botones táctiles cómodos.
- Contrastes AA como objetivo, orden semántico H1-H2-H3, formularios accesibles, navegación por teclado, foco visible y SEO por página.
- No copiar bloques enteros de la web original; usarla como referencia estética y de contenido, mejorándola técnicamente.

### REGLA ABSOLUTA DE IMÁGENES, VIDEO Y MEDIA

**El responsable dispone de muchas fotografías auténticas que quiere seleccionar y colocar él mismo.**

1. **PROHIBIDO** generar, buscar, descargar, reemplazar automáticamente o insertar fotografías, renders, imágenes de stock, videos, paisajes, productos falsos o imágenes remotas de ejemplo.
2. **NO** usar Unsplash, Pexels, imágenes IA, `picsum`, URL random, gradientes como sustituto que pretendan ser fotografía, ni instalar galerías con imágenes inventadas.
3. Los espacios para contenido visual deben quedar **realmente vacíos** y preparados para que el usuario ponga su imagen o video después. Deben conservar proporción, anchura/alto responsive y un sistema sencillo de carga/reemplazo; se puede usar un estado de edición tipo «Espacio para fotografía — subir después» claramente identificado en desarrollo, nunca una fotografía falsa.
4. A pesar de no tener fotos, **el resto de la página debe tener vida** mediante tipografía, color, arquitectura compositiva, bordes, superficies, geometría CSS discreta, transiciones, líneas, microdetalles de ciencia y ritmo editorial. No esconder el problema creando un enorme rectángulo gris o verde uniforme.
5. Si el logotipo oficial ya está instalado en el proyecto y es material real autorizado, conservarlo. No inventar logos.
6. Arquitectura reutilizable: `MediaSlot`/`EditorialMediaSlot` con variantes y relaciones de aspecto (`16:9`, `4:5`, `1:1`, panorámico). Diseñar para reemplazo sencillo por rutas locales aportadas manualmente por el usuario, sin tocar layout.
7. Evitar párrafos de instrucciones de carga visibles como si fueran contenido final en el sitio público. El slot vacío debe ser sobrio. Asegurar que no queden elementos interactivos que dependan de un medio inexistente.

### No caer en dos extremos

- NO: una pared de texto técnico, diez tarjetas idénticas, imagen genérica de zorro, cajas vacías kilométricas, fondos pastel sin contraste, animaciones gratuitas, exageración de claims ecológicos.
- SÍ: dirección de arte específica, composición memorable, ritmos, mensajes claros, producto y ciencia diferenciados, detalles coherentes, auténtica experiencia de marca.

---

## 6. SISTEMA ADMINISTRATIVO Y FUNCIONES REALES

En la demo debe mostrarse cómo la empresa gestionaría su operación diaria, de modo **más simple, no más complejo, que la experiencia Shopify que conocen**. Priorizar uso móvil para las fundadoras.

### Dashboard y acceso

- Login seguro real para administradores de demostración, con verificación en servidor. Roles mínimos según necesidades: administrador, editor de contenidos, operaciones/ventas. Nunca basar permisos solo en ocultar botones.
- Panel de inicio con indicadores provenientes de datos de prueba persistidos.
- Gestión de productos, categorías, precio, stock, disponibilidad y medios pendientes.
- Pedidos, compradores demo, estados, preparación de despacho, búsqueda, filtros y vistas de detalle.
- Gestión de formularios de contacto, solicitudes B2B/colaboración.
- Gestión de puntos de venta.
- Reportes por mes, producto y tipo de cliente; exportaciones CSV/XLSX seguras y delimitadas.
- Opciones básicas de publicación de contenidos científicos y páginas sin que las fundadoras necesiten editar código, si es viable dentro del alcance.
- Diseño responsive y móvil prioritario, mensajes de confirmación y prevención de errores irreversibles.
- Registro de actividad para operaciones críticas; respaldo de datos de demo y opción de reset de prueba.

### Flujo de venta E2E (en demo)

1. Visita catálogo y filtra.
2. Abre ficha y selecciona variante/cantidad.
3. Agrega al carrito y modifica cantidades.
4. Confirma precio/stock vigente contra backend, no solo frontend.
5. Completa checkout y datos necesarios.
6. Selecciona un medio de pago SANDBOX si está configurado; sin credenciales, habilitar flujo de prueba claramente marcado que NO produzca pagos ni pretenda ser Webpay real.
7. Pedido se guarda en la base de datos con estado coherente/idempotencia.
8. Panel muestra el pedido; inventario se afecta según el flujo correcto del motor comercial (reservas, confirmación, cancelación), sin sobreventa.
9. Se actualizan reportes y se permite exportación de despacho de prueba.
10. Cancelaciones, errores, reintentos y controles de permisos contemplados.

### Sistema de comercio

El repositorio existente ha sido iniciado con un **monorepo Next.js + Medusa 2 + PostgreSQL** y `apps/`, `package-lock.json`, `turbo.json` según capturas del usuario. Hubo bloqueos de DNS al clonar, falta inicial de PostgreSQL y problemas de resolución de dependencias/build de Medusa. **No asumir que ya están reparados**: auditar el estado real y registrar qué está construido, qué compila y qué falta.

**No crear un segundo motor de comercio artesanal ni duplicar orden/inventario** si Medusa ya ofrece esa capacidad. Adoptar sus APIs y flujos; diseñar/implementar extensiones modulares donde DK lo necesita.

### Integraciones externas y límite de verificación

- **Transbank Webpay Plus:** usar ambiente de integración y credenciales sandbox si están disponibles; validar retornos/webhooks según documentación, evitar doble confirmación de pedidos.
- **Mercado Pago:** checkout y pruebas sandbox con credenciales habilitadas; no almacenar números de tarjeta.
- **Blue Express:** adaptador para órdenes de despacho, tracking y cotización según credenciales y documentación del convenio; si no hay acceso, contrato de interfaz probado localmente y etiquetado pendiente.
- **SII / DTE:** boleta/factura reales requieren integración/servicio autorizado y pruebas regulatorias; NO «emitir» documentos oficiales falsos. Puede presentarse una vista de ejemplo inequívocamente DEMO y un adaptador pendiente de proveedor.
- **Correo:** notificaciones transaccionales en servicio de pruebas o mailbox local, evitando enviar datos reales.
- **Excel/CSV:** exportar desde datos sintéticos con control de autorización y cuidado con inyección de fórmulas CSV.

### Requisitos de seguridad y privacidad

- Secrets solo servidor/gestor de entorno, `.env.example` sin claves y `.env*` ignorados.
- No exponer database URL, claves, tokens ni clientes reales en frontend, logs o screenshots públicos.
- MFA administrativo como objetivo, sesiones seguras, rate limiting, protección CSRF según arquitectura, validaciones servidor, protección XSS/SQLi por librerías y prácticas apropiadas.
- Autorizaciones de backend, audit log, backups y pruebas de restauración.
- Datos mínimos; no inventar consentimiento legal. Políticas, tratamiento de datos y normativa chilena a revisión antes del uso real.
- No usar números de RUT de personas reales como datos demo; usar ejemplos explícitamente sintéticos y válidos solo si la aplicación exige formato.
- No prometer seguridad absoluta; demostrar pruebas, registro de riesgos y procedimientos.

---

## 7. ARQUITECTURA TÉCNICA Y ESTÁNDAR DE IMPLEMENTACIÓN

### Stack previsto, condicionado a lo ya instalado

- Frontend: **Next.js**, **TypeScript** estricto, **Tailwind CSS** y componentes accesibles/reutilizables.
- Motor comercio/administración: **Medusa 2** (mantener coherencia con su versión y starter realmente instalados).
- DB: **PostgreSQL** local o entorno de desarrollo independiente.
- Monorepo: estructura existente `apps/backend`, `apps/storefront` u otra verificada; gestores de paquetes consistentes con lockfile.
- Control de versiones: Git; pruebas de smoke/E2E con Playwright si ya existe, más testing del backend y componentes cuando aplique.
- Motion: solución ligera, `prefers-reduced-motion`, sin bloquear interactividad ni TTI.
- Seguridad, monitoreo y despliegue profesional como parte del plan, no falsas promesas de plataforma certificada.

### Auditar antes de tocar nada

1. Examinar carpetas, `package.json`, lockfile, `AGENTS.md`, README, todos los documentos actuales, `.git status` y `docs/ROADMAP.md`.
2. Identificar la estructura real y servicio que corre; comprobar Node/npm, Postgres y puertos sin hacer cambios destructivos.
3. Detectar problemas reales de versiones, workspaces, build o DNS y resolver primero aquello que impide validar el proyecto. No usar `--force`, `--legacy-peer-deps` ni desactivar controles del entorno como atajo sin justificación y autorización.
4. Antes de cada etapa crear una rama/commit de resguardo según flujo vigente y conservar modificaciones de compañeros.
5. No renombrar rutas o mover documentos sin actualizar sus referencias. `AGENTS.md` y `README.md` principales permanecen en la raíz.
6. NO renombrar/eliminar módulos Medusa útiles ni reinstalar el proyecto desde cero solo porque una página visual esté insatisfactoria.

### Patrón funcional

- Páginas y módulos independientes para contenido de marca, comercio y B2B.
- Componentes compartidos: `SiteHeader`, `SiteFooter`, `MediaSlot`, `PageIntro`, `SectionHeading`, `EditorialSplit`, `CTA`, tarjetas de producto basadas en backend, navegación móvil, estados de loading/error/empty.
- Tokens globales tipográficos/cromáticos, contenidos separados de lógica, rutas limpias, SEO metadata único por página, sitemap cuando sea conveniente.
- Ningún botón decorativo/inactivo; todas las llamadas a la acción tienen destino real o estado claramente pendiente en la demo.
- No inventar endpoints, credenciales, ID de clientes, inventarios, precios, direcciones de tienda, localizaciones ni partners.

### Definición de «terminado»

Una página/módulo solo está terminado cuando:
- Se implementa en los archivos correctos del repo, no solo en un mensaje.
- Es visualmente distintivo y responde a la dirección de arte elegida.
- Es responsive en anchos típicos móviles/tablet/desktop y accesible con teclado.
- Navegación/CTA funcionan y no hay enlaces rotos.
- Si maneja datos, estos persisten y el backend verifica permisos, inputs y coherencia.
- Pasan lint, typecheck, build y pruebas aplicables (o se declara el bloqueo exacto).
- No existen imágenes añadidas contra las instrucciones ni afirmaciones empresariales no verificadas.
- Se documenta en `docs/ROADMAP.md` lo hecho, lo comprobado, el resultado de comandos y el siguiente hito.
- **El responsable revisa visualmente y aprueba antes de pasar a otra página.**

---

## 8. PLAN DE EJECUCIÓN «PROMPT POR PROMPT»

**Orden de desarrollo visual recomendado (no necesariamente de programación de infraestructura):**

**Fase 0 — Estabilización y contexto:** leer documentos, corregir builds bloqueantes, identificar qué ya funciona, establecer tokens/UI y trazabilidad de requerimientos. **No perder avances.**

**PROMPT 01 — HOME V3 / REDIRECCIÓN CREATIVA:** rehacer Home que fue considerado plano. Mucha vida visual sin agregar imágenes; mantener medios vacíos. Revisar y aprobar.

**PROMPT 02 — NOSOTRAS:** historia, fundadoras, equipo, evolución, propósito, narrativa humana.

**PROMPT 03 — BIO INVESTIGACIÓN:** I+D, tecnologías, recorrido científico, laboratorios, proyectos, patentes verificadas, colaboración.

**PROMPT 04 — PRODUCTOS:** catálogo y fichas independientes; media vacía preparada, productos respaldados en la base de datos.

**PROMPT 05 — EMPRESAS:** B2B, distribuidores, formularios y cotizaciones de prueba.

**PROMPT 06 — BIO IMPACTO:** sostenibilidad, ciencia circular y opciones de colaboración responsable.

**PROMPT 07 — DÓNDE COMPRAR:** puntos de venta validados/administrables.

**PROMPT 08 — CONTACTO:** formularios y gestión de solicitudes.

**PROMPT 09 — COMERCIO Y CHECKOUT:** compra extremo a extremo en sandbox, stock, errores y consistencia.

**PROMPT 10 — ADMIN DK:** panel usable desde celular y analítica/exportaciones.

**PROMPT 11 — INTEGRACIONES:** Webpay/Mercado Pago sandbox, despacho Blue Express si hay acceso, DTE según proveedor y alcance.

**PROMPT 12 — QA + PRESENTACIÓN FINAL:** auditorías visuales, responsive, accesibilidad, integridad, seguridad, performance y demo guiada con datos de ensayo. Presentar comparación responsable contra Shopify en experiencia, operación y costos; nunca migrar de forma automática.

> Nota: si ya hay módulos de comercio/admin operativos, aprovecharlos desde el principio. El listado es un orden de *prompts para foco*, no autorización para posponer pruebas críticas ni reconstruir sistemas existentes.

### Qué impresiona realmente al jurado / fundadoras

Una demo fluida y verificable:

1. La fundadora comprende el mensaje de DK en la portada.
2. Descubre productos e información científica auténtica, con navegación clara a distintas páginas.
3. Realiza una compra de prueba; el pedido queda persistido.
4. Desde una cuenta administrativa ve el pedido y actualiza stock.
5. El cambio aparece en la tienda sin intervención de un desarrollador.
6. Accede a informe mensual/por producto/por cliente y exporta un despacho de prueba.
7. Todo funciona desde móvil y se explica qué está ya operativo y qué requiere integración real.

La narrativa comercial principal es: **«Una experiencia de marca que comunica su ciencia y un sistema de gestión sencillo para acompañar su crecimiento.»**

---

## 9. CONTROL DE VERACIDAD / ESTADO DE CADA DATO

Al diseñar contenido, clasificar internamente:

- `[CONFIRMADO_EN_ENTREVISTA]`: lo dijeron durante la visita; citar fuente interna si se documenta.
- `[VERIFICADO_DOCUMENTALMENTE]`: respaldado con URL, certificado, documento oficial o registro.
- `[POR_VALIDAR]`: cifras, premios, logos, nombres exactos de marcas, socios, descripción detallada de patentes, precios, certificados, claims y fotografías.
- `[PROPUESTA_EQUIPO]`: funcionalidad o diseño propuesto, no aprobado por la empresa.
- `[DEMO]`: productos de ensayo, pedidos ficticios, ingresos, fechas, stock, estadísticas y pantallas de pago en sandbox.

**Nunca mostrar las etiquetas técnicas al visitante final salvo `DEMO` cuando importa evitar engaño; son etiquetas de trazabilidad en el repositorio.**

Puntos especialmente sensibles:
- «Cero contaminación», «100% biodegradable» o «reduce X% la huella de carbono»: no publicar sin información acreditada y delimitada al producto/proceso.
- Autorización del ISP: no extender de cosmética sólida a cremas u otras líneas.
- Patentes: no indicar patente concedida sin ver registro y su estado.
- Certificaciones, instituciones apoyadoras, logos como CORFO/ANID: solicitar autorización/documentación del proyecto específico antes de aplicar sellos.
- Precios/stock reales, direcciones, teléfonos, alianzas y locales: comprobar con fuente comercial vigente.
- Fotografías de personas: el usuario las aportará y confirmará autorización de uso.

---

## 10. ARCHIVOS, FUENTES Y CONVENCIONES DEL REPOSITORIO

### Documentos del proyecto que deben conservarse

En raíz: `AGENTS.md`, `README.md`, `package.json`, `turbo.json`, lockfile y configuración necesaria.

En `docs/` (ubicaciones pueden variar por organización actual):
- `PRD.md`
- `ROADMAP.md`
- `ARQUITECTURA.md`
- `DISENO_UX_UI.md`
- `CRITERIOS_ACEPTACION.md`
- `DATOS_Y_CONTENIDO.md`
- `DECISIONES_F0_F1.md` o equivalentes
- `investigacion/ENTREVISTA_TERRENO_BIO_DK.md` (o ruta existente)
- `prompts/PROMPT_01_HOME_BIOPRODUCTOS_DK_PREMIUM_V2.md`, V3 y siguientes
- **`MASTER_CONTEXT.md`**: este documento central, recomendado en `docs/MASTER_CONTEXT.md`.

Si la entrevista no está en `docs/investigacion/`, localizar su ubicación real sin eliminarla. No crear duplicados contradictorios.

### Fuente web de referencia — lectura, NO mutación

- Sitio principal: https://bioproductosdk.com/
- Nosotras: https://bioproductosdk.com/nosotras/
- Bio Investigación: https://bioproductosdk.com/home-2/ (URL original defectuosa, no copiarla al nuevo sitio)
- Productos: https://bioproductosdk.com/productos/
- Empresas: https://bioproductosdk.com/empresa/
- Contacto: https://bioproductosdk.com/startup-contact/ (normalizar nueva ruta)
- Bio Impacto: https://bioproductosdk.com/bio-impacto/ (cuando sea accesible)

**Capturas originales proporcionadas por el usuario** son referencias visuales; la captura del nuevo Home demasiado plano es una referencia de lo que NO debe repetirse. La navegación del sitio original y el relato de la entrevista son fuentes prioritarias para identidad y arquitectura, pero los datos actuales de empresa deben contrastarse antes de publicarse.

### Cómo se debe comportar Codex en cada sesión

1. Leer `AGENTS.md` y este MASTER_CONTEXT completos.
2. Leer `docs/ROADMAP.md`, documento específico de fase y archivos existentes que vaya a modificar.
3. Escribir resumen breve: estado real, objetivo de esta iteración y archivos previstos.
4. Hacer cambios en código, no solo auditorías, **si el usuario pidió implementación y están las dependencias disponibles**.
5. No hacer cambios destructivos, ni trabajar en páginas posteriores sin instrucción.
6. Probar con comandos reproducibles, sin falsear éxito.
7. Actualizar ROADMAP, indicar rutas, cambios, errores y cómo revisar visualmente.
8. Esperar revisión y aprobación del usuario antes del siguiente prompt/página.

---

## 11. NOTA FINAL PARA CODEX

**No confundas «premium» con espacios muertos ni «funcional» con una maqueta.** BioProductos DK debe sentirse original, científica, viva y humana. Una buena portada debe contar su historia sin tratar de agotar el contenido de Nosotras, Bio Investigación y Productos. Esas serán páginas completas por derecho propio.

**La condición más importante de diseño es preservar espacios de medios VACÍOS** para fotografías reales que el usuario añadirá, sin añadir imágenes automáticas. Aun así, la página debe tener jerarquía, color, composiciones y movimiento refinado.

No declares que el proyecto está terminado mientras haya fallos de build, botones inactivos, elementos inventados, stock incoherente, faltas de permisos, integraciones fingidas o páginas incompletas. Presenta límites y decisiones con rigor. Trabaja por etapas y preserva lo ya construido.

**El éxito se mide por:** coherencia con el negocio + calidad visual + funcionalidad verificable + facilidad para las fundadoras + seguridad + capacidad de mostrar una evolución futura realista.
