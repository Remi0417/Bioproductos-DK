import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

// No screenshots, recordings or media assets are produced by these Home tests.
test.use({ trace: "off", screenshot: "off", video: "off" });

for (const width of [320, 375, 390, 768, 1024, 1440, 1920]) {
  test(`Home con fotografías originales ${width}px: imágenes, responsive, teclado y axe`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "no-preference" });
    const mediaRequests: string[] = [];
    page.on("request", (request) => {
      if (["image", "media"].includes(request.resourceType()))
        mediaRequests.push(request.url());
    });
    await page.goto("/");
    await expect(page).toHaveURL("/");
    const viewportWidth = await page.evaluate(
      () => document.documentElement.clientWidth,
    );
    for (const selector of [
      ".dk2-site",
      ".dk2-header",
      ".dk2-ribbon",
      ".dk2-hero",
      ".dk2-footer",
    ]) {
      const bounds = (await page.locator(selector).boundingBox())!;
      expect(Math.abs(bounds.x), `${selector}: left edge`).toBeLessThan(1);
      expect(
        Math.abs(bounds.x + bounds.width - viewportWidth),
        `${selector}: right edge`,
      ).toBeLessThan(1);
    }
    const hero = page.locator(".dk2-hero");
    await expect(hero.locator(".dk2-hero-slide")).toHaveCount(3);
    await expect(hero.locator(".dk2-hero-slide.is-active h1")).toHaveText(
      "Todo nace de la ciencia.",
    );
    expect(
      await hero
        .locator(".dk2-hero-canvas")
        .evaluate((node) =>
          Number.parseFloat(getComputedStyle(node).borderTopLeftRadius),
        ),
    ).toBeGreaterThan(0);
    await expect(
      hero
        .locator(".dk2-hero-slide.is-active .dk2-hero-actions")
        .getByRole("link", { name: "Donaciones", exact: true }),
    ).toHaveAttribute("href", "#donaciones-home");
    await expect(
      hero
        .locator(".dk2-hero-slide.is-active .dk2-hero-actions")
        .getByRole("link", { name: "Conocer la ciencia", exact: true }),
    ).toHaveAttribute("href", "/bio-investigacion");
    const locationBanner = hero.getByRole("link", {
      name: "Ubícanos aquí: ver dirección y cómo llegar a BioProductos DK",
    });
    await expect(locationBanner).toBeVisible();
    await expect(locationBanner).toHaveAttribute("href", "/donde-comprar");
    const donationBanner = hero.locator("#donaciones-home");
    const donationBounds = (await donationBanner.boundingBox())!;
    const locationBounds = (await locationBanner.boundingBox())!;
    expect(locationBounds.y).toBeGreaterThanOrEqual(
      donationBounds.y + donationBounds.height,
    );
    expect(locationBounds.height).toBeLessThan(donationBounds.height);
    expect(
      await hero
        .locator(".dk2-hero-slide.is-active .dk2-hero-copy")
        .evaluate((node) => node.scrollWidth <= node.clientWidth),
    ).toBe(true);
    for (const action of await hero
      .locator(".dk2-hero-slide.is-active .dk2-hero-actions a")
      .all()) {
      const bounds = (await action.boundingBox())!;
      expect(bounds.height).toBeGreaterThanOrEqual(44);
    }
    const carousel = hero.locator(".dk2-hero-carousel");
    await carousel.focus();
    await page.keyboard.press("ArrowRight");
    await expect(hero.locator(".dk2-hero-slide.is-active h2")).toHaveText(
      "Cuidado que toma forma.",
    );
    await expect(
      hero.locator(".dk2-hero-slide.is-active .dk2-hero-actions a"),
    ).toHaveAttribute("href", "/productos");
    await page.keyboard.press("ArrowRight");
    await expect(hero.locator(".dk2-hero-slide.is-active h2")).toHaveText(
      "Mirar el origen. Imaginar más.",
    );
    await expect(
      hero.locator(".dk2-hero-slide.is-active .dk2-hero-actions a").first(),
    ).toHaveAttribute("href", "/bio-impacto");
    await page.keyboard.press("ArrowRight");
    await expect(hero.locator(".dk2-hero-slide.is-active h1")).toHaveText(
      "Todo nace de la ciencia.",
    );
    await page.keyboard.press("ArrowLeft");
    await expect(hero.locator(".dk2-hero-slide.is-active h2")).toHaveText(
      "Mirar el origen. Imaginar más.",
    );
    await page.keyboard.press("ArrowRight");
    await expect(hero.locator(".dk2-hero-slide.is-active h1")).toHaveText(
      "Todo nace de la ciencia.",
    );
    await expect(hero.locator(".dk2-hero-slide--purpose")).toBeHidden();
    const donation = page.getByRole("region", {
      name: "Tus residuos pueden tener un nuevo comienzo.",
    });
    await donation.scrollIntoViewIfNeeded();
    const stripBounds = (await donation.boundingBox())!;
    expect(stripBounds.height).toBeLessThan(
      width < 600 ? 290 : width < 900 ? 220 : 145,
    );
    const donationPhotos = donation.locator(".dk2-donate-photos img");
    await expect(donationPhotos).toHaveCount(4);
    for (const photo of await donationPhotos.all()) {
      await expect(photo).toHaveAttribute("loading", "lazy");
    }
    const donateAction = donation.getByRole("link", { name: "Dona aquí" });
    await expect(donateAction).toHaveAttribute("href", "/donaciones");
    const actionBounds = (await donateAction.boundingBox())!;
    expect(actionBounds.height).toBeGreaterThanOrEqual(width < 600 ? 52 : 60);
    expect(actionBounds.width).toBeGreaterThanOrEqual(width < 600 ? 180 : 202);
    await donateAction.focus();
    await expect(donateAction).toBeFocused();
    const recycle = donation.locator(".dk2-donate-cycle");
    expect(
      await recycle.evaluate((node) => {
        const style = getComputedStyle(node);
        return [
          style.animationName,
          style.animationIterationCount,
          style.animationPlayState,
        ];
      }),
    ).toEqual(["dk2-donate-recycle", "infinite", "running"]);
    for (const [side, offset] of [
      ["left", 2],
      ["right", -2],
    ] as const) {
      await expect
        .poll(() =>
          donateAction
            .locator(`.dk2-donate-person--${side}`)
            .evaluate(
              (node) => new DOMMatrix(getComputedStyle(node).transform).m41,
            ),
        )
        .toBe(offset);
    }
    await expect(donateAction.locator(".dk2-donate-spark")).toHaveCSS(
      "opacity",
      "1",
    );
    await donateAction.press("Enter");
    await expect(page).toHaveURL("/donaciones");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Lo que separas hoy puede abrir otra posibilidad.",
    );
    await expect(page.locator(".dk3-material-card h3")).toHaveText([
      "Borra de café",
      "Cáscaras de huevo",
      "Cáscaras de cítricos",
    ]);
    await expect(page.locator(".dk3-research-step")).toHaveCount(4);
    await expect(page.locator(".dk3-donation-status")).toContainText(
      "La recepción pública de residuos aún no está habilitada.",
    );
    const mail = page.getByRole("link", { name: "Consultar por correo" });
    await expect(mail).toHaveAttribute(
      "href",
      /^mailto:biocontacto@bioproductosdk\.com\?subject=/,
    );
    await expect(page.locator("main form")).toHaveCount(0);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    // Return from the donation page before continuing the Home checks.
    await page.goto("/");
    const dna = page.locator(".dk2-dna");
    await expect(dna.locator(".dk2-dna-block")).toHaveCount(4);
    await expect(dna.locator("h3")).toHaveText([
      "Biotecnología",
      "Nanotecnología",
      "Innovación",
      "Sustentabilidad",
    ]);
    await expect(dna.locator("details, button, .dk2-dna-visual")).toHaveCount(
      0,
    );
    expect((await dna.boundingBox())!.height).toBeLessThan(
      width < 600 ? 760 : width < 1100 ? 600 : 400,
    );
    await expect(page.locator("[data-home-section]")).toHaveCount(10);
    await expect(
      page.locator("[data-media-slot], [data-media-design]"),
    ).toHaveCount(0);
    await expect(page.locator(".dk2-family")).toHaveCount(5);
    const products = page.getByRole("region", {
      name: "Nuestra colección",
    });
    await expect(products.locator("h3")).toHaveText([
      "Detergentes para ropa",
      "Champús sólidos",
      "Sales de baño",
      "Jabones",
      "Acondicionador",
    ]);
    await expect(products.locator(".dk2-family-link")).toHaveCount(5);
    await expect(products.locator("[data-product-photo-pending]")).toHaveCount(
      2,
    );
    await expect(
      products.locator("[data-product-photo-pending] img"),
    ).toHaveCount(0);
    const detergentSize = (await products
      .locator(".dk2-family-visual")
      .first()
      .boundingBox())!;
    for (const visual of await products.locator(".dk2-family-visual").all()) {
      const size = (await visual.boundingBox())!;
      expect(Math.abs(size.width - detergentSize.width)).toBeLessThan(1);
      expect(Math.abs(size.height - detergentSize.height)).toBeLessThan(1);
      expect(size.width / size.height).toBeCloseTo(4 / 5, 2);
    }
    if (width >= 1100) {
      const visuals = products.locator(".dk2-family-visual");
      const first = (await visuals.nth(0).boundingBox())!;
      const third = (await visuals.nth(2).boundingBox())!;
      const soap = (await visuals.nth(3).boundingBox())!;
      const conditioner = (await visuals.nth(4).boundingBox())!;
      expect(Math.abs(soap.y - conditioner.y)).toBeLessThan(1);
      expect(soap.y).toBeGreaterThan(first.y + first.height);
      const leftInset = soap.x - first.x;
      const rightInset =
        third.x + third.width - conditioner.x - conditioner.width;
      expect(leftInset).toBeGreaterThan(0);
      expect(Math.abs(leftInset - rightInset)).toBeLessThan(1);
    }
    await expect(products.locator(".dk2-family-link a, button")).toHaveCount(0);
    await expect(page.locator(".dk2-business-paths article")).toHaveCount(3);
    const research = page.getByRole("region", {
      name: "El origen es la ciencia.",
    });
    await expect(research).toHaveCount(1);
    await expect(research.locator(".dk2-research-focus li")).toHaveText([
      "I+D",
      "Circularidad",
      "Nuevas formulaciones",
    ]);
    await expect(research.getByRole("link")).toHaveCount(1);
    await expect(
      page.locator(".dk2-science-notebook, .dk2-process, .dk2-research-topics"),
    ).toHaveCount(0);
    const researchCard = (await research
      .locator(".dk2-research-card")
      .boundingBox())!;
    const researchMedia = (await research
      .locator(".dk2-research-media")
      .boundingBox())!;
    await expect(
      research.locator(
        '.dk2-research-media img[data-home-photo="home-products-shampoo"]',
      ),
    ).toHaveCount(1);
    expect(
      Math.abs(
        researchMedia.x +
          researchMedia.width -
          researchCard.x -
          researchCard.width,
      ),
    ).toBeLessThan(2);
    expect(
      Math.abs(
        researchMedia.y +
          researchMedia.height -
          researchCard.y -
          researchCard.height,
      ),
    ).toBeLessThan(2);
    if (width >= 900) {
      expect(Math.abs(researchMedia.y - researchCard.y)).toBeLessThan(2);
    } else {
      expect(Math.abs(researchMedia.x - researchCard.x)).toBeLessThan(2);
    }
    await expect(page.locator("main img[data-home-photo]")).toHaveCount(13);
    await expect(
      page.locator("main video, main iframe, main canvas"),
    ).toHaveCount(0);
    await expect(page.locator('[data-home-photo="home-hero"]')).toHaveAttribute(
      "loading",
      "eager",
    );
    await expect(page.locator('[data-home-photo="home-hero"]')).toHaveAttribute(
      "fetchpriority",
      "high",
    );
    for (const photo of await page.locator("main img[data-home-photo]").all()) {
      await expect(photo).toHaveAttribute("alt", /.+/);
    }
    for (const photo of await page
      .locator("main img[data-home-photo]:visible")
      .all()) {
      await photo.scrollIntoViewIfNeeded();
      await expect
        .poll(() =>
          photo.evaluate(
            (node: HTMLImageElement) => node.complete && node.naturalWidth > 0,
          ),
        )
        .toBe(true);
      const state = await photo.evaluate((node: HTMLImageElement) => ({
        source: new URL(node.currentSrc).pathname,
        variants: node.srcset.split(",").length,
        width: node.getBoundingClientRect().width,
        height: node.getBoundingClientRect().height,
        thumbnail: Boolean(node.closest(".dk2-donate-photos")),
      }));
      expect(state.source).toMatch(
        /^\/images\/home\/optimized\/[a-z]+-\d+\.webp$/,
      );
      expect(state.variants).toBe(3);
      expect(state.width).toBeGreaterThan(state.thumbnail ? 40 : 100);
      expect(state.height).toBeGreaterThan(state.thumbnail ? 50 : 100);
    }
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    for (const [index, name] of [
      "Descubrir detergentes",
      "Descubrir champús",
      "Descubrir sales de baño",
      "Descubrir jabones",
      "Descubrir acondicionador",
    ].entries()) {
      const family = products.getByRole("link", { name: new RegExp(name) });
      await expect(family).toHaveAttribute("href", "/productos");
      if (index === 1) {
        await family.focus();
        await expect(family).toBeFocused();
        await family.press("Enter");
      } else if (index < 3) {
        await family.locator("img").click();
      } else {
        await family.locator(".dk2-family-visual").click();
      }
      await expect(page).toHaveURL("/productos");
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(
        "Esta sección se está preparando.",
      );
      await page.getByRole("link", { name: "Volver al inicio" }).click();
      await expect(page).toHaveURL("/");
    }
    const researchAction = research.getByRole("link", {
      name: "Conoce Bio Investigación",
    });
    await expect(researchAction).toHaveAttribute("href", "/bio-investigacion");
    await researchAction.focus();
    await expect(researchAction).toBeFocused();
    expect((await researchAction.boundingBox())!.height).toBeGreaterThanOrEqual(
      44,
    );
    await researchAction.press("Enter");
    await expect(page).toHaveURL("/bio-investigacion");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Esta sección se está preparando.",
    );
    await page.getByRole("link", { name: "Volver al inicio" }).click();
    await expect(page).toHaveURL("/");
    const impact = page.getByRole("region", {
      name: "Nada cambia si lo miramos siempre igual.",
    });
    await expect(impact.locator(".dk2-impact-sequence li")).toHaveText([
      "01Materia orgánica",
      "02Ciencia aplicada",
      "03Nueva utilidad",
    ]);
    await expect(impact.locator(".dk2-impact-caveat")).toContainText(
      "Aún no hay recepción pública habilitada.",
    );
    const impactAction = impact.getByRole("link", {
      name: "Conoce Bio Impacto",
    });
    await expect(impactAction).toHaveAttribute("href", "/bio-impacto");
    await impactAction.focus();
    await expect(impactAction).toBeFocused();
    expect((await impactAction.boundingBox())!.height).toBeGreaterThanOrEqual(
      44,
    );
    await impactAction.press("Enter");
    await expect(page).toHaveURL("/bio-impacto");
    await page.getByRole("link", { name: "Volver al inicio" }).click();
    await expect(page).toHaveURL("/");
    const audit = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(audit.violations).toEqual([]);
    expect(mediaRequests.length).toBeGreaterThan(0);
    expect(
      mediaRequests.every((url) => url.startsWith("http://127.0.0.1:8000/")),
    ).toBe(true);
    expect(mediaRequests.some((url) => /\.JPG/i.test(url))).toBe(false);
  });
}

