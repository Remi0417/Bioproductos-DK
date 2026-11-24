import { existsSync, readFileSync, writeFileSync } from "node:fs";

// El backend ahora es Django (carpeta backend/ del repo), con su propio .env.
// Aquí solo se prepara el .env.local del storefront (Next.js).
const files = [["apps/storefront/.env.example", "apps/storefront/.env.local"]];
for (const [template, target] of files) {
  if (existsSync(target)) {
    console.log(`${target}: conservado, ya existe.`);
    continue;
  }
  const content = readFileSync(template, "utf8");
  writeFileSync(target, content, { flag: "wx", mode: 0o600 });
  console.log(`${target}: creado a partir de ${template}.`);
}
console.log(
  "Revisa NEXT_PUBLIC_API_URL en apps/storefront/.env.local: debe apuntar a la API de Django (por defecto http://127.0.0.1:8001).",
);
