#!/usr/bin/env node
// Run from this repository on a Mac where localhost and Chrome are available.
// This script reads the running site. It never submits forms or purchases.
import { readdir, mkdir, writeFile, stat, rm } from "node:fs/promises";
import path from "node:path";
import os from "node:os";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";
import { chromium } from "@playwright/test";
import sharp from "sharp";

const here = path.dirname(fileURLToPath(import.meta.url));
const repo = path.resolve(here, "..");
const args = process.argv.slice(2);
function arg(flag, fallback) {
  const i = args.indexOf(flag);
  return i === -1 ? fallback : args[i + 1];
}
const baseURL = arg("--base-url", "http://127.0.0.1:8012").replace(/\/$/, "");
const out = path.resolve(
  arg("--output", path.join(os.homedir(), "Desktop/figmaadk")),
);
const routeRoot = path.join(repo, "apps/storefront/src/app/(editorial)");
async function discoverRoutes(dir = routeRoot, prefix = "") {
  const found = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.isFile() && entry.name === "page.tsx") found.push(prefix || "/");
    if (
      entry.isDirectory() &&
      !entry.name.startsWith("[") &&
      !entry.name.startsWith("(")
    )
      found.push(
        ...(await discoverRoutes(
          path.join(dir, entry.name),
          `${prefix}/${entry.name}`,
        )),
      );
  }
  return found;
}
const routes = (await discoverRoutes()).sort((a, b) =>
  a === "/" ? -1 : b === "/" ? 1 : a.localeCompare(b),
);
try {
  await stat(path.join(repo, "apps/storefront/src/app/demo/page.tsx"));
  routes.push("/demo");
} catch {}
const names = {
  "/": "Home",
  "/productos": "Productos",
  "/donaciones": "Donaciones",
  "/bio-investigacion": "Bio-Investigacion",
  "/bio-impacto": "Bio-Impacto",
  "/empresas": "Empresas",
  "/nosotras": "Nosotras",
  "/contacto": "Contacto",
  "/donde-comprar": "Donde-Comprar",
  "/informacion-legal": "Informacion-Legal",
  "/demo": "Demo",
};
const pageName = (route) => names[route] || route.slice(1).replaceAll("/", "-");
if (args.includes("--preflight")) {
  console.log(
    JSON.stringify(
      {
        frontend: routeRoot,
        output: out,
        routes: routes.map((route) => ({
          route,
          svg: `${pageName(route)}.svg`,
        })),
      },
      null,
      2,
    ),
  );
  process.exit(0);
}
const viewports = [
  { name: "DESKTOP", width: 1440, height: 900, folder: "01_PAGINAS_DESKTOP" },
  { name: "TABLET", width: 768, height: 1024, folder: "02_PAGINAS_TABLET" },
  { name: "MOBILE", width: 390, height: 844, folder: "03_PAGINAS_MOBILE" },
];
for (const viewport of viewports)
  await mkdir(path.join(out, viewport.folder), { recursive: true });
await mkdir(path.join(out, "07_VISTAS_PREVIAS"), { recursive: true });
const safe = (value) =>
  value.replaceAll(/[^a-z0-9-]+/gi, "-").replaceAll(/^-|-$/g, "") || "Home";
