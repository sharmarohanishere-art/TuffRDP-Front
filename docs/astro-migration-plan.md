# Next.js to Astro migration and architecture plan

**Status:** approved planning baseline; no application migration has been performed by this document.

## Evidence and scope

### Verified existing behavior

| Area | Finding |
| --- | --- |
| Framework and build | Next.js `16.3.1`, React `18.3.1`, and TypeScript `7.0.2`. `npm run build` succeeds and generates static `/` plus Next's generated `/_not-found`. |
| Routes/layouts | One App Router route: `app/page.tsx` for `/`; one root layout in `app/layout.tsx`; no nested layouts, route groups, dynamic routes, route handlers, middleware, redirects, rewrites, or headers configuration. |
| Rendering/data | `/` reads `public/site-body.html` synchronously with Node `fs`/`path` and sends it to a client React component. No network fetching, API route, CMS, database, auth, session, environment variable, or form submission exists in this repository. |
| UI architecture | There are no authored shared UI components. `app/LandingPage.tsx` is one client component that injects captured markup with `dangerouslySetInnerHTML` and then finds nodes by CSS selectors and visible copy. |
| Interactivity | The client component adds a theme toggle/localStorage behavior, scroll header state, reveal animations, operating-system/application filtering, search, and FAQ answers/accordion behavior. The captured header, location controls, mobile menu, language control, and dropdown triggers have markup but no corresponding implementation here. |
| Content/visual surface | The captured page contains hero, five pricing cards, value proposition, locations, operating-system/application catalogue, twelve FAQs, CTA, and footer. It includes external links to `rdp.sh`, Telegram, X, and `rdp.fail`. |
| Styling | `app/globals.css` contains only custom behavior styles. The page also links two prebuilt public CSS files (about 425 KB total), one a broad generated Tailwind-like bundle that includes unrelated application styles. No Tailwind/PostCSS config is present. |
| SEO | Next metadata supplies only `RDP.sh Landing Page` and a generic description. No verified canonical, Open Graph, Twitter metadata, JSON-LD, sitemap, robots, manifest, or explicit favicon links are implemented by this repository. An OG image and favicon assets exist under `public/images/` but are not wired by source code. |
| Assets | 24 image/icon assets plus a 178 KB HTML capture and 425 KB CSS are in `public/`. Hero poster is 1920×1080. `ieUj...png` is a 1024×1024 image weighing about 1.4 MB but is displayed as a small application icon. |
| Third parties/analytics | No analytics, pixels, tag manager, chat, payment, or other third-party script is present in source. External destinations are links only. |
| Deployment | No deployment, CI, Docker, adapter, or host configuration exists. Next emits a warning because it detects a parent `package-lock.json` outside this Git repository. |

### Important capture caveat

`site-body.html` is not clean source. It begins with a malformed/inert serialized `data-page` payload and includes Vue/Headless UI hydration markers (`<!--[-->`, `headlessui`, `teleport`) plus opaque inline SVG. That payload exposes unrelated backend-looking route and plan data but it is not consumed by the Next application. Treat it as a static visual/content reference only; do not migrate it as a backend contract or source of truth.

### Unknown / requires verification before cutover

- The production canonical origin, host/CDN, redirects, security headers, and DNS ownership.
- Whether external `rdp.sh` destinations should stay external or become routes managed by this repository.
- The desired behavior and menus for the currently nonfunctional dropdown, mobile-nav, location, and language controls.
- The legally approved text, pricing freshness policy, availability data source, analytics consent requirements, and whether the FAQ answers injected by React are approved content.
- Supported locales, CMS selection, form provider/CRM, analytics vendor, image licensing, performance baseline, and visual acceptance baseline.

## What changes and what does not

| Classification | Plan |
| --- | --- |
| Migrate directly | Brand copy, pricing/feature content after verification, footer/navigation information architecture, SVG icons, the hero image, dark/light tokens, and route `/`. |
| Rewrite | The entire presentation layer: captured HTML becomes semantic Astro components and typed data; CSS becomes a deliberately scoped token/component system; metadata becomes a shared SEO contract. |
| Remove | `site-body.html`, the generic client `LandingPage`, `dangerouslySetInnerHTML`, selector/text-dependent DOM mutation, unused embedded capture state, inherited Headless UI/Vue markers, and the oversized/unscoped generated CSS bundle. |
| React islands | None in the initial route. If retained, mobile navigation and a multi-select catalogue filter are candidates only when native HTML cannot meet the approved UX. Keep islands small and independent. |
| Pure Astro | Layout, navigation markup, hero, pricing, feature grid, locations, catalogue cards, FAQ (native `<details>`), CTA, footer, structured data, sitemap, robots, and static content pages. |

