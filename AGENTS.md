# RDP.sh marketing site — agent handbook

## Project overview

This repository is the Astro marketing/showcase frontend for RDP.sh.

Astro is used for its static-first model: content is HTML by default, pages build ahead of time, and browser JavaScript is a deliberate exception. Dynamic/server functionality is acceptable only for a verified requirement such as a secure form submission or a future authenticated product boundary. Do not create a backend, SSR deployment, session layer, or global client framework for marketing content.

Objectives: strong SEO, fast Core Web Vitals, accessible UI, reusable marketing sections, type-safe content, and small dependency surface.

## Architecture principles

1. Astro first: `.astro` components and static HTML are the default.
2. JavaScript is a cost. Use native HTML/CSS before an island, and hydrate only the smallest interactive boundary.
3. Reuse sections and typed data instead of copying marketing markup or plan facts across pages.
4. Separate presentation (`components`, `sections`, `layouts`) from content/data (`content`, `data`, `config`).
5. Centralize site metadata, URLs, social links, analytics configuration, and feature flags.
6. Every indexable page has strong SEO defaults; every UI change is accessible and responsive.
7. Prefer the smallest maintained dependency; inspect emitted client JavaScript before approving a new runtime dependency.

## Repository architecture

The authoritative directory tree:

```text
src/
  assets/            Optimizable source images, icons, and fonts.
  components/
    ui/              Small global primitives (Button, Container, Icon, SkipLink).
    marketing/       Reusable content-agnostic marketing units (PlanCard, Logo).
    islands/         Small, documented client interactive components only (use sparingly).
  sections/          Complete reusable marketing sections (Hero, Faq, PricingGrid).
  layouts/           BaseLayout, MarketingLayout, ContentLayout.
  pages/             File routes and route-level composition only.
  content/           Astro content collections: blog, guides, documentation.
  data/              Typed reusable local business/content data.
  config/            Site/brand/default SEO and vendor configuration.
  integrations/      Thin vendor boundaries for analytics, forms, future CMS.
  lib/               Pure helpers (SEO builder, JSON-LD, URL helpers).
  styles/            Tokens, global base styles, small shared utilities.
  types/             Shared domain/configuration types.
public/              Verbatim static files that do not need Astro processing.
docs/                Migration plan, architecture decisions, skill inventory.
tests/e2e/           Browser regression tests.
tests/visual/        Approved visual testing configuration/baselines.
```

What belongs where:

- `pages` may compose layouts/sections but must not contain duplicated section implementations or business constants.
- `sections` own a meaningful reusable page region; `components/marketing` owns a smaller unit used by one or more sections; `components/ui` owns generic visual primitives.
- `islands` must never be imported by default site chrome unless the chrome itself requires client state.
- `data` contains typed repeated page data; `content` contains independently published author content; `config` contains site-wide policy and identifiers; `integrations` is the only place vendor SDK logic belongs.
- Do not put API calls, CMS SDK imports, analytics scripts, or environment-variable reads inside presentational components.

Imports flow downward: `pages → layouts/sections → components → data/config/lib/types/assets`. `data` and `content` never import UI. `integrations` may be called by a page, server endpoint, or island, but components receive data via props rather than importing a vendor directly.

## Component decision framework

Ask these questions in order:

1. Does it need browser state/event handling after initial render?
   - No: Astro component.
   - Yes: continue.
2. Does native HTML solve it accessibly (link, `<details>`, `<dialog>`, form control, CSS `:target`/`popover`)?
   - Yes: Astro plus HTML/CSS, no island.
   - No: continue.
3. Can a tiny vanilla JS module handle it without adding a framework?
   - Yes: use a small vanilla module in `components/islands/`.
   - No: document why a framework island is needed and keep it as small as possible.
4. Is this reused?
   - Generic visual behavior: `components/ui`.
   - Repeated marketing region: `sections`.
   - One page/route only: colocate it with that page until a second real reuse.
5. Is it factual/repeated content rather than presentation?
   - Repeated business data: `data`/`config`.
   - Publishable entry: content collection.

