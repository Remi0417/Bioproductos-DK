import { z } from "zod"
import { api } from "./client"

// Mismos valores que SolicitudEmpresa.Tipo en Django (backend/empresas/models.py)
export const tiposSolicitudEmpresa = [
  { value: "punto_venta", label: "Punto de venta (comercio)" },
  { value: "distribucion", label: "Distribución" },
  { value: "organizacion", label: "Empresa u organización" },
  { value: "otro", label: "Otra idea" },
] as const

export type TipoSolicitudEmpresa =
  (typeof tiposSolicitudEmpresa)[number]["value"]

export const esTipoSolicitudEmpresa = (
  valor: string | null,
): valor is TipoSolicitudEmpresa =>
  tiposSolicitudEmpresa.some((tipo) => tipo.value === valor)

// Validación en el navegador. Django vuelve a validar con su serializer.
// Los límites coinciden con los max_length del modelo SolicitudEmpresa.
export const solicitudEmpresaSchema = z.object({
  tipo: z.enum(["punto_venta", "distribucion", "organizacion", "otro"], {
    message: "Elige qué te interesa.",
  }),
  organizacion: z
    .string()
    .trim()
    .min(2, "Escribe el nombre del comercio u organización.")
    .max(150, "El nombre de la organización es demasiado largo."),
  comuna_region: z
    .string()
    .trim()
    .min(2, "Indica la comuna o región.")
    .max(120, "La comuna o región es demasiado larga."),
  nombre: z
    .string()
    .trim()
    .min(2, "Escribe tu nombre.")
    .max(120, "El nombre es demasiado largo."),
  cargo: z
    .string()
    .trim()
    .max(80, "El cargo puede tener máximo 80 caracteres."),
  correo: z
    .string()
    .trim()
    .email("Revisa tu correo electrónico.")
    .max(254, "El correo es demasiado largo."),
  telefono: z
    .string()
    .trim()
    .max(30, "El teléfono puede tener máximo 30 caracteres."),
  mensaje: z
    .string()
    .trim()
    .min(10, "Cuéntanos un poco más (mínimo 10 caracteres).")
    .max(4000, "El mensaje puede tener máximo 4000 caracteres."),
})

export type SolicitudEmpresaInput = z.infer<typeof solicitudEmpresaSchema>

export async function enviarSolicitudEmpresa(datos: SolicitudEmpresaInput) {
  const respuesta = await api.post("/api/empresas/", datos)
  return respuesta.data
}