test("header identity, full-width compact ribbon and motion preferences", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const header = page.locator(".dk2-header");
  const logo = header.getByRole("img", {
    name: "BioProductos DK",
    exact: true,
  });
  await expect(logo).toBeVisible();
  await expect(logo).toHaveAttribute(
    "src",
    "/images/brand/logo-dk-header.webp",
  );
  await expect
    .poll(() =>
      logo.evaluate(
        (node: HTMLImageElement) => node.complete && node.naturalWidth > 0,
      ),
    )
    .toBe(true);
  await page.evaluate(() => document.fonts.ready);
  const ribbon = page.getByRole("region", {
    name: "Mensajes de BioProductos DK",
  });
  const track = ribbon.locator(".dk2-ribbon-track");
  await expect(ribbon.getByRole("checkbox")).toHaveCount(0);
  await expect(ribbon.getByText("El espíritu DK")).toHaveCount(0);
  await expect(ribbon.getByRole("list")).toHaveCount(1);
  await expect(ribbon.getByRole("listitem")).toHaveCount(5);
  for (const width of [320, 390, 768, 1279, 1280, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    await page.evaluate(() => window.scrollTo(0, 0));
    const head = await header.boundingBox();
    const band = await ribbon.boundingBox();
    expect(head!.height).toBeLessThanOrEqual(width >= 1280 ? 84 : 77);
    expect(band!.y).toBeGreaterThanOrEqual(head!.y + head!.height - 1);
    expect(band!.height).toBeLessThanOrEqual(38);
    expect(Math.abs(band!.width - head!.width)).toBeLessThan(1);
    const groups = ribbon.locator(".dk2-ribbon-group");
    const firstGroup = (await groups.nth(0).boundingBox())!;
    const secondGroup = (await groups.nth(1).boundingBox())!;
    expect(Math.abs(firstGroup.width - secondGroup.width)).toBeLessThan(1);
    expect(firstGroup.width).toBeGreaterThanOrEqual(band!.width - 1);
    // Measure one frame synchronously, including the join between both groups.
    const separatorErrors = await ribbon.evaluate((region) => {
      const items = Array.from(region.querySelectorAll(".dk2-ribbon-group li"));
      return items.slice(0, 5).map((item, index) => {
        const text = item
          .querySelector(".dk2-ribbon-message")!
          .getBoundingClientRect();
        const icon = item
          .querySelector(".dk2-ribbon-icon")!
          .getBoundingClientRect();
        const next = items[index + 1]
          .querySelector(".dk2-ribbon-message")!
          .getBoundingClientRect();
        return Math.abs(icon.x + icon.width / 2 - (text.right + next.left) / 2);
      });
    });
    expect(Math.max(...separatorErrors)).toBeLessThan(1);
    expect(
      await header.evaluate((node) => node.scrollWidth <= node.clientWidth),
    ).toBe(true);
    const brand = await header.locator(".dk2-brand").boundingBox();
    expect(brand!.width).toBe(brand!.height);
    expect(brand!.height).toBeGreaterThanOrEqual(60);
    expect(brand!.y).toBeGreaterThanOrEqual(head!.y);
    expect(brand!.y + brand!.height).toBeLessThanOrEqual(
      head!.y + head!.height,
    );
    if (width >= 1280) {
      const navigation = page.getByRole("navigation", {
        name: "Navegación principal",
      });
      await expect(navigation).toBeVisible();
      const nav = await navigation.boundingBox();
      const socials = header.locator(".dk2-socials--header");
      await expect(socials).toBeVisible();
      await expect(socials.locator(".dk2-social-link")).toHaveCount(3);
      const socialBounds = (await socials.boundingBox())!;
      const firstLink = (await navigation
        .getByRole("link")
        .first()
        .boundingBox())!;
      const midpoint = (brand!.x + brand!.width + firstLink.x) / 2;
      expect(
        Math.abs(socialBounds.x + socialBounds.width / 2 - midpoint),
      ).toBeLessThan(2);
      for (const item of await socials.locator(".dk2-social-link").all()) {
        const bounds = (await item.boundingBox())!;
        expect(bounds.width).toBeGreaterThanOrEqual(24);
        expect(bounds.height).toBeGreaterThanOrEqual(24);
        expect(bounds.x).toBeGreaterThanOrEqual(brand!.x + brand!.width + 8);
        expect(bounds.x + bounds.width).toBeLessThanOrEqual(firstLink.x - 8);
      }
      for (const link of await socials.getByRole("link").all()) {
        await expect(link).toHaveAttribute("href", /^https:\/\//);
        await expect(link).toHaveAttribute("target", "_blank");
        await expect(link).toHaveAttribute("rel", /noopener noreferrer/);
      }
      await expect(header.locator(".dk2-header-cta")).toHaveAttribute(
        "href",
        "/donaciones",
      );
      await expect(header.locator(".dk2-header-cta")).toHaveText("Donaciones");
      const cta = await header.locator(".dk2-header-cta").boundingBox();
      const cart = await header.locator(".dk2-cart-trigger").boundingBox();
      expect(
        Math.abs(nav!.x + nav!.width / 2 - (head!.x + head!.width / 2)),
      ).toBeLessThan(2);
      expect(brand!.x + brand!.width + 8).toBeLessThanOrEqual(nav!.x);
      expect(nav!.x + nav!.width + 8).toBeLessThanOrEqual(cta!.x);
      expect(cta!.x + cta!.width + 8).toBeLessThanOrEqual(cart!.x);
      expect(cta!.height).toBe(cart!.height);
      expect(
        Math.abs(cta!.y + cta!.height / 2 - (cart!.y + cart!.height / 2)),
      ).toBeLessThan(1);
      expect(
        await header
          .locator(".dk2-desktop-nav a")
          .first()
          .evaluate((node) => parseFloat(getComputedStyle(node).fontSize)),
      ).toBeGreaterThanOrEqual(16);
    } else {
      await expect(header.locator(".dk2-mobile-nav summary")).toBeVisible();
      await expect(header.locator(".dk2-socials--header")).toBeHidden();
    }
    for (const control of await header
      .locator(
        ".dk2-desktop-nav a:visible, .dk2-header-cta:visible, .dk2-cart-trigger, .dk2-mobile-nav summary:visible",
      )
      .all()) {
      const bounds = (await control.boundingBox())!;
      expect(bounds.height).toBeGreaterThanOrEqual(44);
      expect(bounds.width).toBeGreaterThanOrEqual(44);
    }
  }
  await page.mouse.move(10, 400);
  expect(
    await track.evaluate((node) => getComputedStyle(node).animationPlayState),
  ).toBe("running");
  await ribbon.hover();
  expect(
    await track.evaluate((node) => getComputedStyle(node).animationPlayState),
  ).toBe("running");
  await page.keyboard.press("Tab");
  await ribbon.focus();
  await expect(ribbon).toBeFocused();
  await page.mouse.move(10, 400);
  expect(
    await track.evaluate((node) => getComputedStyle(node).animationPlayState),
  ).toBe("paused");
  await page.keyboard.press("Tab");
  await page.mouse.move(10, 400);
  expect(
    await track.evaluate((node) => getComputedStyle(node).animationPlayState),
  ).toBe("running");
  await page.emulateMedia({ reducedMotion: "reduce" });
  expect(
    await track.evaluate((node) => getComputedStyle(node).animationName),
  ).toBe("none");
  await expect(ribbon).not.toHaveAttribute("data-draggable", "true");
  await expect(ribbon.getByRole("listitem")).toHaveCount(5);
});

test("ribbon drag and inertia: both directions, release outside, touch cancellation and keyboard", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const ribbon = page.getByRole("region", {
    name: "Mensajes de BioProductos DK",
  });
  const track = ribbon.locator(".dk2-ribbon-track");
  await expect(ribbon).toHaveAttribute("data-draggable", "true");
  await page.evaluate(() => document.fonts.ready);
  const phase = () =>
    track.evaluate((node) => {
      const animation = node.getAnimations()[0];
      return (animation.currentTime as number) % 45000;
    });
  const state = () =>
    track.evaluate((node) => node.getAnimations()[0].playState);
  const box = (await ribbon.boundingBox())!;
  const startX = box.x + box.width / 2;
  const startY = box.y + box.height / 2;
  const cycleWidth = (await ribbon
    .locator(".dk2-ribbon-group")
    .first()
    .boundingBox())!.width;
  const expectedDelta = (100 * 45000) / cycleWidth;
  const distance = (actual: number, expected: number) =>
    Math.abs(((actual - expected + 67500) % 45000) - 22500);

  await page.mouse.move(startX, startY);
  await page.mouse.down();
  await expect(ribbon).toHaveAttribute("data-dragging", "true");
  expect(await state()).toBe("paused");
  const initial = await phase();
  await page.mouse.move(startX - 100, startY, { steps: 5 });
  expect(distance(await phase(), initial + expectedDelta)).toBeLessThan(50);
  await page.mouse.move(startX + 100, startY, { steps: 5 });
  expect(distance(await phase(), initial - expectedDelta)).toBeLessThan(50);
  await page.mouse.move(startX + 100, startY + 150);
  await page.mouse.up();
  await expect(ribbon).not.toHaveAttribute("data-dragging", "true");
  await expect.poll(state).toBe("running");

  await page.mouse.move(startX + 120, startY);
  await page.mouse.down();
  await page.mouse.move(startX - 120, startY, { steps: 6 });
  await page.mouse.up();
  await expect(ribbon).toHaveAttribute("data-coasting", "true");
  const coastStart = await phase();
  await expect
    .poll(async () => distance(await phase(), coastStart))
    .toBeGreaterThan(50);
  await expect(ribbon).not.toHaveAttribute("data-coasting", "true", {
    timeout: 2500,
  });
  expect(await state()).toBe("running");

  await page.keyboard.press("Tab");
  await ribbon.focus();
  const focused = await phase();
  await page.keyboard.press("ArrowRight");
  expect(distance(await phase(), focused + expectedDelta * 1.2)).toBeLessThan(
    50,
  );
  await page.keyboard.press("ArrowLeft");
  expect(distance(await phase(), focused)).toBeLessThan(50);
  await page.keyboard.press("Tab");
  expect(await state()).toBe("running");

  await page.setViewportSize({ width: 390, height: 844 });
  await page.evaluate(() => window.scrollTo(0, 0));
  // Synthetic PointerEvents exercise touch handlers; native scrolling still
  // requires a touch-device browser check.
  await ribbon.dispatchEvent("pointerdown", {
    pointerId: 41,
    pointerType: "touch",
    isPrimary: true,
    button: 0,
    clientX: 200,
  });
  await expect(ribbon).toHaveAttribute("data-dragging", "true");
  await ribbon.dispatchEvent("pointermove", {
    pointerId: 41,
    pointerType: "touch",
    isPrimary: true,
    clientX: 100,
  });
  await ribbon.dispatchEvent("pointercancel", {
    pointerId: 41,
    pointerType: "touch",
    isPrimary: true,
  });
  await expect(ribbon).not.toHaveAttribute("data-dragging", "true");
  expect(await state()).toBe("running");
});

