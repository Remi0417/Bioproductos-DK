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
];
const originals = await readdir(directory);
const output = `${directory}/optimized`;
await mkdir(output, { recursive: true });
const report = [];
for (const [expected, slug, widths] of selections) {
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
  `Preparadas ${report.reduce((n, photo) => n + photo.variants.length, 0)} variantes WebP; seis originales intactos. Sin EXIF/GPS en los derivados.`,
);
