# BioProductos DK — Plan por etapas y prompts de continuidad

Fecha: 2026-10-18. Documento de planificación solicitado a partir de la entrevista reenviada por el usuario y una revisión pública de lectura. Complementa `MASTER_CONTEXT.md`; no lo reemplaza. **No autoriza ejecutar las etapas futuras ni migrar producción.**

## 1. Punto de partida y decisión pendiente

Existe un proyecto en `/Users/baytriip/Desktop/Proyectos-Codex/bioproductos-dk`: Next.js en `apps/storefront`, Medusa en `apps/backend`, contenido tipado, Home con seis fotografías originales y rutas corporativas independientes. No se ha creado otro proyecto. Se preguntó al responsable si desea continuar esta base o preparar una carpeta separada; la respuesta está pendiente al redactar este plan.

El objetivo del equipo es presentar una alternativa convincente. La entrevista confirma que las fundadoras prefieren conservar Shopify por capacitación y facilidad móvil. No se interpreta su interés en conocer alternativas como aprobación de una migración. Antes de cualquier adopción habrá que demostrar operación, facilidad de uso, costo total, soporte y recuperación de datos; obtener aprobación expresa y preparar una revisión independiente.

La autorización actual de medios permite las seis fotos del Home y sus derivados locales, manteniendo originales. No autoriza stock, descargas ni generación de imágenes/video. Para futuras páginas se utilizará solamente material aportado y autorizado; no asumir que una foto comercial es una foto de laboratorio.

## 2. Lo que necesitamos construir, según la entrevista

| Necesidad                                                                                | Fuente temporal de la entrevista | Consecuencia de producto                                                          |
| ---------------------------------------------------------------------------------------- | -------------------------------- | --------------------------------------------------------------------------------- |
| Productos recientes, inicio atractivo y ciencia como origen                              | 0:03–1:09 y 4:49–4:57            | Home como puerta de entrada; investigación y tienda como páginas completas        |
| I+D, colaboración, proyectos, marcas, patentes y participación como entidad colaboradora | 0:19–0:52                        | Contenido científico estructurado y verificable, sin publicar logros sin respaldo |
| Acceso directo al catálogo y compra                                                      | 1:13–1:26                        | Productos, fichas, carrito y checkout de ensayo conectados al mismo motor         |
| Conservar Shopify y administrar desde celular                                            | 1:29–3:13                        | No migrar hoy; demostrar una alternativa móvil antes de proponer el cambio        |
| Blue Express y futura expansión local/regional                                           | 3:18–4:18                        | Proveedor sujeto a convenio/API; no prometer cobertura ni desempeño no probados   |
| Colaboración: nombre, apellido, correo, teléfono                                         | 5:12–5:26                        | Formulario mínimo, con validación, almacenamiento/entrega y permisos              |
| Logo y dirección de establecimientos que venden DK                                       | 6:04–6:30                        | Directorio administrable con locales autorizados                                  |
| Precio público final; B2B se negocia individualmente                                     | 6:33–6:59                        | Separación de precios B2C y condiciones privadas                                  |
| Dos detergentes, tres champús, tres sales                                                | 7:15–7:34                        | Ocho referencias relatadas en la visita; no equivalen a catálogo vigente          |
| Stock interno; publicación de cantidad exacta opcional                                   | 7:37–7:58                        | Inventario persistente, permisos y disponibilidad coherente                       |
| Webpay, Mercado Pago, boleta y factura                                                   | 8:01–8:40                        | Integraciones verificables en prueba, sin cargos ni DTE reales                    |
| Exportación diaria de despacho y datos incompletos visibles                              | 8:45–9:15                        | CSV/Excel autorizado y estados operativos                                         |
| Ventas por mes, producto y tipo de cliente                                               | 9:16–9:31                        | Reportes reconciliables con pedidos persistidos                                   |
| Políticas y reclamos pendientes                                                          | 10:14–10:40                      | Documentos a revisión; no publicar textos inventados como vigentes                |
| Mantener esencia, corregir códigos e imágenes incongruentes                              | 11:02–13:58                      | Diseño premium propio, contenido correcto y revisión visual real                  |
| Revalorización de residuos, nanoemulsiones y cosmética sólida                            | Recorrido científico             | Narrativa técnica de alto nivel aprobada por DK                                   |
| Posible colaboración/donación de residuos                                                | Recorrido 15:21–18:52            | Propuesta futura sujeta a protocolo; sin descuentos ni retiros prometidos         |

