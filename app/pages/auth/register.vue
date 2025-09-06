<script setup lang="ts">
  import { z } from 'zod'

  const { decryptData } = useCrypto()

  definePageMeta({
    layout: 'erp-auth-layout',
    requiresGuest: true,
    middleware: ['otp']
  })

  const route = useRoute()
  const registerationStep = computed(() => {
    return route.query[REGISTRATION.STEP_QUERY_KEY]
  })

  const OTPFormIsInLoadingState = ref(false)
  const { initEmailVerification } = useEmailVerification()

  async function handleOTPSubmission(state: any) {
    
    // Put OTP form elements into loading state
    OTPFormIsInLoadingState.value = true

    await initEmailVerification(state.value.pin)
      .then((res) =>{
        OTPFormIsInLoadingState.value = false

        // automatically login user, then send them to setup

        if(res) {
          navigateTo("/setup")
        }
      })  
  }
</script>

<template>
  <main
    class="
      erp__registeration__page margin h-full min-h-full w-full 
      flex items-center justify-center
    "
  >
    <OTPForm
      :loading="OTPFormIsInLoadingState"
      v-if="registerationStep === REGISTRATION.STEP_QUERY_VALUES.VERIFY"
      @submit="handleOTPSubmission"
    />

    <RegistrationForm  v-else/>
  </main>
</template>