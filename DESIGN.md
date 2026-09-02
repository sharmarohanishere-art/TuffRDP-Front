# TuffRDP frontend design system

This document is the single source of truth for the frontend's visual design, styling conventions, component composition, and UI architecture. All frontend work must remain consistent with the standards documented here.

For repository structure, development workflow, agent behavior, and technical constraints, see [`AGENTS.md`](AGENTS.md).

---

## Design philosophy

The visual language is deliberately made for an RDP, VPS, hosting, networking, and datacenter company. It is:

- **Minimal** - visual complexity is not evidence of quality. Each treatment must support product understanding, hierarchy, a user decision, or an interaction state. If it does none of those things, remove it.
- **Premium** - restrained rather than busy. Quiet typography, controlled surface hierarchy, and deliberate use of accent.
- **Technical** - monospace metadata labels, specification tables, system-like indicators, and infrastructure terminology are first-class visual elements.
- **Readable** - strong hierarchy, controlled line lengths, restrained weights, intentional tracking.
- **Performance-first** - no render-blocking fonts, no heavy client-side canvas libraries beyond the approved `cobe` globe, no full-page backdrop filters.
- **Dark-only** - the current implementation uses a single dark color scheme. There is no light theme, no `prefers-color-scheme` media query, and no theme toggle.

A visually busy or conventionally "modern SaaS" page is not a success criterion. The aesthetic is called the **Infrastructure Control Surface**.

---

## Color system

All colors are defined as CSS custom properties in [`src/styles/tokens.css`](src/styles/tokens.css) and bridged to Tailwind v4 via the `@theme` block.

### Background scale

| Token | Hex | Tailwind class | Usage |
|-------|-----|---------------|-------|
| `--color-bg` | `#00020a` | `bg-bg` | Page background, hero background |
| `--color-bg-card` | `#080b12` | `bg-card` | Card backgrounds (Button secondary variant) |
| `--color-bg-subtle` | `#0d121c` | `bg-bg-subtle` | FeatureCard background, subtle surface |

### Surface scale

| Token | Hex | Tailwind class | Usage |
|-------|-----|---------------|-------|
| `--color-surface` | `#0a0e17` | `bg-surface` | Base surface level |
| `--color-surface-1` | `#0f1523` | `bg-surface-1` | Section backgrounds (FAQ, Catalog), PlanCard, metric strip, nav dropdowns |
| `--color-surface-2` | `#141b2d` | `bg-surface-2` | Hover states, interactive surface, code badges |
| `--color-surface-3` | `#1a2235` | `bg-surface-3` | Topology node circles, CPU package |
| `--color-surface-strong` | `#1e293b` | `bg-surface-strong` | Mobile nav panel, NVMe badge |

### Accent colors

| Token | Hex | Tailwind class | Usage |
|-------|-----|---------------|-------|
| `--color-primary` | `#3b82f6` | `text-primary`, `bg-primary`, `border-primary` | Brand accent, CTAs, section labels, icon emphasis, active indicators, glow source |
| `--color-primary-hover` | `#60a5fa` | `text-primary-hover`, `bg-primary-hover` | Primary button hover, Logo "TUFF" text |
| `--color-signal` | `#22c55e` | `text-signal`, `bg-signal` | Status indicators (ping dot), "Ready to deploy", availability, instance endpoint color |

### Border scale

| Token | Hex | Tailwind class | Usage |
|-------|-----|---------------|-------|
| `--color-border` | `#1e293b` | `border-border` | Primary borders, section dividers, card outlines |
| `--color-border-subtle` | `#0f172a` | `border-border-subtle` | Header bottom border, FAQ item borders, metric strip internal borders |
| `--color-border-emphasis` | `#334155` | `border-border-emphasis` | Divider rules within pricing, topology path lines |

### Text scale

| Token | Hex | Tailwind class | Usage |
|-------|-----|---------------|-------|
| `--color-text` | `#f8fafc` | `text-text` | Primary text, headings, strong values |
| `--color-text-muted` | `#94a3b8` | `text-text-muted` | Body copy, descriptions, secondary information |
| `--color-text-subtle` | `#64748b` | `text-text-subtle` | Tertiary text, nav link default state, disabled-feeling labels |

### Additional colors used inline

| Value | Where | Notes |
|-------|-------|-------|
| `#07090d` | Footer `bg` | Darker than `--color-bg`, used only for footer background |
| `#ffffff` | Button primary text | White text on primary button |

### Color usage rules

- Components must use semantic token names, never raw hex values. The inline colors above (`#07090d`, `#ffffff`) are exceptions specific to their components.
- Accent color signals brand, status, selection, keyboard focus, or action. It is not decorative.
- Respect contrast between text and background. `--color-text` on `--color-bg` and `--color-text-muted` on `--color-surface-1` are the established readable combinations.
- Glow effects use `shadow-[0_0_10px_var(--color-primary)]` or `shadow-[0_0_15px_rgba(34,197,94,0.15)]` and are reserved for focal cues: active datacenter marker, traversal indicators, CTA spotlight. Never as a global card style.

