const c = require("ansi-colors")

const requiredEnvs = [
  {
    key: "NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY",
    // TODO: we need a good doc to point this to
    description:
      "Learn how to create a publishable key: https://docs.medusajs.com/v2/resources/storefront-development/publishable-api-keys",
  },
]

function checkEnvVariables() {
  for (const [key, port] of [
    ["NEXT_PUBLIC_MEDUSA_BACKEND_URL", "9000"],
    ["NEXT_PUBLIC_BASE_URL", "8000"],
  ]) {
    let url
    try {
      url = new URL(process.env[key] || "")
    } catch {
      throw new Error(`${key} debe definir una URL local.`)
    }
    if (
      url.protocol !== "http:" ||
      !["localhost", "127.0.0.1"].includes(url.hostname) ||
      url.port !== port ||
      url.username ||
      url.password ||
      url.pathname !== "/" ||
      url.search ||
      url.hash
    ) {
      throw new Error(
        `${key} solo admite la URL del servicio local, sin credenciales ni parámetros.`,
      )
    }
  }
  if (process.env.NEXT_PUBLIC_STRIPE_KEY)
    throw new Error("Stripe no está habilitado en esta etapa.")
  if (process.env.DK_DEMO_PREVIEW === "true") return
  const missingEnvs = requiredEnvs.filter(function (env) {
    return !process.env[env.key]
  })

  if (missingEnvs.length > 0) {
    console.error(
      c.red.bold("\n🚫 Error: Missing required environment variables\n"),
    )

    missingEnvs.forEach(function (env) {
      console.error(c.yellow(`  ${c.bold(env.key)}`))
      if (env.description) {
        console.error(c.dim(`    ${env.description}\n`))
      }
    })

    console.error(
      c.yellow(
        "\nPlease set these variables in your .env file or environment before starting the application.\n",
      ),
    )

    process.exit(1)
  }
}

module.exports = checkEnvVariables
