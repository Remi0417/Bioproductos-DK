import { spawnSync } from "node:child_process";
import { createConnection } from "node:net";

console.log(
  `Plataforma: ${process.platform} ${process.arch}; Node ${process.version}`,
);
for (const [command, args] of [
  ["sw_vers", []],
  ["npm", ["--version"]],
  ["git", ["--version"]],
  ["psql", ["--version"]],
  ["pg_isready", ["-h", "127.0.0.1", "-p", "5432"]],
]) {
  const result = spawnSync(command, args, { encoding: "utf8" });
  console.log(
    `${command}: ${result.error ? "no disponible" : result.stdout.trim() || result.stderr.trim()}`,
  );
}
for (const port of [5432, 8000, 9000, 5173]) {
  await new Promise((resolve) => {
    const socket = createConnection({ host: "127.0.0.1", port });
    socket.setTimeout(1000);
    let completed = false;
    function done(state) {
      if (completed) return;
      completed = true;
      console.log(`127.0.0.1:${port} — ${state}`);
      socket.destroy();
      resolve();
    }
    socket.once("connect", () => done("responde; no identifica el servicio"));
    socket.once("error", () => done("sin conexión"));
    socket.once("timeout", () => done("timeout"));
  });
}
