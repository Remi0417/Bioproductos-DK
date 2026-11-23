import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.use({ trace: "off", screenshot: "off", video: "off" });

for (const width of [375, 768, 1440]) {
  test(`Ubicación DK: mapa, indicaciones y responsive ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/donde-comprar");
    const main = page.getByRole("main");
    await expect(
      main.getByRole("heading", { level: 1, name: /Ven a encontrarnos/ }),
    ).toBeVisible();
    const map = main.getByTitle(
      "Google Maps interactivo: BioProductos DK, Papa Juan Pablo I 2104, Padre Hurtado",
    );
    await expect(map).toBeVisible();
    await expect(map).toHaveAttribute(
      "src",
      /maps\.google\.com\/maps\?q=Papa\+Juan\+Pablo\+I\+2104.*output=embed/,
    );
    const response = await page.request.get(page.url());
    const csp = response.headers()["content-security-policy"];
    expect(csp).toContain(
      "frame-src https://maps.google.com https://www.google.com",
    );
    await expect(
      main.getByRole("link", { name: /Cómo llegar en Google Maps/ }),
    ).toHaveAttribute(
      "href",
      /^https:\/\/www\.google\.com\/maps\/place\/Papa\+Juan\+Pablo\+I\+2104/,
    );
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);

    if (width === 1440) {
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .analyze();
      expect(results.violations).toEqual([]);
    }
  });
}
