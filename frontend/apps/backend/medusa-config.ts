import { loadEnv, defineConfig } from "@medusajs/framework/utils";
import { assertLocalDemoEnvironment } from "./src/lib/demo-safety";

loadEnv(process.env.NODE_ENV || "development", process.cwd());
// Medusa's compiler does not connect to PostgreSQL. Runtime/migrations/seed always validate it.
assertLocalDemoEnvironment(process.env, {
  databaseRequired: process.argv[2] !== "build",
});

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET,
      cookieSecret: process.env.COOKIE_SECRET,
    },
  },
});