La transcripción contiene errores de nombres, unidades, geometría, lugares y términos regulatorios. No convertirlos automáticamente en contenido técnico, instrucciones sanitarias ni afirmaciones legales. No publicar fórmulas, parámetros de elaboración ni detalles confidenciales. La existencia de patentes y permisos se relata en la visita, pero su alcance/estado requiere documentación.

## 3. Revisión del sitio público

Revisión textual, sin imágenes, videos, formularios, cuentas privadas ni operaciones comerciales. **No es una auditoría visual ni una prueba de checkout.**

| Fuente                                                  | Resultado de esta consulta                                                 | Qué aporta                                                                                                                      |
| ------------------------------------------------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| [Inicio](https://bioproductosdk.com/)                   | Apertura directa con timeout; contenido recuperado por índice del buscador | Pilares, productos, empresas y distribución; contiene afirmaciones ambientales y cifras que no se adoptan como evidencia medida |
| [Nosotras](https://bioproductosdk.com/nosotras/)        | Apertura directa con timeout; contenido indexado disponible                | Relato de dos fundadoras, origen científico, misión y visión; fechas/hitos deben validarse antes de nueva publicación           |
| [Bio Investigación](https://bioproductosdk.com/home-2/) | Apertura directa con timeout; contenido indexado disponible                | Colaboración, I+D y desarrollo; la ruta original no se replica en la propuesta                                                  |
| [Empresa](https://bioproductosdk.com/empresa/)          | Apertura directa con timeout; contenido indexado disponible                | Orientación institucional; el índice muestra un shortcode de formulario sin resolver, que requiere confirmación en navegador    |
| [Bio Impacto](https://bioproductosdk.com/bio-impacto/)  | Respuesta textual directa disponible                                       | Navegación multipágina, circularidad y contacto institucional publicado                                                         |

Un timeout de la herramienta no demuestra que el sitio esté caído para las personas. Un fragmento del índice puede estar desactualizado. Los textos del sitio son fuentes de identidad y afirmaciones de la marca; no acreditan por sí solos resultados ambientales, patentes o autorizaciones. La búsqueda acotada realizada no obtuvo documentación de patente; eso no demuestra que no exista.

No se auditó Shopify ni se confirmó su configuración interna a partir del sitio público. Tampoco se asumieron proveedor de hosting, costos vigentes, APIs contratadas o credenciales disponibles por lo relatado en la entrevista.

## 4. Estado del proyecto existente

| Área                           | Evidencia disponible                                      | Estado que se puede afirmar                                                                                             |
| ------------------------------ | --------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Frontend                       | `apps/storefront/package.json` y rutas App Router         | Next 15.5.24 instalado; Home y destinos editoriales existen                                                             |
| Backend                        | `apps/backend/package.json`                               | Medusa 2.21.2 instalado; no se propone actualizar versiones en esta sesión                                              |
| Home                           | Código y evidencia `home-remove-closing-*`                | Usa seis originales; cierre «Sigamos explorando» retirado a petición del usuario                                        |
| Páginas interiores             | Ocho rutas y estados de preparación                       | Navegables en la estructura; no desarrolladas como páginas completas                                                    |
| Calidad previa                 | `evidence/home-remove-closing-verification.json`          | Formato, lint, tipos, 13 tests y build frontend pasaron en la sesión anterior; no se reejecutaron en esta planificación |
| Navegador                      | Logs previos EPERM                                        | Responsive/axe/HTTP pendientes; listar casos Playwright no equivale a aprobarlos                                        |
| PostgreSQL y comercio          | `VERIFICACION_BASE_DE_DATOS.md`, seed y controles locales | Conexión, migraciones, idempotencia y persistencia operativa todavía por demostrar                                      |
| Administración e integraciones | Starter y requisitos                                      | No se afirman roles DK, métricas, Webpay/Mercado Pago/Blue Express/DTE operativos                                       |
| Versionado/documentación       | `.git` ausente; AGENTS/README solo en `docs/`             | Corregir gobernanza sin sobrescribir trabajo ni secretos; el AGENTS local conserva un puntero circular                  |

No se han ejecutado nuevos builds/tests para un cambio exclusivamente documental. El historial previo es evidencia fechada, no una nueva validación operativa.

## 5. Información faltante, con quién validarla y cuándo la necesitamos

No se necesitan contraseñas de producción para diseñar ni desarrollar la demo.

| Información                                                                                                      | Responsable de confirmar            | Necesaria antes de                                                                     |
| ---------------------------------------------------------------------------------------------------------------- | ----------------------------------- | -------------------------------------------------------------------------------------- |
| Fecha de entrega, equipo, responsabilidades, prioridades y criterio de aprobación                                | Responsable del proyecto / equipo   | Comprometer alcance y calendario                                                       |
| Continuar carpeta actual o crear una separada                                                                    | Responsable del proyecto            | Crear o copiar cualquier proyecto                                                      |
| Logo vectorial autorizado, manual de marca y nombres/paletas de líneas                                           | DK / diseño                         | Publicar identidad definitiva                                                          |
| Nombres, cargos, biografías, fechas e historia autorizados                                                       | Fundadoras                          | Nosotras                                                                               |
| Fichas: nombre, SKU, categoría, variante, tamaño, uso, precauciones, contenido publicable y fotos asignadas      | DK / equipo técnico                 | Catálogo comercial; mientras tanto fixtures DEMO inequívocos                           |
| Precios finales vigentes, disponibilidad y reglas de devolución                                                  | DK / operaciones                    | Venta real, fuera del alcance de esta etapa                                            |
| Patentes: número, titular, jurisdicción, estado, alcance y documento/enlace publicable                           | DK / responsable correspondiente    | Publicar patentes como hechos                                                          |
| Marcas registradas y autorización de uso de logos                                                                | DK                                  | Publicar registros o sellos                                                            |
| Proyectos, fechas, rol DK, financiación, licitaciones, colaboradores y permiso para mostrar resultados           | DK / investigación                  | Trayectoria de Bio Investigación                                                       |
| Resoluciones/registros aplicables al laboratorio y productos, con alcance y permiso de publicación               | DK / responsable técnico            | Cualquier afirmación sobre autorizaciones sanitarias                                   |
| Locales: nombre, dirección, comuna/región, horario, URL de ubicación y logo autorizado                           | DK / comercios                      | Directorio real                                                                        |
| Contactos institucionales y redes vigentes                                                                       | DK                                  | Formularios/canales definitivos                                                        |
| Protocolo aprobado de residuos, materiales aceptados, conservación, responsables y logística                     | DK / laboratorio                    | Activar recepción/donación; no redactar protocolos sanitarios por inferencia           |
| Credenciales, documentación y cuenta de pruebas de cada proveedor                                                | Responsable autorizado de DK/equipo | Integración sandbox de ese proveedor; guardar por canal seguro y fuera del chat/código |
| Tipos de cliente y definiciones de ventas: impuestos, devoluciones, cancelaciones, zona horaria                  | DK / operaciones                    | Reportes verificables                                                                  |
| Textos de privacidad, venta, reclamos y consentimiento aprobados                                                 | DK / revisión competente            | Formularios y comercio con datos reales                                                |
| Operación futura: hosting, backups, actualizaciones, soporte, capacitación, presupuesto y propietario de cuentas | DK / equipo                         | Comparar alternativas y decidir una migración                                          |

La ausencia de estos datos no impide construir UI ni datos sintéticos claramente identificados. Impide presentarlos como catálogo/servicios/logros reales verificados.

## 6. Secuencia recomendada

Es una propuesta de orden para la base actual; no inicia otra página. Cada etapa tiene su propio prompt y aprobación. Infraestructura se verifica antes de utilizar funciones persistentes.

| Paso | Resultado revisable                                  | Condición de salida                                                                    |
| ---- | ---------------------------------------------------- | -------------------------------------------------------------------------------------- |
| 00   | Diagnóstico y matriz de alcance/fuentes              | Comprender base real y resolver continuidad del proyecto                               |
| 01   | Gobernanza, entorno reproducible y PostgreSQL DEMO   | Arranque probado; migraciones y seed dos veces sin duplicar ni restaurar stock editado |
| 02   | Cierre de revisión del Home existente                | Navegador, responsive, teclado, fotos y aprobación; no restaurar el cierre eliminado   |
| 03   | Nosotras                                             | Página propia, biografías/hitos respaldados y aprobación                               |
| 04   | Bio Investigación                                    | Ciencia comprensible, trayectoria acreditada o excluida, página aprobada               |
| 05   | Productos y fichas                                   | Catálogo DEMO conectado a backend, filtros, CLP y estados probados                     |
| 06   | Empresas                                             | Canal B2B con privacidad de condiciones, sin descuentos inventados                     |
| 07   | Bio Impacto                                          | Diferenciar prácticas, metas y resultados; donaciones sin activar si falta protocolo   |
| 08   | Dónde comprar                                        | Directorio con datos autorizados o estado vacío honesto                                |
| 09   | Contacto y solicitudes                               | Validación servidor, persistencia/entrega DEMO y controles de acceso                   |
| 10   | Administración                                       | Login, permisos por rol, inventario/pedidos/contenido y auditoría probados             |
| 11   | Carrito y checkout                                   | Precios/stock autoritativos, estados persistentes e idempotencia                       |
| 12   | Pagos sandbox                                        | Ejecutar Webpay y Mercado Pago como subhitos separados, cada uno con evidencia         |
| 13   | Logística, DTE y correo                              | Un subhito/proveedor por vez; contratos probados y límites explícitos                  |
| 14   | Analítica y exportaciones                            | Reconciliar reportes con órdenes de ensayo y devoluciones                              |
| 15   | Seguridad, accesibilidad, rendimiento y restauración | Resolver hallazgos reales, probar flujos críticos y recuperación                       |
| 16   | Demo, capacitación y propuesta de adopción           | Comparación con evidencia y costo total; ninguna migración automática                  |

No prometer fechas sin conocer equipo/disponibilidad y servicios. Seguridad y accesibilidad se aplican desde cada etapa; el paso 15 es una revisión final, no el momento de comenzarlas.

## 7. Prompt maestro de continuidad

Este bloque se utiliza junto con **un solo prompt de etapa**. Los prompts posteriores están preparados para uso futuro; no conceden autorización para ejecutarlos ahora.

```text
Actúa como equipo senior de producto, UX/UI, frontend, backend, seguridad y QA para BioProductos DK. Trabaja en español de Chile; usa inglés en identificadores de código.

Antes de editar, localiza y lee AGENTS.md, README.md, docs/MASTER_CONTEXT.md, docs/PRD.md, docs/ARQUITECTURA.md, docs/DISENO_UX_UI.md, docs/CRITERIOS_ACEPTACION.md, docs/DATOS_Y_CONTENIDO.md, docs/ROADMAP.md y docs/ENTREVISTA_TERRENO_BIO_DK.md. Hoy AGENTS y README están en docs/: localiza sus rutas reales y señala los enlaces circulares o faltantes, sin atribuirles contenido inexistente. Lee también docs/PLAN_DE_TRABAJO_Y_PROMPTS.md y el código que vas a modificar.

La base existente es apps/storefront (Next.js) y apps/backend (Medusa 2). Conserva lockfile, funcionalidades y trabajo del equipo. No ejecutes scaffolds ni recrees el repositorio. Si se acuerda una carpeta separada, define y confirma primero su ruta; no sobrescribas la actual.

Objetivo: propuesta competitiva multipágina, científica, sostenible, premium y fácil de administrar desde celular. El Home es una entrada, no reemplaza las páginas interiores. No repitas layouts genéricos ni grandes superficies sin intención.

Solo usa las fotografías originales ya aportadas/autorizadas y derivados locales. Conserva sus originales. No busques, descargues ni generes imágenes o videos. El Home actual usa seis fotos y no tiene el bloque «Sigamos explorando / Otra mirada. Nuevas posibilidades.»; no lo restaures por seguir un prompt histórico.

No alteres Shopify, dominios, DNS, datos, pagos ni cuentas de producción. La empresa prefiere Shopify: esta demo busca demostrar una alternativa, no ejecutar una migración. Solo entornos independientes y datos sintéticos identificados. No inventes precios oficiales, stock real, patentes, permisos, aliados, cifras ambientales o políticas legales. La entrevista es testimonio; los claims sensibles requieren respaldo y autorización.

No publiques secretos, RUT completo, credenciales ni datos de compradores en logs. Verifica permisos en servidor, minimiza datos y no agregues bypasses inseguros. Reutiliza el motor Medusa; no dupliques catálogo, inventario ni órdenes. CLP en enteros y totales autoritativos en servidor.

Ejecuta únicamente la etapa que se indique. Primero resume diagnóstico, objetivo, dependencias y archivos previstos. Implementa lo autorizado; prueba el resultado y los casos de error. Usa formato/lint, tipos, build y tests pertinentes; comprueba responsive, teclado, foco y movimiento reducido. No declares completado lo que no se probó. Si una restricción impide una prueba, registra el comando y error exactos sin desactivar controles para fingir éxito.

Al terminar, amplía docs/ROADMAP.md sin borrar historial: fecha, cambios, comandos, resultados reales, límites y siguiente paso. Entrega archivos modificados, cómo iniciar, ruta para revisar y estado de aceptación. Detente antes de desarrollar otra página o etapa; espera la aprobación correspondiente.
```

## 8. Prompt 00 — Solo diagnóstico y recopilación

**Es el primer prompt a ejecutar.** No crea aplicaciones ni implementa otra página.

```text
Aplica el prompt maestro de docs/PLAN_DE_TRABAJO_Y_PROMPTS.md.

ETAPA 00: comprende y audita el proyecto existente. No programes otra página, no reinstales dependencias ni alteres servicios.

1. Lee el contexto y la entrevista completos. Distingue solicitudes de las fundadoras, propuestas de estudiantes, afirmaciones por verificar y datos DEMO.
2. Inspecciona estructura, manifests/lockfile, rutas, contenido, fotografías autorizadas y estado de Git. No imprimas archivos .env ni valores secretos.
3. Revisa el sitio público solo en lectura textual, sin descargar medios ni enviar formularios. Distingue respuesta directa, índice de búsqueda, dato testimonial y documento oficial. Un timeout no prueba una caída general.
4. Presenta qué está implementado, qué solo compila, qué se probó realmente y qué falta. No certifiques comercio, inventario, Admin ni integraciones porque exista código del starter.
5. Lista los documentos/datos que faltan para catálogo, investigación, identidad, puntos de venta, proveedores y operación. Prioriza los imprescindibles para el próximo hito; no pidas credenciales de producción.
6. Propón el alcance de la próxima etapa y criterios de aceptación. Confirma si continuaremos esta carpeta o habrá un proyecto separado antes de crear/copiar archivos de aplicación.
7. Actualiza solo documentación de diagnóstico/plan y ROADMAP, preservando el historial. Entrega el informe y detente; no ejecutes la etapa 01 ni rediseñes el Home automáticamente.
```

## 9. Prompts de las etapas posteriores

Usar cada bloque solo cuando esa etapa haya sido aprobada. Todos aplican el prompt maestro, documentan resultados y se detienen al finalizar.

### 01 — Base reproducible y datos de ensayo

```text
Aplica el prompt maestro. Ejecuta solo ETAPA 01: verifica Mac, dependencias, reglas de proyecto y servidor PostgreSQL de prueba. Repara referencias de documentación con cambios revisables y preserva documentos del equipo. No inicialices Git sobre un repositorio ajeno ni agregues secretos a su historial. Si no hay Git o permisos, registra el bloqueo y conserva respaldos locales de cambios.

Comprueba conexión local, rol limitado, nombre de base DEMO y autenticación; no reinicialices un directorio de datos existente ni uses bases de terceros. Sigue docs/VERIFICACION_BASE_DE_DATOS.md validando sus instrucciones contra el estado actual. Ejecuta migraciones y seed solo en la base independiente autorizada. Repite seed secuencialmente, compara IDs, cantidades y precios; comprueba que un ajuste de stock persista tras reinicio y no sea sobrescrito. Prueba arranque de Medusa, Admin y storefront; no confundas build con runtime.

No habilites pagos, DTE ni producción. Entrega pruebas, errores, comandos y estado de la infraestructura. Detente antes de otra etapa.
```

### 02 — Revisar y cerrar el Home actual

```text
Aplica el prompt maestro. Ejecuta solo ETAPA 02: revisa el Home existente en /, conserva las seis fotos y la eliminación del cierre «Sigamos explorando». No lo reconstruyas por defecto. Identifica y corrige problemas concretos de composición, lectura, encuadres, carga, navegación y accesibilidad.

Comprueba 320/375/390/768/1024/1440/1920 px, zoom 200%, teclado, menú, tabs, desplegables, movimiento reducido y modo sin JS. Ejecuta smoke y Playwright desde un entorno con puertos permitidos, además de controles de código. Registra cualquier prueba bloqueada como pendiente. No programes Nosotras ni Bio Investigación. Entrega el Home para aprobación.
```

### 03 — Nosotras

```text
Aplica el prompt maestro. Ejecuta solo ETAPA 03: desarrolla /nosotras con historia, propósito, misión/visión y rostro humano. Verifica nombres, biografías, fechas y fotos; si faltan, omite el dato específico o conserva un estado honesto. No inventes trayectoria. Diseña una identidad propia, coherente con el sistema global y excelente en móvil. Conserva Home y demás rutas. Verifica y entrega para aprobación antes de Bio Investigación.
```

### 04 — Bio Investigación

```text
Aplica el prompt maestro. Ejecuta solo ETAPA 04: desarrolla /bio-investigacion como página científica independiente. Organiza I+D, colaboración, proceso de alto nivel, técnicas, equipamiento y oportunidades. Separa investigación en curso de servicios/capacidades operativos. Explica sin publicar parámetros confidenciales.

Publica proyectos, logros, marcas, patentes, licitaciones y colaboración institucional solo con respaldo y autorización. No extrapoles permisos de cosmética sólida a cremas ni otras líneas. No uses fotos comerciales como fotos de laboratorio. Diseña recorrido accesible, divulgación clara y destinos de contacto útiles. Verifica y entrega para aprobación.
```

### 05 — Productos y fichas sobre Medusa

```text
Aplica el prompt maestro. Ejecuta solo ETAPA 05, con PostgreSQL de ensayo verificado: desarrolla /productos y la estrategia de fichas sin duplicar las rutas/motor comercial del starter. Define un único origen de catálogo, variantes, precio CLP y disponibilidad. Usa ocho referencias DEMO si los datos comerciales no están aprobados; muestra su condición inequívocamente.

Implementa búsqueda/filtros/orden y estados de carga/vacío/error, con fotos autorizadas correctamente asignadas. Prueba que un cambio de catálogo/stock autorizado se refleje sin editar código; rechaza cantidades inválidas. No habilites todavía checkout ni cobros. Conserva las páginas existentes y documenta el mapa entre rutas editoriales y nativas. Entrega para aprobación.
```

### 06 — Empresas

```text
Aplica el prompt maestro. Ejecuta solo ETAPA 06: desarrolla /empresas para instituciones, biodistribuidores y comercios. Mantén privados precios y acuerdos B2B; no inventes mínimos, descuentos, cobertura o convenios. Diseña recorridos útiles de cotización/distribución. Si aún no existe persistencia de solicitudes, enlaza al canal disponible e identifica el alcance; no muestres éxito de un formulario que no guarda o entrega nada. Verifica y entrega para aprobación.
```

### 07 — Bio Impacto

```text
Aplica el prompt maestro. Ejecuta solo ETAPA 07: desarrolla /bio-impacto con circularidad y revalorización descritas en las fuentes. Distingue prácticas, metas e impacto medido. No copies porcentajes o absolutos sin respaldo. La colaboración/donación de residuos sigue como propuesta si no existe protocolo aprobado; no prometas retiros, descuentos ni instrucciones sanitarias inferidas. Usa únicamente medios autorizados y verifica accesibilidad. Entrega para aprobación.
```

### 08 — Dónde comprar

```text
Aplica el prompt maestro. Ejecuta solo ETAPA 08: desarrolla /donde-comprar con establecimientos autorizados, direcciones y enlaces de ubicación confirmados; filtros por comuna/región cuando existan datos suficientes. Permite administración coherente de estos registros. Si faltan establecimientos, muestra un estado vacío útil; no publiques comercios ficticios como reales ni descargues logos por tu cuenta. Verifica altas/cambios, enlaces y responsive. Entrega para aprobación.
```

### 09 — Contacto y solicitudes

```text
Aplica el prompt maestro. Ejecuta solo ETAPA 09: desarrolla /contacto y el flujo compartido de consultas comerciales/científicas. Minimiza campos, valida en servidor, protege contra abuso, controla quién accede a las solicitudes y maneja errores/reintentos. En prueba, guarda o entrega mensajes solo a un destino DEMO autorizado; no envíes correos reales por defecto. Prueba persistencia o entrega y evita duplicados. No inventes consentimiento ni políticas definitivas. Entrega para aprobación.
```

### 10 — Administración

```text
Aplica el prompt maestro. Ejecuta solo ETAPA 10: utiliza el Admin Medusa existente y extiende lo necesario para DK. Comprueba login real, sesiones y permisos de admin/editor/operaciones en servidor mediante matriz de acciones y pruebas de acceso denegado; no asumas roles listos por ver el Admin nativo. Incluye inventario, pedidos, solicitudes y contenido según alcance disponible. Registra operaciones críticas y evalúa MFA según soporte real. Verifica gestión desde celular, persistencia y errores. Entrega para aprobación.
```

### 11 — Carrito y checkout de ensayo

```text
Aplica el prompt maestro. Ejecuta solo ETAPA 11: conecta fichas, carrito persistente y checkout a los flujos nativos Medusa. Valida precio/stock en servidor, variantes/cantidades, dirección y estados de orden. Prueba recarga, cambio de precio/stock, cantidades negativas/excesivas, reintentos, cancelación, idempotencia y concurrencia contra sobreventa. No cobres ni presentes un proveedor manual como Webpay/Mercado Pago verificado. Si faltan pagos, delimita el flujo alcanzado. Entrega para aprobación.
```

### 12 — Un proveedor de pago sandbox por subhito

```text
Aplica el prompt maestro. Ejecuta solo el proveedor de ETAPA 12 expresamente indicado: Webpay O Mercado Pago. Comprueba documentación oficial vigente, entorno y credenciales exclusivamente de pruebas. Implementa el adaptador con confirmación en servidor, validación de retornos/notificaciones según el proveedor y protección idempotente.

Prueba aprobado, rechazado, cancelado, timeout, retorno repetido y notificación duplicada; reconcilia orden, inventario y pago. No aceptes query strings del navegador como prueba de pago. Sin credenciales/ambiente, prueba el contrato local e identifica la conexión pendiente; no simules una transacción del proveedor como aprobada. Entrega evidencia y detente antes del otro proveedor.
```

### 13 — Un servicio externo por subhito

```text
Aplica el prompt maestro. Ejecuta solo el servicio de ETAPA 13 indicado: Blue Express, DTE O correo de pruebas. Verifica documentación, permisos y ambiente autorizado de ese servicio. Implementa adaptador y pruebas de contrato/errores; sin acceso real, declara qué se probó localmente y qué conexión está pendiente.

Para logística, no supongas API, tarifa ni cobertura. Para DTE, no presentes PDFs internos como boletas/facturas válidas. Para correo, utiliza destinatarios de ensayo y evita exponer datos sensibles. No actives producción ni envíos reales. Entrega evidencia antes del siguiente servicio.
```

### 14 — Analítica y exportaciones

```text
Aplica el prompt maestro. Ejecuta solo ETAPA 14: reportes por mes, producto y tipo de cliente usando pedidos DEMO persistidos. Define venta pagada, devoluciones/cancelaciones, impuestos y zona horaria con reglas explícitas. Reconciliación: total del reporte debe coincidir con sus órdenes, no con números escritos a mano.

Genera exportación autorizada de despacho con datos mínimos y señalización de incompletos. Protege contra inyección de fórmulas CSV. Prueba filtros, roles, conciliación y manejo de ausencia de datos. Entrega para aprobación.
```

### 15 — Calidad integral

```text
Aplica el prompt maestro. Ejecuta solo ETAPA 15: revisa dependencias y hallazgos de seguridad actuales sin aplicar upgrades forzados ni romper el lockfile. Comprueba permisos, secretos, logs, validación, sesiones, abuso y copias/restauración de la base DEMO. Revisa todos los flujos construidos con accesibilidad, responsive, rendimiento medido y errores de proveedores.

Ejecuta formato/lint/tipos/build, tests de servicios e integración pertinentes y E2E de compra/administración. Clasifica defectos por evidencia y gravedad. No declares producción preparada por compilar ni auditoría aprobada si no se ejecutó. Corrige lo autorizado y entrega resultados y pendientes.
```

### 16 — Demo y decisión de adopción

```text
Aplica el prompt maestro. Ejecuta solo ETAPA 16: prepara una demo independiente con datos sintéticos, guion de prueba y capacitación móvil. Demuestra actualizar producto/stock, comprar en sandbox, gestionar orden y reconciliar reportes. Muestra claramente integraciones no verificadas.

Compara la alternativa y la continuidad de Shopify con criterios verificables: facilidad móvil, funciones, contenido científico, costos recurrentes, comisiones, mantenimiento, soporte, backups y capacitación. No prometas costo cero ni ahorro sin fuentes y cálculo. Prepara estrategia futura de migración y rollback solo a nivel de plan. No exportes clientes, cambies dominios o migres producción; eso requiere otra autorización y revisión independiente.
```

## 10. Cómo empezar hoy

Mientras se resuelve continuidad de carpeta, todo lo anterior es planificación; no crear, mover ni copiar aplicaciones. Para revisar el Home ya construido desde Terminal:

```sh
cd /Users/baytriip/Desktop/Proyectos-Codex/bioproductos-dk
npm run dev:storefront
```

Abrir `http://127.0.0.1:8000/`. Para dar instrucciones a Codex CLI, abrirlo en la carpeta acordada y pegar primero el prompt maestro y luego el prompt 00. No ejecutar los 17 pasos en una sola instrucción. Tras el informe inicial, elegir y aprobar únicamente la siguiente etapa.
