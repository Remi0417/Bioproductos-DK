import { MedusaError } from "@medusajs/framework/utils";
export function assertLocalDemoEnvironment(
  env: NodeJS.ProcessEnv,
  options = { databaseRequired: true },
) {
  if (env.DK_DEMO_MODE !== "true") {
    throw new MedusaError(
      MedusaError.Types.INVALID_DATA,
      "DK_DEMO_MODE=true es obligatorio en esta candidatura local.",
    );
  }
  if (options.databaseRequired) {
    let database: URL;
    try {
      database = new URL(env.DATABASE_URL || "");
    } catch {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "Configura DATABASE_URL con PostgreSQL local; revisa docs/DIAGNOSTICO_MAC.md.",
      );
    }
    if (
      !["postgres:", "postgresql:"].includes(database.protocol) ||
      !["localhost", "127.0.0.1", "[::1]"].includes(database.hostname) ||
      database.pathname !== "/bioproductos_dk_demo" ||
      database.username !== "dk_demo" ||
      !database.password ||
      database.password === "CHANGE_ME" ||
      [...database.searchParams.keys()].length > 0
    ) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "Solo se permite la base local bioproductos_dk_demo, rol dk_demo y contraseña propia, sin parámetros adicionales.",
      );
    }
  }
  for (const key of ["JWT_SECRET", "COOKIE_SECRET"]) {
    if ((env[key]?.length || 0) < 64 || env[key] === "supersecret") {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        `${key} requiere un valor aleatorio privado de al menos 64 caracteres.`,
      );
    }
  }
  for (const key of ["STORE_CORS", "ADMIN_CORS", "AUTH_CORS"]) {
    const origins = env[key]?.split(",") || [];
    if (
      !origins.length ||
      origins.some(
        (origin) =>
          !/^http:\/\/(localhost|127\.0\.0\.1):(8000|9000|5173)$/.test(origin),
      )
    ) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        `${key} solo admite orígenes locales explícitos.`,
      );
    }
  }
}
