// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { VitePWA } from "vite-plugin-pwa";

const isGitHubPages = process.env.GITHUB_PAGES === "true";
const base = isGitHubPages ? "/filipe-s-market-app/" : "/";

export default defineConfig({
  vite: {
    base,
  },
  plugins: [
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: false,
      includeAssets: ["logo.png", "apple-touch-icon.png", "sw.js"],
      manifest: {
        name: "Mercadinho do Leblon",
        short_name: "Leblon",
        description: "Ofertas da semana e pedidos de delivery pelo WhatsApp.",
        theme_color: "#2f6f3f",
        background_color: "#fafaf8",
        display: "standalone",
        orientation: "portrait-primary",
        lang: "pt-BR",
        scope: base,
        start_url: base,
        icons: [
          {
            src: `${base}logo.png`,
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: `${base}logo.png`,
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,webp,jpg,jpeg,woff2}"],
        navigateFallback: `${base}index.html`,
      },
    }),
  ],
  nitro: isGitHubPages ? false : true,
  tanstackStart: {
    server: { entry: "server" },
    ...(isGitHubPages && {
      prerender: {
        enabled: true,
        pages: [
          {
            path: "/404",
            prerender: { enabled: true, outputPath: "/404.html" },
          },
        ],
      },
    }),
  },
});
