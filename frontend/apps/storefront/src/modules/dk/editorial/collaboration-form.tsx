"use client"

import { useState, type FormEvent } from "react"
import axios from "axios"
import Swal from "sweetalert2"
import {
  colaboracionSchema,
  enviarColaboracion,
  frecuenciasColaboracion,
  materialesColaboracion,
  origenesColaboracion,
} from "@lib/api/colaboraciones"
import { publicContact } from "../../../content/site"
import contactStyles from "./contact-page.module.css"
import styles from "./collaboration-form.module.css"

const swalColores = {
  confirmButtonColor: "#1b563c", // --dk2-forest
}

const campoTexto = (valor: FormDataEntryValue | null) =>
  typeof valor === "string" ? valor : ""

// Django responde errores 400 como { campo: ["mensaje"] }: toma el primero.
function primerErrorDelServidor(datos: unknown): string | null {
  if (!datos || typeof datos !== "object") return null
  for (const valor of Object.values(datos as Record<string, unknown>)) {
    if (Array.isArray(valor) && typeof valor[0] === "string") return valor[0]
    if (typeof valor === "string") return valor
  }
  return null
}

export default function CollaborationForm() {
  const [status, setStatus] = useState("")
  const [enviando, setEnviando] = useState(false)
  const [material, setMaterial] = useState<string>(
    materialesColaboracion[0].value,
  )

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)

    // 1. Validar con Zod
    const resultado = colaboracionSchema.safeParse({
      nombre: campoTexto(data.get("nombre")),
      correo: campoTexto(data.get("correo")),
      telefono: campoTexto(data.get("telefono")),
      comuna: campoTexto(data.get("comuna")),
      material: campoTexto(data.get("material")),
      detalle_material: campoTexto(data.get("detalle_material")),
      origen: campoTexto(data.get("origen")),
      cantidad_aproximada: campoTexto(data.get("cantidad_aproximada")),
      frecuencia: campoTexto(data.get("frecuencia")),
      puede_separar: data.get("puede_separar") === "on",
      comentario: campoTexto(data.get("comentario")),
      acepta_condiciones: data.get("acepta_condiciones") === "on",
    })

    if (!resultado.success) {
      await Swal.fire({
        ...swalColores,
        icon: "warning",
        title: "Revisa el formulario",
        text: resultado.error.issues[0]?.message,
        confirmButtonText: "Entendido",
      })
      return
    }

    // 2. Enviar a Django con Axios
    setEnviando(true)
    setStatus("Enviando tu consulta…")
    try {
      await enviarColaboracion(resultado.data)
      form.reset()
      setMaterial(materialesColaboracion[0].value)
      setStatus("Tu consulta de colaboración fue enviada.")
      await Swal.fire({
        ...swalColores,
        icon: "success",
        title: "¡Gracias por tu interés!",
        text: "Recibimos tu consulta. El equipo de BioProductos DK evaluará el material y te responderá a tu correo. Por favor, no prepares ni traslades residuos hasta recibir su confirmación.",
        confirmButtonText: "Cerrar",
      })
    } catch (error) {
      // 3. Mostrar el error con SweetAlert2
      let mensaje =
        "No pudimos enviar tu consulta. Inténtalo nuevamente en unos minutos."
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 429) {
          mensaje =
            "Enviaste varias consultas seguidas. Espera un minuto e inténtalo otra vez."
        } else if (error.response?.status === 400) {
          mensaje =
            primerErrorDelServidor(error.response.data) ??
            "Algunos datos no son válidos. Revisa el formulario."
        } else if (!error.response) {
          mensaje = "No pudimos conectar con el servidor. Revisa tu conexión."
        }
      }
      setStatus("")
      await Swal.fire({
        ...swalColores,
        icon: "error",
        title: "No se pudo enviar",
        text: mensaje,
        footer: `También puedes escribirnos a ${publicContact.email}`,
        confirmButtonText: "Cerrar",
      })
    } finally {
      setEnviando(false)
    }
  }

  return (
    <section
      id="formulario-colaboracion"
      className={`${contactStyles.page} ${styles.section}`}
      aria-labelledby="collaboration-form-title"
    >
      <form className={contactStyles.form} onSubmit={handleSubmit} noValidate>
        <div className={contactStyles.formHeading}>
          <p className={contactStyles.eyebrow}>CUÉNTANOS SOBRE EL MATERIAL</p>
          <h2 id="collaboration-form-title">
            Consulta una posible colaboración.
          </h2>
          <p>
            DK revisará si el material se relaciona con su investigación y te
            responderá a tu correo. Enviar este formulario no compromete una
            entrega ni un retiro.
          </p>
        </div>

        <fieldset className={styles.group}>
          <legend>Tus datos</legend>
          <div className={contactStyles.fields}>
            <label className={contactStyles.field}>
              <span>
                Nombre <i>*</i>
              </span>
              <input
                autoComplete="name"
                maxLength={120}
                name="nombre"
                placeholder="Tu nombre o el de tu organización"
                required
              />
            </label>
            <label className={contactStyles.field}>
              <span>
                Correo electrónico <i>*</i>
              </span>
              <input
                autoComplete="email"
                maxLength={254}
                name="correo"
                placeholder="tu@correo.cl"
                required
                type="email"
              />
            </label>
            <label className={contactStyles.field}>
              <span>
                Teléfono <small>opcional</small>
              </span>
              <input
                autoComplete="tel"
                maxLength={30}
                name="telefono"
                placeholder="+56 9 …"
                type="tel"
              />
            </label>
            <label className={contactStyles.field}>
              <span>
                Comuna <i>*</i>
              </span>
              <input
                autoComplete="address-level2"
                maxLength={80}
                name="comuna"
                placeholder="Ej: Padre Hurtado"
                required
              />
            </label>
          </div>
        </fieldset>

        <fieldset className={styles.group}>
          <legend>El material</legend>
          <div className={contactStyles.fields}>
            <label className={contactStyles.field}>
              <span>
                ¿Qué material es? <i>*</i>
              </span>
              <select
                name="material"
                value={material}
                onChange={(event) => setMaterial(event.target.value)}
                required
              >
                {materialesColaboracion.map((opcion) => (
                  <option key={opcion.value} value={opcion.value}>
                    {opcion.label}
                  </option>
                ))}
              </select>
            </label>
            <label className={contactStyles.field}>
              <span>
                Detalle del material{" "}
                {material === "otro" ? <i>*</i> : <small>opcional</small>}
              </span>
              <input
                maxLength={200}
                name="detalle_material"
                placeholder="Ej: cuescos de palta, cáscaras de nuez…"
                required={material === "otro"}
              />
            </label>
            <label className={contactStyles.field}>
              <span>
                ¿De dónde proviene? <i>*</i>
              </span>
              <select
                name="origen"
                defaultValue={origenesColaboracion[0].value}
                required
              >
                {origenesColaboracion.map((opcion) => (
                  <option key={opcion.value} value={opcion.value}>
                    {opcion.label}
                  </option>
                ))}
              </select>
            </label>
            <label className={contactStyles.field}>
              <span>
                ¿Con qué frecuencia? <i>*</i>
              </span>
              <select
                name="frecuencia"
                defaultValue={frecuenciasColaboracion[0].value}
                required
              >
                {frecuenciasColaboracion.map((opcion) => (
                  <option key={opcion.value} value={opcion.value}>
                    {opcion.label}
                  </option>
                ))}
              </select>
            </label>
            <label className={contactStyles.field}>
              <span>
                Cantidad aproximada <i>*</i>
              </span>
              <input
                maxLength={100}
                name="cantidad_aproximada"
                placeholder="Ej: una bolsa a la semana, 5 kg…"
                required
              />
            </label>
            <label
              className={`${contactStyles.field} ${contactStyles.messageField}`}
            >
              <span>
                Comentario <small>opcional</small>
              </span>
              <textarea
                maxLength={2000}
                name="comentario"
                placeholder="Cualquier detalle que ayude a evaluar el material…"
                rows={4}
              />
            </label>
          </div>
        </fieldset>

        <div className={styles.checks}>
          <label className={styles.check}>
            <input name="puede_separar" type="checkbox" />
            <span>Puedo mantener el material separado desde su origen.</span>
          </label>
          <label className={styles.check}>
            <input name="acepta_condiciones" type="checkbox" required />
            <span>
              Entiendo que la recepción debe ser evaluada y coordinada
              previamente con BioProductos DK. <i>*</i>
            </span>
          </label>
        </div>

        <div className={contactStyles.formBottom}>
          <p>Usaremos tus datos solo para responder esta consulta.</p>
          <button
            className={contactStyles.submitButton}
            type="submit"
            disabled={enviando}
          >
            {enviando ? "Enviando…" : "Enviar consulta"}{" "}
            <span aria-hidden="true">↗</span>
          </button>
        </div>
        <p className={contactStyles.formStatus} aria-live="polite">
          {status}
        </p>
        <p className={contactStyles.formFallback}>
          ¿Prefieres escribirnos directamente? Hazlo a{" "}
          <a href={`mailto:${publicContact.email}`}>{publicContact.email}</a>.
        </p>
      </form>
    </section>
  )
}