---

## Typography

### Font stacks

The frontend uses **no custom fonts**. No `@font-face` declarations, no Google Fonts imports, no WOFF2 files. Typography relies entirely on the browser/OS system font stack provided by Tailwind CSS defaults.

| Usage | Stack | Token |
|-------|-------|-------|
| Body / headings | Tailwind default (system UI sans-serif) | None (Tailwind built-in) |
| Technical metadata | `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace` | `--font-mono` |

### Display sizes

| Token | Value | Usage |
|-------|-------|-------|
| `--text-display` | `clamp(2.5rem, 6vw, 4.5rem)` | Hero `h1` (via `text-[var(--text-display)]`) |
| `--text-section` | `clamp(2rem, 4vw, 3.5rem)` | Section headings (defined but currently sections use `text-3xl md:text-4xl` instead) |
| `--text-tech` | `0.75rem` | Technical label size (defined but components use explicit sizes like `text-[0.65rem]`, `text-[0.72rem]`) |

### Observed type scale

These are the actual font sizes used across components, organized by role:

| Size | Class / Value | Where used |
|------|--------------|------------|
| `0.45rem` - `0.55rem` | `text-[0.45rem]`, `text-[0.55rem]` | CPU label inside visual, REC badge |
| `0.65rem` | `text-[0.65rem]` | Monospace metadata labels (COMPUTE, STORAGE, NETWORK, etc.), spec dt values, pricing table headers |
| `0.68rem` | `text-[0.68rem]` | Hero status label, mobile nav group headers |
| `0.7rem` | `text-[0.7rem]` | Footer column headers, footer bottom bar |
| `0.72rem` | `text-[0.72rem]` | Section number labels ("01 / Architecture"), capabilities strip labels, dropdown item descriptions |
| `0.85rem` | `text-[0.85rem]` | Desktop nav link text, dropdown item titles |
| `0.875rem` | `text-sm` / inline | Feature card description, footer links, pricing table data, plan specs, Button base size |
| `0.92rem` | `text-[0.92rem]` | Mobile nav links, capabilities strip values |
| `1rem` | `text-base` | Hero body copy (mobile) |
| `1.05rem` | `text-[1.05rem]` | Hero body copy (desktop) |
| `1.1rem` | inline style | Logo text |
| `1.125rem` | `text-lg` | Feature card title, storage/memory feature headings, FAQ section body text |
| `1.25rem` | `text-xl` | PlanCard name, metric strip values |
| `1.5rem` | `text-2xl` | CPU card heading |
| `1.875rem` | `text-3xl` | Section headings (mobile) |
| `2.25rem` | `text-4xl` | Section headings (desktop), Hero `h1` (mobile), CTA heading (mobile) |
| `3rem` | `text-5xl` | PlanCard price, CTA heading (desktop) |
| `6rem` | inline | 404 page title |
| `clamp(2.5rem, 6vw, 4.5rem)` | `--text-display` | Hero `h1` (desktop) |

### Weight conventions

| Weight | Where |
|--------|-------|
| `350` | Logo "TUFF" span |
| `500` (`font-medium`) | Button text, nav links |
| `550` (`font-[550]`) | Capabilities strip values |
| `600` (`font-semibold`) | Feature card title, dropdown item titles, section headings, plan name, pricing values, PlanCard price |
| `650` (`font-[650]`) | Hero `h1` |
| `700` (`font-bold`) | Logo "RDP" span, CTA inline links |
| `800` (`font-extrabold`) | 404 page title |

### Monospace conventions

Monospace (`font-mono`) is used consistently for:
- Infrastructure metadata labels (COMPUTE, STORAGE, NETWORK, PROTECTION)
- Section numbering ("01 / Architecture", "02 / Performance")
- Technical values (x86_64, DDR4_ECC, KVM, UEFI)
- Pricing table headers (Mem_Alloc, vCPU_Cores, NVMe_Vol)
- Footer column headings and bottom bar
- Status/state badges (NODE: VIRTUAL, ARCH: x86_64, STATE: ACTIVE)
- Tiny uppercase tracked labels throughout

The monospace pattern always pairs with `tracking-wider` or `tracking-widest` and `uppercase`.

### Heading conventions

All section headings follow a consistent pattern:
1. **Section label**: `text-[0.72rem] font-mono tracking-wider text-primary uppercase mb-4` - e.g., "01 / Architecture"
2. **Heading**: `text-3xl md:text-4xl font-semibold text-text leading-tight mb-4`
3. **Subtext**: `text-text-muted text-lg`

This pattern is repeated across Features, Catalog, Pricing, and FAQ sections. It is the canonical section header composition.

---

## Spacing & sizing

### Token scale

