import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.use({ trace: "off", screenshot: "off", video: "off" });

for (const width of [375, 768, 1440]) {
  test(`Empresas: navegación, contacto y responsive ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/empresas");
    const main = page.getByRole("main");
    await expect(
      main.getByRole("heading", {
        level: 1,
        name: "Una buena relación comercial empieza conversando.",
      }),
    ).toBeVisible();
    await expect(main.getByRole("article")).toHaveCount(3);
    await expect(
      main.getByRole("link", { name: /Conversemos sobre una alianza/ }),
    ).toHaveAttribute("href", /^mailto:biocontacto@bioproductosdk\.com/);
    await expect(
      main.getByRole("link", { name: /Conocer los productos/ }),
    ).toHaveAttribute("href", "/productos");
    await expect(
      main.getByRole("link", { name: /Iniciar conversación comercial/ }),
    ).toBeVisible();
    await expect(main.getByText(/condiciones.*se conversan/i)).toBeVisible();
    await expect(
      main.getByText(/información.*confirmada y autorizada/i),
    ).toBeVisible();
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
