import type { MedusaContainer } from "@medusajs/framework/types";
import { ContainerRegistrationKeys } from "@medusajs/framework/utils";

// The upstream Europe/apparel seed is intentionally replaced. Migrations never create demo stock.
export default async function initialDataSeed({
  container,
}: {
  container: MedusaContainer;
}) {
  container
    .resolve(ContainerRegistrationKeys.LOGGER)
    .info(
      "Migraciones listas. Ejecuta npm run db:seed desde la raíz para el dataset DK local.",
    );
}
