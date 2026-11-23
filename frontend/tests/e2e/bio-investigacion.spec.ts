import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.use({ trace: "off", screenshot: "off", video: "off" });

for (const width of [375, 768, 1440]) {
  test(`Bio Investigación: contenido y responsive a ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/bio-investigacion");

    const main = page.getByRole("main");
    await expect(main).not.toContainText(/fundadoras/i);
    await expect(
      main.getByRole("heading", {
        level: 1,
        name: "La ciencia comienza en la materia.",
      }),
    ).toBeVisible();
    await expect(
      main.getByRole("link", { name: "Explorar materiales" }),
    ).toHaveAttribute("href", "#materia");
    await expect(
      main.getByRole("link", { name: "Proponer colaboración" }),
    ).toHaveAttribute("href", "/contacto");
    await expect(main.getByLabel("Áreas de investigación")).toContainText(
      "Nanoemulsiones",
    );
    await expect(main.getByTestId("research-line")).toHaveCount(3);
    await expect(main.getByTestId("research-material-button")).toHaveCount(6);
    await expect(
      main.getByRole("heading", {
        level: 2,
        name: "La investigación empieza mirando de cerca.",
      }),
    ).toBeVisible();
    await expect(main.getByText("Cuaderno de campo")).toBeVisible();
    await expect(main.getByText("ORIGEN")).toBeVisible();
    await expect(main.getByTestId("research-feature-banner")).toBeVisible();
    await expect(
      main
        .getByTestId("research-feature-banner")
        .getByText(/imagen temporal de catálogo/i),
    ).toBeVisible();
    await expect(main.getByTestId("research-feature-banner")).not.toContainText(
      /fundadoras/i,
    );
    await expect(
      main
        .getByRole("tablist", { name: "Explorar áreas de Bio Investigación" })
        .getByRole("tab"),
    ).toHaveCount(4);
    await expect(
      main
        .getByTestId("research-feature-banner")
        .locator('img[data-home-photo="home-products-bath"]'),
    ).toBeVisible();
    await expect(main.getByTestId("research-video-slot")).toContainText(
      "Espacio reservado para material audiovisual autorizado",
    );
    await expect(main.getByTestId("research-video-slot")).toContainText(
      "El proyecto no contiene aún un video del laboratorio",
    );

    for (const photo of await main.locator("img").all()) {
      await photo.scrollIntoViewIfNeeded();
      await expect
        .poll(() =>
          photo.evaluate(
            (image: HTMLImageElement) =>
              image.complete && image.naturalWidth > 0,
          ),
        )
        .toBe(true);
    }

    await main.getByRole("button", { name: /Cáscara de huevo/ }).click();
    await expect(
      main.getByRole("heading", {
        name: "¿Cómo cambia el material al prepararlo?",
      }),
    ).toBeVisible();
    await main.getByRole("tab", { name: /02 Nanotecnología/ }).click();
    await expect(
      main.getByRole("heading", {
        name: "Comprender la materia desde lo pequeño.",
      }),
    ).toBeVisible();
    await main.getByRole("button", { name: "Área siguiente" }).click();
    await expect(
      main.getByRole("heading", {
        name: "De la pregunta a la exploración de prototipos.",
      }),
    ).toBeVisible();
    await main.getByRole("tab", { name: /04 Colaboración I\+D/ }).click();
    await expect(
      main.getByRole("heading", {
        name: "Investigar también es conectar capacidades.",
      }),
    ).toBeVisible();

    const materialTab = main.getByRole("tab", { name: /01 Materiales/ });
    await materialTab.focus();
    await materialTab.press("ArrowRight");
    await expect(
      main.getByRole("tab", { name: /02 Nanotecnología/ }),
    ).toHaveAttribute("aria-selected", "true");
    await main.getByRole("button", { name: "Área anterior" }).click();
    await expect(
      main.getByRole("tab", { name: /01 Materiales/ }),
    ).toHaveAttribute("aria-selected", "true");
    const selectedTab = main.getByRole("tab", { name: /01 Materiales/ });
    await selectedTab.press("End");
    await expect(
      main.getByRole("tab", { name: /04 Colaboración I\+D/ }),
    ).toHaveAttribute("aria-selected", "true");
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
