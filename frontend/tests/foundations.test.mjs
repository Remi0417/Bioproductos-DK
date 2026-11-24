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
import medusaError from "../apps/storefront/src/lib/util/medusa-error.ts";

// El servidor Medusa (apps/backend) se quitó: el backend del proyecto es Django.
test("Next resolves the React runtime required by the storefront", () => {
  const storefront = createRequire(
    join(process.cwd(), "apps/storefront/package.json"),
  );
  const next = createRequire(storefront.resolve("next/package.json"));
  assert.match(storefront("react/package.json").version, /^19\./);
  assert.match(next("react/package.json").version, /^19\./);
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

test("environment setup creates the storefront env file and preserves existing files", () => {
  const dir = mkdtempSync(join(tmpdir(), "dk-env-test-"));
  try {
    mkdirSync(join(dir, "apps", "storefront"), { recursive: true });
    copyFileSync(
      "apps/storefront/.env.example",
      join(dir, "apps", "storefront", ".env.example"),
    );
    const run = () =>
      spawnSync(
        process.execPath,
        [join(process.cwd(), "scripts/setup-env.mjs")],
        { cwd: dir, encoding: "utf8" },
      );
    const first = run();
    assert.equal(first.status, 0, first.stderr);
    const envFile = join(dir, "apps/storefront/.env.local");
    const original = readFileSync(envFile, "utf8");
    assert.match(original, /^NEXT_PUBLIC_API_URL=/m);
    // Windows no aplica permisos POSIX (0600); solo se comprueban en Mac/Linux.
    if (process.platform !== "win32") {
      assert.equal(statSync(envFile).mode & 0o777, 0o600);
    }
    assert.equal(run().status, 0);
    assert.equal(readFileSync(envFile, "utf8"), original);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