Examples: a static pricing card is an Astro marketing component; a hero used on product pages is a reusable Astro section; pricing/specification values are typed data; a mobile menu that needs focus management may be a vanilla island; the FAQ uses `<details>` unless a proved interaction needs more.

## Naming, types, styling, and responsive conventions

- Use PascalCase for components and interfaces, camelCase for functions/data fields, kebab-case for route and collection filenames, and descriptive domain names (`pricingPlans`, not `items`).
- Use explicit TypeScript props; export shared domain types from `src/types`. Avoid `any`, giant multi-purpose props, and boolean-flag proliferation.
- Content collection schemas must validate title, description, publish state/date, slug, image alt/dimensions, author where applicable, locale when enabled, and any SEO overrides.
- Use `src/styles/tokens.css` custom properties for colors, type scale, spacing, radius, shadows, z-index, breakpoints/motion conventions. Components consume tokens rather than inventing near-duplicate values.
- Choose mobile-first responsive rules. Test 320–375 px, 768 px, and 1280+ px viewports. Reserve image dimensions and avoid breakpoint-specific duplicate content.
- Global styles own reset/base/focus/reduced-motion behavior. Scoped component styles or deliberately configured utilities own local presentation. Inline style is allowed only for dynamic values with no semantic CSS alternative; never use it as a general styling system.
- Support dark theme only if it remains approved behavior. Theme state must use vanilla JS or CSS only; respect system preference, persistence, `color-scheme`, and no-JS fallback.

## Visual development rules

### Design intent

The visual language must feel deliberately made for an RDP, VPS, hosting, networking, or datacenter company: minimal, premium, technical, restrained, readable, and performance-first. A visually busy or conventionally “modern SaaS” page is not a success criterion.

Visual complexity is not evidence of quality. Each treatment must support product understanding, hierarchy, a user decision, or an interaction state. If it does none of those things, remove it.

### Prohibited default patterns

Do not introduce the following as automatic design choices:

- Giant gradient hero type, rainbow/neon purple-blue gradients, or gradients repeated by section.
- Glassmorphism, blur blobs, particles, arbitrary background grids, or glow on every card.
- Floating decorative cards, fake dashboards, fake charts, terminal output, infrastructure diagrams, benchmarks, status numbers, or testimonials.
- A bento grid, a badge-heading-paragraph-card stack, pill controls, rounded panels, or oversized centred heading merely because it is a familiar landing-page pattern.
- Decorative icons that repeat the same meaning as the text, animation without state/progression meaning, or cards used as the default layout for every content group.

An effect can be used only when it has a stated reason. For example: one accent glow may identify the currently selected datacenter; an OS icon improves scanning of a real catalogue; a topology diagram may explain verified connectivity. It may not be used purely to make a section look more “high-end.”

### Infrastructure-first composition

Start every page with the product story and actual, approved information. Prefer honest visuals that make infrastructure tangible: CPU/RAM/NVMe specification hierarchy, server plan constraints, supported operating systems, verified locations, network/routing relationships, deployment steps, virtualization model, RDP workflow, availability state, or connectivity.

Never invent customer counts, uptime, performance claims, capacity, locations, latency, deployment time, benchmarks, reviews, or product statistics. If the data is unavailable, use neutral explanatory content and avoid a visual that implies a made-up metric.

Pages belong to one system but must not repeat a fixed template such as `Hero → logo strip → three cards → bento → testimonials → FAQ → CTA`.

- Windows RDP pages should normally lead with desktop/RDP experience, deployment and access, machine capability, OS choices, then plans.
- Linux VPS pages should normally lead with compute/virtualization, CLI/developer workflow, distributions, networking, then plans.
- Datacenter/location pages should normally lead with location and regional role, physical/network topology, verified capability, connectivity, then availability/next action.
- Comparison, pricing, campaign, guide, and product-family pages must earn every section from their specific decision journey.

Use a page outline before implementation. For every proposed section, record the user question it answers, the source of its facts, its dominant layout type, and why it is not redundant with the preceding section.

### References and originality

