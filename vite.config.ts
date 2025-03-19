import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { tempo } from "tempo-devtools/dist/vite";
import pages from 'vite-plugin-pages'
import tempoRoutes from 'tempo-routes'
import tailwindHmr from 'vite-plugin-tailwind-hmr'

const conditionalPlugins: [string, Record<string, any>][] = [];

// @ts-ignore
if (process.env.TEMPO === "true") {
  conditionalPlugins.push(["tempo-devtools/swc", {}]);
}

// https://vitejs.dev/config/
export default defineConfig({
  base: '/futebolshow/', // Nome correto do repositório
  optimizeDeps: {
    entries: ["src/main.tsx", "src/tempobook/**/*"],
  },
  plugins: [
    react({
      plugins: conditionalPlugins,
    }),
    tempo(),
    pages(),
    tempoRoutes(),
    tailwindHmr(),
  ],
  resolve: {
    preserveSymlinks: true,
    alias: [
      { find: '@', replacement: '/src' },
      { find: '~', replacement: '/src' },
      { find: 'components', replacement: '/src/components' },
    ],
  },
  server: {
    // @ts-ignore
    allowedHosts: true,
  }
});
