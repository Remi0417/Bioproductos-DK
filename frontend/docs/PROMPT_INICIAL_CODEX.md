# PRIMER PROMPT PARA CODEX CLI — COPIAR Y PEGAR EN LA SESIÓN

Actúa como CTO y principal engineer de BioProductos DK. Este repositorio es un proyecto final competitivo: debemos entregar una tienda y sistema administrativo reales y excepcionales, con UX premium y base de datos persistente, para demostrar valor a las fundadoras. No tenemos permiso para tocar Shopify, dominios, tienda real, cobros reales o datos de clientes reales.

Primero lee completamente AGENTS.md, README.md y todos los archivos de docs/. Este repo puede contener solo la documentación inicial, o ya estar inicializado con Medusa y Next.js; inspecciona antes de decidir. Trabaja sobre lo existente, NO destruyas cambios.

Tu tarea en esta primera sesión es construir las fundaciones REALES de la plataforma, no intentar terminar todos los módulos de golpe:

1. Diagnostica entorno (OS, CPU, node/npm/pnpm, git, codex, PostgreSQL, puertos, espacio libre). Anota versiones verificadas; evita asumir instalaciones. Si necesitas privilegios, bases de datos, descargas extensas o decisiones irreversibles, informa qué comando se necesita y por qué; nunca borres recursos existentes.
2. Verifica documentación oficial actual de Medusa 2 y su Next.js Starter. Adopta la arquitectura monorepo oficial (apps/backend y apps/storefront); usa el starter original si está disponible. No implementes un segundo motor de ecommerce artesanal paralelo. No ejecutes instalaciones en producción.
3. Si el repo ya está scaffolded, levanta ambos servicios y corrige errores; si solo hay documentación, crea el scaffold oficial de modo que preserve docs/ y AGENTS.md (por ejemplo en carpeta temporal hermana y mueve los archivos comprobando antes), manteniendo historial y estructura. Si falta PostgreSQL, deja instrucciones precisas y detén solo los pasos que requieran base de datos; sí puedes continuar con preparación segura.
4. Crea/actualiza .gitignore y `.env.example` documentando variables requeridas, sin secretos. Nunca incluyas contraseñas en la respuesta o commits.
5. Define identidad visual provisional BioProductos DK en tokens, instala tipografías y componentes necesarios, y construye home con estructura y experiencia premium, hero, navegación responsive accesible, CTA productos/investigación, contenido de prueba marcado y footer; evita lorem ipsum y componentes solo decorativos. Usa imágenes solo con licencia o placeholders propios explícitos. Diseño de alto nivel adaptado a la empresa, no copiar de Apple.
6. Configura una región comercial CL y CLP si el servidor ya está disponible. Prepara un seed idempotente de ocho referencias DEMO según `docs/DATOS_Y_CONTENIDO.md`, con precios y stock ficticios etiquetados. No inventar claims científicos, sellos, patentes, logos o precios oficiales.
7. Agrega scripts reproducibles, lint/typecheck/build, un test básico de integración o smoke y README actualizado con instrucciones EXACTAS para arrancar backend, admin y storefront desde este Mac.
8. Ejecuta los comandos de prueba posibles. Identifica errores reales, corrígelos, y no declares éxito si no se pudo ejecutar.
9. Actualiza ROADMAP con los resultados y el siguiente paso exacto. Antes de terminar, entrega un informe en español: qué existe, qué funciona, qué falta, rutas locales, comandos probados, límites y pasos siguientes.

Criterios de calidad desde el primer commit: responsive excelente 360/390/768/1440, accesibilidad AA como objetivo, seguridad por defecto, semántica correcta, TypeScript estricto, módulos mantenibles, SEO básico y UX impecable. No pedir aprobación para decisiones reversibles rutinarias; documentar supuestos. Si fallan instalaciones, diagnosticar y proponer un remedio concreto.
