# Entregables del Informe DK

## Versión vigente

- `informeparaprogra.docx`: guía técnica editable para que el equipo de Informática continúe la implementación y use el Figma como referencia. Incluye mapa del repositorio, stack, rutas, componentes, estados, contratos por definir, prioridades, criterios de aceptación, pruebas y orientación de handoff.
- `build-informe-tecnico.cjs`: generador reproducible del documento.
- `copiar-al-escritorio.sh`: copia el DOCX y la carpeta de evidencias a `~/Desktop/`.
- `capturas/`: captura del único frame Home disponible en Figma y recortes.
- `figuras/`: diagramas SVG/PNG de arquitectura, navegación, flujos y roadmap.
- `REGISTRO_DE_FUENTES.csv`: fuentes revisadas y límites de evidencia.
- `PENDIENTES_DE_EVIDENCIA.md`: pendientes identificados en la auditoría previa.
- `INFORME_EXPORTACION.md`: validación y límites de entrega.
- `build-informe-dk.cjs`: generador de la versión de informe anterior; se conserva como antecedente y no produce la versión técnica vigente.

El informe vigente se concentra en diseño implementado y transferencia para programación. Se concentra en la guía de implementación, diseño y continuidad del software. La compra descrita sigue siendo una demostración local: el documento separa ese estado de cualquier futuro checkout real.

No se generó PDF porque el entorno carece de un renderizador DOCX compatible. El DOCX se validó como paquete XML y su texto se pudo extraer, pero requiere revisión visual de paginación al abrirlo en Word o Google Docs.
