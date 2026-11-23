import test from "node:test";
import assert from "node:assert/strict";
import {
  addDemoCartEntry,
  demoCartKey,
  demoPrices,
  formatDemoPrice,
  getDemoCartLines,
  normalizeDemoCart,
  readDemoCart,
  setDemoCartQuantity,
} from "../apps/storefront/src/lib/util/demo-cart.ts";
import { productCatalog } from "../apps/storefront/src/content/products.ts";

test("local demo cart supports every catalog item and makes its fictional prices explicit", () => {
  assert.deepEqual(
    Object.keys(demoPrices).sort(),
    productCatalog.map((product) => product.id).sort(),
  );
  assert.equal(formatDemoPrice(demoPrices["detergent-citrus"]), "$6.990");
  const entries = productCatalog.flatMap((product) =>
    product.variants
      ? product.variants.map((variant) => ({
          productId: product.id,
          variant,
          quantity: 1,
        }))
      : [{ productId: product.id, quantity: 1 }],
  );
  assert.equal(getDemoCartLines(entries, productCatalog).length, 10);
  assert.ok(
    getDemoCartLines(entries, productCatalog).every((line) => line.total > 0),
  );
});

test("cart merges identical variants, updates quantities and removes zero-count rows", () => {
  const first = addDemoCartEntry(
    [],
    "solid-shampoo",
    productCatalog,
    "Cabello graso",
  );
  const merged = addDemoCartEntry(
    first,
    "solid-shampoo",
    productCatalog,
    "Cabello graso",
  );
  assert.equal(merged.length, 1);
  assert.equal(merged[0].quantity, 2);
  const key = demoCartKey("solid-shampoo", "Cabello graso");
  assert.equal(getDemoCartLines(merged, productCatalog)[0].total, 10980);
  assert.deepEqual(setDemoCartQuantity(merged, key, 0, productCatalog), []);
});

test("catalog quantity is added in one action and remains within the demo limit", () => {
  const selected = addDemoCartEntry([], "soap", productCatalog, undefined, 4);
  assert.equal(selected[0].quantity, 4);
  const capped = addDemoCartEntry(
    selected,
    "soap",
    productCatalog,
    undefined,
    16,
  );
  assert.equal(capped[0].quantity, 20);
});

test("cart rejects malformed storage, unknown products, invalid variants and excessive quantities", () => {
  assert.deepEqual(readDemoCart("not-json", productCatalog), []);
  assert.deepEqual(
    normalizeDemoCart(
      [
        { productId: "unknown", quantity: 1 },
        { productId: "solid-shampoo", quantity: 1 },
        { productId: "solid-shampoo", variant: "Inventado", quantity: 1 },
        { productId: "soap", quantity: 500 },
        { productId: "soap", quantity: 2 },
      ],
      productCatalog,
    ),
    [{ productId: "soap", quantity: 2 }],
  );
});
