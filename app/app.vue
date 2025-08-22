<script setup lang="ts">
  import * as locales from '@nuxt/ui/locale'
  import ERPLayoutsWrapper from '@/layouts/ERPLayoutsWrapper.vue';

  // https://ui.nuxt.com/getting-started/i18n/nuxt
  const { locale } = useI18n()
  const lang = computed(() => locales[locale.value].code)
  const dir = computed(() => locales[locale.value].dir)

  useHead({
    htmlAttrs: { lang, dir }
  })
</script>

<template>
  <NuxtLoadingIndicator />
  
  <UApp :locale="locales[locale]">
    <ERPLayoutsWrapper>
      <NuxtLayout />
    </ERPLayoutsWrapper>
  </UApp> 
</template>