## Target architecture

Use Astro in `output: 'static'` mode. Add an adapter only when a specific endpoint or request-time need is approved. The target is a content-driven marketing site, not an Astro version of the current React shell.

```text
src/
  assets/                       # Imported, optimizable source images/fonts; never remote secrets
    images/
    icons/
  components/
    ui/                         # Small primitives: Button, Container, Icon, VisuallyHidden
    marketing/                  # Composable, content-agnostic units: PlanCard, FeatureCard, Logo
    islands/                    # Isolated React/vanilla interactive components only
  sections/                     # Complete reusable marketing sections, Astro by default
    Hero.astro
    PricingGrid.astro
    Faq.astro
  layouts/
    BaseLayout.astro            # html/head/body/global behavior
    MarketingLayout.astro       # Header, main landmark, Footer
    ContentLayout.astro         # Blog/docs shell when introduced
  pages/                        # Routing only; compose layouts + sections, no business data
    index.astro
    404.astro
    robots.txt.ts
    sitemap-index.xml.ts        # Or @astrojs/sitemap only after host is known
  content/
    config.ts                   # Content collection schemas
    blog/                       # Future editorial MD/MDX
    guides/                     # Future documentation/guides
  data/                         # Typed, versioned local page/section data
    home.ts
    navigation.ts
    products.ts
  config/                       # Site constants and policy, not presentation markup
    site.ts                     # URL, brand, default SEO, social links
    analytics.ts                # Provider enablement/configuration contract
  integrations/                 # Thin wrappers for forms/analytics/CMS; one owner per vendor
  lib/                          # Pure utilities: SEO builder, JSON-LD serialization, URL helpers
  styles/
    tokens.css                  # Color, spacing, type, radius, z-index, motion custom properties
    global.css                  # Reset, base elements, focus, reduced motion
    utilities.css               # Deliberate shared utility classes only if needed
  types/                        # Shared domain/configuration types
public/                         # Verbatim static files only (favicons, robots inputs if static)
docs/                           # Architecture, migration, delivery, and inventory records
tests/
  e2e/                          # Route, interaction, metadata and link tests
  visual/                       # Approved Playwright visual baselines/config
```

### Boundaries and import direction

`pages → layouts/sections → components → data/config/lib/types/assets`. `integrations` may be used by pages, server endpoints, or an island, but UI components must not import a vendor SDK. `data` and `content` never import UI. `sections` assemble components but do not own global metadata or route decisions. A page-specific one-off stays next to its page only until a second real reuse proves it should graduate to `sections` or `components/marketing`.

### Content strategy

- **`config/`**: stable business-wide choices such as site URL, default title suffix, social accounts, feature flags, and analytics IDs supplied through public environment variables.
- **`data/`**: structured business data repeatedly rendered by a page (plans, FAQ, locations, navigation). Validate with TypeScript or Zod; no copy of a plan price inside a component.
- **Content Collections**: authored, many-entry content with independent URLs and publish metadata: blog posts, guides, changelog, comparison pages if editorially managed. Collections use schemas, draft flags, descriptions, images, dates, authors, and locale.
- **Page markup**: only route-specific composition and truly unique explanatory prose. It must not become a second CMS.
- **Future CMS**: make a build-time loader map CMS records into the same collection/data shape. Do not leak CMS types into components.

### Page assembly convention

Pages compose sections from typed data, for example `MarketingLayout → Hero → PricingGrid → FeatureGrid → Faq → Cta`. A section accepts an explicit domain-shaped prop (such as `plans: Plan[]`), not a sprawling `content: any`. A primitive exposes behavior/style variants, not a pile of page flags. `.astro` is the default; a React component exists only inside `components/islands/` and must document its hydration directive.

## Next.js to Astro feature mapping

