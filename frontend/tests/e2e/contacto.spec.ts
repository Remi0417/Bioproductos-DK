import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.use({ trace: "off", screenshot: "off", video: "off" });

for (const width of [375, 768, 1440]) {
  test(`Contacto: canales, formulario y responsive ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/contacto");
    const main = page.getByRole("main");
    await expect(
      main.getByRole("heading", {
        level: 1,
        name: "Las buenas ideas empiezan conversando.",
      }),
    ).toBeVisible();
    await expect(
      main.getByRole("link", { name: /biocontacto@/ }),
    ).toHaveAttribute("href", "mailto:biocontacto@bioproductosdk.com");
    await expect(
      main.getByRole("link", { name: /\+56 9 7977 1179/ }),
    ).toHaveAttribute("href", "tel:+56979771179");
    await expect(
      main.getByRole("link", { name: /\+56 9 7984 0382/ }),
    ).toHaveAttribute("href", "tel:+56979840382");
    await expect(
      main.getByRole("link", { name: /Ver mapa y cómo llegar/ }),
    ).toHaveAttribute("href", "/donde-comprar");
    await expect(main.getByLabel("Nombre *")).toBeVisible();
    await expect(main.getByLabel("Correo electrónico *")).toHaveAttribute(
      "type",
      "email",
    );
    await expect(main.getByLabel("Tu mensaje *")).toBeVisible();
    await expect(main.getByRole("link", { name: /Escríbenos/ })).toHaveCSS(
      "color",
      "rgb(255, 255, 255)",
    );
    await expect(
      main.getByRole("button", { name: /Enviar consulta/ }),
    ).toHaveCSS("color", "rgb(255, 255, 255)");
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
      await page
        .locator("html")
        .evaluate((element) => element.setAttribute("data-theme", "dark"));
      await expect(main.getByRole("link", { name: /Escríbenos/ })).toHaveCSS(
        "color",
        "rgb(23, 34, 27)",
      );
      await expect(
        main.getByRole("button", { name: /Enviar consulta/ }),
      ).toHaveCSS("color", "rgb(23, 34, 27)");
    }
  });
}
