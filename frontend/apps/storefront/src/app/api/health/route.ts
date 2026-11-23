export function GET() {
  return Response.json(
    {
      service: "dk-storefront",
      mode:
        process.env.DK_DEMO_PREVIEW === "true"
          ? "design-preview"
          : "local-commerce",
      backend: "not-probed",
    },
    { headers: { "Cache-Control": "no-store" } },
  )
}
