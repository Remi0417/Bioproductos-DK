import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.use({ trace: "off", screenshot: "off", video: "off" });

for (const width of [375, 768, 1440]) {
  test(`Productos: catálogo, selección, accesibilidad y responsive ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/productos");
    const main = page.getByRole("main");
    await expect(
      main.getByRole("heading", {
        level: 1,
        name: "Cuidado para cada día.",
      }),
    ).toBeVisible();
    await expect(main.getByRole("article")).toHaveCount(6);
    await expect(
      main.getByText(
        "Precios ficticios de demostración. No se procesan pagos, pedidos ni despachos reales.",
      ),
    ).toBeVisible();

    const categoryPicker = main.getByRole("group", {
      name: "Filtrar productos por categoría",
    });
    await categoryPicker
      .getByRole("button", { name: "Cuidado del hogar" })
      .click();
    await expect(main.getByRole("article")).toHaveCount(2);
    await categoryPicker
      .getByRole("button", { name: "Cuidado personal" })
      .click();
    await expect(main.getByRole("article")).toHaveCount(4);
    await categoryPicker.getByRole("button", { name: "Ver todo" }).click();
    await expect(main.getByRole("article")).toHaveCount(6);

    const search = main.getByRole("searchbox", {
      name: "Buscar en el catálogo",
    });
    await search.fill("eucalipto");
    await expect(main.getByRole("article")).toHaveCount(1);
    await expect(
      main.getByRole("heading", {
        name: "Detergente para ropa · aroma a eucalipto",
      }),
    ).toBeVisible();
    await search.clear();

    await main.getByRole("button", { name: "Cabello graso" }).click();
    const shampooCard = main.getByRole("article").nth(2);
    await shampooCard
      .getByRole("button", { name: "Aumentar cantidad de Shampoo sólido" })
      .click();
    await shampooCard
      .getByRole("button", { name: "Aumentar cantidad de Shampoo sólido" })
      .click();
    await shampooCard
      .getByRole("button", { name: /Agregar al carrito/ })
      .click();
    await expect(page.getByText("Producto agregado")).toBeVisible();
    await expect(
      page.locator('[data-home-photo="home-products-shampoo"]'),
    ).toHaveCount(2);
    await main
      .getByRole("button", { name: /Agregar al carrito/ })
      .first()
      .click();
    await expect(
      page.getByRole("button", { name: "Abrir carrito, 4 productos" }),
    ).toBeVisible();
    await page
      .getByRole("button", { name: "Abrir carrito, 4 productos" })
      .click();
    await page
      .getByRole("link", { name: "Ver carrito de demostración" })
      .click();
    const dialog = page.locator('[role="dialog"][aria-modal="true"]');
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole("listitem")).toHaveCount(2);
    await expect(dialog.getByLabel("Cantidad: 3")).toBeVisible();
    await dialog
      .getByRole("button", {
        name: "Aumentar Detergente para ropa · aroma cítrico",
      })
      .click();
    await expect(dialog.getByLabel("Cantidad: 2")).toBeVisible();
    await expect(dialog.getByText("Subtotal demo")).toBeVisible();
    await dialog
      .getByRole("button", { name: "Continuar con compra de prueba" })
      .click();
    await expect(
      dialog.getByRole("heading", { name: "Resumen de tu pedido" }),
    ).toBeVisible();
    await expect(
      dialog.getByText("Sin datos, pago ni despacho real"),
    ).toBeVisible();
    await dialog
      .getByRole("button", { name: "Confirmar compra de demostración" })
      .click();
    await expect(dialog.getByText("SIMULACIÓN COMPLETADA")).toBeVisible();
    await expect(
      dialog.getByText("No se envió ningún pedido ni se realizó un cobro."),
    ).toBeVisible();
    await dialog.getByRole("button", { name: "Seguir explorando" }).click();
    await expect(dialog).toBeHidden();

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
