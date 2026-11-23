const fs = require('node:fs/promises')
const path = require('node:path')
const { createRequire } = require('node:module')
const requireDocs = createRequire('/tmp/dk-docx-tools/package.json')
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, ImageRun,
  HeadingLevel, AlignmentType, WidthType, BorderStyle, ShadingType, Header,
  Footer, PageNumber, TableOfContents, PageBreak, LevelFormat,
} = requireDocs('docx')
const sharp = require(path.resolve(__dirname, '../../node_modules/sharp'))

const root = path.resolve(__dirname, '../..')
const out = __dirname
const green = '1B563C'
const leaf = '2F7146'
const ink = '18372A'
const paper = 'FBF8F0'
const sage = 'E3EED2'
const lime = 'D6E9A3'
const gray = '65736A'
const line = 'D9E2D5'
const white = 'FFFFFF'
const border = { style: BorderStyle.SINGLE, size: 4, color: line }

const para = (text, opts = {}) => new Paragraph({
  spacing: { after: opts.after ?? 130, before: opts.before ?? 0, line: 286 },
  alignment: opts.align ?? AlignmentType.LEFT,
  keepNext: opts.keepNext ?? false,
  pageBreakBefore: opts.pageBreakBefore ?? false,
  indent: opts.indent,
  children: [new TextRun({
    text, font: 'Arial', size: opts.size ?? 21, color: opts.color ?? '27352D',
    bold: opts.bold ?? false, italics: opts.italics ?? false,
  })],
})
const heading = (text, level = 1, pageBreak = false) => new Paragraph({
  heading: [HeadingLevel.HEADING_1, HeadingLevel.HEADING_2, HeadingLevel.HEADING_3][level - 1],
  pageBreakBefore: pageBreak,
  keepNext: true,
  spacing: { before: level === 1 ? 250 : 180, after: level === 1 ? 130 : 90 },
  children: [new TextRun({ text, font: level === 1 ? 'Arial' : 'Arial', bold: true,
    color: level === 1 ? green : level === 2 ? ink : leaf,
    size: level === 1 ? 31 : level === 2 ? 25 : 22 })],
})
const bullet = (text) => new Paragraph({
  bullet: { level: 0 }, spacing: { after: 70, line: 260 },
  children: [new TextRun({ text, font: 'Arial', size: 20, color: '27352D' })],
})
const cell = (text, header = false, width = 1) => new TableCell({
  width: { size: width, type: WidthType.AUTO },
  margins: { top: 90, bottom: 90, left: 110, right: 110 },
  shading: header ? { fill: green, type: ShadingType.CLEAR } : undefined,
  verticalAlign: 'center',
  children: [new Paragraph({ spacing: { after: 0, line: 230 }, children: [new TextRun({
    text: String(text), font: 'Arial', size: header ? 17 : 16,
    bold: header, color: header ? white : '27352D',
  })] })],
})
const table = (headers, rows, widths) => new Table({
  width: { size: 100, type: WidthType.PERCENTAGE },
  columnWidths: widths,
  borders: { top: border, bottom: border, left: border, right: border,
    insideHorizontal: border, insideVertical: border },
  rows: [
    new TableRow({ tableHeader: true, children: headers.map((x, i) => cell(x, true, widths[i])) }),
    ...rows.map((row, r) => new TableRow({ cantSplit: true, children: row.map((x, i) => {
      const c = cell(x, false, widths[i])
      if (r % 2 === 1) c.options.shading = { fill: 'F4F6EF', type: ShadingType.CLEAR }
      return c
    }) })),
  ],
})
const figureLabel = (text) => new Paragraph({ alignment: AlignmentType.CENTER,
  spacing: { before: 35, after: 150 }, children: [new TextRun({ text, font: 'Arial', size: 16, color: gray, italics: true })] })
const image = async (file, width, alt) => {
  const meta = await sharp(file).metadata()
  return new Paragraph({ alignment: AlignmentType.CENTER,
    spacing: { before: 80, after: 40 }, children: [new ImageRun({ data: await fs.readFile(file), transformation: { width, height: Math.round(width * (meta.height / meta.width)) }, altText: { title: alt, description: alt, name: alt } })] })
}
const callout = (label, text, color = sage) => new Table({
  width: { size: 100, type: WidthType.PERCENTAGE },
  borders: { top: border, bottom: border, left: border, right: border,
    insideHorizontal: border, insideVertical: border },
  rows: [new TableRow({ children: [new TableCell({ shading: { fill: color, type: ShadingType.CLEAR },
    margins: { top: 130, bottom: 130, left: 160, right: 160 }, children: [new Paragraph({ spacing: { after: 40 }, children: [new TextRun({ text: label.toUpperCase(), font: 'Arial', bold: true, size: 17, color: green })] }), new Paragraph({ spacing: { after: 0, line: 260 }, children: [new TextRun({ text, font: 'Arial', size: 19, color: ink })] })] })] })],
})
const gap = () => new Paragraph({ spacing: { after: 80 }, children: [new TextRun(' ')] })
const pageBreak = () => new Paragraph({ children: [new PageBreak()] })
const figureFile = (name) => path.join(out, 'figuras', name)

async function makeDiagram(name, title, subtitle, nodes, arrows = true) {
  const width = 1440, height = 300
  const count = nodes.length, cardW = Math.min(250, (width - 110 - (count - 1) * 70) / count)
  const start = (width - (count * cardW + (count - 1) * 70)) / 2
  const cards = nodes.map((n, i) => {
    const x = start + i * (cardW + 70)
    return `${arrows && i ? `<path d="M ${x-58} 171 h 42" stroke="#88a987" stroke-width="4" marker-end="url(#arr)"/>` : ''}<rect x="${x}" y="108" width="${cardW}" height="112" rx="18" fill="${i % 2 ? '#E3EED2' : '#1B563C'}"/><text x="${x+cardW/2}" y="153" text-anchor="middle" font-family="Arial" font-size="18" font-weight="700" fill="${i % 2 ? '#18372A' : '#FFFFFF'}">${n[0]}</text><text x="${x+cardW/2}" y="184" text-anchor="middle" font-family="Arial" font-size="14" fill="${i % 2 ? '#365646' : '#E3EED2'}">${n[1] || ''}</text>`
  }).join('')
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><defs><marker id="arr" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#2F7146"/></marker></defs><rect width="100%" height="100%" rx="20" fill="#FBF8F0"/><text x="45" y="42" font-family="Arial" font-weight="700" font-size="23" fill="#1B563C">${title}</text><text x="45" y="72" font-family="Arial" font-size="15" fill="#65736A">${subtitle}</text>${cards}</svg>`
  const svgPath = figureFile(`${name}.svg`)
  const pngPath = figureFile(`${name}.png`)
  await fs.writeFile(svgPath, svg)
  await sharp(Buffer.from(svg)).png().toFile(pngPath)
  return pngPath
}

