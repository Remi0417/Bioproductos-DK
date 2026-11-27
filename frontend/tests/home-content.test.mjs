import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { createHash } from "node:crypto";
import { createRequire } from "node:module";
import { resolve } from "node:path";
import {
  editorialPaths,
  primaryNavigation,
  pendingPages,
} from "../apps/storefront/src/content/site.ts";
import { homeMedia } from "../apps/storefront/src/content/media.ts";
import { homeContent } from "../apps/storefront/src/content/home.ts";

test("editorial route allowlist has real pages and cannot open commerce or API resources", () => {
  assert.equal(new Set(editorialPaths).size, editorialPaths.length);
  assert.equal(primaryNavigation.length, 6);
  for (const path of editorialPaths) {
    assert.ok(
      existsSync(
        `apps/storefront/src/app/(editorial)${path === "/" ? "" : path}/page.tsx`,
      ),
      path,
    );
    if (
      ![
        "/",
        "/bio-impacto",
        "/donaciones",
        "/bio-investigacion",
        "/productos",
        "/empresas",
        "/nosotras",
        "/donde-comprar",
        "/contacto",
      ].includes(path)
    )
      assert.ok(pendingPages[path], path);
  }
  for (const path of [
    "/cl/cart",
    "/cl/checkout",
    "/cl/account",
    "/admin",
    "/app",
    "/api/health",
    "/productos/private",
    "/donaciones/private",
  ])
    assert.ok(!editorialPaths.includes(path));
});

