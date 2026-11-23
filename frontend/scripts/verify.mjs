import { spawn } from "node:child_process";
import { openSync, closeSync, writeFileSync } from "node:fs";

const results = [];
for (const command of ["format:check", "lint", "typecheck", "test", "build"]) {
  const log = `evidence/${command.replace(":", "-")}.log`;
  const file = openSync(log, "w", 0o600);
  const startedAt = new Date().toISOString();
  let code;
  try {
    code = await new Promise((resolve, reject) => {
      const child = spawn("npm", ["run", command], {
        stdio: ["ignore", file, file],
      });
      child.once("error", reject);
      child.once("exit", (exitCode) => resolve(exitCode ?? 1));
    });
  } finally {
    closeSync(file);
  }
  results.push({
    command: `npm run ${command}`,
    code,
    startedAt,
    finishedAt: new Date().toISOString(),
    log,
  });
  writeFileSync(
    "evidence/verification.json",
    JSON.stringify(
      {
        scope:
          "Static checks, unit tests and compilation. Not runtime, browser or database certification.",
        results,
      },
      null,
      2,
    ) + "\n",
  );
  console.log(`${command}: ${code === 0 ? "OK" : `FALLÓ (${code})`} — ${log}`);
}
process.exitCode = results.some((result) => result.code !== 0) ? 1 : 0;
