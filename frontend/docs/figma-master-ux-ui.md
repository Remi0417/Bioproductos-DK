# BIOPRODUCTOS DK — MASTER UX UI

Figma Design: https://www.figma.com/design/N0Ro5ZM38uwZpUIti7GUAC

## Capture status

The Figma MCP connection was verified and the Design file was created on 2026-10-19. No browser captures have been imported yet. The app server is listening on `127.0.0.1:8000`, but this agent environment cannot connect to it or launch a desktop browser. Capture ID `b01a7d36-0b0b-4099-9298-1f85aca0153f` is pending and single-use. Open the exact hash URL supplied in the conversation in a browser on the same machine while the temporary Figma capture script is present, then poll the capture ID. The temporary script and CSP allowance are currently enabled solely for this import and must be removed after captures complete.

The capture workflow imports webpage structure as Figma layers; it does not prove that every complex component is recreated as a reusable component. Verify imported text, image fills, and layer hierarchy in Figma. `use_figma` design-system search returned no brand variables and only a generic Body text style, so no matching BioProductos DK component library was found.

## Implemented routes

### Editorial site (independent of the commerce backend)

| Page | Path | Notes |
|---|---|---|
| Inicio | `/` | Long page with editorial sections and anchored calls to action |
| Bio Investigación | `/bio-investigacion` | Research page |
| Productos | `/productos` | Editorial product presentation |
| Empresas | `/empresas` | Business page |
| Nosotras | `/nosotras` | About page |
| Contacto | `/contacto` | Contact form and contact links |
| Bio Impacto | `/bio-impacto` | Impact page |
| Dónde comprar | `/donde-comprar` | Store locator / buying information |
| Información legal | `/informacion-legal` | Exists, explicitly marked pending legal review in source |
| Donaciones | `/donaciones` | Additional editorial page |
| Demo | `/demo` | Standalone preview route; inspect before including as a public-facing screen |

### Commerce routes (require the configured Medusa region/backend and real route data)

- Store: `/[countryCode]/store`, `/[countryCode]/categories/[...category]`, `/[countryCode]/collections/[handle]`
- Product: `/[countryCode]/products/[handle]`
- Cart and checkout: `/[countryCode]/cart`, `/[countryCode]/checkout`
- Account: `/[countryCode]/account`, `/account/profile`, `/account/addresses`, `/account/orders`, `/account/orders/details/[id]`, and verify-account
- Order: confirmation and transfer request/accept/decline routes with dynamic order IDs/tokens

These are route templates, not evidence that all have valid populated data. Product/collection/category handles, account state, cart contents, and order IDs/tokens must come from safe demo data. Do not submit checkout or payment.

## Navigation and prototype wiring

- Shared editorial header primary navigation: `/`, `/bio-investigacion`, `/productos`, `/empresas`, `/nosotras`, `/contacto`.
- Editorial footer/complementary navigation: `/bio-impacto`, `/donde-comprar`, `/informacion-legal`, `/donaciones`.
- Mobile navigation is a modal drawer with open, close, Escape, backdrop-dismiss, and link navigation states.
- Main editorial flows: Inicio → Bio Investigación / Productos / Dónde comprar / Contacto; Nosotras → Bio Investigación / Productos; Contacto → Dónde comprar / Bio Investigación / Empresas / Productos; Bio Impacto and Donaciones cross-link to one another and Contacto.
- Commerce flows: store/category/collection → product detail → cart → checkout; account → profile/addresses/orders → order detail. Keep checkout and payment states as documentation-only prototype links unless using non-submitting safe fixtures.

## Responsive captures to add

For every available route, create named Desktop 1440 and Mobile 390 frames. Add Tablet 768 only where the live breakpoint changes the layout. For the editorial routes, also capture the mobile drawer open. For commerce, capture only safe, non-submitting states: empty/populated cart when available, product option/card states, account navigation, and checkout steps before payment submission.

## Visual fidelity checklist

Source editorial typeface: Manrope variable (`@fontsource-variable/manrope`). Brand palette in `apps/storefront/src/app/(editorial)/editorial.css` includes forest `#1b563c`, leaf `#2f7146`, ink `#18372a`, paper `#fbf8f0`, lime `#d6e9a3`, and sage `#e3eed2`. Original assets are under `apps/storefront/public/images/`. Compare those against the Figma image fills and verify frame widths (1440/768/390), section order, crop, and font loading after capture.