| Current/possible Next feature | Astro design |
| --- | --- |
| `app/page.tsx` | `src/pages/index.astro`; static by default. |
| `app/layout.tsx` | `BaseLayout.astro` + `MarketingLayout.astro`; use slots and typed metadata props. |
| `Metadata` export | Shared `SeoHead.astro` or `BaseLayout` props generated by `lib/seo.ts`. |
| `next/image` (not currently used) | Astro imported assets and `<Image>`/`<Picture>`; use `public/` only where transformation is not wanted. |
| App Router file routes | `src/pages` file routing; `getStaticPaths()` for future dynamic content routes. |
| Client component | First prefer HTML/CSS (`details`, dialog, form controls); otherwise a small React island or vanilla module. |
| Route handlers/server actions (not present) | Static external form endpoint first; Astro action/API endpoint only for a validated server need with anti-spam and secret handling. |
| Middleware (not present) | Avoid. Use host redirects/static rules; add Astro middleware only for a proven request-time concern. |
| `public/` assets | Move source images that need optimization to `src/assets`; retain favicons/static immutable files under `public/`. |
| `NEXT_PUBLIC_*` env values (not present) | `PUBLIC_*` only for non-secret browser-visible configuration; keep secrets server-only and do not use them in static client code. |

## Route migration matrix

| Current route | Current implementation | Astro destination | Rendering | Components | Required rewrite | SEO | Risk / validation |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `/` | `page.tsx` reads captured HTML; `LandingPage` injects/mutates it | `src/pages/index.astro` | Static prerender | MarketingLayout; Header; Hero; PricingGrid; ValueProps; Locations; Catalogue; Faq; CTA; Footer | Complete semantic rebuild; type all content; replace runtime selector logic | Preserve URL; replace generic title/description; add canonical, OG/Twitter, Organization/WebSite/FAQPage schema when content is approved | High. Visual desktop/mobile diff; keyboard/mobile menu/FAQ checks; route HTML/meta/link checks; production build. |
| `/_not-found` | Generated by Next | `src/pages/404.astro` | Static | MarketingLayout or minimal ErrorLayout | New purposeful 404 | `noindex`, canonical policy verified | Low. Direct request and accessibility check. |
| All `https://rdp.sh/...` links | External hard-coded destinations | Stay absolute initially | N/A | Navigation/footer/catalogue data | Centralize in data/config; migrate only after ownership/redirect decision | Do not claim local route parity; verify hrefs | Medium external dependency. Link audit and product-owner approval. |

## Dependency migration matrix

| Current dependency | Used where/why | Decision | Astro-compatible alternative | Impact |
| --- | --- | --- | --- | --- |
| `next` | App Router/build/static generation | Remove at final cutover | `astro` | Replace scripts/config/routes. |
| `react`, `react-dom` | `LandingPage` client runtime only | Remove initially | No framework runtime; add `@astrojs/react` only for approved islands | Eliminates site-wide hydration. |
| `@types/react` | React component typing | Remove with React | N/A | Remove. |
| `@types/node` | `fs`/`path` use and tooling | Keep only if tooling/config needs it | Astro/Node build tooling | Reassess after source rewrite. |
| `typescript` | Type checking | Keep and tighten | Astro TypeScript support | Enable strict mode after migration fixes. |
| Captured Tailwind CSS | Styles captured page, includes unrelated classes | Remove, do not migrate verbatim | Token CSS plus either deliberate Tailwind setup or authored CSS modules/scoped styles | High visual-parity risk; baseline first. |
| Headless UI/Vue artifacts | Static capture markers only | Remove | Native HTML or a small island | No package is required. |

## Phased implementation plan

Each phase is a checkpoint; do not replace production in one branch-wide rewrite.

