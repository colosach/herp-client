<script setup lang="ts">
  import * as z from 'zod'

  const { schema, formErrors, state } = useOTP()

  const form = useTemplateRef('otp-form')
  
  type Schema = z.output<typeof schema>
  const emit = defineEmits<{
    submit: [state: Schema]
  }>()

  function validateUserInput() {
    // Clear previous errors first
    formErrors.length = 0 
    
    if (!state.pin || state.pin.filter(digit => digit !== null && digit !== undefined).length < VERIFICATION_QUERY.OTP_LENGTH) {
      formErrors.push({ name: 'pin', message: $t('OTP.inputs.pin.errors.minLength', { min: VERIFICATION_QUERY.OTP_LENGTH })})
      form.value?.setErrors(formErrors)
    }
    else {
      emit('submit', state)
    }
  }
</script>

<template>
  <UForm
    :state="state" 
    id="otp-form" ref="otp-form"
    class="erp__otpForm space-y-4 w-full max-w-[30rem]"
    @submit="validateUserInput"
  >
    <UCard 
      :ui="{
        root: 'divide-none rounded-3xl',
        header: 'sm:px-6 px-6 pt-6',
        body: 'sm:px-6 px-6 pt-0 pb-6',
        footer: 'sm:px-6 px-6 py-6 bg-accented',
      }"
    >

      <!-- Form head -->
      <template #header>
        <div class="flex flex-col gap-1">
          <h1 class="erp__otpForm__title text-2xl text-highlighted"> {{  $t('OTP.title') }}</h1>
          <p class="erp__otpForm__subtitle text-base text-muted"> {{  $t('OTP.subtitle') }} </p>
        </div>
      </template>

      <!-- Form body -->
      <template #default>
        <div class="flex flex-col gap-4">
          <UFormField 
            :label="$t('OTP.inputs.pin.label')" size="xl"
            :required="true" name="pin"  
          > 
            <UPinInput
              :length="VERIFICATION_QUERY.OTP_LENGTH"
              type="number" placeholder="○" size="xl"
              id="verification-pin" name="pin"
              v-model="state.pin" required
            />
          </UFormField>
        </div>
      </template>

      <!-- Form footer/actions -->
      <template #footer>
        <div class="erp__otpForm__actions flex items-center justify-between gap-1 text-base">

          <UButton
            class="erp__otpForm__loginBtn text-muted"
            variant="link"
          >
            {{ $t('OTP.actions.resendCode') }}
          </UButton>

          <UButton
            type="submit" size="xl"
            class="erp__otpForm__submitBtn cursor-pointer ph-bold"
            :loading-auto="true"
            loading-icon="ph-spinner"
          >
            {{ $t('OTP.actions.verifyEmail') }}
          </UButton>
        </div>
      </template>

    </UCard>
  </UForm>
</template>
