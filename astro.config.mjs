import { defineConfig } from 'astro/config';
import icon from "astro-icon";

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // You can add more Astro configuration here later
  output: 'static',

  integrations: [icon()],

  vite: {
    plugins: [tailwindcss()]
  }
});