| Token | Value |
|-------|-------|
| `--space-1` | `0.25rem` (4px) |
| `--space-2` | `0.5rem` (8px) |
| `--space-3` | `0.75rem` (12px) |
| `--space-4` | `1rem` (16px) |
| `--space-5` | `1.5rem` (24px) |
| `--space-6` | `2rem` (32px) |
| `--space-7` | `3rem` (48px) |
| `--space-9` | `5rem` (80px) |

> **Gap**: `--space-8` (expected ~4rem / 64px) is not defined. This is an omission rather than intentional. Future work should add it if needed.

### Layout constants

| Token | Value | Usage |
|-------|-------|-------|
| `--container-max` | `76rem` (1216px) | Container component max-width |
| `--page-gutter` | `1.5rem` (24px) | Container horizontal padding |

### Section vertical rhythm

Sections use Tailwind padding classes, not spacing tokens:

| Section | Top/Bottom padding |
|---------|-------------------|
| Hero | `pt-10 md:pt-16 pb-12` |
| Features | `py-24` |
| Catalog | `py-32` |
| Pricing | `py-32` |
| FAQ | `py-24` |
| Footer | `pt-16 pb-8` |

The established rhythm alternates between `py-24` (6rem) and `py-32` (8rem). New sections should follow this pattern.

### Inter-element spacing

| Context | Typical value |
|---------|--------------|
| Section header to content | `mb-12` to `mb-20` |
| Between major content blocks within a section | `mb-32` |
| Card internal padding | `p-8` |
| Grid gap between cards | `gap-8` |
| Between FAQ items | Border-based, no explicit gap |
| Button group gap | `gap-4` |

---

## Border radius

### Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-md` | `0.375rem` (6px) | Button corners, small badges, input-like elements |
| `--radius-lg` | `0.5rem` (8px) | Feature cards, general card borders |
| `--radius-full` | `9999px` | Nav link pills, status dots, topology circles |

### Tailwind radius classes in use

| Class | Applied to |
|-------|-----------|
| `rounded` | OS option buttons, mobile nav, small badges |
| `rounded-md` | Phoenix legend overlay, metric strip, info banner |
| `rounded-lg` | Nav dropdowns, PlanCard corners, topology panel, section content panels |
| `rounded-xl` | PlanCard article, CPU card, feature bento cards |
| `rounded-2xl` | CPU package visual |
| `rounded-full` | Nav link hover pills, status indicator dots, topology nodes |

### Radius usage rules

- Controls and interactive pill shapes use `rounded-full`.
- Cards and content panels use `rounded-lg` or `rounded-xl`.
- Technical surfaces, data tables, and specification blocks may use sharper geometry (`rounded-md` or `rounded`).
- Do not round every visible boundary uniformly.

---

## Shadows & surface treatments

### Shadow token

| Token | Value |
|-------|-------|
| `--shadow-offset` | `4px 4px 0px 0px rgba(0,0,0,0.5)` |

This token is defined but not actively used in any current component. Tailwind shadow utilities are used instead.

### Tailwind shadows in use

| Class | Where |
|-------|-------|
| `shadow-xl` | Mobile nav panel |
| `shadow-2xl` | Nav dropdowns, PlanCard hover, Phoenix legend, CPU card |
| `shadow-inner` | CPU heat spreader |

Shadows are quiet and establish elevation. They appear on overlays (nav dropdowns, mobile menu, Phoenix legend) and on hover states for cards.

### Glow effects

Glow is created via `box-shadow` with the primary or signal color:

```
shadow-[0_0_10px_var(--color-primary)]    -- traversal dots, Phoenix marker
shadow-[0_0_15px_rgba(34,197,94,0.15)]    -- signal-colored endpoint node
```

Glow is an exceptional focal cue. It is used for:
- Active datacenter location marker (Phoenix dot)
- Topology traversal indicators
- Signal-status endpoint node

Glow is never a global card style.

### Radial gradient spotlights

Several components use radial gradient overlays for hover/spotlight effects:

```
bg-[radial-gradient(ellipse_at_top,var(--color-primary),transparent_50%)]     -- PlanCard hover
bg-[radial-gradient(circle_at_bottom,var(--color-primary),transparent_70%)]   -- Metric strip hover
bg-[radial-gradient(circle_at_center,black_40%,transparent_100%)]             -- Globe mask
bg-[radial-gradient(ellipse_at_bottom,var(--color-primary),transparent_60%)]  -- CTA section ambient
```

These are always `opacity-0` by default and reveal on `group-hover` (typically `opacity-10`). They use `pointer-events-none` and `transition-opacity`.

### Glassmorphism

Used sparingly for overlays that need to float above content:

```
bg-surface-1/95 backdrop-blur-xl border border-border-subtle shadow-2xl   -- Nav dropdowns
bg-surface-1/90 backdrop-blur                                              -- Phoenix legend
```

This treatment is reserved for interactive overlays (navigation, floating legends). It is not a general card or section style.

---

## Background effects

### Grid pattern

