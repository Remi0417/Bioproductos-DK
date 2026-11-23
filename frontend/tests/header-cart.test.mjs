import test from "node:test";
import assert from "node:assert/strict";
import { loadHeaderCartSummary } from "../apps/storefront/src/lib/util/header-cart.ts";

test("preview cart never reads cookies or calls Medusa, even with an existing session", async () => {
  const forbidden = async () => {
    assert.fail("Preview must never consult a commerce session");
  };
  const cart = await loadHeaderCartSummary({
    preview: true,
    getCartId: forbidden,
    retrieveCart: forbidden,
  });
  assert.equal(cart.status, "preview");
  assert.equal(cart.count, 0);
  assert.deepEqual(cart.items, []);
  assert.equal(cart.cartHref, null);
  assert.equal(cart.subtotal, null);
});

test("a visitor without a cart gets an empty selection without any backend call", async () => {
  const cart = await loadHeaderCartSummary({
    preview: false,
    getCartId: async () => undefined,
    retrieveCart: async () => assert.fail("No ID: no backend call"),
  });
  assert.equal(cart.status, "ready");
  assert.equal(cart.count, 0);
});

test("native cart quantities, amounts and country are shown without creating or rewriting items", async () => {
  const fixture = {
    currency_code: "clp",
    subtotal: 12500,
    shipping_address: { country_code: "CL" },
    items: [
      {
        id: "line_test_a",
        title: "Producto de prueba A",
        quantity: 2,
        total: 10000,
      },
      {
        id: "line_test_b",
        title: "Producto de prueba B",
        quantity: 1,
        total: 2500,
      },
    ],
  };
  const before = structuredClone(fixture);
  const summary = await loadHeaderCartSummary({
    preview: false,
    getCartId: async () => "cart_test",
    retrieveCart: async (id) => {
      assert.equal(id, "cart_test");
      return fixture;
    },
  });
  assert.equal(summary.status, "ready");
  assert.equal(summary.count, 3);
  assert.equal(summary.items.length, 2);
  assert.equal(summary.cartHref, "/cl/cart");
  assert.equal(summary.subtotal, "$12.500");
  assert.equal(summary.items[0].price, "$10.000");
  assert.deepEqual(fixture, before);
});

test("missing/failed session reads are unavailable, never a fake empty cart", async () => {
  for (const retrieveCart of [
    async () => null,
    async () => {
      throw new Error("Test backend offline");
    },
  ]) {
    const summary = await loadHeaderCartSummary({
      preview: false,
      getCartId: async () => "cart_test",
      retrieveCart,
    });
    assert.equal(summary.status, "unavailable");
    assert.equal(summary.count, null);
    assert.equal(summary.cartHref, null);
  }
});

test("an unknown or malformed region never invents a country or an external cart link", async () => {
  for (const defaultCountry of [undefined, "//example.invalid", "../cl"]) {
    const summary = await loadHeaderCartSummary({
      preview: false,
      getCartId: async () => "cart_test",
      retrieveCart: async () => ({ currency_code: "clp", items: [] }),
      defaultCountry,
    });
    assert.equal(summary.cartHref, null);
    assert.equal(summary.subtotal, null);
  }
});
