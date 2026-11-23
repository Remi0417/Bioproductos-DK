# Inventario vigente — Home con fotografías originales

**2026-10-18 · Instrucción posterior del usuario:** utilizar exclusivamente los archivos que aportó a `apps/storefront/public/images/home/`. Esta autorización sustituye para el Home la prohibición anterior de incorporar fotografías. No autoriza stock, descargas, imágenes generadas ni videos. Los inventarios previos se conservan al final como historia.

Se inspeccionaron visualmente **los seis originales**. Cuatro tienen extensión `.JPG` pero contenido HEIC/HEVC: fue necesario decodificarlos antes de revisarlos. Los nombres con ñ tienen normalización Unicode NFD en el disco; se muestran aquí de forma legible. Las rutas públicas del diseño usan nombres ASCII de derivados WebP para evitar problemas de compatibilidad.

Base absoluta: `/Users/baytriip/Desktop/Proyectos-Codex/bioproductos-dk/apps/storefront/public/images/home/`.

| Original / ruta relativa desde la base | Clasificación visual comprobada | Decisión de arte / sección | Registro y derivados |
| --- | --- | --- | --- |
| `foto principal.JPG` | Marca/corporativo + productos. Mesa con detergentes, envases de cosmética sólida, bolsas, flores y madera; formato panorámico | **Hero S03**. Escena completa con capas y gradiente de lectura. En móvil la foto ocupa la base del lienzo para conservar protagonismo sin quedar tapada por el texto | `home-hero` → `optimized/coleccion-{640,1280,2240}.webp` |
| `detergente modelo.JPG` | Producto. Botella individual con flores violetas sobre fondo claro; etiqueta aroma cítrico. Original HEIC | **Productos S05 / detergentes**. Retrato vertical, encuadre que conserva botella y etiqueta | `home-products-detergent` → `optimized/detergente-{480,960,1600}.webp` |
| `jabon modelo.JPG` | Producto. Cosmética sólida con envase metálico; la etiqueta visible dice «SHAMPOO SÓLIDO / Cabello Graso». Original HEIC | **Productos S05 / champús**. Su contenido visible confirma que no es una foto de jabón genérico; se mantiene nombre original, se presenta como familia de champús sin inventar SKU | `home-products-shampoo` → `optimized/champu-{480,960,1600}.webp` |
| `sales de bañoo.JPG` | Producto. Tres bolsas kraft de sales y detalle de sales/pétalos. Original HEIC | **Productos S05 / sales de baño**. Presentación cálida, marco propio y espacio suficiente para los tres envases | `home-products-bath` → `optimized/sales-{480,960,1600}.webp` |
| `detergente.JPG` | Productos + contexto de presentación. Filas de botellas en una repisa. Original HEIC | **Empresas S08**. Foto de producto real para introducir relaciones comerciales. No se presenta como stock actualizado, instalación certificada ni evidencia de capacidad industrial | `home-business` → `optimized/botellas-{480,960,1600}.webp` |
| `Dueñas dk.JPG` | Fundadoras/equipo + marca. Dos mujeres con chaquetas verdes ante pendones DK, al aire libre | **Nosotras S10**. Recorte CSS centrado al 63% vertical para reducir cielo/suelo y dar presencia a las personas. No se asignan nombres, cargos ni biografías no validados | `home-founders` → `optimized/fundadoras-{480,960,1440}.webp` |

## Material ausente y decisiones de exclusión

- **Laboratorio/investigación:** no hay una foto dedicada de laboratorio en este conjunto.
- **Sostenibilidad/procesos:** no hay fotos de separación, tratamiento de residuos ni ensayos. Las flores y la madera de las fotos son ambientación; no se presentan como evidencia de impacto ambiental.
- **Instalaciones:** la repisa y el contexto exterior no permiten identificar instalaciones científicas; no se usan con esa atribución.
- **Otras:** ninguna fotografía adicional. `.DS_Store` es metadato del sistema y no un recurso visual.
- Se usan las seis fotos, cada una una sola vez, con roles distintos. Ninguna se descartó tras revisión: los problemas de formato tenían solución técnica. No se rellena ciencia con fotos comerciales repetidas. S06 usa un cuaderno editorial y etapas interactivas; S07 una composición tipográfica; S09 un diagrama de circularidad hecho con CSS, sin representar resultados medidos.

## Preparación y trazabilidad

