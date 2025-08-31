<script setup lang="ts">
  import * as locales from '@nuxt/ui/locale'
  import ERPLayoutsWrapper from '@/layouts/ERPLayoutsWrapper.vue';
  
  import type { 
    ToasterProps 
  } from '@nuxt/ui';
  
  // https://ui.nuxt.com/getting-started/i18n/nuxt
  const { locale } = useI18n()
  const lang = computed(() => locales[locale.value].code)
  const dir = computed(() => locales[locale.value].dir)

  useHead({
    htmlAttrs: { lang, dir }
  })

  const toast = useToast()
  const { isOnline } = useNetwork()
  
  // watch network connection if backend if remote
  if (import.meta.env.VITE_ERP_SERVER_IS_REMOTE) {
    watch(isOnline, (online, prevOnline) => {
    if (prevOnline === undefined) return
    
    if (!online) {
      toast.add({
        title: $t("COMMON.internet.offline.title"),
        description: $t("COMMON.internet.offline.description"),
        color: "error",
        duration: 4000,
        closeIcon: "ph-x",
        icon: "ph-wifi-x",
        close: { color: 'error' },
      })
    } else {
      toast.add({
        title: $t("COMMON.internet.online.title"),
        description: $t("COMMON.internet.online.description"),
        color: "primary",
        duration: 3000,
        closeIcon: "ph-x",
        icon: "ph-wifi-high",
        close: { color: 'primary' },
      })
    }
  })
  }

  const toaster: ToasterProps = { 
    expand: false,
    position: 'top-right'
  }

  const colorMode = useColorMode()
  const isDark = computed({
    get() {
      return colorMode.value === 'dark'
    },
    set(_isDark) {
      colorMode.preference = _isDark ? 'dark' : 'light'
    }
  })

  const authStore = useAuthStore()
</script>

<template>
  <NuxtLoadingIndicator />
  
  <UApp
    :locale="locales[locale]"
    :toaster="toaster"
  >
    <ERPLayoutsWrapper>
      <NuxtLayout />
    </ERPLayoutsWrapper>

    <UButton
      color="neutral"
      variant="ghost"
      @click="isDark = !isDark"
      class="fixed bottom-0 left-0"
    >
      Switch Color Mode
    </UButton>

    <UButton
      v-if="authStore.user"
      color="neutral"
      variant="ghost"
      @click="authStore.logoutUser"
      class="fixed bottom-0 right-0"
    >
      Logout
    </UButton>
  </UApp> 
</template>