test("header scroll direction: proportional speed, keyboard and open menus", async ({
  page,
}) => {
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await page.emulateMedia({ reducedMotion: "no-preference" });
    // Switch off smooth scrolling so the one-pixel direction check is exact.
    await page.addStyleTag({
      content: "html, body { scroll-behavior: auto !important; }",
    });
    await page.getByRole("link", { name: "Saltar al contenido" }).focus();
    await page.keyboard.press("Enter");
    const header = page.locator(".dk2-header");
    const moveTo = async (y: number) => {
      await page.evaluate((position) => window.scrollTo(0, position), y);
      await page.evaluate(
        () =>
          new Promise<void>((resolve) =>
            requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
          ),
      );
    };
    await moveTo(700);
    await expect(header).toHaveAttribute("data-scroll-hidden", "true");
    await expect
      .poll(
        async () =>
          (await header.boundingBox())!.y +
          (await header.boundingBox())!.height,
      )
      .toBeLessThanOrEqual(0);
    const hidden = (await header.boundingBox())!;
    await moveTo(699);
    await expect(header).toHaveAttribute("data-scroll-hidden", "false");
    expect((await header.boundingBox())!.y - hidden.y).toBeCloseTo(1, 1);
    await moveTo(698);
    expect((await header.boundingBox())!.y - hidden.y).toBeCloseTo(2, 1);
    await moveTo(680);
    expect((await header.boundingBox())!.y - hidden.y).toBeCloseTo(20, 1);
    await moveTo(685);
    expect((await header.boundingBox())!.y - hidden.y).toBeCloseTo(15, 1);
    expect(
      await header.evaluate(
        (node) => getComputedStyle(node).transitionProperty,
      ),
    ).not.toContain("transform");
    await moveTo(700 - hidden.height);
    expect((await header.boundingBox())!.y).toBeCloseTo(0, 1);
    const cart = page.locator(".dk2-cart-trigger");
    await cart.click();
    await moveTo(850);
    await expect(header).toHaveAttribute("data-scroll-hidden", "false");
    await page.keyboard.press("Escape");
    await moveTo(900);
    await expect(header).toHaveAttribute("data-scroll-hidden", "false");
    await page.locator("main").focus();
    await moveTo(950);
    await expect(header).toHaveAttribute("data-scroll-shifted", "true");
    await header.getByRole("link", { name: "BioProductos DK, inicio" }).focus();
    await expect(header).toHaveAttribute("data-scroll-hidden", "false");
    await expect
      .poll(async () => (await header.boundingBox())!.y)
      .toBeGreaterThanOrEqual(0);
    await page.locator("main").focus();
    if (width < 1280) {
      await moveTo(980);
      await moveTo(979);
      await moveTo(980 - hidden.height);
      await page.locator(".dk2-mobile-nav summary").click();
      const dialog = page.getByRole("dialog", { name: "Menú del sitio" });
      await expect(dialog).toBeVisible();
      const bounds = await dialog.boundingBox();
      expect(bounds!.y).toBe(0);
      expect(bounds!.height).toBe(900);
      await page.keyboard.press("Escape");
      await page.locator("main").focus();
    }
    await page.emulateMedia({ reducedMotion: "reduce" });
    await moveTo(1100);
    await expect(header).toHaveAttribute("data-scroll-hidden", "true");
    expect(
      await header.evaluate(
        (node) => getComputedStyle(node).transitionDuration,
      ),
    ).toBe("0s");
    await moveTo(1099);
    await expect(header).toHaveAttribute("data-scroll-hidden", "false");
    await moveTo(0);
    await expect(header).toHaveAttribute("data-scroll-hidden", "false");
  }
});

