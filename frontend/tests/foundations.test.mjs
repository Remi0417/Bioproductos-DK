import test from "node:test";
import assert from "node:assert/strict";
import {
  readFileSync,
  mkdtempSync,
  mkdirSync,
  copyFileSync,
  rmSync,
  statSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { createRequire } from "node:module";
import { assertLocalDemoEnvironment } from "../apps/backend/src/lib/demo-safety.ts";
import medusaError from "../apps/storefront/src/lib/util/medusa-error.ts";

test("Next and Medusa resolve the React runtime required by each official application", () => {
  const backend = createRequire(
    join(process.cwd(), "apps/backend/package.json"),
  );
  const storefront = createRequire(
    join(process.cwd(), "apps/storefront/package.json"),
  );
  const next = createRequire(storefront.resolve("next/package.json"));
  const dashboard = createRequire(backend.resolve("@medusajs/dashboard"));
  assert.match(backend("react/package.json").version, /^18\./);
  assert.match(storefront("react/package.json").version, /^19\./);
  assert.match(next("react/package.json").version, /^19\./);
  assert.match(dashboard("react/package.json").version, /^18\./);
});

test("commerce errors never propagate tokens, addresses, headers or raw payloads", () => {
  const privateValue = "synthetic-sensitive-value";
  for (const input of [
    {
      response: {
        status: 500,
        data: privateValue,
        headers: { authorization: privateValue },
      },
    },
    { request: { authorization: privateValue }, message: privateValue },
    null,
  ]) {
    assert.throws(
      () => medusaError(input),
      (error) => !error.message.includes(privateValue),
    );
  }
  assert.throws(
    () => medusaError({ response: { status: 409 } }),
    /disponibilidad/,
  );
});

const local = () => ({
  DK_DEMO_MODE: "true",
  DATABASE_URL:
    "postgresql://dk_demo:synthetic-test-only@127.0.0.1:5432/bioproductos_dk_demo",
  JWT_SECRET: "test-only-".repeat(10),
  COOKIE_SECRET: "test-only-".repeat(10),
  STORE_CORS: "http://localhost:8000",
  ADMIN_CORS: "http://localhost:9000",
  AUTH_CORS: "http://localhost:8000,http://localhost:9000",
});

test("guard accepts only explicit local demo database and rejects remote or foreign resources", () => {
  assert.doesNotThrow(() => assertLocalDemoEnvironment(local()));
  for (const url of [
    "postgresql://dk_demo:test@db.example.com/bioproductos_dk_demo",
    "postgresql://dk_demo:test@localhost/real_store",
    "postgresql://postgres:test@localhost/bioproductos_dk_demo",
    "postgresql://dk_demo:test@localhost/bioproductos_dk_demo?host=db.example.com",
    "postgresql://dk_demo@localhost/bioproductos_dk_demo",
    "postgresql://dk_demo:CHANGE_ME@localhost/bioproductos_dk_demo",
    "https://localhost/bioproductos_dk_demo",
    "",
  ])
    assert.throws(() =>
      assertLocalDemoEnvironment({ ...local(), DATABASE_URL: url }),
    );
});

test("guard rejects disabled demo mode, weak secrets and external CORS", () => {
  for (const changes of [
    { DK_DEMO_MODE: "false" },
    { JWT_SECRET: "supersecret" },
    { COOKIE_SECRET: "" },
    { STORE_CORS: "*" },
    { AUTH_CORS: "https://example.com" },
    { ADMIN_CORS: "" },
  ])
    assert.throws(() => assertLocalDemoEnvironment({ ...local(), ...changes }));
});

test("dataset has eight unique DEMO references, 2/3/3 groups and integer CLP/stock", () => {
  const catalog = JSON.parse(readFileSync("data/demo-catalog.json", "utf8"));
  assert.equal(catalog.length, 8);
  assert.equal(new Set(catalog.map((p) => p.sku)).size, 8);
  assert.equal(new Set(catalog.map((p) => p.handle)).size, 8);
  assert.deepEqual(
    ["detergent", "shampoo", "salt"].map(
      (kind) => catalog.filter((p) => p.kind === kind).length,
    ),
    [2, 3, 3],
  );
  for (const product of catalog) {
    assert.match(product.sku, /^DEMO-/);
    assert.match(product.handle, /^demo-/);
    assert.ok(Number.isSafeInteger(product.price) && product.price > 0);
    assert.ok(Number.isSafeInteger(product.stock) && product.stock >= 0);
  }
});

test("environment setup generates private independent secrets and preserves existing files", () => {
  const dir = mkdtempSync(join(tmpdir(), "dk-env-test-"));
  try {
    for (const app of ["backend", "storefront"]) {
      mkdirSync(join(dir, "apps", app), { recursive: true });
      copyFileSync(
        `apps/${app}/.env.example`,
        join(dir, "apps", app, ".env.example"),
      );
    }
    const run = () =>
      spawnSync(
        process.execPath,
        [join(process.cwd(), "scripts/setup-env.mjs")],
        { cwd: dir, encoding: "utf8" },
      );
    const first = run();
    assert.equal(first.status, 0, first.stderr);
    const envFile = join(dir, "apps/backend/.env");
    const original = readFileSync(envFile, "utf8");
    const jwt = original.match(/^JWT_SECRET=(.+)$/m)?.[1];
    const cookie = original.match(/^COOKIE_SECRET=(.+)$/m)?.[1];
    assert.match(jwt, /^[a-f0-9]{96}$/);
    assert.notEqual(jwt, cookie);
    assert.ok(!first.stdout.includes(jwt));
    assert.equal(statSync(envFile).mode & 0o777, 0o600);
    assert.equal(run().status, 0);
    assert.equal(readFileSync(envFile, "utf8"), original);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
