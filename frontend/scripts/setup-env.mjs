import { randomBytes } from "node:crypto";
import { existsSync, readFileSync, writeFileSync } from "node:fs";

const files = [
  ["apps/backend/.env.example", "apps/backend/.env"],
  ["apps/storefront/.env.example", "apps/storefront/.env.local"],
];
for (const [template, target] of files) {
  if (existsSync(target)) {
    console.log(`${target}: conservado, ya existe.`);
    continue;
  }
  let content = readFileSync(template, "utf8");
  for (const key of ["JWT_SECRET", "COOKIE_SECRET"]) {
    content = content.replace(
      `${key}=`,
      `${key}=${randomBytes(48).toString("hex")}`,
    );
  }
  writeFileSync(target, content, { flag: "wx", mode: 0o600 });
  console.log(`${target}: creado sin mostrar valores.`);
}
console.log(
  "Vista previa disponible. Configura DATABASE_URL local antes de iniciar Medusa.",
);