The signature background pattern is a 32px CSS grid rendered via Tailwind background utilities:

```
bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)]
bg-[size:32px_32px]
```

Opacity varies by context:
- Hero: `0.03` with a radial mask fading from top
- Footer: `0.015` with a linear mask fading to bottom
- Pricing: `0.015` (full coverage, no mask)
- Topology panel: `0.015` at 24px grid size

The grid is always `pointer-events-none` and positioned `absolute inset-0`.

### Radial masks

Used to fade grid backgrounds and spotlight effects:

```
[mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_70%,transparent_100%)]   -- Hero grid
[mask-image:radial-gradient(circle_at_center,black_40%,transparent_100%)]            -- Globe container
[mask-image:linear-gradient(to_bottom,transparent,black)]                            -- Footer grid
```

### Hero spotlight

A large blurred radial gradient centered behind the hero:

```
w-[80%] h-[500px] opacity-30 pointer-events-none
bg-[radial-gradient(circle_at_center,var(--color-primary),transparent_60%)]
mix-blend-screen blur-[100px]
```

### Pin/dot pattern

Used inside the CPU visual for a substrate/PCB effect:

```
[background-size:12px_12px]
[background-image:radial-gradient(var(--color-border-emphasis)_1px,transparent_1px)]
```

---

## Layout system

### Container

The [`Container`](src/components/ui/Container.astro) component provides consistent horizontal containment:

- `max-width: var(--container-max)` (76rem / 1216px)
- `padding-left/right: var(--page-gutter)` (1.5rem / 24px)
- `margin: 0 auto`
- Accepts a `class` prop for additional Tailwind utilities

Every section wraps its content in a `<Container>`.

### Page composition

Pages compose layouts and sections. The home page (`index.astro`) follows:

```
MarketingLayout
  +-- Header (sticky, via MarketingLayout)
  +-- Hero
  +-- Features
  +-- Catalog
  +-- Pricing
  +-- Faq (includes final CTA)
  +-- Footer (via MarketingLayout)
```

### Layout hierarchy

```
BaseLayout          -- HTML shell, <head>, meta, OG tags, no chrome
  +-- MarketingLayout -- Skip link + Header + <main> + Footer
  +-- Layout          -- Bare wrapper (no header/footer)
```

### Grid patterns

| Pattern | Where | Tailwind |
|---------|-------|----------|
| Two-column hero | Hero | `grid md:grid-cols-[1.1fr_0.9fr] gap-12 items-center` |
| Four-column metric strip | Features | `grid grid-cols-2 md:grid-cols-4` |
| Large + small bento | Features compute | `grid grid-cols-1 md:grid-cols-3 gap-8` with `md:col-span-2` |
| Two-column catalog | Catalog | `grid lg:grid-cols-[1fr_1fr] gap-16` |
| Asymmetric pricing | Pricing | `grid lg:grid-cols-[1.2fr_2fr] gap-12 lg:gap-20` |
| Two-column FAQ | FAQ | `grid lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-16` |
| Two-column CTA | FAQ CTA | `grid lg:grid-cols-2 gap-10 items-center` |
| Five-column footer | Footer | `grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-8 md:gap-6` |

### Responsive breakpoints

The implementation uses Tailwind's default breakpoints with a mobile-first approach:

| Prefix | Width | Usage |
|--------|-------|-------|
| (none) | 0px+ | Mobile defaults: single column, stacked layout |
| `md:` | 768px+ | Tablet: multi-column grids, show desktop nav, hide mobile nav |
| `lg:` | 1024px+ | Desktop: wider column ratios, increased gaps |

The Header shows desktop navigation at `md:` and hides it below. The mobile menu uses `md:hidden`.

---

## Component inventory

### UI primitives (`src/components/ui/`)

#### Button

- **Props**: `href?`, `variant: 'primary' | 'secondary' | 'outline'`, `class?`
- **Renders**: `<a>` when `href` provided, `<button>` otherwise
- **Sizing**: `min-height: 2.75rem`, `padding: 0.7rem 1rem`, `font-size: 0.875rem`
- **Radius**: `var(--radius-md)` (0.375rem)
- **Transition**: `transition-all duration-200`
- **Variants**:
  - `primary`: `bg-primary text-white hover:bg-primary-hover`
  - `secondary`: `bg-card text-text border-border hover:bg-bg-subtle`
  - `outline`: `bg-transparent text-text border-border hover:border-primary hover:text-primary`
- **Note**: Uses scoped `<style>` with manually written utility classes (not Tailwind). This is a legacy pattern.

#### Container

- **Props**: `class?`
- **Renders**: `<div>` with `max-width: var(--container-max)`, `padding: 0 var(--page-gutter)`, `margin: 0 auto`
- **Usage**: Wraps every section's content

#### Icon (legacy)

