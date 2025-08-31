<script setup lang="ts">
  import * as z from 'zod'

  definePageMeta({
    layout: 'erp-auth-layout',
    requiresGuest: true
  })

  const route = useRoute()
  const resetMode = computed(() => {
    return route.query[RESET_MODE_QUERY_KEY]
  })

  const { schema: otpSchema } = useOTP()
  
  type OTPSchema = z.output<typeof otpSchema>
  function initEmailVerification(pin: OTPSchema): void {
    console.log(pin)
  }

  const { schema: pinSchema } = useResetPassword()
  type PinSchema = z.output<typeof pinSchema>
  function initPasswordChange(state: PinSchema): void {
    console.log(state)
  }
</script>

<template>
  <main
    class="
      erp__psswdReset__page margin h-full min-h-full w-full 
      flex items-center justify-center
    "
  >
    <OTPForm
      v-if="resetMode === VERIFICATION_QUERY.KEY"
      @submit="() => initEmailVerification"
    />

    <ResetPasswordForm
      v-else-if="resetMode === RESET_QUERY_KEY"
      @submit="() => initPasswordChange"
    />

    <ForgotPasswordForm v-else/>
  </main>
</template>