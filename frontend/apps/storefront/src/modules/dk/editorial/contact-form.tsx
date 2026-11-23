"use client"

import { useState, type FormEvent } from "react"
import axios from "axios"
import Swal from "sweetalert2"
import { consultaSchema, enviarConsulta, temasConsulta } from "@lib/api/contacto"
import { publicContact } from "../../../content/site"
import styles from "./contact-page.module.css"

const swalColores = {
  confirmButtonColor: "#1b563c", // --dk2-forest
}

const campoTexto = (valor: FormDataEntryValue | null) =>
  typeof valor === "string" ? valor : ""

export default function ContactForm() {
  const [status, setStatus] = useState("")
  const [enviando, setEnviando] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)

    // 1. Validar con Zod
    const resultado = consultaSchema.safeParse({
      nombre: campoTexto(data.get("name")),
      correo: campoTexto(data.get("email")),
      telefono: campoTexto(data.get("phone")),
      tema: campoTexto(data.get("topic")),
      mensaje: campoTexto(data.get("message")),
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
      await enviarConsulta(resultado.data)
      form.reset()
      setStatus("Tu consulta fue enviada.")
      await Swal.fire({
        ...swalColores,
        icon: "success",
        title: "¡Consulta enviada!",
        text: "Gracias por escribirnos. El equipo de BioProductos DK te responderá a tu correo.",
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
          mensaje = "Algunos datos no son válidos. Revisa el formulario."
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
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.formHeading}>
        <p className={styles.eyebrow}>CUÉNTANOS UN POCO</p>
        <h2 id="contact-form-title">¿Qué te gustaría conversar?</h2>
        <p>
          Completa estos datos y el equipo de BioProductos DK te responderá a tu
          correo.
        </p>
      </div>

      <div className={styles.fields}>
        <label className={styles.field}>
          <span>
            Nombre <i>*</i>
          </span>
          <input
            autoComplete="name"
            maxLength={120}
            name="name"
            placeholder="Tu nombre"
            required
          />
        </label>
        <label className={styles.field}>
          <span>
            Correo electrónico <i>*</i>
          </span>
          <input
            autoComplete="email"
            maxLength={254}
            name="email"
            placeholder="tu@correo.cl"
            required
            type="email"
          />
        </label>
        <label className={styles.field}>
          <span>
            Teléfono <small>opcional</small>
          </span>
          <input
            autoComplete="tel"
            maxLength={30}
            name="phone"
            placeholder="+56 9 …"
            type="tel"
          />
        </label>
        <label className={styles.field}>
          <span>
            ¿Sobre qué tema? <i>*</i>
          </span>
          <select name="topic" defaultValue={temasConsulta[0].value} required>
            {temasConsulta.map((tema) => (
              <option key={tema.value} value={tema.value}>
                {tema.label}
              </option>
            ))}
          </select>
        </label>
        <label className={`${styles.field} ${styles.messageField}`}>
          <span>
            Tu mensaje <i>*</i>
          </span>
          <textarea
            maxLength={4000}
            name="message"
            placeholder="Cuéntanos brevemente qué necesitas o qué idea quieres compartir…"
            required
            rows={5}
          />
        </label>
      </div>

      <div className={styles.formBottom}>
        <p>Usaremos tus datos solo para responder esta consulta.</p>
        <button
          className={styles.submitButton}
          type="submit"
          disabled={enviando}
        >
          {enviando ? "Enviando…" : "Enviar consulta"}{" "}
          <span aria-hidden="true">↗</span>
        </button>
      </div>
      <p className={styles.formStatus} aria-live="polite">
        {status}
      </p>
      <p className={styles.formFallback}>
        ¿Prefieres escribirnos directamente? Hazlo a{" "}
        <a href={`mailto:${publicContact.email}`}>{publicContact.email}</a>.
      </p>
    </form>
  )
}
