import { pwa } from './config/pwa'
import { appDescription } from './constants/index'

export default defineNuxtConfig({
  vue: {
    compilerOptions: {
      isCustomElement: tag => ['css-doodle'].includes(tag),
    },
  },
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    '@vite-pwa/nuxt',
    '@vueuse/motion/nuxt',
    'dayjs-nuxt',
  ],
  dayjs: {
    locales: ['en', 'zh-cn'],
    plugins: ['relativeTime', 'utc', 'timezone', 'localizedFormat'],
    defaultLocale: 'zh-cn',
    defaultTimezone: 'Asia/Shanghai',
  },

  experimental: {
    // when using generate, payload js assets included in sw precache manifest
    // but missing on offline, disabling extraction it until fixed
    payloadExtraction: false,
    inlineSSRStyles: false,
    renderJsonPayloads: true,
    typedPages: true,
    reactivityTransform: true,
  },

  css: [
    '@unocss/reset/tailwind.css',
  ],

  colorMode: {
    classSuffix: '',
  },

  nitro: {
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
    prerender: {
      crawlLinks: false,
      routes: ['/'],
      ignore: ['/hi'],
    },
  },

  app: {
    head: {
      viewport: 'width=device-width,initial-scale=1',
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
        { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      ],
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: appDescription },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
      ],
      script: [
        { children: 'var global = (global === undefined) ? window : global' },
        // { src: 'https://cdnjs.cloudflare.com/ajax/libs/css-doodle/0.38.4/css-doodle.min.js', defer: true },
      ],
    },
  },

  pwa,

  devtools: {
    enabled: false,
  },

  routeRules: {
    // Homepage pre-rendered at build time
    '/': { prerender: true },
    // Product page generated on-demand, revalidates in background
    '/products/**': { swr: true },
    // Blog post generated on-demand once until next deploy
    '/blog/**': { isr: true },
    // Admin dashboard renders only on client-side
    '/admin/**': { ssr: false },
    // Add cors headers on API routes
    '/api/**': { cors: true },
    // Redirects legacy urls
    '/old-page': { redirect: '/new-page' },
  },
})
