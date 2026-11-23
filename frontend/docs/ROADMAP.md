# ROADMAP — BioProductos DK

## Estado inicial

- [x] Recopilar objetivos de la visita (transcripción proporcionada).
- [x] Establecer propósito: proyecto final competitivo, sin migración real.
- [x] Definir hipótesis de arquitectura Medusa/Next.js/PostgreSQL.
- [x] Verificar entorno: macOS 13.7.8 Intel, Node 24.16.0, npm 11.13.0, Git 2.39.2 y Codex 0.162.1; PostgreSQL/pnpm/Docker/Homebrew ausentes en PATH al diagnóstico.
- [ ] Generar monorepo oficial y poner backend, admin y storefront en marcha. Starter oficial incorporado; arranque y base aún bloqueados (ver sesión).
- [ ] Abrir repo Git y guardar primer estado estable.

## Hitos

### H0 — Fundaciones

- [x] Documentación inicial leída completamente; decisiones y bloqueos en `DIAGNOSTICO_MAC.md` y `DECISIONES_F0_F1.md`.
- [x] Ejemplos sin secretos, generación privada de `.env`, scripts y health check de storefront implementados. HTTP pendiente; no se marca H0 completo.
- [ ] README técnico con comandos reales verificados.

### H1 — Experiencia visual

- [ ] Layout responsive, header, footer, home, nosotras, investigación, impacto y contacto.
- [x] Tokens DK provisionales, Manrope autoalojada e ilustraciones SVG propias implementados en `/demo`; validación visual y aprobación de identidad pendientes.
- [ ] Identidad científica verificada, imágenes adecuadas o material provisional claramente marcado.

### H2 — Comercio completo

- [ ] Productos/variantes conectados a PostgreSQL; seed demostrativo revisable.
- [ ] Búsqueda/filtros, producto, carrito persistente, stock, checkout.
- [ ] Crear pedido de prueba y comprobar persistencia/estado.

### H3 — DK Admin

- [ ] Usuarios, roles, stock, catálogo, pedidos, lugares de venta, contenidos.
- [ ] Gráficos calculados con datos persistentes; exportaciones y filtros.

### H4 — Integraciones

- [ ] Webpay Plus prueba con aprobación/rechazo/anulación según SDK.
- [ ] Mercado Pago cuenta de prueba con respuestas comprobadas.
- [ ] Blue Express: gestión interna funcional y API si hay acceso a entorno autorizado.
- [ ] Documentos tributarios: integración legítima certificación/proveedor si se autoriza; nunca DTE falsos.

### H5 — Seguridad y calidad

- [ ] Tests E2E de compra y admin, idempotencia, validación, seguridad de rutas.
- [ ] Navegación por teclado, accesibilidad, móvil real, auditoría dependencias.
- [ ] Build final y comprobación de despliegue en staging.

### H6 — Presentación

- [ ] Datos demo realistas y señalizados; recorrido fundadoras en <8 min.
- [ ] Comparación funcional con sitio actual sin alegaciones no verificadas.
- [ ] Documento de costos de alojamiento, mantenimiento, seguridad y soporte.

## Registro de sesión

| Fecha      | Trabajo realizado                                                                                                                                                 | Comandos/pruebas ejecutados                                                                                                                                                                              | Bloqueos                                                                                                                                                          | Próximo paso                                                                            |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| 2026-10-17 | Documentación inicial creada                                                                                                                                      | Pendiente de ejecución local                                                                                                                                                                             | No verificados: base de datos, credenciales, fotos y precios                                                                                                      | Revisar máquina e instalar monorepo oficial                                             |
| 2026-10-17 | Diagnóstico; importación del DTC Starter oficial; configuración de seguridad local; propuesta de home en Next; ocho fixtures y seed; scripts de calidad y pruebas | `sw_vers`, `uname -m`, `system_profiler`, `df`, `command -v`, versiones, `lsof`, `npm install`, `npm run setup:env`, lint/tipos/tests/build, intentos de arranque/smoke/E2E; resultados detallados abajo | PostgreSQL no encontrado; EPERM al crear `.git` y escuchar/conectar puertos; resolución de dependencias React del monorepo corregida mediante instalación aislada | Instalar PostgreSQL compatible, migrar y ensayar seed/persistencia/Admin desde Terminal |

## Sesión de implementación — 2026-10-17

**Estado general: F0 diagnosticado; F1 y F2 en progreso. Ningún módulo comercial está declarado terminado.** La preferencia por Shopify sigue siendo una restricción confirmada; esta propuesta no autoriza migración ni producción.

### Cambios y decisiones

- Se preservaron los documentos originales, AGENTS y el prompt. El README conserva su texto del kit y agrega la guía técnica actual.
- Se incorporó `medusajs/dtc-starter` oficial, commit `f677db438f27294fc50e4c7c6612e71ff38eeff5`, Medusa 2.21.2 / Next 15.5.24. Procedencia: `evidence/upstream.json`.
- npm workspaces y lockfile con hoisting estándar y override acotado de Next/React; no hay un segundo motor comercial. Los ensayos de instalación se conservan temporalmente en caché ignorada.
- Secretos aleatorios locales, archivos 0600, CORS/URLs de loopback, guardas del backend, telemetría deshabilitada, logs sin payloads/cabeceras, cabeceras de seguridad y noindex. No se creó un administrador ni se afirman RBAC/MFA implementados.
- Home `/demo` con identidad provisional, menú móvil, filtros y fichas, investigación, contexto de la candidatura y estados de contenidos pendientes. Sin fotos, sellos, resultados ni locales inventados. Todo precio/stock es ficticio.
- Migraciones sin seed europeo; seed genérico de 50 productos deshabilitado. Seed DK preparado sin pagos ni envíos, conservando stock/precios existentes. **No ejecutado ni validado en PostgreSQL.**
- Rutas comerciales bloqueadas en modo preview; retorno de pagos 503. La API pública health de Next informa su modo y no afirma conexión con Medusa.
- Tests unitarios de seguridad/datos/setup y tests Playwright para anchos 360/390/768/1440, filtros, teclado, overflow, movimiento reducido y axe. Una definición de test no es evidencia de aprobación.

### Problemas encontrados y tratamiento

1. DNS: `curl` y `git clone` directos fallaron. Descargas con `npm install` sí funcionaron. No se tocaron servicios privados.
2. Resolución npm: mezcla de React 18/19 causó error real de prerender en Next. Se descartó una instalación totalmente anidada por sus imports implícitos y costo; la solución final mantiene hoisting estándar y restringe el peer de Next a React 19.0.5 para conservar React 18 en Medusa. No se desactivaron controles para hacer pasar compilaciones.
3. Medusa CLI escribía configuración global no permitida. Wrapper con `XDG_CONFIG_HOME` en `.local/config`; no se cambiaron HOME ni configuraciones globales.
4. El bundler Admin descubre un puerto incluso durante build. `HMR_PORT=5173` fija la configuración y permite compilar sin esa detección. Los permisos de escucha del servidor siguen restringidos.
5. `git init`: EPERM al crear `.git`. **No se hizo ningún commit.** Instrucciones de commit revisable en README.
6. `next dev`: EPERM en `127.0.0.1:8000`. Playwright abortó antes de los casos de prueba; smoke falló por conexión EPERM. **Sin capturas, validación de teclado/AA ni servidor en funcionamiento verificados.**
7. `dev:backend`: rechazó el arranque con mensaje explícito por falta de `DATABASE_URL`; no se usó otra base ni un bypass.
8. La auditoría de la primera instalación aislada reportó 135 vulnerabilidades (82 moderadas, 53 altas), antes de los ajustes finales de herramientas. Se conserva el reporte observado en `evidence/dependency-advisories.txt`. Requiere reconciliar el árbol final y revisar remediación en F7; no se hizo un upgrade forzado ni se declara seguridad de producción.
9. La revisión expuso imports/peers implícitos del starter y un fallo del parche CommonJS de ESLint. Se declararon dependencias requeridas y se usa configuración flat de plugins Next/TypeScript/Hooks. Los tipos React se fijaron en los manifests y el lockfile fue regenerado con npm. Las pruebas de resolución y `npm ci --dry-run` se deben reconciliar contra la instalación final; no equivalen a comprobar el runtime con PostgreSQL.

### Verificaciones

Los resultados finales de formato, lint, tipos, tests y build se escriben en `evidence/verification.json` por `scripts/verify.mjs`; cada entrada contiene código de salida, fecha y log. La tabla de cierre siguiente resume la ejecución terminada. Los logs de intentos bloqueados están en `evidence/e2e.log`, `evidence/smoke.log` y `evidence/backend-start.log`.

### Cierre verificado — 2026-10-17, 15:16 CLST

| Verificación                    | Resultado real                                                                                                                                                               |
| ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run format:check`          | Código 0                                                                                                                                                                     |
| `npm run lint`                  | Código 0; 0 errores y 10 advertencias en código del starter pendiente de adaptar                                                                                             |
| `npm run typecheck`             | Código 0; backend y storefront estrictos                                                                                                                                     |
| `npm test`                      | Código 0; 6 pruebas aprobadas (resolución React, errores sin payloads, guardas locales, secretos/CORS, dataset y setup idempotente)                                          |
| `npm run build`                 | Código 0; backend Medusa, Admin Vite y Next compilados; `/demo` generado estáticamente                                                                                       |
| `npm ci --dry-run` offline      | Código 0; comprobación de coherencia de lockfile, no reinstalación completa                                                                                                  |
| `npm ls react react-dom --all`  | Código 0; sin peers React inválidos; la prueba confirma Next/React 19 y Admin/React 18                                                                                       |
| Secretos generados vs cliente   | 420 archivos de JS/JSON/CSS/HTML/map revisados; JWT y cookie secret ausentes de los artefactos cliente de Next/Admin. Alcance limitado en `evidence/client-secret-scan.json` |
| Auditoría del árbol final       | 1825 paquetes auditados; 129 vulnerabilidades (71 moderadas, 58 altas). Revisión y remediación pendientes, sin upgrade forzado                                               |
| HTTP / E2E / capturas           | Bloqueados por EPERM al escuchar/conectar en 8000. Ningún caso E2E ni chequeo axe aprobado                                                                                   |
| PostgreSQL / seed / Admin login | No ejecutados con una base; pendientes. Arranque backend se detiene por conexión no configurada                                                                              |
| Git / commit                    | `git init` denegado por EPERM; sin repositorio ni commit creado                                                                                                              |

La ejecución consolidada de QA terminó a las 18:16:02 UTC (15:16:02 en el Mac). Se conservan los documentos y la preferencia por Shopify. No se modificó ningún sistema de la empresa. **F1/F2 siguen parciales por los ensayos pendientes; F3 y posteriores no están completados.**

### Pendiente exacto siguiente

1. Instalar PostgreSQL >=15 compatible con macOS 13 Intel, crear exclusivamente rol `dk_demo` y base `bioproductos_dk_demo`, configurar la conexión privada.
2. Desde Terminal normal: migrar, ejecutar seed dos veces secuencialmente, comparar IDs/conteos, editar stock y verificar persistencia tras reinicio. Seguir `VERIFICACION_BASE_DE_DATOS.md`.
3. Crear administrador DEMO, comprobar login y autorización del Admin; diseñar/probar roles y MFA según factibilidad.
4. Levantar Next, ejecutar smoke y Playwright y revisar capturas antes de aceptar responsive/AA. Ajustar con evidencia real.
5. Conectar/adaptar catálogo nativo a Chile y probar carrito, reglas CLP y sobreventa. Proveedores sandbox, correo, Blue Express y DTE permanecen pendientes de acceso autorizado.
6. Revisar dependencias antes de staging, crear primer commit desde la terminal local y conservar las restricciones de producción.

Se retiraron las descargas de scaffold, las herramientas temporales y los ensayos de instalación descartados. Se conserva la caché npm y la instalación final del proyecto.

## Sesión de auditoría del Home V2 — 2026-10-18

**Estado: rediseño pendiente de recibir el prompt V2 solicitado.** No se declara implementado ni verificado el nuevo Home. No se inició Bio Investigación ni otra página interior.

### Documentación y bloqueo comprobado

- Se leyeron los documentos disponibles en `docs/`, incluida la entrevista de terreno completa. Actualmente `AGENTS.md`, `README.md` y `PROMPT_INICIAL_CODEX.md` están dentro de `docs/`.
- La lectura de `docs/prompts/PROMPT_01_HOME_BIOPRODUCTOS_DK_PREMIUM_V2.md` falló porque el archivo no existe. Tampoco existe el directorio `docs/prompts/`. La búsqueda de nombres en el proyecto y en su carpeta padre solo encontró `docs/PROMPT_01_HOME_PREMIUM.md`.
- Se solicitó al usuario la ruta correcta o el contenido íntegro del V2. El prompt anterior se conserva como antecedente; no se asume equivalente a la versión que el usuario indicó expresamente como sustituta.

### Hallazgos para implementar cuando esté disponible el V2

- El Home existente está en `apps/storefront/src/app/demo/page.tsx`, con componente `src/modules/dk/home.tsx` y estilos `src/app/demo/demo.css`.
- La navegación actual utiliza anclas dentro de `/demo`. El middleware redirige `/` a `/demo` y bloquea el resto de las páginas en modo preview. Será necesario revisar esta frontera para permitir navegación editorial multipágina y conservar las restricciones comerciales.
- El Home existente consume ilustraciones SVG y referencias con precios/stock ficticios. El nuevo encargo exige espacios fotográficos vacíos y no inventar precios: esos elementos deberán dejar de aparecer en el nuevo Home, conservando los fixtures y el backend de prueba.
- La ruta independiente de Bio Investigación todavía no está implementada; no se desarrolló en esta sesión. Las rutas nativas de Medusa/Next se conservaron.
- Las pruebas E2E actuales comprueban `/demo`, filtros y navegación por anclas; habrá que adaptarlas al nuevo Home y sus destinos. No constituyen pruebas del rediseño solicitado.

### Comandos y verificaciones de esta sesión

- `cat docs/prompts/PROMPT_01_HOME_BIOPRODUCTOS_DK_PREMIUM_V2.md`: error de archivo inexistente.
- `rg --files` y búsqueda de nombres `PREMIUM_V2|HOME_BIOPRODUCTOS|PROMPT_01_HOME`: solo se encontró el prompt anterior.
- Lectura de documentación, manifiestos, middleware, layout, Home y configuración de pruebas: realizada.
- No se cambiaron código, dependencias, configuración ni medios. No se generaron, buscaron ni descargaron imágenes o videos.
- No se ejecutaron lint, TypeScript, build ni pruebas de navegador en esta sesión de auditoría documental. Los resultados del 17 de octubre permanecen como evidencia histórica y no certifican un Home V2.

**Siguiente paso:** recibir y leer íntegramente el V2; implementar exclusivamente Home y componentes globales necesarios; verificar navegación, responsive, accesibilidad, formato, lint, tipos, build y pruebas posibles. Registrar resultados reales y mantener Bio Investigación pendiente de aprobación explícita.

## Implementación del Home V2 — 2026-10-18

**Estado: S01–S12 implementadas; aceptación visual, responsive y de accesibilidad en navegador pendiente.** El V2 ya está disponible en `docs/PROMPT_01_HOME_BIOPRODUCTOS_DK_PREMIUM_V2.md` y se leyó íntegramente. Esa ubicación resuelve el bloqueo de la auditoría anterior; la subcarpeta `docs/prompts/` no existe. No se sustituyó por el prompt anterior.

### Cambios y alcance conservado

- Home real en `/`, dentro de `apps/storefront/src/app/(editorial)/`. Header sticky y footer compartidos con marca tipográfica, navegación multipágina y aviso de propuesta independiente.
- S01 header; S02 hero; S03 presentación; S04 cuatro pilares; S05 tres familias de productos; S06 proceso interactivo de cinco etapas; S07 avance científico; S08 líneas de soluciones; S09 economía circular; S10 fundadoras; S11 empresas/distribución; S12 cierre y footer. Composición, fuentes y límites en `DECISIONES_HOME.md`.
- `homeContent` tipado en `src/content/home.ts`; navegación/estados mínimos en `site.ts`; diez slots sin imágenes ni videos en `media.ts`. Colores provisionales y estilos `.dk2-*` aislados del comercio y de `/demo`. Manrope local ya instalada, sin nuevas dependencias.
- `MediaSlot` vacío, proporcional, sin imágenes rotas ni controles falsos, fuera del árbol accesible mientras no contenga material. Inventario completo en `diseno/INVENTARIO_MEDIOS_HOME.md`.
- Menú móvil nativo y mejora de foco, Escape, cierre exterior, scroll y cambio a escritorio. Proceso con tabs, flechas/Home/End, Enter/Espacio; alternativa con las cinco etapas sin JavaScript. Se mantiene el primer panel durante SSR/hidratación para evitar colapsar una lista extensa al iniciar JavaScript. Foco visible y movimiento reducido.
- Destinos independientes mínimos: `/nosotras`, `/bio-investigacion`, `/productos`, `/empresas`, `/contacto`, `/bio-impacto`, `/donde-comprar`, `/informacion-legal`. Todos indican sección en preparación y permiten volver al inicio. **No se desarrolló ninguna página interior completa ni Bio Investigación.**
- El middleware permite rutas editoriales exactas GET/HEAD sin consultar regiones Medusa. Preview conserva rechazo de operaciones y comercio; no se abre una familia de subrutas por prefijo. Las rutas nativas de Medusa permanecen.
- Familias provenientes del relato de terreno, señalizadas como referencia por confirmar; sin precios, stock, nombres comerciales inventados ni botones de compra. No hay catálogo persistente verificado. Sin premios, patentes, métricas, sellos, aliados, contactos o locales no ratificados.
- No se buscaron, generaron, descargaron, copiaron ni incorporaron activos de imagen/video. `/demo` y sus SVG/datos anteriores se conservan como antecedente, sin importarse ni enlazarse desde el nuevo Home. Los archivos OG originales del starter se conservan; el layout editorial excluye sus imágenes de los metadatos.
- Entradas nuevas `AGENTS.md` y `README.md` en la raíz enlazan los documentos completos conservados en `docs/` y explican el Home actual. El spec E2E y smoke anteriores se respaldaron en `.local/home-v2-before/` antes de adaptarlos. No se reinicializó el proyecto ni se alteraron versiones, backend, seeds o base de datos. Sin `.git` disponible ni commit creado.

### Fuentes y problemas reales

- Se releyeron las reglas/documentos obligatorios y la entrevista completa. Se intentó lectura textual de las siete páginas oficiales del V2; respondió Bio Impacto, cinco devolvieron timeout y Productos no estuvo accesible mediante la herramienta. No se afirma haber auditado visualmente el sitio. No se siguieron enlaces de imágenes.
- Bio-Renua/Bio-Clean y sus identidades aún no cuentan con material validado suficiente: se usan denominaciones funcionales de líneas, editables desde contenido. Contactos, políticas y locales permanecen pendientes de validación.
- `npm run dev:storefront`: Next falla con `listen EPERM` en `127.0.0.1:8000`, aunque su proceso devuelve código 0. Se registra como **arranque bloqueado**, nunca como servidor operativo.
- `npm run test:e2e`: código 1; Playwright se detiene al iniciar su webServer por el mismo EPERM, antes de ejecutar casos. `npm run smoke`: código 1; conexión local EPERM. Logs en `evidence/home-v2-e2e.log` y `evidence/home-v2-smoke.log`. No se eludieron restricciones del entorno.
- Persisten diez advertencias de lint en código previo del starter y advertencias Node por detección de módulos TypeScript en tests. No se desactivaron comprobaciones. La deuda de dependencias de la sesión anterior sigue pendiente; no se ejecutó una auditoría nueva ni upgrades forzados durante este alcance.

### Verificaciones y evidencia

| Control                             | Resultado de esta entrega                                                                                                                                                |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Formato, lint, tipos del monorepo   | Código 0 en `npm run verify`; lint 0 errores, 10 advertencias previas                                                                                                    |
| Tests de seguridad/base y Home      | 11 pruebas aprobadas en la ejecución final; incluye middleware real con NextRequest/NextResponse sin sockets, rutas sin consulta Medusa y bloqueo de comercio/mutaciones |
| Build Medusa/Admin y Next           | Código 0 en `npm run verify`; Home y ocho destinos se generan estáticamente                                                                                              |
| Última comprobación del frontend    | Formato, lint, tipos, tests y build ejecutados con el código final; log `evidence/home-v2-final-frontend.log`                                                            |
| HTML generado                       | Comprobación separada en `evidence/home-v2-html.json`: H1, S01–S12, diez slots vacíos, destinos independientes y ausencia de imágenes/video en main y OG/Twitter         |
| Contraste de colores sólidos        | Ocho combinaciones calculadas cumplen sus umbrales (texto >=4,5:1; foco >=3:1); `evidence/home-v2-contrast.json`. No equivale a auditoría completa en navegador          |
| Inventario Playwright               | 11 casos reconocidos por `playwright test --list`; siete anchos 320/375/390/768/1024/1440/1920, menú, navegación, teclado, movimiento reducido, medios, axe y sin JS     |
| HTTP / navegador / axe / responsive | **BLOQUEADOS** por permisos de escucha/conexión. Ningún caso E2E aprobado; no hay capturas ni grabaciones nuevas                                                         |
| Persistencia / comercio / Admin     | Fuera de esta etapa, pendientes de las pruebas con PostgreSQL ya documentadas                                                                                            |

Los resultados consolidados de compilación y controles del monorepo están en `evidence/verification.json`; las comprobaciones complementarias del Home tienen los logs indicados. Un HTML estático correcto no certifica hidratación, disposición visual, interacción en navegador o Core Web Vitals.

Cierre de esta entrega: `evidence/home-v2-summary.json` reúne el control final del frontend (código 0, once tests aprobados), el HTML comprobado y los bloqueos de navegador/smoke. El HTML final se comprobó después de terminar el último build, a las 04:38:58 UTC del 18 de octubre (01:38:58 en Santiago): un H1, doce bloques, diez contenedores vacíos, ocho destinos mínimos y ninguna etiqueta de imagen/video/ilustración en main ni imagen OG/Twitter. No se declara una revisión visual por esa comprobación.

### Ejecutar y revisar desde Terminal normal del Mac

```sh
cd /Users/baytriip/Desktop/Proyectos-Codex/bioproductos-dk
npm run setup:env
npm run dev:storefront
```

Abrir `http://127.0.0.1:8000/`. Si faltan dependencias, ejecutar primero `npm ci`. Mantener `DK_DEMO_PREVIEW=true` en el `.env.local` privado del storefront para los ensayos de preview. El Home no necesita base de datos. No revisar el nuevo diseño en `/demo`, que conserva la propuesta anterior.

En otra Terminal, desde la misma raíz: `npm run smoke` y `npm run test:e2e`. Revisar también los siete anchos, Tab/Shift+Tab, Escape, cierre exterior, etapas con flechas y navegación de ida/vuelta. Las pruebas no generan imágenes ni videos. Detener el servidor con Control-C.

**Pendiente siguiente:** ejecutar esos controles en una terminal con permisos normales, revisar el resultado visual y corregir únicamente problemas demostrados; validar copy, identidad y futuros originales con el usuario. La guía de edición está en README y `DECISIONES_HOME.md`. No incorporar material visual ni avanzar a Bio Investigación hasta recibir instrucciones/autorización específicas. **F2/Home no se declara aceptado de extremo a extremo mientras falten las pruebas de navegador.**

## Nueva dirección del Home: «Laboratorio vivo» — 2026-10-18

**Estado: rediseño implementado y compilado; aceptación visual, responsive e interacciones en navegador pendientes.** El usuario solicitó una dirección más viva y memorable, y autorizó explícitamente composiciones abstractas con CSS en las reservas. Esa instrucción sustituye la restricción visual del V2 anterior; no autoriza imágenes o videos. Se conserva todo el historial anterior como registro de esas entregas.

### Qué cambió y por qué

- Hero reconstruido como lienzo inmersivo verde profundo: titular «Ciencia que transforma. Una nueva forma de cuidar», geometría orgánica integrada, anotaciones flotantes, acento lima y dos CTA. Se elimina la dependencia de una gran caja vacía como punto focal.
- Barra delgada de ciencia/propuesta y header con marca tipográfica, navegación completa, CTA, hover y tratamiento al desplazarse. Se conserva el menú accesible y la navegación multipágina.
- Cuatro pilares con tratamientos distintos, motivos CSS y desniveles controlados. No son cuatro tarjetas idénticas.
- Tres familias destacadas con composiciones salvia/oliva/piedra, categorías, descripciones prudentes, chips y CTA reales. Se mantiene el aviso de catálogo por confirmar; sin precios, stock ni beneficios técnicos inventados.
- Narrativa científica anterior al producto, conservando las cinco etapas con teclado y alternativa sin JS. Bio Investigación tiene retícula técnica, composición propia y cuatro áreas de divulgación/antecedentes futuros, sin afirmar logros o patentes.
- Tres recorridos comerciales independientes: empresa, distribución y puntos de venta. Circularidad con anillos y contexto explícito de que la colaboración con residuos requiere protocolo y no hay programa público habilitado.
- Sección humana cálida con marcos superpuestos de fundadoras/marca, sin retratos ficticios. Cierre de mayor impacto con CTA a investigación/productos/contacto y footer más completo.
- `MediaSlot` conserva diez destinos de medios vacíos; añade capas abstractas de HTML/CSS separadas del destino y captions honestos. No hay imágenes, SVG, canvas, videos, renders de envases, stock ni fondos con URLs en el Home nuevo.
- `SiteEnhancements` mejora el header y añade entradas discretas de 320 ms, sin ocultar contenido inicialmente. Soporta movimiento reducido, cancela animaciones y limpia observadores/eventos. No hay movimiento continuo, scroll-jacking ni librerías nuevas.
- Los doce marcadores ahora corresponden a barra, header, hero, pilares, familias, ciencia, investigación, empresa, circularidad, personas, cierre y footer. Se alternan color, escala, densidad y composición para corregir la uniformidad del Home previo.

### Archivos principales y límites

- Modificados: `src/modules/dk/editorial/home.tsx`, `primitives.tsx`, `site-layout.tsx`; nuevo `site-enhancements.tsx`.
- Modificados: `src/app/(editorial)/editorial.css`, `src/app/(editorial)/page.tsx`, `src/content/home.ts`, `media.ts`, `site.ts` (todos dentro de `apps/storefront`).
- Actualizados: spec E2E, pruebas de contenido y smoke; README/AGENTS de raíz, `DECISIONES_HOME.md`, inventario y este ROADMAP. El inventario explica cómo sustituir las capas CSS al recibir los originales.
- Respaldos de código de la versión anterior en `.local/home-v3-before/`. Sin `.git` disponible ni commit creado. No se reinició el proyecto ni se cambiaron dependencias, versiones, backend, middleware, base, pagos, stock, Shopify o dominios.
- Las páginas interiores siguen siendo destinos mínimos; únicamente `/contacto` aclara el correo ya disponible en footer. **No se desarrolló Bio Investigación ni otra página completa.**

### Veracidad y fuentes

