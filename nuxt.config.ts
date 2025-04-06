import { checkEnv } from "./config/env.config"

checkEnv(process.env)

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },
  runtimeConfig: {
    databaseUrl: "",
  },
  css: ["~/assets/css/main.css"],
  modules: ["@nuxt/eslint", "@nuxt/test-utils", "@nuxt/ui", "@vueuse/nuxt"],
})
