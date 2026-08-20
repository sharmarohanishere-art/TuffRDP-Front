# Project skill inventory

## Selection method

Discovery used the project-scoped `find-skills` workflow: queried Astro migration/SEO/performance, testing/visual regression, and accessibility; inspected candidate `SKILL.md` files before installation; then installed only project-scoped copies through `npx skills add`. The install registry is `skills-lock.json`; all skills live in `.agents/skills/`.

The selected set intentionally covers implementation, technical quality, and browser verification. Architecture, content modelling, forms, analytics, deployment, dependency review, and documentation also have explicit repository rules in `AGENTS.md`, because no candidate was needed to introduce a framework- or vendor-specific skill for those areas.

| Skill | Source and local path | Purpose / why selected | Phases and architecture areas | Invoke / do not invoke | Prerequisites and overlap |
| --- | --- | --- | --- | --- | --- |
| `astro` | `mindrally/skills`; `.agents/skills/astro/` | Static-first Astro components, file routes, content collections, asset handling, and selective hydration. Selected as the direct framework implementation guide. | 4–11, 13–17; pages, layouts, sections, assets, content, islands. | Use for Astro setup, route/component conversion, content collections, and hydration decisions. Do not use for generic Next maintenance or to justify a client framework without a user interaction need. | Requires current Astro docs/config context. Repository architecture outranks its generic folder example. |
| `seo` | `addyosmani/web-quality-skills`; `.agents/skills/seo/` | Audits metadata, canonicals, robots, sitemaps, structured data, semantic content, and indexing. Selected because current source has only generic metadata and no verified SEO files. | 1–3, 10, 14–16; `lib/seo`, page metadata, schema, sitemap/robots. | Use for indexability/metadata/schema/crawl changes. Do not use to invent product claims, locales, or public URLs. | Needs approved content and `config/site`. Has authority over SEO technique; `astro` owns implementation mechanics. |
| `performance` | `addyosmani/web-quality-skills`; `.agents/skills/performance/` | Measures and improves Core Web Vitals, images, fonts, caching, JavaScript, and third-party impact. Selected because the current capture has a large inherited CSS bundle and an oversized icon. | 1, 5, 9, 11–15; assets, styles, integrations, deployment cache policy. | Use for measured performance work and budgets. Do not add compression/critical-CSS plugins or a service worker merely because the skill mentions them. | Needs a local/production measurement profile. It owns performance trade-offs; `astro` owns framework conventions. |
| `accessibility` | `addyosmani/web-quality-skills`; `.agents/skills/accessibility/` | WCAG 2.2-informed semantics, keyboard behavior, focus, motion, contrast, form UX, and manual/automated validation. Selected because the capture contains interactive controls without locally owned behavior. | 5–10, 12, 14; components, sections, islands, forms. | Use whenever UI, interactions, forms, theme, or content structure change. Do not apply ARIA where native HTML covers the need. | Needs rendered route and supported browser/screen-reader plan. It owns accessibility requirements over visual parity where they conflict. |
| `playwright-cli` | `microsoft/playwright-cli`; `.agents/skills/playwright-cli/` | Browser automation for route, interaction, rendered metadata/link, viewport, console/network, and screenshot verification. Selected from the official Microsoft source for migration parity testing. | 1, 8–9, 12, 14–16; E2E, visual checks, release smoke tests. | Use for local/preview browser validation and reproducible smoke flows. Do not use it to create production data, test third-party accounts without authorization, or replace committed Playwright test code. | Requires running local/preview target and any approved test data. Complements—does not replace—unit, visual baseline, or manual accessibility checks. |

## Candidate decisions

| Candidate | Decision | Reason |
| --- | --- | --- |
| `withastro/astro@astro-developer` | Rejected | Official source, but its instructions are for contributing to Astro's own monorepo (internal pipelines, packages, and release process), not building an Astro website. |
| `incluud/astro-agent-skills@migrate` | Rejected | Lower adoption (127 at discovery) and overlaps the selected core Astro guidance plus this repository-specific phased migration plan. |
| `jdevalk/skills@astro-seo` | Rejected | Useful SEO scope but explicitly routes implementation through an extra `@jdevalk/astro-seo-graph` dependency; that conflicts with the project's minimal-dependency policy. The selected high-adoption SEO skill is vendor-neutral. |
| `tech-leads-club/agent-skills@perf-astro` | Rejected | Recommends `astro-critters` and compression integrations as default setup. These are not justified until measured; the selected performance skill supports evidence-led optimization. |
| `aj-geddes/useful-ai-prompts@visual-regression-testing` | Rejected | Generic visual-regression guidance overlaps with Playwright verification; a test framework should be added with project-specific configuration rather than another broad skill. |
| Low-install Astro migration/SEO variants | Rejected | Duplicative and below the quality/adoption bar set by the discovery skill, with no repository-specific advantage. |

## Selection authority

1. Explicit user requirements and this repository's `AGENTS.md`.
2. Verified current behavior that the approved parity matrix says to preserve.
3. This migration plan and approved architecture decisions.
4. The specialized project skill for its domain (accessibility overrides visual parity; SEO controls indexability; performance controls measured critical-path trade-offs).
5. General framework/coding conventions.

When skills conflict, do not merge advice mechanically. Record the choice in the relevant architecture/migration documentation and validate it.
