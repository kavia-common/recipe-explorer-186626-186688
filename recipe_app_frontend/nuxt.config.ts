/**
 * Nuxt configuration for Recipe Explorer
 * - Exposes runtime public config for API base via env:
 *   NUXT_PUBLIC_API_BASE, NUXT_PUBLIC_BACKEND_URL
 * - Keeps Vite server config and Nitro route headers.
 */
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  app: {
    head: {
      title: 'Recipe Explorer',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Browse, search, and view recipes with an elegant modern UI.' },
        { name: 'theme-color', content: '#2563EB' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><circle cx=%2250%22 cy=%2250%22 r=%2240%22 fill=%22%232563EB%22/></svg>' }
      ]
    }
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE,
      backendUrl: process.env.NUXT_PUBLIC_BACKEND_URL,
      frontendUrl: process.env.NUXT_PUBLIC_FRONTEND_URL,
      wsUrl: process.env.NUXT_PUBLIC_WS_URL,
      nodeEnv: process.env.NUXT_PUBLIC_NODE_ENV,
      features: process.env.NUXT_PUBLIC_FEATURE_FLAGS,
      experiments: process.env.NUXT_PUBLIC_EXPERIMENTS_ENABLED,
      healthcheckPath: process.env.NUXT_PUBLIC_HEALTHCHECK_PATH,
      port: process.env.NUXT_PUBLIC_PORT,
      trustProxy: process.env.NUXT_PUBLIC_TRUST_PROXY,
      logLevel: process.env.NUXT_PUBLIC_LOG_LEVEL,
      enableSourceMaps: process.env.NUXT_PUBLIC_ENABLE_SOURCE_MAPS,
    }
  },
  nitro: {
    routeRules: {
      "/**": {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      },
    },
  },
  vite: {
    server: {
      host: '0.0.0.0',
      allowedHosts: true,
      port: 3000,
    },
  },
});