const xml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
function splitCss(value) {
  const result = [];
  let depth = 0,
    start = 0;
  for (let i = 0; i < value.length; i++) {
    if (value[i] === "(") depth++;
    if (value[i] === ")") depth--;
    if (value[i] === "," && depth === 0) {
      result.push(value.slice(start, i).trim());
      start = i + 1;
    }
  }
  result.push(value.slice(start).trim());
  return result;
}
function svgGradient(css, id) {
  const match = css.match(/^(linear|radial)-gradient\((.*)\)$/s);
  if (!match) return null;
  const type = match[1],
    args = splitCss(match[2]);
  let angle = 180;
  if (type === "linear" && /^(to\s+|[-\d.]+deg)/.test(args[0])) {
    const direction = args.shift();
    if (direction.includes("deg")) angle = Number.parseFloat(direction);
    else if (direction.includes("right")) angle = 90;
    else if (direction.includes("left")) angle = 270;
    else if (direction.includes("top")) angle = 0;
  } else if (
    type === "radial" &&
    /^(circle|ellipse|closest|farthest|at\s)/.test(args[0])
  )
    args.shift();
  if (args.length < 2) return null;
  const stops = args
    .map((arg, i) => {
      const stop = arg.match(/^(.*?)(?:\s+(\d+(?:\.\d+)?%))?$/s);
      return `<stop offset="${stop?.[2] || `${Math.round((i * 100) / (args.length - 1))}%`}" stop-color="${xml(stop?.[1]?.trim() || arg)}"/>`;
    })
    .join("");
  if (type === "radial")
    return `<radialGradient id="${id}">${stops}</radialGradient>`;
  const radians = (angle * Math.PI) / 180;
  const x1 = (1 - Math.sin(radians)) * 50,
    y1 = (1 + Math.cos(radians)) * 50;
  return `<linearGradient id="${id}" x1="${x1}%" y1="${y1}%" x2="${100 - x1}%" y2="${100 - y1}%">${stops}</linearGradient>`;
}
async function save(file, data) {
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, data);
}
const progressPath = path.join(out, "PROGRESO_EXPORTACION.md");
const completed = [];
const failed = [];
async function progress() {
  await save(
    progressPath,
    "# Progreso de exportación BioProductos DK\n\n" +
      `Servidor: \`${baseURL}\`. Fecha: ${new Date().toISOString()}.\n\n` +
      `Pantallas capturadas: ${completed.length}. Fallos: ${failed.length}.\n\n` +
      "## Capturas completas\n\n" +
      completed.map((x) => `- ${x}`).join("\n") +
      "\n\n" +
      "## Pendientes o bloqueadas\n\n" +
      failed.map((x) => `- ${x}`).join("\n") +
      "\n",
  );
}
// Only same-origin, public paths. Dynamic templates are discovered via links.
const queued = new Set(routes);
const seen = new Set();
const navigation = [];
const screenRecords = [];
const imageCache = new Map();
let ownServer;
async function serverReady() {
  try {
    const response = await fetch(baseURL, {
      signal: AbortSignal.timeout(2500),
    });
    return response.ok;
  } catch {
    return false;
  }
}
if (!(await serverReady())) {
  console.log("Compilando la web para exportar sus estilos y páginas reales…");
  await new Promise((resolve, reject) => {
    const build = spawn(
      "npm",
      ["run", "build", "--workspace=@dtc/storefront"],
      {
        cwd: repo,
        stdio: "inherit",
        env: process.env,
      },
    );
    build.on("error", reject);
    build.on("exit", (code) =>
      code === 0
        ? resolve()
        : reject(new Error(`La compilación terminó con código ${code}`)),
    );
  });
  const port = new URL(baseURL).port || "8012";
  ownServer = spawn(
    "node",
    [
      path.join(repo, "apps/storefront/node_modules/next/dist/bin/next"),
      "start",
      "-p",
      port,
      "-H",
      "127.0.0.1",
    ],
    {
      cwd: path.join(repo, "apps/storefront"),
      stdio: ["ignore", "pipe", "pipe"],
      env: process.env,
    },
  );
  let serverLog = "";
  for (const stream of [ownServer.stdout, ownServer.stderr])
    stream.on("data", (chunk) => {
      serverLog = (serverLog + chunk.toString()).slice(-8000);
    });
  for (let i = 0; i < 40 && !(await serverReady()); i++) {
    if (ownServer.exitCode !== null) break;
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  if (!(await serverReady())) {
    ownServer.kill("SIGTERM");
    throw new Error(`No se pudo iniciar ${baseURL}. Salida: ${serverLog}`);
  }
}
process.on("exit", () => ownServer?.kill("SIGTERM"));
let browser;
try {
  browser = await chromium.launch({
    channel: "chrome",
    headless: true,
    args: ["--disable-gpu"],
  });
} catch (error) {
  console.error(`No se pudo iniciar Chrome: ${error.message}`);
  ownServer?.kill("SIGTERM");
  process.exit(1);
}
async function embedImage(request, source) {
  if (!source) return null;
  if (source.startsWith("data:")) return source;
  let url;
  try {
    url = new URL(source, baseURL);
  } catch {
    return null;
  }
  if (url.origin !== new URL(baseURL).origin) return null;
  if (imageCache.has(url.href)) return imageCache.get(url.href);
  try {
    const response = await request.get(url.href, { timeout: 15000 });
    if (!response.ok()) return null;
    let type = response.headers()["content-type"]?.split(";")[0] || "image/png";
    if (!type.startsWith("image/")) return null;
    let body = await response.body();
    if (type === "image/webp" || type === "image/avif") {
      body = await sharp(body).jpeg({ quality: 92, mozjpeg: true }).toBuffer();
      type = "image/jpeg";
    }
    const value = `data:${type};base64,${body.toString("base64")}`;
    imageCache.set(url.href, value);
    return value;
  } catch {
    return null;
  }
}
async function snapshot(page, route, viewport, suffix = "") {
  const preflightHeight = await page.evaluate(() =>
    Math.max(document.documentElement.scrollHeight, document.body.scrollHeight),
  );
  if (preflightHeight > 45000)
    throw new Error(
      `Altura anómala (${preflightHeight}px): se interrumpe esta captura para evitar un SVG incompleto o sin estilos.`,
    );
  await page.evaluate(async () => {
    const wait = (milliseconds) =>
      new Promise((resolve) => setTimeout(resolve, milliseconds));
    await Promise.race([document.fonts.ready, wait(12000)]);
    for (const image of document.images) image.loading = "eager";
    await Promise.race([
      Promise.all(
        [...document.images].map((image) => image.decode().catch(() => null)),
      ),
      wait(12000),
    ]);
    window.scrollTo(0, 0);
  });
  const slug = safe(pageName(route));
  const base = `${slug}${suffix}`;
  const pngPath = path.join(
    out,
    "07_VISTAS_PREVIAS",
    viewport.name,
    `${base}.png`,
  );
  await mkdir(path.dirname(pngPath), { recursive: true });
  const screenshot = await page.screenshot({
    fullPage: true,
    animations: "disabled",
    path: pngPath,
  });
  const dom = await page.evaluate(() => {
    // Geometry and computed styles are read from the actual rendered page.
    const height = Math.ceil(
      Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight,
      ),
    );
    const width = document.documentElement.clientWidth;
    const elements = [];
    const links = [];
    const rectOf = (element) => {
      const r = element.getBoundingClientRect();
      return {
        x: r.left + scrollX,
        y: r.top + scrollY,
        width: r.width,
        height: r.height,
      };
    };
    const valid = (rect) =>
      rect.width > 0 &&
      rect.height > 0 &&
      rect.x < width &&
      rect.x + rect.width > 0 &&
      rect.y < height;
    const measureCanvas = document.createElement("canvas").getContext("2d");
    const intersect = (first, second) =>
      first
        ? {
            x: Math.max(first.x, second.x),
            y: Math.max(first.y, second.y),
            width: Math.max(
              0,
              Math.min(first.x + first.width, second.x + second.width) -
                Math.max(first.x, second.x),
            ),
            height: Math.max(
              0,
              Math.min(first.y + first.height, second.y + second.height) -
                Math.max(first.y, second.y),
            ),
          }
        : second;
    const walk = (element, inheritedOpacity = 1, inheritedClip = null) => {
      if (!(element instanceof HTMLElement || element instanceof SVGElement))
        return;
      if (["SCRIPT", "STYLE", "NOSCRIPT", "TEMPLATE"].includes(element.tagName))
        return;
      const style = getComputedStyle(element);
      if (
        style.display === "none" ||
        style.visibility !== "visible" ||
        Number(style.opacity) === 0
      )
        return;
      const rect = rectOf(element);
      if (!valid(rect)) return;
      if (inheritedClip) {
        const visible = intersect(inheritedClip, rect);
        if (!visible.width || !visible.height) return;
      }
      const effectiveOpacity = inheritedOpacity * Number(style.opacity || 1);
      const nextClip = /hidden|clip/.test(style.overflowX + style.overflowY)
        ? intersect(inheritedClip, rect)
        : inheritedClip;
      if (
        element.matches(
          "a[href],button,summary,input,select,textarea,[role=button]",
        )
      ) {
        links.push({
          tag: element.tagName.toLowerCase(),
          text: (
            element.getAttribute("aria-label") ||
            element.textContent ||
            ""
          )
            .trim()
            .replace(/\s+/g, " ")
            .slice(0, 180),
          href: element.getAttribute("href"),
          type: element.getAttribute("type"),
          pressed: element.getAttribute("aria-pressed"),
          expanded: element.getAttribute("aria-expanded"),
          disabled: element.hasAttribute("disabled"),
          rect,
        });
      }
      const data = {
        tag: element.tagName.toLowerCase(),
        rect,
        background: style.backgroundColor,
        backgroundImage: style.backgroundImage,
        radius: style.borderRadius,
        border: style.border,
        borderColor: style.borderTopColor,
        borderWidth: style.borderTopWidth,
        borderStyle: style.borderTopStyle,
        opacity: effectiveOpacity,
        clip: inheritedClip,
        boxShadow: style.boxShadow,
        color: style.color,
        font: style.fontFamily,
        fontSize: style.fontSize,
        fontWeight: style.fontWeight,
        fontStyle: style.fontStyle,
        letterSpacing: style.letterSpacing,
        textDecoration: style.textDecorationLine,
        lineHeight: style.lineHeight,
        textTransform: style.textTransform,
        objectFit: style.objectFit,
        objectPosition: style.objectPosition,
        overflow: style.overflow,
      };
      if (element instanceof HTMLImageElement) {
        elements.push({
          ...data,
          kind: "image",
          src: element.currentSrc || element.src,
          alt: element.alt,
          naturalWidth: element.naturalWidth,
          naturalHeight: element.naturalHeight,
        });
        return;
      }
      if (
        element instanceof SVGElement &&
        element.tagName.toLowerCase() === "svg"
      ) {
        const clone = element.cloneNode(true);
        const sourceNodes = [element, ...element.querySelectorAll("*")];
        const cloneNodes = [clone, ...clone.querySelectorAll("*")];
        sourceNodes.forEach((sourceNode, index) => {
          const computed = getComputedStyle(sourceNode);
          const target = cloneNodes[index];
          for (const attr of [
            "fill",
            "stroke",
            "stroke-width",
            "stroke-linecap",
            "stroke-linejoin",
            "color",
          ])
            if (computed.getPropertyValue(attr))
              target.setAttribute(attr, computed.getPropertyValue(attr));
          target.removeAttribute("class");
        });
        clone.setAttribute("width", String(rect.width));
        clone.setAttribute("height", String(rect.height));
        clone.removeAttribute("opacity");
        const prefix = `dk-export-${elements.length}-`;
        clone
          .querySelectorAll("[id]")
          .forEach((node) => node.setAttribute("id", prefix + node.id));
        let markup = clone.outerHTML;
        for (const node of element.querySelectorAll("[id]")) {
          const escaped = node.id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
          markup = markup.replaceAll(
            new RegExp(`url\\(#${escaped}\\)`, "g"),
            `url(#${prefix}${node.id})`,
          );
          markup = markup.replaceAll(
            new RegExp(`href=(["'])#${escaped}\\1`, "g"),
            `href="#${prefix}${node.id}"`,
          );
        }
        elements.push({ ...data, kind: "svg", markup });
        return;
      }
      if (
        element instanceof HTMLIFrameElement ||
        element instanceof HTMLCanvasElement ||
        element instanceof HTMLVideoElement
      ) {
        elements.push({
          ...data,
          kind: "complex",
          reason: element.tagName.toLowerCase(),
        });
        return;
      }
      if (
        style.backgroundColor !== "rgba(0, 0, 0, 0)" ||
        style.backgroundImage !== "none" ||
        (parseFloat(style.borderTopWidth) > 0 &&
          style.borderTopStyle !== "none")
      ) {
        elements.push({ ...data, kind: "box" });
      }
      for (const node of element.childNodes) {
        if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()) {
          const content = node.textContent;
          const words = [];
          measureCanvas.font = style.font;
          for (const match of content.matchAll(/\S+/g)) {
            const range = document.createRange();
            range.setStart(node, match.index);
            range.setEnd(node, match.index + match[0].length);
            const r = range.getBoundingClientRect();
            if (r.width && r.height) {
              const metrics = measureCanvas.measureText(match[0]);
              words.push({
                text: match[0],
                x: r.x + scrollX,
                y: r.y + scrollY,
                height: r.height,
                baseline:
                  r.y +
                  scrollY +
                  (r.height +
                    metrics.actualBoundingBoxAscent -
                    metrics.actualBoundingBoxDescent) /
                    2,
              });
            }
          }
          if (words.length)
            elements.push({ kind: "text", words, ...data, clip: nextClip });
        } else if (node.nodeType === Node.ELEMENT_NODE)
          walk(node, effectiveOpacity, nextClip);
      }
    };
    walk(document.body);
    return {
      width,
      height,
      elements,
      links,
      title: document.title,
      url: location.href,
      pageBackground: getComputedStyle(document.body).backgroundColor,
    };
  });
  const defs = [];
  const parts = [];
  const complex = [];
  for (let i = 0; i < dom.elements.length; i++) {
    const element = dom.elements[i];
    const partStart = parts.length;
    const { x, y, width, height } = element.rect;
    const id = `e${i}`;
    if (element.kind === "box") {
      let fill = element.background;
      if (fill === "rgba(0, 0, 0, 0)") fill = "none";
      const baseFill = fill;
      if (element.backgroundImage !== "none") {
        const layers = splitCss(element.backgroundImage);
        const gradient = svgGradient(layers[0], `gradient-${id}`);
        if (gradient) {
          defs.push(gradient);
          fill = `url(#gradient-${id})`;
          if (baseFill !== "none")
            parts.push(
              `<rect x="${x}" y="${y}" width="${width}" height="${height}" rx="${parseFloat(element.radius) || 0}" fill="${xml(baseFill)}" opacity="${element.opacity}"/>`,
            );
        }
        if (!gradient || layers.length > 1)
          complex.push({
            element: id,
            type: "css-background-parcial",
            value: element.backgroundImage.slice(0, 300),
          });
      }
      const border =
        parseFloat(element.borderWidth) > 0 && element.borderStyle !== "none";
      parts.push(
        `<rect id="${id}" x="${x}" y="${y}" width="${width}" height="${height}" rx="${parseFloat(element.radius) || 0}" fill="${xml(fill)}" opacity="${element.opacity}"${border ? ` stroke="${xml(element.borderColor)}" stroke-width="${parseFloat(element.borderWidth)}"` : ""}/>`,
      );
    } else if (element.kind === "image") {
      const href = await embedImage(page.request, element.src);
      if (!href) {
        complex.push({
          element: id,
          type: "unavailable-image",
          value: element.src,
        });
        continue;
      }
      const clip = `clip-${id}`;
      defs.push(
        `<clipPath id="${clip}"><rect x="${x}" y="${y}" width="${width}" height="${height}" rx="${parseFloat(element.radius) || 0}"/></clipPath>`,
      );
      const nw = element.naturalWidth || width,
        nh = element.naturalHeight || height;
      const scale =
        element.objectFit === "contain"
          ? Math.min(width / nw, height / nh)
          : Math.max(width / nw, height / nh);
      const actualWidth = nw * scale,
        actualHeight = nh * scale;
      const [posX = "50%", posY = "50%"] = element.objectPosition.split(/\s+/);
      const fraction = (value) =>
        value === "left" || value === "top"
          ? 0
          : value === "right" || value === "bottom"
            ? 1
            : value.endsWith("%")
              ? Math.min(1, Math.max(0, Number.parseFloat(value) / 100))
              : 0.5;
      const imageX = x + (width - actualWidth) * fraction(posX);
      const imageY = y + (height - actualHeight) * fraction(posY);
      parts.push(
        `<image id="${id}" x="${imageX}" y="${imageY}" width="${actualWidth}" height="${actualHeight}" href="${href}" opacity="${element.opacity}" preserveAspectRatio="none" clip-path="url(#${clip})"/>`,
      );
    } else if (element.kind === "text") {
      const font = element.font.split(",")[0].replaceAll('"', "").trim();
      const size = parseFloat(element.fontSize) || 15;
      const weight = element.fontWeight;
      const transform = element.textTransform;
      for (let j = 0; j < element.words.length; j++) {
        const word = element.words[j];
        let text = word.text;
        if (transform === "uppercase") text = text.toUpperCase();
        if (transform === "lowercase") text = text.toLowerCase();
        if (transform === "capitalize")
          text = text.charAt(0).toUpperCase() + text.slice(1);
        parts.push(
          `<text id="${id}-w${j}" x="${word.x}" y="${word.baseline}" font-family="${xml(font)}" font-size="${size}" font-weight="${xml(weight)}" font-style="${xml(element.fontStyle)}" text-decoration="${xml(element.textDecoration)}" letter-spacing="${xml(element.letterSpacing === "normal" ? "0" : element.letterSpacing)}" fill="${xml(element.color)}" opacity="${element.opacity}">${xml(text)}</text>`,
        );
      }
    } else if (element.kind === "svg") {
      const markup = element.markup;
      // SVG inline may carry IDs and stylesheet-dependent classes; record this.
      if (/\sid=/.test(markup) || /\sclass=/.test(markup))
        complex.push({
          element: id,
          type: "inline-svg-css-or-ids",
          value: "Revisar en Figma",
        });
      parts.push(
        `<g id="${id}" opacity="${element.opacity}" transform="translate(${x} ${y})">${markup}</g>`,
      );
    } else if (element.kind === "complex") {
      const cropped = await page
        .screenshot({
          clip: {
            x: Math.max(0, x),
            y: Math.max(0, y),
            width: Math.min(width, dom.width - Math.max(0, x)),
            height: Math.min(height, dom.height - Math.max(0, y)),
          },
          animations: "disabled",
        })
        .catch(() => null);
      if (cropped)
        parts.push(
          `<image id="${id}" x="${x}" y="${y}" width="${width}" height="${height}" href="data:image/png;base64,${cropped.toString("base64")}"/>`,
        );
      complex.push({
        element: id,
        type: element.reason,
        value: "Elemento aislado rasterizado",
      });
    }
    if (element.clip && parts.length > partStart) {
      const clipId = `overflow-${id}`;
      const clip = element.clip;
      defs.push(
        `<clipPath id="${clipId}"><rect x="${clip.x}" y="${clip.y}" width="${clip.width}" height="${clip.height}"/></clipPath>`,
      );
      parts.splice(
        partStart,
        parts.length - partStart,
        `<g clip-path="url(#${clipId})">`,
        ...parts.slice(partStart),
        "</g>",
      );
    }
  }
  const pageBackground =
    dom.pageBackground === "rgba(0, 0, 0, 0)" ? "#ffffff" : dom.pageBackground;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${dom.width}" height="${dom.height}" viewBox="0 0 ${dom.width} ${dom.height}" role="img" aria-label="${xml(dom.title)}"><defs>${defs.join("")}</defs><rect width="100%" height="100%" fill="${xml(pageBackground)}"/>${parts.join("\n")}</svg>\n`;
  const svgPath = path.join(out, viewport.folder, `${base}.svg`);
  await save(svgPath, svg);
  let svgRendered = false;
  let pixelDifference = null;
  try {
    const rendered = await sharp(Buffer.from(svg), { limitInputPixels: false })
      .png()
      .toBuffer();
    await save(
      path.join(out, "07_VISTAS_PREVIAS", viewport.name, `${base}-svg.png`),
      rendered,
    );
    const comparisonWidth = Math.min(480, dom.width);
    const reference = await sharp(screenshot)
      .resize({ width: comparisonWidth })
      .removeAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });
    const replica = await sharp(rendered)
      .resize({
        width: comparisonWidth,
        height: reference.info.height,
        fit: "fill",
      })
      .removeAlpha()
      .raw()
      .toBuffer();
    let difference = 0;
    for (let index = 0; index < reference.data.length; index++)
      difference += Math.abs(reference.data[index] - replica[index]);
    pixelDifference = Number(
      (difference / (reference.data.length * 255)).toFixed(5),
    );
    svgRendered = true;
  } catch (error) {
    complex.push({
      element: "document",
      type: "svg-render-error",
      value: error.message,
    });
    failed.push(
      `${route} · ${viewport.name}${suffix}: SVG no renderiza (${error.message})`,
    );
  }
  await save(
    path.join(
      out,
      "08_DOCUMENTACION",
      `${base}-${viewport.name.toLowerCase()}-limitaciones.json`,
    ),
    JSON.stringify(complex, null, 2) + "\n",
  );
  for (const link of dom.links) {
    navigation.push({
      pageOrigin: route,
      viewport: viewport.name,
      elementId: null,
      visibleText: link.text,
      interaction: link.tag,
      destination: link.href,
      visualState: {
        pressed: link.pressed,
        expanded: link.expanded,
        disabled: link.disabled,
      },
      svgScreen: path.relative(out, svgPath).replaceAll(path.sep, "/"),
      bounds: link.rect,
      verification: "browser-observed",
    });
    if (link.href?.startsWith("/")) {
      const pathname = new URL(link.href, baseURL).pathname;
      if (routes.includes(pathname) && queued.size < 80) queued.add(pathname);
    }
  }
  screenRecords.push({
    route,
    viewport: viewport.name,
    width: dom.width,
    height: dom.height,
    svg: path.relative(out, svgPath),
    png: path.relative(out, pngPath),
    complexCount: complex.length,
    screenshotBytes: screenshot.length,
    svgRendered,
    pixelDifference,
  });
  completed.push(`${route} · ${viewport.name} (${dom.width}×${dom.height})`);
  await progress();
  return dom;
}