test("header cart: preview, keyboard, dismissal and responsive placement", async ({
  page,
}) => {
  await page.goto("/");
  const trigger = page.locator(".dk2-cart-trigger");
  const panel = page.getByRole("region", { name: "Tu carrito", exact: true });
  for (const width of [320, 390, 768, 1280, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await expect(trigger).toBeVisible();
    await expect(trigger).toHaveAccessibleName("Abrir carrito, 0 productos");
    await trigger.focus();
    await page.keyboard.press("Enter");
    await expect(panel).toBeVisible();
    await expect(panel).toHaveAttribute("data-cart-state", "preview");
    await expect(panel).toContainText("Sin compras reales");
    await expect(panel.locator(".dk2-cart-items li")).toHaveCount(0);
    const box = await panel.boundingBox();
    expect(box!.x).toBeGreaterThanOrEqual(0);
    expect(box!.x + box!.width).toBeLessThanOrEqual(width);
    await page.keyboard.press("Tab");
    await expect(
      panel.getByRole("button", { name: "Cerrar carrito" }),
    ).toBeFocused();
    expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
    await page.keyboard.press("Escape");
    await expect(panel).toBeHidden();
    await expect(trigger).toBeFocused();
  }
  await trigger.click();
  await panel.getByRole("button", { name: "Cerrar carrito" }).click();
  await expect(trigger).toBeFocused();
  await trigger.click();
  await page.getByRole("heading", { level: 1 }).click();
  await expect(panel).toBeHidden();
  await trigger.click();
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  await expect(panel).toBeHidden();
  await trigger.click();
  await panel.getByRole("link", { name: "Descubrir productos" }).click();
  await expect(page).toHaveURL("/productos");
  await expect(panel).toBeHidden();
});

test("mobile menu: focus, Escape, backdrop, active destination, resizing and scroll restoration", async ({
  page,
}) => {
  await page.setViewportSize({ width: 768, height: 900 });
  await page.goto("/");
  const toggle = page.locator(".dk2-mobile-nav summary");
  await toggle.click();
  const dialog = page.getByRole("dialog", { name: "Menú del sitio" });
  await expect(dialog).toBeVisible();
  const socials = dialog.locator(".dk2-socials--menu");
  await expect(socials).toBeVisible();
  await expect(socials.locator(".dk2-social-link")).toHaveCount(3);
  const close = dialog.getByRole("button", { name: "Cerrar" });
  await expect(close).toBeFocused();
  expect(await page.evaluate(() => document.body.style.overflow)).toBe(
    "hidden",
  );
  await page.keyboard.press("Shift+Tab");
  await expect(
    dialog.getByRole("link", { name: "Información legal" }),
  ).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(close).toBeFocused();
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  await page.keyboard.press("Escape");
  await expect(toggle).toBeFocused();
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  expect(await page.evaluate(() => document.body.style.overflow)).toBe("");
  await toggle.click();
  await page
    .getByTestId("menu-backdrop")
    .click({ position: { x: 10, y: 200 } });
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await toggle.click();
  await dialog
    .getByRole("link", { name: "Bio Investigación", exact: true })
    .click();
  await expect(page).toHaveURL("/bio-investigacion");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Esta sección se está preparando.",
  );
  await toggle.click();
  await expect(
    dialog.getByRole("link", { name: "Bio Investigación", exact: true }),
  ).toHaveAttribute("aria-current", "page");
  await page.setViewportSize({ width: 1440, height: 900 });
  await expect(page.locator(".dk2-mobile-nav")).not.toHaveAttribute("open", "");
  expect(await page.evaluate(() => document.body.style.overflow)).toBe("");
});