Se mantiene la entrevista como base de productos, procesos y necesidades. Se reintentaron las páginas públicas Home, Contacto y Bio Impacto en modo texto: las dos primeras dieron timeout; respondió [Bio Impacto](https://bioproductosdk.com/bio-impacto/). No se hizo auditoría visual ni se siguieron imágenes. El correo `biocontacto@bioproductosdk.com` y «Santiago, Chile» se publican con enlace a esa fuente. El sitio no envía correo: `mailto:` abre el cliente del visitante. Redes sociales, políticas, identidades de submarcas, logros y datos de catálogo siguen pendientes de respaldo; no se fabricaron para llenar el diseño.

### Resultados reales

| Control                                         | Resultado                                                                                                                                                                                                                                         |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run verify`                                | Código 0: formato, lint, tipos, once tests y build completo de Medusa/Admin/Next                                                                                                                                                                  |
| Lint                                            | 0 errores; 10 advertencias previas del starter, sin nuevos errores en componentes                                                                                                                                                                 |
| `npm run typecheck --workspace=@dtc/storefront` | Código 0; además del chequeo del monorepo                                                                                                                                                                                                         |
| `npm run format:check` final                    | Código 0; log `evidence/home-v3-format-final.log`                                                                                                                                                                                                 |
| HTML/CSS del build final                        | Código 0: un H1, doce bloques, diez composiciones y destinos vacíos; sin elementos de imagen/video/ilustración en main, sin imágenes OG/Twitter, sin canonical productivo y sin URLs de activos en el CSS editorial. `evidence/home-v3-html.json` |
| Contraste                                       | Catorce combinaciones sólidas cumplen texto >=4,5:1 y foco >=3:1. No certifica fondos con degradados ni auditoría completa. `evidence/home-v3-contrast.json`                                                                                      |
| `playwright test --list`                        | Código 0: once casos reconocidos para siete anchos, navegación, menú, proceso, axe y sin JS; log `evidence/home-v3-e2e-list.log`                                                                                                                  |
| `npm run test:e2e`                              | Código 1, bloqueado al iniciar webServer por `listen EPERM 127.0.0.1:8000`, antes de ejecutar casos. `evidence/home-v3-e2e.log`                                                                                                                   |
| `npm run smoke`                                 | Código 1, bloqueado por `connect EPERM 127.0.0.1:8000`. `evidence/home-v3-smoke.log`                                                                                                                                                              |

La compilación consolidada terminó a las 04:59:39 UTC (01:59:39 en Santiago). El HTML final se comprobó a las 05:00:18 UTC. Evidencia consolidada en `evidence/verification.json` y resumen de esta dirección en `evidence/home-v3-summary.json`. No se generaron capturas ni grabaciones. No se declaran responsive, Core Web Vitals, interacciones o axe aprobados sin navegador; los once tests unitarios no sustituyen esos casos.

### Ejecutar y revisar

```sh
cd /Users/baytriip/Desktop/Proyectos-Codex/bioproductos-dk
npm run setup:env
npm run dev:storefront
```

Abrir **http://127.0.0.1:8000/**. No usar `/demo`. Si faltan dependencias, ejecutar primero `npm ci`. Mantener `DK_DEMO_PREVIEW=true` en el archivo privado del storefront. No hace falta PostgreSQL para revisar el Home.

En otra Terminal, desde la misma raíz: `npm run smoke` y `npm run test:e2e`. Revisar 320/375/390/768/1024/1440/1920 px, scroll/header, contraste sobre las composiciones, teclado, menú, proceso y movimiento reducido. Detener con Control-C.

**Pendiente siguiente:** revisar esta dirección en el navegador local con permisos normales y ajustar con evidencia; validar marca/copy y URLs sociales, y recibir originales solo en una instrucción posterior. No avanzar a Bio Investigación sin aprobación. La composición actual ya no depende de las fotografías para tener intención visual, pero su aceptación visual sigue pendiente de revisión real.

## Adopción del Contexto Maestro y auditoría de alineación — 2026-10-18

**Estado: lectura, diagnóstico y documentación; sin desarrollo de páginas ni cambios en el Home.** Se adopta oficialmente `docs/MASTER_CONTEXT.md`, versión 1.0, como referencia central de visión, negocio, audiencias, veracidad, arquitectura de información y secuencia de trabajo. Esto no constituye autorización de la empresa para migrar, publicar o intervenir producción.

### Acuerdo de trabajo vigente

1. Las instrucciones actuales del responsable delimitan el trabajo autorizado. En esta sesión solo se analiza el proyecto y se actualiza este ROADMAP.
2. Se conservan las restricciones de seguridad ya instruidas: sistemas reales intocables, secretos privados, datos sintéticos, comercio coherente, autorización en servidor y resultados comprobables. La ausencia actual del archivo íntegro de reglas no las debilita.
3. El Contexto Maestro centraliza la visión y las prioridades. PRD, arquitectura y aceptación detallan requisitos; los prompts específicos solo se ejecutan cuando el usuario autorice su etapa. El ROADMAP y la evidencia describen el estado real; una aspiración del Maestro no equivale a una función implementada.
4. Se trabaja una página por vez. La página requiere implementación, revisión visual/funcional y aprobación expresa. No se avanza automáticamente ni se transforma el sitio en una landing única.
5. Para la futura V3 prevalece el Maestro sobre las decisiones visuales históricas contradictorias: reservas de foto/video realmente vacías, vida editorial en tipografía, composición, color y detalles discretos alrededor de ellas. No se incorporan activos de imagen/video.

### Lecturas y ubicaciones efectivamente encontradas

Se leyó íntegramente el Maestro (567 líneas), el prompt de adopción, PRD, ROADMAP anterior y la entrevista completa; se revisaron AGENTS/README disponibles, arquitectura, UX/UI, aceptación, datos/contenido, decisiones técnicas y de Home, diagnóstico, protocolo de PostgreSQL e inventario de medios, junto con código y evidencias existentes.

| Solicitado / citado                                | Ubicación actual / diagnóstico                                                                                            |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `AGENTS.md`                                        | No está en raíz. `docs/AGENTS.md` tiene 7 líneas y remite a `docs/AGENTS.md`; no contiene las reglas completas anteriores |
| `README.md`                                        | No está en raíz. La guía actual está en `docs/README.md`                                                                  |
| `docs/MASTER_CONTEXT.md`                           | Existe; se adopta como fuente central                                                                                     |
| `docs/prompts/PROMPT_CODEX_LEER_MASTER_CONTEXT.md` | No existe en esa ruta; se encontró y leyó `docs/PROMPT_CODEX_LEER_MASTER_CONTEXT.md`                                      |
| Entrevista                                         | `docs/ENTREVISTA_TERRENO_BIO_DK.md`; no existe `docs/investigacion/`                                                      |
| Inventario                                         | `docs/INVENTARIO_MEDIOS_HOME.md`; no existe la ruta anterior `docs/diseno/INVENTARIO_MEDIOS_HOME.md`                      |

No se movieron documentos ni se crearon copias competidoras. La revisión de enlaces Markdown encontró seis destinos locales inexistentes en AGENTS/README: sus enlaces con prefijo `docs/` ahora resuelven dentro de `docs/docs/`, y el inventario todavía se cita en una subcarpeta que no existe. Esto requiere normalización documental, no reinstalar la aplicación. Sin Git no se puede atribuir la causa de las diferencias a una operación concreta; se registra el estado observado.

### Qué se comprende del producto

La candidatura de INACAP debe demostrar una experiencia de marca que comunica ciencia y una operación comercial sencilla desde celular. La empresa prefiere actualmente Shopify: demostrar una alternativa no concede permiso para reemplazarlo ni garantiza ahorros. Se distinguen comprador B2C, empresa/distribuidor B2B, colaborador científico y equipo administrador.

Inicio introduce y dirige; Nosotras desarrolla la historia; Bio Investigación profundiza ciencia; Productos gestiona catálogo/venta de prueba; Empresas atiende relaciones privadas; Bio Impacto explica circularidad; Dónde comprar publica locales verificados; Contacto gestiona solicitudes. Comercio, administración y reportes deben funcionar sobre datos persistentes de ensayo, con estados coherentes e integraciones sandbox verificables cuando exista acceso.

| Estado del dato                   | Tratamiento                                                                                                                                                                             |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Confirmado en entrevista          | Prioridades de inicio/ciencia/tienda, relato de dos detergentes, tres champús y tres sales, necesidades B2B, logística y reportes; no se trata como catálogo vigente sincronizado       |
| Referencia científica testimonial | Residuos seleccionados, preparación, molienda, investigación/nanoemulsiones y controles; no se publica protocolo industrial, no se universaliza a todos los productos                   |
| Por validar                       | SKU/nombres/precios/stock/gramajes, identidades y paletas de submarcas, biografías, locales, patentes y sus estados, autorizaciones sanitarias específicas, resultados y textos legales |
| Propuesta del equipo              | Dirección visual, arquitectura editorial, mejoras de administración y eventual programa de colaboración con residuos; no se presenta como servicio ya aprobado                          |
| DEMO                              | Ocho fixtures de ensayo, precios y stock sintéticos; futuros pedidos/reportes solo serán demostrables tras persistir y reconciliar datos                                                |

El Maestro menciona nombres de fundadoras para verificar; no autoriza publicarlos como biografías confirmadas. La idea de donar residuos sigue requiriendo un protocolo y aprobación, sin descuentos ni retiros prometidos.

### Estado real de la implementación

| Área                  | Existe                                                                                                                                          | Falta para aceptarla                                                                                                                     |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Arquitectura          | npm workspaces, starter oficial, Medusa 2.21.2 en `apps/backend`, Next 15.5.24/TypeScript/Tailwind en `apps/storefront`                         | Validación operativa completa, repositorio Git y trazabilidad del equipo                                                                 |
| Home `/`              | Dirección «Laboratorio vivo», header/footer, contenido tipado, diez reservas, menú, proceso interactivo y mejoras de scroll/movimiento reducido | Alineación con el Maestro, revisión visual, responsive, teclado/axe y aprobación del responsable                                         |
| Páginas corporativas  | Ocho rutas independientes con aviso honesto de preparación                                                                                      | Cada página completa, una por etapa; no se considera sitio corporativo terminado                                                         |
| Comercio              | Código nativo del starter para catálogo, fichas, carrito, cuenta, checkout y órdenes; capa SDK Medusa conservada                                | Conexión, adaptación CLP/Chile, persistencia, sobreventa, errores y compra E2E. Está bloqueado intencionalmente en preview               |
| Datos                 | Fixtures sintéticos y seed DK con flujos nativos y controles locales                                                                            | PostgreSQL/configuración, migraciones, seed dos veces, reconciliación y persistencia tras reinicio. Idempotencia no verificada en base   |
| Admin                 | Admin nativo compilable                                                                                                                         | Arranque con DB, usuario y login de ensayo, permisos/roles, MFA según factibilidad, auditoría y uso móvil comprobados                    |
| Analítica/formularios | Requisitos y rutas de destino previstas                                                                                                         | Métricas calculadas de pedidos persistentes, exportaciones seguras, almacenamiento/entrega de solicitudes y acceso autorizado            |
| Proveedores           | Referencias y límites documentados; retorno de pagos deshabilitado                                                                              | Adaptadores DK y pruebas autorizadas de Webpay/Mercado Pago, Blue Express, DTE y correo. No hay conexión de estos proveedores demostrada |

`/demo` conserva la propuesta antigua con SVG y datos de prueba; no es el Home actual. No se borró. Las rutas nativas comerciales siguen bajo `/{countryCode}/...`; las rutas objetivo `/productos/[slug]`, `/carrito` y `/checkout` todavía requieren una estrategia de presentación sobre el motor existente, sin duplicarlo. El endpoint de salud declara `backend: not-probed`: su existencia no certifica Medusa ni PostgreSQL.

### Diagnóstico y verificaciones nuevas de esta sesión

- Mac Intel, macOS 13.7.8, Node 24.16.0, npm 11.13.0, Git 2.39.2. `psql` y `pg_isready` no están disponibles en PATH; el diagnóstico no obtuvo conexión a 5432/8000/9000/5173. Una conexión denegada no demuestra ausencia de todo servicio instalado.
- Se comprobó únicamente presencia/configuración y permisos de archivos privados, sin imprimir valores: `.env` del backend y `.env.local` del storefront existen con modo 0600; `DATABASE_URL` está sin configurar y preview está activo. No se alteraron secretos ni configuración.
- `git status --short` devolvió 128: no hay repositorio `.git`. No se creó ni reinicializó uno.
- Se ejecutaron controles nuevos, secuenciales, con logs separados para conservar la evidencia histórica. El antiguo conflicto de resolución React no se reprodujo en las pruebas y builds actuales; no se afirma por eso que todo el runtime esté validado.

| Comando                | Resultado nuevo                                                                                                       |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `npm run doctor`       | Código 0; diagnóstico descrito, sin certificar disponibilidad de servicios                                            |
| `npm run format:check` | Código 0                                                                                                              |
| `npm run lint`         | Código 0; 0 errores y 10 advertencias del código previo del starter                                                   |
| `npm run typecheck`    | Código 0; backend y storefront                                                                                        |
| `npm test`             | Código 0; 11 pruebas aprobadas de seguridad, configuración, resolución, contenido y middleware                        |
| `npm run build`        | Código 0; backend Medusa, Admin y Next compilados. Terminó el 18 de octubre a las 05:55:38 UTC (02:55:38 en Santiago) |
| `npm run test:e2e`     | Código 1; webServer detenido por `listen EPERM 127.0.0.1:8000`, antes de ejecutar casos                               |
| `npm run smoke`        | Código 1; `connect EPERM 127.0.0.1:8000`                                                                              |

La ejecución consolidada está en `evidence/master-context-verification.json`; logs en `evidence/master-context-{format-check,lint,typecheck,test,build,doctor,e2e,smoke}.log`. No se reaprovecharon resultados históricos como si fueran pruebas nuevas. No se generaron capturas ni grabaciones. Las restricciones de puertos son un bloqueo del entorno; no prueban una falla funcional del Home ni permiten declararlo correcto visualmente.

La última auditoría de dependencias conservada es del **17 de octubre**: reportó 129 avisos (71 moderados y 58 altos). No se realizó un audit nuevo ni se afirma que esos conteos sean una evaluación vigente; requiere revisar/remediar y comprobar de nuevo antes de staging. El build exitoso no certifica seguridad, autenticación o integraciones.

### Qué corregir antes o durante el próximo Home V3

1. **Documentación y resguardo.** Restablecer una entrada AGENTS completa/canónica y README en raíz, enlazar el Maestro, corregir rutas relativas y mantener una única entrevista/inventario. Preparar Git y un estado revisable antes de más código. En esta sesión solo se propone; no se reubicó ni reescribió documentación ajena.
2. **Alineación de medios.** El Home actual no carga archivos, pero `.dk2-art` ocupa visualmente los marcos. Un `div` vacío detrás de una capa decorativa no satisface por sí solo la nueva exigencia de reserva visualmente vacía. Para V3, trasladar geometría discreta al entorno/bordes de las reservas, mantener su interior sin sustitutos y ajustar su escala para evitar rectángulos gigantes. Revisar captions repetidos de fotografía futura para que no parezcan instrucciones públicas de edición.
3. **Continuidad visual.** Evaluar primero el Home existente en navegador. Conservar componentes útiles, verde científico, contenido tipado y navegación; refinar foco del hero, jerarquía producto/ciencia, densidad y ritmo. No volver a construir el monorepo ni emitir un juicio visual como si se hubieran visto capturas que no están disponibles en esta sesión.
4. **Integración posterior de originales.** Hoy existe un registro de reservas, pero no una rama de carga/renderizado local de fotos aportadas. Preparar en V3 una interfaz opcional y manual, sin incorporar archivos, que permita al responsable añadir los suyos sin rehacer layouts. Mantener controles de video ausentes mientras no exista material.
5. **Aceptación demostrada.** Repetir controles y ejecutar HTTP/Playwright desde una terminal con permisos normales; revisar 320/375/390/768/1024/1440/1920, foco, menú, tabs, movimiento reducido, contraste y overflow. Reconciliar observaciones reales y esperar aprobación del responsable.

### Archivos concretos previstos para la próxima etapa, todavía sin editar

- `apps/storefront/src/modules/dk/editorial/home.tsx`: composición y jerarquía de la portada.
- `apps/storefront/src/modules/dk/editorial/primitives.tsx` y `src/content/media.ts`: contrato de reserva vacía y futura fuente local manual.
- `apps/storefront/src/app/(editorial)/editorial.css`: tokens provisionales, ritmo, responsive y decoraciones exteriores a las reservas.
- `apps/storefront/src/content/home.ts` y `site.ts`: mensajes, trazabilidad y destinos coherentes.
- `site-layout.tsx`, `navigation.tsx`, `site-enhancements.tsx` y `process-steps.tsx` del mismo módulo: conservar/refinar solo cuando la revisión de Home lo justifique.
- `src/app/(editorial)/page.tsx`/`layout.tsx`, `tests/e2e/preview.spec.ts`, `tests/home-content.test.mjs` y `scripts/smoke.mjs`: metadatos y verificaciones según cambios reales.
- Documentos vigentes `docs/DECISIONES_HOME.md`, `docs/INVENTARIO_MEDIOS_HOME.md` y este ROADMAP: decisiones y evidencia, respetando las ubicaciones reales hasta normalizarlas.

**Secuencia adoptada del Maestro:** Home V3 → Nosotras → Bio Investigación → Productos → Empresas → Bio Impacto → Dónde comprar → Contacto; después los hitos de comercio/checkout, Admin, integraciones y QA, verificando infraestructura desde que cada flujo la necesite. Este orden sustituye las referencias antiguas a Bio Investigación como siguiente página inmediata. Cada etapa espera aprobación; no es autorización para iniciarlas ahora.

**Cierre de sesión:** solo se añadió este registro al ROADMAP y se generó evidencia de diagnóstico/pruebas. No se programó ninguna página, no se modificó el Home ni se añadieron medios. El siguiente trabajo autorizado queda a la espera de la confirmación del responsable para Home V3 alineado con el Contexto Maestro; la dirección existente y los archivos `home-v3-*` son antecedentes, no una aceptación visual aprobada.

---

## 2026-10-18 — Home fotográfico: «Ciencia que se vive»

**Alcance autorizado:** rediseño completo del Home sobre el frontend existente en `apps/storefront`, usando exclusivamente las fotografías originales aportadas a `apps/storefront/public/images/home/`. La instrucción posterior del usuario sustituye para estas fotos la prohibición histórica de incorporar medios. No autoriza stock, generación, descargas ni videos. No se desarrollan otras páginas.

**Estado del hito:** implementación y compilación verificadas; aceptación visual, responsive y accesibilidad en navegador **pendientes** por bloqueo de puertos del entorno. No se declara finalizado de extremo a extremo ni listo para producción.

### Inspección y dirección de arte

Se revisaron las rutas/componentes existentes, el registro de contenido, el contexto y los documentos del proyecto. Se inspeccionaron visualmente las seis fotografías antes de elegir su uso:

| Archivo original en `apps/storefront/public/images/home/` | Clasificación                                                           | Uso implementado                                                |
| --------------------------------------------------------- | ----------------------------------------------------------------------- | --------------------------------------------------------------- |
| `foto principal.JPG`                                      | Marca + productos, escena panorámica                                    | S03 hero, composición con capas; foto en la base en móvil       |
| `detergente modelo.JPG`                                   | Producto individual, botella con flores                                 | S05 detergentes                                                 |
| `jabon modelo.JPG`                                        | Producto sólido; la etiqueta visible confirma champú para cabello graso | S05 champús sólidos, sin inventar SKU ni ficha vigente          |
| `sales de bañoo.JPG`                                      | Producto, tres bolsas kraft de sales                                    | S05 sales de baño                                               |
| `detergente.JPG`                                          | Productos en repisa / contexto comercial                                | S08 Empresas; no se presenta como stock ni capacidad industrial |
| `Dueñas dk.JPG`                                           | Fundadoras/equipo + marca                                               | S10 Nosotras; encuadre centrado en las personas                 |

Los nombres con ñ están normalizados en NFD en el disco; no se renombraron. No hay fotografías dedicadas de laboratorio, procesos de residuos o instalaciones científicas. S06 utiliza cuaderno editorial y secuencia interactiva, S07 un mapa tipográfico de I+D y S09 un diagrama conceptual de circularidad. No se atribuye evidencia científica a fotografías comerciales ni se inventan imágenes para esos espacios. Se usan los seis archivos, cada uno una sola vez, con intención distinta. Inventario detallado: `docs/INVENTARIO_MEDIOS_HOME.md`.

Cuatro archivos con extensión `.JPG` son HEIC/HEVC. Sips falló al convertirlos; la versión local de Sharp puede leer sus metadatos pero no decodificar HEVC. Se resolvió con `heic-convert@2.1.0` como herramienta aislada en `.local/photo-tools`, seguida de Sharp existente. Se prepararon **18 WebP** en `public/images/home/optimized/`, sin EXIF/GPS, con orientación corregida y sin retocar el contenido. Los seis originales conservan su SHA-256 inicial. Los derivados suman 3.125.496 bytes; el conjunto intermedio suma 850.558 bytes, distribuido entre hero y fotos diferidas. Esto no es una medición de transferencia del navegador.

### Qué cambia y por qué

- Hero fotográfico continuo de gran escala, titular y acento verde lima, gradiente de lectura, dos CTA principales y ficha enlazada; sin video ni carrusel automático. En móvil la fotografía conserva un área protagonista bajo el texto.
- Barra superior, cabecera sticky, navegación y footer compartidos conservados y refinados. La etiqueta pública usa **Empresas**. El menú abierto elimina el filtro del header para que su overlay fijo alcance el viewport después de scroll.
- Pilares con formas, tonos y alturas propios; productos con fotografías grandes, marcos distintos y ritmo alternado. Se muestran familias documentadas sin precios, stock, descuentos, certificaciones ni claims copiados de etiquetas.
- Narrativa de ciencia con cuaderno de ideas, materiales mencionados en la entrevista y cinco tabs accesibles existentes. Bio Investigación incorpora cuatro desplegables nativos de adelanto, sin desarrollar la página interior ni declarar verificados logros/patentes/licencias.
- Empresas con foto contextual y tres recorridos; circularidad sobre fondo verde cálido y explicación responsable de una colaboración futura; Nosotras con retrato real y anotación editorial; cierre de gran tipografía con tres destinos.
- `HomePhoto` centraliza alt, `srcSet`, `sizes`, dimensiones y prioridad. Solo el hero usa carga inmediata/alta; el resto es diferido. Se mantienen los ajustes globales de imágenes del starter: `<img>` nativo tiene una excepción de lint localizada y justificada para servir las variantes locales ya optimizadas.
- Movimiento reducido conserva contenido estático; menú con teclado, Escape y fallback sin JS, tabs con flechas/Home/End, foco visible y revelado progresivo siguen disponibles. Los diagramas son conceptuales, sin métricas ambientales inventadas.

No se modificaron Shopify, dominios, servicios reales, backend, base de datos, pagos ni datos de clientes. Las ocho rutas editoriales interiores siguen siendo páginas independientes con aviso de preparación. No hay tienda ni formulario operativo nuevo en este hito. No se añadieron redes sociales sin URL confirmada ni se presentaron políticas pendientes como vigentes.

### Archivos modificados y añadidos

**Aplicación:**

- `apps/storefront/src/modules/dk/editorial/home.tsx`: nueva composición de las diez secciones del cuerpo.
- `apps/storefront/src/modules/dk/editorial/primitives.tsx`: `HomePhoto` sustituye los marcos sin fuentes.
- `apps/storefront/src/app/(editorial)/editorial.css`: dirección fotográfica, estilos globales necesarios, interacción y adaptaciones responsive.
- `apps/storefront/src/content/media.ts`: registro de las seis fotos, alt, dimensiones, encuadres y variantes.
- `apps/storefront/src/content/home.ts`: ajustes editoriales de productos, sin datos comerciales inventados.
- `apps/storefront/src/content/site.ts`: navegación «Empresas», preservando destinos.
- **Añadidos:** los 18 `apps/storefront/public/images/home/optimized/*.webp`, derivados únicamente de los originales.

**Preparación y QA:**

- **Añadido:** `scripts/prepare-home-photos.mjs` para regeneración opcional reproducible, conservando originales.
- `scripts/smoke.mjs`: Home actual y respuestas WebP de las seis fotos.
- `tests/home-content.test.mjs`: integridad de originales y decodificación/dimensiones de los 18 derivados, además de contenido/rutas.
- `tests/editorial-middleware.test.mjs`: verifica con el matcher real de Next que las 18 variantes no pasan por el bloqueo comercial del preview.
- `tests/e2e/preview.spec.ts`: sustituye las antiguas expectativas de marcos vacíos por carga de fotos locales; conserva siete anchos, menú, rutas, teclado, axe y sin JS, e incorpora los desplegables de investigación.

**Documentación:** `docs/AGENTS.md`, `docs/README.md`, `docs/DECISIONES_HOME.md` y `docs/INVENTARIO_MEDIOS_HOME.md` incorporan el alcance vigente y mantienen sus antecedentes. Este ROADMAP se amplía sin reescribir su historial. El Contexto Maestro y la entrevista se conservan.

Evidencia nueva: `evidence/home-photos-{originals,assets,verification,html,contrast,roadmap-before}.json` y logs `home-photos-*`. Respaldos de archivos existentes en `.local/home-real-photos-before/`. No se inicializó Git ni se creó un repositorio nuevo; continúa pendiente restablecer la entrada canónica de reglas y versionado del equipo, diagnosticado en la sesión anterior.

### Verificaciones ejecutadas en esta sesión

| Comando / control                      | Resultado real                                                                                                                                                                                                                                |
| -------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `node scripts/prepare-home-photos.mjs` | 18 WebP preparados desde seis originales; hashes conservados                                                                                                                                                                                  |
| `npm run format:check`                 | Código 0; repetido después del ajuste final de tests                                                                                                                                                                                          |
| `npm run lint`                         | Código 0; 0 errores, las 10 advertencias previas del starter                                                                                                                                                                                  |
| `npm run typecheck`                    | Código 0; backend y storefront                                                                                                                                                                                                                |
| `npm test`                             | **13/13 aprobadas** en la ejecución final. La primera detectó una tolerancia incorrecta al comparar proporciones redondeadas a píxeles; se corrigió el test para comprobar altura esperada y se volvió a ejecutar. Se conserva el log inicial |
| `npm run build`                        | Código 0; Medusa/Admin y Next compilados. Home y ocho destinos editoriales prerenderizados                                                                                                                                                    |
| Auditoría del HTML generado            | Seis fotos locales con alt/dimensiones y tres candidatos por `srcSet`, 12 marcadores, un h1 y enlaces a ocho páginas independientes; sin reservas anteriores ni videos                                                                        |
| Contraste de nueve pares sólidos       | Todos sobre 4,5:1; mínimo aproximado 5,05:1. Cálculo de paleta, **no** auditoría visual de fotografías ni axe                                                                                                                                 |
| `npm run test:e2e -- --list`           | Código 0; 11 casos reconocidos, incluyendo siete anchos de 320 a 1920 px. Listar no equivale a ejecutarlos                                                                                                                                    |
| `npm run dev:storefront`               | Falla de escucha `listen EPERM 127.0.0.1:8000`, aunque Next devuelve código 0; no se interpreta como arranque correcto                                                                                                                        |
| `npm run test:e2e`                     | Código 1; servidor detenido por el mismo `EPERM`, antes de ejecutar los casos de navegador                                                                                                                                                    |
| `npm run smoke`                        | Código 1; `connect EPERM 127.0.0.1:8000`                                                                                                                                                                                                      |

No se generaron imágenes nuevas, capturas ni grabaciones; solo derivados de formato/tamaño de las seis fotografías aportadas. La verificación de píxeles/HTML y el build no sustituyen revisión de encuadres, overflow, zoom, CLS, rendimiento real, contraste sobre foto y accesibilidad con navegador. Esos controles continúan pendientes; no se declara un resultado «10/10» comprobado ni el sitio completo terminado.

### Ejecutar y siguiente paso

En una Terminal normal del Mac, con las dependencias y entorno existentes:

```sh
cd /Users/baytriip/Desktop/Proyectos-Codex/bioproductos-dk
npm run dev:storefront
```

Abrir **http://127.0.0.1:8000/**. Mantener `DK_DEMO_PREVIEW=true`; el Home no requiere backend ni PostgreSQL. Para detener, Control-C. En una segunda Terminal con el frontend levantado: `npm run smoke` y `npm run test:e2e` (Chrome instalado). No ejecutar build simultáneo con dev porque comparten `.next`. Los WebP están preparados; no hace falta convertir fotos para revisar. La regeneración opcional y sus comandos están en el inventario.

**Pendiente inmediato:** revisión real de los siete anchos, zoom 200%, recortes del hero/productos/personas, navegación, foco/menú, tabs/desplegables, sin JS y movimiento reducido; corregir cualquier regresión que aparezca y obtener aprobación del Home. No se avanza a Nosotras, Bio Investigación ni otra página sin la siguiente aprobación del responsable. Las integraciones y funciones de comercio pendientes conservan su estado anterior.

---

## 2026-10-18 — Ajuste del Home: retirar cierre «Sigamos explorando»

Solicitud del usuario: eliminar el bloque «Sigamos explorando / ↗ / Otra mirada. Nuevas posibilidades.». Se retiró la sección completa S11, incluidos su texto secundario y botones. Ahora el adelanto de Nosotras (S10) conecta directamente con el footer (S12); se conservan los demás IDs, rutas, fotografías y componentes.

Archivos: `apps/storefront/src/modules/dk/editorial/home.tsx`, `apps/storefront/src/content/home.ts`, `apps/storefront/src/app/(editorial)/editorial.css` y `tests/e2e/preview.spec.ts`. Se eliminaron también datos/tipos y estilos exclusivos del cierre, y se ajustaron los tests existentes a 11 marcadores y al footer como destino de scroll. No se añadieron tests para esta eliminación visual. Respaldos en `.local/home-remove-closing-before/`.

Verificación nueva: `npm run format:check`, `npm run lint --workspace=@dtc/storefront`, `npm run typecheck --workspace=@dtc/storefront`, `npm test` (13/13) y `npm run build --workspace=@dtc/storefront` aprobaron. Lint conserva 10 advertencias previas. `npm run test:e2e -- --list` reconoce los 11 casos; no equivale a ejecutarlos. Se comprobó el HTML compilado: cierre ausente, seis fotos conservadas y secuencia final S10 → S12. Logs y resultados en `evidence/home-remove-closing-*`.

No se repitieron HTTP/Playwright: el bloqueo de puertos `EPERM` del entorno ya está documentado y no hay un cambio de permisos. La revisión visual continúa pendiente. Revisar `/` en `http://127.0.0.1:8000/` con `npm run dev:storefront`. El siguiente trabajo sigue siendo ajustar el Home según indicaciones del usuario; no se avanzó a otra página.

---

## 2026-10-18 — Recopilación de requisitos y prompts por etapas

El usuario volvió a facilitar la entrevista completa y pidió recopilar información, organizar el trabajo paso a paso y preparar prompts para Codex CLI. Se revisaron el contexto/documentación, manifests/rutas y evidencia existente; se contrastó el sitio público solo en lectura textual. La apertura directa de Inicio, Nosotras, Bio Investigación y Empresa dio timeout; se recuperaron sus textos indexados. Bio Impacto respondió directamente. No se descargaron medios ni se enviaron formularios; no hubo acceso a Shopify, cuentas privadas o datos comerciales.

Se añadió `docs/PLAN_DE_TRABAJO_Y_PROMPTS.md`: requisitos trazados a la entrevista, fuentes web y límites de consulta, estado de la base actual, información pendiente con responsables, secuencia 00–16, un prompt maestro y prompts separados para cada etapa. Distingue preferencia de las fundadoras por conservar Shopify de la aspiración del equipo de demostrar una alternativa; la eventual migración requiere aprobación, evaluación de costo total y revisión independiente. No se afirma que una patente, permiso sanitario o cifra ambiental esté acreditada por aparecer en la entrevista o en el sitio.

Se preguntó si corresponde continuar la carpeta existente o preparar un proyecto separado; sin respuesta al redactar este registro. No se creó ni se copió ninguna aplicación. El plan utiliza la base existente como inventario y deja esa decisión pendiente antes de acciones de creación/copia. Preparar los prompts futuros no autoriza ejecutarlos ni desarrollar otra página; el primer prompt es exclusivamente de diagnóstico y alcance.

Verificación: formato del documento nuevo con Prettier, bloques de código balanceados, 16 prompts posteriores al diagnóstico y existencia de los documentos locales referenciados. No se modificaron código, dependencias, imágenes, configuración, backend ni base de datos; no se reejecutaron pruebas de aplicación para cambios exclusivamente documentales. Las 13 pruebas y builds aprobados citados son evidencia de sesiones anteriores, no resultados nuevos. Se mantiene pendiente la verificación de navegador por el bloqueo EPERM documentado.

Siguiente paso: resolver continuidad de carpeta, fecha/equipo/alcance de entrega, cerrar la revisión del Home y acordar una única siguiente etapa. No se avanza automáticamente a Nosotras, Bio Investigación, tienda ni migración.

---

## 2026-10-18 — Solo header: identidad, legibilidad y cinta de mensajes

El usuario pidió ir paso a paso y trabajar exclusivamente el header: más identidad, tipografía más grande, interacción más amigable y trasladar debajo del menú la antigua franja superior, reemplazándola por mensajes positivos en bucle.

### Implementación

- Marca tipográfica existente más presente (29 px en escritorio, adaptada a móvil), descriptor «Ciencia para cuidar lo cotidiano», acento bajo DK y enlaces de navegación de 15 px (antes 12 px). CTA «Ver productos» con mayor área de clic y respuesta visual. No se inventó ni descargó un logotipo.
- Estados hover/activo con fondo salvia, foco visible, CTA y menú móvil más cómodos. Header sticky de mayor altura y margen de scroll ajustado a 132 px para referencias internas.
- Menú compacto por debajo de 1280 px para dar espacio a la tipografía. El breakpoint del control de cierre al redimensionar coincide con el CSS; se conservaron Escape, foco, restauración del scroll y fallback sin JS.
- La antigua `.dk2-preview` se retiró. La nueva cinta aparece **después del header**, antes del cuerpo; acompaña el flujo normal y deja sticky únicamente la navegación. Se conservan IDs S02 (header) y S01 (cinta), ahora en ese orden por solicitud del usuario.
- Bucle CSS lineal de 45 segundos con dos grupos de igual ancho, sin animar posición de layout. La copia decorativa usa `aria-hidden`; los lectores reciben una sola lista de cinco mensajes, sin región live ni anuncios reiterados.
- Pausa al pasar el mouse o dar foco a la cinta y pausa persistente mediante checkbox nativo con etiqueta accesible. No requiere JavaScript. Sin soporte de `:has`, la base queda estática y no ofrece control de movimiento inoperante. Con movimiento reducido se elimina la animación y la copia, se muestran los mensajes estáticos y se oculta el control que deja de ser necesario.
- Se conservan avisos de propuesta/sin compra en el cuerpo y el footer; no se habilitó comercio. No se modificaron hero, productos, demás secciones, fotografías, backend o base de datos. Comparación AST de CSS: 407 reglas ajenas al header conservadas, salvo el margen de scroll global necesario para su nueva altura.

Mensajes editoriales inspirados en la entrevista, centralizados en `brandMessages` de `src/content/site.ts`:

1. Hay ciencia detrás de cada producto.
2. Una nueva mirada para lo cotidiano.
3. Investigar. Crear. Cuidar.
4. Más posibilidades para los materiales orgánicos.
5. Conectemos ideas que puedan transformar.

Son frases de propósito y divulgación; no se añadieron métricas, sellos, resultados ambientales, patentes ni promociones.

### Archivos y verificación

Modificados: `apps/storefront/src/modules/dk/editorial/site-layout.tsx`, `navigation.tsx`, `apps/storefront/src/content/site.ts`, `apps/storefront/src/app/(editorial)/editorial.css` y `tests/e2e/preview.spec.ts`. Añadido `apps/storefront/src/modules/dk/editorial/brand-ribbon.tsx` como componente de servidor, sin paquetes ni JavaScript cliente adicional. Respaldos previos en `.local/header-identity-before/`.

| Comando/control nuevo                                                                          | Resultado                                                                                                                             |
| ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run format:check`                                                                         | Código 0                                                                                                                              |
| `npm run lint --workspace=@dtc/storefront`                                                     | Código 0; 10 advertencias previas, sin errores                                                                                        |
| `npm run typecheck --workspace=@dtc/storefront`                                                | Código 0                                                                                                                              |
| `npm test`                                                                                     | 13/13 aprobadas, incluida integridad de las fotografías                                                                               |
| `npm run build --workspace=@dtc/storefront`                                                    | Código 0                                                                                                                              |
| `npm run test:e2e -- --list`                                                                   | Código 0; 12 casos reconocidos. Incluye caso nuevo de header/cinta y extensión del caso sin JS; no equivale a ejecutarlos             |
| HTML prerenderizado                                                                            | Header antes de cinta, pausa nativa y copia oculta a lectores; 11 marcadores, seis fotos y avisos DEMO conservados; sin antigua barra |
| Comparación de alcance CSS                                                                     | 407 reglas del cuerpo/footer conservadas                                                                                              |
| `npm run test:e2e -- --grep 'header identity\|mobile menu\|keyboard skip\|without JavaScript'` | Código 1; webServer bloqueado por `listen EPERM 127.0.0.1:8000` antes de ejecutar casos                                               |

Evidencia nueva en `evidence/header-identity-{verification,html,scope}.json` y logs `header-identity-*`. La implementación CSS/nativa y el HTML fueron comprobados; el movimiento efectivo, continuidad del bucle, pausa, encuadres responsive, menú y axe **siguen pendientes de ejecutar en navegador**. No se presenta como aceptación visual completada.

### Revisar y siguiente paso

Desde la carpeta del proyecto ejecutar `npm run dev:storefront` y abrir `http://127.0.0.1:8000/`. Revisar marca/menú en desktop y móvil, cinta debajo del menú, continuidad del bucle, pausa con mouse/teclado/checkbox y versión estática con movimiento reducido. El control de pausa es un icono en móvil para conservar espacio. No se avanzó a otras secciones ni páginas; esperar observaciones del usuario sobre este header.

---

## 2026-10-18 — Paleta natural: bosque, hoja, brotes y marfil

El usuario pidió analizar los colores del sitio original y mejorar la paleta del proyecto para transmitir naturaleza, vida y comodidad visual. Se intentó abrir `https://bioproductosdk.com/`: timeout. Se consultaron textos indexados y Bio Impacto directamente. La lectura exclusivamente HTML/CSS desde Terminal falló por DNS. **No se obtuvo CSS original ni una medición visual de sus colores; no se atribuyen códigos exactos de esta propuesta a la marca oficial.** No se descargaron imágenes/videos ni se accedió a Shopify.

Se aplicó una propuesta cromática al Home y componentes globales editoriales conservando su estructura, textos, medidas, fuentes, fotos y funciones. La identidad verde existente y la circularidad documentada orientan el diseño; los hexadecimales nuevos son decisiones propuestas, pendientes de comparar con un manual de marca si se recibe.

- Bosque `#1B563C`, hoja `#2F7146` y texto `#18372A`: menos sensación azul/gris, más presencia vegetal.
- Marfil `#FBF8F0`, salvia `#E3EED2` y pradera `#F0F5E8`: lectura cálida con superficies diferenciadas.
- Brotes `#D6E9A3`, cinta `#CBE39C`, miel `#F3E6C8` y arena `#F4E6D5`: acentos vivos y cálidos distribuidos con moderación.
- Hero, investigación y footer reciben verdes profundos coherentes; pilares, productos, cuaderno, circularidad y nota humana tienen matices propios. Gradientes CSS suaves en productos, cuaderno y circularidad; sin archivos de imagen nuevos ni filtros sobre las fotografías.
- Se centralizaron 28 tonos y las variantes RGB necesarias en `.dk2-site`, reemplazando 163 usos dispersos. Los chips cálidos son recursos editoriales, no paletas certificadas de submarcas. Se conservan la cinta bajo el header, pausa/movimiento reducido y la retirada previa del cierre «Sigamos explorando».

**Archivos:** modificado `apps/storefront/src/app/(editorial)/editorial.css`; añadido `docs/PALETA_NATURAL.md` con fuentes, límites, tabla, usos y revisión. Este ROADMAP se amplía sin reescribir antecedentes. Respaldo CSS en `.local/nature-palette-before/editorial.css`. No se modificaron componentes, contenido, medios, rutas, backend, pagos ni base de datos.

**Verificaciones nuevas:**

| Control                                         | Resultado                                                                                                    |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `npm run format:check`                          | Código 0                                                                                                     |
| `npm run lint --workspace=@dtc/storefront`      | Código 0; sin errores, 10 advertencias previas                                                               |
| `npm run typecheck --workspace=@dtc/storefront` | Código 0                                                                                                     |
| `npm test`                                      | 13/13 aprobadas, incluida integridad de seis originales y 18 WebP                                            |
| `npm run build --workspace=@dtc/storefront`     | Código 0                                                                                                     |
| `npx prettier --check docs/PALETA_NATURAL.md`   | Código 0                                                                                                     |
| Cálculo estático de paleta                      | 26 pares sólidos sobre 4,5:1; mínimo 5,096:1. El separador de la cinta se oscureció tras la primera revisión |
| Comparación de CSS y referencias                | 461 grupos de reglas con declaraciones ajenas al color conservadas; 39 variables referenciadas resueltas     |
| HTML/CSS compilados                             | Tokens nuevos incluidos; 11 marcadores, seis fotos, cinta y control de pausa conservados                     |
| `npm run test:e2e -- --grep '390px'`            | Código 1; `listen EPERM 127.0.0.1:8000` antes de ejecutar el caso de navegador                               |

Evidencia en `evidence/nature-palette-{tokens,contrast,scope,html,verification}.json` y logs `nature-palette-*`. Los cálculos de colores sólidos **no certifican WCAG completo ni contraste efectivo sobre fotografías/gradientes**. Percepción visual, foco/hover real, responsive, overlays y axe permanecen pendientes en navegador; no se presenta la paleta como aprobada por la empresa ni medida directamente desde su sitio.

Para revisar: `npm run dev:storefront` desde la raíz y abrir `http://127.0.0.1:8000/`. Siguiente paso: recibir observaciones del responsable sobre este ajuste cromático y contrastarlo con material oficial si se facilita. No se desarrolló otra página ni se activó operación comercial.

---

## 2026-10-18 — Header: logo original y navegación centrada

El usuario incorporó `apps/storefront/public/loogo/Logo circular BIO Productos DK.png` y pidió reemplazar la marca del header, centrar las opciones y mejorar su tipografía.

- Se inspeccionó visualmente el PNG original (1254 × 1254 px). Se conserva sin modificaciones. El header utiliza una copia WebP de 288 × 288 px y 17.692 bytes, con transparencia, derivada exclusivamente de ese archivo. No se generó una marca nueva ni se descargaron recursos. La copia está en `apps/storefront/public/images/brand/logo-dk-header.webp`, dentro de las rutas públicas ya permitidas por el middleware.
- Se reemplazó el texto del header por el logo circular: 88 px en escritorio y 72 px en móvil, con enlace al inicio, nombre accesible y dimensiones reservadas para evitar saltos durante la carga.
- La navegación de escritorio usa tres columnas con laterales iguales para centrar el menú respecto del header. Logo a la izquierda y CTA a la derecha. Los seis enlaces mantienen sus rutas independientes.
- Tipografía Manrope local de 16–17 px, peso 600, espaciado ajustado, contenedor suavemente redondeado, fondo verde claro y estados de foco, hover y página activa. El menú móvil presenta enlaces centrados de 24 px; conserva Escape, gestión de foco y funcionamiento sin JavaScript.
- La cinta sigue debajo del header. Comparación de CSS: 454 reglas ajenas al header/navegación sin cambios. Se conservan el cuerpo del Home, sus seis fotografías, footer, backend y configuración comercial.

**Archivos:** `apps/storefront/src/modules/dk/editorial/site-layout.tsx`, `apps/storefront/src/app/(editorial)/editorial.css`, `tests/e2e/preview.spec.ts`, copia WebP indicada y este registro. Respaldos de código anteriores en `.local/header-logo-before/`.

**Verificación nueva:** formato, lint del storefront, TypeScript, 13 pruebas existentes y build del storefront aprobados. Lint mantiene 10 advertencias previas, sin errores. Se comprobó el logo en el HTML compilado, la retirada del wordmark anterior del header, 11 marcadores de sección y seis fotos del Home. Se amplió el caso E2E existente para verificar carga del logo, proporción, tamaño, centrado y ausencia de solapamientos del menú en distintos anchos; los 12 casos se reconocen correctamente.

El intento de ejecutar los casos de header y menú móvil se bloqueó antes de correrlos: `listen EPERM 127.0.0.1:8000`. Por tanto, la revisión visual/responsive e interacción real en navegador sigue pendiente; no se presenta como validada. Evidencia nueva en `evidence/header-logo-*`.

**Revisión local:** desde la raíz, ejecutar `npm run dev:storefront` y abrir `http://127.0.0.1:8000/`. Para ejecutar las comprobaciones del header en navegador: `npm run test:e2e -- --grep 'header identity|mobile menu'`. Esperar comentarios del usuario sobre el header antes de continuar con otra sección o página.

---

## 2026-10-18 — Header: CTA más vivo y carrito desplegable

Solicitud: dar protagonismo al botón «Ver productos» y añadir un carrito a su lado. Se mantiene el alcance en el header; no se desarrolló el catálogo, checkout ni otra página.

- CTA con degradado de verdes brote/hoja, texto oscuro, sombra, brillo breve al interactuar, respuesta al pulsar y movimiento discreto de la flecha. Sin animaciones permanentes; movimiento y brillo se desactivan con movimiento reducido. Contraste calculado en los tres colores sólidos del degradado: mínimo 6,879:1 para el texto; no equivale a una auditoría visual completa.
- Icono de carrito junto al CTA, contador de unidades y panel con selección, cantidades, importes y subtotal cuando provienen de Medusa. Se usa el icono existente de `@medusajs/icons`; no se añadieron imágenes, fotos ni paquetes.
- En modo DEMO se muestra un estado vacío con aviso «Sin compras reales» y acceso a Productos. No se consultan cookies de comercio ni backend, no se simulan artículos/compras y no se enlaza a rutas comerciales bloqueadas. El contenido demostrativo se renderiza sin esperar una frontera asíncrona: la comprobación de HTML detectó y permitió corregir un estado inicial «cargando» que dependía de JavaScript.
- Fuera del modo DEMO, el lector reutiliza `getCartId` y `retrieveCart` del starter. Lee exclusivamente el carrito nativo, sin crearlo ni mutarlo. El contador suma unidades, los importes conservan las cantidades monetarias nativas y la ruta regional se deriva de los datos disponibles. Un fallo de lectura muestra indisponibilidad y contador desconocido, nunca un falso cero.
- Desplegable basado en `details/summary`: apertura/cierre nativos, cierre con Escape o botón que devuelve foco al icono, cierre al salir con teclado, pulsar fuera o navegar. El carrito permanece accesible en móvil; CTA también visible en tablet y escritorio. Se conserva la navegación central y la cinta. Comparación estática: 463 reglas de CSS ajenas al alcance sin cambios.

**Archivos modificados:** `apps/storefront/src/modules/dk/editorial/site-layout.tsx`, `apps/storefront/src/app/(editorial)/editorial.css`, `tests/e2e/preview.spec.ts` y este registro. **Archivos nuevos:** `apps/storefront/src/modules/dk/editorial/header-cart.tsx`, `header-cart-popover.tsx`, `apps/storefront/src/lib/util/header-cart.ts` y `tests/header-cart.test.mjs`. Respaldos en `.local/header-cart-before/`.

**Verificación final:** formato, lint del storefront (10 advertencias previas, sin errores), TypeScript y build aprobados. Las 18 pruebas pasan, incluidas cinco nuevas sobre aislamiento del preview, ausencia de sesión, cantidades/importes nativos con datos de prueba, errores y rutas regionales. El HTML final contiene el panel demostrativo directamente dentro del header, sin estado de carga ni enlace comercial; conserva 11 marcadores y seis fotos del Home. Los 13 casos E2E se reconocen; se añadió cobertura de carrito/teclado/posición/axe y se amplió el caso sin JavaScript.

**Pendiente real:** el intento E2E de header, carrito, menú móvil y navegación sin JS se bloqueó antes de ejecutar los casos por `listen EPERM 127.0.0.1:8000`. Interacción real, responsive visual, axe y lectura contra Medusa/PostgreSQL siguen pendientes de comprobar en el entorno local habilitado. Las pruebas del lector usan fixtures; no certifican una compra ni conexión operativa con el backend. No se habilitaron pagos ni comercio, ni se tocaron Shopify, dominios o datos reales. Evidencia nueva: `evidence/header-cart-*`.

Para revisar: `npm run dev:storefront` desde la raíz y abrir `http://127.0.0.1:8000/`. Prueba de navegador: `npm run test:e2e -- --grep 'header identity|header cart|mobile menu|without JavaScript'`. Continuar con observaciones del usuario sobre el header.

---

## 2026-10-18 — Fondo blanco del header

Por solicitud del usuario, el fondo de `.dk2-header` y su estado `[data-scrolled="true"]` pasan a blanco sólido `#fff`, sin transparencia. Cambio limitado a esas dos declaraciones en `apps/storefront/src/app/(editorial)/editorial.css`; se conservan logo, navegación, CTA, carrito y cinta. Verificación: formato del CSS y lectura de ambos estados con el parser CSS; sin nueva prueba de navegador, build ni cambios funcionales.

## 2026-10-18 — Navegación sin resaltado permanente

Por solicitud del usuario, se retiran el fondo verde, subrayado y peso especial permanentes de la página activa en el header, tanto en escritorio como en el menú móvil. «Inicio» recibe los mismos efectos hover que las demás opciones. Se conserva `aria-current="page"` para comunicar la ruta actual a tecnologías de asistencia y el foco visible para teclado. Solo cambia `apps/storefront/src/app/(editorial)/editorial.css`. Verificación: formato y revisión de selectores mediante el parser CSS; sin nueva prueba de navegador ni build para este ajuste visual.

## 2026-10-18 — Header según dirección del scroll

Solicitud del usuario: ocultar el header al bajar y mostrarlo en cuanto se empieza a subir, sin volver al inicio.

- Se conserva la posición sticky y el espacio original del header. Después de la zona inicial equivalente a su altura, el desplazamiento hacia abajo lo oculta; cualquier disminución de la posición del scroll inicia su aparición. Transición de 220 ms, sin temporizador ni distancia mínima para subir. Al volver arriba siempre queda visible.
- Listener pasivo y actualización agrupada con `requestAnimationFrame`, sin renderizados de React por cada evento. Se limitan las posiciones al documento para evitar cambios falsos de dirección por el rebote en los extremos. Se cancelan callbacks y listeners al desmontar.
- Header visible mientras haya menú/carrito abierto o controles con foco de teclado. Recibir foco lo revela inmediatamente. Se elimina la transición de transformación durante esas interacciones para mantener el menú móvil fijo al viewport. No se usa `aria-hidden` ni se retiran los controles de la navegación con teclado.
- Con movimiento reducido se conserva el comportamiento sin animación. Sin JavaScript queda la navegación sticky visible como alternativa. Se mantiene fondo blanco, logo, CTA, carrito y cinta. Comparación estática: 502 reglas ajenas al header sin cambios.

**Archivos:** modificados `apps/storefront/src/modules/dk/editorial/site-enhancements.tsx`, `apps/storefront/src/app/(editorial)/editorial.css`, `tests/e2e/preview.spec.ts` y este registro; añadido `tests/header-scroll.test.mjs`. Respaldos en `.local/header-scroll-before/`.

**Verificación:** formato, lint del storefront (10 advertencias previas, sin errores), TypeScript y build aprobados. Pasan 22 pruebas, incluidas cuatro nuevas que ejecutan el efecto real del componente con viewport/eventos controlados: ocultación, subida de un píxel, foco/menús, rebote, posición restaurada, agrupación y limpieza. Estas pruebas no simulan el motor de layout ni certifican transiciones visuales.

Se añadió un caso de navegador en móvil/escritorio para posiciones reales, subida de un píxel, foco, carrito, menú móvil a altura completa y movimiento reducido. Los 14 casos E2E se reconocen. El intento `npm run test:e2e -- --grep 'header scroll direction'` se bloqueó antes de ejecutar el caso por `listen EPERM 127.0.0.1:8000`. La revisión visual e interacción real siguen pendientes en el Mac. Evidencia nueva en `evidence/header-scroll-*`.

**Revisión local:** `npm run dev:storefront`, abrir `http://127.0.0.1:8000/`, bajar más allá del header y subir ligeramente desde distintas secciones. Revisar también carrito abierto, menú móvil, navegación con Tab y preferencia de movimiento reducido. No se desarrolló otra página.

## 2026-10-18 — Header que acompaña la velocidad del scroll

El usuario pidió que la aparición copie la velocidad del gesto. Este ajuste sustituye la transición fija de 220 ms del registro anterior.

- El desplazamiento vertical del header se actualiza directamente con la distancia real recorrida por el scroll en cada frame: relación 1:1 mientras está entre sus posiciones visible y oculta. Subir poco y despacio lo descubre progresivamente; subir más rápido lo descubre más rápido. Una pausa detiene el movimiento y una inversión de dirección lo invierte desde su posición actual, sin completar una animación pendiente.
- Se elimina la transición CSS de `transform`; las transiciones cromáticas/sombra siguen independientes. La variable `--dk2-header-offset` comunica la posición calculada, limitada a la altura actual del header para escritorio/móvil. El umbral inicial no suma distancia anterior a esa zona.
- Se conservan el listener pasivo, agrupación con `requestAnimationFrame`, protección frente al rebote, foco accesible y visibilidad completa al abrir menú/carrito. En posición visible o con controles abiertos no se transforma el header, conservando el menú móvil respecto del viewport.
- Con movimiento reducido se usa ocultación/aparición direccional inmediata, sin seguimiento gradual. Cambiar esa preferencia revela el header para evitar dejarlo parcialmente oculto. Sin JS se conserva la alternativa sticky visible. Fondo blanco, logo, CTA, carrito, cinta y demás secciones sin cambios; 502 reglas de CSS ajenas al header conservadas.

**Archivos:** modificados `apps/storefront/src/modules/dk/editorial/site-enhancements.tsx`, `apps/storefront/src/app/(editorial)/editorial.css`, `tests/header-scroll.test.mjs`, `tests/e2e/preview.spec.ts` y este registro. Respaldos en `.local/header-scroll-speed-before/`.

**Verificación:** formato, lint del storefront (10 advertencias previas, sin errores), TypeScript y build aprobados. Pasan 25 pruebas. Las siete del efecto real de scroll cubren avance proporcional lento/rápido, pausas, reversión, umbral, cambio de altura, foco/menús, rebote, movimiento reducido y limpieza. Se adaptó el caso E2E existente para medir desplazamientos de 1, 2 y 20 px, reversión y ausencia de transición temporal; los 14 casos se reconocen. El intento de ejecutarlo se bloqueó antes del caso por `listen EPERM 127.0.0.1:8000`. La sensación visual y respuesta real de rueda/trackpad/táctil siguen pendientes de revisar en navegador; las pruebas controladas no certifican esa percepción. Evidencia nueva en `evidence/header-scroll-speed-*`.

**Revisar:** `npm run dev:storefront`, abrir `http://127.0.0.1:8000/`, bajar y comparar subidas lentas, rápidas, pausas y cambios de dirección. Comprobación de navegador: `npm run test:e2e -- --grep 'header scroll direction'`. No se avanzó a otra página.

## 2026-10-18 — Refinamiento visual del header

El usuario aprobó la dirección actual y solicitó tamaños/tipografía más limpios y profesionales, conservando el comportamiento del scroll.

- Se centralizan las medidas del header: altura interior mínima de 96 px en escritorio y 88 px en modo compacto, logo original de 80/72 px y controles principales de 48 px. Se retiran reglas duplicadas de altura para evitar sobrescrituras entre breakpoints. Los paneles calculan su altura disponible a partir de la misma medida.
- Navegación central en Manrope local de 16 px, peso 550, interlineado 1,5 y espaciado menos comprimido. Se retira el marco verde permanente del grupo para dejar el fondo blanco; el verde/subrayado aparece en hover. Se conserva `aria-current` sin estilo activo persistente. No se descargan fuentes.
- CTA y carrito comparten altura y alineación. Se mantiene el degradado, brillo y respuesta del CTA, con peso tipográfico y sombras más contenidos. Icono del carrito de 22 px, contador de 20 px y fondo blanco en reposo.
- Panel del carrito con tipografía jerarquizada, cuerpo de 14 px, título de 20 px, metadatos más legibles y superficie blanca. Menú móvil con enlaces centrados de 22 px, espaciado regular, iconografía más fina y cierre proporcionado; se mantienen sus áreas de interacción.
- Cinta más delgada, con altura interior mínima de 48 px, texto de 13 px y menor peso visual. Mensajes, bucle de 45 segundos, pausa y alternativa estática permanecen. El logo y las fotografías no se modifican.
- El código de scroll es idéntico al respaldo (comparación de bytes/SHA); su medición de la altura real adapta automáticamente el recorrido a las nuevas proporciones. Comparación CSS: 411 reglas ajenas al header, paneles, menú y cinta sin cambios.

**Archivos modificados:** `apps/storefront/src/app/(editorial)/editorial.css`, `tests/e2e/preview.spec.ts` y este registro. Sin cambios en componentes, contenido, dependencias, backend ni otras páginas. Respaldos en `.local/header-refinement-before/`.

**Verificación:** formato, lint del storefront (10 advertencias previas, sin errores), TypeScript, las 25 pruebas y build aprobados. Se amplió el caso E2E existente para comprobar igual altura/alineación del CTA y carrito y áreas de interacción de al menos 44 × 44 px en los controles visibles. Se reconocen los 14 casos E2E. El intento de ejecutar header, scroll, carrito, menú y alternativa sin JS quedó bloqueado antes de los casos por `listen EPERM 127.0.0.1:8000`. La aceptación visual, geometría real y auditoría de navegador siguen pendientes; no se presentan como aprobadas. Evidencia: `evidence/header-refinement-*`.

**Revisión local:** `npm run dev:storefront` y abrir `http://127.0.0.1:8000/`. Revisar proporciones, lectura, alineación, hover/foco, menú móvil, carrito y scroll lento/rápido. No se avanza a otra sección ni página.

## 2026-10-18 — Marco exterior sin franjas laterales

El usuario aclaró que los bordes blancos aparecen en los costados de toda la página, no alrededor del logo ni del carrito.

Se hace explícito el ancho completo del documento editorial: `html` y `body` cuando contienen `.dk2-site` usan ancho del 100 %, sin margen, padding, borde ni máximo de ancho. El lienzo `.dk2-site` también ocupa el ancho completo y evita restricciones exteriores. Se utiliza `overflow-x: clip` para contener desbordes laterales sin añadir un contenedor de scroll vertical que interfiera con el header sticky. Se conserva el ancho en porcentajes, evitando el desborde que puede introducir `100vw` con una barra de scroll vertical.

Los márgenes interiores de lectura en `.dk2-container` permanecen. Logo, controles, fondos, secciones y comportamiento del header no se modifican. Comparación CSS: las otras 522 reglas existentes quedan idénticas. No se oculta la barra de scroll vertical ni se añaden imágenes.

**Límite del diagnóstico:** el Preflight compilado ya contenía `body { margin: 0 }`; no se pudo reproducir visualmente el origen exacto de la franja. El cambio establece el encuadre sin márgenes de forma independiente del reset global y limita desbordes horizontales. La desaparición efectiva de la franja debe confirmarse en navegador, sin presentarla como observada desde este entorno.

**Archivos:** `apps/storefront/src/app/(editorial)/editorial.css`, `tests/e2e/preview.spec.ts` y este registro. Respaldo en `.local/page-edge-before/`. Se ampliaron los siete casos responsive existentes para medir ambos extremos del lienzo, header, cinta, hero y footer frente al ancho útil del viewport, sin exigir que los textos se peguen a los extremos.

**Verificación:** formato, lint del storefront (10 advertencias previas, sin errores), TypeScript, 25 pruebas y build aprobados. Se reconocen los 14 casos E2E. El intento de ejecutar los casos del Home y scroll se bloqueó antes de correrlos por `listen EPERM 127.0.0.1:8000`; encuadre visual, ausencia de desborde y funcionamiento sticky real quedan pendientes de comprobar en el Mac. Evidencia nueva en `evidence/page-edge-*`.

**Revisar:** `npm run dev:storefront`, abrir y recargar `http://127.0.0.1:8000/`. Comprobar los extremos en móvil/escritorio y subir/bajar para verificar el header. No se avanzó a otra página.

## 2026-10-18 — Iconos sociales entre logo e Inicio

El usuario pidió Instagram, LinkedIn y Facebook pequeños y centrados en el espacio entre el logo e «Inicio».

- Se añade un grupo de iconos monocromos de 18 px, con áreas de interacción de 32 px en escritorio y 44 px con puntero táctil. Hover verde suave, foco visible y etiquetas accesibles. La columna de marca distribuye logo y grupo social sin desplazar la navegación central ni los controles existentes.
- En modo compacto, las redes pasan al menú móvil, centradas bajo su cabecera y antes de «Inicio». Se evita sobrecargar la fila de logo/carrito/Menú. Los selectores de la navegación móvil se restringen a `.dk2-mobile-links` para no aplicar tamaños de enlace grande a las redes.
- Facebook y LinkedIn reutilizan `@medusajs/icons`. Instagram usa un pequeño SVG de interfaz en código. No se generan ni descargan archivos de imagen, fuentes ni paquetes, y no se añaden SDK, embeds o rastreadores de redes sociales.
- Los enlaces confirmados abren otra pestaña con `noopener noreferrer`. La configuración se centraliza en `socialProfiles` de `src/content/site.ts`.

**URLs y pendiente:** se encontró el [perfil empresarial de LinkedIn](https://cl.linkedin.com/company/bioproductos-dk/), que identifica a Bioproductos DK y publica `bioproductosdk.com` como sitio web; ese enlace queda activo. La documentación local no contiene URLs de Instagram/Facebook y las consultas públicas no permitieron confirmarlas. Se solicitaron al usuario mientras se preparaba el diseño. Ambos iconos están presentes con estado «enlace por confirmar», sin ancla ni enlace genérico/inventado. **Falta recibir esas dos URLs para completar los tres hipervínculos solicitados.** No se presenta la tarea de enlaces como terminada.

No se incorporaron al contenido del Home cifras, certificaciones o logros de los resultados de búsqueda. La consulta fue únicamente para identificar el perfil público; no se modificó ninguna cuenta o sitio real.

**Archivos:** nuevo `apps/storefront/src/modules/dk/editorial/social-links.tsx`; modificados `site-layout.tsx`, `navigation.tsx` del mismo directorio, `apps/storefront/src/content/site.ts`, `apps/storefront/src/app/(editorial)/editorial.css`, `tests/e2e/preview.spec.ts` y este registro. Respaldo en `.local/header-socials-before/`. Las demás reglas CSS se mantienen, salvo la restricción de selectores móviles indicada; se conservan scroll proporcional, encuadre, logo, CTA y carrito.

**Verificación:** formato, lint del storefront (10 advertencias previas, sin errores), TypeScript, 25 pruebas y build aprobados. HTML compilado: tres iconos en el header, un enlace externo activo, dos estados pendientes sin enlaces falsos, 11 marcadores y seis fotos del Home. Se amplió el caso E2E del header para medir el punto medio entre logo/Inicio, límites y áreas de interacción, y comprobar atributos de enlaces; se amplió el caso móvil para verificar los iconos dentro del menú. Se reconocen los 14 casos E2E. El intento de header, menú y alternativa sin JS se bloqueó antes de ejecutar casos por `listen EPERM 127.0.0.1:8000`; geometría e interacción visual quedan pendientes. Evidencia nueva en `evidence/header-socials-*`.

**Revisar:** `npm run dev:storefront`, abrir `http://127.0.0.1:8000/` y revisar escritorio/menú móvil. Incorporar las URLs de Instagram y Facebook cuando las confirme el usuario. No se desarrolla otra página.

## 2026-10-18 — Redes con el mismo estilo de Instagram

El usuario pidió que las tres redes compartieran el estilo de Instagram y corregir los hipervínculos ausentes.

- Instagram, LinkedIn y Facebook usan ahora SVG de interfaz con el mismo marco redondeado, trazo de 1,7, terminaciones suaves y tamaño de 18 px. Se sustituyen los dos iconos rellenos de Medusa por contornos a juego con Instagram. El grupo tiene un negro suave uniforme (`#262b28`); se retira la opacidad distinta de los estados pendientes. Se mantienen hover verde, foco, etiquetas, áreas de interacción, centrado y ubicación en el menú móvil.
- No se añaden imágenes, paquetes, SDK ni rastreadores. Logo, navegación, scroll proporcional, carrito y contenido del Home se conservan.
- **Enlaces aún incompletos:** Instagram y Facebook siguen sin URL confirmada. Se revisaron el sitio público, la ficha de la marca en Te Protejo y búsquedas específicas de ambas redes, sin encontrar sus cuentas verificables. Se solicitaron al usuario las dos URLs oficiales. Se conserva LinkedIn activo y los otros dos estados pendientes sin enlaces inventados. Esta parte de la solicitud no se declara terminada.

**Archivos:** `apps/storefront/src/modules/dk/editorial/social-links.tsx`, `apps/storefront/src/app/(editorial)/editorial.css` y este registro. Respaldos en `.local/social-outline-before/`. La configuración de perfiles no cambia.

**Verificación:** formato, TypeScript, 25 pruebas y build aprobados; lint sin errores y con 10 advertencias previas. El HTML compilado confirma tres SVG con el mismo marco de contorno, un enlace activo y dos perfiles pendientes. El intento E2E del header quedó bloqueado antes de ejecutar el caso por `listen EPERM 127.0.0.1:8000`. Evidencia en `evidence/social-outline-*`. La apariencia final en navegador y los dos destinos pendientes requieren revisión local y las URLs oficiales, respectivamente.

**Revisar:** ejecutar `npm run dev:storefront` y abrir `http://127.0.0.1:8000/`. Comparar el estilo de las tres redes en escritorio y menú móvil. No se avanza a otra página.

## 2026-10-18 — Redes a 20 px, opacidad del 85 % y URLs confirmadas

El usuario proporcionó las URLs oficiales de Instagram, LinkedIn y Facebook. Se incorporan exactamente esos tres destinos en `socialProfiles`, por lo que los tres iconos pasan a ser enlaces activos tanto en escritorio como en el menú móvil. Se conservan la apertura en otra pestaña, `noopener noreferrer` y las etiquetas accesibles. Queda resuelto el pendiente de URLs registrado en las dos entradas anteriores; no se modifica ninguna cuenta externa.

Los SVG crecen de 18 a 20 px y usan `opacity: 0.85` (8,5 sobre 10). La opacidad se aplica únicamente al dibujo, manteniendo intactos el foco visible y las áreas de interacción. Se conserva el estilo negro de contorno y el hover verde. No cambian el centrado, logo, navegación, comportamiento de scroll, carrito ni contenido del Home.

**Archivos:** `apps/storefront/src/content/site.ts`, `apps/storefront/src/app/(editorial)/editorial.css` y este registro. Sin imágenes, dependencias ni modificaciones de otras páginas.

**Verificación:** formato, TypeScript y build aprobados; lint sin errores y con 10 advertencias previas. El HTML generado contiene las tres URLs exactas proporcionadas por el usuario tanto en el header como en el menú móvil, con etiquetas accesibles, apertura en otra pestaña y atributos de seguridad correctos. Evidencia en `evidence/social-links-final-*`. La comprobación visual y la apertura de los destinos en navegador siguen pendientes por la restricción `listen EPERM` documentada anteriormente; no se verifica aquí el estado externo de las cuentas.

**Revisar:** `npm run dev:storefront` y abrir `http://127.0.0.1:8000/`. Revisar tamaño y opacidad de las tres redes y abrir sus destinos desde el header y el menú móvil.

## 2026-10-18 — Opacidad de redes al 75 %

A petición del usuario, se ajusta únicamente `opacity` de los SVG sociales de `0.85` a `0.75` (7,5 sobre 10), tanto en escritorio como en el menú móvil. Se conservan tamaño de 20 px, enlaces, foco y distribución. Archivos: `apps/storefront/src/app/(editorial)/editorial.css` y este registro. La revisión visual en navegador sigue pendiente.

## 2026-10-18 — Opacidad de redes al 50 %

El usuario ajusta su preferencia a 5 sobre 10. Se cambia únicamente la opacidad de los SVG sociales a `0.5`, en escritorio y menú móvil. Tamaño, enlaces y foco se conservan. Archivos: `apps/storefront/src/app/(editorial)/editorial.css` y este registro. Revisión visual pendiente en navegador.

## 2026-10-18 — Verde del CTA al 50 % y círculo de flecha al 60 %

Se ajustan las tres paradas del degradado y el borde verde de «Ver productos» al 50 % de opacidad. El fondo verde del círculo de la flecha queda al 60 %. Se aplica transparencia a los colores, sin reducir la opacidad del texto, el foco ni el botón completo. La flecha usa ahora tinta oscura para conservar contraste sobre el círculo más claro; se mantienen dimensiones, enlace y microinteracciones.

**Archivos:** `apps/storefront/src/app/(editorial)/editorial.css` y este registro. **Verificación:** formato CSS aprobado. El cálculo de composición de las paradas sobre el header blanco da contraste mínimo de 9,55:1 para el texto y 3,50:1 para el icono oscuro sobre su círculo; no sustituye una auditoría visual en navegador, que sigue pendiente. No se modifica otra sección.

## 2026-10-18 — Hoja en el botón «Ver productos»

Se reemplaza la flecha del CTA del header por un icono de hoja de contorno de 20 px, creado como SVG de interfaz dentro del mismo círculo. Se mantienen las transparencias del 50 % del botón y 60 % del círculo, el enlace a `/productos` y el movimiento discreto con hover/foco. El icono es decorativo y no altera el nombre accesible «Ver productos». No se añaden archivos de imagen ni dependencias.

**Archivos:** `apps/storefront/src/modules/dk/editorial/site-layout.tsx`, `apps/storefront/src/app/(editorial)/editorial.css` y este registro. **Verificación:** formato y TypeScript aprobados; lint sin errores y con 10 advertencias previas. Evidencia técnica en `evidence/header-leaf-{typecheck,lint}.log`. Revisión visual en navegador pendiente.

## 2026-10-18 — Círculo de la hoja al 50 %

Se ajusta el fondo verde del círculo de la hoja del 60 % al 50 % de opacidad (5/10), igualando el nivel solicitado para el fondo de «Ver productos». Se conservan el trazo legible de la hoja, texto, enlace y efectos. Archivos: `apps/storefront/src/app/(editorial)/editorial.css` y este registro. Revisión visual pendiente en navegador.

## 2026-10-18 — Header más delgado, proporción 8,5/10

Se interpreta la solicitud como conservar aproximadamente el 85 % de la altura anterior, reduciéndola un 15 %. La altura interior mínima pasa de 96 a 82 px en escritorio y de 88 a 75 px en modo compacto; el borde inferior añade 1 px. El logo pasa de 80/72 a 68/61 px. CTA, carrito y menú conservan un mínimo de 44 px para interacción cómoda, con menos padding vertical en navegación y menú. El círculo de la hoja pasa a 28 px, su SVG a 18 px y el icono del carrito a 20 px. Se mantiene la navegación de 16 px para conservar legibilidad.

Se conservan la distribución centrada, redes de 20 px, enlaces oficiales, fondo blanco, transparencias, cinta inferior y microinteracciones. El scroll proporcional sigue midiendo la altura real del header; no cambia su implementación. Los paneles dependientes de altura utilizan las mismas variables actualizadas. No se modifica el resto del Home ni se desarrolla otra página.

**Archivos:** `apps/storefront/src/app/(editorial)/editorial.css`, `tests/e2e/preview.spec.ts` y este registro. Se adapta el caso responsive existente a la altura compacta y el menor logo, manteniendo las comprobaciones de centrado, separación y controles de al menos 44 px. Respaldos en `.local/header-slim-before/`.

**Verificación:** formato, TypeScript, 25 pruebas y build aprobados; lint sin errores y con 10 advertencias previas. El intento E2E de header y scroll se bloqueó antes de ejecutar los casos por `listen EPERM 127.0.0.1:8000`; responsive y proporciones visuales siguen pendientes en navegador. Evidencia en `evidence/header-slim-*`.

**Revisar:** ejecutar `npm run dev:storefront` y abrir `http://127.0.0.1:8000/`. Revisar escritorio, tablet y móvil, alineación de controles y comportamiento al subir/bajar.

## 2026-10-18 — Cinta de mensajes completa y más compacta

Se eliminan la etiqueta visible «El espíritu DK» y el control «Pausar». La cinta deja de usar el contenedor de lectura para que los mensajes recorran todo el ancho. La altura interior mínima pasa de 48 a 36 px (75 % de la anterior, 7,5/10), el texto pasa de 13 a 12 px y los separadores/espacios se ajustan a esa proporción. No cambian los cinco mensajes ni su fondo verde.

El bucle CSS conserva sus 45 segundos y dos grupos idénticos; la pista mide al menos el doble del ancho disponible y distribuye por igual ambos grupos para evitar un tramo vacío en pantallas anchas. Se retira el CSS exclusivo del control y de la etiqueta eliminados. Se conserva la detención con hover y foco en la propia región, que ahora puede recibir foco de teclado con descripción accesible; no se requiere JavaScript. Con movimiento reducido se presenta una única lista estática, con salto de línea y márgenes de lectura. El duplicado permanece oculto a lectores de pantalla.

**Archivos:** `apps/storefront/src/modules/dk/editorial/brand-ribbon.tsx`, `apps/storefront/src/app/(editorial)/editorial.css`, `tests/e2e/preview.spec.ts` y este registro. Respaldos en `.local/ribbon-compact-before/`. Se adaptan los casos E2E existentes a la ausencia del checkbox, foco sin JS y cinta compacta de ancho completo, incluyendo grupos iguales en escritorio de 1920 px. Header, resto del Home y otras páginas se conservan.

**Verificación:** formato, TypeScript, 25 pruebas y build aprobados; lint sin errores y con 10 advertencias previas. El HTML compilado confirma ausencia de etiqueta/control, dos grupos de cinco mensajes, duplicado oculto a lectores de pantalla y región enfocable sin contenedor de ancho limitado. Las 502 reglas CSS ajenas a la cinta se conservan idénticas. Se reconocen los 14 casos E2E; el intento de ejecutar cinta y alternativa sin JS quedó bloqueado antes de correrlos por `listen EPERM 127.0.0.1:8000`. El ritmo visual, continuidad efectiva y responsive siguen pendientes en navegador. Evidencia en `evidence/ribbon-compact-*`.

**Revisar:** `npm run dev:storefront` y abrir `http://127.0.0.1:8000/`. Comprobar cinta en móvil/escritorio, vuelta completa del bucle, hover/foco y preferencia de movimiento reducido.

## 2026-10-18 — Cinta infinita con arrastre manual

El usuario solicita que el puntero ya no detenga la cinta y poder moverla manualmente. Se retira la pausa por hover. Tras cargar JavaScript, la región admite clic sostenido y arrastre horizontal en ambos sentidos mediante Pointer Events, con cursores de mano abierta/cerrada. El movimiento sigue directamente la distancia del puntero; al soltar, cancelar o perder la captura, el bucle continúa desde esa posición, sin reiniciarse al principio.

El controlador modifica la fase de la animación CSS existente mediante Web Animations API y normaliza vueltas completas en ambos sentidos; conserva duración, grupos idénticos, altura de 36 px y ancho completo. La captura del puntero permite soltar fuera de la barra y dispone de manejo alternativo en `window`. Se libera al redimensionar, cambiar a movimiento reducido o desmontar el componente. No se añade una animación JavaScript por fotograma ni una librería de carrusel.

En móvil se configura `touch-action: pan-y pinch-zoom` para reservar el gesto horizontal a la cinta y conservar desplazamiento vertical/zoom nativos. El teclado puede enfocar la región y recorrer mensajes con flechas izquierda/derecha; al abandonar el foco se reanuda la animación. El foco visible de teclado conserva la detención para lectura. Con movimiento reducido se mantiene una única lista estática y se desactiva el arrastre. Sin JavaScript quedan el bucle CSS y la alternativa de foco de teclado; el arrastre requiere la mejora cliente. No reaparecen el botón de pausa ni la etiqueta eliminada.

**Archivos:** nuevos `apps/storefront/src/lib/util/ribbon-drag.ts` y `tests/ribbon-drag.test.mjs`; modificados `apps/storefront/src/modules/dk/editorial/brand-ribbon.tsx`, `apps/storefront/src/app/(editorial)/editorial.css`, `tests/e2e/preview.spec.ts` y este registro. Respaldos en `.local/ribbon-drag-before/`. Se conserva el header, contenido del Home, fotografías originales y rutas independientes.

**Verificación:** formato, TypeScript, 30 pruebas y build aprobados; lint sin errores y con 10 advertencias previas. Las cinco pruebas nuevas ejecutan el controlador real con una línea temporal controlada: arrastre bidireccional, múltiples vueltas, botones/punteros ajenos, liberación fuera de la región, captura perdida, resize, limpieza, teclado y movimiento reducido. Se reconocen 15 casos E2E, incluido el nuevo caso de arrastre y los ajustes de hover/foco; el intento de ejecución quedó bloqueado antes de correrlos por `listen EPERM 127.0.0.1:8000`. Los eventos táctiles sintéticos del caso preparado no acreditan el scroll nativo de un teléfono. El HTML compilado conserva ambos grupos de cinco mensajes, duplicado oculto y ausencia de control de pausa; las 502 reglas CSS ajenas a la cinta siguen idénticas. Evidencia en `evidence/ribbon-drag-*`. Sensación de arrastre, continuidad pintada, captura nativa y gestos reales siguen pendientes en navegador/dispositivo.

**Revisar:** ejecutar `npm run dev:storefront` y abrir `http://127.0.0.1:8000/`. Pasar el puntero sin detener el bucle; mantener clic y arrastrar a ambos lados; soltar dentro/fuera; repetir con el dedo sin impedir subir/bajar la página. Probar también foco, flechas y movimiento reducido. No se desarrolla otra página.

## 2026-10-18 — Iconos de naturaleza y circularidad en la cinta

Se sustituyen las cinco estrellas por iconos verdes de contorno de 16 px, en esta secuencia: matraz junto a «Hay ciencia detrás de cada producto»; hoja junto a «Una nueva mirada para lo cotidiano»; brote junto a «Investigar. Crear. Cuidar»; reciclaje junto al mensaje de materiales orgánicos; y flechas circulares junto a «Conectemos ideas que puedan transformar». Ambos grupos del bucle comparten la misma secuencia.

Los iconos se dibujan como SVG de interfaz dentro del componente, sin archivos de imagen, descargas ni dependencias. Son decorativos, están ocultos a lectores de pantalla y no representan sellos o certificaciones. Se conserva el texto existente, el color de la cinta, su altura de 36 px, el movimiento infinito y el controlador de arrastre sin cambios.

**Archivos:** `apps/storefront/src/modules/dk/editorial/brand-ribbon.tsx`, `apps/storefront/src/app/(editorial)/editorial.css` y este registro. **Verificación:** formato, TypeScript y build aprobados; lint sin errores y con 10 advertencias previas. El HTML compilado contiene cinco iconos por grupo, todos decorativos de contorno, y ninguna estrella en la cinta. Evidencia en `evidence/ribbon-nature-icons-*`. La revisión visual en navegador sigue pendiente por la limitación de servidor local ya documentada.

## 2026-10-18 — Iconos centrados entre mensajes

Cada icono pasa a ser un separador después de su mensaje, centrado entre el final de ese texto y el comienzo del siguiente. Se crea una zona flexible con un mínimo de 64 px por separador: el icono conserva sus 16 px y dispone de al menos 24 px a cada lado. Cuando hay espacio adicional en pantallas anchas, se distribuye dentro de esas zonas manteniendo la simetría. Se retiran el gap y el padding asimétricos anteriores, incluida la separación entre ambos grupos del bucle.

Se conservan mensajes, iconos, altura de la cinta, animación y controlador de arrastre. La alternativa estática de movimiento reducido sigue permitiendo ajustar los textos a varias líneas. Los separadores continúan siendo decorativos y ocultos a lectores de pantalla.

**Archivos:** `apps/storefront/src/modules/dk/editorial/brand-ribbon.tsx`, `apps/storefront/src/app/(editorial)/editorial.css`, `tests/e2e/preview.spec.ts` y este registro. Se amplía el caso responsive existente para medir el punto medio entre textos y el centro de cada icono en una misma captura de geometría, incluida la unión entre grupos.

**Verificación:** formato, TypeScript y build aprobados; lint sin errores y con 10 advertencias previas. El HTML compilado confirma diez pares de texto seguido de separador entre los dos grupos. El intento del caso E2E de la cinta volvió a bloquearse antes de correr por `listen EPERM 127.0.0.1:8000`; el centrado pintado sigue pendiente de revisión en navegador. Evidencia en `evidence/ribbon-centered-icons-*`.

## 2026-10-18 — Inercia suave al soltar la cinta

Se añade impulso después de un arrastre rápido: la cinta continúa en la dirección del gesto y desacelera de forma gradual hasta recuperar su velocidad automática. Se estima la velocidad con los últimos movimientos del puntero, se atenúa al 65 % y se limita a 450 px/s. La transición dura como máximo 1,6 segundos y su curva cúbica alcanza exactamente la velocidad habitual al terminar, sin reiniciar la posición. Un lanzamiento hacia la derecha desacelera y vuelve suavemente al sentido automático hacia la izquierda.

No se lanza inercia por movimientos menores de 12 px, arrastres lentos, una pausa superior a 80 ms antes de soltar, cancelación táctil o pérdida de captura. Una pausa anterior al lanzamiento reinicia el historial de velocidad, permitiendo que los movimientos nuevos determinen el impulso. Un nuevo agarre interrumpe inmediatamente el impulso en la posición actual. Se cancelan los frames pendientes al redimensionar, perder el foco de la ventana, usar teclado, activar movimiento reducido o desmontar. El desplazamiento se calcula con tiempo real, evitando depender de la frecuencia de pantalla o acumular un salto tras una demora de frames.

El bucle en reposo continúa en CSS; únicamente el breve tramo de inercia usa `requestAnimationFrame` para ajustar la fase de la animación existente. Se mantienen la altura, el ancho completo, los iconos centrados, el arrastre táctil y la alternativa sin JS/movimiento reducido. No cambian estilos, fotos, header, contenido ni rutas.

**Archivos:** `apps/storefront/src/lib/util/ribbon-drag.ts`, `tests/ribbon-drag.test.mjs`, `tests/e2e/preview.spec.ts` y este registro. Respaldos en `.local/ribbon-inertia-before/`.

**Verificación:** las 11 pruebas del controlador pasan, incluidas seis nuevas de límite/deceleración, ambos sentidos y límites del bucle, interrupción sin salto, rechazo de gestos no intencionales, lanzamiento tras mantener pulsado, cancelaciones, limpieza y comportamiento independiente de la frecuencia de frames. Formato, TypeScript y build aprobados; lint sin errores y con 10 advertencias previas. Se amplía el caso E2E existente con lanzamiento y retorno automático; se reconocen 15 casos. El intento en navegador quedó bloqueado antes de los casos por `listen EPERM 127.0.0.1:8000`. Evidencia en `evidence/ribbon-inertia-*`. La sensación visual y los gestos nativos de ratón/teléfono siguen pendientes de revisión local.

**Revisar:** `npm run dev:storefront`, abrir `http://127.0.0.1:8000/`, arrastrar rápido a ambos lados y soltar. Comparar con un arrastre lento, sujetar antes de soltar y volver a agarrar durante el impulso. No se desarrolla otra página.

## 2026-10-18 — Primera impresión del Home: «Todo nace de la ciencia»

Se trabaja únicamente el hero situado debajo de la cinta, sobre el proyecto existente. Se reemplaza la acumulación de eslóganes por una jerarquía clara: «BioProductos DK · Ciencia aplicada», titular «Todo nace / de la ciencia», explicación del vínculo entre residuos orgánicos, investigación y productos cotidianos, y dos accesos independientes: «Ver productos» y «Conocer la ciencia». Una lista breve presenta las familias mencionadas en la visita: detergentes, champús sólidos y sales de baño. No implica stock, precios o variantes comerciales confirmados.

La frase recoge editorialmente la intención expresada en la entrevista, primer bloque 0:55–1:11, sin atribuirla como cita literal. La revalorización y el enfoque circular están respaldados también por [Bio Impacto del sitio original](https://bioproductosdk.com/bio-impacto/), consultado en esta sesión. El Home público original volvió a fallar por timeout; no se presenta como una revisión visual de ese sitio. No se incorporan patentes, porcentajes ambientales, autorizaciones, premios ni promesas de rendimiento.

Se conserva la panorámica original existente, sin nuevos archivos de imagen. El titular usa dos líneas con igual protagonismo tipográfico y acento verde suave; se aumenta la legibilidad del párrafo y los CTA conservan al menos 48 px de altura. Se retiran la etiqueta de edición y el texto vertical decorativo. En escritorio se ajusta el lienzo mínimo a 680 px (720 px en pantallas anchas). En móvil, la composición crece con el texto y reserva una franja fotográfica inferior de 310 px, en lugar de depender de porcentajes sobre una altura fija; así se mantiene la lectura sobre verde y espacio para el producto.

**Archivos:** `apps/storefront/src/content/home.ts`, `apps/storefront/src/modules/dk/editorial/home.tsx`, `apps/storefront/src/app/(editorial)/editorial.css`, `tests/e2e/preview.spec.ts`, `scripts/smoke.mjs` y este registro. Respaldos en `.local/hero-origin-before/`. La introducción posterior, los componentes desde Pilares en adelante, sus contenidos y 469 reglas CSS ajenas al hero se conservan idénticos. Header, redes, carrito, cinta con inercia, backend, DB y páginas independientes no cambian.

**Verificación:** formato, TypeScript, 36 pruebas y build aprobados; lint sin errores y con 10 advertencias previas. Las pruebas confirman también la integridad de las seis fotos originales y sus variantes existentes. El HTML compilado contiene el H1 nuevo, las tres familias, los CTA independientes y las seis fotos. Se adaptan los siete casos responsive del Home al nuevo H1, familias visibles, destinos de ambos CTA y áreas de interacción, y el caso de navegación al nuevo nombre del CTA. Se reconocen 15 casos E2E. El smoke ahora comprueba el H1 visible, evitando aceptar por coincidencia una frase de los metadatos; su parser pasa contra el HTML compilado y su sintaxis está validada. No se presenta esa comprobación como un smoke HTTP ejecutado. El intento E2E se bloqueó antes de los casos por `listen EPERM 127.0.0.1:8000`; responsive, contraste real, navegación HTTP y aceptación visual siguen pendientes. Evidencia en `evidence/hero-origin-*`.

**Revisar este paso:** ejecutar `npm run dev:storefront` desde la raíz y abrir `http://127.0.0.1:8000/`. Revisar el primer bloque en escritorio/móvil y abrir sus dos destinos, que mantienen su estado de preparación. La siguiente sección se abordará tras la revisión del usuario; no se desarrolla Bio Investigación.

## 2026-10-18 — Invitación a colaborar con residuos orgánicos

Se reemplaza únicamente la franja «El cambio empieza en el origen / Innovación que nace de lo que otros descartan / Conoce nuestra historia», situada después del lienzo del hero, por una sección con identidad propia: «Dale a tus residuos / un nuevo comienzo». Fondo verde luminoso con matiz cálido, tipografía editorial, botón «Quiero donar mis residuos», composición de brote y órbitas, y tres ejemplos de materiales: borra de café, cáscaras de huevo y cáscaras de cítricos. Los recursos gráficos son CSS e iconos SVG de interfaz; no se generan, descargan ni incorporan imágenes, videos o dependencias.

**Fuente y alcance real:** entrevista de terreno, recorrido de laboratorio 15:24–17:49. Allí se conversa sobre una posible invitación web a donar y la necesidad de acordar materiales, separación y conservación. Los cítricos también se mencionan como material obtenido mediante compra a un proveedor; mostrarlos como ejemplo del trabajo de DK no promete que se acepten como donación. La sección distingue ejemplos de investigación de una lista de recepción: cada aporte debe evaluarse con DK. No anuncia un punto de entrega, retiro a domicilio, incentivo, descuento ni programa público habilitado, y no publica instrucciones de manipulación inventadas.

El CTA enlaza a la ruta independiente `/contacto`, que conserva su estado de preparación e indica el correo institucional disponible en el footer. No hay formulario de donación ni recepción de datos/materiales en esta propuesta. Se incluye junto al CTA la aclaración visible sobre consulta previa y recepción pública aún no habilitada. La sección posterior de compromiso circular mantiene su contenido y alcance.

En pantallas amplias, los materiales se distribuyen alrededor del brote; hasta 1199 px se ordenan debajo para evitar superposición con el mensaje central. Hasta 899 px la composición pasa a una columna. Se conservan foco de teclado, CTA de al menos 50 px, jerarquía H2 y contenido legible sin JavaScript. Los efectos de hover son discretos y el movimiento se desactiva con la preferencia de movimiento reducido. La adaptación está implementada; su representación efectiva sigue pendiente de revisión en navegador.

**Archivos modificados:** `apps/storefront/src/content/home.ts`, `apps/storefront/src/modules/dk/editorial/home.tsx`, `apps/storefront/src/app/(editorial)/editorial.css`, `tests/e2e/preview.spec.ts` y este registro. Respaldos en `.local/donation-invitation-before/`. Se comprueba que el lienzo del hero, los componentes desde Pilares en adelante y su contenido, y las 513 reglas CSS ajenas a la franja se conservan idénticos. Header, carrusel con inercia, fotografías originales, backend, base de datos y demás páginas permanecen sin cambios.

**Verificación:** formato, TypeScript, las 36 pruebas existentes y build aprobados; lint sin errores y con las 10 advertencias previas. El HTML compilado contiene el titular nuevo, el enlace a Contacto, la condición de recepción, tres ejemplos, las seis fotografías existentes y los once marcadores de secciones previos. No contiene imágenes nuevas ni formularios en la invitación. Se amplían los siete casos responsive existentes del Home para comprobar región accesible, aviso, ejemplos, tamaño del CTA, foco y navegación con Enter hacia Contacto y retorno. Se reconocen 15 casos E2E en total. El intento de ejecución se bloquea antes de los casos por `listen EPERM 127.0.0.1:8000`; no se declara verificada la navegación HTTP, el responsive pintado ni la auditoría axe. Evidencias en `evidence/donation-invitation-*`.

**Revisar:** desde la raíz, ejecutar `npm run dev:storefront` y abrir `http://127.0.0.1:8000/`, justo debajo de la foto principal. Revisar escritorio, tablet y móvil, hover y foco del botón, y su destino en Contacto. No se avanza a otra página ni se activa una operación real de donación.

## 2026-10-18 — Franja compacta y página independiente de donaciones

El usuario aprueba la idea y solicita reducirla a una franja pequeña con el botón «Dona aquí», autorizando expresamente una página aparte sobre la donación. Se sustituye el bloque grande por un icono de brote, la frase «Tus residuos pueden tener un nuevo comienzo» y el CTA a `/donaciones`. Se retiran del Home el párrafo largo, la composición de órbitas y materiales, y los pasos; la franja usa padding vertical de 16 px, tipografía de 15–20 px y botón de al menos 44 px. En móvil, el botón pasa debajo de la frase y se mantiene el espacio de lectura. Las dimensiones pintadas siguen pendientes de revisión local.

Se crea `/donaciones` con título y metadatos propios, ejemplos de materiales investigados (borra de café, cáscaras de huevo y cítricos), y una explicación de consulta, acuerdo de protocolo y coordinación. La entrevista de terreno, recorrido de laboratorio 15:24–17:49, respalda esa posibilidad condicionada; los ejemplos no se presentan como una lista de aceptación automática. La página aclara que la recepción pública aún no está habilitada y que esta propuesta no publica un punto de entrega ni ofrece retiros. El CTA «Consultar por correo» abre un borrador en la aplicación del visitante dirigido al correo institucional ya documentado; no envía mensajes automáticamente, no recibe datos ni confirma materiales o entregas. No se inventan instrucciones de almacenamiento, premios, incentivos, certificaciones ni cantidades.

La ruta se añade a la lista exacta de páginas editoriales del middleware, sin abrir subrutas, operaciones de escritura o comercio. Se conserva el menú existente; se accede desde la franja y se dispone de retorno al Home en la página nueva. No se desarrolla Bio Investigación ni Contacto. Se conservan el hero, las secciones desde Pilares, las fotografías originales, header, redes, carrito y cinta con inercia; 513 reglas CSS ajenas a la donación permanecen idénticas.

**Archivos:** modificados `apps/storefront/src/content/home.ts`, `apps/storefront/src/content/site.ts`, `apps/storefront/src/modules/dk/editorial/home.tsx`, `apps/storefront/src/app/(editorial)/editorial.css`, `tests/home-content.test.mjs`, `tests/editorial-middleware.test.mjs`, `tests/e2e/preview.spec.ts`, `scripts/smoke.mjs` y este registro. Nuevo `apps/storefront/src/app/(editorial)/donaciones/page.tsx`. Respaldos en `.local/donation-strip-before/`. No se incorporan imágenes, videos ni dependencias; backend, DB, Shopify y dominios permanecen sin cambios.

**Verificación:** formato, TypeScript, 36 pruebas y build aprobados; lint sin errores y con las 10 advertencias previas. Las pruebas existentes del middleware recorren también `/donaciones` en ambos modos sin consultar Medusa y bloquean sus mutaciones y `/donaciones/private`. Se preparan los siete casos responsive existentes para comprobar altura compacta, foco, navegación con Enter hacia la página nueva, ejemplos, pasos, enlace de correo y axe en ambos destinos. Se reconocen 15 casos E2E en total; la ejecución vuelve a bloquearse antes de los casos por `listen EPERM 127.0.0.1:8000`. La verificación HTTP, responsive y axe siguen pendientes; no se declaran aprobados. El smoke se amplía a la nueva página y pasa comprobación de sintaxis, sin presentarlo como smoke HTTP ejecutado. Evidencia en `evidence/donation-strip-*`.

**Revisar:** ejecutar `npm run dev:storefront` desde la raíz y abrir `http://127.0.0.1:8000/`; pulsar «Dona aquí». Acceso directo: `http://127.0.0.1:8000/donaciones`. Probar escritorio/móvil, teclado y retorno al inicio. El enlace de correo solo debe abrir el cliente; cualquier envío lo decide el visitante.

## 2026-10-18 — Arte y carácter para la franja de donación

Se enriquece únicamente la franja compacta del Home: emblema decorativo de tres flechas de circularidad con una hoja en el centro, fondo verde cálido con puntos y contornos orgánicos, y microtexto «Un pequeño aporte. Una nueva posibilidad». El titular y el destino `/donaciones` se conservan. El botón «Dona aquí» incorpora corazón de contorno, degradado de verdes, sombra suave y un círculo claro para la flecha. Estos elementos son gráficos de interfaz realizados con SVG y CSS; no se genera ni agrega ningún archivo de imagen o video y el emblema no representa un sello o certificación.

Se mantiene el formato de franja: emblema de 64 px y padding vertical de 16 px en escritorio; emblema de 44 px y padding de 12 px en móvil, donde el botón se coloca debajo del texto. El CTA conserva al menos 44 px de altura. El emblema gira suavemente 20 grados al pasar el puntero por la franja o enfocar su enlace; el botón responde con elevación discreta y movimiento del círculo. Los efectos se desactivan con movimiento reducido y los SVG decorativos están ocultos a tecnologías de asistencia. La revisión visual de estas proporciones sigue pendiente en navegador.

**Archivos:** `apps/storefront/src/content/home.ts`, `apps/storefront/src/modules/dk/editorial/home.tsx`, `apps/storefront/src/app/(editorial)/editorial.css` y este registro. Respaldos en `.local/donation-art-before/`. La página de donaciones, su contenido sobre evaluación y coordinación previa, el hero, las demás secciones, header, carrusel, fotografías y navegación no cambian. Se comprueba que las 537 reglas CSS ajenas a la franja, incluidas las de `/donaciones`, permanecen idénticas.

**Verificación:** formato, TypeScript, 36 pruebas y build aprobados; lint sin errores y con las 10 advertencias previas. Se conserva el caso responsive existente que comprueba altura compacta, área del CTA, foco y navegación hacia `/donaciones`. Su ejecución vuelve a bloquearse antes de los casos por `listen EPERM 127.0.0.1:8000`; no se declaran aprobados el responsive pintado, interacción en navegador, navegación HTTP ni axe. Evidencia en `evidence/donation-art-*`.

**Revisar:** ejecutar `npm run dev:storefront`, abrir `http://127.0.0.1:8000/` y mirar la franja bajo el hero. Probar puntero, foco de teclado, movimiento reducido y el botón «Dona aquí» en móvil y escritorio.

## 2026-10-18 — Giro continuo y saludo de agradecimiento en «Dona aquí»

A petición del usuario, las tres flechas del emblema giran ahora de forma continua con una vuelta cada 16 segundos, velocidad lineal y bucle infinito; la hoja central permanece quieta. Se elimina el giro limitado a hover de la versión anterior. Se retira el corazón del botón y se reemplaza la flecha de su círculo por dos puños de contorno enfrentados. Al pasar el puntero por el botón o enfocarlo con teclado, los puños se aproximan y aparecen pequeños destellos como gesto amistoso. Al salir, vuelven a su posición. El nombre accesible «Dona aquí» y el enlace a `/donaciones` se conservan; el gesto no confirma una donación ni una entrega.

Se dibujan los puños y destellos como SVG decorativo, oculto a tecnologías de asistencia, sin agregar archivos de imagen, videos, dependencias ni JavaScript. La preferencia de movimiento reducido detiene el giro continuo y el desplazamiento de los puños, conservando el icono y el feedback estático. El CTA mantiene un mínimo de 48 px en escritorio y 44 px en móvil, con círculo de 36 px. Se conserva el formato compacto de la franja y su contenido; la explicación de donaciones no cambia.

**Archivos:** `apps/storefront/src/modules/dk/editorial/home.tsx`, `apps/storefront/src/app/(editorial)/editorial.css`, `tests/e2e/preview.spec.ts` y este registro. Respaldos en `.local/donation-gesture-before/`. El hero, las demás secciones, header, carrusel, fotografías originales, rutas y contenido de `/donaciones` permanecen sin cambios. Las 537 reglas CSS ajenas a la franja se conservan idénticas.

**Verificación:** formato, TypeScript, 36 pruebas y build aprobados; lint sin errores y con las 10 advertencias previas. Se amplían los casos responsive existentes para comprobar animación infinita en ejecución, aproximación de ambos puños y destellos al enfocar, además del enlace y área del CTA ya comprobados por esos casos. El caso de movimiento reducido comprueba ausencia de giro y transformaciones en los puños con foco. Se reconocen 15 casos E2E. El intento de ejecutar los casos del Home y movimiento reducido vuelve a bloquearse antes de los casos por `listen EPERM 127.0.0.1:8000`; estas comprobaciones en navegador no se declaran aprobadas. Evidencia en `evidence/donation-gesture-*`.

**Revisar:** ejecutar `npm run dev:storefront`, abrir `http://127.0.0.1:8000/` y observar una vuelta completa del emblema. Pasar el puntero por «Dona aquí», retirar y volver a enfocar con Tab. Probar también la preferencia de movimiento reducido y el destino `/donaciones`.

## 2026-10-18 — Flechas simétricas, abrazo y CTA con más presencia

Se corrige la geometría del reciclaje usando un único trazado de arco y punta, repetido con rotaciones exactas de 0°, 120° y 240° respecto del centro. Las tres flechas tienen así la misma forma y mantienen el giro continuo de 16 segundos alrededor de la hoja estática. Se sustituyen los puños por dos figuras humanas con brazos: al pasar el puntero o enfocar el botón se acercan, cierran los brazos y aparecen pequeños destellos como gesto de abrazo. Al retirar la interacción vuelven a su posición; no se simula una donación confirmada.

El botón «Dona aquí» pasa a un mínimo de 202 × 60 px en escritorio y 180 × 52 px en móvil. Se aumenta la tipografía a 16/15 px y el círculo del icono a 44/38 px; se refuerzan peso tipográfico, brillo interior y sombra para darle presencia sin agrandar todo el bloque. Se conserva el formato de franja, el titular, la mini información y el enlace a `/donaciones`. Las figuras son SVG decorativos de interfaz; no se agregan imágenes, videos, dependencias ni JavaScript. La preferencia de movimiento reducido detiene tanto el giro como las transformaciones del abrazo y la elevación del botón.

**Archivos:** `apps/storefront/src/modules/dk/editorial/home.tsx`, `apps/storefront/src/app/(editorial)/editorial.css`, `tests/e2e/preview.spec.ts` y este registro. Respaldos en `.local/donation-hug-before/`. Se mantienen idénticos el hero, los componentes desde Pilares en adelante y las 537 reglas CSS ajenas a la franja, incluidas las de la página de donaciones. No cambian contenido, rutas, header, carrusel, fotografías, backend o base de datos.

**Verificación:** formato, TypeScript, las 36 pruebas existentes y build aprobados; lint sin errores y con las 10 advertencias previas. Se adaptan las comprobaciones E2E existentes al icono de abrazo y las dimensiones mínimas nuevas del CTA, conservando las de giro infinito, foco, enlace y movimiento reducido. El límite de altura compacta se ajusta para permitir el botón mayor, sin fijar una altura que pueda recortar texto. Se reconocen 15 casos E2E. El intento de ejecutarlos sigue bloqueado antes de los casos por `listen EPERM 127.0.0.1:8000`; proporciones pintadas, legibilidad visual de los iconos, sensación del abrazo, navegación HTTP y axe siguen pendientes de revisión en navegador. Evidencia en `evidence/donation-hug-*`.

**Revisar:** ejecutar `npm run dev:storefront` y abrir `http://127.0.0.1:8000/`. Observar la uniformidad de las tres puntas durante una vuelta, pasar el puntero por «Dona aquí», probar foco con Tab y movimiento reducido; revisar también el tamaño del botón en móvil y su enlace a `/donaciones`.

## 2026-10-18 — Cuatro fotografías juntas en la franja de donación

Se incorpora entre el mensaje y el botón «Dona aquí» una composición de cuatro fotografías originales ya disponibles, con marcos marfil, superposición ligera y ángulos de −9°, −3°, 5° y 11°. Se inspeccionan visualmente las fotos antes de elegirlas. Se usan `detergente modelo.JPG`, `jabon modelo.JPG`, `sales de bañoo.JPG` y `Dueñas dk.JPG`, mediante sus variantes WebP existentes `detergente`, `champu`, `sales` y `fundadoras`. No se generan, descargan, editan ni agregan activos fotográficos; los originales y las variantes se conservan.

Las fotos disponibles muestran productos y equipo, no residuos ni procesos de recepción. La composición se presenta como «Productos y equipo de BioProductos DK», con los textos alternativos descriptivos existentes; no representa una lista de materiales aceptados ni demuestra ingredientes, propiedades o trazabilidad de una donación. La selección conecta visualmente a las personas y productos de DK, manteniendo el alcance condicionado explicado en `/donaciones`.

En escritorio, los cuatro marcos quedan juntos en medio de la franja. Hasta 1099 px se reducen; hasta 899 px pasan debajo del texto con el botón al costado, y en móvil se ordenan debajo del mensaje y antes del CTA centrado. La altura puede crecer con el contenido para evitar recortes y conservar legibilidad. Cada marco responde al puntero con una elevación discreta; con movimiento reducido se mantiene su inclinación estática. Se reutiliza `HomePhoto` con carga diferida, tamaños declarados para miniaturas y variantes locales. Siguen existiendo seis fotografías distintas, ahora con diez colocaciones en el Home.

**Archivos:** `apps/storefront/src/modules/dk/editorial/home.tsx`, `apps/storefront/src/app/(editorial)/editorial.css`, `tests/e2e/preview.spec.ts` y este registro. Respaldos en `.local/donation-photos-before/`. Se conservan el giro simétrico de reciclaje, el abrazo, tamaño y destino del botón, el hero y las secciones siguientes. Las 537 reglas CSS ajenas a la franja, incluidas las de la página de donaciones, permanecen idénticas. No cambian header, carrusel, rutas, contenido, backend o base de datos.

**Verificación:** formato, TypeScript, 36 pruebas y build aprobados; lint sin errores y con las 10 advertencias previas. Las pruebas de integridad vuelven a confirmar que los seis originales y sus variantes no cambian y se decodifican correctamente. Se adaptan los casos responsive existentes a cuatro miniaturas con carga diferida y diez colocaciones, conservando los mínimos de tamaño de las seis fotos grandes. Los límites preparados para la franja permiten el nuevo conjunto sin fijar una altura rígida. Se reconocen 15 casos E2E; el intento de ejecutar Home y movimiento reducido sigue bloqueado antes de los casos por `listen EPERM 127.0.0.1:8000`. Composición pintada, recortes, responsive, navegación HTTP y axe siguen pendientes de revisión local. Evidencia en `evidence/donation-photos-*`.

**Revisar:** ejecutar `npm run dev:storefront`, abrir `http://127.0.0.1:8000/` y revisar la franja bajo el hero en escritorio, tablet y móvil. Comprobar rostros y productos en las miniaturas, superposición, hover y movimiento reducido, y que «Dona aquí» mantiene el acceso a `/donaciones`.

## 2026-10-18 — Remodelación editorial del ADN de BioProductos DK

Se reemplaza exclusivamente la sección de cuatro tarjetas del ADN (S04) por un bloque editorial más informativo que prepara el recorrido hacia los productos. Nuevo titular: «Antes de un producto, hay una forma de pensar». Una introducción conecta los cuatro pilares; el explorador presenta Biotecnología, Nanotecnología, Innovación y Sustentabilidad con una premisa, dos párrafos, un ejemplo contextual y conceptos clave para cada uno. El contenido se concentra en qué se investiga, cómo se relacionan materiales y formulación, el recorrido del desarrollo y el propósito circular.

**Fuente y veracidad:** `docs/ENTREVISTA_TERRENO_BIO_DK.md`, bloques de cosmética sólida y residuos (0:00–0:38), nanoemulsiones/equipamiento (2:05–3:58), fabricación, controles y lotes del recorrido de cosmética, y colaboraciones para materiales seleccionados (15:24–17:49). La reducción de agua se describe como intención del formato sólido durante su preparación, sin cuantificar ahorros. No se incorporan cifras de rendimiento, sellos, autorizaciones, patentes, premios, fórmulas o detalles técnicos no documentados; tampoco se reproduce la explicación geométrica errónea de la transcripción. No se afirma que todos los productos incorporen nanotecnología ni se presenta una certificación ambiental.

**Diseño e interacción:** fondo marfil, jerarquía tipográfica amplia, cuatro desplegables con número, premisa, indicadores +/− y ejemplos diferenciados. Cada pilar tiene una representación conceptual en un panel verde profundo: naturaleza, pequeña escala, desarrollo y circularidad. El panel cambia mediante CSS `:has()` al abrir el desplegable y acompaña la lectura con posición sticky en escritorio; se coloca antes del explorador en móvil. Las ilustraciones son SVG decorativos de interfaz, no datos experimentales ni imágenes de laboratorio. El contenido textual accesible se encuentra en los desplegables; el panel decorativo se oculta a tecnologías de asistencia.

Se utiliza `details/summary` nativo con grupo `name`, primer pilar abierto y funcionamiento sin JavaScript. En navegadores que soportan agrupación se abre uno a la vez; si un navegador permite abrir varios, el panel prioriza el primero abierto. Sin soporte de `:has()` permanece el primer gráfico como apoyo estático y los textos siguen disponibles. Respuesta suave de filas al puntero, transición +/− y aparición discreta del contenido; las animaciones respetan movimiento reducido mediante las reglas globales existentes. Un cierre invita a «Descubrir los productos» y desplaza a `#products-heading`, la sección inmediatamente posterior del Home; sus enlaces al catálogo independiente permanecen disponibles.

**Archivos:** `apps/storefront/src/content/home.ts`, `apps/storefront/src/modules/dk/editorial/home.tsx`, `apps/storefront/src/app/(editorial)/editorial.css`, `tests/e2e/preview.spec.ts` y este registro. Respaldos en `.local/dna-redesign-before/`. Se retiran los estilos de las tarjetas anteriores y sus ajustes responsive; se limpia la referencia obsoleta del selector compartido de movimiento reducido conservando su efecto sobre el hero. Las 548 reglas CSS ajenas al ADN conservan sus declaraciones. Hero, franja de donación con cuatro fotos y abrazo, productos y secciones posteriores permanecen idénticos en código y contenido. No cambian fotografías, header, carrusel, rutas, backend o DB, y no se desarrolla Bio Investigación ni otra página.

**Verificación:** formato, TypeScript, las 36 pruebas existentes y build aprobados; lint sin errores y con las 10 advertencias previas. El HTML compilado contiene los cuatro desplegables agrupados, un solo `open` inicial, las cuatro explicaciones con ejemplos y conceptos, cuatro escenas decorativas y el enlace cuyo destino existe. No se incorporan medios o formularios al ADN; se mantienen diez colocaciones fotográficas y once marcadores de secciones en el Home.

Se amplían los siete casos responsive existentes para recorrer los cuatro pilares con Enter, comprobar apertura exclusiva, contenido y cambio de escena, área del resumen y desplazamiento hacia productos. El caso sin JS comprueba apertura y cambio de escena nativos; el de navegación valida los destinos de ambos enlaces internos (#contenido y #products-heading). Se reconocen 15 casos E2E. El intento de ejecutar Home, navegación y alternativa sin JS se bloquea antes de los casos por `listen EPERM 127.0.0.1:8000`: interacción real, responsive pintado, comportamiento sticky, auditoría axe y aceptación visual siguen pendientes de revisión local. Evidencias en `evidence/dna-redesign-*`.

**Revisar:** ejecutar `npm run dev:storefront` desde la raíz y abrir `http://127.0.0.1:8000/#pillars-heading`. Explorar los cuatro pilares con puntero y teclado, comprobar el panel visual y pulsar «Descubrir los productos». Revisar escritorio, tablet, móvil, preferencia de movimiento reducido y funcionamiento sin JavaScript. Para las comprobaciones preparadas: `npm run test:e2e -- --grep 'Home con fotografías originales|without JavaScript|independent routes'` cuando el servidor pueda iniciarse localmente.

## 2026-10-18 — ADN reducido a banner compacto de cuatro bloques

La revisión posterior del usuario considera demasiado grande y cargada la remodelación editorial. Esta petición sustituye esa propuesta para el ADN: se retiran desplegables, panel visual, ejemplos extensos, chips y CTA interno, y se implementa un banner de cuatro bloques uniformes con todo su contenido visible. Se conserva «El ADN de BioProductos DK» y se recupera «La naturaleza inspira. La ciencia conecta», con jerarquía de 21–28 px en lugar del titular grande. Cada pilar presenta un icono decorativo, un nombre y una frase breve.

El contenido se resume a componentes de origen orgánico, nanoemulsiones como estrategia de formulación, investigación y desarrollo de productos, y búsqueda de nuevo valor para residuos orgánicos. Se mantiene la fuente de la entrevista documentada en el registro anterior, sin añadir certificaciones, resultados cuantificados o afirmaciones científicas nuevas. La versión extensa queda conservada en el respaldo y en el historial del equipo, pero deja de cargarse como contenido del Home.

**Diseño:** marco fino, fondo marfil con matiz verde suave, cuatro bloques alineados sin escalonamiento, iconos pequeños con acentos verdes y miel, bordes discretos y espaciados contenidos. Cuatro columnas en escritorio; dos hasta 1099 px; una fila por pilar por debajo de 360 px para no cortar nombres largos. La sección usa padding vertical explícito de 24 px (18 px en móvil), sin la altura generosa de las secciones editoriales anteriores. Los bloques responden al puntero con una elevación de 3 px y un pequeño giro de icono; movimiento reducido elimina esas transformaciones. No se incorporan controles ficticios ni se necesita JavaScript.

**Archivos:** `apps/storefront/src/content/home.ts`, `apps/storefront/src/modules/dk/editorial/home.tsx`, `apps/storefront/src/app/(editorial)/editorial.css`, `tests/e2e/preview.spec.ts` y este registro. Respaldos en `.local/dna-banner-before/`. Se mantienen el identificador `pillars-heading`, el marcador S04, orden del Home y las diez colocaciones de las seis fotografías originales. Hero, donación, productos y secciones siguientes conservan su código y contenido; las 548 reglas CSS ajenas al ADN permanecen idénticas. No se cambian rutas, header, carrusel, backend, DB ni otras páginas.

**Verificación:** formato, TypeScript, las 36 pruebas existentes y build aprobados; lint sin errores y con las 10 advertencias previas. Se adaptan los casos responsive para validar cuatro bloques, títulos, ausencia de controles/panel anterior y altura contenida; la alternativa sin JS comprueba títulos y descripciones visibles. Se retiran del caso de navegación la referencia y el destino de la ancla eliminada, conservando la comprobación del salto al contenido. Se reconocen 15 casos E2E. El intento de ejecutar Home, navegación y alternativa sin JS sigue bloqueado antes de los casos por `listen EPERM 127.0.0.1:8000`: proporciones pintadas, altura real, responsive y auditoría axe siguen pendientes de revisión local. Evidencia en `evidence/dna-banner-*`.

**Revisar:** ejecutar `npm run dev:storefront` y abrir `http://127.0.0.1:8000/#pillars-heading`. Comprobar que el ADN se perciba como un banner breve antes de productos, alineación de los cuatro bloques en escritorio y adaptación en móvil.

## 2026-10-18 — Más presencia y relato científico en el banner ADN

Se mantiene la dirección aprobada de cuatro bloques ordenados y se refuerza su presencia sin recuperar el explorador grande. El titular pasa de un máximo de 28 a 34 px y los iconos de 32 a 40 px en escritorio. Cada bloque incorpora una frase destacada y una explicación breve: componentes de cáscaras y borra de café; nanoemulsiones para incorporar componentes de interés en formulaciones; investigación y ensayos para desarrollar productos cotidianos; y revalorización de residuos mediante la ciencia. Se conserva la base documental de la entrevista, sin nuevas cifras, propiedades, patentes o certificaciones.

**Dirección visual:** matices de salvia, verde suave y miel, iconos sobre marcos marfil, contornos circulares discretos en las esquinas, línea inferior de acento y contraste tipográfico entre la frase destacada y su explicación. Padding y radios aumentan moderadamente para acompañar el tamaño de texto. El encabezado secundario conecta el laboratorio con el cuidado cotidiano. Los cuatro bloques siguen alineados y muestran todo su contenido a simple vista. Hover con elevación de 4 px, refuerzo de sombra y giro/escala suaves del icono; movimiento reducido elimina esas transformaciones. No hay desplegables, panel adicional, nuevas imágenes o JavaScript.

En escritorio se mantienen cuatro columnas; hasta 1099 px, dos. En móvil continúan dos bloques por fila con icono sobre el título, y por debajo de 360 px se utiliza una columna con icono al costado para conservar nombres y lectura. El contenido crece de forma natural sin alturas fijas que lo recorten. La ampliación está implementada; tamaño y proporciones pintadas siguen pendientes de revisión local.

**Archivos:** `apps/storefront/src/content/home.ts`, `apps/storefront/src/modules/dk/editorial/home.tsx`, `apps/storefront/src/app/(editorial)/editorial.css`, `tests/e2e/preview.spec.ts` y este registro. Respaldos en `.local/dna-presence-before/`. Se mantienen idénticos el hero, la franja de donación, los productos y todas las secciones siguientes, además de las 548 reglas CSS ajenas al ADN. No cambian imágenes, header, carrusel, rutas, backend, DB u otras páginas.

**Verificación:** formato, TypeScript, las 36 pruebas existentes y build aprobados; lint sin errores y con las 10 advertencias previas. Se conservan las comprobaciones de cuatro bloques, títulos, contenido visible sin JS, ausencia de panel y controles, foco y responsive, ajustando el límite preparado de altura para permitir textos y tamaños mayores sin fijar altura al componente. Se reconocen 15 casos E2E. El intento de ejecutar Home y alternativa sin JS se bloquea antes de los casos por `listen EPERM 127.0.0.1:8000`: composición, contraste pintado, efectos de puntero, altura real, responsive y auditoría axe siguen pendientes de revisión en navegador. Evidencia en `evidence/dna-presence-*`.

**Revisar:** ejecutar `npm run dev:storefront` y abrir `http://127.0.0.1:8000/#pillars-heading`. Revisar el tamaño del banner antes de productos, equilibrio de texto e iconos, hover y alternativa de movimiento reducido, tanto en escritorio como en móvil.

## 2026-10-18 — Nueva dirección de color y tipografía para el ADN

El usuario pide un diseño más profesional y limpio, colores más llamativos y tipografía agradable. Se replantea la sección como una única banda de cuatro campos de color: bosque profundo, lima, marfil verdoso y verde hoja. Se retiran los marcos anidados, degradados de las tarjetas, contornos decorativos de esquina y sombras individuales. Los cuatro pilares siguen alineados y muestran toda su información; el tamaño de la banda continúa creciendo con su contenido sin panel grande ni desplegables.

**Jerarquía:** pequeño enfoque editorial («El origen», «La escala», «Las ideas», «El ciclo»), icono de línea, título y explicación breve con frase inicial destacada. La tipografía de esta sección pasa a la familia nativa del sistema (`-apple-system`, `BlinkMacSystemFont`, `Segoe UI`, sans-serif): en Mac utiliza la tipografía de sistema de Apple, sin descargar fuentes. Se moderan pesos y espaciado de letras y se refuerza la separación entre título y cuerpo. La información científica y los textos explicativos existentes se conservan; las nuevas etiquetas solo organizan la lectura.

El hover utiliza un movimiento discreto del icono y expansión de una línea de acento, sin desplazar campos de color ni abrir contenido. Se mantiene movimiento reducido, cuatro columnas en escritorio, dos hasta 1099 px y una por debajo de 360 px. Los iconos son los SVG decorativos existentes; no se incorporan imágenes, videos, fuentes remotas, dependencias ni JavaScript.

**Archivos:** `apps/storefront/src/content/home.ts`, `apps/storefront/src/modules/dk/editorial/home.tsx`, `apps/storefront/src/app/(editorial)/editorial.css` y este registro. Respaldos en `.local/dna-color-before/`. Hero, donación, productos y secciones siguientes conservan código y contenido; las 548 reglas CSS ajenas al ADN permanecen idénticas. No cambian header, carrusel, fotografías, rutas, backend, DB ni otras páginas.

**Verificación:** formato, TypeScript, las 36 pruebas existentes y build aprobados; lint sin errores y con las 10 advertencias previas. El cálculo de luminancia para las ocho combinaciones principales de texto/fondo de los cuatro campos da un contraste mínimo de 4,73:1; es una comprobación de colores sólidos declarados, no una auditoría visual del navegador ni acreditación completa de accesibilidad. Se conservan los casos E2E responsive existentes. El intento vuelve a bloquearse antes de ejecutarlos por `listen EPERM 127.0.0.1:8000`. También se intenta abrir un navegador aislado para una posible revisión sin servidor, pero Chrome se cierra al arrancar; ese intento no produce verificación visual. Composición pintada, tipografía efectiva del sistema, altura real, responsive y axe siguen pendientes de revisión local. Evidencia en `evidence/dna-color-*`.

**Revisar:** ejecutar `npm run dev:storefront` y abrir `http://127.0.0.1:8000/#pillars-heading`. Revisar la banda de colores y la nueva tipografía en escritorio/móvil, contraste de lectura y hover con y sin movimiento reducido.

## 2026-10-18 — Icono de naturaleza y circularidad en el encabezado ADN

Se elimina «Del laboratorio a una nueva forma de cuidar.» del Home y se reemplaza por un icono decorativo de hoja, flechas circulares y pequeños nodos que vinculan naturaleza, circularidad y ciencia. El SVG se integra en un círculo verde suave de 64 px en escritorio y 42 px en móvil; queda oculto a lectores de pantalla por ser decorativo. Se conservan el titular, los cuatro pilares y las demás secciones, sin incorporar fotografías, dependencias o nuevos comportamientos.

**Archivos:** `apps/storefront/src/modules/dk/editorial/home.tsx`, `apps/storefront/src/app/(editorial)/editorial.css` y este registro.

**Verificación:** TypeScript y formato aprobados; lint sin errores y con las 10 advertencias previas. No se repite build ni E2E para este cambio puntual. La revisión visual en navegador sigue pendiente por las limitaciones del entorno ya documentadas. Revisar en `http://127.0.0.1:8000/#pillars-heading` con `npm run dev:storefront`.

## 2026-10-18 — Iniciales DK en el emblema ADN

A petición del usuario, la hoja central se sustituye por «DK» centrado dentro del emblema. Se conservan las flechas circulares, los nodos, los colores y las dimensiones responsive. Cambian únicamente el SVG en `apps/storefront/src/modules/dk/editorial/home.tsx`, su estilo tipográfico en `apps/storefront/src/app/(editorial)/editorial.css` y este registro. TypeScript y formato aprobados; revisión visual pendiente. No se repiten build ni E2E para este ajuste puntual.

## 2026-10-18 — Retiro completo del emblema ADN

El usuario solicita dejar libre esa zona. Se elimina el emblema completo (DK, flechas, nodos y fondo circular) del encabezado ADN, junto con sus estilos de escritorio y móvil. No se agrega un sustituto. Cambian `apps/storefront/src/modules/dk/editorial/home.tsx`, `apps/storefront/src/app/(editorial)/editorial.css` y este registro. Formato aprobado y ausencia de referencias a `dk2-dna-emblem` comprobada en ambos archivos. No se repiten TypeScript, build ni E2E para esta eliminación puntual; revisión visual pendiente.

## 2026-10-18 — Productos del Home: fotografías y acceso directo

El usuario solicita una sección concreta y limpia que invite a explorar, conservando el tamaño y orden de las fotografías. Se reemplaza el encabezado por «Nuestra colección / Ciencia para tu día a día» y una frase breve. Se mantienen las tres familias en orden detergentes → champús → sales, las proporciones fotográficas, los desplazamientos de 40/80 px en escritorio, la composición de dos columnas con sales apaisada en tablet y una columna en móvil.

**Diseño e interacción:** fondo verde claro uniforme, radios consistentes, tipografía nativa del sistema, etiqueta de categoría, nombre y una sola descripción por familia. Se eliminan números superpuestos, chips sobre las fotos, subtítulos y párrafos repetidos. Cada tarjeta completa, incluida su fotografía, es un único enlace nativo a `/productos`, con nombre accesible y foco visible. El remate «Descubrir…» incluye una flecha sobre círculo lima, que cambia a bosque al hover/foco; la fotografía tiene un acercamiento discreto. Movimiento reducido elimina las transformaciones. «Ver todos los productos» destaca en el encabezado. Se conserva un aviso breve de demostración y disponibilidad por confirmar. No hay enlaces anidados, compra habilitada ni filtros o fichas fingidos; `/productos` conserva su estado de preparación y no se desarrolla otra página.

**Control del catálogo:** `docs/ENTREVISTA_TERRENO_BIO_DK.md` (7:15–7:34) y PRD/Contexto Maestro describen ocho referencias agrupadas en tres familias: dos detergentes, tres champús (seco, graso, normal) y tres sales de baño sin nombres de variedades. Las fotografías originales ya inventariadas muestran etiquetas cítrico/eucaliptus. La consulta textual del [Home oficial](https://bioproductosdk.com/) mediante índice de búsqueda también muestra esos aromas; la apertura directa agotó el tiempo de espera y `/productos/` no resultó accesible. No se descargaron medios. No se presentan ocho fichas ficticias ni se extraen precios o propiedades de los envases. `jabon modelo.JPG` está identificado por su etiqueta como champú: su nombre de archivo no confirma una línea de jabones. Jabones, acondicionador y origen marino de las sales siguen sin confirmar; se consultó al responsable sin detener el trabajo independiente. Exfoliantes y bombas de baño aparecen como desarrollos del laboratorio (recorrido 1:27–1:40), no como referencias comerciales confirmadas; no se agregan al adelanto comercial. Queda pendiente recibir nombres, fichas y fotos autorizadas de las familias adicionales para incorporarlas con veracidad.

**Archivos:** `apps/storefront/src/content/home.ts`, `apps/storefront/src/modules/dk/editorial/home.tsx`, `apps/storefront/src/app/(editorial)/editorial.css`, `tests/e2e/preview.spec.ts` y este registro. Respaldo en `.local/products-clean-before/`. No se agregan imágenes ni dependencias. Se verifica que contenido y componente fuera de Productos coinciden con el respaldo; no cambian header, carrusel, ADN, donación, rutas, backend o DB.

**Verificación:** TypeScript, formato, las 36 pruebas existentes y build del storefront aprobados; lint sin errores y con las 10 advertencias previas. El HTML compilado contiene tres enlaces de tarjeta a `/productos`, una fotografía por tarjeta, sin enlaces anidados, y conserva las diez colocaciones de fotos y once marcadores del Home. Los checks de fotos existentes comprueban decodificación de WebP y hashes de los originales sin cambios. Se amplían los siete casos responsive preparados para comprobar las familias y abrir el catálogo al pulsar foto o Enter, con retorno al Home. También se corrige un error real del spec: tras visitar Donaciones faltaba volver al Home antes de comprobar ADN y productos. Se reconocen 15 casos E2E. El intento de ejecución se bloquea antes de los casos por `listen EPERM: operation not permitted 127.0.0.1:8000`; clics reales, responsive pintado, hover/foco y axe siguen pendientes de revisión en navegador. Evidencia en `evidence/products-clean-*`.

**Revisar:** desde la raíz ejecutar `npm run dev:storefront` y abrir `http://127.0.0.1:8000/#products-heading`. Revisar escritorio, tablet y móvil, pulsar las fotos y recorrer las tarjetas con Tab/Enter. Cada una lleva al catálogo en preparación. Para ejecutar las comprobaciones preparadas en un entorno con permisos de servidor: `npm run test:e2e -- --grep 'Home con fotografías originales'`. No avanzar a la página Productos ni a otra página sin aprobación.

## 2026-10-18 — Cinco familias y tamaños uniformes en Productos

El responsable confirma expresamente que existen los productos que había mencionado y solicita incorporarlos. Se añaden **Jabones** y **Acondicionador** a las tres familias existentes, conservando el orden inicial detergentes → champús → sales y agregando las dos nuevas al final. La confirmación queda incorporada en `docs/MASTER_CONTEXT.md`; sustituye la duda del registro anterior sobre su existencia, sin actualizar ficticiamente el total histórico de ocho referencias ni atribuir variantes, formulaciones, formatos o propiedades no recibidas. Se conserva «Sales de baño» como denominación documentada, sin inferir su composición mineral.

**Tamaños:** todas las superficies visuales pasan a proporción vertical **4:5**, la utilizada por la foto del detergente en escritorio. Se utilizan columnas de idéntico ancho, se eliminan los desplazamientos escalonados y el formato especial de sales en tablet, y se alinean cuerpos y accesos de las tarjetas mediante flex y filas uniformes. Tres columnas en escritorio, dos hasta 1099 px y una hasta 699 px, siempre con la misma proporción visual. Se mantiene el diseño limpio aprobado, las interacciones de fotografía/flecha y el soporte de movimiento reducido.

**Fotografías:** la inspección de `public/images/home/` encuentra los mismos seis originales y sus derivados; no hay fotos individuales identificadas de jabones o acondicionador. Sus tarjetas muestran reservas tipográficas «Fotografía por incorporar», con el mismo marco y tamaño que las fotos reales. No se reutiliza la imagen del champú como jabón ni se inventan, descargan o generan imágenes. Las cinco tarjetas enlazan a `/productos`, que conserva su estado de preparación. No se modifica otra sección del Home ni otra página, backend, DB o datos comerciales.

**Archivos:** `apps/storefront/src/content/home.ts`, `apps/storefront/src/modules/dk/editorial/home.tsx`, `apps/storefront/src/app/(editorial)/editorial.css`, `tests/home-content.test.mjs`, `tests/e2e/preview.spec.ts`, `docs/MASTER_CONTEXT.md` y este registro. Respaldo de código/pruebas en `.local/products-five-before/`. La clave de cada familia y sus referencias accesibles pasan a depender de un ID propio, permitiendo tarjetas sin fotografía sin duplicar identificadores.

**Verificación:** TypeScript, formato, 36 pruebas y build del storefront aprobados; lint sin errores, con las 10 advertencias previas. El HTML compilado contiene cinco tarjetas enlazadas, tres fotografías de producto y dos reservas sin archivo de imagen, con identificadores de Productos únicos y referencias accesibles válidas. Se conservan las diez colocaciones fotográficas y once marcadores del Home; los controles de hashes/decodificación confirman originales y derivados conservados. Contenido y componente fuera de Productos coinciden con el respaldo. Las pruebas E2E preparadas ahora comprueban cinco destinos, las dos reservas, igualdad de ancho/alto respecto del detergente y relación 4:5 en los siete anchos existentes. Se reconocen 15 casos; no se repite su ejecución, bloqueada en el intento anterior por `listen EPERM 127.0.0.1:8000`. Dimensiones pintadas, clics, foco y responsive requieren revisión local y no se declaran aprobados en navegador. Evidencia en `evidence/products-five-*`.

**Hallazgo fuera de alcance:** la comprobación inicial de identificadores de todo el HTML detectó dos `clipPath` con `id="a"` fuera de Productos. La comprobación de los identificadores de la sección pasa; queda pendiente revisar esos SVG globales en una auditoría de componentes, sin atribuir un fallo visual no observado ni modificar otras secciones en esta tarea.

**Revisar:** `npm run dev:storefront` y `http://127.0.0.1:8000/#products-heading`. Comprobar las cinco familias, alineación y proporciones en escritorio/móvil. Pendiente recibir las fotografías originales de jabones y acondicionador para sustituir sus reservas. La incorporación de fotos no autoriza desarrollar otra página ni habilitar ventas reales.

## 2026-10-18 — Encabezado de Productos centrado y sin botón superior

Se retira «Ver todos los productos», el botón verde del encabezado. Se centran «Nuestra colección», «Ciencia para tu día a día» y su frase de apoyo. El titular utiliza la tipografía de sistema existente, verde bosque, peso 550 y tamaño fluido entre 35 y 60 px. La etiqueta superior gana espaciado entre letras y el subtítulo aumenta a 16–18 px. El ancho de lectura se limita y el encabezado recibe un contenedor propio para conservar su alineación en móvil sin modificar los encabezados de otras secciones. Las cinco tarjetas y sus enlaces, fotografías y proporciones permanecen iguales.

**Archivos:** `apps/storefront/src/modules/dk/editorial/home.tsx`, `apps/storefront/src/app/(editorial)/editorial.css` y este registro. TypeScript, formato y lint del componente modificado aprobados. No se repiten build ni E2E para este ajuste de presentación; revisión visual pendiente por la limitación del entorno ya documentada. Revisar con `npm run dev:storefront` en `http://127.0.0.1:8000/#products-heading`.

## 2026-10-18 — Mayor protagonismo del encabezado de colección

Se refuerza «Nuestra colección» con una cápsula lima, texto bosque de 15–20 px, peso 750 y un pequeño punto decorativo, sin convertir la etiqueta en un control. El titular aumenta a 40–76 px, peso 600, ancho de lectura de 19ch y centrado para una composición más visible; el subtítulo pasa a 17–20 px. Se mantienen los textos, las cinco tarjetas y sus tamaños, sin incorporar botones, imágenes, animaciones ni cambios globales.

**Archivos:** `apps/storefront/src/app/(editorial)/editorial.css` y este registro. Formato y análisis sintáctico CSS con PostCSS aprobados. No se repiten TypeScript, build ni E2E para este cambio exclusivamente de estilos. Revisión visual pendiente en `http://127.0.0.1:8000/#products-heading`, ejecutando `npm run dev:storefront`.

## 2026-10-18 — Jerarquía y espacio corregidos en el encabezado de Productos

Se retiran por completo la cápsula, marco, fondo lima y punto decorativo. «Nuestra colección» pasa a ser el H2 principal y nombre accesible de la sección, con tipografía de sistema, verde bosque y tamaño de 32–48 px. «Ciencia para tu día a día» se convierte en subtítulo de 18–24 px; la descripción queda en 14–16 px. Se reduce el padding superior de Productos a 26–44 px y la separación antes de las tarjetas a 24–32 px, conservando el centrado. Las cinco tarjetas y sus dimensiones no cambian.

**Archivos:** `apps/storefront/src/modules/dk/editorial/home.tsx`, `apps/storefront/src/app/(editorial)/editorial.css`, `tests/e2e/preview.spec.ts` (nombre accesible esperado) y este registro. TypeScript, formato, sintaxis CSS con PostCSS y lint del componente aprobados. No se repiten build ni E2E para este ajuste de presentación; revisión visual pendiente por las limitaciones del entorno documentadas. Revisar con `npm run dev:storefront` en `http://127.0.0.1:8000/#products-heading`.

## 2026-10-18 — Título de colección más ancho y composición equilibrada

Se elimina el límite de 760 px del encabezado para alinearlo con el ancho completo de la cuadrícula. «Nuestra colección» adopta la fuente local Manrope ya disponible, mayúsculas visuales, espaciado positivo moderado y escala responsive de 26–92 px para una presencia más horizontal, sin deformar las letras con transformaciones. Se mantiene el título semántico y su texto accesible. El subtítulo se modera a 17–22 px y peso 450; se ajustan sus separaciones y se reduce el padding superior a 22–38 px. Se conserva el centrado sin marco, fondo de cápsula o decoraciones, y las cinco tarjetas no cambian.

**Archivos:** `apps/storefront/src/app/(editorial)/editorial.css` y este registro. Formato y sintaxis CSS con PostCSS aprobados. No se repiten TypeScript, build ni E2E para este cambio exclusivamente de estilos. Encuadre, proporción tipográfica y responsive pintado siguen pendientes de revisión local en `http://127.0.0.1:8000/#products-heading` con `npm run dev:storefront`.

## 2026-10-18 — Opacidad y tipografía del título de colección

Se aplica opacidad **0,6 (6/10)** únicamente al H2 «Nuestra colección». La fuente pasa a Avenir Next, cuya instalación se comprueba en `/System/Library/Fonts/Avenir Next.ttc`; Manrope local permanece como alternativa para otros equipos. Se suavizan el peso a 500 y el espaciado a 0,035em, conservando tamaño, mayúsculas, ancho del contenedor y posición. No se descargan fuentes ni se modifica la opacidad de subtítulos o tarjetas.

**Archivos:** `apps/storefront/src/app/(editorial)/editorial.css` y este registro. Formato y análisis sintáctico CSS aprobados. Cambio exclusivamente de estilos; no se repiten TypeScript, build ni E2E. Apariencia y fuente efectiva en navegador pendientes de revisión local en `http://127.0.0.1:8000/#products-heading`.

## 2026-10-18 — Línea bajo Nuestra colección

Se añade una línea decorativa centrada bajo el título mediante `h2::after`: 1 px de grosor, ancho responsive de 80–160 px y separación de 16 px. Utiliza el color del título y participa de su opacidad del 60 %. No se añaden imágenes ni se modifican textos o tarjetas. Cambian `apps/storefront/src/app/(editorial)/editorial.css` y este registro. Formato y sintaxis CSS aprobados; revisión visual pendiente. No se repiten TypeScript, build ni E2E para este ajuste de estilos.

## 2026-10-18 — Separador de colección a todo el ancho

Se amplía la línea bajo «Nuestra colección» al 100 % del encabezado, alineándola con los extremos de la cuadrícula de productos en escritorio y móvil. Se conservan grosor de 1 px, color, opacidad y separación. Cambian `apps/storefront/src/app/(editorial)/editorial.css` y este registro. Formato aprobado; revisión visual pendiente. No se repiten TypeScript, build ni E2E para este cambio puntual de anchura.

## 2026-10-18 — Línea ajustada al título, más cercana y definida

La línea pasa a 2 px de grosor, 80 % de opacidad y 6 px de separación bajo «Nuestra colección». El H2 se ajusta al ancho de su texto con `fit-content`, limitado al ancho disponible y centrado, para que la línea no alcance los bordes de la cuadrícula. El título conserva su transparencia del 60 % mediante color con alfa, sustituyendo la opacidad del contenedor para que no reduzca adicionalmente el 80 % solicitado para la línea. No cambia el resto del encabezado ni las tarjetas.

**Archivos:** `apps/storefront/src/app/(editorial)/editorial.css` y este registro. Formato y sintaxis CSS con PostCSS aprobados. No se repiten TypeScript, build ni E2E para este ajuste de estilos. Revisión visual pendiente en `http://127.0.0.1:8000/#products-heading`.

## 2026-10-18 — Línea de colección al 60 %

Se reduce únicamente el alfa del color de la línea bajo «Nuestra colección» de 0,8 a 0,6 (6/10), conservando ancho, grosor y posición. Cambian `apps/storefront/src/app/(editorial)/editorial.css` y este registro. Formato aprobado; revisión visual pendiente. No se repiten TypeScript, build ni E2E para este ajuste de color.

## 2026-10-18 — Título de colección al 80 %

Se sube el alfa del texto «Nuestra colección» de 0,6 a 0,8 (8/10), manteniendo la línea al 60 %. Cambian `apps/storefront/src/app/(editorial)/editorial.css` y este registro. Formato aprobado; revisión visual pendiente. No se repiten TypeScript, build ni E2E para este ajuste de color.

## 2026-10-18 — Corrección del título a 6,5/10

El usuario corrige el incremento: se toma el valor anterior de 6/10 y se aumenta solo 0,5, dejando «Nuestra colección» al 65 % de opacidad (alfa 0,65). La línea conserva el 60 %. Cambian `apps/storefront/src/app/(editorial)/editorial.css` y este registro. Formato aprobado; revisión visual pendiente. No se repiten TypeScript, build ni E2E para este ajuste puntual de color.

## 2026-10-18 — Jabones y acondicionador centrados en la segunda fila

En escritorio (desde 1100 px), la cuadrícula utiliza seis columnas internas y cada tarjeta ocupa dos. Las tres primeras llenan la primera fila; Jabones comienza en la segunda columna y Acondicionador en la cuarta, formando una segunda fila centrada con márgenes laterales simétricos. Se conservan el ancho de todas las tarjetas, proporción 4:5, separación y orden de lectura. Tablet y móvil mantienen sus distribuciones de dos y una columnas.

**Archivos:** `apps/storefront/src/app/(editorial)/editorial.css`, `tests/e2e/preview.spec.ts` y este registro. Formato y sintaxis CSS aprobados; Playwright reconoce los 15 casos existentes. Se amplía la comprobación responsive preparada para exigir que Jabones y Acondicionador compartan fila debajo de los tres primeros y tengan márgenes simétricos en escritorio. No se ejecuta el navegador debido al bloqueo de puerto documentado; posición pintada y aceptación visual siguen pendientes. No se repiten TypeScript ni build para este ajuste de cuadrícula. Revisar en `http://127.0.0.1:8000/#products-heading` con `npm run dev:storefront`.

## 2026-10-18 — Invitación más directa a descubrir los productos

Se sustituyen los dos textos secundarios bajo «Nuestra colección» por «Tu próximo favorito está aquí.» y «Descubre la colección de limpieza y cuidado personal de BioProductos DK.». El tono invita a explorar sin añadir propiedades, promociones o promesas comerciales. No cambian el título principal, estilos, tarjetas ni enlaces. Cambian `apps/storefront/src/content/home.ts` y este registro. Formato aprobado y búsqueda de referencias a las frases anteriores revisada en código/pruebas. No se repiten TypeScript, build ni E2E para este ajuste exclusivamente editorial; revisión visual pendiente.

## 2026-10-18 — Encabezado de colección sin textos secundarios

Se eliminan las dos frases añadidas en la iteración anterior y sus párrafos, campos de contenido y estilos específicos. El encabezado conserva únicamente «Nuestra colección» y su línea; después aparecen las cinco tarjetas, con tamaños, centrado y enlaces intactos. Cambian `apps/storefront/src/content/home.ts`, `apps/storefront/src/modules/dk/editorial/home.tsx`, `apps/storefront/src/app/(editorial)/editorial.css` y este registro. TypeScript y formato aprobados. No se repiten build ni E2E para esta eliminación puntual; revisión visual pendiente.

## 2026-10-18 — Título negro y frase breve de colección

«Nuestra colección» pasa a negro, conservando el alfa 0,65 elegido anteriormente. Se añade únicamente «Para tu hogar. Para ti.» debajo de la línea, centrado y en 15–18 px. Se conservan la tipografía del título, sus proporciones y todas las tarjetas. Cambian `apps/storefront/src/content/home.ts` (campo `products.tagline`), `apps/storefront/src/modules/dk/editorial/home.tsx`, `apps/storefront/src/app/(editorial)/editorial.css` y este registro. TypeScript y formato aprobados; no se repiten build ni E2E para este ajuste editorial y de color. Revisión visual pendiente en `http://127.0.0.1:8000/#products-heading`.

## 2026-10-18 — Botón Ver todo al cierre de la colección

Se añade «Ver todo» al final de la sección Productos, después de las tarjetas y el aviso de demostración. El enlace nativo reutiliza `ActionLink`, apunta a `/productos` y se presenta centrado, con altura mínima de 58 px, degradado verde, sombra suave y una flecha sobre círculo lima. Hover refuerza el contraste y conserva fija la posición del círculo; el foco visible existente permite navegación por teclado. No reaparece el botón superior eliminado ni se alteran tarjetas, encabezado o rutas.

**Archivos:** `apps/storefront/src/modules/dk/editorial/home.tsx`, `apps/storefront/src/app/(editorial)/editorial.css` y este registro. TypeScript, formato, sintaxis CSS y lint del componente aprobados; se comprueba que existe la ruta de destino, que mantiene su estado de preparación. No se repiten build ni E2E para este enlace de presentación. Clic y apariencia en navegador pendientes por las limitaciones del entorno documentadas. Revisar en `http://127.0.0.1:8000/#products-heading` con `npm run dev:storefront`.

## 2026-10-18 — Cesta interactiva en Ver todo

Se sustituye la flecha del botón de colección por una cesta de compras dibujada con SVG de interfaz, sin incorporar imágenes ni dependencias. Hover y foco de teclado inclinan suavemente la cesta y levantan ligeramente sus asas; la preferencia de movimiento reducido elimina las transformaciones. El icono es decorativo y no añade foco ni texto al nombre accesible «Ver todo». Se mantienen el destino `/productos`, posición, dimensiones y apariencia del botón. El cambio se limita a este enlace; los demás iconos del sitio permanecen iguales.

**Archivos:** `apps/storefront/src/modules/dk/editorial/home.tsx`, `apps/storefront/src/app/(editorial)/editorial.css` y este registro. TypeScript, formato, sintaxis CSS y lint del componente aprobados. No se repiten build ni E2E para esta sustitución de icono; interacción pintada y revisión visual pendientes por las limitaciones del entorno ya documentadas. Revisar con `npm run dev:storefront` en `http://127.0.0.1:8000/#products-heading`.

## 2026-10-18 — Bolsa de compras con detalle natural en Ver todo

Se reemplaza la cesta rechazada por una bolsa de compras de contorno suave, asa redondeada y pequeña hoja central. El SVG de interfaz usa trazos de 1,5 px y conserva su tamaño de 23 px dentro del círculo lima. Al hover o foco de teclado la bolsa sube ligeramente y se inclina 4 grados; la hoja responde con un giro discreto. Movimiento reducido elimina ambas transformaciones. Se mantienen el nombre accesible «Ver todo», destino `/productos` y diseño del botón; no se generan imágenes, logos de marca ni dependencias.

**Archivos:** `apps/storefront/src/modules/dk/editorial/home.tsx`, `apps/storefront/src/app/(editorial)/editorial.css` y este registro. TypeScript, formato, sintaxis CSS y lint del componente aprobados. No se repiten build ni E2E para este ajuste de icono; aceptación visual e interacción en navegador pendientes de revisión local en `http://127.0.0.1:8000/#products-heading`.

## 2026-10-18 — Retiro del aviso al pie de la colección

A petición del usuario se elimina «Propuesta demostrativa. Variantes y disponibilidad por confirmar. Sin venta real.» de la sección Productos, incluyendo su párrafo, campo de contenido y estilos específicos. El botón «Ver todo» queda directamente después de las cinco tarjetas. No se modifican destinos ni controles del entorno de demostración y no se habilita comercio real.

**Archivos:** `apps/storefront/src/content/home.ts`, `apps/storefront/src/modules/dk/editorial/home.tsx`, `apps/storefront/src/app/(editorial)/editorial.css` y este registro. TypeScript y formato aprobados. No se repiten build ni E2E para esta eliminación puntual; revisión visual pendiente.

## 2026-10-18 — Un único adelanto compacto de Bio Investigación

El usuario solicita reducir los dos bloques científicos del Home para invitar a entrar a Bio Investigación, sin desarrollar su contenido completo en la portada. Se sustituyen «La ciencia detrás del producto» y el adelanto extenso de investigación por **una sola sección** después de Productos, conservando `research-heading` y el marcador S07. Se retiran de la portada el cuaderno, el recorrido de cinco etapas, los desplegables, las notas extensas y el segundo CTA. El marcador S06 deja de renderizarse; el Home pasa de once a diez marcadores, con las otras secciones intactas.

**Contenido:** «Bio Investigación / El origen es la ciencia», una frase sobre investigación de materiales orgánicos y nuevas formulaciones, tres enfoques —I+D, circularidad y nuevas formulaciones— y un único botón «Conoce Bio Investigación» hacia `/bio-investigacion`. El contenido mantiene la base de la entrevista sin anunciar patentes, proyectos adjudicados, certificaciones, cifras o efectos técnicos no acreditados. La página de destino conserva su estado de preparación; no se desarrolla otra página.

**Diseño:** panel editorial en verde profundo con transición suave entre tonos de la paleta existente, texto marfil, acento lima, tipografía Avenir Next con fuentes locales de respaldo y espaciado compacto. Una ilustración decorativa de líneas conecta hoja y matraz sobre guías suaves; es SVG de interfaz, no una fotografía, molécula real o protocolo. Se oculta en móvil para priorizar lectura y evitar un segundo bloque alto. El panel adapta su altura al contenido y el botón conserva foco visible y navegación nativa sin JavaScript. No se incorporan imágenes, videos, dependencias o animaciones nuevas.

**Conservación:** el componente `process-steps.tsx`, sus estilos reutilizables, los datos `process` y los antecedentes `researchTopics` permanecen como material para una etapa futura; no se montan en el Home ni se trasladan automáticamente a Bio Investigación. El código anterior de los dos bloques y sus estilos se conserva en `.local/research-preview-before/`. Se eliminan del CSS activo los estilos obsoletos del cuaderno y del índice/mapa de investigación. Se comprueba que las 545 reglas ajenas a la sustitución conservan selectores, declaraciones y contexto de media queries, y que contenido y componente de las demás secciones coinciden con el respaldo.

**Archivos modificados:** `apps/storefront/src/content/home.ts`, `apps/storefront/src/modules/dk/editorial/home.tsx`, `apps/storefront/src/app/(editorial)/editorial.css`, `tests/e2e/preview.spec.ts`, `docs/README.md` y este registro. Se actualizan las indicaciones de revisión del README y los casos E2E para el acceso único y la ausencia de los controles retirados. Header, carrusel, ADN, donación, productos, empresas, circularidad, fundadoras, fotografías, rutas, backend y DB no cambian.

**Verificación:** TypeScript, formato, las 36 pruebas existentes y build del storefront aprobados; lint sin errores y con las 10 advertencias previas. Los controles de fotos confirman originales y derivados sin cambios. El HTML compilado muestra una sección S07, un solo enlace de investigación, tres enfoques y ningún cuaderno, recorrido de etapas o desplegable, conservando diez colocaciones fotográficas. El componente de etapas coincide byte a byte con el respaldo. El contraste calculado para los siete pares sólidos principales de texto/fondo tiene un mínimo de 6,57:1; no equivale a auditoría de accesibilidad del navegador. Se reconocen 15 casos E2E; los casos preparados revisan compacidad, responsive, foco, navegación al destino y funcionamiento sin JS. El intento de ejecutarlos vuelve a bloquearse antes de los casos por `listen EPERM: operation not permitted 127.0.0.1:8000`. Apariencia pintada, altura real, interacción y axe siguen pendientes de revisión local. Evidencia en `evidence/research-preview-*`.

**Revisar:** ejecutar `npm run dev:storefront` y abrir `http://127.0.0.1:8000/#research-heading`. Revisar el único adelanto entre Productos y Empresas en escritorio/tablet/móvil y pulsar «Conoce Bio Investigación». Para ejecutar las pruebas preparadas en un entorno que permita el servidor: `npm run test:e2e -- --grep 'Home con fotografías originales|without JavaScript'`. Esperar aprobación antes de desarrollar Bio Investigación.

## 2026-10-18 — Más presencia para el adelanto de Bio Investigación

Por indicación del usuario, se amplía ligeramente el panel S07: añade contexto sobre el estudio de componentes y los ensayos de desarrollo; el titular y el espacio visual ganan tamaño. En un ajuste posterior, la ilustración SVG de hoja y matraz aumenta su ancho máximo de 340 a 460 px y recibe más espacio en la composición de escritorio para que destaque con claridad. El CTA «Conoce Bio Investigación» ahora lleva un icono lineal de matraz en lugar de la flecha genérica, con una respuesta sutil al pasar el puntero. Se conserva el destino `/bio-investigacion`, el orden del Home y las tres áreas de enfoque.

**Archivos:** `apps/storefront/src/content/home.ts`, `apps/storefront/src/modules/dk/editorial/home.tsx`, `apps/storefront/src/app/(editorial)/editorial.css` y este registro. TypeScript y formato de código aprobados. Lint termina sin errores y mantiene diez advertencias existentes en otros módulos del storefront. No se ejecutan build ni E2E para este ajuste visual y textual. La revisión pintada en escritorio y móvil debe hacerse localmente con `npm run dev:storefront` en `http://127.0.0.1:8000/#research-heading`.

## 2026-10-18 — Fondo claro para el adelanto de Bio Investigación

El usuario rechaza el fondo verde del panel S07. Se cambia por una superficie blanca, borde verde tenue y sombra muy ligera. El titular vuelve a tinta oscura; la descripción, el rótulo y los enfoques usan tonos legibles de la paleta natural. La trama cuadriculada desaparece. La ilustración grande de hoja y matraz se conserva, ahora trazada en verde sobre blanco; el botón de matraz pasa a verde profundo con texto blanco. La composición y el contenido siguen siendo un adelanto breve con enlace a la ruta independiente.

**Archivos:** `apps/storefront/src/app/(editorial)/editorial.css` y este registro. El CSS se analiza sin errores y supera la comprobación de formato; no se repiten build ni E2E para este cambio de apariencia. La revisión visual en navegador sigue pendiente en este entorno; abrir `http://127.0.0.1:8000/#research-heading` con `npm run dev:storefront` para revisar escritorio, tablet y móvil.

## 2026-10-18 — Tono piedra cálido para el panel de investigación

El blanco del adelanto S07 se percibía vacío. Se sustituye por `#eee9dc`, un piedra cálido que se distingue del marfil general del Home sin volver al verde sólido. Los nodos de la ilustración usan el mismo fondo para integrarse con la superficie. Texto, ilustración, botón, medidas y contenido permanecen como estaban; la composición conserva su lectura limpia.

**Archivos:** `apps/storefront/src/app/(editorial)/editorial.css` y este registro. CSS parseado y formato aprobados. Contraste calculado del tono piedra con tinta, texto secundario y verde: 10,70:1, 5,54:1 y 7,09:1 respectivamente; esto no sustituye la revisión visual en navegador. Revisar el resultado localmente en `http://127.0.0.1:8000/#research-heading` tras ejecutar `npm run dev:storefront`.

## 2026-10-18 — Arte discreto en el adelanto de Bio Investigación

Se agrega una forma orgánica de tono arena detrás de la ilustración de hoja y matraz y una curva fina en la esquina superior del panel. El tono piedra, los textos y el CTA permanecen. Son detalles hechos en CSS, sin imágenes ni recursos externos; mantienen la lectura y el enlace a la página independiente.

**Archivos:** `apps/storefront/src/app/(editorial)/editorial.css` y este registro. CSS parseado y formato aprobados; la apariencia en navegador queda por revisar localmente. Abrir `http://127.0.0.1:8000/#research-heading` tras ejecutar `npm run dev:storefront`.

## 2026-10-18 — Arte distribuido en el banner de Bio Investigación

El usuario precisó que el símbolo grande de hoja y matraz debe conservarse. Se revierte el núcleo orbital que se había ensayado dentro de ese SVG y se mantiene el círculo fino de la esquina. En una capa decorativa independiente se trazan curvas orgánicas y pequeños puntos por los bordes superior e inferior del banner. La capa queda detrás del texto y del símbolo, sin capturar clics ni introducir información científica. En móvil baja su opacidad para conservar la lectura.

**Archivos:** `apps/storefront/src/modules/dk/editorial/home.tsx`, `apps/storefront/src/app/(editorial)/editorial.css` y este registro. Se conservan texto, CTA, ruta `/bio-investigacion`, tono piedra y tamaño del símbolo. La capa es SVG de interfaz escrito en código; no se añade ningún archivo de imagen. TypeScript, formato y sintaxis CSS aprobados; la apariencia pintada en navegador queda pendiente de revisión local en `http://127.0.0.1:8000/#research-heading` con `npm run dev:storefront`.

## 2026-10-18 — Banner preparado para fotografía original de Bio Investigación

El usuario quiere una fotografía pegada al borde derecho que cubra el banner de arriba a abajo. Se reorganiza S07 en texto a la izquierda y una zona visual a sangre a la derecha. En escritorio la zona ocupa toda la altura; en tablet y móvil se apila debajo del texto y ocupa todo el ancho. Se conserva el símbolo de hoja y matraz como recurso temporal dentro de esa zona. La zona ya tiene `object-fit: cover` preparado para incorporar una fotografía original sin cambiar la composición. Ninguna de las seis fotos disponibles documenta investigación o laboratorio, así que aún no se adjudica una foto de producto a ese relato.

**Arte:** se mantienen exactamente dos trazos suaves sobre la zona de texto, se retiran la hoja decorativa y la línea inferior señaladas, y permanece el círculo fino de la esquina. El banner conserva tono piedra, texto y CTA hacia `/bio-investigacion`. No se modifica el interior del símbolo científico.

**Archivos:** `apps/storefront/src/modules/dk/editorial/home.tsx`, `apps/storefront/src/app/(editorial)/editorial.css`, `tests/e2e/preview.spec.ts`, `docs/README.md` y este registro. El caso E2E existente ahora comprueba que la zona visual llega a los bordes correspondientes del banner según el ancho de pantalla, en lugar de exigir una altura incompatible con la futura foto.

**Verificación:** TypeScript, sintaxis CSS y build del storefront aprobados; lint sin errores y con las diez advertencias ya existentes en otros módulos. Playwright reconoce los 15 casos, pero no se ejecutan en navegador aquí por el bloqueo del servidor local documentado antes. El HTML de producción confirma dos trazos decorativos y una sola zona visual derecha. Revisar `http://127.0.0.1:8000/#research-heading` con `npm run dev:storefront`. Para incorporar la foto original, colocarla en `apps/storefront/public/images/home/` y comunicar el nombre del archivo; aún no hay archivo ni imagen falsa en la zona.

## 2026-10-18 — Fotografía temporal y símbolo visible en el banner

El usuario autoriza usar cualquiera de sus fotos originales por ahora. Se elige la foto del champú sólido (`jabon modelo.JPG`, versión WebP existente `champu-*`) por su composición limpia y tonos compatibles con el panel. Ocupa la zona derecha a toda altura con recorte `cover`; su texto alternativo describe el producto tal como aparece, sin presentarla como evidencia de laboratorio. La imagen ya se usa en la colección, por lo que su repetición es temporal hasta contar con una fotografía de investigación. No se modifica ni se crea ningún archivo de imagen.

El símbolo científico se conserva y pasa a un sello editorial de fondo piedra en la esquina inferior izquierda de la foto, con ancho adaptable de 150 a 210 px en pantallas medianas y grandes. Así permanece visible sin sustituir la fotografía. El círculo fino de la esquina superior y los dos trazos decorativos del texto se mantienen. En móvil, el sello reduce tamaño y la foto conserva ancho completo debajo del texto. El CTA y la ruta `/bio-investigacion` no cambian.

**Archivos:** `apps/storefront/src/modules/dk/editorial/home.tsx`, `apps/storefront/src/app/(editorial)/editorial.css`, `tests/e2e/preview.spec.ts`, `docs/README.md` y este registro. Se actualiza el caso E2E para reconocer la nueva colocación de la fotografía. TypeScript, sintaxis CSS y build del storefront aprobados; lint sin errores, con las diez advertencias ya existentes en otros módulos. Las tres variantes WebP locales se reconocen correctamente. El HTML de producción contiene once colocaciones fotográficas, una de ellas la foto temporal del champú dentro de S07 con texto alternativo honesto y el símbolo visible. Playwright reconoce los 15 casos; la revisión pintada y su ejecución en navegador siguen pendientes por la restricción local documentada. Revisar `http://127.0.0.1:8000/#research-heading` con `npm run dev:storefront`.

## 2026-10-18 — Fotografía limpia en el adelanto de Bio Investigación

Por petición del usuario, se retira el sello científico superpuesto a la foto, junto con las curvas y puntos de fondo y el círculo decorativo de la esquina. La fotografía original temporal del champú queda sola, a toda altura en el lado derecho del banner; en tablet y móvil sigue debajo del texto. Se conservan el panel color piedra, el contenido, las áreas de enfoque, el botón con icono de matraz y su enlace a `/bio-investigacion`. No se agrega ni modifica ningún archivo de imagen.

**Archivos:** `apps/storefront/src/modules/dk/editorial/home.tsx`, `apps/storefront/src/app/(editorial)/editorial.css` y este registro. La imagen continúa siendo temporal hasta recibir una fotografía original específica para investigación. TypeScript, formato y sintaxis CSS aprobados; se comprobó que ya no existen los selectores de los adornos retirados. La revisión visual en navegador sigue pendiente en este entorno. Abrir `http://127.0.0.1:8000/#research-heading` tras ejecutar `npm run dev:storefront`.

## 2026-10-18 — Corrección: conservar las líneas del banner

El usuario aclara que quería quitar el sello sobre la fotografía, pero conservar el arte lineal del banner. Se restituyen las dos curvas con sus puntos discretos detrás del texto y el círculo fino de la esquina. La fotografía del champú permanece limpia y a toda altura a la derecha, sin símbolo ni tarjeta superpuesta. El contenido, el CTA y la ruta de Bio Investigación no cambian.

**Archivos:** `apps/storefront/src/modules/dk/editorial/home.tsx`, `apps/storefront/src/app/(editorial)/editorial.css` y este registro. TypeScript, formato y sintaxis CSS aprobados. La revisión visual en navegador sigue pendiente en este entorno.

## 2026-10-18 — Retiro del círculo derecho del banner

Se elimina únicamente la línea circular grande de la esquina derecha del adelanto de Bio Investigación. Permanecen las dos curvas y puntos discretos detrás del texto, además de la fotografía limpia en el lado derecho. No cambian contenido, navegación ni otros bloques del Home.

**Archivos:** `apps/storefront/src/app/(editorial)/editorial.css` y este registro. Sintaxis y formato CSS aprobados; apariencia en navegador por comprobar localmente.

## 2026-10-18 — Adelanto compacto de Bio Impacto

El bloque S09 del Home se reduce a un adelanto de dos partes: mensaje breve sobre revalorización y economía circular, más una pieza visual compacta con la secuencia «Materia orgánica / Ciencia aplicada / Nueva utilidad». Se retira el diagrama circular grande y la tarjeta secundaria que alargaban la sección. El botón **«Conoce Bio Impacto»** pasa a ser el llamado principal, en verde profundo con un acento lima y respuesta al pasar el puntero; el acceso a Contacto queda secundario. La aclaración de que la colaboración con residuos requiere coordinación y protocolo, y de que aún no hay recepción pública habilitada, permanece visible en una línea de apoyo. No se añaden métricas de impacto ni resultados no acreditados.

**Archivos:** `apps/storefront/src/modules/dk/editorial/home.tsx`, `apps/storefront/src/content/home.ts`, `apps/storefront/src/app/(editorial)/editorial.css`, `tests/e2e/preview.spec.ts` y este registro. La ruta `/bio-impacto` sigue siendo una página independiente en preparación; esta etapa no desarrolla su contenido. No se incorporan imágenes, videos ni recursos externos.

**Verificación:** TypeScript, Prettier, sintaxis CSS, las 36 pruebas unitarias y build del storefront aprobados. Lint sin errores y con diez advertencias preexistentes en otros módulos. El HTML compilado confirma el CTA hacia `/bio-impacto`, el enlace a `/contacto`, la secuencia compacta, la ausencia del diagrama anterior y la presencia de la ruta destino. Playwright reconoce los 15 casos y se amplía el caso responsive para comprobar navegación por teclado, destino y aclaración de recepción; su ejecución visual sigue pendiente por el bloqueo del servidor local `listen EPERM: operation not permitted 127.0.0.1:8000` documentado previamente. Revisar en `http://127.0.0.1:8000/#impact-heading` con `npm run dev:storefront`.

## 2026-10-18 — Dirección editorial propia para Bio Impacto

El usuario considera repetitiva la composición anterior de texto a la izquierda y tarjeta a la derecha. Se rediseña solo S09 como una superficie verde profunda de ancho completo, sin tarjeta secundaria: un titular amplio abre la sección, tres conceptos se conectan en un recorrido horizontal y el CTA lima **«Conoce Bio Impacto»** funciona como remate visual del recorrido. La aclaración sobre colaboración con residuos y el enlace secundario a Contacto quedan en una franja discreta al pie. En móvil, el recorrido se mantiene legible y el CTA pasa debajo de los tres conceptos. La interacción se limita a respuestas suaves de hover y foco, con reducción de movimiento respetada. Se conserva el contenido basado en la entrevista y la ruta independiente `/bio-impacto`, aún en preparación.

**Archivos:** `apps/storefront/src/modules/dk/editorial/home.tsx`, `apps/storefront/src/app/(editorial)/editorial.css` y este registro. No se añaden fotografías, video, activos generados, cifras ni declaraciones de impacto no verificadas. Las demás secciones, rutas y sistemas de comercio permanecen sin cambios.

**Verificación:** TypeScript, Prettier, sintaxis CSS, build y 36 pruebas unitarias aprobados; lint sin errores y con diez advertencias preexistentes fuera de S09. El HTML de producción contiene los dos destinos previstos, la secuencia nueva y ningún resto de la tarjeta anterior. La revisión visual real y las pruebas E2E responsive siguen pendientes por la restricción local de navegador/servidor documentada; revisar `http://127.0.0.1:8000/#impact-heading` con `npm run dev:storefront`.

## 2026-10-18 — Logo original en el banner Bio Impacto

Por petición del usuario, se elimina el párrafo «Investigamos materiales orgánicos…» de S09 y de su fuente de contenido. En el mismo espacio, a la derecha del titular en escritorio, se coloca el logotipo circular original de BioProductos DK a un ancho máximo de 285 px; en tablet y móvil se centra bajo el titular con límites de 230 y 190 px. Se reutiliza una copia byte a byte del PNG aportado por el usuario, ubicada en `apps/storefront/public/images/brand/logo-dk-impact.png` para que la vista previa pueda servirla sin modificar el middleware. El original de `public/loogo/` queda intacto. No se crea ni altera la imagen, y el CTA de Bio Impacto, el recorrido de tres conceptos y la aclaración sobre recepción de residuos permanecen.

**Archivos:** `apps/storefront/src/modules/dk/editorial/home.tsx`, `apps/storefront/src/content/home.ts`, `apps/storefront/src/app/(editorial)/editorial.css`, `apps/storefront/public/images/brand/logo-dk-impact.png` y este registro. Se ajusta el tipo de contenido de Impacto para que no exija un párrafo que ya no se muestra.

**Verificación:** SHA-256 idéntico entre el PNG original y la copia; PNG RGBA 1254 × 1254 reconocido. TypeScript, Prettier, sintaxis CSS, lint sin errores (diez advertencias previas), 36 pruebas unitarias y build del storefront aprobados. El HTML estático de S09 contiene exactamente el logo con texto alternativo, conserva «Conoce Bio Impacto» y ya no contiene el párrafo. La revisión visual en navegador y el caso E2E responsive siguen pendientes por la restricción del entorno documentada. Revisar `http://127.0.0.1:8000/#impact-heading` con `npm run dev:storefront`.

## 2026-10-19 — Bio Impacto más compacto y logo a escala media

El usuario solicita bajar la presencia del logo de aproximadamente 7/10 a 5/10 y reducir la sensación de sobrecarga. El ancho máximo del logo pasa de 285 a 205 px en escritorio, de 230 a 170 px en tablet y de 190 a 145 px en móvil. Se recortan el relleno vertical del banner, el espacio entre titular y recorrido, la altura de las tres etapas y la altura del CTA. Se retira la trama diagonal decorativa y el desplazamiento del bloque del CTA al pasar el puntero; permanece un cambio sutil de color y el movimiento de su flecha. El titular, los destinos y la aclaración sobre recepción de residuos siguen presentes.

**Archivos:** `apps/storefront/src/modules/dk/editorial/home.tsx`, `apps/storefront/src/app/(editorial)/editorial.css` y este registro. TypeScript, formato y sintaxis CSS aprobados. No se repiten build ni E2E para este ajuste de medidas; la revisión visual en navegador permanece pendiente. Revisar `http://127.0.0.1:8000/#impact-heading` con `npm run dev:storefront`.

## 2026-10-19 — Rótulo de Bio Impacto unido al titular

El rótulo «Bio Impacto / Economía circular» se mueve al mismo grupo tipográfico que «Nada cambia si lo miramos siempre igual.», con una separación de 6 px. Antes ocupaba una fila independiente encima de la cuadrícula del logo, por lo que el espacio visual entre ambos parecía excesivo y sumaba altura al banner. El logo conserva su tamaño reducido y su posición; en móvil se ajustan el espacio y el tamaño del rótulo para evitar desbordes.

**Archivos:** `apps/storefront/src/modules/dk/editorial/home.tsx`, `apps/storefront/src/app/(editorial)/editorial.css` y este registro. TypeScript, formato y sintaxis CSS aprobados. No se repiten build ni E2E para este reordenamiento puntual; la comprobación visual en navegador sigue pendiente. Revisar `http://127.0.0.1:8000/#impact-heading` con `npm run dev:storefront`.

## 2026-10-19 — Acabado visual e interacción compacta de Bio Impacto

Se conserva la composición, el texto, la posición y escala del logo original, la altura compacta y la ruta independiente de S09. Tres líneas curvas y puntos tenues, dibujados como SVG de interfaz dentro del componente, aportan una referencia visual al flujo circular detrás del contenido sin cubrir el logo ni añadir archivos multimedia. Las etapas «Materia orgánica / Ciencia aplicada / Nueva utilidad» reciben símbolos lineales propios y una respuesta discreta de color y subrayado al pasar el puntero. El CTA principal mantiene su tamaño, pero suma un icono en círculo, un destello breve al hover/foco y un foco de teclado visible. En móvil los símbolos de las etapas se ocultan para proteger la lectura estrecha; el arte de fondo pierde intensidad y `prefers-reduced-motion` desactiva las animaciones.

**Archivos:** `apps/storefront/src/modules/dk/editorial/home.tsx`, `apps/storefront/src/app/(editorial)/editorial.css` y este registro. No se incorporan imágenes, videos ni afirmaciones nuevas; la fotografía del logo aportada por el usuario permanece intacta. Bio Investigación y las demás páginas no se modifican.

**Verificación:** TypeScript, Prettier, parseo CSS y build de Next.js aprobados. ESLint finaliza con cero errores y las diez advertencias previas fuera de S09. El HTML de producción contiene el titular, el logo, las tres etapas con sus símbolos y los enlaces `/bio-impacto` y `/contacto`. No se pudo comprobar el resultado pintado ni ejecutar E2E en navegador: `next start` falla con `listen EPERM: operation not permitted 127.0.0.1:8000`; el Chromium de Playwright no está instalado y el Chrome del sistema se cierra al iniciarse en este entorno. Revisar localmente `http://127.0.0.1:8000/#impact-heading` después de `npm run dev:storefront`.

## 2026-10-19 — Footer editorial y acceso legal responsable

Se rediseña el pie global de las páginas editoriales como cierre de marca: invitación a conversar, logotipo original aportado por el usuario, navegación agrupada, redes oficiales, correo institucional y ubicación ya documentados, y una franja inferior de alcance de la propuesta. La jerarquía, el contraste, los estados de foco/hover y los tamaños táctiles se ajustan para escritorio, tablet y móvil. El footer enlaza a rutas independientes existentes; no se desarrolla otra página en esta etapa.

La zona legal muestra de forma explícita los **documentos aún pendientes**: privacidad y datos personales, términos de uso/venta, y despachos/cambios/reclamos. Se evita convertir esos rótulos en enlaces que aparenten políticas vigentes. El enlace «Ver estado de documentos» lleva a `/informacion-legal`, que conserva su aviso de preparación. Se suma una guía pública de [SERNAC sobre derechos en comercio electrónico](https://www.sernac.cl/portal/604/w3-propertyvalue-20982.html), identificada como fuente oficial externa y separada de los documentos de DK. La guía se consultó para organizar el acceso a información de términos, despacho y contacto; el footer no ofrece interpretación jurídica ni condiciones comerciales inventadas.

**Pendiente para políticas publicables:** DK debe entregar y aprobar identificación legal y domicilio del proveedor, canales de atención y reclamos, condiciones de venta y disponibilidad, cobertura/costos/plazos de despacho, criterios de cambios/devoluciones, y tratamiento de datos personales. La redacción final requiere revisión competente. No se publican RUT, dirección exacta, garantías, plazos particulares ni reglas de tratamiento de datos no confirmadas.

**Archivos:** `apps/storefront/src/modules/dk/editorial/site-layout.tsx`, `apps/storefront/src/modules/dk/editorial/social-links.tsx`, `apps/storefront/src/app/(editorial)/editorial.css` y este registro. No se modifican Shopify, backend, pagos, base de datos ni imágenes originales.

**Verificación:** TypeScript, formato, parseo CSS, build de Next.js y 36 pruebas unitarias aprobados. ESLint termina sin errores, con diez advertencias previas fuera del footer. El HTML de producción confirma logo, correo, las tres redes, navegación, aviso de documentos pendientes, ruta `/informacion-legal` y enlace externo de SERNAC. La revisión pintada y las pruebas E2E no pudieron realizarse aquí: `next start` falla con `listen EPERM: operation not permitted 127.0.0.1:8000`. Revisar `http://127.0.0.1:8000/` después de `npm run dev:storefront` y bajar al pie de página.

## 2026-10-19 — Footer compacto en grafito y marfil

El usuario considera demasiado alto el footer anterior y pide retirar «Conversemos» y el predominio verde. Se elimina por completo el gran bloque de apertura, el botón y la segunda franja de contacto; el correo y la ubicación pasan a la columna de marca. La cuadrícula se compacta y el bloque legal deja de ocupar una tarjeta grande. Conserva navegación, redes oficiales, acceso a `/informacion-legal`, la referencia externa de SERNAC y el aviso de que los documentos de DK siguen pendientes de aprobación. El nombre de marca aparece como texto, sin repetir el logotipo verde en este cierre. La nueva paleta del footer usa grafito, marfil y un acento piedra; no cambia la identidad verde del resto del sitio.

**Archivos:** `apps/storefront/src/modules/dk/editorial/site-layout.tsx`, `apps/storefront/src/app/(editorial)/editorial.css` y este registro. No se modifican otras páginas, imágenes, servicios comerciales ni contenidos legales no aprobados.

**Verificación:** TypeScript, ESLint, Prettier, parseo CSS y build de Next.js aprobados; lint mantiene diez advertencias previas fuera del footer. El HTML de producción confirma que ya no aparecen «Conversemos» ni las franjas retiradas, y que permanecen correo, ubicación, tres redes, enlaces de navegación y estado legal. Los tonos de texto sobre el fondo grafito superan 4,5:1 de contraste calculado: texto principal 12,85:1, secundario 8,43:1 y acento 8,89:1. La inspección visual en navegador y E2E siguen pendientes por la restricción local `listen EPERM` documentada. Revisar el pie de `http://127.0.0.1:8000/` tras ejecutar `npm run dev:storefront`.

## 2026-10-19 — Hero del Home más compacto y fotografía protagonista

Se ajusta únicamente el primer banner bajo el carrusel. Su altura base baja de 680 a 570 px, y en pantallas muy anchas de 720 a 610 px. La fotografía original de productos gana presencia mediante un degradado que protege la lectura del titular a la izquierda y deja despejada la zona de producto a la derecha; también recibe un ajuste moderado de saturación y contraste sin alterar el archivo. Se compactan la tipografía, la separación entre texto y botones, las categorías y la tarjeta «Nuestra colección». Se conserva el mensaje «Todo nace de la ciencia», la referencia a limpieza, higiene y cosmética sólida, y los enlaces a Productos y Bio Investigación.

En tablet se limita el ancho del texto y se refuerza el degradado solo bajo la zona de lectura, dejando despejado el extremo derecho de la foto. En móvil la imagen pasa a una franja de 260 px con un degradado más ligero y un recorte centrado en los productos. Se retira la altura forzada de 885 px que afectaba a los teléfonos estrechos, y el titular recupera una escala uniforme. Los CTA conservan un alto táctil mínimo de 44 px. No se incorporan imágenes nuevas ni se modifican el carrusel, la franja de donación, otras páginas o el comercio.

**Archivos:** `apps/storefront/src/app/(editorial)/editorial.css` y este registro.

**Verificación:** TypeScript, ESLint, Prettier, parseo CSS y build de Next.js aprobados; lint registra diez advertencias preexistentes en módulos ajenos al hero. El HTML de producción contiene la foto original optimizada, el titular, ambos CTA y el acceso a «Nuestra colección». La revisión visual pintada y E2E responsive siguen pendientes por la limitación local de navegador/servidor documentada anteriormente. Revisar en `http://127.0.0.1:8000/#hero-heading` tras ejecutar `npm run dev:storefront`.

## 2026-10-19 — Primer bloque convertido en carrusel editorial de tres escenas

Se reemplaza el hero único por un carrusel manual, sin avance automático, para contar lo esencial en tres momentos: **ciencia aplicada** con la fotografía original de la colección, **productos para el cuidado cotidiano** con la foto original del champú sólido y **propósito circular y equipo** con la foto original de las fundadoras. Los textos se reducen y cada escena lleva a su página independiente: Productos y Bio Investigación en la primera; Productos en la segunda; Bio Impacto y Nosotras en la tercera. Se elimina del primer bloque la tarjeta redundante «Nuestra colección» y la lista de categorías que alargaban la composición. La franja de donación inmediatamente posterior y el resto del Home conservan su estructura.

El nuevo marco tiene esquinas moderadamente redondeadas y una dirección de arte distinta por escena: fotografía de colección a todo el ancho con lectura protegida a la izquierda, panel marfil con primer plano de producto y panel verde profundo con el retrato del equipo. El cambio de escena cruza opacidad y un desenfoque breve; `prefers-reduced-motion` lo desactiva. Flechas táctiles y de teclado, indicadores directos, contador visible, aviso `aria-live` y estado `inert` en diapositivas inactivas permiten controlar la experiencia sin reproducción forzada. La primera foto conserva carga prioritaria y las otras utilizan las variantes WebP locales ya preparadas. No se crean ni descargan medios.

**Archivos:** `apps/storefront/src/content/home.ts`, `apps/storefront/src/modules/dk/editorial/home.tsx`, `apps/storefront/src/modules/dk/editorial/home-hero-carousel.tsx`, `apps/storefront/src/app/(editorial)/editorial.css`, `tests/e2e/preview.spec.ts` y este registro. No se intervienen páginas interiores, Shopify, backend ni datos comerciales.

**Verificación:** TypeScript, ESLint, parseo CSS, formato de los archivos de código, build de Next.js y las 36 pruebas unitarias aprobados; lint mantiene diez advertencias previas ajenas al hero. El HTML de producción confirma tres escenas, sus tres fotos originales, cuatro rutas editoriales y controles con etiquetas/estados para accesibilidad. Playwright reconoce los 15 casos, incluido el caso responsive actualizado para probar avance, retroceso, vuelta al inicio y selección directa. La ejecución real del caso a 375 px no llegó al navegador: `next start` falla con `listen EPERM: operation not permitted 127.0.0.1:8000` en este entorno. La revisión visual y de interacción real sigue pendiente en la Mac del usuario. Abrir `http://127.0.0.1:8000/` después de `npm run dev:storefront` y usar las flechas bajo el primer bloque.

## 2026-10-19 — Acceso directo del carrusel a la franja de donación

El CTA principal de la primera escena cambia de «Ver productos» a **«Dona aquí»** y enlaza al ancla `#donaciones-home` de la franja inmediatamente posterior al carrusel. Al llegar a esa franja, su botón existente mantiene la ruta independiente `/donaciones`. La segunda escena del carrusel continúa ofreciendo acceso a Productos y el CTA secundario de la primera sigue llevando a Bio Investigación. No se modifica el diseño ni se habilita un programa de recepción de residuos.

**Archivos:** `apps/storefront/src/content/home.ts`, `apps/storefront/src/modules/dk/editorial/home.tsx`, `tests/home-content.test.mjs`, `tests/e2e/preview.spec.ts` y este registro.

**Verificación:** formato y TypeScript aprobados; las 36 pruebas unitarias y el build del storefront pasan. El build conserva las diez advertencias previas de lint fuera del Home. El HTML de producción confirma el CTA `href="#donaciones-home"`, el destino con ese `id` y el enlace posterior a `/donaciones`. Playwright reconoce los 15 casos actualizados, pero el click y el desplazamiento reales siguen sin poder ejecutarse aquí por el bloqueo `listen EPERM` del servidor local documentado antes. Revisar en `http://127.0.0.1:8000/` tras `npm run dev:storefront`.

## 2026-10-19 — Nombre «Donaciones» en carrusel y header

Por corrección del usuario, el CTA de la primera escena del carrusel se llama **«Donaciones»** y mantiene su destino `#donaciones-home`. El CTA global del header, junto al carrito, cambia de «Ver productos» a **«Donaciones»** y abre `/donaciones` desde cualquier página. El botón de la franja conserva «Dona aquí» y la navegación a Productos permanece disponible en el menú y en la segunda escena del carrusel. Se actualizaron las aserciones E2E correspondientes.

**Archivos:** `apps/storefront/src/content/home.ts`, `apps/storefront/src/modules/dk/editorial/site-layout.tsx`, `tests/e2e/preview.spec.ts` y este registro.

**Verificación:** TypeScript, ESLint (cero errores, diez advertencias previas), Prettier, 36 pruebas unitarias y build de Next.js aprobados. El HTML de producción confirma ambos textos y destinos y el ancla de la franja. El primer intento de build falló por un manifiesto generado incompleto para `/twitter-image.jpg`; se conservó la carpeta `.next` anterior en `/private/tmp/bioproductos-dk-next-before-donations-20261019` y un build limpio posterior terminó correctamente, incluida esa ruta. La interacción real en navegador continúa pendiente por la restricción local `listen EPERM` ya documentada.

## 2026-10-19 — Fondo claro coherente en las tres escenas del carrusel

Se mantiene el carrusel manual tal como está: mismas tres escenas, fotografías, controles, enlaces y transición de desenfoque. La primera y la tercera escena adoptan el fondo marfil claro, texto oscuro, acentos verdes y composición de foto a la derecha que ya tenía la segunda. En móvil, las tres conservan el texto sobre un panel claro y la fotografía en la franja inferior. Esto da continuidad visual entre escenas y deja que cada foto siga aportando su propia identidad.

**Archivos:** `apps/storefront/src/app/(editorial)/editorial.css` y este registro. No se alteran imágenes ni contenido.

## 2026-10-19 — Tema oscuro global con control flotante

Se agrega un selector de apariencia fijo en la esquina inferior derecha de toda la aplicación. En modo claro muestra una luna con estrellas; al activar el tema oscuro aparece un sol con guiño. El icono y los colores cambian con una transición breve, el control incluye nombre accesible, foco visible y movimiento reducido para quienes lo soliciten. La selección manual se guarda en el navegador; mientras no exista, el sitio sigue la preferencia de apariencia del sistema operativo, incluso si cambia durante la visita. Un script inicial lee esa preferencia antes del primer render para evitar mostrar primero el tema equivocado.

El selector también activa la clase `dark` que ya entiende Tailwind y Medusa UI. Las páginas editoriales de DK reciben una paleta oscura verde y grafito desde los tokens semánticos centrales, incluidos header, carrusel, bloques de contenido, botones, tarjetas de ciencia, controles y superficies de formulario. Las fotos originales conservan su aspecto. Para que las futuras secciones sigan adaptándose, sus colores deben usar los tokens `--dk2-*` del tema; las páginas basadas en utilidades Tailwind pueden usar las variantes `dark:`.

**Archivos:** `apps/storefront/src/app/layout.tsx`, `apps/storefront/src/modules/dk/editorial/theme-toggle.tsx`, `apps/storefront/src/styles/globals.css`, `apps/storefront/src/app/(editorial)/editorial.css` y este registro.

**Verificación:** TypeScript, Prettier y build de Next.js aprobados. El build conserva diez advertencias de lint previas en carrito, checkout y módulos de productos. El HTML de salida contiene el selector accesible y el script de carga inicial, y el CSS generado incluye la paleta oscura. No se ejecutaron pruebas automatizadas ni se hizo una inspección visual en navegador durante este cambio.

## 2026-10-19 — Legibilidad del carrusel y la franja de donación en modo oscuro

Se aumentó el contraste del titular y el texto descriptivo en las tres escenas del carrusel mediante un degradado oscuro más definido detrás de la zona de lectura. En móvil, el degradado sigue la composición vertical para proteger el texto sin ocultar la fotografía. También se aclaró el texto de la franja «Tus residuos pueden tener un nuevo comienzo» sobre su fondo verde oscuro. El tema claro, las fotografías y el contenido permanecen iguales.

**Archivos:** `apps/storefront/src/app/(editorial)/editorial.css` y este registro.

**Verificación:** TypeScript, formato Prettier y build de producción de Next.js aprobados. El build conserva advertencias de lint ya existentes en módulos de carrito, checkout y productos, sin errores nuevos. No se ejecutaron pruebas automatizadas ni se hizo inspección visual en navegador durante este ajuste.

## 2026-10-19 — Contraste de la cinta de mensajes y visibilidad del selector de tema

Se ajusta la cinta animada bajo el header para modo oscuro: mensajes como «Más posibilidades para los materiales orgánicos» ahora usan texto claro con mayor peso sobre una superficie verde grafito, y los iconos de circularidad tienen un acento claro con contraste. También se refuerza la visibilidad del botón fijo de modo oscuro/claro con una capa superior, visibilidad y eventos de puntero explícitos. El componente continúa montado desde el layout raíz y conserva la preferencia guardada.

**Archivos:** `apps/storefront/src/app/(editorial)/editorial.css`, `apps/storefront/src/styles/globals.css` y este registro.

**Verificación:** TypeScript, Prettier y build de Next.js aprobados. El HTML estático de las rutas editoriales sigue incluyendo el botón `dk-theme-toggle`; el CSS compilado incluye los estilos del tema y la cinta. El build mantiene las advertencias de lint ya existentes en carrito, checkout y productos. No se ejecutaron pruebas automatizadas ni se hizo inspección visual en navegador.

## 2026-10-19 — Bio Impacto con la superficie editorial del carrusel

La sección Bio Impacto del Home adopta el fondo marfil claro del carrusel de tres escenas, con tipografía oscura, acentos verdes y separadores suaves. La misma composición usa los tokens oscuros al activar el tema nocturno, conservando legibles el titular, la secuencia, el botón, el aviso y el enlace de colaboración. Se mantienen el logo y el arte lineal de fondo.

**Archivos:** `apps/storefront/src/app/(editorial)/editorial.css` y este registro.

**Verificación:** TypeScript, Prettier y build de producción de Next.js aprobados. El build conserva las advertencias de lint previas en carrito, checkout y productos. No se ejecutaron pruebas automatizadas ni se hizo inspección visual en navegador.

## 2026-10-19 — Carrusel principal automático con gesto manual

El carrusel del Home avanza automáticamente cada 7,2 segundos con un fundido y desenfoque suave entre escenas, más un acercamiento fotográfico lento. Se retiran de la interfaz las flechas, el contador y las barras de navegación. En desktop y móvil se puede arrastrar o deslizar horizontalmente; también funcionan las teclas izquierda/derecha al enfocar el carrusel. El avance se pausa al pasar el puntero, al enfocar o durante un gesto, y queda desactivado si el sistema solicita movimiento reducido.

**Archivos:** `apps/storefront/src/modules/dk/editorial/home-hero-carousel.tsx`, `apps/storefront/src/app/(editorial)/editorial.css`, `tests/e2e/preview.spec.ts` y este registro.

**Verificación:** TypeScript, Prettier y build de producción de Next.js aprobados; el build conserva advertencias de lint previas en carrito, checkout y productos. Se actualizaron las referencias de navegación del escenario E2E a controles de teclado; no se ejecutó Playwright ni se hizo inspección visual en navegador.

## 2026-10-19 — Seis productos destacados en la colección del Home

La colección pasa a seis bloques en dos filas de tres. Se separan los dos detergentes de ropa que ya están descritos como aromas cítrico y eucaliptus, para darles presencia individual. Jabones y acondicionador conservan sus nombres y enlaces, y reciben fotografías locales existentes como apoyo temporal; ambas llevan la etiqueta «Imagen de referencia» para distinguirlas de sus futuras fotos propias. No se agregaron imágenes nuevas.

**Archivos:** `apps/storefront/src/content/home.ts`, `apps/storefront/src/modules/dk/editorial/home.tsx`, `apps/storefront/src/app/(editorial)/editorial.css` y este registro.

**Verificación:** TypeScript, Prettier y build de producción de Next.js aprobados. El build conserva las advertencias de lint previas en carrito, checkout y productos. No se ejecutaron pruebas automatizadas ni se hizo inspección visual en navegador.

## 2026-10-19 — Arte lineal de ciencia y producto en «Nuestra colección»

Se incorpora al fondo de la colección un dibujo vectorial original hecho en el componente: un matraz con partículas conectadas y una red molecular. Una deriva vertical muy sutil y una capa verde tenue aportan movimiento y profundidad sin competir con las seis fotografías. El arte usa los colores semánticos del tema y permanece decorativo para tecnologías de asistencia.

**Archivos:** `apps/storefront/src/modules/dk/editorial/home.tsx`, `apps/storefront/src/app/(editorial)/editorial.css` y este registro.

**Verificación:** TypeScript, Prettier y build de producción de Next.js aprobados. El build conserva las advertencias de lint previas en carrito, checkout y productos. No se ejecutaron pruebas automatizadas ni se hizo inspección visual en navegador.

## 2026-10-19 — Carrusel centrado y separado de donaciones

Se centra el marco del carrusel principal con un ancho máximo editorial y márgenes simétricos; en móvil conserva un margen lateral compacto. Se añade una separación vertical moderada entre el carrusel y la franja de donaciones para que ambos bloques se lean ordenados y como secciones distintas.

**Archivos:** `apps/storefront/src/app/(editorial)/editorial.css` y este registro.

**Verificación:** TypeScript y build de producción de Next.js aprobados. Prettier aplicado al CSS. Lint termina sin errores y conserva diez advertencias existentes en carrito, checkout, productos y configuración de Tailwind. No se hizo inspección visual en navegador.

## 2026-10-19 — Indicador de avance del carrusel principal

Se añade bajo el carrusel una línea fina que se llena durante los 7,2 segundos del intervalo automático. El progreso se reinicia al cambiar de escena y se pausa junto con el carrusel mientras el usuario interactúa; se oculta si está activa la preferencia de movimiento reducido, cuando no hay avance automático.

**Archivos:** `apps/storefront/src/modules/dk/editorial/home-hero-carousel.tsx`, `apps/storefront/src/app/(editorial)/editorial.css` y este registro.

**Verificación:** TypeScript, Prettier y build de producción de Next.js aprobados. Lint termina sin errores y conserva diez advertencias existentes en carrito, checkout, productos y configuración de Tailwind. No se hizo inspección visual en navegador.

## 2026-10-19 — Avance continuo del carrusel con el puntero encima

El carrusel y su barra de progreso ya no se pausan al pasar el mouse por encima. El arrastre manual con clic izquierdo se conserva y pausa el avance solo mientras dura el gesto; al soltar, el temporizador y la barra vuelven a avanzar. El clic derecho sigue sin iniciar un arrastre.

**Archivos:** `apps/storefront/src/modules/dk/editorial/home-hero-carousel.tsx` y este registro.

**Verificación:** TypeScript y Prettier aprobados. Lint termina sin errores y conserva diez advertencias previas en carrito, checkout, productos y configuración de Tailwind. No se hizo inspección visual en navegador.

## 2026-10-19 — Más contraste para la barra en tema claro

El relleno de la barra del carrusel usa ahora un degradado de verdes más oscuros en tema claro para distinguirse mejor sobre el fondo marfil. El modo oscuro conserva su degradado luminoso actual.

**Archivos:** `apps/storefront/src/app/(editorial)/editorial.css` y este registro.

**Verificación:** TypeScript y Prettier aprobados. No se hizo inspección visual en navegador.

## 2026-10-19 — Orden de navegación solicitado para el header

La navegación principal y el menú móvil ahora muestran las páginas en el orden solicitado: Inicio, Bio Investigación, Productos, Empresas, Nosotras y Contacto. Se conserva una sola fuente compartida para mantener el orden coherente entre ambos menús.

**Archivos:** `apps/storefront/src/content/site.ts` y este registro.

**Verificación:** TypeScript y Prettier aprobados. No se hizo inspección visual en navegador.

## 2026-10-19 — Página independiente de Bio Investigación

Se reemplaza la página de preparación por un cuerpo editorial completo con hero, navegación por anclas, áreas de trabajo, una explicación cauta de nanoemulsiones, diagrama científico vectorial, recorrido conceptual de cinco etapas, colaboración, archivo de proyectos y propiedad intelectual con antecedentes expresamente pendientes de respaldo. Se usan únicamente las fotos locales ya aportadas para el Home (colección de productos y fundadoras). El proyecto no tiene video ni fotografías del laboratorio: se deja un módulo audiovisual claramente marcado para integrar el material oficial cuando exista; no simula un video ni incorpora medios externos. El contenido se apoya en la entrevista y la presentación institucional de la empresa. La ruta `/bio-investigacion` deja de figurar como página pendiente.

**Archivos:** `apps/storefront/src/app/(editorial)/bio-investigacion/page.tsx`, `apps/storefront/src/modules/dk/editorial/bio-investigacion-page.tsx`, `apps/storefront/src/modules/dk/editorial/bio-investigacion-page.module.css`, `apps/storefront/src/content/site.ts`, `tests/e2e/bio-investigacion.spec.ts`, `tests/home-content.test.mjs` y este registro.

**Verificación:** TypeScript, Prettier, 36 pruebas unitarias y build de producción aprobados. ESLint finaliza sin errores y conserva diez advertencias previas en carrito, checkout, productos y configuración de Tailwind. Playwright reconoce los tres casos responsive y axe preparado para desktop; no llegó a ejecutar los casos porque el entorno impide iniciar el servidor local (`listen EPERM 127.0.0.1:8000`). La vista real en navegador y la auditoría axe quedan pendientes de ejecución en un entorno que permita abrir el puerto.

## 2026-10-19 — Bio Investigación: explorador interactivo y relato de las fundadoras

La página suma una mesa editorial interactiva de investigación: seis materiales orgánicos nombrados durante la visita activan preguntas y notas contextualizadas, una ilustración vectorial cambia de color por material y tres enfoques alternables explican materia, método y posibilidad. Una bitácora nativa desplegable detalla cuatro técnicas y equipos descritos en terreno: homogeneización, ultrasonido, molienda/tamizado y destilación por vapor. Los controles usan estado accesible, foco visible y anuncios de contenido actualizado; animaciones sutiles respetan movimiento reducido y los estilos cubren tema claro y oscuro. Se amplió el relato humano de las fundadoras y se incorporó una cita breve de la entrevista. La ilustración y el texto evitan afirmar que cada material termina en un producto o que exista recepción pública habilitada. No se añadieron fotos ni video.

**Archivos:** `apps/storefront/src/modules/dk/editorial/research-material-explorer.tsx`, `apps/storefront/src/modules/dk/editorial/research-material-explorer.module.css`, `apps/storefront/src/modules/dk/editorial/bio-investigacion-page.tsx`, `apps/storefront/src/modules/dk/editorial/bio-investigacion-page.module.css`, `tests/e2e/bio-investigacion.spec.ts` y este registro.

**Verificación:** TypeScript, Prettier, 36 pruebas unitarias, lint y build de producción aprobados; lint conserva diez advertencias preexistentes ajenas a Bio Investigación. Playwright lista los tres escenarios responsive y contempla selección de materiales, enfoques y fichas de técnica, pero el servidor de pruebas no puede abrir `127.0.0.1:8000` en este entorno (`listen EPERM`), por lo que no se ejecutaron navegador ni axe. La revisión visual interactiva queda pendiente de correr localmente.

## 2026-10-19 — Bio Investigación: contenido condensado en un banner interactivo

Por indicación del usuario, se reemplazan los bloques independientes de nanotecnología, técnicas, recorrido y fundadoras por un único banner visual. La foto local de las fundadoras se combina con arte vectorial animado y tres vistas seleccionables: nanoemulsiones, técnicas relatadas durante la visita y desarrollo colaborativo. Flechas, selector y CTA funcionan como controles reales, con estados accesibles, tema oscuro, diseño responsive y respeto por movimiento reducido. La navegación interna se ajusta a los nuevos destinos; se conservan el explorador de materiales previo y las secciones posteriores de audiovisual, trayectoria y colaboración. No se agregan fotos ni video.

**Archivos:** `apps/storefront/src/modules/dk/editorial/research-feature-banner.tsx`, `apps/storefront/src/modules/dk/editorial/research-feature-banner.module.css`, `apps/storefront/src/modules/dk/editorial/bio-investigacion-page.tsx`, `tests/e2e/bio-investigacion.spec.ts` y este registro.

**Verificación:** TypeScript, Prettier, 36 pruebas unitarias, lint y build de producción aprobados; lint conserva diez advertencias previas en módulos ajenos a la página. Un build ejecutado en paralelo con otros checks falló transitoriamente al recolectar `/_not-found`; una ejecución aislada terminó correctamente. Playwright lista tres escenarios responsive y comprueba el cambio entre temas, pero la ejecución de navegador no pudo iniciar el servidor por `listen EPERM 127.0.0.1:8000`; axe y revisión visual quedan pendientes.

## 2026-10-19 — Bio Investigación: enfoque del banner en I+D

Se retiran las referencias a las fundadoras. El banner presenta cuatro áreas de Bio Investigación: revalorización y preparación de materiales orgánicos, nanotecnología/nanoemulsiones, técnicas de laboratorio y colaboración para análisis y prototipos. Se amplían los textos basados en la entrevista, conservando aclaraciones de que las técnicas y aplicaciones dependen de cada proyecto. La imagen del banner pasa a ser temporal: se utiliza la foto local de sales de baño del catálogo, marcada expresamente como no representativa del laboratorio y reemplazable por una fotografía de investigación cuando esté disponible. No se añadieron ni generaron imágenes.

**Archivos:** `apps/storefront/src/modules/dk/editorial/research-feature-banner.tsx`, `apps/storefront/src/modules/dk/editorial/research-feature-banner.module.css`, `tests/e2e/bio-investigacion.spec.ts` y este registro.

**Verificación:** TypeScript, Prettier, lint, 36 pruebas unitarias y build de producción aprobados. Playwright reconoce los tres escenarios responsive; su ejecución permanece bloqueada porque el entorno deniega abrir `127.0.0.1:8000` (`listen EPERM`).

## 2026-10-19 — Navegación y dirección visual del banner de Bio Investigación

Se reorganiza el banner para explicar con más claridad el trabajo de investigación: un titular editorial nuevo y una introducción breve conducen a cuatro áreas navegables (materiales orgánicos, nanotecnología, laboratorio y colaboración I+D). Las áreas ahora son pestañas accesibles con selección visible, asociación al panel, navegación por flechas y teclas Inicio/Fin; los controles anterior/siguiente llevan etiquetas visibles y un contador legible. Se reemplazan las órbitas, círculos y pulsos animados por una retícula y trazos lineales estáticos. El cambio de contenido mantiene una transición discreta y respeta la preferencia de movimiento reducido.

**Archivos:** `apps/storefront/src/modules/dk/editorial/research-feature-banner.tsx`, `apps/storefront/src/modules/dk/editorial/research-feature-banner.module.css`, `tests/e2e/bio-investigacion.spec.ts` y este registro.

**Verificación:** TypeScript, Prettier y build de producción aprobados; lint finaliza sin errores y mantiene diez advertencias previas en archivos ajenos a esta sección. Las 36 pruebas unitarias pasan. Se actualizó Playwright para probar las cuatro pestañas, navegación con flechas, teclas Inicio/Fin y controles anterior/siguiente; la ejecución de navegador sigue bloqueada porque el entorno deniega abrir `127.0.0.1:8000` (`listen EPERM`), por lo que axe y la comprobación visual automatizada quedan pendientes de correr localmente.

## 2026-10-19 — Ajuste visual del banner de Bio Investigación

Se elimina del banner la nota «Contenido basado en la visita de terreno…». El fondo cambia de retícula geométrica a líneas curvas estáticas inspiradas en los trazos editoriales del Home, manteniendo el contraste y evitando movimiento decorativo.

**Archivos:** `apps/storefront/src/modules/dk/editorial/research-feature-banner.tsx`, `apps/storefront/src/modules/dk/editorial/research-feature-banner.module.css` y este registro.

**Verificación:** TypeScript y Prettier aprobados. El navegador no se volvió a ejecutar: Playwright sigue sin poder abrir el puerto local en este entorno (`listen EPERM 127.0.0.1:8000`), como se documentó en la entrada anterior.

## 2026-10-19 — Dirección científica del Cuaderno de campo

Se refuerza la cabecera del explorador de materiales sin alterar sus interacciones: «DK · Cuaderno de campo» pasa a ser una firma editorial con código de registro, y el título se acompaña de una nota de observación y una secuencia visual «Origen / Método / Posibilidad». La composición utiliza jerarquía tipográfica, filetes técnicos y acentos verdes, con variantes legibles para modo oscuro y móvil. Se amplían las comprobaciones E2E para identificar el título y la nueva secuencia.

**Archivos:** `apps/storefront/src/modules/dk/editorial/research-material-explorer.tsx`, `apps/storefront/src/modules/dk/editorial/research-material-explorer.module.css`, `tests/e2e/bio-investigacion.spec.ts` y este registro.

**Verificación:** TypeScript, lint y build de producción aprobados. Lint conserva diez advertencias preexistentes en carrito, checkout, productos y configuración de Tailwind. Las 36 pruebas unitarias y Prettier también pasan. Playwright se actualizó para comprobar el titular y la secuencia visual; la ejecución del navegador sigue pendiente por la restricción conocida del entorno al abrir `127.0.0.1:8000` (`listen EPERM`).

## 2026-10-19 — Hero más enfocado para Bio Investigación

Se simplifica la primera impresión de la página: el hero comunica de forma directa que la investigación de BioProductos DK parte de materiales orgánicos y relaciona ese trabajo con biotecnología, nanotecnología y exploración de prototipos. Se compacta el alto visual, se ajusta la fotografía local a su formato apaisado original y se sustituyen los metadatos genéricos por tres focos de I+D. Los CTA ahora llevan directamente al explorador de materiales y al contacto; la navegación por anclas se mantiene.

**Archivos:** `apps/storefront/src/modules/dk/editorial/bio-investigacion-page.tsx`, `apps/storefront/src/modules/dk/editorial/bio-investigacion-page.module.css`, `tests/e2e/bio-investigacion.spec.ts` y este registro.

**Verificación:** TypeScript, Prettier, lint, 36 pruebas unitarias y build de producción aprobados. Lint conserva diez advertencias preexistentes en archivos ajenos a la página. Se ajustó Playwright para comprobar el nuevo titular, enlaces y focos de investigación, pero no pudo iniciar el servidor porque el entorno denegó el puerto `127.0.0.1:8000` (`listen EPERM`); la revisión responsive en navegador queda pendiente de ejecución local.

## 2026-10-19 — Contraste de enlaces y cierre en Bio Investigación

Se aumenta la presencia visual de «Explorar materiales» con un verde medio más luminoso y texto blanco de alto contraste. Se da al enlace secundario del hero un verde más legible. El cierre «Una pregunta puede ser el comienzo» adopta un tono de texto más suave sobre su fondo claro, con un CTA verde visible. El tema oscuro recibe colores propios para que ambos botones y enlaces mantengan contraste.

**Archivos:** `apps/storefront/src/modules/dk/editorial/bio-investigacion-page.module.css` y este registro.

**Verificación:** TypeScript, Prettier y build de producción aprobados; el build conserva diez advertencias de lint preexistentes en carrito, checkout, productos y configuración de Tailwind. La auditoría visual en navegador no se ejecutó en este cambio de estilos.

## 2026-10-19 — Catálogo independiente de Productos

La ruta `/productos` deja de mostrar la pantalla pendiente y presenta un catálogo de compra de seis fichas: detergente cítrico, detergente eucaliptus, champú sólido con opciones para cabello seco/graso/normal, sales de baño con tres opciones numeradas (sus nombres comerciales siguen por confirmar), jabón y acondicionador. Se usan solo fotografías originales ya aportadas: detergente cítrico, detergente eucaliptus, champú para cabello graso y colección de sales. Jabón y acondicionador tienen arte vectorial CSS identificado como composición editorial, no fotografías ni representaciones de envases. La página añade filtros por categoría, búsqueda, selectores de variantes conocidas, selección lateral accesible y enlace de consulta por correo. La selección no simula una orden y declara que no hay compra, precios ni disponibilidad habilitados. No se cambia el checkout ni se conecta Medusa o Shopify.

**Archivos:** `apps/storefront/src/app/(editorial)/productos/page.tsx`, `apps/storefront/src/content/products.ts`, `apps/storefront/src/content/site.ts`, `apps/storefront/src/modules/dk/editorial/products-page.tsx`, `apps/storefront/src/modules/dk/editorial/products-page.module.css`, `tests/products-catalog.test.mjs`, `tests/e2e/productos.spec.ts`, `tests/home-content.test.mjs` y este registro.

**Verificación:** TypeScript, build de producción de Next.js y las 38 pruebas unitarias aprobados. ESLint finaliza sin errores y conserva diez advertencias existentes en archivos del starter, sin advertencias en los archivos de Productos. Prettier pasa sobre todos los archivos editados; el chequeo global conserva dos advertencias de formato previas en `editorial.css` y `home-hero-carousel.tsx`, que no se modificaron en esta tarea. Playwright reconoce tres escenarios responsive, búsqueda, filtros, selección, teclado y axe, pero no pudo iniciar el servidor local (`listen EPERM 127.0.0.1:8000`); por eso la revisión de navegador y axe aún no se han ejecutado.

## 2026-10-19 — Banner más compacto en Productos

Se reduce la primera franja de Productos a una cabecera editorial tipográfica, con título breve y acceso directo al catálogo. Se retira la fotografía panorámica y los adornos del hero porque las tarjetas ya presentan los productos y sus fotos; así el usuario llega antes a filtros, búsqueda y selección. El estilo compacto se adapta a móvil y al tema oscuro.

**Archivos:** `apps/storefront/src/modules/dk/editorial/products-page.tsx`, `apps/storefront/src/modules/dk/editorial/products-page.module.css`, `tests/e2e/productos.spec.ts` y este registro.

**Verificación:** TypeScript, las 38 pruebas unitarias, Prettier sobre los archivos modificados y build de producción aprobados. El build conserva diez advertencias preexistentes en archivos del starter. La prueba E2E actualizada no se ejecutó: el entorno deniega abrir `127.0.0.1:8000` (`listen EPERM`).

## 2026-10-19 — Banner de Productos con accesos de compra por categoría

Se conserva la altura compacta del banner y se refuerza su identidad visual con tonos salvia, líneas curvas estáticas y una composición editorial de dos columnas. El CTA «Ver todos los productos» ahora tiene un icono de bolsa dibujado en SVG inline; dos accesos rápidos de Hogar y Cuidado personal aplican sus filtros del catálogo y llevan a las fichas correspondientes. El tema oscuro tiene colores propios y la prueba E2E cubre ambos accesos.

**Archivos:** `apps/storefront/src/modules/dk/editorial/products-page.tsx`, `apps/storefront/src/modules/dk/editorial/products-page.module.css`, `tests/e2e/productos.spec.ts` y este registro.

**Verificación:** TypeScript, las 38 pruebas unitarias, Prettier y build de producción aprobados. El build mantiene diez advertencias preexistentes en archivos del starter. No se pudo ejecutar la prueba E2E: Playwright requiere abrir `127.0.0.1:8000` y el entorno deniega el puerto (`listen EPERM`).

## 2026-10-19 — Consistencia visual de accesos rápidos en Productos

Se limita el rediseño al bloque «Explora por categoría»: los dos accesos ahora usan la misma superficie blanca, borde, altura, tipografía y alineación; sus iconos lineales comparten el mismo tratamiento verde, y la flecha queda centrada en un círculo discreto. En tema oscuro el bloque usa la superficie oscura del sitio. El botón principal «Ver todos los productos» mantiene el verde para conservar la jerarquía de compra.

**Archivos:** `apps/storefront/src/modules/dk/editorial/products-page.tsx`, `apps/storefront/src/modules/dk/editorial/products-page.module.css` y este registro.

**Verificación:** TypeScript, Prettier y build de producción aprobados. El build conserva diez advertencias anteriores en archivos del starter; no se modificaron esos archivos.

## 2026-10-19 — Jerarquía uniforme para acciones del banner de Productos

Las opciones «Cuidado del hogar», «Cuidado personal» y «Ver todos los productos» ahora se presentan como tres filas blancas uniformes, con igual altura, borde y alineación. La bolsa y flecha reemplazan diferencias de color para identificar sus destinos, por lo que ninguna acción compite visualmente con otra. Se conserva la adaptación a tema oscuro.

**Archivos:** `apps/storefront/src/modules/dk/editorial/products-page.tsx`, `apps/storefront/src/modules/dk/editorial/products-page.module.css` y este registro.

**Verificación:** TypeScript, las 38 pruebas unitarias, Prettier y build de producción aprobados. El build finalizó correctamente tras limpiar el directorio `.next` generado, luego de dos fallos transitorios de Next.js al localizar páginas del manifiesto (`/_document` y `/opengraph-image.jpg`). Conserva diez advertencias de lint preexistentes en archivos del starter.

## 2026-10-19 — Página Empresas para comercios y organizaciones

Se reemplaza la vista pendiente de `/empresas` por una página editorial y comercial con recorridos separados para comercios/puntos de venta, distribución y empresas/instituciones. Incluye acceso al catálogo, explicación transparente de la conversación B2B, sección de red de puntos de venta sin ubicaciones ficticias, pasos para iniciar contacto y enlaces `mailto:` con asunto y pauta editables. El hero usa una fotografía original local del portafolio, sin atribuirla a instalaciones o locales. Las condiciones comerciales quedan sujetas a conversación directa y la guía de tiendas indica que los datos se publicarán cuando estén confirmados y autorizados. No se añadió envío de formularios, persistencia de solicitudes, disponibilidad, precios mayoristas ni integración comercial.

**Archivos:** `apps/storefront/src/app/(editorial)/empresas/page.tsx`, `apps/storefront/src/modules/dk/editorial/companies-page.tsx`, `apps/storefront/src/modules/dk/editorial/companies-page.module.css`, `apps/storefront/src/content/site.ts`, `tests/home-content.test.mjs`, `tests/e2e/empresas.spec.ts` y este registro.

**Verificación:** TypeScript, las 38 pruebas unitarias, Prettier y build de producción aprobados. ESLint finaliza sin errores y mantiene diez advertencias preexistentes en archivos del starter. La prueba E2E contempla 375, 768 y 1440 px, enlaces y axe; no pudo arrancar el servidor porque el entorno deniega `listen 127.0.0.1:8000` (`EPERM`), por lo que la comprobación visual de navegador sigue pendiente.

## 2026-10-19 — Ajuste de contraste y jerarquía en CTA de Empresas

Se reemplaza el cierre genérico por «Construyamos una relación comercial con sentido», se acorta la explicación y se cambia el botón a «Iniciar conversación comercial». Se retira el emblema DK que competía con el CTA; el remate conserva un trazo circular tenue desplazado al fondo. Los botones principales del hero y cierre usan ahora superficie salvia clara y texto verde oscuro para reforzar contraste y legibilidad.

**Archivos:** `apps/storefront/src/modules/dk/editorial/companies-page.tsx`, `apps/storefront/src/modules/dk/editorial/companies-page.module.css`, `tests/e2e/empresas.spec.ts` y este registro.

**Verificación:** Prettier, TypeScript, las 38 pruebas unitarias y build de producción aprobados. El build mantiene las diez advertencias preexistentes en archivos del starter. La verificación visual con Playwright mantiene la limitación documentada de `listen EPERM` en `127.0.0.1:8000`.

## 2026-10-19 — Ubicación de BioProductos DK en Google Maps

Se desarrolla `/donde-comprar` como página de ubicación: mapa Google integrado a partir del enlace compartido por el usuario, ficha visual con referencia Santiago, Chile, acceso directo a Google Maps para consultar pin/dirección/indicaciones, y guía breve para planificar la visita. El mapa se adapta a móvil y escritorio, incorpora etiqueta accesible, tema oscuro y enlaces alternativos por si el iframe externo no carga. No se inventaron horarios ni dirección textual. El acortador de Maps no pudo expandirse desde la herramienta de consulta; el enlace original se conserva como fuente de ubicación y destino de los CTA.

**Archivos:** `apps/storefront/src/app/(editorial)/donde-comprar/page.tsx`, `apps/storefront/src/modules/dk/editorial/where-to-buy-page.tsx`, `apps/storefront/src/modules/dk/editorial/where-to-buy-page.module.css`, `apps/storefront/src/content/site.ts`, `tests/home-content.test.mjs`, `tests/e2e/donde-comprar.spec.ts` y este registro.

**Verificación:** TypeScript, las 38 pruebas unitarias, Prettier y build de producción aprobados. ESLint del storefront termina sin errores y conserva diez advertencias preexistentes fuera de esta página. La prueba E2E está preparada para 375, 768 y 1440 px, el mapa accesible y el enlace exacto; no pudo arrancar porque el entorno deniega `listen 127.0.0.1:8000` (`EPERM`). El enlace corto tampoco pudo expandirse desde el entorno de consulta, por lo que la carga efectiva del mapa y la dirección postal visible deben revisarse desde el navegador del equipo con acceso a Google.

## 2026-10-19 — Corrección del mapa y dirección exacta de BioProductos DK

El usuario reportó que el iframe con el enlace corto de Google Maps mostraba contenido bloqueado y entregó la URL completa de la ubicación. Se reemplaza el destino acortado por una consulta de mapa embebible centrada en las coordenadas exactas `-33.5776313,-70.8306463` a nivel 17; los enlaces de salida apuntan a la ficha completa. La dirección visible ahora es Papa Juan Pablo I 2104, 9710000 Padre Hurtado, Región Metropolitana. Se actualizan título accesible, metadata y prueba E2E para validar coordenadas y destino.

**Archivos:** `apps/storefront/src/modules/dk/editorial/where-to-buy-page.tsx`, `apps/storefront/src/app/(editorial)/donde-comprar/page.tsx`, `tests/e2e/donde-comprar.spec.ts` y este registro.

**Verificación:** TypeScript, ESLint (sin errores; diez advertencias preexistentes del starter), las 38 pruebas unitarias, Prettier y build de producción aprobados. La prueba E2E sigue sin poder iniciar el servidor por `listen EPERM` en `127.0.0.1:8000`. El iframe fue actualizado a la URL clásica de embed con coordenadas exactas, pero la verificación visual de Google Maps aún requiere un navegador con acceso al servicio.

## 2026-10-19 — Corrección del iframe que Google bloquea

El usuario confirmó que la vista de Google seguía bloqueada. Se reemplazó el endpoint `www.google.com/maps?output=embed` por el formato clásico de mapa embebido `maps.google.com/maps?q=...&t=&z=17&ie=UTF8&iwloc=&output=embed`, con la dirección completa; se mantiene aparte el enlace normal de la ficha para indicaciones. La etiqueta del marco ahora identifica el mapa como interactivo. No se añadió una API key ni se requiere configurar pagos de Google Cloud para este formato.

**Archivos:** `apps/storefront/src/modules/dk/editorial/where-to-buy-page.tsx`, `tests/e2e/donde-comprar.spec.ts` y este registro.

**Verificación:** TypeScript, Prettier, las 38 pruebas unitarias y build de producción aprobados. El build conserva diez advertencias previas del starter. No se pudo verificar visualmente el contenido del iframe: Playwright no inicia por la restricción `EPERM` en `127.0.0.1:8000`; el usuario debe confirmar la carga desde su navegador.

## 2026-10-19 — Política CSP que impedía cargar Google Maps

Al investigar el reporte persistente se encontró el bloqueo local: la política `Content-Security-Policy` no definía `frame-src`, por lo que `default-src 'self'` rechazaba cualquier iframe de Google Maps aunque la URL del mapa fuera válida. Se permiten ahora únicamente `https://maps.google.com` y `https://www.google.com` como destinos de iframe. El mapa y los enlaces siguen apuntando a la ubicación indicada por el usuario. La prueba E2E comprueba además que la respuesta del sitio permita esos orígenes.

**Archivos:** `apps/storefront/next.config.js`, `apps/storefront/src/modules/dk/editorial/where-to-buy-page.tsx`, `tests/e2e/donde-comprar.spec.ts` y este registro.

**Verificación:** TypeScript, lint y build de producción aprobados; las 38 pruebas unitarias pasan. Se comprobó que la configuración efectiva devuelve `frame-src https://maps.google.com https://www.google.com`. Playwright no pudo iniciar el servidor local por la restricción del entorno (`listen EPERM 127.0.0.1:8000`), por lo que la representación visual final aún debe comprobarse al reiniciar el servidor en el Mac. Reiniciar Next.js es necesario para que adopte el nuevo encabezado CSP.

## 2026-10-19 — Acceso a la ubicación desde el Home

Se añade justo debajo de la franja de donaciones un banner de ubicación más compacto, con pin, referencia a Padre Hurtado y el enlace «Ubícanos aquí» a `/donde-comprar`. Mantiene el tema claro/oscuro, adaptación móvil, foco visible y microinteracción reducida si el usuario prefiere menos movimiento. La prueba Home comprueba destino, orden y altura relativa frente a la franja de donaciones.

**Archivos:** `apps/storefront/src/modules/dk/editorial/home.tsx`, `apps/storefront/src/app/(editorial)/editorial.css`, `tests/e2e/preview.spec.ts` y este registro.

**Verificación:** TypeScript, build de producción, ESLint y Prettier aprobados; también pasan las 38 pruebas unitarias. La prueba visual responsive de Playwright quedó preparada, pero no pudo ejecutarse porque el entorno deniega abrir `127.0.0.1:8000` (`listen EPERM`).

## 2026-10-19 — Separación y tratamiento visual del banner de ubicación

Se separa más el banner «Ubícanos aquí» de la franja de donaciones con márgenes verticales y se convierte en una tarjeta horizontal independiente, de esquinas redondeadas, fondo cálido con matices verdes, trazos circulares sutiles y elevación discreta al pasar el cursor o recibir foco. El tema oscuro y la composición móvil conservan contraste y legibilidad.

**Archivos:** `apps/storefront/src/app/(editorial)/editorial.css` y este registro.

**Verificación:** TypeScript, build de producción, ESLint y Prettier aprobados; las 38 pruebas unitarias pasan. La comprobación visual de Playwright sigue limitada por `listen EPERM 127.0.0.1:8000` en este entorno.

## 2026-10-19 — Ancho del acceso a la ubicación en el Home

Se amplía el ancho máximo de la tarjeta «Ubícanos aquí» a 1420 px, conservando los márgenes adaptables del sitio y el ancho móvil. Así se aprovecha mejor el espacio en pantallas grandes sin llevar el banner hasta los bordes.

**Archivos:** `apps/storefront/src/app/(editorial)/editorial.css` y este registro.

**Verificación:** ajuste CSS; formato verificado con Prettier. El build anterior de esta tarjeta pasó y no hubo cambios de estructura o comportamiento.

## 2026-10-19 — Más presencia horizontal para «Ubícanos aquí»

Se vuelve a ampliar el banner hasta 1600 px en pantallas grandes y se ajusta su margen lateral con un mínimo de 20 px y un máximo de 48 px. El ancho disponible se calcula según el viewport, por lo que gana extensión sin tocar los bordes y se conserva el espacio cómodo en móvil.

**Archivos:** `apps/storefront/src/app/(editorial)/editorial.css` y este registro.

**Verificación:** ajuste CSS y Prettier aprobado. No cambian estructura ni comportamiento.

## 2026-10-19 — Página independiente «Nosotras»

Se reemplaza la pantalla pendiente de `/nosotras` por un relato editorial completo: un hero con la fotografía original ya entregada de las fundadoras, el lema institucional de ciencia y cuidado, la historia desde el proyecto de innovación iniciado en 2020, una línea de hitos, principios de trabajo, organización del laboratorio y un cierre que conecta con Bio Investigación y Productos. El contenido distingue la historia institucional publicada (2020, fondo de innovación e inicio de BioProductos DK SpA) de los procesos contados durante la visita. No se asignan nombres, cargos, títulos académicos, frases personales ni logros sin verificación; el lema destacado procede de la comunicación institucional pública. Se diseñó para tema claro/oscuro, teclado, movimiento reducido y móvil.

**Fuentes:** [perfil oficial Nosotras](https://bioproductosdk.com/nosotras/) y `docs/ENTREVISTA_TERRENO_BIO_DK.md`.

**Archivos:** `apps/storefront/src/app/(editorial)/nosotras/page.tsx`, `apps/storefront/src/modules/dk/editorial/nosotras-page.tsx`, `apps/storefront/src/modules/dk/editorial/nosotras-page.module.css`, `apps/storefront/src/content/site.ts`, `tests/home-content.test.mjs`, `tests/e2e/nosotras.spec.ts` y este registro.

**Verificación:** TypeScript, build de producción, ESLint, Prettier y las 39 pruebas unitarias aprobados. El primer build presentó un fallo transitorio de Next.js al localizar `opengraph-image.jpg`; el reintento completó correctamente e incluyó `/nosotras` como ruta estática. La prueba responsive y axe de Playwright quedó implementada, pero no pudo iniciar el servidor por la restricción del entorno (`listen EPERM 127.0.0.1:8000`). ESLint mantiene diez advertencias preexistentes en el starter, sin errores.

## 2026-10-19 — Página de Contacto clara, multicanal y accesible

Se sustituye la vista pendiente de `/contacto` por una página dedicada con correo institucional, los dos teléfonos publicados, redes sociales y acceso a la ubicación de Padre Hurtado. Se distingue explícitamente esa ubicación del domicilio institucional publicado en Huérfanos 1160, oficina 1102, Santiago. Incluye formulario con nombre, correo, teléfono opcional, tema y mensaje; al enviarlo prepara un correo editable mediante `mailto:` en la aplicación del visitante. El sitio no transmite ni guarda esos datos y ofrece el correo directo como alternativa. La presentación contempla móvil, foco visible, movimiento reducido y temas claro/oscuro; no incorpora imágenes nuevas ni afirma que exista atención presencial sin coordinación.

**Fuente de contacto:** [perfil oficial de BioProductos DK](https://bioproductosdk.com/nosotras/). La ubicación de Padre Hurtado corresponde a la dirección ya entregada por el usuario para `/donde-comprar`.

**Archivos:** `apps/storefront/src/app/(editorial)/contacto/page.tsx`, `apps/storefront/src/modules/dk/editorial/contact-page.tsx`, `apps/storefront/src/modules/dk/editorial/contact-page.module.css`, `apps/storefront/src/modules/dk/editorial/contact-form.tsx`, `apps/storefront/src/content/site.ts`, `tests/home-content.test.mjs`, `tests/e2e/contacto.spec.ts` y este registro.

**Verificación:** TypeScript, build de producción, Prettier y las 40 pruebas unitarias aprobados; la ruta `/contacto` aparece prerenderizada como página estática. ESLint termina sin errores y conserva diez advertencias preexistentes del starter. Se añadió una prueba E2E para 375, 768 y 1440 px y axe; no pudo iniciar el servidor porque este entorno deniega `listen 127.0.0.1:8000` (`EPERM`), así que falta revisar la página visualmente en el navegador local.

## 2026-10-19 — Hero compacto para Contacto

Se reduce el alto del primer banner de Contacto, el tamaño máximo del titular y la composición circular DK. En móvil se conserva el orden del mensaje y el CTA, con una ilustración más compacta. Las secciones de canales, formulario y rutas relacionadas no se modifican.

**Archivos:** `apps/storefront/src/modules/dk/editorial/contact-page.module.css` y este registro.

**Verificación:** Prettier aprobado. El ajuste es exclusivamente de estilos; TypeScript y build de la página ya pasaron antes de este cambio. La revisión visual responsive queda pendiente por la restricción E2E documentada (`listen EPERM 127.0.0.1:8000`).

## 2026-10-19 — Logo original en el emblema de Contacto

Se reemplaza el texto «DK / CONVERSEMOS» del círculo del hero por el logo circular original que el usuario dejó en `public/loogo/`. Se conserva el emblema, su escala compacta y el arte orbital; la superficie blanca del logo mantiene contraste en los temas claro y oscuro. Se añade una comprobación unitaria para verificar que el archivo original exista y se use en el componente.

**Archivos:** `apps/storefront/src/modules/dk/editorial/contact-page.tsx`, `apps/storefront/src/modules/dk/editorial/contact-page.module.css`, `tests/home-content.test.mjs` y este registro.

**Verificación:** las 40 pruebas unitarias, TypeScript y Prettier aprobados. El archivo se verifica en la prueba unitaria de Contacto para asegurar que el componente apunta al logo original existente.

## 2026-10-19 — Ruta pública fiable para el logo circular de Contacto

El usuario reportó que el centro se veía blanco. La causa probable era la ruta pública con espacios en el nombre, que no estaba resolviendo de forma fiable en la vista. Se conserva intacto el original en `public/loogo/` y se crea una copia byte a byte con nombre de archivo simple en `public/images/brand/logo-dk-circular-original.png`; el banner ahora usa esa ruta. La prueba compara los SHA-256 de ambos archivos para evitar que la copia se aparte del original.

**Archivos:** `apps/storefront/src/modules/dk/editorial/contact-page.tsx`, `apps/storefront/public/images/brand/logo-dk-circular-original.png`, `tests/home-content.test.mjs` y este registro.

**Verificación:** las 40 pruebas unitarias, TypeScript, Prettier y build de producción aprobados; la prueba también confirma que la copia del logo es byte a byte idéntica al original. No había servidor local escuchando en `127.0.0.1:8000` para comprobar la imagen servida en navegador, por lo que la validación visual final requiere recargar `/contacto` con el servidor activo.

## 2026-10-19 — Contraste de los botones de Contacto

El usuario reportó que «Escríbenos» y «Preparar correo» no se veían bien en el tema claro. La regla global `.dk2-site a` y `.dk2-site button` tenía más especificidad que las reglas locales de Contacto y reemplazaba el color previsto por el color heredado. Se elevó la especificidad únicamente para los dos botones de esta página; el texto queda blanco sobre verde en tema claro y conserva tinta oscura sobre salvia en tema oscuro. La prueba E2E comprueba ambos estados.

**Archivos:** `apps/storefront/src/modules/dk/editorial/contact-page.module.css`, `tests/e2e/contacto.spec.ts` y este registro.

**Verificación:** las 40 pruebas unitarias, TypeScript, Prettier y build de producción aprobados. La prueba E2E incorpora comprobaciones de color para tema claro/oscuro; no se pudo ejecutar visualmente porque el servidor no estaba disponible en el entorno (`127.0.0.1:8000`).

## 2026-10-19 — Rediseño técnico y participativo de Donaciones

Se reconstruye `/donaciones` como una guía editorial de colaboración: una portada con visualización conceptual de circularidad, ejemplos de materiales orgánicos mencionados en la visita, un recorrido de evaluación en cuatro etapas, explicación de prácticas de laboratorio relatadas por DK y una guía para iniciar una consulta. El correo abre un borrador con preguntas útiles sobre material, origen, comuna, cantidad/frecuencia y separación. Se añaden preguntas frecuentes interactivas, navegación hacia Bio Impacto y un bloque de participación que explica por qué informar el origen ayuda a evaluar cada material.

La página recalca que todavía no existe recepción pública habilitada, punto de entrega, retiro automático, protocolo público, descuento ni recompensa. Solicita consultar y esperar confirmación antes de preparar o trasladar residuos. Distingue expresamente ejemplos de investigación de una lista de materiales aceptados y evita afirmar que todos terminan en productos. Las técnicas descritas (limpieza/desinfección, deshidratación, molienda, tamizado y destilación por vapor en casos mencionados) se presentan como prácticas narradas, no como procedimiento universal ni instrucciones para el público. No se incorporaron imágenes o videos.

**Fuente de contenido:** `docs/ENTREVISTA_TERRENO_BIO_DK.md`, visita a laboratorio y charla sobre residuos y colaboración; reglas editoriales de `docs/MASTER_CONTEXT.md`.

**Archivos:** `apps/storefront/src/app/(editorial)/donaciones/page.tsx`, `apps/storefront/src/app/(editorial)/editorial.css`, `tests/home-content.test.mjs`, `tests/e2e/preview.spec.ts`, `tests/e2e/donaciones.spec.ts` y este registro.

**Verificación:** las 41 pruebas unitarias, TypeScript, Prettier y build de producción aprobados; `/donaciones` aparece prerenderizada como página estática. ESLint termina sin errores y mantiene diez advertencias preexistentes del starter. Se preparó prueba E2E para 375, 768 y 1440 px, contenido, CTA, FAQ y axe; Playwright no pudo iniciar el servidor por `listen EPERM 127.0.0.1:8000`, así que falta comprobación visual y automatizada en navegador local.

## 2026-10-19 — Símbolo de reciclaje en el banner de Donaciones

Se reemplaza el monograma del centro del diagrama circular por un icono SVG de tres flechas de reciclaje dibujado en código, con el rótulo «DK · Ciencia circular». El símbolo hereda la paleta del sitio, se adapta al tema oscuro y recibe un giro suave al pasar el cursor, respetando la preferencia de movimiento reducido. No se añade ningún recurso externo.

**Archivos:** `apps/storefront/src/app/(editorial)/donaciones/page.tsx`, `apps/storefront/src/app/(editorial)/editorial.css`, `tests/home-content.test.mjs` y este registro.

**Verificación:** las 41 pruebas unitarias, TypeScript y Prettier aprobados. El SVG está incluido directamente en el componente, sin dependencia ni recurso externo.

## 2026-10-19 — Símbolo de reciclaje sin rótulo

A petición del usuario, se elimina «DK · Ciencia circular» del centro del banner de Donaciones y se amplía el símbolo SVG para que el icono de reciclaje sea el único elemento central. Se conserva el trazo original, su color adaptable y la interacción suave con respeto a movimiento reducido. No se agregan recursos externos.

**Archivos:** `apps/storefront/src/app/(editorial)/donaciones/page.tsx`, `apps/storefront/src/app/(editorial)/editorial.css`, `tests/home-content.test.mjs` y este registro.

**Verificación:** 41 pruebas unitarias, TypeScript y Prettier aprobados. No se repitió build ni E2E por tratarse de un ajuste visual menor; la limitación E2E documentada arriba sigue vigente.

## 2026-10-19 — Emblema de reciclaje con mayor presencia

Se redibuja el símbolo central del banner de Donaciones como un emblema SVG de ciclo reconocible: tres flechas curvas con puntas definidas, degradado verde y una hoja central. Se incorpora un medallón suave para separarlo del fondo y se refina el hover con elevación y giro breve. El diseño sigue siendo vectorial, sin imágenes ni recursos externos, y el texto «DK · Ciencia circular» continúa eliminado.

**Archivos:** `apps/storefront/src/app/(editorial)/donaciones/page.tsx`, `apps/storefront/src/app/(editorial)/editorial.css`, `tests/home-content.test.mjs` y este registro.

**Verificación:** 41 pruebas unitarias, TypeScript y Prettier aprobados. No se repitió build ni E2E por tratarse de un ajuste visual; la limitación E2E documentada en la implementación de Donaciones sigue vigente.

## 2026-10-19 — Centrado y giro continuo del emblema

Se alinea el medallón del reciclaje con el centro geométrico del círculo editorial y se ordena el icono dentro de un marco cuadrado fijo para evitar desplazamientos por el aspecto del banner. El símbolo inicia un giro continuo y lento; el ajuste global de movimiento reducido detiene la animación cuando corresponde.

**Archivos:** `apps/storefront/src/app/(editorial)/editorial.css`, `tests/home-content.test.mjs` y este registro.

**Verificación:** 41 pruebas unitarias, TypeScript y Prettier aprobados. La animación infinita respeta la regla global de movimiento reducido; no se repitió build ni E2E para este ajuste visual.

## 2026-10-19 — Página independiente Bio Impacto

Se sustituye el estado pendiente de `/bio-impacto` por una página editorial completa con dirección propia: portada ilustrada en SVG/CSS, navegación interna, explicación del enfoque de economía circular, principios, materiales mencionados en terreno en tarjetas interactivas, recorrido desde el origen hasta la investigación, contexto sobre impacto responsable y cierre para colaboración. Los CTAs enlazan a páginas existentes de Donaciones, Bio Investigación y Contacto. Se recalca que los ejemplos no son una lista de recepción, no existe un programa público de recepción habilitado y el recorrido descrito no es un protocolo público.

El contenido se construye con la entrevista de terreno (`docs/ENTREVISTA_TERRENO_BIO_DK.md`), el Contexto Maestro y la comunicación institucional consultada en [Bio Impacto del sitio oficial](https://bioproductosdk.com/bio-impacto/). No se publican cifras de impacto, certificaciones, porcentajes ni resultados no verificados. Las superficies visuales se dibujan con CSS y SVG; no se agregan imágenes ni videos.

**Archivos:** `apps/storefront/src/app/(editorial)/bio-impacto/page.tsx`, nuevo `apps/storefront/src/modules/dk/editorial/bio-impacto-page.tsx`, nuevo `apps/storefront/src/modules/dk/editorial/bio-impacto-page.module.css`, `apps/storefront/src/content/site.ts`, `tests/home-content.test.mjs`, nuevo `tests/e2e/bio-impacto.spec.ts` y este registro.

**Verificación:** 42 pruebas unitarias, TypeScript, Prettier, lint y build de producción aprobados. Lint mantiene diez advertencias preexistentes del starter; `/bio-impacto` aparece prerenderizada como página estática. Se añadieron tres casos E2E responsive con axe y controles de contenido/interacción, pero Playwright no pudo arrancar el servidor por `listen EPERM 127.0.0.1:8000`; no se declara aprobada la revisión visual en navegador.

**Revisar:** `npm run dev:storefront` y abrir `http://127.0.0.1:8000/bio-impacto`. Probar desktop/tablet/móvil, alternar tema claro/oscuro, abrir las tarjetas de materiales con teclado y visitar Donaciones y Bio Investigación desde sus CTA.

## 2026-10-19 — Corrección de las puntas del símbolo circular

Se corrigen los dos usos del emblema de Bio Impacto mediante su componente SVG compartido: cada uno de los tres arcos ahora recibe una sola punta desde un marcador SVG, en vez de dibujar cuerpos y puntas a mano con segmentos que se solapaban. Se mantienen el giro continuo del emblema superior y el emblema inferior estático. El identificador de cada marcador es único para evitar conflictos entre ambas instancias.

**Archivos:** `apps/storefront/src/modules/dk/editorial/bio-impacto-page.tsx`, `tests/home-content.test.mjs` y este registro.

**Verificación:** 42 pruebas unitarias, TypeScript, Prettier y build de producción aprobados. El storefront prerenderiza `/bio-impacto` como página estática. No se repitió E2E por este ajuste del SVG; en la entrada de implementación de la página consta el bloqueo del servidor local por `listen EPERM`.

## 2026-10-19 — Flechas circulares refinadas alrededor de la hoja

Se rediseñan las flechas del emblema con puntas curvas más amplias y tres trazos separados que forman un ciclo limpio alrededor de la hoja. En el icono superior solo giran las flechas; la hoja permanece fija en el centro. El emblema inferior mantiene los mismos trazos sin animación. Se conserva la preferencia global de movimiento reducido.

**Archivos:** `apps/storefront/src/modules/dk/editorial/bio-impacto-page.tsx`, `apps/storefront/src/modules/dk/editorial/bio-impacto-page.module.css`, `tests/home-content.test.mjs` y este registro.

**Verificación:** 42 pruebas unitarias, TypeScript, Prettier y build de producción aprobados. `/bio-impacto` sigue prerenderizada como página estática. La comprobación en navegador mantiene el bloqueo E2E del entorno (`listen EPERM 127.0.0.1:8000`) documentado en la implementación de la página.

## 2026-10-19 — Hoja central sin elementos giratorios

Por nueva indicación, se eliminan las flechas y cualquier rotación orbital en los dos emblemas de Bio Impacto, tanto el de la portada como el del bloque inferior. Ambos conservan solo una hoja ilustrada estática, con nervaduras y contraste para distinguirla del fondo. Se retira también la animación del anillo orbital de la portada; el contorno permanece como recurso estático.

**Archivos:** `apps/storefront/src/modules/dk/editorial/bio-impacto-page.tsx`, `apps/storefront/src/modules/dk/editorial/bio-impacto-page.module.css`, `tests/home-content.test.mjs` y este registro.

**Verificación:** 42 pruebas unitarias, TypeScript, Prettier y build de producción aprobados. `/bio-impacto` se prerenderiza correctamente como página estática. Los dos emblemas ya no incluyen flechas ni animaciones orbitales.

## 2026-10-19 — Limpieza del interior de la hoja

Se elimina el trazo blanco decorativo del interior de la hoja en los dos emblemas de Bio Impacto. Se mantienen la silueta y sus nervaduras verdes.

**Archivos:** `apps/storefront/src/modules/dk/editorial/bio-impacto-page.tsx`, `tests/home-content.test.mjs` y este registro.

**Verificación:** 42 pruebas unitarias y Prettier aprobados. Es un ajuste de SVG estático; no requiere nueva compilación de la ruta.

## 2026-10-19 — Órbitas científicas alrededor de la hoja

Se incorporan dos órbitas elípticas finas con partículas pequeñas alrededor de la hoja en ambos emblemas de Bio Impacto. Cada órbita se mueve despacio en sentido opuesto para evocar un modelo atómico sin añadir ilustraciones externas ni recargar el símbolo. Las animaciones quedan cubiertas por la regla global de movimiento reducido.

**Archivos:** `apps/storefront/src/modules/dk/editorial/bio-impacto-page.tsx`, `apps/storefront/src/modules/dk/editorial/bio-impacto-page.module.css`, `tests/home-content.test.mjs` y este registro.

**Verificación:** 42 pruebas automatizadas, TypeScript del storefront y formato Prettier aprobados. La animación respeta `prefers-reduced-motion`. No se añadieron imágenes ni dependencias.

## 2026-10-19 — Jerarquía del inicio del catálogo

Se ordena el primer bloque de Productos con una jerarquía más clara entre identidad del catálogo, titular y descripción, y un panel separado para explorar categorías. Los accesos a Hogar, Cuidado personal y Ver todos quedan alineados, con mayor área de interacción, estados de foco visibles y adaptación móvil/dark mode. La selección de categoría y el desplazamiento al catálogo mantienen su comportamiento existente.

**Archivos:** `apps/storefront/src/modules/dk/editorial/products-page.module.css` y este registro.

**Verificación:** 42 pruebas automatizadas, TypeScript del storefront y Prettier aprobados. La interacción existente de filtros y anclas se conserva; no se añadieron dependencias.

## 2026-10-19 — Contraste del filtro activo en Productos

Se mejora la legibilidad del filtro seleccionado, incluido “Todo”, en modo claro con una superficie verde suave, texto verde oscuro y un indicador circular de selección. Se conserva el tratamiento de alto contraste del tema oscuro y se añade un foco de teclado visible.

**Archivos:** `apps/storefront/src/modules/dk/editorial/products-page.module.css`, `tests/products-catalog.test.mjs` y este registro.

**Verificación:** 43 pruebas automatizadas, TypeScript del storefront y Prettier aprobados. Se agregó una prueba de contraste/estados para los temas claro y oscuro.

## 2026-10-19 — Redacción y tipografía de fichas de Productos

Se reescriben las seis descripciones del catálogo con lenguaje más claro, comercial y orientado a ayudar a elegir, sin atribuir beneficios técnicos ni propiedades no verificadas. Se normalizan los nombres a “Shampoo sólido” y “aroma a eucalipto”; en sales, jabón y acondicionador se explicita qué detalles siguen requiriendo consulta. Se mejora el tamaño y la legibilidad de nombres, descripciones, variantes y acciones, también en móvil. Los títulos y la búsqueda de la página se actualizan para reflejar el vocabulario corregido.

**Archivos:** `apps/storefront/src/content/products.ts`, `apps/storefront/src/modules/dk/editorial/products-page.module.css`, `tests/products-catalog.test.mjs`, `tests/e2e/productos.spec.ts` y este registro.

**Verificación:** 43 pruebas automatizadas, TypeScript del storefront y Prettier aprobados. Las pruebas del catálogo comprueban nombres y descripciones; no se añadieron claims ni datos comerciales sin confirmar.

## 2026-10-19 — Órbitas científicas con mayor presencia

Se amplían las dos órbitas elípticas y sus partículas alrededor de la hoja en ambos emblemas de Bio Impacto, aproximadamente un 20 %, para hacer el detalle más visible sin alterar el tamaño de la hoja ni la composición general. Se conserva el giro lento en sentidos opuestos y el soporte de movimiento reducido.

**Archivos:** `apps/storefront/src/modules/dk/editorial/bio-impacto-page.tsx`, `tests/home-content.test.mjs` y este registro.

**Verificación:** 42 pruebas automatizadas, TypeScript del storefront y formato Prettier aprobados. La animación respeta `prefers-reduced-motion`. No se añadieron imágenes ni dependencias.

## 2026-10-19 — Carrito y compra de demostración para Productos

El catálogo ofrece ahora una experiencia de compra simulada de principio a fin: cada artículo tiene un valor CLP ficticio identificado como demostración; selección obligatoria de variante en shampoo y sales; carrito local con fotos ya disponibles, cantidades, subtotal, eliminación, vaciado, resumen y pantalla final de confirmación de prueba. El carrito persiste solo en `localStorage` de este navegador y sincroniza su contador con el carrito del header y otras pestañas. Un evento local permite abrir el carrito desde el header sin exponer datos a servicios externos.

La simulación no recopila datos personales, no crea pedidos, no procesa pagos, no calcula despacho y no conecta con Shopify, Medusa ni proveedores. Los importes se usan solo para dar contexto visual al flujo y no representan precios de BioProductos DK. La interfaz advierte esto en el catálogo, en el carrito y antes de confirmar.

**Archivos:** `apps/storefront/src/lib/util/demo-cart.ts`, `apps/storefront/src/modules/dk/editorial/products-page.tsx`, `products-page.module.css`, `header-cart-popover.tsx`, `tests/demo-cart.test.mjs`, `tests/e2e/productos.spec.ts` y este registro.

**Verificación:** 46 pruebas automatizadas, TypeScript, lint y build de producción aprobados. Lint conserva 10 advertencias previas del starter, sin errores. La compilación prerenderiza `/productos`. La prueba E2E del flujo se intentó, pero el servidor configurado no pudo enlazar `127.0.0.1:8000` en este entorno (`listen EPERM`); por ello la interacción visual real en navegador queda pendiente de revisión local.

## 2026-10-19 — Retiro del aviso de carrito en el catálogo

Se elimina del catálogo la franja “Tu carrito de demostración” y sus estilos. El carrito sigue accesible desde el header y el acceso flotante móvil. El enlace del header ahora vuelve al catálogo sin apuntar al ancla que pertenecía a la franja; en la ruta de Productos continúa abriendo directamente el carrito de demostración.

**Archivos:** `apps/storefront/src/modules/dk/editorial/products-page.tsx`, `products-page.module.css`, `header-cart-popover.tsx`, `tests/e2e/productos.spec.ts` y este registro.

**Verificación:** 46 pruebas unitarias aprobadas, TypeScript del storefront y Prettier aprobados. La prueba E2E se intentó, pero el servidor local no pudo enlazar `127.0.0.1:8000` en este entorno (`listen EPERM`); la prueba se actualizó para usar el carrito del header y queda pendiente ejecutarla en el equipo local.

## 2026-10-19 — Icono de carrito en las fichas de producto

Se reemplaza el signo “+” de “Agregar al carrito” por el icono ShoppingCart usado también en el header. Se conserva el nombre accesible del botón y se ajustan los estados hover, deshabilitado, tema oscuro y tamaño móvil.

**Archivos:** `apps/storefront/src/modules/dk/editorial/products-page.tsx`, `products-page.module.css` y este registro.

**Verificación:** 46 pruebas automatizadas, TypeScript del storefront y formato Prettier aprobados. Se conserva la limitación E2E local descrita en la entrada anterior (`listen EPERM` en `127.0.0.1:8000`).

## 2026-10-19 — Selector de cantidad en todas las fichas

Cada producto ahora permite elegir entre 1 y 20 unidades con controles accesibles de disminuir/aumentar antes de agregarlo. La cantidad seleccionada se incorpora al carrito en una sola acción; las variantes de shampoo y sales continúan siendo obligatorias. Se mantiene el límite de seguridad del carrito y el estado visual se adapta al tema oscuro.

**Archivos:** `apps/storefront/src/modules/dk/editorial/products-page.tsx`, `products-page.module.css`, `apps/storefront/src/lib/util/demo-cart.ts`, `tests/demo-cart.test.mjs`, `tests/e2e/productos.spec.ts` y este registro.

**Verificación:** 47 pruebas automatizadas, TypeScript del storefront y formato Prettier aprobados. Se amplió la prueba E2E para verificar la cantidad elegida en la ficha y el carrito; su ejecución en navegador continúa condicionada por el bloqueo del servidor local (`listen EPERM` en `127.0.0.1:8000`) documentado anteriormente.

## 2026-10-19 — Confirmación visual al agregar productos

Al agregar un producto, el botón reproduce un rebote breve del carrito y aparece una notificación flotante con el texto “Producto agregado”, el nombre y la cantidad seleccionada, un carrito con indicadores de contenido y una marca de confirmación. La notificación se cierra automáticamente, reemplaza el aviso anterior si se agregan varios productos y tiene tratamiento para móvil, tema oscuro y movimiento reducido. El mensaje accesible existente conserva el anuncio para lectores de pantalla.

**Archivos:** `apps/storefront/src/modules/dk/editorial/products-page.tsx`, `products-page.module.css`, `tests/e2e/productos.spec.ts` y este registro.

**Verificación:** 47 pruebas automatizadas, TypeScript del storefront y formato Prettier aprobados. La prueba E2E se actualizó para comprobar el aviso, pero no se repitió aquí porque el entorno ya bloquea el inicio del servidor local (`listen EPERM` en `127.0.0.1:8000`), según las ejecuciones anteriores.

## 2026-10-19 — Foto del producto en la confirmación visual

La notificación “Producto agregado” reemplaza el icono de carrito por una miniatura de la misma fotografía utilizada en la ficha del artículo. Si una ficha aún no tiene foto asociada, se reutiliza su arte tipográfico local. Se mantiene la marca de confirmación, el nombre, la cantidad y el anuncio accesible.

**Archivos:** `apps/storefront/src/modules/dk/editorial/products-page.tsx`, `products-page.module.css`, `tests/e2e/productos.spec.ts` y este registro.

**Verificación:** 47 pruebas automatizadas, TypeScript del storefront y formato Prettier aprobados. La prueba E2E comprueba que la miniatura reutiliza la foto original del shampoo, aunque su ejecución de navegador sigue condicionada por el bloqueo del servidor local (`listen EPERM` en `127.0.0.1:8000`) documentado anteriormente.

## 2026-10-19 — Inicio más claro para comprar por categoría

Se rediseña el primer bloque del catálogo con una jerarquía orientada a tienda: identidad “Tienda”, titular de compra y un selector único “Compra por categoría”. Las tres opciones muestran el número real de productos de la colección o línea, reflejan la selección activa y filtran el catálogo al pulsar; la página desplaza suavemente al listado. Se elimina la repetición de filtros debajo del aviso de simulación y se conserva la búsqueda junto al listado.

**Archivos:** `apps/storefront/src/modules/dk/editorial/products-page.tsx`, `products-page.module.css`, `tests/products-catalog.test.mjs`, `tests/e2e/productos.spec.ts` y este registro.

**Verificación:** 47 pruebas automatizadas, TypeScript del storefront, Prettier y build de producción aprobados; `/productos` se genera correctamente. El build muestra advertencias de lint preexistentes en módulos del starter, sin errores. La verificación E2E visual sigue pendiente por el bloqueo del servidor local en `127.0.0.1:8000` documentado anteriormente.

## 2026-10-19 — Refinamiento editorial del filtro de Productos

Se reemplaza el panel con tarjetas e iconos por una navegación de categorías más ligera y ordenada: selector horizontal de tres columnas en escritorio, separadores finos, conteos discretos y una línea inferior para marcar la categoría activa; en móvil se convierte en una lista sencilla con indicador lateral. Se centra el encabezado del catálogo para dar protagonismo a la colección y se conserva el filtrado, el scroll hacia los productos, la búsqueda y el soporte de tema oscuro. Se actualiza también el texto de la prueba E2E para coincidir con el aviso real de simulación.

**Archivos:** `apps/storefront/src/modules/dk/editorial/products-page.tsx`, `products-page.module.css`, `tests/products-catalog.test.mjs`, `tests/e2e/productos.spec.ts` y este registro.

**Verificación:** 47 pruebas automatizadas, TypeScript del storefront, Prettier y build de producción aprobados; `/productos` se prerenderiza correctamente. El build mantiene advertencias de lint preexistentes en módulos del starter, sin errores. La prueba E2E está actualizada, pero la revisión en navegador continúa pendiente por el bloqueo al iniciar el servidor local en `127.0.0.1:8000` documentado anteriormente.
