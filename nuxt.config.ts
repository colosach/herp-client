import tailwindcss from "@tailwindcss/vite";
import { createResolver } from '@nuxt/kit'
const { resolve } = createResolver(import.meta.url)

import { readdirSync, existsSync } from 'fs'
import { join } from 'path'
import { glob } from 'glob'
import type { NuxtPage } from '@nuxt/schema'
import pagesEntension from "./app/modules/pages-entension";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },
  ssr: false,

  alias: {
    '@base': resolve('./')
  },

  appConfig: {
    ui: {
      colors: {
        primary: "teal",
        neutral: "zinc"
      },

      icons:{

      },

      card: {
        slots: {
          root: 'rounded-3xl p-4 divide-none',
          header: 'sm:p-0',
          body: 'sm:p-0',
          footer: 'sm:p-0',
        }
      }
    }
  },

  runtimeConfig: {
    public: {
      // https://nuxt.com/docs/4.x/guide/going-further/runtime-config
      erpCryptoKey: ''
    }
  },

  css: [
    "@/style/tailwind/index.css",
    "@/style/scss/index.scss",
  ],

  components: [
    {
      path: "~/components",
      pathPrefix: false,    
    },
  ],

  experimental: {
    inlineRouteRules: true,
    browserDevtoolsTiming: process.env.NODE_ENV === "development"
  },

  icon: {
    serverBundle: {
      collections: ["ph"] 
    }
  },

  modules: [
    "@nuxt/ui", 
    "@pinia/nuxt", 
    "@vueuse/nuxt", 
    "@nuxtjs/i18n",
    pagesEntension
],

  pinia: {
    storesDirs: ["./app/stores/**"]
  },

  imports: {
    dirs: [
      "composables/global/**",
      "utils/global/**",
      "constants/**",
      "axios/**",
      "api/**",
      "types/**",
    ],
    
    imports: [
      {
        from: "axios",
        name: "AxiosInstance",
        type: true,
      },
      {
        from: "axios",
        name: "AxiosResponse",
        type: true,
      },
      {
        from: "axios",
        name: "AxiosError",
        type: true,
      },
      {
        from: "axios",
        name: "AxiosRequestConfig",
        type: true,
      },
      {
        from: "axios",
        name: "InternalAxiosRequestConfig",
        type: true,
      },

      {
        from: "@vueuse/integrations/useJwt",
        name: "useJwt",
        as: "useJwt"
      },
    ]
  },

  router: {
    options: {
      scrollBehaviorType: "smooth"
    }
  },

  vite: { 
    plugins: [
      tailwindcss()
    ]
  },

  ui: {
    colorMode: false,
    fonts: false
  },

  i18n: {
    strategy: "no_prefix",
    detectBrowserLanguage: false,
    defaultLocale: process.env.NUXT_PUBLIC_ERP_DEFAULT_LOCALE,
    locales: [
      {
        code: 'en',
        name: "English",
        files: [
          'en/common.json',
          'en/auth.json', 
          'en/dashboard.json',
        ]
      }
    ]
  }
})