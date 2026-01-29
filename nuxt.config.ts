// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@nuxt/image", "@nuxt/fonts", "@vite-pwa/nuxt"],
  css: ["@/assets/css/main.css"],
  ssr: false,
  pwa: {
    registerType: "autoUpdate",
    workbox: {
      cleanupOutdatedCaches: true,
      globPatterns: ["**/*.{js,css,html,png,svg,webp}"],
      navigateFallback: "/",
      navigateFallbackAllowlist: [/^\/$/, /^\/.+/],
      runtimeCaching: [
        {
          urlPattern: /.*/,
          handler: "CacheFirst",
        },
      ],
    },
    manifest: {
      name: "Notely",
      short_name: "Notely",
      description: "A simple and elegant finance note-taking app.",
      theme_color: "#4F46E5",
      background_color: "#FFFFFF",
      display: "standalone",
      scope: "/",
      start_url: "/",
      icons: [
        {
          src: "/icons/icon-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "/icons/icon-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
    },
    includeAssets: ["notely.webp"],
  },
});
