import { z } from "zod"
import { api } from "./client"

// Mismos valores que Consulta.Tema en Django (backend/contacto/models.py)
export const temasConsulta = [
  { value: "general", label: "Consulta general" },
  { value: "productos", label: "Productos y catálogo" },
  { value: "cientifica", label: "Colaboración científica" },
  { value: "empresas", label: "Empresas y distribución" },
  { value: "materiales", label: "Colaboración con materiales orgánicos" },
  { value: "otro", label: "Otro tema" },
] as const

// Validación en el navegador. Django vuelve a validar con su serializer.
// Los límites coinciden con los max_length del modelo Consulta.
export const consultaSchema = z.object({
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
  tema: z.enum(
    ["general", "productos", "cientifica", "empresas", "materiales", "otro"],
    { message: "Elige un tema." },
  ),
  mensaje: z
    .string()
    .trim()
    .min(10, "Cuéntanos un poco más (mínimo 10 caracteres).")
    .max(4000, "El mensaje puede tener máximo 4000 caracteres."),
})

export type ConsultaInput = z.infer<typeof consultaSchema>

export async function enviarConsulta(datos: ConsultaInput) {
  const respuesta = await api.post("/api/contacto/consultas/", datos)
  return respuesta.data
}