- **Props**: `name: string`, `size?: number` (default 24), `class?`
- **Renders**: Inline `<svg>` with `aria-hidden="true"`, `stroke="currentColor"`
- **Contains**: Hardcoded SVG path map for ~12 icons (sun-moon, search, check, chevron-down, zap, shield, server, grid, etc.)
- **Note**: This is a legacy component. New code should use `<Icon name="lucide:icon-name" />` from `astro-icon` instead.

#### Logo

- **Renders**: `<a href="/">` containing two `<span>` elements
- **"TUFF"**: `color: var(--color-primary-hover)`, `font-weight: 350`, `letter-spacing: .075em`
- **"RDP"**: `color: var(--color-text)`, `font-weight: 700`
- **Both**: `font-size: 1.1rem`, `line-height: 1`
- **Gap**: `0.65rem` between spans

### Marketing components (`src/components/marketing/`)

#### Header

- **Sticky**: `sticky top-0 z-40`
- **Background**: `bg-bg/85 backdrop-blur-md`
- **Border**: `border-b border-border-subtle`
- **Height**: `h-16`
- **Nav dropdowns**: `<details>` elements with accordion behavior (JS closes others on open, closes on outside click)
- **Nav link style**: `text-[0.85rem] font-medium text-text-subtle hover:text-text hover:bg-surface-2/60 px-3 py-1.5 rounded-full transition-all`
- **Dropdown panel**: `bg-surface-1/95 backdrop-blur-xl border border-border-subtle shadow-2xl rounded-lg`
- **Dropdown item**: `grid gap-0.5 p-3 rounded-md hover:bg-surface-2/60 transition-colors` with `<b>` title and `<small>` description
- **Mobile menu**: `<details>` toggle with "Menu" text + hamburger/X icon, opens a full-width panel with categorized links

#### Footer

- **Background**: `bg-[#07090d]` (darker than page bg)
- **Grid pattern**: 32px grid with linear mask
- **Layout**: 5-column grid (brand + 4 link groups)
- **Link group headers**: `text-[0.7rem] font-mono tracking-wider text-text-muted uppercase`
- **Links**: `text-sm text-text-subtle hover:text-text transition-colors`
- **Status indicator**: Ping-animated green dot with "View system status" link
- **Bottom bar**: `text-[0.7rem] font-mono text-text-muted` with copyright and product tagline

#### PlanCard

- **Layout**: Flex column, `min-h-[25rem]`, `p-8`
- **Surface**: `bg-surface-1 rounded-xl border border-border`
- **Hover**: `hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/5` + radial gradient spotlight overlay
- **Price display**: `text-5xl font-semibold tracking-tight` with `<sup>` currency symbol
- **Spec list**: `<dl>` with `flex justify-between` rows, `border-b border-border-subtle`
- **Spec label**: `text-[0.65rem] font-mono tracking-wider text-text-muted uppercase`
- **CTA button**: Full-width outline button that inverts to primary on card hover

#### FeatureCard (legacy)

- **Surface**: `var(--color-bg-subtle)` background, `var(--color-border-subtle)` border, `var(--radius-lg)` radius
- **Icon wrapper**: 3rem square, `var(--radius-md)`, `var(--color-primary)` background
- **Title**: `1.125rem`, weight 600
- **Description**: `0.875rem`, `var(--color-text-subtle)`, `line-height: 1.6`
- **Note**: Uses scoped `<style>` with CSS custom properties. Not currently rendered on any page.

### Sections (`src/sections/`)

#### Hero

- **Grid**: Two columns at `md:` (1.1fr / 0.9fr)
- **Left**: Status indicator, `h1`, description, two CTAs
- **Right**: 3D globe (`cobe` library on `<canvas>`), Phoenix location overlay
- **Background**: Grid pattern with radial mask + blurred primary spotlight
- **Entrance animation**: `motion` library `animate()` with staggered delays (0, 0.2s, 0.4s)
- **Capabilities strip**: 4-column grid below hero content, separated by `border-t`

#### Features (Infrastructure)

Three sub-sections:
1. **Metric strip**: 4-column bordered grid with hover glow effects
2. **Topology visualization**: Horizontal flow diagram (Edge -> Routing -> Virtual Node -> Your Instance) with animated traversal dots
3. **Compute bento**: 2/3 + 1/3 grid with CPU card (includes animated CPU package visual) and stacked NVMe/ECC descriptions

#### Catalog (Deployment)

- **Layout**: Two-column at `lg:` (OS list + preview pane)
- **OS selection**: `<button>` elements with `aria-pressed` state, connected via vanilla JS
- **Preview pane**: Shows selected OS name, family badge, virtualization type, boot mode
- **Active indicator**: Thin green bar (`w-1 h-4 rounded-full bg-signal`)

#### Pricing

- **Layout**: Asymmetric grid at `lg:` (recommended plan card + catalogue table)
- **Recommended plan**: PlanCard component with "Recommended Configuration" label
- **Table**: Full `<table>` with monospace headers, hover row highlighting, price links
- **Info banner**: `bg-surface-1 border border-border-subtle rounded` with info icon

