<script setup lang="ts">
  import * as z from 'zod'

  const props = defineProps<{
    emailPendingVerification: String | null | 'admin@palmwineexpress.com'
    loading: boolean | undefined
  }>()

  const emit = defineEmits(['submit'])
  const form = useTemplateRef('otp-form')

  const { formErrors, schema } = useEmailVerification()

  type Schema = z.output<typeof schema>
  const state = useState('asd',() => shallowReactive<Schema>({
    pin: []
  }))

  const isProcessing = shallowRef(false)

  // NOTE: For some reason form submission event triggers pinInput's on submit event
  // So a flag is added to prevent double validation/emit
  function validateUserInput() {
    isProcessing.value = true

    // Clear previous errors first
    formErrors.length = 0 

    
    if (!state.value.pin || state.value.pin.filter(digit => digit !== null && digit !== undefined).length < VERIFICATION.OTP_LENGTH) {
      formErrors.push({ name: 'pin', message: $t('EMAIL_VERIFICATION.inputs.pin.errors.minLength', { min: VERIFICATION.OTP_LENGTH })})
      // form.value?.setErrors(formErrors)
    }
    else {
      emit('submit', state)
    }
  

    // DO NOT REMOVE. Critical to allow submission from both for & pinInput
    setTimeout(() => {
      isProcessing.value = false
    }, 1000);
  }

  function handleFormSubmission() {
    if (!isProcessing.value) {
      validateUserInput();
    }
  }
  
  function handlPinComplete() {
    if (!isProcessing.value) {
      validateUserInput();
    }
  }
</script>

<template>
  <UForm
    :state="state" :schema="schema"
    id="otp-form" ref="otp-form"
    class="erp__otpForm space-y-4 w-full max-w-[30rem]"
    @submit="handleFormSubmission"
    :disabled="props.loading"
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
          <h1 class="erp__otpForm__title text-2xl text-highlighted"> {{  $t('EMAIL_VERIFICATION.title') }}</h1>
          <p class="erp__otpForm__subtitle text-base text-muted"> 
            <span> {{  $t('EMAIL_VERIFICATION.subtitle.chunk1') }} <span class="text-highlighted"> {{ props?.emailPendingVerification }}.  </span> </span>  
            <span> {{  $t('EMAIL_VERIFICATION.subtitle.chunk2') }} </span>
          </p>
        </div>
      </template>

      <!-- Form body -->
      <template #default>
        <div class="flex flex-col gap-4">
          <UFormField 
            :label="$t('EMAIL_VERIFICATION.inputs.pin.label')" size="xl"
            :required="true" name="pin"  
          > 
            <UPinInput
              v-model="state.pin" 
              :length="VERIFICATION.OTP_LENGTH"
              type="number" placeholder="○" size="xl"
              id="verification-pin" name="pin"
              @complete="handlPinComplete" 
              :disabled="props.loading"
              required
            />
          </UFormField> 
        </div>
      </template>

      <!-- Form footer/actions -->
      <template #footer>
        <div class="erp__otpForm__actions flex items-center justify-between gap-1 text-base">

          <UButton
            variant="link"
            class="erp__otpForm__loginBtn text-muted undl-text hover:text-white p-0 text-base"
          >
            {{ $t('EMAIL_VERIFICATION.actions.resendCode') }}
          </UButton>

          <UButton
            type="submit" size="xl" ref="submitBtn"
            class="erp__otpForm__submitBtn cursor-pointer"
            :loading="props.loading"
            :disabled="props.loading"
            loading-icon="ph-spinner"
          >
            {{ $t('EMAIL_VERIFICATION.actions.verifyEmail') }}
          </UButton>
        </div>
      </template>

    </UCard>
  </UForm>
</template>
