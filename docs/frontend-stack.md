# Core Frontend Stack

## 1. Astro
- **Core framework**: Static-first and very fast.
- **Excellent SEO**: Perfect for a marketing/showcase site.
- **Hydration**: Only hydrate interactive components when necessary (Islands architecture).

## 2. Tailwind CSS
- **Main styling system**: Responsive layouts, design tokens, faster component development.
- **Customization**: Easy to adapt external UI sections.

## 3. Starwind UI
- **Native Astro components**: Navbar, accordion, modal, tabs, buttons, etc.
- **Avoids unnecessary React**: Good foundation for reusable UI primitives.

## 4. OpenTailwind / HyperUI
- **Ready-made complete sections**: Hero, Features, Pricing, FAQ, CTA, Footer.
- **IMPORTANT**: Don't install these as the site's "design system." Use them as a library of layouts/patterns and customize them into the **TUFFRDP design system**.

## 5. Lucide Icons
- **Consistent icon system**: Lightweight and huge selection.
- **Rule**: Avoid mixing random icon styles.

## 6. Motion
- **Micro-interactions**: Section reveals, state transitions, pricing/selector animations, infrastructure visualization.
- **Rule**: Use selectively. Don't animate everything.

## 7. Embla Carousel
- **Use cases**: Testimonials, logo/customer sliders, mobile horizontal content.
- **Rule**: Only install if the site actually needs carousels.

## 8. Floating UI
- **Use cases**: Tooltips, dropdown positioning, popovers, complex menus.
- **Rule**: Only needed if Starwind/native CSS doesn't already handle the requirement.

## 9. Astro Icon
- **Clean icon handling inside Astro**: Can integrate multiple icon sets, keeping icon usage consistent.

## 10. Astro Image
- **Built-in responsive image optimization**: WebP/AVIF, correct dimensions, better LCP/performance.
- **Rule**: Prefer Astro's built-in image functionality before adding another image package.

---

## Design / Section Sources
- **Starwind**: Astro-native UI primitives + blocks.
- **OpenTailwind**: Large source of landing-page sections.
- **HyperUI**: Simple Tailwind sections/components.
- **21st.dev**: Inspiration for more creative modern components.
- **Magic UI**: Advanced animated component inspiration.
- **Aceternity**: High-end visual/interactive inspiration.
- **IMPORTANT**: 21st.dev / Magic UI / Aceternity are heavily React-oriented. Don't convert the entire Astro website to React just to use them. Port/recreate only the visual ideas we actually need.

---

## Components Our Website Should Actually Have

### Global
- Header, Navigation, Mobile Navigation, Footer, Announcement Bar (when required), Container / Section primitives.

### Buttons
- Primary Button, Secondary Button, Text Button, Icon Button.

### Typography
- Display Heading, Section Heading, Body, Eyebrow / Label, Technical / Mono Metadata.

### Product
- Server Configuration, Resource Specification, CPU/RAM/Storage Display, OS Selector, Region Selector, Server Status, Deployment Status, Infrastructure Metrics.

### Visualization
- Infrastructure Diagram, Network Path, Server/Node Visual, Resource Meter, Mini Charts/Sparklines, Deployment Timeline.

### Marketing
- Hero, Feature Section, Infrastructure Section, Product Comparison, Use Cases, Trust/Proof Section, Pricing, FAQ, CTA, Documentation CTA.

### Pricing
- Billing Period Selector, Pricing Card, Plan Specification, Recommended Plan State, Plan Comparison.

### Interaction
- Accordion, Tabs, Dropdown, Tooltip, Modal/Dialog, Toast (only where useful).

### Utility
- Badge, Status Indicator, Divider, Breadcrumb, Pagination, Loading State, Empty State, Error State.

---

## What We Don't Need By Default
- ❌ React everywhere
- ❌ shadcn everywhere
- ❌ GSAP for simple animations
- ❌ Three different animation libraries
- ❌ Multiple icon libraries
- ❌ Huge UI frameworks
- ❌ Bootstrap
- ❌ jQuery
- ❌ WebGL/Three.js unless there's a real reason
- ❌ Heavy charting library for tiny graphs
- ❌ Multiple component libraries controlling our styling

---

## Ideal Structure
```text
Astro
   │
   ├── Tailwind
   │
   ├── Our Design System (colors, typography, spacing, borders, surfaces, motion)
   │
   ├── Starwind (UI primitives)
   │
   ├── OpenTailwind / HyperUI (section/layout inspiration)
   │
   ├── Lucide / Astro Icon (icons)
   │
   └── Motion (selective interactions)
```

## The Most Important Rule
Libraries provide COMPONENTS. They should NOT determine the visual identity of the website. Take useful primitives/sections from them and convert everything into one consistent **TUFFRDP design system**. The visitor should never be able to look at the finished website and say: "This is obviously a Starwind/21st.dev/Aceternity template."
