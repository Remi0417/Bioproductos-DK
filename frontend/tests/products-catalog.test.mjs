import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  editorialPaths,
  pendingPages,
} from "../apps/storefront/src/content/site.ts";
import { productCatalog } from "../apps/storefront/src/content/products.ts";
import { homeMedia } from "../apps/storefront/src/content/media.ts";

test("Products page is an independent editorial route and no longer pending", () => {
  assert.ok(editorialPaths.includes("/productos"));
  assert.equal(pendingPages["/productos"], undefined);
});

test("category picker has readable active contrast in light and dark themes", () => {
  const styles = readFileSync(
    "apps/storefront/src/modules/dk/editorial/products-page.module.css",
    "utf8",
  );
  assert.match(styles, /\.categoryChoiceActive\s*\{[^}]*color:\s*#22573e/);
  assert.match(styles, /\.categoryChoiceActive::after\s*\{[^}]*height:\s*2px/);
  assert.match(
    styles,
    /html\[data-theme="dark"\] \.categoryChoiceActive\s*\{[^}]*color:\s*#c5e5af/,
  );
});

test("Product catalog covers the reported families without inventing prices or stock", () => {
  assert.deepEqual(
    productCatalog.map((product) => product.name),
    [
      "Detergente para ropa · aroma cítrico",
      "Detergente para ropa · aroma a eucalipto",
      "Shampoo sólido",
      "Sales de baño",
      "Jabón de cuidado personal",
      "Acondicionador capilar",
    ],
  );
  assert.deepEqual(productCatalog[2].variants, [
    "Cabello seco",
    "Cabello graso",
    "Cabello normal",
  ]);
  assert.equal(productCatalog[3].variants.length, 3);
  assert.match(productCatalog[3].variantNote, /por confirmar/i);
  assert.match(productCatalog[2].description, /cabello seco, graso o normal/i);
  assert.match(productCatalog[2].name, /^Shampoo sólido$/);
  assert.match(
    productCatalog[3].description,
    /consulta los nombres y detalles/i,
  );
  for (const product of productCatalog) {
    assert.ok(product.id && product.description.length > 70);
    assert.match(product.description, /[.!]$/);
    assert.doesNotMatch(
      product.description,
      /eucaliptus|champú|catalogo referido/i,
    );
    assert.ok(
      !("price" in product) && !("stock" in product) && !("sku" in product),
    );
    if (product.media) assert.ok(homeMedia[product.media]);
  }
});
