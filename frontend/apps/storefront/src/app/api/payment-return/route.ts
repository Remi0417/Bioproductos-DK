import { NextResponse } from "next/server"

// Providers remain disabled until authorized sandbox integrations are verified.
export async function GET() {
  return NextResponse.json(
    {
      message:
        "Retornos de pago deshabilitados. Integración sandbox pendiente de pruebas.",
    },
    { status: 503 },
  )
}
