# BioProductos DK — Home con fotografías originales

Dirección vigente: **Ciencia que se vive**. Home fotográfico y editorial en `/`, con productos reales y retrato de las fundadoras. Usa solo los seis originales entregados por el usuario; los archivos se conservan y el navegador recibe variantes WebP optimizadas. El sitio sigue siendo una propuesta independiente sin venta real. Otras páginas mantienen rutas y avisos de preparación.

## Levantar y revisar

```sh
cd /Users/baytriip/Desktop/Proyectos-Codex/bioproductos-dk
npm run dev:storefront
```

Abrir **http://127.0.0.1:8000/**. Detener con Control-C. Las dependencias y `.env.local` ya existen en este Mac. Si necesitas reinstalar, usa `npm ci` y `npm run setup:env`; este último conserva los archivos existentes. Mantener `DK_DEMO_PREVIEW=true` para esta propuesta. No hace falta iniciar backend ni PostgreSQL para revisar Home y destinos editoriales. `/demo` conserva una propuesta antigua; no es el Home nuevo.

Comprobar productos y sus fotos, menú desktop/móvil, enlaces a las páginas independientes, el adelanto de Bio Investigación con la fotografía temporal del champú sólido a la derecha y su acceso con teclado, y el encuadre de las fundadoras. Esa foto se sustituirá por una original de investigación cuando esté disponible. El Home muestra un único adelanto científico; el componente de etapas y sus contenidos se conservan para reutilización futura, sin desarrollar aún la página de investigación. Revisar 320, 375, 390, 768, 1024, 1440 y 1920 px, zoom 200%, movimiento reducido y navegación sin mouse. En móvil el hero muestra la escena en su base para conservar fuerza visual.

## Verificaciones

En otra terminal, con el frontend levantado para el smoke:

```sh
npm run format:check
npm run lint
npm run typecheck
npm test
npm run build
npm run smoke
npm run test:e2e
```

Playwright usa Chrome instalado y puede levantar el servidor por sí mismo. Prueba siete anchos, carga de fotos locales, overflow, teclado, menú, axe, rutas y navegación sin JS. Los tests del Home no producen grabaciones ni capturas. No ejecutar build a la vez que dev: ambos usan `.next`; detener el dev antes de build y reiniciarlo después para smoke/E2E. Alternativa de revisión compilada:

```sh
npm run build --workspace=@dtc/storefront
npm run start --workspace=@dtc/storefront
```

Las restricciones del entorno del agente bloquean el puerto 8000 (`EPERM`); los resultados reales se documentan en [ROADMAP.md](ROADMAP.md). No confundir compilación aprobada con responsive/accesibilidad comprobados en navegador.

## Archivos de trabajo

- Composición: `apps/storefront/src/modules/dk/editorial/home.tsx`.
- Fotos/encuadres/alt: `apps/storefront/src/content/media.ts` y `HomePhoto` en `primitives.tsx`.
- Textos: `apps/storefront/src/content/home.ts`. Navegación: `site.ts`.
- Estilos: `apps/storefront/src/app/(editorial)/editorial.css`.
- Originales y derivados: `apps/storefront/public/images/home/` y `optimized/`.
- [Inventario y preparación](INVENTARIO_MEDIOS_HOME.md), [dirección de arte y fuentes](DECISIONES_HOME.md), [Contexto Maestro](MASTER_CONTEXT.md).

Los WebP ya están preparados; no debes ejecutar conversiones para levantar el Home. El inventario incluye instrucciones opcionales para regenerarlos. No continuar otra página sin aprobación.

---

# Guía anterior conservada como historial

# BioProductos DK — Home «Laboratorio vivo»

Propuesta independiente con Next.js y backend Medusa conservado. Home editorial en `/`, sin imágenes, videos, precios ni stock ficticios. Las páginas interiores tienen únicamente un aviso de preparación. No hay venta real.

La dirección actual incorpora composiciones abstractas de HTML/CSS: degradados suaves, tramas, órbitas, marcos, etiquetas y acentos por familia. La petición posterior del usuario sustituye la exigencia del V2 de dejar superficies visualmente vacías. Los diez destinos de imagen/video siguen sin archivos; sus composiciones están identificadas como abstractas.

## Ejecutar en este Mac

Desde Terminal normal:

```sh
cd /Users/baytriip/Desktop/Proyectos-Codex/bioproductos-dk
npm ci
npm run setup:env
npm run dev:storefront
```

Si las dependencias ya están instaladas, omitir `npm ci`. `setup:env` conserva los archivos existentes; para revisar sin backend, mantener `DK_DEMO_PREVIEW=true` en `apps/storefront/.env.local`. No compartir sus valores. El Home no necesita PostgreSQL.

Abrir **http://127.0.0.1:8000/**. Detener con Control-C. No usar `/demo` para evaluar el nuevo Home: esa ruta conserva la primera propuesta, con SVG y datos sintéticos, como antecedente.

## Revisar

```sh
npm run verify
npm run smoke
npm run test:e2e
```

`verify`: formato, lint, tipos, tests y build del monorepo. `smoke` requiere el frontend levantado. Playwright usa el Chrome instalado, reutiliza el servidor local si existe y prueba siete anchos de 320 a 1920 px, navegación, teclado, menú, proceso, axe y modo sin JavaScript. Los tests del Home no generan capturas ni grabaciones. No declarar accesibilidad/responsive aprobados si no pasan.

Para compilar y revisar solo el frontend en modo producción:

```sh
npm run build --workspace=@dtc/storefront
npm run start --workspace=@dtc/storefront
```

Usa el mismo puerto 8000: detener antes cualquier proceso `dev:storefront`. Los permisos del agente impiden escuchar puertos (`EPERM`); los resultados actuales y sus límites están en [ROADMAP](docs/ROADMAP.md).

## Editar textos y medios

- Textos: `apps/storefront/src/content/home.ts` (`homeContent`).
- Navegación y estados de preparación: `apps/storefront/src/content/site.ts`.
- Registro de diez reservas y sus composiciones CSS: `apps/storefront/src/content/media.ts`.
- Tokens y estilos: `apps/storefront/src/app/(editorial)/editorial.css`.
- [Decisiones y fuentes](docs/DECISIONES_HOME.md), [inventario de medios futuros](docs/diseno/INVENTARIO_MEDIOS_HOME.md).

No se cargan medios automáticamente: incorporar archivos requerirá una instrucción posterior y la autorización del material original. No avanzar a Bio Investigación sin el siguiente prompt/aprobación.

La documentación completa de la primera etapa y sus instrucciones de backend se conserva sin eliminar en [docs/README.md](docs/README.md). Sus referencias a `/demo` y pruebas anteriores son históricas; para el Home actual usar esta guía.
