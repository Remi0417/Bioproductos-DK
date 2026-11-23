import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import ts from "typescript";
import { editorialPaths } from "../apps/storefront/src/content/site.ts";

const storefront = createRequire(resolve("apps/storefront/package.json"));
const { NextRequest } = storefront("next/server");
// Run the real middleware with Next's request/response implementations, without a socket.
// Transpile only for Node's test loader; the application continues to use Next's compiler.
const source = readFileSync("apps/storefront/src/middleware.ts", "utf8");
const compiled = ts
  .transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2022,
    },
  })
  .outputText.replace(
    'from "next/server"',
    `from "${pathToFileURL(storefront.resolve("next/server")).href}"`,
  )
  .replace(
    'from "./content/site"',
    `from "${pathToFileURL(resolve("apps/storefront/src/content/site.ts")).href}"`,
  );
const { middleware, config } = await import(
  `data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}`
);

test("actual middleware serves exact editorial routes without probing Medusa, in both modes", async () => {
  const previousMode = process.env.DK_DEMO_PREVIEW;
  const previousFetch = globalThis.fetch;
  globalThis.fetch = () => {
    throw new Error("Editorial routes must not probe the backend");
  };
  try {
    for (const mode of ["true", "false"]) {
      process.env.DK_DEMO_PREVIEW = mode;
      for (const path of editorialPaths) {
        for (const method of ["GET", "HEAD"]) {
          const response = await middleware(
            new NextRequest(`http://127.0.0.1:8000${path}`, { method }),
          );
          assert.equal(response.status, 200, `${mode} ${method} ${path}`);
          assert.equal(response.headers.get("x-middleware-next"), "1");
          assert.equal(response.headers.get("location"), null);
        }
      }
    }
  } finally {
    globalThis.fetch = previousFetch;
    if (previousMode === undefined) delete process.env.DK_DEMO_PREVIEW;
    else process.env.DK_DEMO_PREVIEW = previousMode;
  }
});

test("actual preview middleware blocks commerce, unknown subpaths and editorial mutations", async () => {
  const previousMode = process.env.DK_DEMO_PREVIEW;
  process.env.DK_DEMO_PREVIEW = "true";
  try {
    for (const path of [
      "/cl/cart",
      "/cl/account",
      "/cl/checkout",
      "/app",
      "/productos/private",
      "/bio-investigacion/private",
      "/donaciones/private",
    ]) {
      assert.equal(
        (await middleware(new NextRequest(`http://127.0.0.1:8000${path}`)))
          .status,
        503,
        path,
      );
    }
    for (const path of editorialPaths) {
      for (const method of ["POST", "PUT", "PATCH", "DELETE"]) {
        const response = await middleware(
          new NextRequest(`http://127.0.0.1:8000${path}`, { method }),
        );
        assert.equal(response.status, 503, `${method} ${path}`);
      }
    }
  } finally {
    if (previousMode === undefined) delete process.env.DK_DEMO_PREVIEW;
    else process.env.DK_DEMO_PREVIEW = previousMode;
  }
});

test("Next matcher excludes every prepared Home photograph from the preview commerce gate", () => {
  const { unstable_doesMiddlewareMatch } = storefront(
    "next/experimental/testing/server",
  );
  const photos = JSON.parse(
    readFileSync("evidence/home-photos-assets.json", "utf8"),
  );
  for (const photo of photos) {
    for (const variant of photo.variants) {
      assert.equal(
        unstable_doesMiddlewareMatch({
          config,
          nextConfig: {},
          url: `http://127.0.0.1:8000/images/home/optimized/${variant.file}`,
        }),
        false,
        variant.file,
      );
    }
  }
  assert.equal(
    unstable_doesMiddlewareMatch({
      config,
      nextConfig: {},
      url: "http://127.0.0.1:8000/productos",
    }),
    true,
  );
});
