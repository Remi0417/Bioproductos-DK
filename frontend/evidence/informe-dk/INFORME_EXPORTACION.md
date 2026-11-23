# Control de entrega — versión técnica Informe DK

## Documento vigente

- `informeparaprogra.docx`: documento Word editable, 6.36 MB.
- Contenido extraído: aproximadamente 4,226 palabras; 20 tablas y 4 recursos gráficos en el paquete DOCX.
- Incluye guía de inicio, estructura real del repositorio, stack, mapa de rutas, guía de lectura del Figma, tokens, catálogo de componentes, contratos de datos, estado de integraciones, responsive, accesibilidad, plan de implementación, pruebas, riesgos y anexos de handoff.
- Portada: los cuatro integrantes indicados por el usuario; carrera, sección y docente siguen como campos editables.

## Validación

- El DOCX es un ZIP íntegro y todos sus XML y relaciones parsean correctamente.
- `textutil` puede extraer el texto y la búsqueda confirma que la versión técnica se concentra en transferencia para desarrollo y diseño.
- No se generó PDF ni se revisó renderizado página por página: en este entorno no hay Word, Pages ni LibreOffice. La paginación debe revisarse en Word/Google Docs.
- Figma: se verificó un solo frame Home Desktop (1440 × 6337 px). No se presentan como existentes frames de las páginas internas o de mobile/tablet.
- El entorno de sesión no tiene permisos de escritura al Escritorio. Ejecuta `copiar-al-escritorio.sh` para copiar el documento a `~/Desktop/informeparaprogra.docx` y los recursos a `~/Desktop/Informe DK - Evidencias/`.

## Fuentes y límites que debe conservar la implementación

- Código y pruebas del monorepo son la fuente del estado funcional.
- Los contratos de comercio real, datos finales de catálogo, pagos, despacho, DTE, políticas y aceptación empresarial permanecen pendientes.
- No activar operación real ni relajar guardas de entorno para completar tareas de demo.
