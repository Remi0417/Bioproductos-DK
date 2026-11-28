// Format conversion and resizing of owner-supplied originals only. No retouching.
import { readFile, readdir, mkdir, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { resolve } from "node:path";
import { createHash } from "node:crypto";

const require = createRequire(resolve("apps/storefront/package.json"));
const sharp = require("sharp");
const directory = "apps/storefront/public/images/home";
const selections = [
  ["foto principal.JPG", "coleccion", [640, 1280, 2240]],
  ["detergente modelo.JPG", "detergente", [480, 960, 1600]],
  ["jabon modelo.JPG", "champu", [480, 960, 1600]],
  ["sales de bañoo.JPG", "sales", [480, 960, 1600]],
  ["detergente.JPG", "botellas", [480, 960, 1600]],
  ["Dueñas dk.JPG", "fundadoras", [480, 960, 1440]],
  ["pack de regalo.JPG", "pack-regalo", [480, 960, 1600]],
  ["fundadoras pendones.JPG", "fundadoras-pendones", [640, 1280, 2240]],
];
// ONLY=pack-regalo procesa solo esas fotos y conserva el resto del reporte
// (útil porque las fotos HEIC necesitan una herramienta que no siempre está).
const only = process.env.ONLY?.split(",").filter(Boolean);
const originals = await readdir(directory);
const output = `${directory}/optimized`;
await mkdir(output, { recursive: true });
const previous = only
  ? JSON.parse(await readFile("evidence/home-photos-assets.json", "utf8"))
  : [];
const report = [];
for (const [expected, slug, widths] of selections) {
  if (only && !only.includes(slug)) {
    const kept = previous.find(
      (photo) => photo.original.normalize("NFC") === expected,
    );
    if (!kept) throw new Error(`Falta en el reporte anterior: ${expected}`);
    report.push(kept);
    continue;
  }
  const filename = originals.find((name) => name.normalize("NFC") === expected);
  if (!filename) throw new Error(`No se encontró el original: ${expected}`);
  const original = await readFile(`${directory}/${filename}`);
  const sha256 = createHash("sha256").update(original).digest("hex");
  const isHeic = original.subarray(4, 8).toString() === "ftyp";
  let input = original;
  if (isHeic) {
    // The local libvips build lacks an HEVC decoder. Use an isolated, optional
    // WASM conversion utility, never a browser/runtime dependency.
    const convert = createRequire(resolve(".local/photo-tools/package.json"))(
      "heic-convert",
    );
    input = Buffer.from(
      await convert({ buffer: original, format: "JPEG", quality: 1 }),
    );
  }
  const variants = [];
  for (const width of widths) {
    const filename = `${slug}-${width}.webp`;
    const info = await sharp(input)
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 84, effort: 5 })
      .toFile(`${output}/${filename}`);
    variants.push({
      file: filename,
      width: info.width,
      height: info.height,
      bytes: info.size,
    });
  }
  if (
    createHash("sha256")
      .update(await readFile(`${directory}/${filename}`))
      .digest("hex") !== sha256
  )
    throw new Error(`El original cambió: ${filename}`);
  report.push({
    original: filename,
    sha256,
    bytes: original.length,
    format: isHeic ? "HEIC" : "JPEG",
    variants,
  });
}
await mkdir("evidence", { recursive: true });
await writeFile(
  "evidence/home-photos-assets.json",
  JSON.stringify(report, null, 2) + "\n",
);
console.log(
  `Preparadas ${report.reduce((n, photo) => n + photo.variants.length, 0)} variantes WebP; ${report.length} originales intactos. Sin EXIF/GPS en los derivados.`,
);
