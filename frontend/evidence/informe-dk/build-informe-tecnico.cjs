const fs = require('node:fs/promises')
const path = require('node:path')
const { createRequire } = require('node:module')
const req = createRequire('/tmp/dk-docx-tools/package.json')
const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, ImageRun, HeadingLevel, AlignmentType, WidthType, BorderStyle, ShadingType, Header, Footer, PageNumber, TableOfContents, PageBreak } = req('docx')
const sharp = require(path.resolve(__dirname, '../../node_modules/sharp'))
const out = __dirname
const green='1B563C', ink='18372A', leaf='2F7146', sage='E3EED2', paper='FBF8F0', gray='65736A', line='D9E2D5', white='FFFFFF'
const border={style:BorderStyle.SINGLE,size:4,color:line}
const p=(text,{size=20,color='27352D',bold=false,italics=false,align=AlignmentType.LEFT,after=110,before=0}={})=>new Paragraph({alignment:align,spacing:{before,after,line:275},children:[new TextRun({text,font:'Arial',size,color,bold,italics})]})
const h=(text,l=1,pb=false)=>new Paragraph({heading:[HeadingLevel.HEADING_1,HeadingLevel.HEADING_2,HeadingLevel.HEADING_3][l-1],pageBreakBefore:pb,keepNext:true,spacing:{before:l===1?230:160,after:100},children:[new TextRun({text,font:'Arial',size:l===1?30:l===2?24:21,bold:true,color:l===1?green:l===2?ink:leaf})]})
const bullet=(text)=>new Paragraph({bullet:{level:0},spacing:{after:60,line:250},children:[new TextRun({text,font:'Arial',size:19,color:'27352D'})]})
const cell=(text,head=false)=>new TableCell({margins:{top:85,bottom:85,left:100,right:100},shading:head?{fill:green,type:ShadingType.CLEAR}:undefined,verticalAlign:'center',children:[new Paragraph({spacing:{after:0,line:220},children:[new TextRun({text:String(text),font:'Arial',size:head?16:15,bold:head,color:head?white:'27352D'})]})]})
const table=(heads,rows)=>new Table({width:{size:100,type:WidthType.PERCENTAGE},borders:{top:border,bottom:border,left:border,right:border,insideHorizontal:border,insideVertical:border},rows:[new TableRow({tableHeader:true,children:heads.map(x=>cell(x,true))}),...rows.map((r,i)=>new TableRow({cantSplit:true,children:r.map((x)=>{const c=cell(x);if(i%2)c.options.shading={fill:'F4F6EF',type:ShadingType.CLEAR};return c})}))]})
const figLabel=(s)=>p(s,{size:15,color:gray,italics:true,align:AlignmentType.CENTER,after:100})
async function pic(file,w,alt){const m=await sharp(file).metadata();return new Paragraph({alignment:AlignmentType.CENTER,spacing:{before:80,after:20},children:[new ImageRun({data:await fs.readFile(file),transformation:{width:w,height:Math.round(w*m.height/m.width)},altText:{title:alt,description:alt,name:alt}})]})}
const gap=()=>p(' ',{size:6,after:50})
async function main(){
 const body=[];const add=(...a)=>body.push(...a);const P=(s,o)=>add(p(s,o));const H=(s,l=1,pb=false)=>add(h(s,l,pb));const B=(...ss)=>ss.forEach(x=>add(bullet(x)));const T=(a,b)=>add(table(a,b),gap());const F=async(file,w,label,alt)=>{add(await pic(file,w,alt),figLabel(label))}
 const cap=path.join(out,'capturas')
 const logo=path.resolve(__dirname,'../../apps/storefront/public/images/brand/logo-dk-circular-original.png')
 if(await fs.stat(logo).catch(()=>false)) add(new Paragraph({alignment:AlignmentType.CENTER,spacing:{before:500,after:220},children:[new ImageRun({data:await fs.readFile(logo),transformation:{width:100,height:100},altText:{title:'Logo BioProductos DK',description:'Logotipo incluido en el repositorio',name:'Logo DK'}})]}))
 P('INACAP · PROYECTO INTEGRADO · DIIT01',{align:AlignmentType.CENTER,size:18,color:green,bold:true,after:230})
 P('GUÍA TÉCNICA DE IMPLEMENTACIÓN\nY ORIENTACIÓN EN FIGMA',{align:AlignmentType.CENTER,size:34,color:ink,bold:true,after:120})
 P('BioProductos DK · Unidad 2',{align:AlignmentType.CENTER,size:27,color:leaf,bold:true,after:180})
 P('Documento de transferencia para Diseño e Informática',{align:AlignmentType.CENTER,size:19,color:gray,after:330})
 add(table(['EQUIPO','DATOS ACADÉMICOS'],[
 ['Bayron Alexander · Britanny Rojas','Carrera: [completar]'],['Elizmar Marin · Martina Tapia','Sección: [completar]'],['Docente','[completar]'],['Sede','[confirmar]'],['Fecha','19 de octubre de 2026']
 ]));
 P('Propósito: permitir que un programador continúe el producto conociendo la estructura real, el diseño acordado, los límites actuales y los criterios para cerrar cada módulo.',{align:AlignmentType.CENTER,size:16,color:gray,italics:true,before:260,after:200})
 add(new PageBreak())
 H('Cómo usar esta guía');P('Este documento es una especificación de continuidad basada en el código actual y el Figma accesible. Empieza por la ruta o función que vas a tocar, revisa su componente, requisitos y criterio de aceptación y luego valida el cambio en desktop y mobile. El informe distingue lo que ya está implementado de lo que todavía es una integración o decisión pendiente.',{})
 P('No es una aprobación de despliegue. Ninguna ruta de compra de demostración debe conectarse a pagos, inventario, facturación o despacho real sin contrato técnico, credenciales de prueba, autorización de la empresa y pruebas de aceptación.',{size:18,color:ink})
 H('Índice');add(new TableOfContents('Contenido',{hyperlink:true,headingStyleRange:'1-3',rightTabStop:9000,includePageNumbers:true}));add(new PageBreak())
 H('1. Resumen para el equipo técnico')
 P('El repositorio contiene un monorepo npm con un storefront Next.js y un backend Medusa. La web editorial se implementa en rutas propias, independientes del storefront dinámico de Medusa. En Productos existe una selección de compra local de demostración basada en localStorage; no genera una orden ni procesa pagos. El archivo Figma accesible muestra un único frame completo de Home desktop. Por ello, para las páginas internas el código y sus estilos son referencia de implementación, mientras que el Figma disponible sirve para identidad visual y lenguaje de Home, no como mockup completo de cada ruta.')
 T(['Área','Estado observado','Acción técnica prioritaria'],[
 ['Frontend editorial','10 rutas separadas y layout compartido.','Mantener módulos por página y centralizar contenido/tokens.'],
 ['Figma','Page 1 contiene Home desktop 1440 × 6337 px.','Completar frames internos y variantes mobile/tablet en el archivo de diseño.'],
 ['Catálogo y carrito demo','6 fichas editoriales; carrito local con cantidades y variantes.','Acordar fuente de producto/precio antes de convertirlo en comercio real.'],
 ['Backend','Medusa instalado; endpoints custom revisados son placeholders.','Definir entidades, API y casos de uso antes de conectar UI.'],
 ['Integraciones','No comprobadas como operativas.','Diseñar adaptadores y sandbox después de aprobación técnica/comercial.'],
 ])
 H('2. Límites funcionales que condicionan la implementación')
 B('El Home y cada página editorial tienen objetivos distintos; conserva rutas y cuerpos separados.',
 'La tienda visual del proyecto no debe comunicarse como compra real. Los precios del carrito local son ficticios y están declarados en el código.',
 'El catálogo editorial contiene seis fichas. Variantes de sales, atributos de jabón/acondicionador, stock, precio final y disponibilidad requieren fuente de datos aprobada.',
 'El formulario de contacto prepara un mensaje mailto en el dispositivo; no almacena ni envía un registro al backend.',
 'La colaboración de residuos es una consulta coordinada, no un programa público de recepción habilitado.',
 'La página legal indica que documentos están en preparación; no redactar términos o avisos como vigentes sin aprobación.',
 'No presentar técnicas de laboratorio, nanotecnología, patentes o beneficios como propiedades probadas de todos los productos.' )
 H('3. Repositorio y arquitectura ejecutable',true)
 H('3.1 Stack confirmado',2)
 T(['Elemento','Versión/configuración observada','Responsabilidad'],[
 ['Node.js','>=22.22.0 (engines del monorepo)','Runtime requerido.'],['npm workspaces','npm@11.13.0','Instalación y coordinación de apps.'],['Storefront','Next.js 15.5.24 · React 19.0.5 · TypeScript','Interfaz pública, SSR, rutas editoriales y vistas de comercio.'],['Backend','Medusa 2.21.2 · TypeScript','Servicios de comercio del starter; módulos activos requieren verificación runtime.'],['Persistencia','PostgreSQL previsto por configuración','No inferir disponibilidad ni datos cargados del repositorio.'],['Estilos','CSS global y CSS Modules; Manrope Variable','Identidad DK editorial y componentes del storefront.'],['Pruebas','node:test · Playwright · axe-core en devDependencies','Unitarias ejecutadas en historial local; E2E requiere browser runtime.'],
 ])
 H('3.2 Mapa de carpetas para orientarse',2)
 T(['Ruta','Qué contiene','Cuándo entrar'],[
 ['apps/storefront/src/app/(editorial)/','Entradas de rutas editoriales y layout compartido.','Crear una página editorial o corregir metadata/routing.'],
 ['apps/storefront/src/modules/dk/editorial/','Componentes React y CSS Modules por página.','Construir body/estilos de cada módulo.'],
 ['apps/storefront/src/content/','Navegación, contenido Home, medios y catálogo.','Cambiar copy/datos editoriales sin duplicarlos en JSX.'],
 ['apps/storefront/src/lib/util/','Carrito demo, media, navegación, lógica común.','Modificar comportamiento compartido con pruebas.'],
 ['apps/storefront/public/images/','Logo y fotografías originales/derivados aprobados.','Añadir medios solo con autorización y conservar fuente.'],
 ['apps/backend/src/api/','Rutas API custom del backend.','Implementar API solo tras definir contrato.'],
 ['apps/backend/src/scripts/','Seed demo y datos iniciales.','Preparar dataset local aislado; nunca producción.'],
 ['tests/','Pruebas unitarias/contratos y Playwright E2E.','Añadir/ajustar cobertura por funcionalidad.'],
 ['docs/','Contexto, PRD, arquitectura, UX, entrevista y roadmap.','Consultar decisiones y límites antes de cambiar experiencia.'],
 ])
 H('3.3 Diagrama de responsabilidades',2)
 await F(path.join(out,'figuras/arquitectura-propuesta.png'),620,'Figura 1. Arquitectura observada; las conexiones de persistencia y servicios requieren validación de entorno.','Diagrama de responsabilidades Next.js, Medusa y PostgreSQL')
 P('Nota de lectura: el gráfico representa separación lógica, no demuestra que el proceso Medusa, PostgreSQL o proveedores externos estén levantados. Verifica `scripts/doctor.mjs`, configuración segura y logs antes de depurar una integración.',{size:17,color:gray})
 H('4. Rutas y especificación funcional',true)
 P('Las rutas editoriales usan App Router y el grupo `(editorial)`. Las rutas dinámicas bajo `[countryCode]` pertenecen al starter Medusa y son distintas del catálogo editorial DK. No confundir la URL de catálogo `/productos` con `/[countryCode]/store` ni su ficha dinámica.')
 T(['Ruta','Entrada / módulo','Propósito y estado'],[
 ['/','(editorial)/page.tsx → editorial/home.tsx','Home narrativo y puerta de entrada. Implementado.'],
 ['/bio-investigacion','bio-investigacion/page.tsx → bio-investigacion-page.tsx','Contenido de I+D y exploración científica; cuerpo independiente. Implementado.'],
 ['/productos','productos/page.tsx → products-page.tsx','Catálogo editorial y selección demo; seis fichas. Compra real no implementada.'],
 ['/empresas','empresas/page.tsx → companies-page.tsx','Información y contacto comercial B2B. Implementado como contenido.'],
 ['/nosotras','nosotras/page.tsx → nosotras-page.tsx','Presentación institucional/humana. Implementada.'],
 ['/contacto','contacto/page.tsx → contact-page.tsx + contact-form.tsx','Canales y formulario mailto; no persistencia.'],
 ['/bio-impacto','bio-impacto/page.tsx → bio-impacto-page.tsx','Enfoque de circularidad e impacto; contenido y enlaces.'],
 ['/donaciones','donaciones/page.tsx','Orientación de consulta y protocolo preliminar; no recepción pública.'],
 ['/donde-comprar','donde-comprar/page.tsx → where-to-buy-page.tsx','Dirección y iframe de Google Maps; indicaciones externas.'],
 ['/informacion-legal','informacion-legal/page.tsx → pending-page.tsx','Estado de documentos legales pendientes; no política vigente.'],
 ['/demo','demo/page.tsx','Vista de demostración identificada por separado.'],
 ['/[countryCode]/store, /cart, /products/[handle]…','Rutas del starter bajo app/[countryCode]/','Plantillas dinámicas Medusa; requieren backend, región y catálogo runtime. No presentarlas como catálogo editorial.'],
 ])
 H('4.1 Secuencia de trabajo por página',2)
 B('Identifica el archivo `page.tsx` y su módulo destino antes de editar.',
 'Mantén metadata propia en páginas editoriales y usa layout compartido para navegación, ribbon, footer y tema.',
 'Confirma enlaces internos con rutas exactas; el header principal respeta orden Inicio, Bio Investigación, Productos, Empresas, Nosotras, Contacto.',
 'Define estados vacíos, errores y confirmación en la página; no escondas el estado funcional detrás de una animación.',
 'Añade o actualiza el test de contenido/ruta y el E2E del módulo.',
 'Prueba ancho 390, 768 y 1440 px, además de teclado y prefers-reduced-motion.')
 H('5. Guía de lectura y evolución del Figma',true)
 H('5.1 Qué contiene el archivo accesible',2)
 P('Archivo Figma identificado como `BIOPRODUCTOS DK — MASTER UX UI` (file key `N0Ro5ZM38uwZpUIti7GUAC`). La inspección encontró `Page 1` y un frame principal `4:2`, 1440 × 6337 px, correspondiente al Home. No se encontraron en ese archivo frames completos de Bio Investigación, Productos, Empresas, Nosotras, Contacto, Bio Impacto, Donaciones, Dónde comprar o breakpoints tablet/mobile. No asumas que esos frames existen: deben incorporarse para que el Figma sea especificación visual completa.')
 await F(path.join(cap,'figma-home-completa.png'),430,'Figura 2. Home completo en el único frame Figma disponible; escala reducida para mostrar el orden general.','Captura del Home completo del Figma master')
 H('5.2 Orden visual del frame Home',2)
 T(['Orden','Área del frame','Qué debe conservarse al implementar'],[
 ['01','Header y navegación compartidos','Logo, redes, navegación centrada, CTA Donaciones y acceso de carrito; sticky direccional según scroll.'],
 ['02','Cinta de mensajes','Carrusel de mensajes de marca en loop, arrastrable y con teclado; movimiento reducido respetado.'],
 ['03','Hero de tres estados','Slides manuales/automáticos con transición de opacidad, indicador de progreso; sin pausa por hover.'],
 ['04','Invitación a donaciones + ubicación','Franja visual de donación y enlace; banda “Ubícanos aquí” a /donde-comprar. No afirmar recepción habilitada.'],
 ['05','ADN / pilares','Sección de marca y ciencia con composición más editorial, contraste, bloques informativos.'],
 ['06','Nuestra colección','Grilla de productos, tamaños consistentes y CTA final al catálogo; indicar disponibilidad solo si hay datos.'],
 ['07','Ciencia e investigación','Resumen que lleva a la página Bio Investigación; el Home no sustituye esa página.'],
 ['08','Empresas / Bio Impacto / Nosotras','Adelantos diferenciados que profundizan en páginas independientes.'],
 ['09','Footer','Exploración, contacto, accesos complementarios y estado legal real.'],
 ])
 H('5.3 Cómo completar el Figma para desarrollo',2)
 B('Crear páginas/frames separados para cada ruta, nombrados con el path real y breakpoint: `Productos / Desktop 1440`, `Productos / Mobile 390`, etc.',
 'Agregar componentes compartidos con variantes (Header default/menu abierto; botón default/hover/focus/disabled; product card; formulario; toast; carrito vacío/con líneas).',
 'Marcar acciones prototipo: links entre frames, abrir/cerrar menú, cambiar filtros, variantes, cantidad, agregar al carrito, quitar línea, theme toggle y CTA.',
 'Incluir anotaciones de reglas (máximo ancho, espaciado, breakpoints, comportamiento sticky, reduced motion) como Dev Mode/specs; no dejar decisiones críticas solo en comentarios.',
 'No reconstruir Figma a partir de una captura de baja escala: usar capturas como referencia visual y el código CSS como evidencia de medidas/estados reales.',
 'Usar el sistema de color y tipografía extraído del CSS. Comparar con frame antes de alterar tokens; registrar cambios acordados en Figma y código a la vez.')
 H('5.4 Tokens observados',2)
 T(['Token / valor observado','Uso en interfaz','Orientación'],[
 ['#1B563C · verde profundo','Color principal / bloques de identidad','Usar con texto blanco y revisar contraste en tamaño pequeño.'],['#2F7146 · verde medio','Acciones y énfasis','Reservar para CTAs y estados interactivos.'],['#18372A · verde tinta','Texto fuerte / títulos','Preferir para cuerpo sobre fondos claros.'],['#FBF8F0 · marfil cálido','Superficie clara','Fondo editorial primario.'],['#E3EED2 · salvia','Superficie secundaria / acento suave','Evitar bajo contraste para texto pequeño.'],['#D6E9A3 · verde claro','Acento puntual','No usar como texto sobre blanco.'],['Manrope Variable','Tipografía editorial','Cargar desde @fontsource-variable/manrope y conservar jerarquías CSS.'],
 ])
 H('6. Componentes, estado e interacción',true)
 T(['Componente','Ubicación','Contrato de comportamiento / verificación'],[
 ['SiteHeader / SiteNavigation','site-layout.tsx, navigation.tsx','Links principales; active aria-current; menu mobile con Escape, focus loop, restauración de foco, resize y body scroll lock.'],
 ['BrandRibbon','brand-ribbon.tsx + ribbon-drag.ts','Loop, drag pointer/touch, inercia acotada, teclado, reduced motion; hover no detiene autoplay.'],
 ['HomeHeroCarousel','home-hero-carousel.tsx','Auto-advance y swipe/drag manual; progress, desvanecido, controles accesibles; respeta reduced motion.'],
 ['ThemeToggle','theme-toggle.tsx','Persistir `dk-color-theme`, seguir preferencia de sistema antes de cambio manual, anuncio accesible; tema consistente por rutas.'],
 ['HeaderCart / Popover','header-cart.tsx, header-cart-popover.tsx','Separar vista previa protegida del carrito Medusa; estado no disponible nunca debe convertirse en falso carrito vacío.'],
 ['Product catalogue','products-page.tsx, content/products.ts','Filtro Todo/Hogar/Cuidado personal, búsqueda, variantes requeridas, cantidad 1–20, suma demo, toast accesible con imagen del producto.'],
 ['Demo cart utilities','lib/util/demo-cart.ts','Normaliza storage, valida id/variant/cantidad, combina líneas, actualiza/quita, precios ficticios. Cubierto por unit tests.'],
 ['ContactForm','contact-form.tsx','Validación nativa de campos; prepara mailto codificado; muestra mensaje de instrucción, no indicar “enviado”.'],
 ['Where to buy','where-to-buy-page.tsx','Iframe Maps con title descriptivo y enlace externo; fallback de abrir Maps debe ser visible si embed se bloquea.'],
 ['SiteEnhancements','site-enhancements.tsx','Header se retrae/descubre proporcional al scroll; reveal con IntersectionObserver; cancela animaciones según preferencia.'],
 ])
 H('6.1 Estados transversales que deben diseñarse',2)
 T(['Estado','Elementos afectados','Comportamiento esperado'],[
 ['Normal / hover / focus-visible','Links, botones, cards, icon buttons','Diferenciar estados sin depender solo de color; focus visible con teclado.'],['Menú mobile abierto','Header y navegación','Overlay, Escape, cierre en navegación, foco contenido y restauración.'],['Dark / light','Todas las rutas editoriales','Contraste legible; texto de botón, card, carousel, formulario, toast y mapa verificable.'],['Reduce motion','Ribbon, carousel, reveal, theme, scroll header','Eliminar movimiento no esencial y permitir controles equivalentes.'],['Vacío / error / no disponible','Carrito, datos de backend, mapa, formularios','Mensajes claros; no inventar contenido ni confirmar acciones no realizadas.'],['Selección / cantidad inválida','Variantes/cantidad','Indicar qué falta y bloquear adición hasta ser válida.'],
 ])
 H('7. Contratos de datos y backend',true)
 P('Antes de conectar la interfaz editorial a servicios, definir quién es fuente de verdad, identificadores persistentes, moneda, disponibilidad, impuestos, reglas de envío y errores. El front actual no debe inferir estos datos del copy estático.')
 T(['Entidad conceptual','Campos mínimos propuestos','Estado / decisión necesaria'],[
 ['Producto','id/handle, nombre, categoría, descripción aprobada, media, variantes, precio, moneda, disponibilidad','Hoy hay contenido editorial y demo price local; modelado comercial aprobado pendiente.'],
 ['Variante','id, productId, nombre, sku si corresponde, precio, inventario','No hay stock real verificado. Definir si variantes serán variantes Medusa.'],
 ['Carrito','id/session, líneas variantId + qty, subtotal, moneda, status','Demo guarda productId/variant/quantity en localStorage; no equivale al carrito server-side.'],
 ['Orden','id, líneas, dirección, contacto, estado y referencia de pago','No implementada en el flujo editorial; requerir contrato de pedido y retención de datos.'],
 ['Contacto/consulta','nombre, email, teléfono opcional, tema, mensaje, consentimiento y timestamp','Hoy mailto local. Si se implementa API: definir aviso privacidad, validación, rate limit y borrado.'],
 ['Residuo / colaboración','material, origen, comuna, cantidad/frecuencia, contacto, revisión y consentimiento','La página solo prepara consulta; recepción debe acordarse, no automatizar aceptación.'],
 ])
 H('7.1 Reglas API para implementar cuando se apruebe',2)
 B('Usar validación de esquema tanto en cliente como en servidor; rechazar cantidades fuera de límites y variantes desconocidas.',
 'Responder errores con código estable y mensaje seguro; no devolver credenciales, tokens, cabeceras ni payloads privados.',
 'Proteger admin mediante autenticación/roles Medusa; no crear endpoint público para consultar o modificar inventario interno.',
 'Usar claves idempotentes para creación de orden y pago, registrar estado y manejar reintentos antes de habilitar checkout.',
 'No loguear dirección, teléfono, correo ni datos tributarios en texto plano salvo política aprobada; minimizar y retener lo estrictamente necesario.',
 'Mantener `DK_DEMO_PREVIEW` y `assertLocalDemoEnvironment` como guardas de seguridad hasta cerrar pruebas locales; no relajar guardas para “hacer que funcione”.')
 H('7.2 Integraciones: estado honesto',2)
 T(['Sistema','Estado comprobado','Qué requiere el equipo'],[
 ['Medusa Store API','Dependencia instalada; editoriales aisladas; ruta custom revisada devuelve respuesta mínima.','Configurar región/catálogo local, contrato y pruebas de integración.'],['PostgreSQL','Dependencia/configuración prevista.','Confirmar servicio local, migraciones, seed y recuperación; no inferir por archivo env.'],['Pago','No verificado en la propuesta editorial.','Aprobación, credenciales sandbox, webhook, conciliación, expiración y rechazo.'],['Despacho','No verificado como integración ejecutable.','Contrato de cotización/etiqueta/seguimiento, direcciones, cobertura y manejo de fallo.'],['Boleta/factura','No verificado.','Definir proveedor DTE y validaciones tributarias con responsables autorizados.'],['Correo formulario','Mailto del navegador solamente.','Si se requiere envío backend, seleccionar proveedor, consentimiento, antispam y protección de datos.'],
 ])
 H('8. Especificación visual y responsive',true)
 P('El diseño DK no es un único template de tarjetas. Mantener alternancia de composiciones editoriales, superficies cálidas/blancas y bloques verdes, foco visual por sección y respiración controlada. Evitar hacer cada sección de la misma altura o repetir el mismo patrón de columnas. El contenido se vuelve más denso en investigación y comercio, así que prioriza legibilidad y acciones visibles.')
 T(['Breakpoint de prueba','Resolución objetivo','Revisión visual mínima'],[
 ['Mobile','390 px','Header menú, orden de lectura, CTA visible, cards en columna, no overflow horizontal, controles táctiles, tipografía legible.'],['Tablet','768 px','Cambio de grillas, imágenes sin recorte relevante, columnas de texto, navegación y drawer sin saltos.'],['Desktop','1440 px','Max-width consistente, secciones con ritmo, navegación completa y contraste de composición con Figma.'],
 ])
 H('8.1 Checklist WCAG y UX',2)
 B('Toda acción debe poder operarse con teclado; foco visible no oculto por header/sticky.',
 'Contraste mínimo debe medirse para cada combinación de texto/fondo y ambos temas; apuntar a WCAG 2.2 AA donde aplique.',
 'Imágenes informativas tienen alt equivalente; decorativas alt vacío. Los thumbnails de toast necesitan nombre del producto asociado.',
 'No usar color como único indicador para filtro activo, error o disponibilidad.',
 'Animaciones respetan `prefers-reduced-motion`; evitar autoplay sin pausa/alternativa cuando la norma/uso lo requiera y mantener controles.',
 'Formularios asocian label, required, tipo y error; informar que mailto abre una aplicación externa y no confirmar envío.',
 'El iframe de Maps incluye title y fallback externo. Mantener alternativa si el navegador bloquea el embed.')
 H('9. Plan de implementación para programador',true)
 T(['ID / prioridad','Trabajo','Dependencias','Criterio de cierre verificable'],[
 ['T0 · P0','Entorno local reproducible','Node/npm/env local','`npm run doctor`, `npm run dev:storefront`; healthcheck responde sin relajar guardas.'],
 ['T1 · P0','Fuente única para catálogo','Aprobación de dueño de datos','IDs/variantes/media/precio/disponibilidad definidos; ningún precio ficticio expuesto como real.'],
 ['T2 · P0','Contrato de comercio','T1 + decisiones de pedido/pago','OpenAPI o tipos validados, estados de error y límites acordados antes de UI real.'],
 ['T3 · P1','Diseño Figma por ruta','Frame Home actual + requisitos','Frames Desktop/Mobile, estados, prototipo y anotaciones por cada ruta.'],
 ['T4 · P1','API storefront y backend','T2 + PostgreSQL local','Tests integración: región, catálogo, carrito, orden demo; datos de cliente no se filtran.'],
 ['T5 · P1','Checkout y pago sandbox','T4 + proveedor autorizado','Éxito, rechazo, cancelación, timeout y webhook repetido quedan cubiertos.'],
 ['T6 · P1','Logística y DTE sandbox','T4 + proveedor / empresa','Errores y campos incompletos visibles; prueba con datos sintéticos.'],
 ['T7 · P1','Admin y roles','Modelo de productos/pedidos','Solo usuarios autorizados editan; auditoría y permisos verificados.'],
 ['T8 · P2','QA funcional, responsive y accesibilidad','T3–T7','Unit, typecheck, lint, E2E y axe para rutas críticas; issues bloqueantes resueltos.'],
 ['T9 · P2','Preparación de operación','Aprobación explícita DK','Backup, monitorización, secretos, privacidad/legal, dominio y rollback documentados.'],
 ])
 H('9.1 Definición de terminado por historia',2)
 B('Requisito vinculado a una ruta, componente y criterio observable.',
 'Implementación no rompe contenido, interacción, responsive, dark/light ni reduced motion.',
 'Prueba automatizada relevante añadida o actualizada y ejecución registrada.',
 'Aprobación de texto, imagen y claims por responsable cuando sea contenido institucional/comercial.',
 'Errores/loading/empty states revisados; accesibilidad de teclado y lector de pantalla comprobada.',
 'Documentación de endpoint/configuración actualizada sin secretos.')
 H('10. Pruebas y comandos',true)
 T(['Comando desde raíz','Qué valida','Limitación'],[
 ['npm run dev:storefront','Next dev en 127.0.0.1:8000','Backend no implica levantado automáticamente.'],['npm run dev:backend','Medusa local','Requiere env/DB configurados; comprobar que apunta a recurso local autorizado.'],['npm test','Tests node:test del monorepo','No sustituye browser E2E.'],['npm run typecheck','TypeScript en workspaces','Verifica tipos, no comportamiento.'],['npm run lint','ESLint workspaces','Atender warnings con criterio; no auto-fix indiscriminado.'],['npm run test:e2e','Playwright suites','Requiere browsers instalados y servidores según playwright.config.'],['npm run verify','Suite de verificación del proyecto','Leer resultado y prerequisitos definidos en scripts/verify.mjs.'],
 ])
 P('La suite unitaria registrada en el trabajo de auditoría tuvo 47 casos aprobados y el typecheck pasó; lint del storefront reportó 10 warnings. No considerar esto una validación integral de producción. Ejecutar de nuevo al iniciar la siguiente iteración y registrar fecha, commit y salida real.',{size:17,color:gray})
 H('10.1 Cobertura de casos críticos',2)
 T(['Área','Caso mínimo','Resultado esperado'],[
 ['Navegación','abrir/cerrar menú, Escape, cambiar ruta, móvil/desktop','Rutas correctas; foco y scroll recuperados.'],['Ribbon/carousel','hover, drag lento/rápido, teclado, reduced motion','Movimiento coherente, no bloquea y respeta preferencia.'],['Catálogo','filtros, búsqueda, variante requerida, cantidad límite','Productos correctos y error explicado.'],['Carrito demo','persistir, modificar cantidad, borrar, storage inválido','Estado normalizado y nunca pedido real.'],['Contacto','campos vacíos, email incorrecto, mailto','Validación clara; no afirmar envío completado.'],['Tema','alternar tema, recarga, preferencia sistema','Tema persistente y contenido legible.'],['Mapa','iframe bloqueado, link abrir Maps, mobile','Fallback usable; frame no desborda.'],
 ])
 H('11. Riesgos, decisiones pendientes y responsable',true)
 T(['Pendiente','Por qué bloquea','Responsable sugerido'],[
 ['Frames Figma de todas las rutas y breakpoints','Sin ellos el programador no tiene especificación visual aprobable de páginas internas.','Diseño + equipo de producto.'],
 ['Catálogo maestro validado','Fichas/categorías/variantes/descripciones y medios requieren decisión de negocio.','Responsable DK + contenido.'],
 ['Precio y stock fuente de verdad','No convertir cantidades ficticias en venta ni mostrar inventario erróneo.','Negocio + backend.'],
 ['Contratos API y datos personales','Checkout/contacto requieren privacidad, seguridad y retención definida.','Informática + responsable legal.'],
 ['Proveedores sandbox','Pago/despacho/DTE no funcionan sin contratos y credenciales de prueba.','Responsable técnico + DK.'],
 ['Textos científicos/legal aprobados','Claims o política incorrecta crean riesgo reputacional/legal.','Responsable científico/legal DK.'],
 ['Validación con usuarios','No existen resultados de usabilidad localizados para priorizar problemas observados.','UX + participantes autorizados.'],
 ])
 H('12. Referencia compacta de diseño para implementación',true)
 P('En una tarea visual, compara en este orden: (1) estructura y orden de contenido, (2) ancho/espaciado y jerarquía, (3) color/contraste y tipografía, (4) tratamiento de imagen, (5) estados y movimiento. El código es responsive y el frame Home Figma es desktop; no escales una captura como reemplazo de especificación mobile.')
 T(['Decisión visual','Aplicación práctica en código'],[
 ['Identidad','Verde profundo + salvia + marfil; conservar variables y tonos del CSS antes de agregar colores.'],
 ['Jerarquía','H1 claro y conciso; subtítulos de sección; etiqueta editorial pequeña; cuerpo con line-height amplio.'],
 ['Ritmo','Alternar fondos, anchuras y composiciones; no duplicar cuatro cards idénticas por defecto.'],
 ['Fotografía','Usar recursos existentes de `public/images/` y el registro `content/media.ts`; preservar alt, crop y variantes responsive.'],
 ['Interacción','Hover discreto, focus visible, feedback inmediato y estados de operación; animar con CSS/WAAPI ya existente antes de sumar librerías.'],
 ['Dark mode','Tokens y selectores `[data-theme="dark"]`/`.dark`; validar cada texto y estado, no solo fondos.'],
 ])
 H('Anexo A — Matriz ruta a archivos y QA',true)
 T(['Ruta','Módulo principal','Prueba E2E relevante / unidad'],[
 ['/','modules/dk/editorial/home.tsx','tests/e2e/preview.spec.ts; home-content.test.mjs'],['/bio-investigacion','bio-investigacion-page.tsx','tests/e2e/bio-investigacion.spec.ts'],['/productos','products-page.tsx','tests/e2e/productos.spec.ts; demo-cart.test.mjs'],['/empresas','companies-page.tsx','tests/e2e/empresas.spec.ts'],['/nosotras','nosotras-page.tsx','tests/e2e/nosotras.spec.ts'],['/contacto','contact-page.tsx + contact-form.tsx','tests/e2e/contacto.spec.ts; home-content.test.mjs'],['/bio-impacto','bio-impacto-page.tsx','tests/e2e/bio-impacto.spec.ts'],['/donaciones','app/(editorial)/donaciones/page.tsx','tests/e2e/donaciones.spec.ts'],['/donde-comprar','where-to-buy-page.tsx','tests/e2e/donde-comprar.spec.ts'],['/informacion-legal','pending-page.tsx','tests/home-content.test.mjs'],['/demo','app/demo/page.tsx','Revisar pruebas y límites de preview.'],
 ])
 H('Anexo B — Flujos que el Figma debe prototipar',true)
 T(['Flujo','Pasos','Pantallas/estados a enlazar'],[
 ['Orientación inicial','Home → Bio Investigación / Productos / Empresas / Nosotras / Contacto','Home y destinos; menú mobile.'],['Explorar catálogo','Productos → filtro → detalle/variante → cantidad → agregar → revisar carrito demo','Filtros activos, error de variante, toast, carrito vacío/con líneas.'],['Consulta de contacto','Contacto → llenar campos → validación → preparar correo','Errores nativos y aviso mailto; no estado “enviado”.'],['Consulta de colaboración','Donaciones → revisar información → CTA mailto','Estado informativo; ningún “recibido/aprobado”.'],['Ubicación','Home/Empresas → Dónde comprar → Maps externo','Embed visible y fallback de mapa bloqueado.'],
 ])
 H('Anexo C — Archivos examinados y fuentes de continuidad',true)
 B('README.md del monorepo y package.json de raíz, storefront y backend.',
 'docs/MASTER_CONTEXT.md, docs/PRD.md, docs/ROADMAP.md, docs/ARQUITECTURA.md, docs/DISENO_UX_UI.md, docs/ENTREVISTA_TERRENO_BIO_DK.md y docs/DATOS_Y_CONTENIDO.md.',
 'Rutas y módulos bajo apps/storefront/src/app, apps/storefront/src/modules/dk/editorial, apps/storefront/src/content y apps/storefront/src/lib.',
 'apps/backend/src/api/store/custom/route.ts, admin/custom/route.ts, lib/demo-safety.ts y scripts de datos demo.',
 'tests unitarios, contratos y suites Playwright de Home, Productos, contacto, ubicación, empresas, investigación, impacto y donaciones.',
 'Figma file key N0Ro5ZM38uwZpUIti7GUAC, Page 1, frame 4:2 y captura anexada.')
 H('Anexo D — Checklist de inicio para una nueva persona',true)
 B('Lee esta guía y `docs/MASTER_CONTEXT.md`; confirma rama y archivos modificados antes de tocar nada.',
 'Comprueba Node >=22.22.0, ejecuta `npm run doctor` y revisa los requisitos locales sin compartir secretos.',
 'Levanta `npm run dev:storefront`; levanta backend solo si el caso requiere datos Medusa y la configuración es local/demo.',
 'Abre la ruta objetivo, compara el Figma disponible y verifica si falta frame antes de reinterpretar el diseño.',
 'Implementa el cambio en el módulo de página adecuado; evita mover layouts compartidos para cambios locales.',
 'Añade pruebas, ejecuta `npm test`, `npm run typecheck`, lint y E2E pertinente; registra limitaciones.',
 'Actualiza ROADMAP/documentación del módulo y no habilites pago, datos reales ni servicios externos sin autorización.')
 H('Anexo E — Pendientes que impiden especificación de producción',true)
 B('Frames Figma completos por ruta, estados interactivos, tablet y mobile.',
 'Catálogo final aprobado: variantes, nombres, descripciones, fotografías, precios, inventario y disponibilidad.',
 'Contratos del backend y definición de fuente de verdad para producto, carrito, pedido y cliente.',
 'Proveedores autorizados, credenciales sandbox, webhooks y procesos de devolución/error.',
 'Política de privacidad, términos, consentimiento, retención y responsables de acceso a datos.',
 'Validación técnica y aceptación institucional de contenido científico, comercial y ubicación.',
 'Ejecución E2E/axe en entorno local completo, incluyendo flujos críticos y fallos de red.')
 H('Referencias de implementación')
 T(['Fuente','Uso'],[
 ['Código del monorepo BioProductos DK; rutas `apps/storefront`, `apps/backend`, `tests/`','Fuente primaria del estado técnico descrito.'],
 ['`docs/MASTER_CONTEXT.md`, `docs/PRD.md`, `docs/ROADMAP.md`, `docs/ARQUITECTURA.md`, `docs/DISENO_UX_UI.md`','Decisiones, restricciones y contexto técnico del equipo.'],
 ['Figma `BIOPRODUCTOS DK — MASTER UX UI`, file key N0Ro5ZM38uwZpUIti7GUAC','Evidencia visual accesible, Home desktop.'],
 ['Next.js App Router: https://nextjs.org/docs/app','Referencia de rutas/layouts, consultar versión vigente de Next 15 antes de cambios.'],
 ['Medusa architecture: https://docs.medusajs.com/learn/introduction/architecture','Referencia del backend y separación de módulos.'],
 ['W3C WCAG 2.2: https://www.w3.org/TR/WCAG22/','Criterios de accesibilidad para QA; cumplimiento no certificado.'],
 ])
 H('Control de uso del documento')
 P('La guía se preparó para orientar implementación y continuidad académica. Los datos y rutas corresponden al estado auditado el 19-10-2026; antes de cada sprint, confirmar que el branch conserva esas versiones y ejecutar de nuevo los checks. El Figma consultado no cubre por sí solo todas las páginas. Completar sus frames antes de tratarlo como handoff final.',{size:17,color:gray})

 const doc=new Document({creator:'Equipo de proyecto BioProductos DK',title:'Guía técnica de implementación y orientación en Figma — BioProductos DK',subject:'Transferencia técnica para equipo de Informática',description:'Especificación basada en repositorio, pruebas y Figma accesible.',styles:{default:{document:{run:{font:'Arial',size:20,color:'27352D'},paragraph:{spacing:{line:275,after:100}}}}},sections:[{properties:{page:{size:{width:12240,height:15840},margin:{top:1150,bottom:1050,left:1150,right:1150}}},headers:{default:new Header({children:[new Paragraph({alignment:AlignmentType.RIGHT,children:[new TextRun({text:'BIOPRODUCTOS DK  /  GUÍA TÉCNICA',font:'Arial',size:15,color:gray})]})]})},footers:{default:new Footer({children:[new Paragraph({alignment:AlignmentType.CENTER,children:[new TextRun({text:'Uso académico · estado de implementación verificable     |     ',font:'Arial',size:14,color:gray}),new TextRun({children:[PageNumber.CURRENT],font:'Arial',size:14,color:gray})]})]})},children:body}],tableOfContents:{h1:'000000',h2:'000000',h3:'000000',hyperlink:true},features:{updateFields:true}})
 const buffer=await Packer.toBuffer(doc);const dest=path.join(out,'Informe DK.docx');await fs.writeFile(dest,buffer);console.log(JSON.stringify({docx:dest,bytes:buffer.length,paragraphs:body.length,figmaFrame:'Home Desktop only',contributors:4},null,2))
}
main().catch(e=>{console.error(e);process.exit(1)})