async function makeArchitectureDiagram() {
  const width = 1440, height = 520
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs><marker id="arr" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#2F7146"/></marker></defs>
  <rect width="100%" height="100%" rx="20" fill="#FBF8F0"/>
  <text x="45" y="42" font-family="Arial" font-weight="700" font-size="23" fill="#1B563C">Arquitectura observada y propuesta de continuidad</text>
  <text x="45" y="72" font-family="Arial" font-size="15" fill="#65736A">Separación entre sitio editorial, motor de comercio y servicios que requieren validación.</text>
  <rect x="70" y="168" width="230" height="104" rx="18" fill="#1B563C"/><text x="185" y="211" text-anchor="middle" font-family="Arial" font-size="20" font-weight="700" fill="#fff">Visitante</text><text x="185" y="241" text-anchor="middle" font-family="Arial" font-size="15" fill="#E3EED2">Navegador</text>
  <rect x="400" y="130" width="270" height="180" rx="18" fill="#E3EED2"/><text x="535" y="184" text-anchor="middle" font-family="Arial" font-size="22" font-weight="700" fill="#18372A">Next.js 15</text><text x="535" y="216" text-anchor="middle" font-family="Arial" font-size="16" fill="#365646">Storefront / rutas</text><text x="535" y="246" text-anchor="middle" font-family="Arial" font-size="14" fill="#65736A">Contenido editorial y UI</text>
  <rect x="810" y="130" width="270" height="180" rx="18" fill="#1B563C"/><text x="945" y="184" text-anchor="middle" font-family="Arial" font-size="22" font-weight="700" fill="#fff">Medusa 2</text><text x="945" y="216" text-anchor="middle" font-family="Arial" font-size="16" fill="#E3EED2">Backend / API</text><text x="945" y="246" text-anchor="middle" font-family="Arial" font-size="14" fill="#E3EED2">Estado de servicios por validar</text>
  <rect x="810" y="382" width="270" height="92" rx="18" fill="#E3EED2"/><text x="945" y="420" text-anchor="middle" font-family="Arial" font-size="19" font-weight="700" fill="#18372A">PostgreSQL</text><text x="945" y="447" text-anchor="middle" font-family="Arial" font-size="14" fill="#365646">Persistencia esperada</text>
  <rect x="1150" y="168" width="230" height="104" rx="18" fill="#F1E9D9" stroke="#AAB6A8" stroke-dasharray="8 7"/><text x="1265" y="207" text-anchor="middle" font-family="Arial" font-size="18" font-weight="700" fill="#18372A">Integraciones</text><text x="1265" y="237" text-anchor="middle" font-family="Arial" font-size="14" fill="#65736A">No verificadas / futuras</text>
  <path d="M300 220 H390" stroke="#2F7146" stroke-width="4" marker-end="url(#arr)"/><path d="M670 190 H800" stroke="#2F7146" stroke-width="4" marker-end="url(#arr)"/><path d="M800 250 H680" stroke="#2F7146" stroke-width="3" stroke-dasharray="7 7" marker-end="url(#arr)"/><path d="M945 310 V372" stroke="#2F7146" stroke-width="4" marker-end="url(#arr)"/><path d="M1080 220 H1140" stroke="#8B967F" stroke-width="3" stroke-dasharray="8 7" marker-end="url(#arr)"/>
  <text x="350" y="202" text-anchor="middle" font-family="Arial" font-size="12" fill="#65736A">HTTPS</text><text x="738" y="174" text-anchor="middle" font-family="Arial" font-size="12" fill="#65736A">solicitudes</text><text x="738" y="277" text-anchor="middle" font-family="Arial" font-size="12" fill="#65736A">respuestas</text><text x="945" y="350" text-anchor="middle" font-family="Arial" font-size="12" fill="#65736A">conexión configurada</text>
  </svg>`
  const svgPath = figureFile('arquitectura-propuesta.svg')
  const pngPath = figureFile('arquitectura-propuesta.png')
  await fs.writeFile(svgPath, svg)
  await sharp(Buffer.from(svg)).png().toFile(pngPath)
  return pngPath
}

async function main() {
  const screenshots = path.join(out, 'capturas')
  const sourceShot = path.join(screenshots, 'figma-home-completa.png')
  const meta = await sharp(sourceShot).metadata()
  const crops = [
    ['figma-home-hero.png', 0, 0, meta.width, 1160],
    ['figma-home-identidad-productos.png', 0, 1040, meta.width, 1910],
    ['figma-home-ciencia-impacto.png', 0, 2830, meta.width, 1830],
    ['figma-home-personas-footer.png', 0, 4530, meta.width, 1890],
  ]
  for (const [name, left, top, width, height] of crops) {
    const adjustedHeight = Math.min(height, meta.height - top)
    await sharp(sourceShot).extract({ left, top, width, height: adjustedHeight }).png().toFile(path.join(screenshots, name))
  }

  const arch = await makeArchitectureDiagram()
  const sitemap = await makeDiagram('mapa-navegacion', 'Mapa de navegación editorial implementado', 'Las rutas del comercio Medusa están separadas de las páginas editoriales.', [
    ['Inicio', '/'], ['Ciencia', '/bio-investigacion'], ['Catálogo', '/productos'], ['Empresa', '/empresas'], ['Personas', '/nosotras'],
  ])
  const flow = await makeDiagram('flujo-consulta', 'Flujo de exploración y contacto', 'Recorrido documentado en las rutas y enlaces públicos del sitio.', [
    ['Inicio', 'Descubrimiento'], ['Explorar', 'Ciencia / productos'], ['Elegir', 'Categoría o tema'], ['Consultar', 'Contacto / empresas'], ['Respuesta', 'Correo preparado'],
  ])
  const cartflow = await makeDiagram('flujo-carrito-demo', 'Carrito local: simulación de interfaz', 'La página Productos prueba la interacción local; no crea pedido ni cobra.', [
    ['Elegir', 'Producto / variante'], ['Sumar', 'Cantidad'], ['Revisar', 'Carrito local'], ['Confirmar', 'Demo visual'], ['Fin', 'Sin orden real'],
  ])
  const roadmap = await makeDiagram('roadmap', 'Continuidad recomendada', 'Orden analítico propuesto; no implica autorización ni calendario aprobado.', [
    ['Evidencia', 'Confirmar datos'], ['Diseño', 'Figma por página'], ['Sistema', 'Backend y datos demo'], ['QA', 'Pruebas observables'], ['Decisión', 'Aprobación empresa'],
  ])

  const body = []
  const add = (...items) => body.push(...items)
  const h1 = (s, page = true) => add(heading(s, 1, page))
  const h2 = (s) => add(heading(s, 2))
  const h3 = (s) => add(heading(s, 3))
  const p = (s, o) => add(para(s, o))
  const b = (...ss) => ss.forEach(s => add(bullet(s)))
  const t = (heads, rows, widths) => add(table(heads, rows, widths), gap())
  const c = (l, s) => add(callout(l, s), gap())
  const fig = async (file, width, label, alt) => { add(await image(file, width, alt), figureLabel(label)) }

  // Portada
  const logo = path.join(root, 'apps/storefront/public/images/brand/logo-dk-circular-original.png')
  if (await fs.stat(logo).catch(() => false)) {
    add(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 650, after: 300 }, children: [new ImageRun({ data: await fs.readFile(logo), transformation: { width: 118, height: 118 }, altText: { title: 'Logotipo circular BioProductos DK', description: 'Logotipo original incluido en el proyecto', name: 'Logotipo BioProductos DK' } })] }))
  }
  add(para('INACAP · PROYECTO INTEGRADO · DIIT01', { align: AlignmentType.CENTER, size: 19, color: green, bold: true, after: 250 }))
  add(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 180, after: 80 }, children: [new TextRun({ text: 'DISEÑO DE LA PROPUESTA\nDE PROYECTO DIGITAL', font: 'Arial', size: 39, bold: true, color: ink })] }))
  add(para('BioProductos DK', { align: AlignmentType.CENTER, size: 31, color: leaf, bold: true, after: 280 }))
  add(para('Evaluación Unidad 2 · Diseño centrado en evidencia, arquitectura y experiencia digital', { align: AlignmentType.CENTER, size: 20, color: gray, after: 560 }))
  add(table(['DATOS DEL EQUIPO', 'INFORMACIÓN'], [
    ['Integrantes de la dupla', '[Nombres y apellidos por confirmar]'],
    ['Carrera', '[Carrera por confirmar]'], ['Sección', '[Sección por confirmar]'],
    ['Docente', '[Nombre docente por confirmar]'], ['Sede', 'INACAP Maipú · confirmar designación oficial'],
    ['Fecha del informe', '19 de octubre de 2026'],
  ], [2800, 6000]))
  add(para('Documento de trabajo académico. La propuesta web es independiente y no representa una migración aprobada por BioProductos DK.', { align: AlignmentType.CENTER, size: 16, color: gray, italics: true, before: 350 }))
  add(pageBreak())

  // Índice
  add(heading('Índice', 1))
  add(para('El índice usa estilos de títulos de Word; si la paginación cambia, selecciona el índice y elige “Actualizar tabla completa”.', { size: 17, color: gray, italics: true }))
  add(new TableOfContents('Tabla de contenidos', { hyperlink: true, headingStyleRange: '1-3', rightTabStop: 9000, includePageNumbers: true }))
  add(pageBreak())

  // Síntesis ejecutiva
  h1('Síntesis ejecutiva')
  p('Este informe documenta la propuesta digital académica para BioProductos DK desde la evidencia disponible en el repositorio, la transcripción de terreno, el código del monorepo y el archivo Figma accesible. La iniciativa busca articular presencia institucional, divulgación de investigación, catálogo, comunicación empresarial y sostenibilidad sin intervenir los sistemas comerciales actuales de la empresa.')
  p('La solución visible se organiza en páginas editoriales independientes, encabezado y pie compartidos, catálogo y una experiencia de compra simulada. El diseño utiliza una identidad verde, superficies cálidas, tipografía Manrope en la interfaz y fotografías originales aportadas por el equipo. La propuesta comunica el origen científico y la economía circular con cautela: describe prácticas narradas por el equipo DK, pero evita adjudicar cada proceso a cada producto o presentar patentes, permisos, beneficios o resultados sin documentación.')
  p('El proyecto técnico conserva un monorepo derivado del DTC Starter oficial: Next.js 15.5.24 en `apps/storefront` y Medusa 2.21.2 en `apps/backend`, con configuración para PostgreSQL. Esta arquitectura está preparada para una plataforma integral, pero la auditoría de esta entrega no encontró endpoints de comercio personalizados implementados en los dos endpoints custom revisados; tampoco comprobó PostgreSQL levantado, Admin configurado ni integraciones de pago, despacho o documentos tributarios activas. El catálogo editorial incluye seis fichas visibles, mientras que los ocho artículos mencionados durante la entrevista son un recuento testimonial histórico (2 detergentes, 3 shampoos y 3 sales), no un inventario sincronizado. Jabón y acondicionador fueron confirmados posteriormente por el responsable del proyecto.')
  c('Alcance que debe defenderse', 'La web desarrollada es una propuesta independiente de evaluación académica. En la entrevista, las fundadoras expresaron preferencia por mantener Shopify debido a su experiencia y facilidad de uso. No hay aprobación de migración, intervención de dominios, pagos reales, stock real ni datos de clientes.')
  t(['Dimensión', 'Evidencia verificable', 'Estado resumido'], [
    ['Investigación', 'Transcripción de terreno y documentación contextual', 'Evidencia cualitativa disponible; falta validación formal con usuarios'],
    ['Diseño', 'Figma: frame Home desktop 1440 × 6337 px', 'Home visualizado; no hay evidencia de todas las páginas completas en el archivo accesible'],
    ['Frontend', '10 rutas editoriales independientes más `/demo`', 'TypeScript y build comprobados; interacción real en navegador depende de servidor local'],
    ['Comercio', 'Carrito de demostración local y catálogo editorial', 'No procesa pago, pedido o despacho'],
    ['Backend', 'Medusa 2 y PostgreSQL previstos/configurados', 'Integridad operativa por probar con servicios locales autorizados'],
  ], [2200, 3600, 4000])

  // Capítulo 1
  h1('CAPÍTULO 1 — RESUMEN DEL PROYECTO')
  h2('1.1 Empresa colaboradora')
  p('BioProductos DK es una empresa chilena presentada en las fuentes del proyecto como una iniciativa que investiga, desarrolla y comercializa productos de limpieza e higiene. En la entrevista de terreno, sus representantes explicaron que su trabajo combina desarrollo de productos, uso de materiales orgánicos seleccionados, interés en biotecnología y nanotecnología, y un enfoque de economía circular. La transcripción describe cosmética sólida y líneas de limpieza, además de prácticas de laboratorio, control de lotes y desarrollo experimental. Estas descripciones son testimonios de visita; las formulaciones, alcances regulatorios y afirmaciones comerciales requieren validación documental antes de su publicación definitiva.')
  p('La empresa llega a esta propuesta con una tienda Shopify que las fundadoras han aprendido a administrar y una presencia web que ellas consideraban perfectible. La propuesta digital se construyó como alternativa demostrativa y material de evaluación para un equipo académico, no como sustitución automática del ecosistema actual. Esta distinción importa porque una arquitectura nueva implica soporte, capacitación, costos recurrentes y autorizaciones que todavía deben evaluarse.')
  h2('1.2 Problemática identificada')
  p('La fuente primaria es la entrevista facilitada por el responsable del proyecto. Allí se mencionan errores visuales del sitio vigente, recursos de ejemplo que no representaban la marca, descripciones incompletas, fragmentos de código visibles y una necesidad de comunicar mejor la ciencia que precede a los productos. Las fundadoras priorizaron una entrada atractiva, un espacio de investigación y un catálogo al que se pueda llegar con facilidad. También solicitaron visibilizar establecimientos de venta y conversar de forma diferenciada con empresas y distribuidores.')
  p('La entrevista no contiene una auditoría cuantitativa de conversión ni una investigación de usuarios con muestra controlada. Por ello, el problema de usabilidad se formula como diagnóstico cualitativo y no como una tasa de error comprobada. La oportunidad es estructurar los contenidos y rutas para que cada público encuentre rápidamente su siguiente acción: conocer, comprar, colaborar o contactar.')
  h2('1.3 Objetivos, alcance y usuarios')
  h3('Objetivo general')
  p('Diseñar y documentar una propuesta web multipágina, accesible y técnicamente mantenible que presente la identidad, la investigación, el catálogo y las oportunidades de contacto de BioProductos DK, manteniendo comercio y datos en un entorno demostrativo hasta que exista autorización explícita para cualquier operación real.')
  h3('Objetivos específicos')
  b('Organizar la navegación en rutas con objetivos distintos: Inicio, Bio Investigación, Productos, Empresas, Nosotras, Contacto, Bio Impacto, Donaciones, Dónde comprar e Información legal.',
    'Comunicar el relato científico y circular con lenguaje claro, fuentes identificables y límites de publicación.',
    'Facilitar la exploración del catálogo y probar un flujo local de selección/cantidad/carrito, señalando que no crea órdenes ni cobros.',
    'Establecer una base Next.js + Medusa/PostgreSQL que pueda evolucionar con servicios de prueba y requerimientos aprobados.',
    'Dejar trazabilidad de evidencia, pruebas, bloqueos y decisiones futuras para que Diseño e Informática continúen el trabajo.')
  t(['Alcance incluido', 'Fuera del alcance y condición'], [
    ['Sitio editorial multipágina, componentes globales, tema claro/oscuro, catálogo demostrativo y enlaces de contacto.', 'Cambiar Shopify, operar dominios/DNS, publicar en producción o migrar clientes, pedidos o inventario.'],
    ['Carrito local de demostración con valores identificados como ficticios.', 'Cobrar dinero, crear órdenes reales, emitir boletas/facturas o solicitar despacho.'],
    ['Documentación técnica, roadmap, pruebas automatizadas locales y revisión de build/typecheck.', 'Afirmar funcionamiento completo de PostgreSQL, Medusa Admin, APIs custom o proveedores sin pruebas operativas.'],
  ], [4800, 5000])
  p('Usuarios beneficiados: compradores particulares, colaboradores científicos, representantes de empresas/distribuidores, personas interesadas en circularidad y administradores de la empresa. Son segmentos deducidos de la entrevista y del PRD; no equivalen a personas usuarias investigadas individualmente.')

  // Capítulo 2
  h1('CAPÍTULO 2 — DIAGNÓSTICO Y REQUERIMIENTOS')
  h2('2.1 Hallazgos principales')
  p('La siguiente clasificación sintetiza necesidades y restricciones descritas por las fundadoras, el contenido documental y el estado actual del código. La columna “evidencia” identifica el tipo de fuente. El impacto es un análisis de diseño, no una medición estadística.')
  t(['ID', 'Hallazgo / categoría', 'Evidencia', 'Impacto y decisión'], [
    ['H-01', 'La ciencia debe ser visible junto a los productos. Necesidad.', 'Entrevista 0:55–1:12; PRD §2.', 'Alto. Crear ruta Bio Investigación y acceso desde Home.'],
    ['H-02', 'Catálogo simple y fácil de alcanzar. Necesidad.', 'Entrevista 1:13–1:29.', 'Alto. Productos como ruta propia y CTA claro.'],
    ['H-03', 'Preferencia por conservar Shopify por capacitación/familiaridad. Restricción.', 'Entrevista 1:42–2:15.', 'Crítico. No migrar; el prototipo es independiente y sin producción.'],
    ['H-04', 'Empresas negocian condiciones de forma individual. Restricción.', 'Entrevista 6:33–7:05.', 'Alto. CTA de contacto B2B; no publicar precios privados.'],
    ['H-05', 'Quieren ubicar tiendas donde comprar. Oportunidad.', 'Entrevista 6:12–6:30.', 'Medio. Página de ubicación; locales necesitan datos y autorización.'],
    ['H-06', 'Solicitan indicadores de venta por mes, producto y cliente. Necesidad.', 'Entrevista 9:16–9:31.', 'Futuro. Definir métricas con pedidos persistentes y datos de prueba.'],
    ['H-07', 'Idea de recepción/donación de residuos requiere protocolo. Riesgo.', 'Entrevista 15:21–17:49; página Donaciones.', 'Alto. Comunicar interés sin habilitar recepción pública.'],
    ['H-08', 'Sistemas reales y credenciales no están autorizados. Restricción.', 'MASTER_CONTEXT §0; PRD §6.', 'Crítico. No intervenir tienda, dominio, pagos ni datos reales.'],
    ['H-09', 'Sitio anterior contenía recursos y descripciones por corregir. Dolor relatado.', 'Entrevista 11:02–11:53 y 13:44–14:08.', 'Medio. Dirección de arte propia, contenido revisado y pruebas.'],
  ], [800, 2600, 2600, 3800])
  h2('2.2 Necesidades de usuario')
  t(['Perfil inferido', 'Necesidad principal', 'Acción esperada', 'Base de evidencia'], [
    ['Comprador particular', 'Entender qué líneas existen y qué datos están confirmados.', 'Explorar catálogo; consultar o comprar en canal vigente.', 'Ocho referencias relatadas; venta B2C y Shopify.'],
    ['Institución/colaborador I+D', 'Comprender capacidades y trayectoria con respaldo.', 'Revisar Bio Investigación y proponer conversación.', 'Solicitudes de I+D, colaboración, proyectos y patentes.'],
    ['Empresa/distribuidor', 'Conocer vías comerciales sin exponer condiciones privadas.', 'Contactar al equipo DK.', 'Condiciones B2B conversadas empresa a empresa.'],
    ['Persona interesada en circularidad', 'Conocer materiales y límites de colaboración.', 'Leer el enfoque y consultar protocolo.', 'Donación sugerida; separación/protocolo exigido.'],
    ['Administradora DK', 'Conservar control simple desde móvil.', 'Gestionar catálogo, stock y pedidos en herramienta conocida.', 'Familiaridad con Shopify manifestada en entrevista.'],
  ], [1800, 3000, 2900, 2100])
  h2('2.3 Requerimientos funcionales')
  t(['ID', 'Requerimiento y aceptación', 'Origen / prioridad', 'Estado comprobado'], [
    ['RF-01', 'Header global navega a rutas públicas válidas y mantiene acceso móvil.', 'H-01/02 · Alta', 'Implementado; test de rutas/menu en unit tests; E2E visual pendiente.'],
    ['RF-02', 'Inicio explica ciencia, colección, impacto y enlaces de continuidad.', 'H-01/09 · Alta', 'Implementado; ruta editorial `/`.'],
    ['RF-03', 'Bio Investigación presenta contenidos de I+D y CTA de colaboración.', 'H-01 · Alta', 'Implementado como ruta independiente.'],
    ['RF-04', 'Productos ofrece categorías, búsqueda, cantidades y fichas informativas.', 'H-02 · Alta', 'Implementado como interfaz demostrativa.'],
    ['RF-05', 'Carrito puede mantener selección local y simular confirmación.', 'H-02 · Media', 'Implementado local; no persiste orden ni llama proveedor.'],
    ['RF-06', 'Empresas diferencia consulta comercial de compra B2C.', 'H-04 · Alta', 'Ruta `/empresas`; condiciones negociadas no expuestas.'],
    ['RF-07', 'Dónde comprar facilita llegar a ubicación aportada.', 'H-05 · Media', 'Ruta existe; confirmar que dirección y embed son publicables.'],
    ['RF-08', 'Donaciones explica separación y estado del programa.', 'H-07 · Alta', 'Ruta existe; sitio advierte que no hay recepción pública habilitada.'],
    ['RF-09', 'Contacto prepara canales/formulario con datos mínimos.', 'Entrevista 5:12–5:31 · Alta', 'Página y pruebas de contenido; envío real debe confirmarse.'],
    ['RF-10', 'Reportes de ventas y exportación logística desde backend.', 'Entrevista 8:45–9:31 · Futura', 'No demostrado en el alcance actual.'],
    ['RF-11', 'Integración de pagos, envío y DTE en sandbox.', 'Entrevista 8:00–8:41 · Futura', 'Sin proveedor conectado ni prueba de sandbox documentada.'],
  ], [800, 4200, 1700, 3700])
  h2('2.4 Requerimientos UX')
  t(['Código', 'Requerimiento UX', 'Criterio de aceptación propuesto'], [
    ['UX-01', 'Navegación entendible y consistente.', 'Cada enlace tiene nombre accesible y destino previsto; no hay rutas ambiguas.'],
    ['UX-02', 'Responsive real.', 'Revisar a 390, 768 y 1440 px; sin desbordamiento horizontal ni contenido truncado.'],
    ['UX-03', 'Accesible por teclado.', 'Header, carousel, filtros, formularios y modal de carrito operables con teclado y foco visible.'],
    ['UX-04', 'Movimiento ajustable.', 'Animaciones respetan `prefers-reduced-motion` y no bloquean contenido.'],
    ['UX-05', 'Retroalimentación y prevención de errores.', 'Mensajes de agregado, vacíos y validación expresan el resultado sin confundir demo con compra.'],
    ['UX-06', 'Contraste y legibilidad.', 'Verificar combinaciones con WCAG 2.2 AA; conservar alto contraste en ambos temas.'],
    ['UX-07', 'Confianza de contenido.', 'Claims científicos, comerciales, legales y regulatorios remiten a antecedente aprobado.'],
  ], [1000, 2600, 6800])
  h2('2.5 Restricciones del proyecto')
  b('Sin autorización para intervenir Shopify, dominios, DNS, hosting, inventario, clientes, redes, cuentas o pagos productivos.',
    'La empresa manifestó preferencia por Shopify; el ahorro de una alternativa no puede afirmarse sin costo total de propiedad.',
    'Precios, existencias, variantes completas, fichas técnicas, políticas legales y nombres de marcas requieren datos autorizados.',
    'Las integraciones Webpay, Mercado Pago, Blue Express y DTE requieren credenciales y ambientes de prueba de la entidad correspondiente.',
    'El entorno Mac diagnosticado originalmente no tenía PostgreSQL ni herramientas Docker verificadas; el estado debe revisarse al ejecutar localmente.',
    'La guía oficial DIIT01_U2_GUÍA.docx y un archivo independiente de rúbrica no se encontraron en `docs/encargo/` ni bajo `docs/` y `evidence/`.')
  h2('2.6 Trazabilidad')
  t(['Hallazgo', 'Necesidad', 'Requerimiento / diseño', 'Ruta y evidencia', 'Validación pendiente'], [
    ['H-01', 'Entender ciencia detrás del producto.', 'RF-03; página editorial I+D.', '/bio-investigacion; `page.tsx`.', 'Prueba de comprensión con usuarios y revisión científica DK.'],
    ['H-02', 'Encontrar productos rápido.', 'RF-02/04; CTA y filtros.', '/ y /productos; pruebas de contenido/carrito demo.', 'E2E visual en navegador local; validar catálogo vigente.'],
    ['H-03', 'No perder Shopify ya aprendido.', 'RF-05 fuera de producción; restricción de arquitectura.', 'MASTER_CONTEXT; no hay conexión a Shopify.', 'Decisión empresarial futura y evaluación de costos.'],
    ['H-04', 'Consultar condiciones empresa a empresa.', 'RF-06; CTA de contacto.', '/empresas y /contacto.', 'Probar canal de correo y revisar copy con DK.'],
    ['H-07', 'Participar sin contaminar residuos.', 'RF-08; aviso de programa no habilitado.', '/donaciones; entrevista.', 'Definir protocolo, materiales y operación con DK.'],
    ['H-09', 'Experiencia visual coherente y creíble.', 'RF-01/02; tokens, fotografías originales y responsive.', 'Figma frame Home y CSS editorial.', 'Comparar todas las páginas a 3 breakpoints.'],
  ], [900, 1900, 2500, 2300, 2800])

  // Capítulo 3
  h1('CAPÍTULO 3 — DESARROLLO DE LA PROPUESTA')
  h2('3.1 Ideación y selección')
  h3('3.1.1 Brainstorming y evidencia colaborativa')
  p('El repositorio conserva transcripción de entrevista, decisiones de alcance y una bitácora de modificaciones, pero no actas fechadas de sesiones de brainstorming ni una matriz original firmada por participantes. No se presenta una sesión retrospectiva como si hubiera ocurrido en una fecha anterior. La tabla siguiente es una sistematización analítica realizada para este informe a partir de los problemas y alternativas documentados.')
  t(['Alternativa sistematizada', 'Valor para usuario', 'Dependencias/riesgos', 'Decisión analítica'], [
    ['Sitio corporativo de una sola página', 'Publicación rápida y simple.', 'Oculta profundidad de I+D y mezcla públicos.', 'Descartada como arquitectura principal: empresa prioriza investigación y catálogo con identidades propias.'],
    ['Sitio multipágina + Shopify existente', 'Separa contenidos y conserva herramienta comercial conocida.', 'Integración visual y dependencia Shopify.', 'Alternativa de continuidad más conservadora; necesita autorización/alcance comercial.'],
    ['Sitio multipágina + tienda propia Medusa', 'Control de experiencia y plataforma extensible.', 'Mayor carga técnica, operación, formación y soporte.', 'Construida como propuesta académica independiente; no equivale a decisión de migración.'],
    ['Catálogo informativo sin checkout real', 'Permite revisar colección con menor riesgo.', 'No prueba interfaz de compra completa.', 'Complementada con simulación local, sin órdenes ni pagos.'],
    ['Programa público de donación de residuos', 'Invita a participar en circularidad.', 'Requiere protocolo, separación, logística y aprobación.', 'No activar; comunicar interés y condición de coordinación.'],
  ], [2300, 2100, 2600, 3400])
  h3('3.1.2 Clasificación de ideas')
  p('Las ideas se organizan en cinco ámbitos: (1) arquitectura informativa, con rutas de inicio, I+D, productos, empresa y contacto; (2) confianza científica, con contenidos verificables y límites explícitos; (3) comercio, con catálogo y estados de compra demostrativos; (4) circularidad, con educación y colaboración sujeta a protocolos; y (5) operación, con administración y analítica como evoluciones futuras.')
  h3('3.1.3 Matriz impacto–factibilidad')
  p('Escala ordinal propuesta: 1 = bajo y 5 = alto. El impacto estima valor de orientación/negocio según la entrevista; factibilidad estima el esfuerzo relativo dentro de una entrega académica. No son resultados de evaluación de usuarios, cotizaciones ni mediciones objetivas.')
  t(['Iniciativa', 'Impacto (1–5)', 'Factibilidad (1–5)', 'Justificación'], [
    ['Navegación multipágina', '5', '4', 'Responde a prioridad explícita y aprovecha rutas editoriales.'],
    ['Página de Bio Investigación', '5', '3', 'Diferenciador estratégico; contenido científico requiere validación.'],
    ['Catálogo y compra demo', '5', '3', 'Permite mostrar recorrido sin pagos ni backend comercial probado.'],
    ['Panel de métricas/administración', '4', '2', 'Valor alto para el equipo; exige datos persistentes, permisos y definición de métricas.'],
    ['Programa de donación activo', '3', '1', 'La entrevista advierte necesidad de separación/protocolo y no acredita operación pública.'],
    ['Integraciones de pagos/logística/DTE', '5', '1', 'Críticas en producción, pero requieren contrato, credenciales, sandbox y conformidad regulatoria.'],
  ], [2900, 1300, 1500, 4700])
  await fig(arch, 600, 'Figura 1. Arquitectura conceptual verificada y dependencias pendientes. Fuente: análisis del código.', 'Diagrama de arquitectura del storefront, backend, base de datos e integraciones futuras')
  h3('3.1.4 Solución seleccionada')
  p('La solución combina un sitio multipágina con una propuesta visual cálida, módulos independientes y un comercio de demostración. Se eligió porque refleja el énfasis que las fundadoras asignaron a investigación, catálogo y comunicación, y porque permite explorar una arquitectura propia. Se conserva el sistema real actual fuera del alcance. El valor diferencial defendible es conectar el relato científico y la oferta comercial en una navegación clara y ampliable, no afirmar superioridad de ventas, sostenibilidad cuantificada ni menor costo.')
  h2('3.2 Concepto estratégico')
  h3('3.2.1 Concepto creativo')
  p('La interfaz interpreta la idea documentada de que detrás de los productos existe trabajo de investigación. La composición cruza origen material, investigación y uso cotidiano. El Home funciona como índice narrativo; las rutas de Investigación, Productos, Empresas, Nosotras y Contacto desarrollan necesidades distintas sin convertir el sitio en una landing única.')
  h3('3.2.2 Personalidad de interfaz y tono')
  p('La identidad se expresa mediante verdes profundos, fondos marfil, verdes suaves, fotografías originales y una tipografía sans serif contemporánea. Las animaciones son breves o continuas solo donde aportan navegación; el movimiento reducido forma parte de la implementación y las pruebas unitarias. El copy procura evitar absolutos científicos y distingue mensajes institucionales de datos por confirmar. Ejemplos observables: “Hay ciencia detrás de cada producto”, “Conoce Bio Investigación” y la advertencia de que la recepción pública de residuos no está habilitada.')
  h3('3.2.3 Propuesta de valor')
  c('Propuesta de valor analítica', 'Ayudar a distintos públicos a comprender qué hace BioProductos DK, explorar su investigación y catálogo, y encontrar una vía apropiada de contacto; todo dentro de una experiencia digital coherente que conserva la separación entre información pública, negociación B2B y transacción real.')
  h2('3.3 Sistema visual')
  h3('3.3.1 Moodboard y referencias')
  p('El único archivo visual de Figma consultable contiene un frame largo de Home con productos, fundadoras, secciones de investigación, ubicación y footer. Se incluye una captura de ese frame como evidencia visual. La conversación pidió una calidad editorial inspirada en Apple, pero no hay evidencia de una copia literal de componentes o sistema de Apple; se registra como referente de claridad/calidad percibida, no como fuente de identidad.')
  await fig(path.join(screenshots, 'figma-home-hero.png'), 540, 'Figura 2. Home en Figma: navegación y hero de entrada. Captura del archivo Figma accesible.', 'Captura de la parte superior del Home en Figma')
  h3('3.3.2 Paleta extraída del código')
  t(['Token', 'HEX', 'Uso observado/propuesto'], [
    ['Forest / verde profundo', '#1B563C', 'Acciones, fondos de alto contraste y marca principal.'],
    ['Leaf / verde medio', '#2F7146', 'Acentos, enlaces y detalles interactivos.'],
    ['Ink / tinta verde', '#18372A', 'Titulares y texto de marca.'],
    ['Paper / marfil', '#FBF8F0', 'Fondo cálido principal.'],
    ['Sage / salvia', '#E3EED2', 'Superficies suaves y alternancia visual.'],
    ['Lime / lima suave', '#D6E9A3', 'Indicadores y acentos de interacción.'],
  ], [2500, 1600, 6300])
  p('Los valores provienen de `editorial.css`; esta extracción no sustituye una auditoría de contraste por estado ni garantiza que toda combinación alcance WCAG AA. Los colores del modo oscuro y estados por componente deben validarse con mediciones automatizadas y revisión manual.')
  h3('3.3.3 Tipografía y jerarquía')
  p('El CSS editorial declara “Manrope Variable” y la aplicación importa `@fontsource-variable/manrope`, por lo que la familia se sirve desde el proyecto. La jerarquía utiliza tamaños responsivos, pesos contrastados y titulares de escala editorial. La fuente secundaria exacta no se fija como sistema global en los archivos revisados; no debe documentarse como una decisión formal sin identificar su aplicación concreta. Para el Word se usa Arial por compatibilidad de edición en Microsoft Word y Google Docs.')
  h3('3.3.4 Justificación visual y accesibilidad')
  p('El verde y el marfil conectan la identidad observada con la lectura prolongada; alternar fondos reduce monotonía y diferencia el ritmo entre catálogo, ciencia, colaboración e identidad. El diseño incluye skip link, navegación móvil, foco/teclado y preferencia de movimiento reducido según componentes y pruebas existentes. La conformidad completa con WCAG no está certificada: no hay informe de auditoría axe del navegador para todas las rutas ni revisión con tecnologías de asistencia.')
  await fig(path.join(screenshots, 'figma-home-identidad-productos.png'), 540, 'Figura 3. Sección editorial de pilares y colección en el Home de Figma.', 'Captura de la sección de identidad y catálogo de Home Figma')

  // Capítulo 4
  h1('CAPÍTULO 4 — ARQUITECTURA Y EXPERIENCIA DE USUARIO')
  h2('4.1 Funcionalidades principales y estado')
  t(['Funcionalidad', 'Dónde', 'Estado técnico auditado', 'Límite de interpretación'], [
    ['Navegación editorial', 'Header/footer, menú móvil.', 'Implementada; páginas bajo grupo `(editorial)`.', 'Pruebas de código no equivalen a prueba E2E en navegador.'],
    ['Carrusel del Home y cinta de mensajes', 'Home, hero y barra inferior de header.', 'Implementada; pruebas unitarias cubren movimiento/gestos.', 'La animación visual completa debe validarse en navegador.'],
    ['Modo claro/oscuro', 'Control flotante y estilos globales.', 'Implementado según bitácora y componentes.', 'La legibilidad total por sección requiere auditoría.'],
    ['Filtros/catálogo', '/productos.', 'Implementados como catálogo editorial local.', 'Fichas no están sincronizadas con inventario comercial.'],
    ['Carrito y checkout demo', 'Página Productos y componentes de carrito.', 'Interacción local con datos ficticios.', 'Sin pedido, pago, despacho, DTE o sincronización Shopify/Medusa.'],
    ['Contacto', '/contacto.', 'Página independiente; formulario prepara correo según pruebas.', 'No se confirma persistencia, ticket ni envío desde backend.'],
    ['Mapa/localización', '/donde-comprar.', 'Ruta con ubicación/enlace suministrado por responsable.', 'Dirección y embed requieren autorización de publicación.'],
    ['Bio Investigación / empresas / nosotras / impacto / donaciones', 'Rutas independientes.', 'Contenido editorial implementado.', 'No se han validado todos los datos con Bio DK.'],
    ['API Medusa / administración', '/api y Admin starter.', 'Infraestructura starter; custom endpoints revisados responden 200 vacío.', 'No equivale a módulos de negocio, RBAC o flujos DK operativos.'],
    ['PostgreSQL', 'Configuración backend.', 'Entorno previsto y guardas para base demo local.', 'Migraciones, seed y persistencia deben probarse al iniciar Postgres.'],
  ], [2200, 1500, 3100, 3600])
  h2('4.2 Arquitectura de información')
  await fig(sitemap, 600, 'Figura 4. Mapa compacto de rutas principales. Las rutas complementarias y comerciales se detallan en texto.', 'Mapa de navegación con las rutas editoriales principales')
  t(['Nivel', 'Rutas'], [
    ['Principal', 'Inicio `/`; Bio Investigación `/bio-investigacion`; Productos `/productos`; Empresas `/empresas`; Nosotras `/nosotras`; Contacto `/contacto`.'],
    ['Complementario', 'Bio Impacto `/bio-impacto`; Donaciones `/donaciones`; Dónde comprar `/donde-comprar`; Información legal `/informacion-legal`.'],
    ['Vista de demostración', '`/demo` existe como página independiente y no se considera ruta comercial principal.'],
    ['Commerce Medusa', '`/[countryCode]/store`, categorías, colecciones, producto, carrito, checkout, cuenta y pedido con segmentos dinámicos. Dependen de región/datos/backend; no se han considerado “pantallas institucionales validadas”.'],
  ], [2100, 7900])
  h2('4.3 User flows')
  await fig(flow, 600, 'Figura 5. Flujo editorial de descubrimiento y consulta. Análisis basado en rutas; debe validarse con usuarios.', 'Flujo de descubrimiento, exploración y contacto')
  p('Flujo de descubrimiento: la persona entra al Home, identifica si busca ciencia, catálogo, empresa o información humana y elige la ruta correspondiente. Los errores principales posibles son enlaces rotos, expectativas de compra incompatibles con el modo de demostración y falta de información verificada. Criterio: mantener CTA descriptivos, estado de contenido claro y una alternativa de contacto.')
  p('Flujo de exploración de productos: Home o header → Productos → selección de categoría/búsqueda → revisar ficha y variante disponible → ajustar cantidad → agregar al carrito local → abrir resumen → confirmar prueba. La confirmación no crea pedido ni cobra. Para una operación comercial real se requiere API y contrato de checkout, reglas de inventario, precios y despacho autoritativos.')
  await fig(cartflow, 600, 'Figura 6. Secuencia representada por el carrito local; no es un flujo de compra real.', 'Flujo de compra de demostración local')
  p('Flujo de consulta científica/comercial: Home o página especializada → CTA de investigación/empresas → Contacto o mailto → persona completa datos mínimos → correo preparado para revisión y envío. La implementación comprobada prepara un mensaje, pero no demuestra recepción, almacenamiento ni seguimiento de solicitudes.')
  h2('4.4 Oportunidades de mejora')
  t(['Fricción', 'Evidencia', 'Solución UX', 'Beneficio / estado'], [
    ['Ciencia poco visible junto a los productos.', 'Entrevista; prioridad I+D.', 'Enlace principal y ruta propia Bio Investigación.', 'Exploración más intencional; lista para prueba de comprensión.'],
    ['Dificultad para hallar catálogo.', 'Solicitud de acceso directo a los productos.', 'CTA y navegación Productos separados de contenido institucional.', 'Reduce ambigüedad; la conversión no está medida.'],
    ['Condiciones B2B diferentes.', 'Testimonio de venta empresa a empresa.', 'CTA de contacto sin precios mayoristas públicos.', 'Separa segmentos; falta validación comercial.'],
    ['Donación puede crear expectativas de recepción.', 'Entrevista exige protocolo y separación.', 'Aviso claro de que no existe programa público habilitado.', 'Reduce riesgo de residuos no aceptados; contenido revisable.'],
    ['Políticas legales no redactadas/aprobadas.', 'Entrevista y estado de página legal.', 'Señalar “en preparación” y bloquear claims de vigencia.', 'Evita falsa confianza; requiere revisión competente.'],
  ], [2200, 2100, 3000, 2700])
  h2('4.5 Accesibilidad')
  p('La auditoría estática identifica recursos favorables: skip link, labels y nombres accesibles en varios controles, navegación mobile operable, estilos de movimiento reducido y pruebas unitarias para teclado/animaciones. El test `npm test` ejecutó 47 pruebas y no falló; éstas son pruebas de comportamiento de funciones y contenido, no una certificación de accesibilidad del sitio completo. No se ejecutó en esta sesión un barrido axe de todas las páginas ni una prueba manual con lector de pantalla.')
  t(['Revisión WCAG 2.2', 'Evidencia actual', 'Pendiente de validar'], [
    ['Contraste', 'Tokens de color e implementación de tema claro/oscuro.', 'Medir texto normal, estados hover/focus/active y controles en todos los fondos.'],
    ['Teclado y foco', 'Pruebas unitarias del header, ribbon, carousel y catálogo.', 'E2E navegador, orden de tabulación, foco modal y regreso al disparador.'],
    ['Alternativas textuales', 'Fotos con alt en código; logo con nombre de marca.', 'Auditar cada imagen, decorativos vacíos, mapas e iconos.'],
    ['Responsive/reflow', 'CSS de breakpoint y breakpoints de diseño conocidos.', 'Revisar todas las páginas 390/768/1440 y zoom 200–400 %.'],
    ['Formulario/error', 'Contacto prepara correo; forms del ecommerce starter existen.', 'Errores comprensibles y asociados, validación teclado/lector, feedback y privacidad.'],
    ['Movimiento', 'Respeto a `prefers-reduced-motion` en componentes animados.', 'Comprobar toda animación y carrusel en navegador/OS.'],
  ], [2100, 3600, 4300])
  p('Referencia normativa: WCAG 2.2 fue publicada como W3C Recommendation el 5 de octubre de 2023. Este documento utiliza sus principios como marco de revisión; no declara conformidad de la aplicación.')

  // Capítulo 5
  h1('CAPÍTULO 5 — DESARROLLO VISUAL')
  h2('5.1 Sketches y 5.2 wireframes')
  p('No se encontraron sketches ni wireframes históricos verificables dentro de la carpeta de evidencias. El Home de Figma existente es una captura/diseño de alta fidelidad retrospectivo, no prueba de una etapa anterior de baja fidelidad. Por ello, los esquemas de arquitectura, flujos y matrices de este documento son recursos analíticos creados para la transferencia; no se presentan como artefactos originales de ideación.')
  h2('5.3 Mockups: evidencia Figma')
  p('El archivo accesible se identifica en `docs/figma-master-ux-ui.md` como “BIOPRODUCTOS DK — MASTER UX UI”, con URL de diseño cuyo file key es `N0Ro5ZM38uwZpUIti7GUAC`. La inspección de metadatos encontró una página de Figma denominada “Page 1” y un frame principal de Home: 1440 × 6337 px. El frame contiene header, redes sociales, navegación, carrito, cinta de mensajes, carrusel, franja de donación, ubicación, ADN, productos, Bio Investigación, Empresas, Bio Impacto, Nosotras y footer. No se encontraron otros frames de páginas interiores en ese archivo.')
  await fig(path.join(screenshots, 'figma-home-ciencia-impacto.png'), 540, 'Figura 7. Home en Figma: colaboración empresarial y bloque Bio Impacto.', 'Captura del Home con empresa y Bio Impacto')
  await fig(path.join(screenshots, 'figma-home-personas-footer.png'), 540, 'Figura 8. Home en Figma: bloque Nosotras y footer.', 'Captura del Home con bloque humano y footer')
  h3('Lectura crítica del mockup')
  p('El Home presenta alternancia entre superficies cálidas y verdes, secciones de distinta densidad, fotografía original de productos y fundadoras, enlaces a páginas independientes y cierre legal con estado “en preparación”. La captura es legible para revisar orden general, pero algunas imágenes de las líneas Jabones y Acondicionador aparecen como “Imagen de referencia” en el frame; antes de comunicación comercial definitiva se deben sustituir por recursos autorizados o mantener como composición claramente conceptual. La captura no permite comprobar prototipo, navegación conectada, breakpoints tablet/móvil, todos los estados ni coincidencia actual con la versión del código.')
  h2('5.4 Coherencia entre diseño e implementación')
  t(['Elemento', 'Comparación posible', 'Conclusión prudente'], [
    ['Rutas y navegación', 'Código muestra 10 páginas editoriales; metadata Figma únicamente un frame Home.', 'No se puede declarar paridad Figma/código de interiores.'],
    ['Identidad visual', 'Paleta y Manrope se extraen del CSS; screenshot muestra verde y marfil.', 'Coherencia general observada; revisar colores por estado/tema.'],
    ['Productos', 'Seis fichas en `productCatalog`; cuatro imágenes originales y dos familias sin foto asociada.', 'Colección visible; datos y medios de jabón/acondicionador pendientes de aprobación.'],
    ['Responsividad', 'CSS responde a tamaños; documento de Figma evidencia solo Desktop.', 'Mobile/tablet existen como desarrollo de código, pero no se verifican desde este frame Figma.'],
    ['Interacciones', 'Tests unitarios y código permiten interacciones.', 'Figma estático/metadata no prueba conexiones de prototipo ni experiencia de navegador.'],
  ], [1700, 4500, 3800])

  // Capítulo 6
  h1('CAPÍTULO 6 — VALIDACIÓN DE LA PROPUESTA')
  h2('6.1 Objetivo')
  p('La siguiente validación debe comprobar si las personas comprenden la propuesta, encuentran la ruta correcta, identifican los límites del catálogo y pueden completar tareas de contacto sin asumir que existe una transacción real. Además, debe revisar legibilidad responsive, navegación con teclado y claridad de la información científica.')
  h2('6.2 Instrumento propuesto; no aplicado')
  c('Estado de evidencia', 'No se encontró en el repositorio un protocolo de test de usuario formal aplicado, una muestra registrada, resultados de encuesta ni observaciones con fecha. El siguiente instrumento queda preparado como propuesta futura. No se presenta como una sesión ya realizada.')
  t(['Tarea', 'Instrucción neutral', 'Éxito observable'], [
    ['Descubrir ciencia', '“Quieres saber de dónde nace el trabajo científico de DK. Muéstrame dónde entrarías.”', 'Llega a Bio Investigación y explica con sus palabras qué encontrará.'],
    ['Explorar catálogo', '“Buscas un producto para tu rutina; revisa las opciones disponibles.”', 'Encuentra Productos, identifica categoría y reconoce campos no confirmados.'],
    ['Añadir a la selección', '“Agrega una unidad de una opción que te interese y revisa la selección.”', 'Carrito local refleja producto/cantidad y persona comprende que no hubo compra.'],
    ['Consulta B2B', '“Representas un comercio y deseas conversar condiciones de distribución.”', 'Usa Empresas/Contacto sin interpretar que existe un precio mayorista público.'],
    ['Donación responsable', '“Tienes residuos orgánicos y quieres saber si los puedes entregar.”', 'Encuentra estado de recepción y comprende necesidad de protocolo/confirmación.'],
  ], [1900, 4300, 3800])
  p('Formulario posterior sugerido (escala 1–5): facilidad para encontrar información; claridad del catálogo; comprensión de la investigación; confianza en las advertencias; comodidad para contactar. Preguntas abiertas: ¿qué esperabas que ocurriera al agregar al carrito?, ¿qué información te faltó?, ¿qué mensaje resultó confuso? Registrar consentimiento, tipo de dispositivo, observaciones y tareas abandonadas, sin solicitar datos personales no necesarios.')
  h2('6.3 Resultados obtenidos')
  p('No hay resultados cuantitativos o cualitativos formales que puedan atribuirse a pruebas con usuarios en las fuentes inspeccionadas. En consecuencia, satisfacción, comprensión, tasa de éxito, tiempo por tarea y mejora de conversión quedan como pendientes. La entrevista de terreno es evidencia cualitativa de requerimientos y no reemplaza validación del prototipo con usuarios.')
  h2('6.4 Ajustes implementados y sugeridos')
  t(['Implementado según código/ROADMAP', 'Recomendación pendiente'], [
    ['Separación de rutas por investigación, catálogo, empresas, nosotras, impacto, donaciones y contacto.', 'Probar arquitectura y etiquetas con participantes representativos de cada segmento.'],
    ['Carrito local y avisos que identifican valores ficticios/sin pedido real.', 'Revisar comprensión en tarea y decidir si el texto de simulación es suficientemente visible.'],
    ['Estados de tema claro/oscuro, foco y movimiento reducido en componentes.', 'Auditar todas las páginas en dispositivos, contraste automatizado y tecnología de asistencia.'],
    ['Aviso de recepción de residuos aún no habilitada.', 'Definir protocolo, aceptación, almacenamiento, retiro, responsables y canal antes de activar el programa.'],
    ['Contenido sobre marcas/patentes mantiene reservas de verificación.', 'Recopilar títulos, estados, alcances y autorizaciones documentales.'],
  ], [4900, 5100])
  h2('6.5 Factibilidad técnica')
  p('El frontend compila y su TypeScript pasa en esta sesión. `npm test` reporta 47 pruebas unitarias satisfactorias. El lint del storefront completó sin errores y dejó 10 advertencias del starter (dependencias de hooks y argumentos no usados). Estos resultados demuestran calidad estática/automatizada parcial; no demuestran E2E, acceso a PostgreSQL, configuración completa de Medusa, permisos de usuario ni integración comercial. La arquitectura Next.js + Medusa es técnicamente plausible para una futura prueba, pero la factibilidad operativa exige definir roles, contenido, datos, soporte, costos y formación. La preferencia Shopify es un condicionante de negocio vigente, no un detalle técnico.')
  p('La sesión anterior registró build de producción completado con prerender de las rutas editoriales. En esta sesión se volvió a confirmar `npm run build --workspace=@dtc/storefront` con código 0; `npm run typecheck` y `npm test` también finalizaron correctamente. La ejecución E2E a 127.0.0.1:8000 sigue históricamente bloqueada por el entorno en algunos ensayos (`listen EPERM`); no se declara comprobación visual de navegador. La dirección de loopback no respondió desde este contexto de Codex al verificar exportación, lo que es limitación del entorno, no evidencia de indisponibilidad del equipo anfitrión.')

  // Capítulo 7
  h1('CAPÍTULO 7 — CONCLUSIONES')
  h2('7.1 Principales aprendizajes')
  p('La entrevista permitió traducir solicitudes de distintas áreas en prioridades de navegación y diferenciar contenidos científicos, venta al detalle y conversación B2B. La revisión de documentación enseñó a separar testimonio de evidencia oficial y a convertir incertidumbres en estados visibles, en vez de rellenarlas con claims. El desarrollo muestra que un prototipo puede tener interacciones convincentes y aun así no ser un canal transaccional habilitado.')
  h2('7.2 Aportes de la propuesta')
  b('Organiza el sitio como plataforma multipágina y da una puerta de entrada a investigación, productos, empresa, personas, impacto y contacto.',
    'Construye una expresión visual basada en recursos originales aportados, verde DK, superficies marfil y tipografía autoalojada.',
    'Hace explícitos límites de compra demo, recepción de residuos y documentos legales pendientes.',
    'Conserva una base técnica extensible y artefactos de pruebas/documentación para equipos posteriores.',
    'Proporciona un primer Home en Figma verificable con un frame desktop completo de 1440 × 6337 px.')
  h2('7.3 Mejoras futuras priorizadas')
  await fig(roadmap, 600, 'Figura 9. Continuidad recomendada por dependencias y autorizaciones.', 'Roadmap con las etapas futuras propuestas')
  t(['Prioridad', 'Trabajo', 'Dependencias / criterio de cierre'], [
    ['P0 · evidencia', 'Confirmar guía INACAP, rúbrica oficial, integrantes, datos legales, fotos y claims.', 'Documentos institucionales y aprobación de la empresa/equipo.'],
    ['P1 · diseño', 'Completar Figma por ruta con desktop/tablet/móvil y conexiones de prototipo.', 'Capturas del navegador, variantes, estados y revisión de la dupla.'],
    ['P2 · validación', 'Aplicar test con usuarios y accesibilidad.', 'Consentimiento, protocolo neutral, tareas y datos anonimizados.'],
    ['P3 · operación demo', 'Probar Postgres/Medusa Admin, seed, catálogo, pedidos sintéticos y permisos.', 'Entorno aislado, migraciones idempotentes y pruebas integrales.'],
    ['P4 · decisión comercial', 'Comparar Shopify y alternativa por costo total, capacitación, soporte y riesgo.', 'Decisión explícita de DK; nunca migración automática.'],
    ['P5 · proveedores', 'Sandbox de pago, despacho, correo y DTE.', 'Credenciales autorizadas, contratos, documentación y prueba de extremo a extremo.'],
  ], [1600, 3800, 4600])
  h2('7.4 Reflexión final')
  p('La propuesta tiene una base visual y técnica relevante para explicar el valor digital de BioProductos DK, pero la calidad de la defensa depende de mostrar con honestidad qué se observó, qué se implementó y qué sigue abierto. Su continuidad debe empezar por validar el contenido con la empresa y completar la evidencia académica; luego, probar el prototipo con usuarios y verificar cada servicio local antes de considerar una experiencia de comercio funcional. El resultado no concede permiso de migración ni sustituye la operación actual de Shopify.')

  // Referencias
  h1('REFERENCIAS')
  const refs = [
    'BioProductos DK. (s. f.). Sitio institucional, sección Bio Impacto. https://bioproductosdk.com/bio-impacto/ (fuente pública consultada para contacto institucional; verificar vigencia antes de publicación).',
    'BioProductos DK. (s. f.). Entrevista y recorrido de terreno transcritos y facilitados por el equipo del proyecto. `docs/ENTREVISTA_TERRENO_BIO_DK.md`. Fuente primaria cualitativa; la transcripción automática contiene posibles errores.',
    'Equipo del proyecto BioProductos DK. (2026). Contexto maestro del proyecto. `docs/MASTER_CONTEXT.md`.',
    'Equipo del proyecto BioProductos DK. (2026). Requisitos del producto digital (PRD). `docs/PRD.md`.',
    'Equipo del proyecto BioProductos DK. (2026). Roadmap y bitácora de implementación. `docs/ROADMAP.md`.',
    'Equipo del proyecto BioProductos DK. (2026). Arquitectura objetivo, decisiones y datos de contenido. `docs/ARQUITECTURA.md`; `docs/DECISIONES_HOME.md`; `docs/DECISIONES_F0_F1.md`; `docs/DATOS_Y_CONTENIDO.md`.',
    'BioProductos DK. (2026). MASTER UX UI [archivo Figma]. https://www.figma.com/design/N0Ro5ZM38uwZpUIti7GUAC (inspección de metadata y captura del frame Home, 19 de octubre de 2026).',
    'Next.js. (2026). App Router: Layouts and Pages. https://nextjs.org/docs/app/getting-started/layouts-and-pages',
    'Medusa. (s. f.). Medusa architecture. https://docs.medusajs.com/learn/introduction/architecture',
    'World Wide Web Consortium (W3C). (2023). Web Content Accessibility Guidelines (WCAG) 2.2. W3C Recommendation. https://www.w3.org/TR/WCAG22/',
    'INACAP. (s. f.). DIIT01 Unidad 2: guía y rúbrica oficial. No disponible en los archivos revisados; el control de criterios usa la tabla de 15 criterios y puntajes transcrita en la instrucción del responsable.',
  ]
  refs.forEach((x, i) => add(new Paragraph({ indent: { left: 340, hanging: 340 }, spacing: { after: 110, line: 270 }, children: [new TextRun({ text: x, font: 'Arial', size: 18, color: '27352D' })] })))

  // Anexos
  h1('ANEXOS — DOCUMENTACIÓN TÉCNICA Y EVIDENCIAS')
  h2('ANEXO A — Transferencia para Informática')
  h3('A.1 Arquitectura y stack confirmados')
  t(['Capa', 'Implementación observada', 'Notas de continuidad'], [
    ['Monorepo', 'npm workspaces; `apps/storefront`, `apps/backend`.', 'No recrear ni iniciar scaffolding nuevo.'],
    ['Frontend', 'Next.js 15.5.24, React 19.0.5, TypeScript, App Router.', '`npm run dev:storefront`; puerto 8000/loopback según package.'],
    ['Estilo', 'CSS editorial modular + Tailwind starter; Manrope Variable.', 'Paleta editorial en `(editorial)/editorial.css`.'],
    ['Comercio backend', 'Medusa 2.21.2, Admin Starter, API framework.', 'No afirmar dominio DK propio listo: custom API revisada responde sin datos.'],
    ['Base de datos', 'PostgreSQL previsto; `DATABASE_URL` validada localmente.', 'No se confirma que Postgres estuviera activo ni migrado en esta revisión.'],
    ['Pruebas', 'Node test runner, Playwright specs, axe como dependencia.', '47 tests unitarios pasan; E2E necesita servidor accesible y corrida registrada.'],
  ], [1900, 3900, 4200])
  await fig(arch, 600, 'Figura A1. Responsabilidad y dependencias del monorepo.', 'Arquitectura técnica del monorepo BioProductos DK')
  h3('A.2 Frontend y rutas')
  p('Grupo de páginas editoriales: `apps/storefront/src/app/(editorial)/`. Layout compartido: `(editorial)/layout.tsx`; CSS global: `(editorial)/editorial.css`; módulos de presentación: `apps/storefront/src/modules/dk/editorial/`; contenido: `apps/storefront/src/content/`; fotografías originales y derivados: `apps/storefront/public/images/`. Las rutas editoriales son `/`, `/bio-investigacion`, `/productos`, `/empresas`, `/nosotras`, `/contacto`, `/bio-impacto`, `/donaciones`, `/donde-comprar` e `/informacion-legal`. `/demo` es una ruta adicional de vista independiente.')
  h3('A.3 Backend, endpoints y persistencia')
  p('El backend usa la estructura oficial Medusa con `medusa-config.ts`, módulos y workflows del starter. Durante esta auditoría, los endpoints `apps/backend/src/api/store/custom/route.ts` y `apps/backend/src/api/admin/custom/route.ts` fueron revisados: ambos responden 200 sin cuerpo funcional de negocio. Esto no implica que el Store API/Admin nativos estén ausentes; significa que no se comprobó una extensión custom DK en esos endpoints. Antes de desarrollar persistencia, inspeccionar módulos existentes, ejecutar PostgreSQL de demo, migraciones y seed de modo seguro, y probar contratos con datos sintéticos.')
  h3('A.4 Datos, transacciones e integraciones')
  p('La página de Productos usa `productCatalog` en frontend, seis fichas editoriales y un carrito local de demostración. Las pruebas indican que el carrito rechaza entradas inválidas y limita cantidades. El frontend puede resolver algunos datos de carrito Medusa según contexto, pero la función visible de compra descrita en la bitácora es local y explícitamente ficticia. No se halló evidencia de API de Webpay, Mercado Pago, Blue Express, DTE/SII, correo transaccional ni Shopify integrada a la nueva experiencia.')
  h3('A.5 Seguridad y privacidad')
  b('El backend exige `DK_DEMO_MODE=true`, limita DATABASE_URL a loopback y a `bioproductos_dk_demo`/rol `dk_demo`, valida secretos JWT/cookie mínimos y restringe CORS a puertos locales declarados.',
    'Next.js añade cabeceras como `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, `X-Robots-Tag` y Content-Security-Policy.',
    'Estas guardas reducen riesgo en el entorno de candidatura, pero no reemplazan auditoría de amenazas, revisión CSP de captura Figma, seguridad de sesión, RBAC, análisis de dependencias ni hardening de producción.',
    'No incluir secretos, RUT, direcciones de clientes ni datos reales en tests, exportaciones, logs o documentación.')
  h3('A.6 Ejecución local reproducible')
  b('Requisito de Node: `>=22.22.0` según package. Gestor: npm 11.13.0 registrado en `docs/DIAGNOSTICO_MAC.md`.',
    'Instalar dependencias desde raíz: `npm install` (solo si lockfile coincide y existe autorización del equipo).',
    'Frontend: `npm run dev:storefront`; revisar `http://127.0.0.1:8000/`.',
    'Calidad: `npm test`; `npm run typecheck`; `npm run lint --workspace=@dtc/storefront`; `npm run build --workspace=@dtc/storefront`.',
    'Backend requiere `.env` local seguro, PostgreSQL demo local autenticado y configuración/CORS apropiada. Usar comandos `npm run dev:backend`, `npm run db:migrate` y `npm run db:seed` solo tras revisar las guardas y validar destino/backup. No cargar datos reales.')
  h3('A.7 Criterios de aceptación')
  t(['Área', 'Aceptar solo cuando…'], [
    ['Rutas', 'Los enlaces públicos llevan a una ruta existente y el menú es usable con mouse, teclado y mobile.'],
    ['Contenido', 'Cada claim científico, comercial, institucional y legal tiene fuente y aprobación correspondiente.'],
    ['Catálogo', 'Variantes, atributos, fotos, disponibilidad y precio se cotejan con fuente autorizada; demo y real no se mezclan.'],
    ['API/DB', 'Migraciones repetibles, fixtures idempotentes, guardas destino, permisos y transacciones probados con datos sintéticos.'],
    ['Compra', 'Si se autoriza producción: pedido autoritativo del servidor, pagos sandbox completos, idempotencia y reversas probadas.'],
    ['Accesibilidad', 'Prueba automatizada y manual de teclado, contraste, mensajes, imágenes y responsive con evidencia conservada.'],
    ['Transferencia', 'Se documentan comandos, credenciales fuera del repo, monitorización, backups y responsable de soporte.'],
  ], [1900, 8100])
  h3('A.8 Riesgos y decisiones que requieren autorización DK')
  t(['Riesgo', 'Mitigación/decisión'], [
    ['Confusión entre demo y canal de venta.', 'Mantener rótulos sin compra real; antes de publicar, decisión de DK y pruebas end-to-end.'],
    ['Información científica o de patente inexacta/confidencial.', 'Aprobación técnica/documental; limitar detalle y separar divulgación de secreto industrial.'],
    ['Datos de tienda o local incorrectos.', 'Confirmar dirección, disponibilidad, logos y permiso de publicación.'],
    ['Substitución de Shopify con costo/operación desconocidos.', 'Comparar costo total, soporte, capacitación, riesgos y beneficios; decisión escrita de la empresa.'],
    ['Recepción de residuos causa riesgo sanitario/logístico.', 'No habilitar hasta aprobar protocolo, residuos, conservación, retiro y responsables.'],
    ['Documentos legales/pagos/DTE sin autorización.', 'Revisión profesional y proveedor autorizado; no usar documentos ficticios como válidos.'],
  ], [3200, 6800])
  h2('ANEXO B — Evidencias de diseño')
  b('Captura completa original del Home Figma: `capturas/figma-home-completa.png` (1446 × 6429 px; metadata del frame indica 1440 × 6337 px).',
    'Recortes legibles para portada visual y anexos: hero, identidad/productos, ciencia/impacto y personas/footer.',
    'Diagramas de navegación, flujo, arquitectura y roadmap generados para este informe; cada uno incluye fuente y naturaleza analítica.',
    'Logotipo circular usado en portada: recurso ubicado en `apps/storefront/public/images/brand/logo-dk-circular-original.png`; incorporación documental, no alteración del original.')
  h2('ANEXO C — Evidencias de investigación')
  p('Evidencia disponible: transcripción entregada para la entrevista y recorrido de laboratorio, archivo contextual `docs/ENTREVISTA_TERRENO_BIO_DK.md`, PRD, contexto maestro, decisiones de diseño y bitácora ROADMAP. No se encontraron consentimientos de investigación, grabación original de audio dentro del repositorio, registro de participantes, cuestionarios o resultados de una prueba de usabilidad. La transcripción se considera relato cualitativo y no sustituto de documentos oficiales de la empresa.')
  h2('ANEXO D — Instrumentos de validación')
  p('Se incluyen en el capítulo 6 seis tareas de observación y preguntas posteriores. Estado: “preparado para aplicar”; no aplicado. Recomendación: realizar sesiones moderadas con consentimiento, tareas neutrales, al menos un dispositivo móvil y uno desktop, registrar problemas observados sin inducir respuestas y completar el resumen de resultados con participantes anonimizados.')
  h2('ANEXO E — Cobertura de la rúbrica provista')
  t(['Criterio', 'Máx.', 'Evidencia / apartado', 'Calidad y pendiente'], [
    ['2.1.1.G.1 Hallazgos', '5', 'Cap. 2.1, tabla H-01 a H-09.', 'Parcial sólida: cualitativa; falta verificación con guía original.'],
    ['2.1.1.G.2 Requerimientos', '5', 'Cap. 2.3–2.6, RF/UX y trazabilidad.', 'Buena trazabilidad; completar aceptación operativa.'],
    ['2.1.1.I.3 Síntesis/defensa', '5', 'Síntesis y tablas de diagnóstico.', 'Escrito preparado; exposición oral no verificable.'],
    ['2.1.2.G.4 Ideación colaborativa', '5', 'Cap. 3.1 y alternativas sistematizadas.', 'Limitada: no hay actas reales de brainstorming.'],
    ['2.1.2.G.5 Impacto/factibilidad', '5', 'Matriz ordinal del cap. 3.1.3.', 'Análisis transparente, estimaciones no validadas por equipo/usuarios.'],
    ['2.1.2.I.6 Justificación oral', '5', 'Cap. 3.1.4 y resumen ejecutivo.', 'Contenido de defensa listo; desempeño oral no verificable.'],
    ['2.1.3.G.7 Concepto/valor', '10', 'Cap. 3.2.', 'Respaldado por dirección visual/código; falta validación con DK.'],
    ['2.1.3.G.8 Tono/lineamientos', '5', 'Cap. 3.2.2–3.3.', 'Código extraído; evaluar consistencia completa.'],
    ['2.1.3.I.9 Defensa estética', '5', 'Cap. 3.2–3.3.', 'Argumentos documentados; defensa oral pendiente.'],
    ['2.1.4.G.10 Funciones/arquitectura', '5', 'Cap. 4.1–4.2; anexo A.', 'Buen inventario, delimitado a evidencia.'],
    ['2.1.4.G.11 Flujos/mejoras UX', '10', 'Cap. 4.3–4.4.', 'Flujos analíticos, faltan pruebas observadas con usuarios.'],
    ['2.1.4.I.12 Explicación oral', '5', 'Cap. 4.2–4.3.', 'Apoyo listo; oral no verificable.'],
    ['2.1.5.G.13 Sketch/wireframe/mockup', '10', 'Cap. 5 y Figma Home.', 'Mockup Home confirmado; no hay evidencias históricas low-fi ni páginas interiores en Figma.'],
    ['2.1.5.G.14 Validación usuarios', '10', 'Cap. 6 e instrumento.', 'Pendiente de aplicación; no asignar calificación de experto.'],
    ['2.1.5.I.15 Factibilidad/decisiones', '10', 'Cap. 6.5 y anexos A/E.', 'Typecheck/build/tests verificados; servicios y exposición oral pendientes.'],
  ], [2200, 600, 3300, 3900])
  p('La matriz cubre los 15 criterios y los máximos informados, pero no asigna puntajes. La ponderación se copia de la instrucción del responsable porque no se encontró la rúbrica original. Los criterios con sufijo I requieren desempeño oral y no se pueden cerrar mediante el DOCX.')
  h2('ANEXO F — Preparación de presentación oral')
  t(['Idea a defender', 'Explicación breve y honesta'], [
    ['Requerimientos', 'La prioridad nació de entrevista: entrada atractiva, ciencia y catálogo. Shopify debe mantenerse fuera de intervención por preferencia expresada.'],
    ['Solución', 'Sitio multipágina con páginas independientes y navegación compartida; la compra visible es demo local.'],
    ['Diseño', 'Verde DK, marfil, Manrope y recursos originales; ritmo entre secciones, no landing única.'],
    ['Arquitectura', 'Next.js 15 y Medusa 2 en monorepo, PostgreSQL local previsto; backend y proveedores aún requieren pruebas.'],
    ['Validación', '47 unit tests, typecheck/build; falta prueba formal de usabilidad y E2E visual fiable de todas las rutas.'],
    ['Decisión futura', 'Solo DK puede aprobar si y cómo migrar de Shopify, conectar pagos, publicar y operar la plataforma.'],
  ], [2600, 7400])

  const header = new Header({ children: [new Paragraph({ border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: lime, space: 6 } }, children: [new TextRun({ text: 'BIOPRODUCTOS DK  ·  INFORME DE PROPUESTA DIGITAL', font: 'Arial', size: 15, bold: true, color: green })] })] })
  const footer = new Footer({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, border: { top: { style: BorderStyle.SINGLE, size: 4, color: line, space: 5 } }, children: [new TextRun({ text: 'DIIT01 · Unidad 2  |  Página ', font: 'Arial', size: 15, color: gray }), new TextRun({ children: [PageNumber.CURRENT], font: 'Arial', size: 15, color: gray })] })] })
  const doc = new Document({
    creator: 'Equipo del proyecto BioProductos DK',
    title: 'Informe DK — Diseño de la propuesta de proyecto digital',
    subject: 'INACAP DIIT01 Unidad 2',
    description: 'Informe académico basado en evidencia del repositorio, entrevista, código y Figma.',
    keywords: 'BioProductos DK, DIIT01, UX, arquitectura, propuesta digital',
    styles: {
      default: { document: { run: { font: 'Arial', size: 21, color: '27352D' }, paragraph: { spacing: { after: 120, line: 286 } } } },
      paragraphStyles: [
        { id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { font: 'Arial', size: 31, bold: true, color: green }, paragraph: { spacing: { before: 280, after: 130 }, outlineLevel: 0 } },
        { id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { font: 'Arial', size: 25, bold: true, color: ink }, paragraph: { spacing: { before: 180, after: 90 }, outlineLevel: 1 } },
        { id: 'Heading3', name: 'Heading 3', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { font: 'Arial', size: 22, bold: true, color: leaf }, paragraph: { spacing: { before: 140, after: 70 }, outlineLevel: 2 } },
      ],
    },
    numbering: { config: [{ reference: 'bullets', levels: [{ level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 360, hanging: 220 } } } }] }] },
    sections: [{ properties: { page: { size: { width: 12240, height: 15840 }, margin: { top: 1080, bottom: 1080, left: 1080, right: 1080, header: 460, footer: 460 } } }, headers: { default: header }, footers: { default: footer }, children: body }],
    settings: { updateFields: true },
  })
  const file = path.join(out, 'Informe DK.docx')
  await fs.writeFile(file, await Packer.toBuffer(doc))
  const sourceRows = [
    ['Fuente','Tipo','Uso','Límite'],
    ['docs/ENTREVISTA_TERRENO_BIO_DK.md','Transcripción cualitativa','Necesidades, catálogo histórico, Shopify, I+D, residuos, B2B y operación','Transcripción automática; testimonios sin validación documental'],
    ['docs/MASTER_CONTEXT.md','Contexto del proyecto','Alcance académico, seguridad, continuidad, públicos y cautela científica','Documento de proyecto, no fuente legal/técnica de DK'],
    ['docs/PRD.md','Requerimientos','Módulos, alcance, audiencias y restricciones','Requisitos propuestos/confirmados distinguidos en el informe'],
    ['docs/ROADMAP.md','Bitácora','Decisiones de diseño, implementación, pruebas y pendientes','Registro del equipo; incluye cambios sucesivos'],
    ['docs/ARQUITECTURA.md','Arquitectura objetivo','Stack y decisiones de evolución','Algunas secciones son propuestas, no hechos operativos'],
    ['docs/DISENO_UX_UI.md','Lineamientos de UX','Principios visuales/accesibilidad','Documento de dirección, no norma de conformidad'],
    ['docs/DATOS_Y_CONTENIDO.md','Contenido autorizado','Catálogo, incertidumbres y límites','Ocho referencias históricas; catálogo web actual tiene seis fichas'],
    ['Figma file N0Ro5ZM38uwZpUIti7GUAC, frame 4:2','Diseño visual','Mockup Home Desktop 1440 × 6337 px; captura anexa','No se encontraron otras páginas completas ni breakpoint mobile'],
    ['Código apps/storefront y apps/backend','Implementación','Rutas, estilos, packages, guardas, endpoints, pruebas','No prueba servicios reales ni producción'],
    ['Instrucción del usuario en esta conversación','Rúbrica transcrita','Matriz de control de 15 criterios / 100 puntos','No se halló el archivo original oficial INACAP'],
    ['INACAP DIIT01_U2_GUÍA.docx','Guía oficial','No localizada en docs/encargo ni otras carpetas revisadas','Pendiente de contrastar orden/formato institucional'],
  ].map(row => row.map(v => `"${String(v).replaceAll('"','""')}"`).join(',')).join('\n')+'\n'
  await fs.writeFile(path.join(out,'REGISTRO_DE_FUENTES.csv'), sourceRows)
  await fs.writeFile(path.join(out,'PENDIENTES_DE_EVIDENCIA.md'), `# Pendientes para cerrar el informe\n\n- Copia oficial de la guía DIIT01_U2_GUÍA.docx y archivo original de rúbrica.\n- Nombres de integrantes, carrera, sección y docente para completar portada.\n- Confirmación de la denominación oficial de la sede.\n- Actas/registro de ideación colaborativa si existieron.\n- Consentimiento y documentos fuente/audio autorizados de entrevista, si deben adjuntarse.\n- Evidencia de pruebas de usuario; el instrumento está propuesto, no aplicado.\n- Vistas Figma de todas las rutas, breakpoints y prototipo navegable; actualmente se constató un solo frame Home Desktop.\n- Prueba browser E2E/axe de todas las páginas.\n- Evidencia runtime de PostgreSQL, migraciones, seed, Medusa Admin y APIs de negocio.\n- Aprobación DK de claims científicos, marcas, patentes, dirección/localización, políticas y catálogo.\n- Contratos/credenciales sandbox para Webpay, Mercado Pago, Blue Express y DTE, si se acuerda construirlos.\n- Confirmar si los campos placeholder de portada deben completarse antes de entrega académica.\n`)
  await fs.writeFile(path.join(out,'README.md'), `# Entregables del Informe DK\n\n- Informe DK.docx: informe editable, con estilos Word, índice actualizable y anexos técnicos.\n- capturas/: captura fuente del Home Figma y recortes usados en el documento.\n- figuras/: diagramas analíticos SVG y PNG generados para la transferencia.\n- REGISTRO_DE_FUENTES.csv: trazabilidad de origen y límites de cada fuente.\n- PENDIENTES_DE_EVIDENCIA.md: información que requiere confirmación o ejecución.\n- build-informe-dk.cjs: generador reproducible (usa la dependencia docx temporal instalada en /tmp/dk-docx-tools y sharp del monorepo).\n\nLa exportación PDF se intentará mediante conversores locales si están disponibles; no reemplaza la revisión visual en Word/Google Docs. El DOCX no inventa pruebas ni valida la rúbrica oficial que no se encontró.\n`)
  console.log(JSON.stringify({docx:file, bytes:(await fs.stat(file)).size, screenshots:crops.map(x=>x[0]), diagrams:['arquitectura-propuesta','mapa-navegacion','flujo-consulta','flujo-carrito-demo','roadmap'], frame:`${meta.width}x${meta.height}`}, null, 2))
}

main().catch(error => { console.error(error); process.exit(1) })
