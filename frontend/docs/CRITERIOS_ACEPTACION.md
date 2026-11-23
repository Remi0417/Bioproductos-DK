# Criterios de aceptación y QA

No marcar funciones “completas” por tener una UI terminada. Requieren trazabilidad y prueba real.

## Escenarios esenciales
1. **Catálogo**: producto guardado en backend aparece en listado, detalle y filtros. Modificarlo en admin se refleja sin modificar código.
2. **Inventario**: se guarda un ajuste autorizado y aparece después de recargar. Prevenir checkout mayor a disponibilidad; no aceptar cantidades negativas.
3. **Carrito**: añadir dos referencias, modificar cantidades, eliminar, recargar y conservar estado de forma coherente. El total se calcula server-side.
4. **Compra de prueba**: validar comprador/dirección, seleccionar modalidad de envío y medio de pago sandbox, concluir transacción aceptada, persistir pedido, mostrar comprobante interno de orden.
5. **Pago rechazado**: se muestra rechazo claro y no marca el pedido pagado. Retry no duplica cobros ni órdenes.
6. **Pago duplicado**: dos webhooks o retornos no producen dos órdenes, dos cobros ni doble descuento de stock.
7. **Administración**: no autorizado no puede entrar, editor no puede gestionar roles, operaciones puede editar pedido según permisos.
8. **Reportes**: cada cifra del gráfico se reconcilia con los pedidos de prueba. Filtrar por mes, producto y tipo de cliente.
9. **Exportación**: archivo de envíos tiene campos autorizados y marca ausencias; fórmula CSV mitigada frente a entradas de usuario maliciosas.
10. **Contenido**: los títulos, alt y CTA funcionan en móvil; piezas de contenido científico se sustentan y pueden editarse según roles.
11. **Proveedores**: integración Blue Express/DTE solo se declara verificada si existe API/ambiente autorizado y una prueba E2E documentada. El modo manual y los borradores internos se identifican como tales.
12. **Calidad**: `lint`, `typecheck`, `build` y E2E pasan (comandos ajustados al monorepo); responsive y teclado comprobados.
13. **Seguridad**: sin secretos en repo o logs; cambios de stock/reembolso protegidos en servidor y auditables.
14. **Staging**: no hay credenciales de producción, usuarios reales ni puntos de venta no verificados.

## Evidencia final
Capturas de móvil y escritorio, registro de pruebas con fecha/resultado, vídeo o sesión guiada, datos demo, ADRs y decisiones pendientes.
