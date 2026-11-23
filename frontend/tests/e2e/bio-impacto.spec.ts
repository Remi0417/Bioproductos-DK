import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.use({ trace: "off", screenshot: "off", video: "off" });

for (const width of [375, 768, 1440]) {
  test(`Bio Impacto: contenido, interacciones y responsive ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/bio-impacto");

    const main = page.getByRole("main");
    await expect(
      main.getByRole("heading", {
        level: 1,
        name: "Lo que vuelve al ciclo abre nuevas posibilidades.",
      }),
    ).toBeVisible();
    await expect(main.locator("details")).toHaveCount(4);
    await expect(
      main.getByText("Una circularidad responsable se construye paso a paso."),
    ).toBeVisible();
    await expect(
      main.getByText(
        /no hay un programa público de recepción de residuos habilitado/i,
      ),
    ).toBeVisible();

    const material = main.locator("details").first();
    await material.locator("summary").click();
    await expect(material).toHaveAttribute("open", "");
    await expect(material).toContainText("colaboración con cafeterías");

    await expect(
      main.getByRole("link", { name: /Cómo proponer un material/ }),
    ).toHaveAttribute("href", "/donaciones");
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
