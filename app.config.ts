import { defineAppConfig } from 'nuxt/app'

export default defineAppConfig({
  ui: {
    card: {
      slots: {
        root: 'rounded-3xl border-1 drop-shadow-sm p-2 divide-none',
        header: 'p-0',
        body: 'p-0',
        footer: 'p-0',
      }
    }
  }
})