| Phase | Objective and exact work | Areas/dependencies | Risks | Validation and result |
| --- | --- | --- | --- | --- |
| 1. Audit baseline | Freeze current route list, screenshots, rendered HTML, link list, metadata, assets, interaction inventory, build output, and Lighthouse/Web Vitals baseline. Confirm unknowns with owner. | Current `app/`, `public/`, live host if available | Treating capture data as real application state | Build passes; desktop/mobile screenshots; approved parity checklist. |
| 2. Feature/dependency map | Classify every observed behavior as preserve, redesign, remove, or unknown. Confirm external URLs and legacy redirect map. | Audit artifacts; product owner | Hidden production behavior outside repo | Signed route/feature matrix and dependency disposition. |
| 3. Target architecture | Accept this document; create ADRs for static output, styling choice, host, forms, analytics, CMS/i18n trigger points. | `docs/`, AGENTS | Premature vendor commitment | Architecture review; no coding ambiguity. |
| 4. Astro foundation | Create Astro app structure alongside or on a migration branch; set `output: 'static'`, site URL via env/config, strict TS, format/lint/check/build scripts. Do not add server adapter. | `package.json`, `astro.config.*`, `src/` | Tooling disruption | `astro check`, production build, preview `/`; legacy remains available until parity. |
| 5. Design system/styles | Extract visual tokens and breakpoints from the capture; add reset, focus, reduced motion, dark theme strategy. Decide Tailwind only if source ownership/utility speed outweighs CSS simplicity. | `src/styles`, `components/ui` | Pixel drift / CSS bloat | Token tests/manual theme and viewport comparisons; no imported 407 KB legacy bundle. |
| 6. Shared components | Build Logo, Container, Button/Link, Header, Footer, card primitives, icon approach. Move nav/footer links into typed data. | `components/ui`, `components/marketing`, `data` | Over-abstracting a one-page site | Component examples, keyboard checks, visual snapshots. |
| 7. Layouts | Implement BaseLayout metadata contract and MarketingLayout landmarks/skip link. Apply global theme behavior without a React root. | `layouts`, `lib/seo`, `config/site` | Flash of wrong theme / missing metadata | No-JS page rendering, theme persistence, heading/landmark audit. |
| 8. Route-by-route pages | Rebuild `/` section-by-section. Add explicit `404`. Preserve exact URL and externally owned links. Build future route templates only after a real page requires them. | `pages`, `sections`, `data` | Scope creep/design change hidden as migration | Per-section visual diff, content approval, responsive review, broken-link test. |
| 9. Interactive islands | Replace FAQ with `<details>` first; use CSS for reveal/hover. Prototype native mobile nav/dialog; add island only for justified retained filter/search or complex menu. Give every island a hydration rationale. | `components/islands` | Accidental whole-page React hydration | Inspect emitted JS; keyboard, reduced-motion and no-JS fallbacks. |
| 10. SEO/meta | Implement canonical, title/description templates, OG/Twitter, robots, sitemap, favicons, semantic headings, and approved JSON-LD. | `layouts`, `lib`, `pages` | Wrong canonical/duplicate content/schema mismatch | Rendered head snapshots; structured-data validator; crawl/link check. |
| 11. Assets/images | Move transformable source images to `src/assets`; generate responsive formats/sizes, explicit dimensions, hero fetch priority, and optimized icons. Remove duplicates/unused capture assets after parity. | `assets`, `public` | LCP regression, missing assets | Image audit, browser network check, CLS and LCP comparison. |
| 12. Forms/integrations | If a lead form is approved, choose provider endpoint or narrowly scoped server endpoint; add validation, success/error states, consent, rate limiting/honeypot, and observability. Add analytics only through a central integration. | `integrations`, env config | Privacy, spam, secret leakage | Submit/error tests, CSP, consent/opt-out test, no secret in client output. |
| 13. Performance | Remove unused CSS/JS, defer noncritical integrations, enforce image/font policy, audit third parties, configure CDN cache behavior. Do not add compression/critical-CSS plugins without measured need. | Build/host config | Cosmetic optimizations obscuring regressions | Lighthouse and transfer-size budgets; emitted-asset inspection. |
| 14. Regression/testing | Add unit tests for pure `lib`/schemas, Playwright route/metadata/interaction tests, visual snapshots, link check, accessibility scans/manual smoke. | `tests`, CI | Flaky screenshots / bad baselines | CI green on three viewport classes; reviewed baselines. |
| 15. Deployment | Configure chosen static host preview/prod, cache headers, atomic deploy/rollback, redirects, domains, CSP/security headers, source maps policy, CI gates. | Host config/CI | Broken canonical/asset paths | Preview checklist, curl headers, rollback rehearsal. |
| 16. Production cutover | Deploy Astro with the same public URL and redirects, monitor error/SEO/analytics/Core Web Vitals, retain rollback artifact. | Host/DNS/product | Indexing or conversion drop | 24–72 hour monitoring; Search Console/crawl verification. |
| 17. Cleanup | Remove Next source/deps/build output/capture artifacts only after cutover acceptance. Update docs and ownership. | Legacy files/package locks | Deleting needed baseline too soon | Clean build from clone; no Next import or capture dependency remains. |

