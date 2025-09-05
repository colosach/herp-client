<script setup lang="ts">
  definePageMeta({
    layout: 'erp-auth-layout',
    requiresGuest: true,
    middleware: ['otp']
  })

  const route = useRoute()
  const restStep = computed(() => {
    return route.query[RESET.STEP_QUERY_KEY]
  })
</script>

<template>
  <main
    class="
      erp__psswdReset__page margin h-full min-h-full w-full 
      flex items-center justify-center
    "
  >
    <ResetPasswordForm
      v-if="restStep === RESET.STEP_QUERY_VALUES.RESET"
    />

    <ForgotPasswordForm v-else/>
  </main>
</template>