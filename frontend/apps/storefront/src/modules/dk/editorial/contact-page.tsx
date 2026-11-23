import Image from "next/image"
import Link from "next/link"
import { publicContact, socialProfiles } from "../../../content/site"
import ContactForm from "./contact-form"
import styles from "./contact-page.module.css"

function EnvelopeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
      <path d="m4.5 7 7.5 6 7.5-6" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7.3 3.8 9.7 7l-1.6 2.4a14 14 0 0 0 6.5 6.5l2.4-1.6 3.2 2.4-.8 3.1a2 2 0 0 1-2.2 1.5C9.7 20.2 3.8 14.3 2.7 6.8a2 2 0 0 1 1.5-2.2l3.1-.8Z" />
    </svg>
  )
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" />
      <circle cx="12" cy="10" r="2.3" />
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M4.5 15.5 15 5M6 5h9v9" />
    </svg>
  )
}

const phones = [
  { label: "+56 9 7977 1179", href: "tel:+56979771179" },
  { label: "+56 9 7984 0382", href: "tel:+56979840382" },
]

export default function ContactPage() {
  return (
    <main id="contenido" className={styles.page}>
      <section className={styles.hero} aria-labelledby="contact-title">
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>
              <span aria-hidden="true" /> BIOPRODUCTOS DK <i>/</i> CONTACTO
            </p>
            <h1 id="contact-title">
              Las buenas ideas
              <br />
              <em>empiezan conversando.</em>
            </h1>
            <p className={styles.lead}>
              ¿Una consulta, una posibilidad de colaboración o simplemente
              quieres conocer mejor lo que hacemos? Estamos aquí para leerte.
            </p>
            <a className={styles.heroCta} href="#escribir">
              Escríbenos <span aria-hidden="true">↓</span>
            </a>
          </div>
          <div className={styles.heroArt} aria-hidden="true">
            <div className={styles.artOrbit} />
            <div className={styles.artCenter}>
              <Image
                src="/images/brand/logo-dk-circular-original.png"
                alt=""
                aria-hidden="true"
                width={1254}
                height={1254}
                className={styles.artLogo}
                sizes="140px"
                priority
              />
            </div>
            <div className={`${styles.artNode} ${styles.nodeOne}`}>
              <EnvelopeIcon />
            </div>
            <div className={`${styles.artNode} ${styles.nodeTwo}`}>
              <PhoneIcon />
            </div>
            <div className={`${styles.artNode} ${styles.nodeThree}`}>
              <PinIcon />
            </div>
            <span className={styles.artCaption}>
              UNA IDEA PUEDE COMENZAR AQUÍ
            </span>
          </div>
        </div>
        <div className={styles.heroFoot}>
          <span>UN EQUIPO, DISTINTAS FORMAS DE CONECTAR</span>
          <span>
            RESPUESTA DIRECTA <i>·</i> TRATO CERCANO
          </span>
        </div>
      </section>

      <section className={styles.channels} aria-labelledby="channels-title">
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>ELIGE CÓMO CONECTAR</p>
          <h2 id="channels-title">Estamos al otro lado.</h2>
          <p>Elige el canal que te resulte más cómodo.</p>
        </div>
        <div className={styles.channelGrid}>
          <article className={`${styles.channelCard} ${styles.emailCard}`}>
            <span className={styles.channelIcon} aria-hidden="true">
              <EnvelopeIcon />
            </span>
            <p className={styles.channelLabel}>CORREO INSTITUCIONAL</p>
            <h3>Escríbenos con calma.</h3>
            <p>Para consultas, ideas y conversaciones de colaboración.</p>
            <a href={`mailto:${publicContact.email}`}>
              {publicContact.email} <ArrowIcon />
            </a>
          </article>
          <article className={`${styles.channelCard} ${styles.phoneCard}`}>
            <span className={styles.channelIcon} aria-hidden="true">
              <PhoneIcon />
            </span>
            <p className={styles.channelLabel}>CONTACTO TELEFÓNICO</p>
            <h3>Hablemos directamente.</h3>
            <p>Dos números publicados por BioProductos DK.</p>
            <div className={styles.phoneList}>
              {phones.map((phone) => (
                <a href={phone.href} key={phone.href}>
                  {phone.label} <span aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
          </article>
          <article className={`${styles.channelCard} ${styles.locationCard}`}>
            <span className={styles.channelIcon} aria-hidden="true">
              <PinIcon />
            </span>
            <p className={styles.channelLabel}>UBICACIÓN EN PADRE HURTADO</p>
            <h3>Coordina tu visita.</h3>
            <p>
              Papa Juan Pablo I 2104, Padre Hurtado, Región Metropolitana.
              Escríbenos antes de ir para confirmar la coordinación.
            </p>
            <Link href="/donde-comprar">
              Ver mapa y cómo llegar <ArrowIcon />
            </Link>
          </article>
        </div>
        <p className={styles.addressNote}>
          La dirección de contacto publicada en el sitio oficial es Huérfanos
          1160, oficina 1102, Santiago. La ubicación de Padre Hurtado está
          detallada en el mapa; son referencias distintas.
        </p>
      </section>

      <section
        id="escribir"
        className={styles.contactSection}
        aria-labelledby="contact-form-title"
      >
        <div className={styles.contactAside}>
          <p className={styles.eyebrow}>UNA CONVERSACIÓN A TU MEDIDA</p>
          <h2>
            Cada mensaje
            <br />
            <em>abre una posibilidad.</em>
          </h2>
          <p>
            Cuéntanos qué tienes en mente. Puedes escribir por un producto,
            proponer una colaboración científica, conversar sobre empresas o
            compartir una idea relacionada con materiales orgánicos.
          </p>
          <div className={styles.topicList} aria-label="Temas de consulta">
            {[
              "Productos",
              "Investigación",
              "Empresas",
              "Materiales orgánicos",
            ].map((topic, index) => (
              <span key={topic}>
                <i>0{index + 1}</i> {topic}
              </span>
            ))}
          </div>
          <div className={styles.addressCard}>
            <span className={styles.addressPin} aria-hidden="true">
              <PinIcon />
            </span>
            <div>
              <small>DIRECCIÓN PUBLICADA POR DK</small>
              <b>Huérfanos 1160, oficina 1102</b>
              <span>Santiago, Chile</span>
            </div>
          </div>
          <div className={styles.socialBlock}>
            <p>Síguenos y conoce más de nuestro trabajo</p>
            <div>
              {socialProfiles.map((profile) => (
                <a
                  href={profile.href}
                  key={profile.id}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${profile.label} de BioProductos DK (abre en otra pestaña)`}
                >
                  {profile.label} <ArrowIcon />
                </a>
              ))}
            </div>
          </div>
        </div>
        <ContactForm />
      </section>

      <section className={styles.pathways} aria-labelledby="pathways-title">
        <div>
          <p className={styles.eyebrow}>¿QUÉ TE TRAE POR AQUÍ?</p>
          <h2 id="pathways-title">Te acompañamos desde el primer paso.</h2>
        </div>
        <div className={styles.pathwayLinks}>
          <Link href="/bio-investigacion">
            <span>
              <i>01</i> Quiero conversar sobre investigación
            </span>
            <ArrowIcon />
          </Link>
          <Link href="/empresas">
            <span>
              <i>02</i> Busco una relación comercial
            </span>
            <ArrowIcon />
          </Link>
          <Link href="/productos">
            <span>
              <i>03</i> Quiero conocer los productos
            </span>
            <ArrowIcon />
          </Link>
        </div>
      </section>
    </main>
  )
}
