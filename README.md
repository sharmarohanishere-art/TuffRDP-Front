<div align="center">
  <h1>🚀 TuffRDP</h1>
  <p><strong>Premium Windows RDP & Linux VPS Infrastructure Control Surface</strong></p>
  
  <p>
    <a href="https://astro.build"><img src="https://img.shields.io/badge/Astro_5-FF5D01?style=for-the-badge&logo=astro&logoColor=white" alt="Astro"></a>
    <a href="https://tailwindcss.com"><img src="https://img.shields.io/badge/Tailwind_v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS"></a>
    <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"></a>
    <a href="https://motion.dev/"><img src="https://img.shields.io/badge/Motion-000000?style=for-the-badge&logo=framer&logoColor=white" alt="Motion"></a>
  </p>
</div>

<br />

TuffRDP is an ultra-fast, statically-generated marketing and showcase frontend built for modern cloud infrastructure. Designed with a strict **"Infrastructure Control Surface"** aesthetic, it avoids generic SaaS templates in favor of a minimal, highly technical, and premium visual identity.

---

## ✨ Features

- **⚡️ Static-First Performance**: Built on [Astro](https://astro.build) with zero framework hydration by default. Delivers near-instant Core Web Vitals (LCP ≤2.5s, CLS ≤0.1).
- **🎨 Aceternity-Inspired UI**: Tailwind v4-powered glassmorphism, dynamic background grids, pill-shaped navigation hovers, and strict typographic hierarchy.
- **🌍 3D WebGL Globe**: Features a lightweight, natively rendered `cobe` interactive globe focused on our Phoenix, AZ datacenter—without the bloat of React or Three.js.
- **🦾 Infrastructure Context**: Accurately reflects our hardware baseline: **Intel Xeon E5-2690 v4** compute nodes and premium networking topology.
- **♿️ Accessible by Design**: WCAG 2.2 AA compliant, with semantic HTML, keyboard focus management, and `prefers-reduced-motion` support.

---

## 🛠️ Technology Stack

| Technology | Purpose |
| ---------- | ------- |
| **[Astro](https://astro.build)** | Core static site generator and `.astro` components |
| **[Tailwind CSS (v4)](https://tailwindcss.com)** | Utility-first CSS framework for all styling and glassmorphism |
| **[Motion](https://motion.dev)** | Lightweight staggered entrance animations (`animate()` via JS) |
| **[COBE](https://cobe.vercel.app/)** | 13kB WebGL globe visualization |
| **[Lucide Icons](https://lucide.dev)** | Unified icon system via `astro-icon` |

---

## 🚀 Getting Started

### Prerequisites

Ensure you have **[Bun](https://bun.sh/)** (or npm/pnpm/yarn) installed.

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sharmarohanishere-art/TuffRDP-Front.git
   cd TuffRDP-Front
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Start the development server**
   ```bash
   bun dev
   ```

   The site will be available at `http://localhost:4321`.

### Production Build

Before pushing to production, verify all types and lint rules:

```bash
# Run the strict pre-push verification suite
bun run check && bun run lint && bun run build
```

---

## 🏗️ Architecture & Philosophy

This project strictly adheres to the guidelines documented in our [`AGENTS.md`](./AGENTS.md) handbook:

1. **No React Wrappers**: We use vanilla JavaScript within Astro `<script>` blocks for interactive elements (like the 3D globe and Motion animations) to keep the client bundle tiny.
2. **Design Restraint**: No floating decorative cards, fake charts, or bento grids purely for aesthetics. Every visual element must communicate an approved product concept (e.g., topology diagrams, active data centers).
3. **Semantic Tokens**: We use a unified set of custom properties in `src/styles/tokens.css` for colors, spacing, and typography to maintain the technical aesthetic across both light and dark themes.

---

<div align="center">
  <p>Built with precision for high-performance infrastructure.</p>
</div>
