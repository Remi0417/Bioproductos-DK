import { MedusaError } from "@medusajs/framework/utils";
import type { ExecArgs } from "@medusajs/framework/types";

export default async function legacySeed(_args: ExecArgs) {
  throw new MedusaError(
    MedusaError.Types.INVALID_DATA,
    "Seed genérico deshabilitado. Usa npm run db:seed desde la raíz para las ocho referencias DK DEMO.",
  );
}
