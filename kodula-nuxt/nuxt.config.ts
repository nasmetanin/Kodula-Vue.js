// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    [
      "@nuxtjs/i18n",
      {
        locales: [
          { code: "en", file: "en.json" },
          { code: "et", file: "et.json" },
        ],
        defaultLocale: "et",
        langDir: "locales/",
        lazy: true,
      },
    ],
  ],
  vite: {
    optimizeDeps: {
      include: [
        "@vue/devtools-core",
        "@vue/devtools-kit",
        "gsap",
        "gsap/ScrollTrigger",
      ],
    },
  },
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
});