#### FAQ

- **Layout**: Two-column at `lg:` (intro/CTA + accordion)
- **Accordion**: Native `<details>` elements with `+` indicator that rotates 45deg on open
- **Answer reveal**: CSS grid-rows transition (`grid-rows-[0fr]` to `grid-rows-[1fr]`)
- **Final CTA**: Below FAQ, two-column grid with blurred radial gradient ambient effect

---

## Animation & motion

### Motion library (`motion` v13+)

Used exclusively in Hero section for staggered entrance animations:

```typescript
import { animate } from 'motion';

animate('#hero-copy', { opacity: [0, 1], y: [20, 0] }, { duration: 0.6, ease: [0.4, 0, 0.2, 1] });
animate('#hero-visual', { opacity: [0, 1], scale: [0.95, 1], filter: ['blur(10px)', 'blur(0px)'] }, { duration: 0.8, delay: 0.2 });
animate('#hero-capabilities', { opacity: [0, 1], y: [20, 0] }, { duration: 0.6, delay: 0.4 });
```

Import inside an Astro `<script>` tag. Do not use `<motion.div>` React wrappers.

### CSS keyframe animations

| Animation | Duration | Usage |
|-----------|----------|-------|
| `traverse-x` | 2s linear infinite | Horizontal data-flow dots in topology |
| `traverse-y` | 2s linear infinite | Vertical data-flow dots (mobile topology), CPU scanning line |
| `flow` | defined but unused | Hero (legacy/unused) |
| `animate-ping` | Tailwind built-in | Status indicator dots (green ping) |
| `animate-pulse` | Tailwind built-in | Recommended plan indicator dot |

### 3D Globe (`cobe` v2)

Rendered on a `<canvas>` element with `requestAnimationFrame` loop:
- Dark mode styling (`dark: 1`)
- Single marker at Phoenix, AZ coordinates (33.4484, -112.0740)
- Very slow rotation (`phi += 0.002`)
- Masked with `radial-gradient(circle_at_center,black_40%,transparent_100%)` and `mix-blend-screen`
- `devicePixelRatio: 2` for crisp rendering

### Motion tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--ease-standard` | `cubic-bezier(0.4, 0, 0.2, 1)` | Standard easing curve (matches Material Design standard) |
| `--motion-fast` | `150ms` | Quick transitions |
| `--motion-standard` | `300ms` | Standard transitions |

### Transition patterns in use

Components consistently use:
- `transition-colors` for text/border/background color changes
- `transition-all` for multi-property changes (nav links, cards)
- `transition-opacity` for reveal effects
- `transition-transform` for icon rotations, translate effects
- `duration-200` (Button), `duration-300` (FAQ reveal), `duration-500` (spotlight reveals), `duration-700` (CPU visual)

### Accessibility: `prefers-reduced-motion`

> **Status: NOT IMPLEMENTED.** The `AGENTS.md` requirement for `prefers-reduced-motion` support exists but no implementation exists in the codebase. The globe animation, traversal dots, entrance animations, and ping indicators all run unconditionally. This is a known gap that should be addressed.

---

## Iconography

### Primary: Lucide via `astro-icon`

Import pattern in Astro components:

```astro
---
import { Icon } from 'astro-icon/components';
---
<Icon name="lucide:icon-name" class="w-5 h-5 text-primary" />
```

Icons used across the site:
- `lucide:chevron-down` - Nav dropdowns, accordion indicators
- `lucide:arrow-right` - CTA links, footer links, dashboard button
- `lucide:arrow-up-right` - External pricing links
- `lucide:menu` - Mobile menu open
- `lucide:x` - Mobile menu close
- `lucide:globe` - Network edge node
- `lucide:router` - Routing node
- `lucide:server` - Virtual node
- `lucide:monitor` - Instance endpoint
- `lucide:database` - NVMe indicator
- `lucide:cpu` - CPU icon
- `lucide:hard-drive` - Storage feature
- `lucide:memory-stick` - Memory feature
- `lucide:zap` - "Instant setup" indicator
- `lucide:info` - Information banner

### Legacy: custom `Icon.astro`

The [`Icon.astro`](src/components/ui/Icon.astro) component contains hardcoded SVG paths for ~12 icons. It is not currently imported by any rendered page component. New work should use the `astro-icon` Lucide integration exclusively.

### Icon sizing conventions

| Size | Usage |
|------|-------|
| `w-3 h-3` / `w-3.5 h-3.5` | Inline with small text (NVMe badge, nav chevron) |
| `w-4 h-4` | Arrow icons, mobile menu icons, small inline indicators |
| `w-5 h-5` | Feature section icons, info icon |
| `w-6 h-6` | Topology node icons, CPU icon, primary feature icons |
| `w-8 h-8` | Large CPU icon inside visual |

### Icon rules