Los seis originales están intactos; sus hashes iniciales se guardaron en `evidence/home-photos-originals.json`. `evidence/home-photos-assets.json` registra formato detectado, hash, dimensiones y peso de las **18 variantes WebP**. La conversión HEIC se hace localmente con `heic-convert@2.1.0` aislado en `.local/photo-tools`; Sharp existente genera los WebP. No hay dependencias nuevas en el frontend ni en el monorepo.

Los derivados corrigen orientación, conservan el contenido y no incluyen EXIF/GPS. No se retocaron personas, etiquetas, fondos ni colores para simular fotografías nuevas. Los recortes de presentación se definen con `object-fit`/`object-position` en CSS, sin alterar los originales.

`HomePhoto` emite `srcSet`, `sizes`, dimensiones, alt descriptivo y carga diferida salvo el hero (`eager`/prioridad alta). Se usa `<img>` nativo con excepción de lint localizada porque el starter desactiva globalmente la optimización de Next; así se sirven variantes preparadas sin cambiar la configuración del comercio. No se solicitan originales HEIC desde el Home. No hay videos ni recursos remotos.

Regeneración **opcional**; los WebP ya están listos:

```sh
npm install --prefix .local/photo-tools --no-audit --no-fund --package-lock=false heic-convert@2.1.0
node scripts/prepare-home-photos.mjs
npm test
```

La prueba de activos vuelve a decodificar los 18 WebP, comprueba tamaños anunciados, ausencia de EXIF/XMP y hashes originales. La revisión del encuadre en navegador sigue dependiendo de ejecutar las pruebas responsive en una terminal que permita abrir el puerto local; ver ROADMAP.

---

# Historial de reservas anteriores (sin vigencia para el uso de fotos autorizado)

# Inventario de medios futuros — Home V2

## Estado vigente — dirección «Laboratorio vivo»

La solicitud posterior del usuario permite que las reservas tengan presencia visual mediante HTML/CSS. Hoy las diez figuras tienen degradados, tramas, formas abstractas, marcos y captions; **ninguna tiene un archivo de imagen/video ni imita fotografías, envases reales o personas**. Los destinos `data-media-slot` siguen vacíos. Los párrafos y tabla V2 conservados abajo son antecedentes históricos de la versión con superficies planas.

| ID                        | Ubicación actual   | Tratamiento CSS                                       | Proporción visible principal                     |
| ------------------------- | ------------------ | ----------------------------------------------------- | ------------------------------------------------ |
| `home-hero-video`         | S03 hero           | Materia orgánica abstracta, órbitas y notas flotantes | 1:1 escritorio; 5:4 móvil                        |
| `home-products-detergent` | S05 familias       | Salvia, ondas y geometría                             | 10:11 escritorio; 4:5 tablet; 5:4 móvil estrecho |
| `home-products-shampoo`   | S05 familias       | Oliva suave y forma orgánica                          | 10:11 escritorio; 4:5 tablet; 5:4 móvil estrecho |
| `home-products-bath`      | S05 familias       | Piedra/marfil y órbitas                               | 10:11 escritorio; 4:5 tablet; 5:4 móvil estrecho |
| `home-science-process`    | S06 proceso        | Trama de exploración y materia abstracta              | 2:1 escritorio; 16:9 móvil                       |
| `home-research-lab`       | S07 investigación  | Verde técnico, retícula y pregunta editorial          | 5:4                                              |
| `home-business`           | S08 empresas       | Composición geométrica de conexiones                  | 16:9 escritorio; 2:1 móvil                       |
| `home-impact`             | S09 circularidad   | Anillos concéntricos y materiales                     | 5:4                                              |
| `home-founders`           | S10 personas       | Marco cálido abstracto, sin siluetas de personas      | 4:5                                              |
| `home-brands`             | S10 personas/marca | Marco superpuesto sobre salvia                        | 5:4                                              |

El ratio de `media.ts` es la reserva base y el CSS del contexto adapta el encuadre. Resoluciones orientativas y encargos de alt del inventario original continúan siendo referencias, no archivos existentes. Antes de preparar medios finales se validarán sus recortes para estas proporciones actuales.

Para aportar fotografías originales en otra etapa: mantener el ID de reserva; incorporar una fuente local autorizada en el registro y una rama de renderizado en `MediaSlot`; reemplazar `.dk2-art`, ajustar captions y quitar `aria-hidden` solo al medio significativo. Las tarjetas flotantes editoriales del hero pueden permanecer fuera de la fotografía. No superponer texto sobre una foto sin volver a verificar contraste. No se implementó esa rama ni se incorporaron medios en esta entrega.

