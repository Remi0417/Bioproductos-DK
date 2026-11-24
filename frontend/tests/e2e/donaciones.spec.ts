import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.use({ trace: "off", screenshot: "off", video: "off" });

for (const width of [375, 768, 1440]) {
  test(`Donaciones: contenido responsable, consulta y responsive ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/donaciones");
    const main = page.getByRole("main");
    await expect(
      main.getByRole("heading", {
        level: 1,
        name: "Lo que separas hoy puede abrir otra posibilidad.",
      }),
    ).toBeVisible();
    await expect(main.locator(".dk3-material-card")).toHaveCount(3);
    await expect(main.locator(".dk3-research-step")).toHaveCount(4);
    await expect(main.locator(".dk3-donation-status")).toContainText(
      "La recepción pública de residuos aún no está habilitada.",
    );
    const contact = main.getByRole("link", {
      name: /Quiero explorar una colaboración/,
    });
    await expect(contact).toHaveAttribute("href", "#formulario-colaboracion");
    await expect(
      main.getByRole("heading", {
        name: "Consulta una posible colaboración.",
      }),
    ).toBeVisible();
    const faq = main.getByText("¿Puedo llevar mis residuos directamente?");
    await faq.click();
    await expect(
      main.getByText(/No hay un punto público de recepción habilitado/),
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