let count = 0;
for (const route of queued) {
  if (seen.has(route) || count >= 80) continue;
  seen.add(route);
  count++;
  for (const viewport of viewports) {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      deviceScaleFactor: 1,
      reducedMotion: "reduce",
      locale: "es-CL",
    });
    const page = await context.newPage();
    try {
      const cssErrors = [];
      page.on("requestfailed", (request) => {
        if (request.url().includes(".css"))
          cssErrors.push(`${request.url()}: ${request.failure()?.errorText}`);
      });
      page.on("response", (response) => {
        if (response.url().includes(".css") && !response.ok())
          cssErrors.push(`${response.status()} ${response.url()}`);
      });
      const response = await page.goto(new URL(route, baseURL).href, {
        waitUntil: "load",
        timeout: 30000,
      });
      if (!response?.ok())
        throw new Error(`HTTP ${response?.status() ?? "sin respuesta"}`);
      if (route !== "/demo") {
        await page
          .waitForFunction(
            () => {
              const site = document.querySelector(".dk2-site");
              return (
                site &&
                getComputedStyle(site)
                  .getPropertyValue("--dk2-forest")
                  .trim() !== ""
              );
            },
            null,
            { timeout: 20000 },
          )
          .catch(() => {
            throw new Error(
              `Los estilos editoriales no cargaron. ${cssErrors.join("; ") || "Sin respuesta CSS identificada."}`,
            );
          });
      }
      await page.waitForTimeout(900);
      await snapshot(page, route, viewport);
      if (route === "/") {
        const carousel = page.locator(".dk2-hero-carousel");
        if (await carousel.count()) {
          await carousel.focus();
          for (let slide = 2; slide <= 3; slide++) {
            await carousel.press("ArrowRight");
            await snapshot(page, route, viewport, `-Hero-0${slide}`);
          }
          await carousel.press("ArrowRight");
        }
      }
      if (viewport.name === "MOBILE") {
        const menu = page.locator("details.dk2-mobile-nav > summary");
        if (await menu.isVisible().catch(() => false)) {
          await menu.click();
          await snapshot(page, route, viewport, "-Menu-Abierto");
          await menu.click();
        }
      }
      if (route === "/productos" && viewport.name === "DESKTOP") {
        const add = page
          .locator("button:not([disabled])")
          .filter({ hasText: "Agregar al carrito" })
          .first();
        if (await add.count()) {
          await add.click();
          await page.evaluate(() =>
            window.dispatchEvent(new Event("dk-demo-cart-open")),
          );
          await page.getByRole("dialog", { name: "Tu carrito" }).waitFor();
          await snapshot(page, route, viewport, "-Carrito-Abierto");
          const checkout = page.getByRole("button", {
            name: "Continuar con compra de prueba",
          });
          if (await checkout.isVisible().catch(() => false)) {
            await checkout.click();
            await snapshot(page, route, viewport, "-Confirmacion-Demo");
          }
          await page
            .getByRole("button", { name: "Cerrar carrito" })
            .last()
            .click();
        }
      }
      const darkToggle = page.getByRole("button", {
        name: "Activar modo oscuro",
      });
      if (await darkToggle.isVisible().catch(() => false)) {
        await darkToggle.click();
        await page.waitForTimeout(550);
        await snapshot(page, route, viewport, "-Modo-Oscuro");
      }
    } catch (error) {
      failed.push(`${route} · ${viewport.name}: ${error.message}`);
      await progress();
    } finally {
      await context.close();
    }
  }
}
await browser.close();
await save(
  path.join(out, "05_NAVEGACION/mapa-navegacion.json"),
  JSON.stringify(navigation, null, 2) + "\n",
);
await save(
  path.join(out, "08_DOCUMENTACION/pantallas-capturadas.json"),
  JSON.stringify(screenRecords, null, 2) + "\n",
);
const baseScreens = routes.flatMap((route) =>
  viewports.map((viewport) => ({
    route,
    viewport: viewport.name,
    svg: path.join(viewport.folder, `${pageName(route)}.svg`),
  })),
);
const missing = baseScreens.filter(
  (expected) =>
    !screenRecords.some(
      (record) =>
        record.route === expected.route &&
        record.viewport === expected.viewport &&
        record.svg.replaceAll(path.sep, "/") === expected.svg &&
        record.svgRendered,
    ),
);
const uniqueLinks = [
  ...new Map(
    navigation.map((link) => [
      `${link.pageOrigin}\t${link.visibleText}\t${link.destination}`,
      link,
    ]),
  ).values(),
];
const csv = (value) => `"${String(value ?? "").replaceAll('"', '""')}"`;
await save(
  path.join(out, "05_NAVEGACION/inventario-enlaces.csv"),
  "origen,texto,interaccion,destino,pantalla\n" +
    uniqueLinks
      .map((link) =>
        [
          link.pageOrigin,
          link.visibleText,
          link.interaction,
          link.destination,
          link.svgScreen,
        ]
          .map(csv)
          .join(","),
      )
      .join("\n") +
    "\n",
);
await save(
  path.join(out, "08_DOCUMENTACION/REPORTE_CALIDAD_VISUAL.json"),
  JSON.stringify(
    {
      method:
        "Diferencia media absoluta RGB a ancho de 480 px; 0 equivale a píxeles idénticos. La métrica no sustituye la revisión visual.",
      screens: screenRecords.map(
        ({
          route,
          viewport,
          svg,
          pixelDifference,
          complexCount,
          svgRendered,
        }) => ({
          route,
          viewport,
          svg,
          pixelDifference,
          complexCount,
          svgRendered,
        }),
      ),
    },
    null,
    2,
  ) + "\n",
);
await save(
  path.join(out, "08_DOCUMENTACION/INFORME_EXPORTACION.md"),
  `# Exportación de páginas completas\n\nPáginas públicas: ${routes.length}. SVG completos requeridos (${routes.length} páginas × 3 anchuras): ${baseScreens.length}. SVG generados, incluidas variantes: ${screenRecords.length}. SVG principales pendientes: ${missing.length}. Fallos: ${failed.length}.\n\n## Páginas y archivos principales\n\n${baseScreens.map((item) => `- ${item.route} · ${item.viewport}: \`${item.svg}\`${missing.some((m) => m.svg === item.svg) ? " — PENDIENTE" : ""}`).join("\n")}\n\n## Alcance real\n\nCada archivo contiene la página desde el encabezado hasta el footer como elementos SVG separados: texto, formas, iconos y fotografías embebidas. El SVG representa un estado visual estático y no conserva interacciones React. Se incluyen variantes de modo oscuro y los estados que pudieron reproducirse. Los fondos CSS multicapa, pseudoelementos, sombras, vídeos, mapas e iconos dependientes de CSS pueden diferir; sus incidencias se registran por pantalla en archivos \`*-limitaciones.json\`. Las vistas PNG del navegador y del SVG permiten comparar. No se ha comprobado la importación en Figma: esa prueba requiere Figma.\n`,
);
await save(
  path.join(out, "00_LEER_PAGINAS_COMPLETAS.md"),
  `# Páginas completas para Figma\n\nEstado: ${missing.length ? "INCOMPLETO" : "SVG principales generados"}. Se encontraron ${routes.length} páginas; ${baseScreens.length - missing.length}/${baseScreens.length} SVG principales renderizan.\n\nAbre \`01_PAGINAS_DESKTOP/Home.svg\` para ver el Home completo. Las otras páginas están en esa misma carpeta, incluida \`Productos.svg\` y \`Donaciones.svg\`. Las versiones tablet y móvil están en \`02_PAGINAS_TABLET\` y \`03_PAGINAS_MOBILE\`. Cada SVG tiene la altura real de su página: no es solo un icono ni el primer viewport.\n\nLa pantalla se reconstruye con texto, formas, iconos y fotografías embebidas. Para verificar diferencias, compara \`07_VISTAS_PREVIAS/<tamaño>/<página>.png\` con \`<página>-svg.png\`. La interacción original de React no se conserva al importar SVG en Figma. Figma no ha sido probado automáticamente. Lee \`08_DOCUMENTACION/INFORME_EXPORTACION.md\` para el inventario y las limitaciones.\n`,
);
const zipName = missing.length
  ? "BIOPRODUCTOS_DK_PAGINAS_INCOMPLETAS.zip"
  : "BIOPRODUCTOS_DK_FIGMA_COMPLETO.zip";
const zipFolder = path.join(out, "11_ENTREGA_ZIP");
await mkdir(zipFolder, { recursive: true });
const zipFile = path.join(zipFolder, zipName);
await rm(zipFile, { force: true });
await new Promise((resolve, reject) => {
  const zip = spawn(
    "zip",
    [
      "-q",
      "-r",
      zipFile,
      ...viewports.map((viewport) => viewport.folder),
      "05_NAVEGACION",
      "07_VISTAS_PREVIAS",
      "08_DOCUMENTACION",
      "PROGRESO_EXPORTACION.md",
      "00_LEER_PAGINAS_COMPLETAS.md",
    ],
    { cwd: out, stdio: "ignore" },
  );
  zip.on("error", reject);
  zip.on("exit", (code) =>
    code === 0
      ? resolve()
      : reject(new Error(`zip terminó con código ${code}`)),
  );
});
const zipBytes = (await stat(zipFile)).size;
console.log(
  `Páginas SVG: ${screenRecords.length}; páginas principales pendientes: ${missing.length}; fallos: ${failed.length}. ZIP: ${zipFile} (${zipBytes} bytes).`,
);
if (missing.length || failed.length) process.exitCode = 2;