test("Contacto es una página independiente y su formulario envía la consulta a la API de Django", () => {
  assert.equal(pendingPages["/contacto"], undefined);
  const page = readFileSync(
    "apps/storefront/src/modules/dk/editorial/contact-page.tsx",
    "utf8",
  );
  const form = readFileSync(
    "apps/storefront/src/modules/dk/editorial/contact-form.tsx",
    "utf8",
  );
  assert.match(page, /Papa Juan Pablo I 2104/);
  assert.match(page, /Huérfanos 1160/);
  assert.match(page, /href="\/donde-comprar"/);
  assert.match(page, /\/images\/brand\/logo-dk-circular-original\.png/);
  assert.ok(
    existsSync(
      "apps/storefront/public/loogo/Logo circular BIO Productos DK.png",
    ),
  );
  assert.equal(
    createHash("sha256")
      .update(
        readFileSync(
          "apps/storefront/public/loogo/Logo circular BIO Productos DK.png",
        ),
      )
      .digest("hex"),
    createHash("sha256")
      .update(
        readFileSync(
          "apps/storefront/public/images/brand/logo-dk-circular-original.png",
        ),
      )
      .digest("hex"),
    "The public short-path logo must remain byte-identical to the original",
  );
  assert.match(page, /href: "tel:\+56979771179"/);
  assert.match(page, /href: "tel:\+56979840382"/);
  // El formulario valida con Zod y envía a Django (backend/contacto) con Axios.
  assert.match(form, /consultaSchema\.safeParse\(/);
  assert.match(form, /enviarConsulta\(/);
  assert.doesNotMatch(form, /window\.location\.href = `mailto:/);
  assert.doesNotMatch(form, /localStorage|sessionStorage/);
  const api = readFileSync("apps/storefront/src/lib/api/contacto.ts", "utf8");
  assert.match(api, /api\.post\("\/api\/contacto\/consultas\/"/);
});

test("Empresas envía las consultas comerciales a la API de Django", () => {
  const page = readFileSync(
    "apps/storefront/src/modules/dk/editorial/companies-page.tsx",
    "utf8",
  );
  const form = readFileSync(
    "apps/storefront/src/modules/dk/editorial/company-form.tsx",
    "utf8",
  );
  const api = readFileSync("apps/storefront/src/lib/api/empresas.ts", "utf8");
  assert.match(page, /<CompanyForm \/>/);
  assert.doesNotMatch(page, /mailto:\$\{publicContact\.email\}\?subject=/);
  // Cada camino preselecciona su tipo (mismos valores que Django).
  for (const tipo of ["punto_venta", "distribucion", "organizacion"]) {
    assert.match(page, new RegExp(`tipo: "${tipo}"`));
    assert.match(api, new RegExp(`value: "${tipo}"`));
  }
  assert.match(form, /id="solicitud-empresa"/);
  assert.match(form, /solicitudEmpresaSchema\.safeParse\(/);
  assert.match(form, /enviarSolicitudEmpresa\(/);
  assert.doesNotMatch(form, /localStorage|sessionStorage/);
  assert.match(api, /api\.post\("\/api\/empresas\/"/);
});

test("Donaciones envía las solicitudes de colaboración a la API de Django", () => {
  const page = readFileSync(
    "apps/storefront/src/app/(editorial)/donaciones/page.tsx",
    "utf8",
  );
  const form = readFileSync(
    "apps/storefront/src/modules/dk/editorial/collaboration-form.tsx",
    "utf8",
  );
  const api = readFileSync(
    "apps/storefront/src/lib/api/colaboraciones.ts",
    "utf8",
  );
  assert.match(page, /<CollaborationForm \/>/);
  assert.match(form, /id="formulario-colaboracion"/);
  assert.match(form, /colaboracionSchema\.safeParse\(/);
  assert.match(form, /enviarColaboracion\(/);
  assert.doesNotMatch(form, /localStorage|sessionStorage/);
  assert.match(api, /api\.post\("\/api\/colaboraciones\/"/);
  // La aceptación de condiciones es obligatoria, igual que en el serializer de Django.
  assert.match(api, /acepta_condiciones: z\.literal\(true/);
});

test("Donaciones comunica la investigación real sin presentar como activo un programa de recepción", () => {
  const page = readFileSync(
    "apps/storefront/src/app/(editorial)/donaciones/page.tsx",
    "utf8",
  );
  assert.match(page, /Borra de café/);
  assert.match(page, /Cáscaras de huevo/);
  assert.match(page, /Cáscaras de cítricos/);
  assert.match(page, /molienda y tamizado/);
  assert.match(page, /destilación por arrastre de vapor/);
  assert.match(page, /className="dk3-recycle-mark"/);
  assert.match(page, /id="dk3-recycle-arrow"/);
  assert.match(page, /id="dk3-recycle-gradient"/);
  assert.match(page, /viewBox="0 0 120 120"/);
  assert.match(
    readFileSync("apps/storefront/src/app/(editorial)/editorial.css", "utf8"),
    /dk3-recycle-spin 18s linear infinite/,
  );
  assert.doesNotMatch(page, /DK · CIENCIA/);
  assert.match(page, /La recepción pública de residuos aún no está habilitada/);
  assert.match(page, /confirmación antes de preparar o trasladar materiales/);
  assert.match(page, /¿Recibo un descuento o una recompensa\?/);
  assert.match(page, /no hay descuentos ni recompensas confirmados/i);
  assert.doesNotMatch(page, /https?:\/\/[^\s"']+\.(?:png|jpe?g|webp|mp4)/i);
  assert.doesNotMatch(page, /<img\b|<video\b|<Image\b/);
});

test("Bio Impacto explica economía circular con fuentes, contexto y colaboración responsable", () => {
  assert.equal(pendingPages["/bio-impacto"], undefined);
  const page = readFileSync(
    "apps/storefront/src/modules/dk/editorial/bio-impacto-page.tsx",
    "utf8",
  );
  assert.match(page, /Lo que vuelve al ciclo/);
  assert.match(page, /Borra de café/);
  assert.match(page, /Cáscara de huevo/);
  assert.match(page, /Cáscaras de cítricos/);
  assert.match(page, /Cuescos y cáscaras/);
  assert.match(page, /Actualmente no hay un programa/);
  assert.match(page, /público de recepción de residuos habilitado/);
  assert.match(page, /No es una receta única/);
  assert.match(page, /href="\/donaciones"/);
  assert.match(page, /href="\/bio-investigacion"/);
  assert.doesNotMatch(page, /<img\b|<video\b|<Image\b/);
  const symbol = readFileSync(
    "apps/storefront/src/modules/dk/editorial/bio-impacto-page.tsx",
    "utf8",
  );
  assert.equal((symbol.match(/<CircularMark\s*\/>/g) ?? []).length, 2);
  assert.match(symbol, /M27 86C22 53/);
  assert.equal((symbol.match(/<ellipse/g) ?? []).length, 2);
  assert.match(symbol, /rx="58"\s+ry="32"/);
  assert.match(symbol, /rx="52"\s+ry="25"/);
  assert.match(symbol, /className=\{styles\.orbitTrackReverse\}/);
  assert.doesNotMatch(symbol, /#E7F1D2/);
  assert.doesNotMatch(symbol, /impact-arrow|markerEnd|spinArrows|slow-turn/);
  const impactStyles = readFileSync(
    "apps/storefront/src/modules/dk/editorial/bio-impacto-page.module.css",
    "utf8",
  );
  assert.match(impactStyles, /animation: science-orbit 32s linear infinite/);
  assert.match(impactStyles, /animation-direction: reverse/);
  assert.match(impactStyles, /@keyframes science-orbit/);
  assert.doesNotMatch(impactStyles, /@keyframes orbit\b/);
});

test("Home actions resolve to editorial routes or the donation section", () => {
  let count = 0;
  function visit(value) {
    if (!value || typeof value !== "object") return;
    if ("href" in value) {
      if (value.href === "#donaciones-home") {
        assert.match(
          readFileSync(
            "apps/storefront/src/modules/dk/editorial/home.tsx",
            "utf8",
          ),
          /id="donaciones-home"/,
        );
      } else {
        assert.ok(editorialPaths.includes(value.href), value.href);
      }
      count++;
    }
    for (const child of Object.values(value)) visit(child);
  }
  visit(homeContent);
  assert.ok(count >= 15);
});

test("Nosotras is an independent page grounded in the owner-provided founder photo and story sources", () => {
  assert.equal(pendingPages["/nosotras"], undefined);
  const page = readFileSync(
    "apps/storefront/src/modules/dk/editorial/nosotras-page.tsx",
    "utf8",
  );
  assert.match(page, /id="home-founders"/);
  assert.match(page, /id="historia"/);
  assert.match(page, /2020/);
  assert.match(page, /nanoemulsiones/);
  assert.match(page, /href="\/bio-investigacion"/);
  assert.match(page, /href="\/productos"/);
});

test("Home only uses the seven owner photographs and exposes no synthetic commerce data", () => {
  assert.equal(Object.keys(homeMedia).length, 7);
  const originals = readdirSync("apps/storefront/public/images/home");
  for (const photo of Object.values(homeMedia)) {
    assert.ok(
      originals.some((name) => name.normalize("NFC") === photo.original),
    );
    assert.ok(photo.alt.length > 30);
    assert.equal(photo.widths.length, 3);
    assert.ok(photo.width > 0 && photo.height > 0);
  }
  for (const family of homeContent.products.families) {
    if (family.media) assert.ok(homeMedia[family.media]);
    assert.ok(
      !("price" in family) && !("stock" in family) && !("sku" in family),
    );
  }
  assert.deepEqual(
    homeContent.products.families.map((family) => family.title),
    [
      "Detergente aroma cítrico",
      "Champús sólidos",
      "Sales de baño",
      "Detergente aroma eucaliptus",
      "Pack de regalo",
      "Acondicionador",
    ],
  );
  assert.equal(
    new Set(homeContent.products.families.map((family) => family.id)).size,
    6,
  );
  assert.deepEqual(
    homeContent.products.families
      .filter((family) => !family.media)
      .map((family) => family.id),
    // Acondicionador sin foto propia todavía: muestra "Fotografía por
    // incorporar" en vez de una foto de otro producto.
    ["conditioner"],
  );
  assert.equal(homeContent.process.steps.length, 5);
  assert.equal(homeContent.businessPaths.length, 3);
  assert.equal(homeContent.researchTopics.length, 4);
});

test("all responsive assets decode as WebP, have the advertised widths, strip EXIF and preserve originals", async () => {
  const sharp = createRequire(resolve("apps/storefront/package.json"))("sharp");
  const baseline = JSON.parse(
    readFileSync("evidence/home-photos-originals.json", "utf8"),
  );
  const report = JSON.parse(
    readFileSync("evidence/home-photos-assets.json", "utf8"),
  );
  const dir = "apps/storefront/public/images/home";
  assert.equal(report.length, 7);
  for (const photo of Object.values(homeMedia)) {
    const entry = report.find(
      (x) => x.original.normalize("NFC") === photo.original,
    );
    const initial = baseline.find(
      (x) => x.original.normalize("NFC") === photo.original,
    );
    assert.ok(entry && initial, photo.original);
    const digest = createHash("sha256")
      .update(readFileSync(`${dir}/${entry.original}`))
      .digest("hex");
    assert.equal(
      digest,
      initial.sha256,
      "Original unchanged: " + photo.original,
    );
    assert.equal(digest, entry.sha256);
    for (const width of photo.widths) {
      const file = `${photo.slug}-${width}.webp`;
      const bytes = readFileSync(`${dir}/optimized/${file}`);
      const metadata = await sharp(bytes).metadata();
      assert.equal(metadata.format, "webp");
      assert.equal(metadata.width, width, file);
      assert.equal(
        metadata.height,
        Math.round((width * photo.height) / photo.width),
        file,
      );
      assert.equal(metadata.exif, undefined, file);
      assert.equal(metadata.xmp, undefined, file);
      await sharp(bytes).raw().toBuffer(); // Decode pixels, not just the header.
      assert.equal(
        bytes.length,
        entry.variants.find((v) => v.file === file).bytes,
      );
    }
  }
});
