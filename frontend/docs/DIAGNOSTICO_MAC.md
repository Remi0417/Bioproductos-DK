# Diagnóstico local — 2026-10-17

Lectura completa del kit inicial realizada antes de editar. La carpeta contenía únicamente documentos y `.DS_Store`, sin repositorio Git ni aplicaciones.

| Recurso           | Resultado observado                                                                                                               |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Sistema           | macOS Ventura 13.7.8, compilación 22H730, x86_64                                                                                  |
| Equipo            | MacBookPro14,1; Intel Core i5 2,3 GHz; 2 núcleos; 8 GB RAM                                                                        |
| Disco             | 121 GiB disponibles al diagnóstico                                                                                                |
| Node              | 24.16.0, `/usr/local/bin/node`                                                                                                    |
| npm               | 11.13.0                                                                                                                           |
| Git               | 2.39.2 (Apple Git-143)                                                                                                            |
| Codex CLI         | 0.162.1; advertencia de permisos para crear alias de PATH                                                                         |
| pnpm / Yarn       | No estaban instalados en PATH                                                                                                     |
| PostgreSQL        | `psql`, `pg_isready`, `postgres`, `initdb` y `pg_ctl` ausentes en PATH; tampoco se encontró Postgres.app ni `/Library/PostgreSQL` |
| Docker / Homebrew | No encontrados en PATH; Docker.app no encontrado                                                                                  |
| Puertos           | 5432, 8000, 9000 y 5173 sin listeners al diagnóstico                                                                              |
| Red terminal      | `curl` a registry.npmjs.org y `git clone` a github.com fallaron por DNS                                                           |
| Red npm           | `npm install` pudo descargar create-medusa-app 2.21.2 y herramientas locales; no requiere instalación global                      |

`sysctl machdep.cpu.brand_string` fue denegado por el sandbox. La información disponible de CPU/RAM provino de `system_profiler SPHardwareDataType`, que también advirtió restricciones parciales de sysctl. No se inspeccionaron cuentas privadas, llaveros ni credenciales.

## Fuentes oficiales consultadas

- [Instalación Medusa](https://docs.medusajs.com/learn/installation).
- [create-medusa-app](https://docs.medusajs.com/resources/create-medusa-app).
- [DTC Starter oficial](https://github.com/medusajs/dtc-starter).
- [Starter anterior archivado](https://github.com/medusajs/nextjs-starter-medusa).
- [Requisitos de PostgreSQL del starter](https://github.com/medusajs/dtc-starter#local-installation): PostgreSQL 15 o posterior.

El starter actual declara Node >=22.22.0 y pnpm 10.11.1; el Node instalado cumple. Su backend declara Medusa 2.21.2 y el storefront Next 15.5.24. No se debe sustituir por un motor propio ni clonar el starter archivado.

## PostgreSQL pendiente

Este Mac no tiene un servidor verificado. No se instaló software del sistema ni se creó una base en un servidor ajeno. Usar PostgreSQL >=15 compatible con macOS 13 Intel, por ejemplo una distribución compatible de [Postgres.app](https://postgresapp.com/) y comprobar sus requisitos del sistema antes de descargar. No ejecutar instrucciones Homebrew como si Homebrew existiera.

La [página oficial de descargas](https://postgresapp.com/downloads.html) consultada ofrece un bundle de PostgreSQL 16 Universal, declara macOS 10.15 o posterior y aproximadamente 113 MB. Es una opción compatible con este Mac y con el requisito Medusa >=15: descargar ese bundle estable (evitar beta), mover Postgres.app a Aplicaciones, abrir y seleccionar “Initialize” solo para un servidor local nuevo. No inicializar sobre un directorio de datos existente.

Una vez instalado y levantado el servidor local, agregar sus herramientas al PATH de la terminal (ajustar la ruta si se usa otra distribución):

```sh
export PATH="/Applications/Postgres.app/Contents/Versions/latest/bin:$PATH"
psql --version
pg_isready -h 127.0.0.1 -p 5432
createuser --pwprompt dk_demo
createdb --owner=dk_demo bioproductos_dk_demo
```

Elegir una contraseña nueva y guardarla únicamente en el `.env` local ignorado. `createuser` solicita la contraseña interactivamente; no usar una cuenta superusuario para la aplicación. Estos comandos aún NO se han ejecutado. La configuración local debe exigir autenticación para conexiones TCP. Conservar otras bases existentes y no usar `dropdb`.

Postgres.app usa autenticación `trust` por defecto. Después de crear el rol con contraseña, seguir su [guía oficial para proteger el servidor](https://postgresapp.com/documentation/install.html#protecting-postgresql-with-a-password): detener el servidor, abrir el archivo HBA desde Server Settings, reemplazar `trust` por `scram-sha-256`, asignar contraseñas propias a los roles que se usarán y reiniciar. Conservar el listener en loopback. Comprobar que `psql -h 127.0.0.1 -U dk_demo -d bioproductos_dk_demo -W` autentique con la contraseña nueva. Esta revisión no fue ejecutada por el agente.