References are useful for hierarchy, density, spacing, typography, interaction patterns, and rhythm. Do not reproduce their hero construction, section sequence, card composition, background treatment, illustration, typography composition, or animation signature. Translate the principle through this project's content, tokens, and infrastructure vocabulary.

### Typography, color, radius, and surfaces

- Typography carries identity. Use strong but controlled hierarchy, readable line lengths, restrained weights, intentional tracking, and monospace only for technical metadata (plans, protocol labels, locations, hardware figures, or identifiers).
- Large display type is justified only by page hierarchy and available content; never make a weak composition feel important by increasing font size.
- Components use semantic project tokens only (`--color-*`, `--space-*`, `--radius-*`, `--shadow-*`, `--z-*`). No literal/arbitrary colours, gradients, or one-off shadows in components.
- Accent colour signals brand, status, selection, keyboard focus, or action—not decoration. Respect contrast in both themes.
- Controls may be rounded for touch/affordance. Technical surfaces, plan tables, data rows, diagrams, and panels may use sharper geometry. Do not round every visible boundary.
- Shadows establish elevation and should be quiet. Glows are exceptional focal cues: primary CTA, active location/server, or a single hero node; never a global card style.

### Component reuse and visual ownership

Before creating a component, search `components/ui`, `components/marketing`, and `sections`; inspect props/slots; then decide whether the existing abstraction can be extended without weakening it. Create a new component only for a genuinely reusable pattern. Names such as `FeatureCard2`, `FeatureCardNew`, `ModernFeatureCard`, `PricingCardAlt`, or page-numbered variants are prohibited.

Make the existing component better when the new requirement belongs to its contract. If two layouts are conceptually different, use distinct semantic components with different names and responsibilities rather than forcing a “universal card.” A component's visual treatment must match its information role—not merely reuse a convenient card shell.

### Animation and progressive enhancement

Animation must communicate state, direction, hierarchy, or progression: selected location, expanding detail, deployment sequence, navigation state, or a meaningful data-flow illustration. Use CSS first; use `IntersectionObserver` only for a confirmed progressive enhancement; use Motion/GSAP only when CSS/browser APIs cannot achieve the required behavior and the dependency cost is approved.

Animations must work with `prefers-reduced-motion: reduce`, must not gate content, and must not cause layout shift or expensive continuous main-thread work. A static screenshot of the page must still look intentional and complete.

### Visual performance rules

Prefer Astro → semantic HTML → CSS/tokens (or approved Tailwind) → browser APIs → small vanilla module → isolated framework island. A visual convenience is not enough reason to add a framework, animation library, SVG package, image library, or client-side dependency.

Before merging a visual change, inspect client JavaScript, image sizes, font requests, paint/layout stability, and third-party impact. Avoid forced `will-change`, full-page backdrop filters, layout-triggering scroll handlers, autoplay media, and above-fold lazy-loading of the actual LCP image.

### Mandatory visual review

Before declaring a page or substantial section complete, answer these in the PR/change notes:

1. Does it resemble a generic AI-generated SaaS template? If so, what infrastructure-specific information or composition differentiates it?
2. Are cards, pill shapes, gradients, glows, icons, and rounded surfaces each justified and restrained?
3. Does every decorative visual communicate an approved product concept or a state?
4. Does the section sequence follow this page's product story rather than a reused landing-page formula?
5. Is hierarchy obvious with animation disabled and at 200% zoom?
6. Does the mobile layout feel deliberately composed rather than a compressed desktop grid?
7. Did the implementation reuse the correct primitive/section rather than create a near-duplicate?
8. Can any JavaScript, asset, or dependency be removed without losing required behavior?

If any answer reveals generic, decorative, fabricated, or redundant work, revise before review.

## Accessibility rules

- Prefer semantic landmarks (`header`, `nav`, `main`, `footer`), one `h1`, logical heading order, descriptive links, and native buttons/form controls.
- Provide a visible-on-focus skip link, clear `:focus-visible`, touch targets at least 24×24 CSS px (44×44 preferred), and no keyboard traps.
- Provide alt text for meaningful images and empty alt for decorative ones. SVG icons used in controls need an accessible button name and `aria-hidden` icon.
- Respect `prefers-reduced-motion`; no scroll/reveal animation may be required to understand content.
- Every field needs a label, validation errors, an announced result, and keyboard/error focus behavior. Do not add ARIA to recreate a native element.
- Treat WCAG 2.2 AA as the launch target. Visual parity does not justify an accessibility regression.

