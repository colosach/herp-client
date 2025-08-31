import tailwindcss from "@tailwindcss/vite";
import { createResolver } from '@nuxt/kit'
import pagesEntension from "./app/modules/pages-entension";

const { resolve } = createResolver(import.meta.url)

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

      toast: {
        slots: {
          root: "rounded-3xl p-6",
          icon: "ph-bold size-10",
          title: "text-sm font-semibold text-highlighted",
          description: "slots__bv capitalize-first-char",
          close: "cursor-pointer",
        },

        variants: {
          title: {
            true: {
              description: 'mt-0'
            }
          }
        }
      },

      button: {
        variants: {
          size: {
            xl: {
              base: "px-4 py-3 font-normal rounded-lg"
            }
          }
        }
      },

      card: {
        slots: {
          root: "rounded-3xl p-4 divide-none p-0 border-[0.0625rem] border-[var(--ui-border)] shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]",
          header: "sm:p-0",
          body: "sm:p-0",
          footer: "sm:p-0",
        },

        variants: {
          variant: {
            outline: {
              root: 'divide-none'
            }
          }
        }
      },

      icons: {
        arrowLeft: 'ph-arrow-left',
        arrowRight: 'ph-arrow-right',
        check: 'ph-check',
        chevronDoubleLeft: 'ph-double-caret-left',
        chevronDoubleRight: 'ph-double-caret-right',
        chevronDown: 'ph-caret-down',
        chevronLeft: 'ph-caret-left',
        chevronRight: 'ph-caret-right',
        chevronUp: 'ph-caret-up',
        close: 'ph-x',
        ellipsis: 'ph-ellipsis',
        external: 'ph-arrow-up-right',
        file: 'ph-file',
        folder: 'ph-folder',
        folderOpen: 'ph-folder-open',
        loading: 'ph-loader-circle',
        minus: 'ph-minus',
        plus: 'ph-plus',
        search: 'ph-search',
        upload: 'ph-upload'
      }
    },

    toaster: {
      expand: false,
    },
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

  // https://nuxt.com/modules/icon
  icon: {
    mode: "css",
    provider: 'none',
    externalizeIconsJson: true,
    clientBundle: {
      scan: {
        // note that when you specify those values, the default behavior will be overridden
        globInclude: [
          'nuxt.config.ts',
          'app/**/*.{ts,vue,json}',
        ],

        globExclude: ['node_modules', 'dist', /* ... */],
      },
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
      "api/**",
      "types/**",
    ],
    
    imports: [
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
    colorMode: true,
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