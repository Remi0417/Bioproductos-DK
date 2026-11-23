# Arquitectura objetivo (provisional)

## Decisión inicial
Preferir monorepo **Medusa 2 + Next.js Starter Storefront + PostgreSQL** antes que rehacer un motor de ecommerce en un proyecto estudiantil. Medusa aporta comercio e inventario, Next.js experiencia visual premium. Extender Medusa Admin solo donde DK requiera UX nueva, sin duplicar funciones nativas.

## Componentes
1. `apps/storefront`: páginas públicas, tienda, SEO, contenido, diseños responsive, llamadas API seguras. Diseño original de DK.
2. `apps/backend`: servidor Medusa, catálogo, inventario, pagos, pedidos, admin y extensiones, eventos.
3. `packages/` (si necesario): UI compartida, configuraciones tipadas, validaciones reutilizables.
4. PostgreSQL como persistencia transaccional. Usar adaptadores reales, migraciones y seeds idempotentes.
5. Redis si el starter/configuración seleccionados lo necesitan para colas/cache/eventos. Evaluar antes de instalar.
6. Almacenamiento de imágenes separado y configurado sin subir secretos.

## Integraciones
- Webpay Plus: payment provider con SDK oficial, `Environment.Integration`, flujo crear/confirmar/reembolsar según capacidades y webhook/retorno fiable; jamás confiar solo en query de redirección.
- Mercado Pago: payment provider oficial y entornos de prueba, webhooks con validación e idempotencia.
- Blue Express: fulfillment provider; no asumir API pública abierta. Pedir contrato, documentación, ambiente de prueba y credenciales. Hasta entonces, gestión manual **real** de envíos + exportaciones funcionales, marcado modo prueba para integración.
- DTE: módulo `tax-document-service`; integrar sistema autorizado o certificación SII con permisos. NO generar PDF llamado factura/boleta válida. Sin autorización, crear borradores internos sin validez tributaria, bien identificados.
- Email transaccional: proveedor SMTP/servicio con credenciales de desarrollo; preview local opcional, test con correo de prueba y envío fiable una vez configurado.

## Reglas de dominio
- Moneda CLP en unidades enteras, no `float` monetario.
- Precios B2C públicos y B2B privados; no exponer listas negociadas.
- Pedido creado con servidor autoritativo, validaciones de inventario y estados definidos.
- Evitar pagos duplicados, callback duplicado, doble descuento de stock y órdenes huérfanas (idempotencia y transacciones).
- Checkout invitado posible; clientes registrados opcionales según UX y consentimiento.
- Minimización de RUT en operaciones que no lo requieran.
- Separar modelos científicos/editoriales del catálogo transaccional.

## Seguridad y calidad
- Validación Zod/schemas server-side, sanear input, aplicar limitaciones de tasa en puntos vulnerables, CSRF según autenticación, cookies seguras, CORS restrictivo, RBAC.
- Roles Admin/Editor/Operaciones y principios de menor privilegio.
- Migraciones y cambios de esquema reproducibles.
- Tests de servicio, integraciones sandbox, Playwright E2E para flujos críticos; auditoría de dependencias y secreto.
- No se promete sistema certificado o listo para producción solo porque compile.

## Orden de decisión técnica
Inspeccionar máquina -> revisar docs Medusa actuales -> scaffold oficial -> validar admin y storefront funcionales -> construir estilo/funciones -> proveedores sandbox -> tests -> demo. No mezclar múltiples motores de comercio.