---

## Inventario histórico de superficies V2

**Estado 2026-10-18: diez superficies completamente vacías. No se generaron, buscaron, descargaron, copiaron ni incorporaron imágenes o videos.** Los tamaños son recomendaciones de diseño, no requisitos de archivos ya disponibles.

Registro tipado: `apps/storefront/src/content/media.ts`. Componente: `src/modules/dk/editorial/primitives.tsx` → `MediaSlot`. Cada ID aparece también en el DOM como `id` y `data-media-slot`. El tipo `kind`, la proporción y el encargo de texto alternativo están centralizados. No hay `src`, posters ni importaciones de medios; los slots están ocultos a lectores de pantalla mientras estén vacíos. No se muestran etiquetas de fotografía pendiente ni controles de reproducción falsos.

| ID                        | Sección / finalidad                       | Proporción escritorio → móvil | Resolución orientativa                | Texto alternativo futuro                                                   |
| ------------------------- | ----------------------------------------- | ----------------------------- | ------------------------------------- | -------------------------------------------------------------------------- |
| `home-hero-video`         | S02, futuro video original del detergente | 4:5 → 5:4                     | 1600×2000; preparar recorte adaptable | Redactar tras ver el archivo; aportar subtítulos/transcripción según audio |
| `home-products-detergent` | S05, familia detergentes                  | 4:5 → 5:4 bajo 450 px         | 1200×1500                             | Describir productos y presentación que efectivamente aparecen              |
| `home-products-shampoo`   | S05, familia champús sólidos              | 4:5 → 5:4 bajo 450 px         | 1200×1500                             | Describir la fotografía original, sin beneficios no verificados            |
| `home-products-bath`      | S05, familia sales de baño                | 4:5 → 5:4 bajo 450 px         | 1200×1500                             | Describir únicamente las variedades visibles y confirmadas                 |
| `home-science-process`    | S06, contexto del proceso general         | 16:10                         | 1600×1000                             | Describir actividad visible sin revelar parámetros confidenciales          |
| `home-research-lab`       | S07, contexto de laboratorio              | 5:6 → 5:4                     | 1500×1800                             | Identificar espacio/actividad autorizados, sin atribuir certificaciones    |
| `home-brands`             | S08, líneas de productos                  | 16:10                         | 1600×1000                             | Nombres de líneas solo tras confirmación del material                      |
| `home-impact`             | S09, materiales orgánicos                 | 5:4                           | 1600×1280                             | Describir materiales que realmente se vean                                 |
| `home-founders`           | S10, retrato real del equipo              | 3:4                           | 1200×1600                             | Nombres y posición solo después de confirmación y consentimiento           |
| `home-business`           | S11, actividad comercial                  | 16:10                         | 1600×1000                             | Describir actividad real sin inventar socios o establecimientos            |

Los cambios de proporción están en CSS para adaptar la composición, sin cargar activos. Hero y laboratorio cambian de orientación en móvil; habrá que elegir recortes con el propietario al recibir sus originales. La resolución recomendada admite visualización en pantallas de alta densidad, pero los archivos deberán comprimirse antes de incorporarlos.

## Incorporación posterior (no realizada ahora)

1. Recibir los originales del usuario y confirmar autoría/autorización, personas visibles y contenido publicable.
2. Crear `apps/storefront/public/media/home/` cuando existan archivos autorizados. Usar el ID de cada slot como nombre base; no crear archivos de imagen vacíos ni descargar sustitutos.
3. Ampliar `MediaDefinition` con una fuente local opcional y texto alternativo final, conservando el ID y proporciones. La ruta propuesta sería `/media/home/<id>.<extensión-original>`; no hay archivos ni URLs activos hoy.
4. Añadir a `MediaSlot` la rama para medios aportados, conservando su envolvente y sus dimensiones. Para imágenes: recurso local optimizado con tamaños responsive y `alt` aprobado. Quitar `aria-hidden` cuando exista contenido significativo.
5. Para el video: reproducción mediante controles reales y accesibles, sin autoplay, con subtítulos/transcripción cuando corresponda; respetar movimiento reducido y ahorro de datos. No agregar un poster inventado.
6. Volver a verificar responsive, CLS, teclado y accesibilidad con el material real. La aceptación de los espacios vacíos no certifica esos archivos futuros.
