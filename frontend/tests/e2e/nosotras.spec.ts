import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.use({ trace: "off", screenshot: "off", video: "off" });

for (const width of [375, 768, 1440]) {
  test(`Nosotras: historia, rutas y responsive ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/nosotras");
    const main = page.getByRole("main");

    await expect(
      main.getByRole("heading", {
        level: 1,
        name: "Una idea que creció con ciencia y cuidado.",
      }),
    ).toBeVisible();
    await expect(main.getByRole("figure")).toHaveCount(1);
    await expect(
      main.getByRole("img", { name: /dos fundadoras de bioproductos dk/i }),
    ).toHaveAttribute("src", /\/images\/home\/optimized\/fundadoras-960\.webp/);
    await expect(main.getByRole("article")).toHaveCount(6);
    await expect(
      main.getByRole("link", { name: /La ciencia detrás de DK/ }).first(),
    ).toHaveAttribute("href", "/bio-investigacion");
    await expect(
      main.getByRole("link", { name: /Explorar productos/ }),
    ).toHaveAttribute("href", "/productos");
    await expect(
      main.getByRole("link", { name: /Conocer Bio Investigación/ }),
    ).toHaveAttribute("href", "/bio-investigacion");
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
