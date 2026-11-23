# Paleta natural — BioProductos DK

2026-10-18 · Propuesta cromática para el Home y componentes editoriales globales. No es un manual oficial de marca ni una extracción exacta de los colores de producción.

## Referencia y alcance de la revisión

El usuario solicitó analizar `https://bioproductosdk.com/` y llevar al proyecto colores cómodos, llamativos y vinculados con naturaleza y vida.

- La apertura directa del [Inicio original](https://bioproductosdk.com/) devolvió timeout; el buscador permitió consultar su contenido textual indexado.
- [Bio Impacto](https://bioproductosdk.com/bio-impacto/) respondió en modo texto y permite reconocer la circularidad como parte del relato de la marca.
- El intento de leer exclusivamente HTML/CSS desde Terminal falló por resolución DNS. No se descargaron imágenes ni videos y no se accedió a Shopify o cuentas privadas.
- Las herramientas disponibles no permitieron obtener el CSS original ni medir su presentación en navegador. Por tanto, **los códigos de esta paleta son decisiones de diseño propuestas, no códigos oficiales identificados en la web**.
- La dirección verde conserva el contexto maestro, la entrevista y la referencia de marca presente en las fotos originales ya aportadas. No se afirma haber medido colores oficiales a partir de fotografías, que además dependen de iluminación y cámara.

El análisis de la implementación anterior sí es comprobable: existían más de cien variantes hexadecimales, con muchos verdes/grises próximos entre sí y colores repetidos fuera de las variables centrales. La intervención concentra identidad, superficies y estados en un sistema consistente, con más diferencia de temperatura y luminosidad entre secciones.

## Paleta principal

| Uso                                 | Token CSS        | Color     |
| ----------------------------------- | ---------------- | --------- |
| Identidad bosque y botones          | `--dk2-forest`   | `#1B563C` |
| Verde hoja, énfasis y hover         | `--dk2-leaf`     | `#2F7146` |
| Texto principal                     | `--dk2-ink`      | `#18372A` |
| Fondo marfil cálido                 | `--dk2-paper`    | `#FBF8F0` |
| Texto secundario                    | `--dk2-muted`    | `#4C614D` |
| Superficie salvia                   | `--dk2-sage`     | `#E3EED2` |
| Acento de brotes sobre verde oscuro | `--dk2-lime`     | `#D6E9A3` |
| Verde luminoso de la cinta          | `--dk2-ribbon`   | `#CBE39C` |
| Pradera clara de productos          | `--dk2-meadow`   | `#F0F5E8` |
| Circularidad y brotes               | `--dk2-sprout`   | `#DDEABF` |
| Cuaderno científico                 | `--dk2-notebook` | `#EAF2D9` |
| Miel suave                          | `--dk2-honey`    | `#F3E6C8` |
| Arena cálida                        | `--dk2-sand`     | `#F4E6D5` |
| Tierra para acentos sobre arena     | `--dk2-earth`    | `#6B492E` |
| Foco visible sobre fondos claros    | `--dk2-focus`    | `#98531F` |
| Verde del hero/overlays             | `--dk2-hero`     | `#123E2C` |
| Verde de Bio Investigación          | `--dk2-research` | `#164D37` |
| Verde de footer                     | `--dk2-footer`   | `#103C2A` |

El resto de los 28 tonos sirve para líneas, texto sobre fondos oscuros, estados hover, sombras y superficies auxiliares. Las variantes RGB permiten mantener las transparencias de overlays, sombras y retículas sin dispersar colores nuevos por la hoja. Las letras de los tokens no constituyen nombres de productos ni submarcas.

## Aplicación por sección

- **Header:** marfil cálido, marca bosque/hoja, underline de acento vegetal y CTA verde. Se conservan tamaño, comportamiento sticky y menú.
- **Cinta:** verde luminoso con texto bosque; continúa el bucle y su pausa nativa. Se oscureció el separador decorativo para mejorar su lectura.
- **Hero:** overlay verde más botánico, texto claro y acento de brotes. Se mantienen los porcentajes y puntos del gradiente, así como el encuadre de la foto.
- **Pilares:** salvia, bosque, miel y brotes para cuatro materiales/ritmos distintos. La calidez del pilar Innovación evita repetir el mismo verde grisáceo.
- **Productos:** transición muy suave entre pradera, marfil y miel; chips cálidos discretos en champú y sales. Son decisiones editoriales, no paletas verificadas de submarcas.
- **Ciencia:** cuaderno entre verde vegetal claro y salvia, con texto oscuro y retícula suave; proceso activo en bosque.
- **Bio Investigación:** verde profundo con textos claros y acentos luminosos, sin introducir otra familia visual dominante.
- **Circularidad:** brotes y salvia, conservando la composición y el diagrama conceptual.
- **Nosotras:** papel cálido, anotación arena y un acento tierra que acompaña el retrato humano.
- **Footer:** bosque profundo, textos claros y enlaces brote, consistente con header e investigación.

No se aplicaron filtros de color ni saturación a fotografías. No se cambió contenido, rutas, estructura, tipografía, tamaños, espacios, proporciones ni animaciones. Los componentes existentes y las seis fotos permanecen. El CSS está aislado bajo `.dk2-*`; no se recolorearon el Admin o el comercio nativo fuera del layout editorial.

## Contraste y verificación

`evidence/nature-palette-contrast.json` registra 26 pares sólidos obtenidos desde las variables CSS. Todos superan 4,5:1; el mínimo del conjunto revisado es aproximadamente **5,10:1**. Incluye textos sobre marfil/salvia/miel/brotes, botones, cinta, cuaderno, investigación, chips y footer.

Se corrigió el color del separador de la cinta tras la primera revisión. La legibilidad no se fundamenta en que un color sea «natural»: se comprueba su combinación con el fondo.

**Límites:** estos cálculos no certifican accesibilidad completa, no verifican todos los puntos de un gradiente ni el contraste efectivo sobre una foto. La revisión en navegador, los overlays, estados de foco/hover, zoom y percepción en distintas pantallas siguen requiriendo comprobación. Los colores pueden verse distintos según pantalla e iluminación.

`evidence/nature-palette-scope.json` registra la comparación de 461 grupos de reglas con declaraciones ajenas al color conservadas y referencias CSS resueltas. `nature-palette-tokens.json` conserva los tonos y la sustitución de 163 usos anteriores de color. Los resultados de formato, lint, tipos, tests, build y cualquier bloqueo están en el último registro de ROADMAP y en `evidence/nature-palette-*`.

## Editar y revisar

Todos los tonos están al principio de `apps/storefront/src/app/(editorial)/editorial.css`, dentro de `.dk2-site`. Modificar el token y su variante RGB correspondiente cuando exista. No añadir valores hexadecimales aislados a las secciones; si se recibe un manual de marca, revisar esta propuesta y mapear los roles a los colores oficiales.

```sh
cd /Users/baytriip/Desktop/Proyectos-Codex/bioproductos-dk
npm run dev:storefront
```

Abrir `http://127.0.0.1:8000/`. Revisar el equilibrio de fondos, producto/imagen, texto secundario, CTA, foco y cinta en escritorio/tablet/móvil. Conservar la condición de propuesta sin venta real y esperar aprobación antes de otra etapa de contenido o páginas.
