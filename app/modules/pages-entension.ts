import { defineNuxtModule, createResolver } from '@nuxt/kit'
import { resolve } from 'pathe'
import fg from 'fast-glob'

export default defineNuxtModule({
  meta: { name: 'pages-extension' },
  setup(_, nuxt) {
    const resolver = createResolver(import.meta.url)

    nuxt.hooks.hook('pages:extend', async (pages) => {
      // find all Vue files in app/modules/*/pages
      const files = await fg('app/modules/**/pages/**/*.vue', {
        cwd: nuxt.options.rootDir
      })

      for (const file of files) {
        // transform file path -> route path
        let path = file
          .replace(/^app\/modules\//, '') // drop "app/modules/"
          .replace(/\/pages/, '')         // drop "pages"
          .replace(/index\.vue$/, '')     // strip index.vue
          .replace(/\.vue$/, '')          // strip extension

        if (path === '') path = '/' // root

        pages.push({
          name: path.replace(/\//g, '-').replace(/^-/, ''),
          path: '/' + path,
          file: resolve(nuxt.options.rootDir, file)
        })
      }
    })

    // watch modules folder for HMR
    nuxt.options.watch.push(resolve(nuxt.options.rootDir, 'app/modules'))
  }
})
