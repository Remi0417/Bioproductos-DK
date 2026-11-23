# Decisiones técnicas de la primera sesión — 2026-10-17

## Procedencia y estructura

Se incorporó **Medusa DTC Starter oficial**, commit `f677db438f27294fc50e4c7c6612e71ff38eeff5`; procedencia en `evidence/upstream.json`. El starter anterior `nextjs-starter-medusa` está archivado. `create-medusa-app` 2.21.2 fue descargado e inspeccionado para comprobar sus opciones. No se ejecutó su creación de base ni su asistente de usuarios.

La descarga vía `git clone` directo falló por DNS. `npm install --prefix .downloads git+https://github.com/medusajs/dtc-starter.git --ignore-scripts --omit=dev` sí obtuvo el repositorio; después se copiaron `apps/`, `LICENSE` y configuraciones comprobando que no existieran destinos. Se conservaron el AGENTS local, el prompt y todos los documentos. Las carpetas de descarga y herramientas son temporales e ignoradas por Git.

Se eligió **npm workspaces**, opción soportada por el CLI (`--use-npm`), para usar npm 11.13.0 ya instalado y evitar instalaciones globales. Solo `package-lock.json` gobierna las dependencias del proyecto. Se trasladaron los overrides de tipos React del pnpm original a los overrides npm. Medusa conserva su motor de catálogo, inventario, carrito y órdenes; no se creó otro motor.

- Backend: `apps/backend`, Medusa 2.21.2, Admin nativo, TypeScript estricto.
- Storefront: `apps/storefront`, Next 15.5.24, React 19.0.5, Tailwind 3 del starter.
- Persistencia requerida: PostgreSQL >=15. No existe una conexión verificada.
- Redis: no se instala en F1. Las implementaciones en memoria que Medusa anuncia son exclusivamente para desarrollo de un proceso, no un diseño de producción ni evidencia de stock persistente.
- Contenido de prueba compartido: `data/demo-catalog.json`; el frontend lo presenta como referencias estáticas y el seed lo lee para Medusa.

La instalación final usa **hoisting estándar de npm**, React 18.3.1 para Medusa y un override acotado a `next` que exige React/ReactDOM 19.0.5, versión soportada por Next 15. Esto obliga a ubicar Next junto al React 19 del storefront sin duplicar todos los paquetes del backend. Se comprobó primero la resolución en una copia temporal de los manifests: Next quedó en `apps/storefront/node_modules/next`, React 18 en raíz y React 19 en storefront. El lockfile fue generado por npm, no editado manualmente. El wrapper resuelve el CLI desde el backend. No se ocultaron errores de build ni de TypeScript.

El problema observado era un error real de prerender al resolver Next con React 18 mientras el storefront generaba elementos React 19. Una prueba de instalación totalmente anidada separó React, pero expuso imports de Medusa que dependen de compartir sus paquetes base y aumentó demasiado el árbol. Se descartó esa estrategia. Las instalaciones anteriores se retiraron después de aprobar la verificación final; nunca formaron parte del proyecto versionado. La prueba de resolución React protege contra repetir el conflicto en cambios futuros.

La revisión reveló dependencias que se resolvían implícitamente: `tsconfig-paths` para la CLI, el peer `ioredis` del framework y `@typescript-eslint/typescript-estree` del plugin Medusa. Se declaran explícitamente en sus consumidores. ESLint de storefront usa configuración flat con los plugins oficiales Next, TypeScript y Hooks, evitando el parche CommonJS de `eslint-config-next`. Los tipos React 19.0.5 se declaran también explícitamente en backend para que `npm ci` coincida con los overrides del starter.

Next 15 intenta reparar el lockfile asumiendo un layout hoisted de sus opcionales SWC. Los scripts fijan `NEXT_IGNORE_INCORRECT_LOCKFILE=1` para evitar esa mutación y sus descargas durante build; el paquete SWC de Intel se instala por npm y la compilación real debe pasar. Esta opción no omite lint ni tipos. El lockfile sigue validándose con `npm ci --dry-run`.

La auditoría del ensayo de instalación anidada reportó **135 vulnerabilidades (82 moderadas, 53 altas)**. El reporte recibido se conserva en `evidence/dependency-advisories.txt`; esos conteos no se deben trasladar al árbol final, que contiene menos copias. Los avisos requieren reconciliar el audit y revisar remediación en F7. No se aplicó `npm audit fix --force`. Esta deuda bloquea considerar el sistema listo para staging o producción.