- Use Lucide exclusively. Do not mix icon libraries.
- Icons in controls need an accessible button name; the icon itself gets `aria-hidden="true"`.
- Decorative icons that merely repeat the adjacent text's meaning should be avoided.

---

## Section composition patterns

### Standard section header

Every content section follows this header pattern:

```astro
<p class="text-[0.72rem] font-mono tracking-wider text-primary uppercase mb-4">
  0N / Section Name
</p>
<h2 class="text-3xl md:text-4xl font-semibold text-text leading-tight mb-4">
  Heading text.
</h2>
<p class="text-text-muted text-lg">
  Supporting description text.
</p>
```

The section label uses a numbered format: `01 / Architecture`, `02 / Performance`, `03 / Deployment`, `04 / Server plans`, `05 / Answers`. New sections should continue this numbering.

### Section backgrounds

Sections alternate between background levels to create visual separation:

| Section | Background | Border |
|---------|-----------|--------|
| Hero | `bg-bg` | none |
| Features | `bg-bg` | `border-t border-border` |
| Catalog | `bg-surface-1` | `border-y border-border-subtle` |
| Pricing | `bg-bg` | `border-b border-border` |
| FAQ | `bg-surface-1` | `border-t border-border-subtle` |
| Footer | `bg-[#07090d]` | `border-t border-border` |

The alternation between `bg-bg` and `bg-surface-1` creates a subtle banding rhythm.

### Section overflow

All sections use `overflow-hidden` when they contain absolute-positioned background effects or visuals that extend beyond the section boundary.

### Inline CTA links

A consistent pattern for inline action links appears across sections:

```astro
<a href="..." class="inline-flex items-center font-bold text-text hover:text-primary transition-colors group">
  Link text
  <Icon name="lucide:arrow-right" class="w-4 h-4 ml-2 text-primary group-hover:translate-x-1 transition-transform" />
</a>
```

---

## Navigation patterns

### Desktop navigation

- **Sticky header**: `sticky top-0 z-40` with semi-transparent background (`bg-bg/85 backdrop-blur-md`)
- **Nav items**: Pill-shaped hover states (`rounded-full hover:bg-surface-2/60`)
- **Dropdowns**: Native `<details>` elements with glassmorphic panels, accordion behavior (JS), close-on-outside-click
- **Primary CTA**: "Dashboard" button with arrow icon, right-aligned

### Mobile navigation

- **Toggle**: `<details>` with "Menu" text and hamburger/X icon
- **Panel**: Fixed-width panel (`max-w-sm`) anchored to top-right
- **Organization**: Grouped by category (Products, Infrastructure, Resources) with monospace uppercase labels
- **CTA**: Full-width "Dashboard" button at bottom

---

## Tailwind CSS v4 integration

### Configuration

Tailwind v4 is integrated via the `@tailwindcss/vite` plugin in `astro.config.mjs`. There is no `tailwind.config.js` file.

### Token bridge

[`tokens.css`](src/styles/tokens.css) uses the `@theme` block to bridge CSS custom properties to Tailwind utility classes:

```css
@theme {
  --color-bg: var(--color-bg);
  --color-surface-1: var(--color-surface-1);
  --font-mono: var(--font-mono);
  /* ... all tokens */
}
```

This enables writing `bg-surface-1`, `text-primary`, `border-border-subtle`, `font-mono` directly in Tailwind class strings.

### Styling approach

Components use a mix of:
1. **Tailwind utility classes** (primary approach for new/revamped components) - Header, Footer, PlanCard, all sections
2. **Scoped `<style>` blocks with CSS custom properties** (legacy approach) - Button, Container, FeatureCard, Icon, Logo, 404 page

New components should use Tailwind utility classes exclusively. The legacy scoped-style components remain functional but should not be used as a pattern for new work.

### Arbitrary values

The codebase uses Tailwind arbitrary values extensively for precise design control:
- `text-[0.65rem]`, `text-[0.72rem]`, `text-[0.85rem]` etc. for the custom type scale
- `bg-[linear-gradient(...)]` for background patterns
- `bg-[size:32px_32px]` for grid sizing
- `[mask-image:...]` for gradient masks
- `animate-[traverse-x_2s_linear_infinite]` for custom animations
- `shadow-[0_0_10px_var(--color-primary)]` for glow effects
- `font-[550]`, `font-[650]` for non-standard weights

---

## Infrastructure-specific visual rules

### Hardware context

All visual specifications and mockups must reference the actual infrastructure baseline:
- **Processor**: Intel Xeon E5-2690 v4 (never AMD EPYC or generic placeholders)
- **Datacenter**: Phoenix, Arizona (PHX)
- **Virtualization**: KVM
- **Storage**: Enterprise NVMe SSD
- **Network**: 1 Gbps uplink
- **Protection**: L4 DDoS mitigated

### Page composition by product type

Pages must not repeat a fixed template. Composition should follow the product story:

- **Windows RDP pages**: Lead with desktop/RDP experience, deployment and access, machine capability, OS choices, then plans.
- **Linux VPS pages**: Lead with compute/virtualization, CLI/developer workflow, distributions, networking, then plans.
- **Datacenter/location pages**: Lead with location and regional role, physical/network topology, verified capability, connectivity, then availability.
- **Comparison, pricing, campaign, guide pages**: Earn every section from the specific decision journey.

### Truthfulness

Never invent:
- Customer counts
- Uptime percentages
- Performance claims or benchmarks
- Capacity numbers
- Locations beyond Phoenix, AZ
- Latency figures
- Deployment time guarantees
- Customer reviews or testimonials

If data is unavailable, use neutral explanatory content.

---

## Anti-patterns and visual guardrails

### Prohibited default patterns

Do not introduce the following as automatic design choices:

- Giant gradient hero type, rainbow/neon purple-blue gradients, or gradients repeated per section
- Glassmorphism, blur blobs, particles, arbitrary background grids, or glow on every card
- Floating decorative cards, fake dashboards, fake charts, terminal output, infrastructure diagrams, benchmarks, status numbers, or testimonials
- A bento grid, a badge-heading-paragraph-card stack, pill controls, rounded panels, or oversized centered heading merely because it is a familiar landing-page pattern
- Decorative icons that repeat the same meaning as the text
- Animation without state/progression meaning
- Cards used as the default layout for every content group

An effect can be used only when it has a stated reason. It may not be used purely to make a section look more "high-end."

### Component naming

Prohibited names: `FeatureCard2`, `FeatureCardNew`, `ModernFeatureCard`, `PricingCardAlt`, or any page-numbered variant. Make the existing component better or create a semantically different component with a distinct name.

### References and originality

References are useful for hierarchy, density, spacing, typography, interaction patterns, and rhythm. Do not reproduce their hero construction, section sequence, card composition, background treatment, illustration, typography composition, or animation signature. Translate the principle through this project's content, tokens, and infrastructure vocabulary.

External UI libraries (Aceternity UI, Starwind UI, HyperUI, OpenTailwind, 21st.dev) are sources of inspiration. Do not install them as dependencies or convert the project to React to use them. Reconstruct useful patterns in Astro using Tailwind and the TUFFRDP design tokens.

### Mandatory visual review checklist

Before declaring a page or substantial section complete:

1. Does it resemble a generic AI-generated SaaS template? If so, what infrastructure-specific information or composition differentiates it?
2. Are cards, pill shapes, gradients, glows, icons, and rounded surfaces each justified and restrained?
3. Does every decorative visual communicate an approved product concept or a state?
4. Does the section sequence follow this page's product story rather than a reused landing-page formula?
5. Is hierarchy obvious with animation disabled and at 200% zoom?
6. Does the mobile layout feel deliberately composed rather than a compressed desktop grid?
7. Did the implementation reuse the correct primitive/section rather than create a near-duplicate?
8. Can any JavaScript, asset, or dependency be removed without losing required behavior?

If any answer reveals generic, decorative, fabricated, or redundant work, revise before review.

---

## Accessibility-related visual requirements

- Touch targets: at least 24x24 CSS px (44x44 preferred)
- Clear `:focus-visible` indicators using the primary color
- Skip link: visible on focus (`sr-only focus:not-sr-only`), positioned `z-[100]`
- Text contrast: `--color-text` (#f8fafc) on `--color-bg` (#00020a) provides high contrast; `--color-text-muted` (#94a3b8) on dark backgrounds must maintain WCAG AA
- Decorative images: empty `alt=""` attribute
- Meaningful images: descriptive `alt` text
- SVG icons in controls: button must have accessible name, icon gets `aria-hidden="true"`
- No animation may be required to understand content (content must be comprehensible in a static screenshot)

---

## Known gaps and undefined areas

These areas are not yet standardized in the codebase and require definition when they become relevant:

| Area | Status |
|------|--------|
| Light theme / `prefers-color-scheme` | Not implemented. Dark-only. |
| `prefers-reduced-motion` | Required by policy, not implemented. |
| Custom web fonts | None loaded. System defaults only. |
| `--space-8` token | Missing from scale (gap between `--space-7: 3rem` and `--space-9: 5rem`). |
| Z-index scale | No tokens defined. Values used inline: `z-0`, `z-10`, `z-40` (header), `z-[100]` (skip link). |
| Form styling | No forms exist yet. |
| Dialog / modal patterns | No dialogs exist yet. |
| Toast / notification patterns | No toasts exist yet. |
| Tooltip / popover patterns | No tooltips exist yet. |
| Tab patterns | No tabs exist yet. |
| Badge component | Ad hoc inline badges exist but no reusable component. |
| Input component | No input component exists yet. |
| Table component | Pricing table is inline in the section, not a reusable component. |
| Content page layout | `ContentLayout` is referenced in AGENTS.md architecture but does not exist. |
| Blog / guide styling | Content collections directory exists but is empty. |
