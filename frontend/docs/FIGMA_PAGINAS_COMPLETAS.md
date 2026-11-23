# Exportación de páginas completas a Figma

Esta exportación crea **un SVG de página completa por ruta y tamaño de pantalla**, de arriba abajo. Los SVG principales se guardan en `~/Desktop/figmaadk/01_PAGINAS_DESKTOP`, `02_PAGINAS_TABLET` y `03_PAGINAS_MOBILE`. Por ejemplo, `01_PAGINAS_DESKTOP/Home.svg`, `Productos.svg` y `Donaciones.svg`. También genera variantes de modo oscuro, el menú móvil abierto, estados del carrito de demostración, PNG de referencia y un ZIP.

Desde la raíz del proyecto, en Terminal normal de macOS:

```sh
zsh ./EXPORTAR_PAGINAS_FIGMA.command
```

El lanzador utiliza el storefront que ya está activo en `http://127.0.0.1:8000`; no inicia ni detiene otro servidor. Verifica que carguen los estilos antes de capturar. Lee la web; la interacción del carrito es local y demostrativa. No contacta pasarelas de pago ni envía formularios. Puedes especificar otra URL con `--base-url`.

Para consultar el inventario antes de exportar:

```sh
node scripts/export-figma-pages.mjs --preflight
```

El exportador conserva texto, formas e iconos vectoriales por separado y embebe las fotografías originales dentro de cada SVG. No inserta una captura de toda la página como imagen. La reconstrucción depende del render del navegador y puede diferir en fondos CSS complejos, pseudoelementos, sombras y mapas; los PNG del navegador y del SVG, además de `08_DOCUMENTACION/REPORTE_CALIDAD_VISUAL.json`, permiten revisar las diferencias. La importación y editabilidad final en Figma requieren una prueba dentro de Figma. Los archivos no son prototipos interactivos.

Las rutas dinámicas del starter Medusa que requieren backend no se marcan como exportadas por este proceso. El inventario de enlaces observados queda en `05_NAVEGACION/`.