test("independent routes and links resolve; preview commerce and mutations remain blocked", async ({
  page,
  request,
}) => {
  await page.goto("/");
  const paths = await page
    .locator("a[href]")
    .evaluateAll((links) => [
      ...new Set(links.map((link) => link.getAttribute("href")!)),
    ]);
  expect(paths).not.toContain("#");
  expect(paths.filter((path) => path.startsWith("#"))).toEqual(["#contenido"]);
  for (const hash of paths.filter((path) => path.startsWith("#")))
    await expect(page.locator(hash)).toHaveCount(1);
  for (const path of paths.filter((path) => path.startsWith("/"))) {
    const response = await request.get(path);
    expect(response.status(), path).toBe(200);
    expect(response.headers()["x-robots-tag"]).toContain("noindex");
  }
  for (const path of [
    "/cl/checkout",
    "/cl/account",
    "/cl/cart",
    "/api/payment-return",
  ])
    expect((await request.get(path)).status(), path).toBe(503);
  for (const path of [
    "/",
    "/productos",
    "/bio-investigacion",
    "/donaciones",
    "/demo",
  ])
    expect((await request.post(path, { data: {} })).status(), path).toBe(503);
  await page
    .locator(".dk2-hero-slide.is-active .dk2-hero-actions")
    .getByRole("link", { name: "Donaciones", exact: true })
    .click();
  await expect(page).toHaveURL(/\/#donaciones-home$/);
  await expect(page.locator("#donaciones-home")).toBeInViewport();
  await page.locator(".dk2-hero-carousel").focus();
  await page.keyboard.press("ArrowRight");
  await page
    .locator(".dk2-hero-slide.is-active .dk2-hero-actions")
    .getByRole("link", { name: "Explorar productos", exact: true })
    .click();
  await expect(page).toHaveURL("/productos");
  await page.getByRole("link", { name: "Volver al inicio" }).click();
  await expect(page).toHaveURL("/");
});

test("keyboard skip link and reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Saltar al contenido" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("main")).toBeFocused();
  await expect(page.locator(".dk2-donate-cycle")).toHaveCSS(
    "animation-name",
    "none",
  );
  const donationAction = page
    .locator("#donaciones-home")
    .getByRole("link", { name: "Dona aquí", exact: true });
  await donationAction.focus();
  await expect(donationAction.locator(".dk2-donate-person--left")).toHaveCSS(
    "transform",
    "none",
  );
  await expect(donationAction.locator(".dk2-donate-person--right")).toHaveCSS(
    "transform",
    "none",
  );
  expect(
    await page
      .locator(".dk2-link")
      .first()
      .evaluate((node) => getComputedStyle(node).transitionDuration),
  ).toBe("0s");
  await page.locator(".dk2-footer").scrollIntoViewIfNeeded();
  expect(
    await page
      .locator("[data-reveal]")
      .evaluateAll((nodes) =>
        nodes.every((node) => node.getAnimations().length === 0),
      ),
  ).toBe(true);
});

