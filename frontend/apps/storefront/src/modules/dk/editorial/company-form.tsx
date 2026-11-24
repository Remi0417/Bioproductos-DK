"use client"

import { useEffect, useState, type FormEvent } from "react"
import axios from "axios"
import Swal from "sweetalert2"
import {
  enviarSolicitudEmpresa,
  esTipoSolicitudEmpresa,
  solicitudEmpresaSchema,
  tiposSolicitudEmpresa,
  type TipoSolicitudEmpresa,
} from "@lib/api/empresas"
import { publicContact } from "../../../content/site"
import contactStyles from "./contact-page.module.css"
// Mismo contenedor, grupos y espaciado que el formulario de /donaciones.
import formStyles from "./collaboration-form.module.css"

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

export default function CompanyForm() {
  const [status, setStatus] = useState("")
  const [enviando, setEnviando] = useState(false)
  const [tipo, setTipo] = useState<TipoSolicitudEmpresa>(
    tiposSolicitudEmpresa[0].value,
  )

  // Los botones de cada camino llegan con ?tipo=… y preseleccionan la opción.
  useEffect(() => {
    const desdeUrl = new URLSearchParams(window.location.search).get("tipo")
    if (esTipoSolicitudEmpresa(desdeUrl)) setTipo(desdeUrl)
  }, [])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)

    // 1. Validar con Zod
    const resultado = solicitudEmpresaSchema.safeParse({
      tipo: campoTexto(data.get("tipo")),
      organizacion: campoTexto(data.get("organizacion")),
      comuna_region: campoTexto(data.get("comuna_region")),
      nombre: campoTexto(data.get("nombre")),
      cargo: campoTexto(data.get("cargo")),
      correo: campoTexto(data.get("correo")),
      telefono: campoTexto(data.get("telefono")),
      mensaje: campoTexto(data.get("mensaje")),
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
      await enviarSolicitudEmpresa(resultado.data)
      form.reset()
      setTipo(tiposSolicitudEmpresa[0].value)
      setStatus("Tu consulta comercial fue enviada.")
      await Swal.fire({
        ...swalColores,
        icon: "success",
        title: "¡Gracias por escribirnos!",
        text: "Recibimos tu consulta comercial. El equipo de BioProductos DK revisará tu propuesta y te responderá a tu correo.",
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
      id="solicitud-empresa"
      className={`${contactStyles.page} ${formStyles.section}`}
      aria-labelledby="company-form-title"
    >
      <form className={contactStyles.form} onSubmit={handleSubmit} noValidate>
        <div className={contactStyles.formHeading}>
          <p className={contactStyles.eyebrow}>EMPRESAS · COMERCIO</p>
          <h2 id="company-form-title">Cuéntanos sobre tu organización.</h2>
          <p>
            El equipo de BioProductos DK revisará tu propuesta y te responderá a
            tu correo. Las condiciones se conversan caso a caso.
          </p>
        </div>

        <fieldset className={formStyles.group}>
          <legend>Tu organización</legend>
          <div className={contactStyles.fields}>
            <label className={contactStyles.field}>
              <span>
                ¿Qué te interesa? <i>*</i>
              </span>
              <select
                name="tipo"
                value={tipo}
                onChange={(event) => {
                  const valor = event.target.value
                  if (esTipoSolicitudEmpresa(valor)) setTipo(valor)
                }}
                required
              >
                {tiposSolicitudEmpresa.map((opcion) => (
                  <option key={opcion.value} value={opcion.value}>
                    {opcion.label}
                  </option>
                ))}
              </select>
            </label>
            <label className={contactStyles.field}>
              <span>
                Comercio u organización <i>*</i>
              </span>
              <input
                autoComplete="organization"
                maxLength={150}
                name="organizacion"
                placeholder="Nombre del comercio u organización"
                required
              />
            </label>
            <label className={contactStyles.field}>
              <span>
                Comuna / región <i>*</i>
              </span>
              <input
                autoComplete="address-level2"
                maxLength={120}
                name="comuna_region"
                placeholder="Ej: Maipú, Región Metropolitana"
                required
              />
            </label>
          </div>
        </fieldset>

        <fieldset className={formStyles.group}>
          <legend>Contacto</legend>
          <div className={contactStyles.fields}>
            <label className={contactStyles.field}>
              <span>
                Nombre <i>*</i>
              </span>
              <input
                autoComplete="name"
                maxLength={120}
                name="nombre"
                placeholder="Tu nombre"
                required
              />
            </label>
            <label className={contactStyles.field}>
              <span>
                Cargo <small>opcional</small>
              </span>
              <input
                autoComplete="organization-title"
                maxLength={80}
                name="cargo"
                placeholder="Ej: dueña, encargado de compras…"
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
            <label
              className={`${contactStyles.field} ${contactStyles.messageField}`}
            >
              <span>
                ¿Qué tienes en mente? <i>*</i>
              </span>
              <textarea
                maxLength={4000}
                name="mensaje"
                placeholder="Cuéntanos brevemente la oportunidad que te gustaría explorar…"
                required
                rows={5}
              />
            </label>
          </div>
        </fieldset>

        <div className={contactStyles.formBottom}>
          <p>Usaremos tus datos solo para responder esta consulta.</p>
          <button
            className={contactStyles.submitButton}
            type="submit"
            disabled={enviando}
          >
            {enviando ? "Enviando…" : "Enviar consulta comercial"}{" "}
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