## SEO and structured-data rules

An indexable page requires: unique title; useful meta description; canonical URL built from `config/site`; Open Graph fields/image/alt; social metadata when configured; correct robots policy; one `h1`; sitemap inclusion; and appropriate semantic content.

Generate JSON-LD from typed data only. Globally, use verified Organization/WebSite data. Use Product/Offer only when price and availability are approved and accurate. Use FAQPage only when the same FAQ answers are visible to users. Never copy unverified facts from the legacy capture or use schema to hide thin content. Keep 404, previews, drafts, and duplicate campaign variants out of the index deliberately.

## Images and assets

- Keep source images in `src/assets` when Astro should optimize them; keep only verbatim static files (for example favicons) in `public`.
- Give every meaningful image accurate alt text, dimensions/aspect ratio, responsive sizes, and lazy loading below the fold. The actual LCP asset may receive high fetch priority; nothing else does.
- Self-host/subset WOFF2 only when required; use `font-display: swap` or `optional` and a robust system fallback. Never add a render-blocking remote font without measured approval.
- Optimize or replace oversize assets before launch. Do not retain generated capture filenames as the final information architecture.

## Client JavaScript, scripts, and environment variables

- Client JS must have a user-facing reason and a hydration strategy. Check production output after changes.
- Third-party scripts are configured centrally in `src/integrations` and enabled through typed `src/config/analytics.ts`; never paste tags inside page/section components.
- Require a named owner, purpose, consent/legal assessment, event schema, loading strategy, transfer-size/long-task impact, and opt-out behavior for every vendor.
- Browser-exposed values use `PUBLIC_*` only and must be safe to publish. Secrets are server-only and must never be imported into static client code, markup, logs, screenshots, or analytics events.
- Use Astro static forms posting to an approved provider first. Server endpoints/actions need validated input, anti-spam, error handling, monitoring, and explicit justification.

## Core UI Packages & Usage

This repository leverages the following core UI packages and integrations to maintain the **TUFFRDP design system**:

1. **Tailwind CSS (v4)**: Integrated via the `@tailwindcss/vite` plugin.
   - **Usage**: Use Tailwind utility classes for new components and layouts.
   - **Tokens Interoperability**: `src/styles/tokens.css` contains legacy scoped CSS variables (e.g., `var(--color-bg)`) used by older Astro components. Ensure these remain intact until a full Tailwind refactor is completed. New variables should be added here.

2. **Astro Icon & Lucide**: Installed `astro-icon` and `@iconify-json/lucide`.
   - **Usage**: Import `<Icon name="lucide:icon-name" />` directly in Astro templates. Avoid mixing random icon libraries; strictly use Lucide to maintain visual consistency.

3. **Motion**: Installed `motion` (formerly framer-motion/motion one).
   - **Usage**: Used for micro-interactions, state transitions, and section reveals (e.g., Pricing or Infrastructure visualizations). Use selectively—do not animate everything just for the sake of it.

4. **External UI Libraries**: We draw inspiration and structure from Aceternity UI, Starwind UI, HyperUI, OpenTailwind, and 21st.dev.
   - **Rule**: Do not install these as literal "design systems" or convert the project to React to use them. Take useful UI primitives/sections and reconstruct them in Astro using Tailwind + the TUFFRDP design tokens to ensure a unified identity.

### Aceternity UI Integration & Visual Revamp (Completed)

The TUFFRDP homepage has undergone a complete visual revamp integrating Aceternity UI-inspired patterns, adhering strictly to the "Infrastructure Control Surface" aesthetic. 

