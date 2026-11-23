# Ensayo siguiente: PostgreSQL y comercio nativo

Estado: **pendiente de ejecución**. Este protocolo no es evidencia de pruebas aprobadas.

## Preparación

1. Instalar y arrancar PostgreSQL >=15 compatible con este Mac; seguir `DIAGNOSTICO_MAC.md`.
2. Confirmar que la conexión es loopback, el rol es `dk_demo` sin privilegios de superusuario y la base se llama `bioproductos_dk_demo`. No usar bases ajenas.
3. Completar `DATABASE_URL` solo en `apps/backend/.env`, manteniendo los secretos generados por `npm run setup:env`.
4. Desde la raíz, ejecutar `npm run db:migrate`. El seed europeo fue reemplazado por un aviso sin cambios comerciales.

## Seed y persistencia

```sh
npm run db:seed
npm run dev:backend
```

Crear un administrador DEMO con el comando nativo indicado en README y revisar `http://localhost:9000/app`.

Antes de marcar esta etapa como aprobada, comprobar en Admin y PostgreSQL:

- Una tienda DEMO, una región Chile/CLP, un canal DK DEMO y una bodega ficticia.
- Ocho productos con SKU `DEMO-...`, inventario gestionado y backorder deshabilitado.
- Precios CLP enteros iguales al fixture y sin datos reales.
- Una clave pública titulada `DK DEMO Storefront` vinculada al canal.
- No hay pagos ni envíos habilitados; ninguna orden se crea automáticamente.

Ejecutar `npm run db:seed` por segunda vez, secuencialmente. Comparar IDs, conteos y stock: no debe duplicar recursos. Cambiar una cantidad en Admin, recargar y reiniciar backend; debe conservarse. Volver a ejecutar seed y verificar que no restaure el stock ni los precios editados. Probar también una interrupción controlada en una base desechable propia y registrar recuperación. No ejecutar seeds concurrentes.

## Storefront conectado

Copiar la clave **publishable** (no un token de Admin) desde Settings del Admin a `apps/storefront/.env.local`. Establecer `DK_DEMO_PREVIEW=false` y mantener backend/base URL locales. Reiniciar Next.

Las rutas del starter `/cl/store`, `/cl/products/...`, `/cl/cart` y `/cl/account` requieren validación y adaptación completa a Chile antes de declararse terminadas. La home de diseño sigue disponible en `/demo`; sus cards son datos estáticos señalizados, no prueba de conexión comercial.

Pruebas siguientes: catálogo contra API, persistencia de carrito, cantidades inválidas, concurrencia de inventario, permisos del Admin, CLP final, cálculo server-side y errores. Los proveedores de pago siguen pendientes; no finalizar una compra mediante el proveedor manual para presentarla como pago sandbox verificado.

Registrar fecha, comandos, resultados, capturas y fallas en ROADMAP. No marcar F3 ni Admin como completados solo por iniciar sesión o ver el catálogo.