## SEO, assets, integrations, and deployment rules

### SEO

Every indexable page requires a unique title, description, canonical from `config/site.ts`, Open Graph image/alt, social metadata when configured, semantic one-`h1` hierarchy, and sitemap inclusion. Schema is generated from typed data only: `Organization`/`WebSite` globally; `Product` only with verified offer facts; `FAQPage` only for visible, approved FAQs. Drafts, search results, 404s, and thin campaign variants must use deliberate robots policy.

### Images and fonts

Use Astro assets for local content images; specify width/height or aspect ratio; use responsive `sizes`; mark only the true LCP image high priority; lazy-load below-fold imagery. Retain SVG as source where it remains semantically appropriate. Replace the 1.4 MB N8N icon with a correctly sized optimized source before launch. Self-host subset WOFF2 fonts only when brand requirements require them; otherwise use a strong system stack. `font-display: swap`/`optional`, no render-blocking font experiments without measurement.

### Forms and dynamic work

Static HTML forms posting to a provider are preferred. A server endpoint/action is justified only for secret-bearing vendor calls, validation that cannot be trusted to a provider, or a bespoke workflow. Any endpoint needs explicit input schema validation, abuse controls, error UX, secrets outside `PUBLIC_*`, and monitoring. Authentication/session work is out of scope until a concrete requirement exists; link to the existing `rdp.sh` account flow instead.

### Analytics and marketing scripts

Use one `integrations/analytics` owner and typed configuration. Load only after consent where required; use `defer`/`async` or a lazy facade when vendor guidance permits; never scatter script tags through sections. Event names belong in a typed event map. Audit transfer size, long tasks, privacy terms, and opt-out behavior before enabling a vendor.

### Static deployment, caching, and CDN

Publish static output to a CDN-backed host. HTML: `no-cache` or a short revalidation policy so releases propagate. Hashed build assets: `public, max-age=31536000, immutable`. Public un-hashed assets: shorter cache with `stale-while-revalidate`. Images generated by Astro should receive immutable hashed URLs. Configure host-level 301 redirects only from an approved map. Use adapter/SSR only for a verified exception; never switch the whole site to SSR for a form or analytics tag.

## Performance, quality, and acceptance targets

- Static HTML for all current marketing content; no React runtime for the home page unless a retained island proves necessary.
- Initial route JavaScript: 0 KB framework hydration preferred; each exception is documented with its owner and hydration directive.
- Mobile performance target: LCP ≤ 2.5 s, CLS ≤ 0.1, INP ≤ 200 ms at the 75th percentile after sufficient real-user data; lab Lighthouse performance/accessibility/SEO/best-practices ≥ 95 for the launch route under a documented test profile.
- No blocking third-party script on the critical path; no unresolved image dimensions; no auto-running reveal animation when `prefers-reduced-motion: reduce`.
- Type check and production build on every significant change; route/head/link checks for content/routing changes; E2E + visual + accessibility checks for UI or interaction changes.

## Main risks and mitigations

| Risk | Mitigation |
| --- | --- |
| Captured HTML hides intended behavior | Treat all non-implemented controls as unknown; obtain product decisions before rebuilding them. |
| Visual parity lost while replacing 425 KB CSS | Capture baselines first, migrate section-by-section, and approve intentional design changes separately. |
| SEO regression from generic current metadata | Establish production URL and metadata inventory before launch; compare rendered head and redirects. |
| Scope turns into a rewrite of external RDP product | Keep links external and define a route-ownership boundary. |
| New CMS/i18n/backend overengineered | Add only contract boundaries now; introduce vendors/adapters only when content cadence or request-time requirements justify them. |
| Script/dependency creep | Apply the dependency policy in `AGENTS.md`, audit emitted JS, and require a named owner for every integration. |