**Key implementation details to maintain:**
- **Tailwind v4 First**: All revamped components (`Hero`, `Features`, `Catalog`, `Pricing`, `Faq`, `Header`, `Footer`) have been fully migrated to Tailwind v4 utility classes.
- **Backgrounds & Grid Effects**: Use native Tailwind background patterns (e.g., `bg-[linear-gradient(...)] bg-[size:32px_32px]`) and CSS masks (`[mask-image:radial-gradient(...)]`) for hero/section backgrounds instead of importing heavy React canvas libraries.
- **Glassmorphism & Navigation**: Achieved via Tailwind utilities (`bg-surface-1/95 backdrop-blur-xl border border-border-subtle shadow-2xl`) for interactive elements like Nav dropdowns. Top-level navigation items use modern pill-shaped hover states (`px-3 py-1.5 rounded-full hover:bg-surface-2/60`).
- **Interactive Visuals (No React)**: Infrastructure topology visualizations and node graphics use standard HTML/CSS keyframe animations (e.g., `animate-[traverse-x]`, `animate-ping`) alongside `lucide` icons.
- **3D Globe Visualization**: Use the lightweight `cobe` vanilla JavaScript library for 3D globe rendering. Render it natively inside an Astro `<script>` block using a `requestAnimationFrame` loop. Do not introduce React/Three.js wrappers or heavy canvas libraries.
- **Motion (Framer Motion / Motion One)**: Used strictly for lightweight, staggered entrance animations on the client (`animate()` with delays), imported inside an Astro `<script>` tag. Do not introduce `<motion.div>` React wrappers.
- **Hardware & Location Context**: All visual specifications and mockups must reference the actual infrastructure baseline: **Intel Xeon E5-2690 v4** processors (never AMD EPYC or generic placeholders) and the **Phoenix, Arizona (PHX)** datacenter topology.

## Dependency policy

Before adding a dependency, document and answer:

1. Can Astro, CSS, or browser-native HTML solve it?
2. Is an installed dependency already enough?
3. Does it add browser JavaScript, a server runtime, or a vendor lock-in?
4. Is it maintained, license-compatible, and appropriately scoped?
5. Is its bundle/runtime cost justified by a measured or approved need?
6. Does it duplicate an installed project skill or architecture boundary?

Prefer one small, well-maintained dependency over a bespoke abstraction only when it materially reduces risk. Update the dependency matrix and lockfile; remove unused dependencies in the same or a follow-up cleanup change.

## Global Context7 MCP and skills

### Context7 is the documentation authority for libraries

Context7 is the global MCP for current library and framework documentation. Use it before writing, changing, or diagnosing code that depends on an external framework, package, integration, adapter, SDK, or platform API. This is mandatory for Astro, Tailwind, Playwright, analytics/form SDKs, CMS SDKs, deployment adapters, and any dependency whose API/version may have changed.

Use Context7 to verify the current API rather than relying on memory, copied snippets, search-result summaries, or another skill's older examples. Project skills define workflow and quality constraints; Context7 verifies the current external API needed to implement that workflow.

#### Context7 workflow

1. Identify the exact library and installed/requested version from `package.json`, lockfile, or the approved implementation decision.
2. Resolve the library ID with `resolve-library-id`, using a specific question such as “Astro static sitemap integration configuration” rather than a broad query.
3. Choose the official/primary result; prefer a version-specific match when the version is known.
4. Query docs with `query-docs` one concept at a time. Split routing, images, content collections, actions, and adapter configuration into separate queries unless their interaction is the point being investigated.
5. Implement only the verified API. Record meaningful version-sensitive decisions in code comments, an ADR, or the migration documentation.
6. Run the project validation required by the affected change. Documentation lookup never replaces build, type checking, browser checks, or performance/a11y validation.

Use Context7 for implementation facts, not for product or architecture decisions. It cannot approve prices, infrastructure claims, canonical hosts, analytics consent, deployment vendor selection, or whether an island/backend is justified. Those remain governed by this handbook and approved project decisions.

If Context7 is unavailable or does not return authoritative documentation, say so and fall back to the library's official documentation/repository. Do not silently substitute a community fork or fabricate an API.

#### Context7 examples

