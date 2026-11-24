import { z } from "zod"
import { api } from "./client"

// Mismos valores que los TextChoices de Django (backend/colaboraciones/models.py)
export const materialesColaboracion = [
  { value: "cafe", label: "Borra de café" },
  { value: "huevo", label: "Cáscaras de huevo" },
  { value: "citricos", label: "Cáscaras de cítricos" },
  { value: "otro", label: "Otro material orgánico" },
] as const

export const origenesColaboracion = [
  { value: "hogar", label: "Hogar" },
  { value: "cafeteria", label: "Cafetería" },
  { value: "comercio", label: "Comercio" },
  { value: "otro", label: "Otra actividad" },
] as const

export const frecuenciasColaboracion = [
  { value: "variable", label: "Variable / no lo sé" },
  { value: "unica", label: "Una sola vez" },
  { value: "semanal", label: "Semanal" },
  { value: "mensual", label: "Mensual" },
] as const

// Validación en el navegador. Django vuelve a validar con su serializer.
// Los límites coinciden con los max_length del modelo Colaboracion.
export const colaboracionSchema = z
  .object({
    nombre: z
      .string()
      .trim()
      .min(2, "Escribe tu nombre.")
      .max(120, "El nombre es demasiado largo."),
    correo: z
      .string()
      .trim()
      .email("Revisa tu correo electrónico.")
      .max(254, "El correo es demasiado largo."),
    telefono: z
      .string()
      .trim()
      .max(30, "El teléfono puede tener máximo 30 caracteres."),
    comuna: z
      .string()
      .trim()
      .min(2, "Indica en qué comuna estás.")
      .max(80, "La comuna es demasiado larga."),
    material: z.enum(["cafe", "huevo", "citricos", "otro"], {
      message: "Elige el material.",
    }),
    detalle_material: z
      .string()
      .trim()
      .max(200, "El detalle puede tener máximo 200 caracteres."),
    origen: z.enum(["hogar", "cafeteria", "comercio", "otro"], {
      message: "Elige de dónde proviene el material.",
    }),
    cantidad_aproximada: z
      .string()
      .trim()
      .min(1, "Indica una cantidad aproximada (una estimación basta).")
      .max(100, "La cantidad puede tener máximo 100 caracteres."),
    frecuencia: z.enum(["variable", "unica", "semanal", "mensual"], {
      message: "Elige una frecuencia.",
    }),
    puede_separar: z.boolean(),
    comentario: z
      .string()
      .trim()
      .max(2000, "El comentario puede tener máximo 2000 caracteres."),
    acepta_condiciones: z.literal(true, {
      message:
        "Debes aceptar que la recepción requiere evaluación y coordinación previa.",
    }),
  })
  .refine(
    (datos) => datos.material !== "otro" || datos.detalle_material.length > 0,
    { path: ["detalle_material"], message: "Cuéntanos qué material es." },
  )

export type ColaboracionInput = z.infer<typeof colaboracionSchema>

export async function enviarColaboracion(datos: ColaboracionInput) {
  const respuesta = await api.post("/api/colaboraciones/", datos)
  return respuesta.data
}
