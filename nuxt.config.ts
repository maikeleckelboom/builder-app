// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "nuxt-headlessui",
    "@nuxtjs/tailwindcss",
    "nuxt-icon",
    "@nuxtjs/google-fonts",
  ],
  headlessui: {
    prefix: 'Headless'
  },
  components: {
    dirs: [{ path: '~/components', pathPrefix: false }],
  },
}) 