- Before configuring `astro.config.mjs`, resolve Astro and query the single config/integration concern being added.
- Before adding `<Image>`/`<Picture>`, query the current Astro asset/image API and then test the generated dimensions, `sizes`, and LCP behavior.
- Before adding a client-side island, query Astro's current hydration-directive documentation and verify the island justification required above.
- Before setting up Playwright visual checks, query the official Playwright screenshot assertion and web-server configuration API, then run the local browser test.
- Before adding a form or analytics vendor SDK, query only that vendor's current browser/server integration guidance and verify it against the environment-variable, consent, and performance rules.

### Skills policy

Skills are reusable workflows, not permission to bypass this repository's constraints. A skill may be used when its description matches the task; read its `SKILL.md` before acting. Project-local skills in `.agents/skills/` are preferred whenever they cover the task because they are versioned by `skills-lock.json` and documented in [docs/project-skill-inventory.md](docs/project-skill-inventory.md).

Global skills may be used for a concrete gap not covered by a project-local skill, but they do not become project policy merely because they are available. Do not install or reference a global skill in repository documentation unless it is deliberately selected and installed project-locally through the documented skill-discovery process. Resolve overlap with the authority order at the end of this file.

## Project skills

Installed project-local skills are listed in [docs/project-skill-inventory.md](docs/project-skill-inventory.md). Do not assume a global skill is part of this repository. Read the selected `SKILL.md` before applying a skill.

### `astro`

Use for Astro setup, file routes, static generation, content collections, imported assets, and hydration choices. Do not use it to introduce SSR without a real requirement. Inputs: route/behavior, target data shape, and page/section scope. Output: an Astro-native implementation with a build/check result. It is primary for framework mechanics; this handbook is primary for this project's boundaries.

### `seo`

Use for canonical/metadata/robots/sitemap/structured-data/indexability work. Do not use it to create claims, canonical hosts, or localized URLs that product owners have not approved. Inputs: approved content, public URL/config, route intent. Output: rendered metadata/schema validation. It owns SEO technique; `astro` owns Astro implementation details.

### `performance`

Use for measured LCP/CLS/INP, JS, image, font, caching, and third-party optimization. Do not use it to add compression plugins, a service worker, or critical-CSS tooling by default. Inputs: performance trace/baseline and affected assets. Output: before/after measurements and an explicit trade-off. It owns performance decisions after accessibility and correctness are met.

### `accessibility`

Use for every component/section/interaction/form/theme change and before launch. Do not use ARIA to replace native HTML. Inputs: rendered route, interaction path, design tokens. Output: keyboard, semantics, focus, contrast, motion, and manual/automated validation. Accessibility requirements override visual parity if they conflict.

### `playwright-cli`

Use for local/preview browser smoke checks, responsive screenshots, metadata/link/interaction validation, and console/network inspection. Do not use it to mutate production data or access third-party accounts without authorization. Inputs: running target and approved test path/data. Output: reproducible browser evidence. It complements committed test code and manual accessibility review.

### Skill selection matrix

| Task | Primary | Secondary | Required verification |
| --- | --- | --- | --- |
| Build an interactive component | `astro` | `accessibility`, `performance` | Hydration rationale, no-JS fallback, emitted-JS and keyboard test. |
| Add SEO landing page | `seo` | `astro`, `accessibility` | Rendered head/schema/sitemap and semantic heading check. |
| Optimize Core Web Vitals | `performance` | `astro` | Documented before/after Lighthouse/Web Vitals and asset/JS diff. |
| Add image/font | `performance` | `accessibility` | Dimensions, alt, responsive behavior, LCP/CLS check. |
| Add form/analytics | This handbook's integration rules | `accessibility`, `performance`, `playwright-cli` | Validation/error/consent/security/network smoke. |
| Deployment/routing change | This handbook | `seo`, `playwright-cli` | Preview headers, redirects, canonical/asset checks, rollback plan. |
| Add/configure a library or SDK | Context7 MCP | Applicable project skill | Version-specific API lookup, type/build and feature validation. |

## Real implementation examples

