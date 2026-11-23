import assert from "node:assert/strict";

const base = "http://127.0.0.1:8000";
const health = await fetch(`${base}/api/health`, {
  signal: AbortSignal.timeout(10000),
});
assert.equal(health.status, 200);
assert.equal((await health.json()).service, "dk-storefront");
const page = await fetch(`${base}/`, {
  signal: AbortSignal.timeout(60000),
});
assert.equal(page.status, 200);
const html = await page.text();
const heroHeading = html
  .match(/<h1\b[^>]*id="hero-heading"[^>]*>([\s\S]*?)<\/h1>/)?.[1]
  ?.replace(/<[^>]*>/g, "")
  .replace(/\s+/g, " ")
  .trim();
assert.equal(heroHeading, "Todo nace de la ciencia.");
assert.match(html, /home-hero/);
assert.doesNotMatch(
  html,
  /<meta[^>]+(?:property="og:image"|name="twitter:image")/,
);
assert.equal(page.headers.get("x-content-type-options"), "nosniff");
assert.equal(page.headers.get("x-frame-options"), "DENY");
assert.match(page.headers.get("x-robots-tag"), /noindex/);
const blocked = await fetch(`${base}/cl/checkout`, {
  signal: AbortSignal.timeout(10000),
});
assert.equal(
  blocked.status,
  503,
  "El smoke de esta fase requiere DK_DEMO_PREVIEW=true.",
);
for (const path of [
  "/nosotras",
  "/bio-investigacion",
  "/productos",
  "/empresas",
  "/contacto",
  "/bio-impacto",
  "/donde-comprar",
  "/informacion-legal",
]) {
  const response = await fetch(`${base}${path}`, {
    signal: AbortSignal.timeout(60000),
  });
  assert.equal(response.status, 200, path);
  assert.match(await response.text(), /Esta sección se está preparando/);
}
const donationPage = await fetch(`${base}/donaciones`, {
  signal: AbortSignal.timeout(60000),
});
assert.equal(donationPage.status, 200);
const donationHtml = await donationPage.text();
assert.match(donationHtml, /Tus residuos,/);
assert.match(donationHtml, /nuevas posibilidades/);
assert.match(donationHtml, /La recepción pública aún no está habilitada/);
assert.match(donationHtml, /mailto:biocontacto@bioproductosdk\.com/);
assert.doesNotMatch(donationHtml, /<form\b/);
console.log(
  "Smoke HTTP: Home con fotografías originales, nueve destinos independientes, incluida Donaciones, health, cabeceras y checkout bloqueado OK. No verifica Medusa ni PostgreSQL.",
);

for (const photo of [
  "coleccion-640",
  "detergente-480",
  "champu-480",
  "sales-480",
  "botellas-480",
  "fundadoras-480",
]) {
  const response = await fetch(`${base}/images/home/optimized/${photo}.webp`);
  assert.equal(response.status, 200, photo);
  assert.match(response.headers.get("content-type"), /image\/webp/);
  const bytes = Buffer.from(await response.arrayBuffer());
  assert.equal(bytes.subarray(8, 12).toString(), "WEBP");
}
console.log("Las seis fotografías responden como WebP locales.");
