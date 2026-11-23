import type { ExecArgs } from "@medusajs/framework/types";
import {
  MedusaError,
  ContainerRegistrationKeys,
  ProductStatus,
} from "@medusajs/framework/utils";
import {
  createApiKeysWorkflow,
  createInventoryLevelsWorkflow,
  createProductsWorkflow,
  createRegionsWorkflow,
  createSalesChannelsWorkflow,
  createStockLocationsWorkflow,
  createStoresWorkflow,
  linkSalesChannelsToApiKeyWorkflow,
  linkSalesChannelsToStockLocationWorkflow,
} from "@medusajs/medusa/core-flows";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { assertLocalDemoEnvironment } from "../lib/demo-safety";

type DemoProduct = {
  sku: string;
  handle: string;
  name: string;
  category: string;
  price: number;
  stock: number;
};

/** Sequential, recoverable seed. Never resets existing prices or inventory. DB verification pending. */
export default async function seedDkDemo({ container }: ExecArgs) {
  assertLocalDemoEnvironment(process.env);
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
  const query = container.resolve(ContainerRegistrationKeys.QUERY);
  const catalog: DemoProduct[] = JSON.parse(
    readFileSync(
      resolve(process.cwd(), "../../data/demo-catalog.json"),
      "utf8",
    ),
  );
  if (
    catalog.length !== 8 ||
    catalog.some(
      (p) =>
        !p.sku.startsWith("DEMO-") ||
        !Number.isSafeInteger(p.price) ||
        p.price < 0 ||
        !Number.isSafeInteger(p.stock) ||
        p.stock < 0,
    )
  ) {
    throw new MedusaError(
      MedusaError.Types.INVALID_DATA,
      "Dataset DEMO inválido.",
    );
  }

  const { data: channels } = await query.graph({
    entity: "sales_channel",
    fields: ["id"],
    filters: { name: "DK DEMO" },
  });
  let channel: { id: string } | undefined = channels[0];
  if (!channel) {
    const { result } = await createSalesChannelsWorkflow(container).run({
      input: {
        salesChannelsData: [
          {
            name: "DK DEMO",
            description: "Canal local de prueba; sin venta real.",
          },
        ],
      },
    });
    channel = result[0];
  }
  const { data: stores } = await query.graph({
    entity: "store",
    fields: ["id", "name"],
  });
  if (!stores.length) {
    await createStoresWorkflow(container).run({
      input: {
        stores: [
          {
            name: "BioProductos DK · DEMO",
            supported_currencies: [{ currency_code: "clp", is_default: true }],
            default_sales_channel_id: channel.id,
          },
        ],
      },
    });
  } else if (stores.some((s) => s.name !== "BioProductos DK · DEMO")) {
    throw new MedusaError(
      MedusaError.Types.INVALID_DATA,
      "Base no vacía con tienda ajena al seed DK. Revisar manualmente; no se sobrescribe.",
    );
  }
  const { data: regions } = await query.graph({
    entity: "region",
    fields: ["id"],
    filters: { name: "Chile · DEMO" },
  });
  if (!regions.length) {
    await createRegionsWorkflow(container).run({
      input: {
        regions: [
          {
            name: "Chile · DEMO",
            currency_code: "clp",
            countries: ["cl"],
            automatic_taxes: false,
            payment_providers: [],
          },
        ],
      },
    });
  }
  const { data: locations } = await query.graph({
    entity: "stock_location",
    fields: ["id", "sales_channels.id"],
    filters: { name: "Bodega ficticia · DEMO" },
  });
  let location:
    | { id: string; sales_channels?: ({ id: string } | null)[] | null }
    | undefined = locations[0];
  if (!location) {
    const { result } = await createStockLocationsWorkflow(container).run({
      input: {
        locations: [
          {
            name: "Bodega ficticia · DEMO",
            address: {
              country_code: "cl",
              city: "Ciudad de prueba",
              address_1: "Dirección ficticia, sin retiro presencial",
            },
          },
        ],
      },
    });
    location = result[0];
  }
  if (!location.sales_channels?.some((c) => c?.id === channel.id)) {
    await linkSalesChannelsToStockLocationWorkflow(container).run({
      input: { id: location.id, add: [channel.id] },
    });
  }
  const { data: profiles } = await query.graph({
    entity: "shipping_profile",
    fields: ["id"],
    filters: { type: "default" },
  });
  if (!profiles[0])
    throw new MedusaError(
      MedusaError.Types.INVALID_DATA,
      "Falta shipping_profile nativo. Ejecutar migraciones Medusa primero.",
    );

  for (const item of catalog) {
    const { data: products } = await query.graph({
      entity: "product",
      fields: ["id", "metadata"],
      filters: { handle: item.handle },
    });
    if (products[0] && products[0].metadata?.dk_demo !== true)
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "Colisión de handle con producto ajeno al seed.",
      );
    if (!products.length) {
      await createProductsWorkflow(container).run({
        input: {
          products: [
            {
              title: `${item.name} · DEMO`,
              handle: item.handle,
              description:
                "Referencia de prueba. Nombre, precio y stock ficticios. Fórmula, aroma, tamaño e instrucciones pendientes de aprobación. No disponible para venta real.",
              status: ProductStatus.PUBLISHED,
              shipping_profile_id: profiles[0].id,
              metadata: {
                dk_demo: true,
                content_status: "pending_approval",
                demo_category: item.category,
              },
              sales_channels: [{ id: channel.id }],
              options: [{ title: "Presentación", values: ["DEMO"] }],
              variants: [
                {
                  title: "Referencia de prueba",
                  sku: item.sku,
                  manage_inventory: true,
                  allow_backorder: false,
                  options: { Presentación: "DEMO" },
                  prices: [{ currency_code: "clp", amount: item.price }],
                },
              ],
            },
          ],
        },
      });
    }
    const { data: inventory } = await query.graph({
      entity: "inventory_item",
      fields: ["id"],
      filters: { sku: item.sku },
    });
    if (!inventory[0])
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "Producto sin ítem de inventario; revisar antes de repetir.",
      );
    const { data: levels } = await query.graph({
      entity: "inventory_level",
      fields: ["id"],
      filters: { inventory_item_id: inventory[0].id, location_id: location.id },
    });
    if (!levels.length) {
      await createInventoryLevelsWorkflow(container).run({
        input: {
          inventory_levels: [
            {
              inventory_item_id: inventory[0].id,
              location_id: location.id,
              stocked_quantity: item.stock,
            },
          ],
        },
      });
    }
  }
  const { data: keys } = await query.graph({
    entity: "api_key",
    fields: ["id", "sales_channels.id"],
    filters: { title: "DK DEMO Storefront", type: "publishable" },
  });
  let key:
    | { id: string; sales_channels?: ({ id: string } | null)[] | null }
    | undefined = keys[0];
  if (!key) {
    const { result } = await createApiKeysWorkflow(container).run({
      input: {
        api_keys: [
          { title: "DK DEMO Storefront", type: "publishable", created_by: "" },
        ],
      },
    });
    key = result[0];
  }
  if (!key.sales_channels?.some((c) => c?.id === channel.id)) {
    await linkSalesChannelsToApiKeyWorkflow(container).run({
      input: { id: key.id, add: [channel.id] },
    });
  }
  logger.info(
    "Seed DK DEMO ejecutado. Revisa Admin > Settings > Publishable API Keys; no se imprimen claves. Repetir secuencialmente para verificar idempotencia. Sin pagos ni envíos habilitados.",
  );
}
