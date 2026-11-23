import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";
import { createRequire } from "node:module";

const root = fileURLToPath(new URL("../", import.meta.url));
const backendRequire = createRequire(
  resolve(root, "apps/backend/package.json"),
);
const child = spawn(
  process.execPath,
  [backendRequire.resolve("@medusajs/cli/cli.js"), ...process.argv.slice(2)],
  {
    cwd: resolve(root, "apps/backend"),
    stdio: "inherit",
    env: {
      ...process.env,
      XDG_CONFIG_HOME: resolve(root, ".local/config"),
      MEDUSA_DISABLE_TELEMETRY: "true",
      HMR_PORT: process.env.HMR_PORT || "5173",
    },
  },
);
child.once("error", (error) => {
  console.error(error.message);
  process.exitCode = 1;
});
child.once("exit", (code, signal) => {
  process.exitCode = signal ? 1 : (code ?? 1);
});