La auditoría final del árbol declarado (`npm install --package-lock-only --ignore-scripts --audit`) consultó 1825 paquetes y reportó **129 vulnerabilidades: 71 moderadas y 58 altas**. Conteos y comando en `evidence/audit-summary.json`, avisos recibidos en `evidence/dependency-advisories-final.txt`. No se declara resuelta esta deuda. El build exitoso no reduce ni certifica el riesgo de dependencias.

## Frontera de seguridad

El backend exige `DK_DEMO_MODE=true`, base `bioproductos_dk_demo` en loopback, rol `dk_demo`, contraseña propia, sin parámetros que puedan redirigir el host, secretos aleatorios y CORS local explícito. La compilación, que no conecta a PostgreSQL, puede omitir únicamente la validación de conexión; arranque, migraciones, usuarios y seed mantienen el control completo.

`npm run setup:env` genera secretos de 48 bytes por variable, archivos con permisos 0600 y creación exclusiva. Si ya existen, no los toca. Los secretos no aparecen en las salidas ni en los ejemplos. El wrapper Medusa usa `.local/config` para evitar escribir en la configuración global del usuario. La telemetría de Medusa y Next queda desactivada.

La vista `/demo` se habilita con `DK_DEMO_PREVIEW=true`, sin autenticación ni datos privados: no tiene funciones comerciales. El middleware devuelve 503 para rutas comerciales y el retorno de pagos devuelve siempre 503. Las URLs de backend y frontend deben ser locales. El SDK no registra peticiones; se retiraron logs con cabeceras, payloads y objetos de error de las rutas del starter.

Se agregan cabeceras contra framing y detección de MIME, política de referencia, permisos restringidos y noindex. La CSP admite inline/eval requeridos por esta configuración local de Next; no representa el endurecimiento final de producción. Cookies seguras, RBAC, MFA, rate limiting y auditoría del Admin todavía requieren implementar y probar su diseño definitivo. No se creó ninguna cuenta administrativa ni acceso alternativo.

## Datos y seed

Las migraciones ya no cargan el seed europeo de ropa ni un millón de unidades por producto. El seed genérico de 50 productos queda deshabilitado. `npm run db:seed` prepara Chile/CLP, canal DEMO, bodega ficticia, clave pública y ocho referencias DEMO con control de inventario y sin backorder. No se crean pedidos, usuarios reales, transportistas ni pagos.

El seed busca identificadores estables antes de crear registros, reconoce sus propios productos por metadata y solo crea niveles de inventario ausentes. No restaura cantidades ni sobrescribe precios editados en una segunda ejecución. **Su idempotencia real sigue pendiente de ejecutar dos veces y reconciliar PostgreSQL.** Ejecutarlo secuencialmente; concurrencia de seeds y recuperación de fallas requieren ensayo antes de declarar F3. No se declara stock persistente mientras no exista evidencia de base de datos.

## Diseño provisional

La home vive en `/demo` dentro del Next oficial. Propuesta editorial con blanco cálido, verde profundo, acentos arena, tipografía Manrope autoalojada y serif de sistema. Manrope conserva la licencia OFL en su paquete. Ilustraciones SVG creadas para esta propuesta: no son fotografías de productos, envases aprobados ni logos oficiales.

Incluye navegación responsive, salto al contenido, menú móvil con `details`, filtros por categoría y referencias desplegables, secciones de investigación y CTA con destino, alcance visible y preferencias de movimiento reducido. No publica afirmaciones científicas, patentes, certificaciones, alianzas, testimonios ni puntos de venta inventados. El catálogo transaccional original sigue pendiente de conexión y adaptación a Chile.

El diseño considera 360/390/768/1440 px; los tests Playwright cubren esos anchos, filtros, teclado, overflow y axe. Su existencia no equivale a que hayan pasado: revisar `docs/ROADMAP.md` para los resultados ejecutados.

## Límites del entorno del agente

- `git init`: EPERM al crear `.git`; no hay commit.
- `next dev`: EPERM al escuchar `127.0.0.1:8000`; no hay servidor probado desde esta sesión.
- Smoke HTTP: conexión local EPERM; no verifica servicios.
- Playwright: se detiene al arrancar el servidor, antes de los casos de prueba.
- El bundler Admin intentaba descubrir un puerto incluso al compilar. Se fijó `HMR_PORT=5173`, configuración que evita esa búsqueda innecesaria para el build; no concede permisos de escucha al servidor.

No se intentó eludir estas restricciones. Las verificaciones de navegador y base deben ejecutarse desde una terminal local con los permisos normales del usuario. No se solicitó ni obtuvo autorización de producción.