- **New landing page:** create typed page data or a content entry, compose existing Hero/Feature/Pricing/FAQ sections, then add unique SEO metadata and only approved FAQPage schema. Do not duplicate the home page markup.
- **Reusable section:** after a second product page needs the locations grid, promote it to `sections/Locations.astro` and give it typed props. Do not make a single enormous `Section` component with arbitrary string variants.
- **Interactive component:** an FAQ uses native `<details>` and remains Astro. A mobile menu with controlled focus/escape/outside-click is first tested as a native dialog/popover; if native behavior cannot meet UX, add a focused vanilla island and document why.
- **Structured data:** derive visible FAQs from `data/home.ts`; serialize via `lib/jsonld.ts`; render only after legal/product review confirms answers. Validate page source and schema output.
- **Analytics:** add a vendor adapter under `integrations/analytics`, configure it centrally, honor consent, use named events, defer/lazy load as allowed, and check network/main-thread impact before release.
- **Global styling:** modify tokens/global focus/reduced-motion styles before altering local sections; test both themes, keyboard focus, and responsive breakpoints.
- **Image:** import the hero from `src/assets`, render it with explicit responsive dimensions/sizes and correct priority; optimize oversize assets before reusing them.
- **Routing:** add a file route, update typed navigation and sitemap logic, and add a host redirect only from an approved URL mapping. Verify canonical and direct navigation.
- **New dependency:** document the six dependency-policy answers, inspect the bundle effect, update the dependency matrix, and add tests. A package is not allowed merely because it speeds up the first implementation.
- **Form:** use a normal HTML form to an approved provider first; provide labels, field errors, live result state, privacy/consent, anti-spam, and Playwright success/failure tests. Escalate to server work only for a documented reason.
- **Performance/deployment:** capture before metrics, change one bottleneck, capture after metrics, then validate CDN headers, immutable assets, canonical host, redirects, preview, and rollback procedure.

## Workflow rules

Work in this sequence: **Inspect → Understand → Plan → Select relevant skills → Implement → Build → Test → Verify → Document**.

- Preserve URLs, external destinations, content, SEO behavior, and visual behavior unless an approved change says otherwise.
- Label unknown behavior and ask for direction rather than inventing a menu, locale, backend, or conversion flow.
- Keep technical changes narrowly scoped. Put design/content changes in a separately documented decision.

## Verification requirements

| Change | Minimum checks |
| --- | --- |
| Any Astro/source change | Type check, lint/format if configured, production build. |
| Route/layout/SEO change | Direct route test, rendered head/canonical/robots/schema/sitemap check, broken-link check. |
| UI/styling/responsive change | Desktop/tablet/mobile visual review; keyboard focus/reduced-motion check; visual regression where baseline exists. |
| Island or form | No-JS fallback; keyboard/error behavior; emitted-JS inspection; E2E success/failure path. |
| Asset/font/performance/integration | Network/transfer inspection, LCP/CLS impact, third-party loading/consent behavior. |
| Deployment/redirect/cache | Preview deploy, header/redirect/canonical/asset tests, rollback plan. |

The launch target is static HTML for all current marketing content, minimal initial JS (zero framework hydration preferred), LCP ≤2.5 s, CLS ≤0.1, INP ≤200 ms at p75 when field data exists, and documented lab scores of at least 95 for performance, accessibility, SEO, and best practices on the launch route.

## Documentation rules and anti-patterns

Update documentation when architecture, routes, configuration, integrations, skills, build/deployment behavior, or reusable abstractions change. Update the migration plan/matrices when a verified finding changes. Keep an ADR for material host, styling, CMS, form, analytics, or SSR decisions.

Avoid: hardcoded repeated marketing content; giant multipurpose components; global client state; an unnecessary backend; unreviewed dependencies; scattered analytics scripts; duplicated metadata logic; URL changes without redirects; and mixing redesign decisions into routine changes without calling them out.

## Decision authority

1. Explicit user requirements and this `AGENTS.md`.
2. Verified existing behavior.
3. Recorded ADRs.
4. Specialized project skill in its domain: accessibility can override visual parity; SEO controls indexability; performance controls measured critical-path trade-offs; Astro controls framework mechanics.
5. General coding conventions.

When these conflict, stop, state the conflict and evidence, choose the higher authority, document the decision, and run its required validation.