test("Home remains readable and mobile navigation works without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 375, height: 900 },
  });
  const page = await context.newPage();
  try {
    await page.goto("http://127.0.0.1:8000/");
    await expect(page.locator(".dk2-dna-block")).toHaveCount(4);
    for (const block of await page.locator(".dk2-dna-block").all()) {
      await expect(block.locator("h3")).toBeVisible();
      await expect(block.locator("p")).toBeVisible();
    }
    const research = page.getByRole("region", {
      name: "El origen es la ciencia.",
    });
    await expect(research).toBeVisible();
    await research
      .getByRole("link", { name: "Conoce Bio Investigación" })
      .click();
    await expect(page).toHaveURL(/\/bio-investigacion$/);
    await page.getByRole("link", { name: "Volver al inicio" }).click();
    await expect(page).toHaveURL("http://127.0.0.1:8000/");
    const ribbon = page.getByRole("region", {
      name: "Mensajes de BioProductos DK",
    });
    await page.keyboard.press("Tab");
    await ribbon.focus();
    await expect(ribbon).toBeFocused();
    expect(
      await ribbon
        .locator(".dk2-ribbon-track")
        .evaluate((node) => getComputedStyle(node).animationPlayState),
    ).toBe("paused");
    await page.locator(".dk2-cart-trigger").click();
    const cart = page.getByRole("region", { name: "Tu carrito", exact: true });
    await expect(cart).toBeVisible();
    await cart.getByRole("link", { name: "Descubrir productos" }).click();
    await expect(page).toHaveURL(/\/productos$/);
    await page.locator(".dk2-mobile-nav summary").click();
    await page
      .getByRole("navigation", { name: "Navegación móvil" })
      .getByRole("link", { name: "Productos", exact: true })
      .click();
    await expect(page).toHaveURL(/\/productos$/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  } finally {
    await context.close();
  }
});
