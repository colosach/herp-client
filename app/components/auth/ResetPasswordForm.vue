<script setup lang="ts">
  import * as z from 'zod'

  const props = defineProps<{
    emailPendingVerification?: string
  }>()

  const { 
    schema, state, validateUserInput,
    color, text, strength, score
  } = useResetPassword()

  const form = useTemplateRef('reset-password-form')

  const pswdIsShown = ref(false)
  const pswd2IsShown = ref(false)
  const passwordStrengthCheckerIsShown = ref(false)

  const { decryptData } = useCrypto()
  const decryptedEmailPendingAction = computed(() => {

    // saved email in storage
    let savedEncrytedEmailPendingAction = 
      localStorage.getItem(ERP_STORAGE_KEYS.EMAIL_PENDING_ACTION)

    if (!savedEncrytedEmailPendingAction) return null
    return decryptData(savedEncrytedEmailPendingAction)

  })

  type Schema = z.output<typeof schema>
  const emit = defineEmits<{
    submit: [state: Schema]
  }>()
</script>

<template>
  <UForm
    :schema="schema" :state="state" 
    id="reset-password-form" ref="reset-password-form"
    class="erp__resetPswdForm space-y-4 w-full max-w-[30rem]"
    :validate-on="['blur']"
    @submit="validateUserInput(form)"
  >
    <UCard 
      :ui="{
        root: 'divide-none rounded-3xl',
        header: 'sm:px-6 px-6 pt-6',
        body: 'sm:px-6 px-6 pt-0',
        footer: 'sm:px-6 px-6 py-6 bg-accented',
      }"
    >

      <!-- Form head -->
      <template #header>
        <div class="flex flex-col gap-1">
          <h1 class="erp__resetPswdForm__title text-2xl text-highlighted"> {{  $t('RESET_PASSWORD.title') }}</h1>

          <p class="erp__otpForm__subtitle text-base text-muted"> 
            <span> {{  $t('RESET_PASSWORD.subtitle.chunk1') }} 
              <span class="text-highlighted"> {{ decryptedEmailPendingAction }}.  </span> 
            </span>  
            
            <span> {{  $t('RESET_PASSWORD.subtitle.chunk2') }} </span>
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
              :ui="{ root: 'w-full justify-between' }"
              required
            />
          </UFormField> 
          
          <UFormField 
            :label="$t('REGISTER.inputs.password.label')" 
            :required="true" name="password" size="xl"
          > 
            <UInput 
              v-model="state.password" 
              :type="pswdIsShown ? 'text' : 'password'"
              class="erp__resetPswdForm__password w-full" 
              :color="color"
              :placeholder="$t('REGISTER.inputs.password.placeholder')"
              :ui="{ base: 'text-ellipsis', trailing: 'pe-1' }"
              :aria-invalid="score < 4"
              aria-describedby="password-strength"
              required
              @focus="passwordStrengthCheckerIsShown = true"
              @blur="passwordStrengthCheckerIsShown = false"
            >
              <template #trailing>
                <UButton
                  color="neutral" variant="link" size="sm"
                  class="cursor-pointer text-dimmed ph-bol"
                  :icon="pswdIsShown ? 'i-ph-eye-slash' : 'i-ph-eye'"
                  :aria-label="pswdIsShown ? 'Hide password' : 'Show password'"
                  :aria-pressed="pswdIsShown"
                  aria-controls="password"
                  @click="pswdIsShown = !pswdIsShown"
                />
              </template>
            </UInput>
          </UFormField>

          <UCollapsible
            v-model:open="passwordStrengthCheckerIsShown"
            class="flex flex-col gap-2 w-full"
          >
            <template #content>
              <div class="flex flex-col gap-2">

                <UProgress
                  :color="color"
                  :indicator="text"
                  :model-value="score"
                  :max="4"
                  size="sm"
                />

                <ul
                  class="grid grid-cols-2 gap-y-1"
                  aria-label="Password requirements"
                >
                  <li
                    v-for="(req, index) in strength" :key="index"
                    class="flex items-center gap-0.5"
                    :class="req.met ? 'text-primary' : 'text-muted'"
                  >
                    <UIcon
                      :name="req.met ? 'ph-check' : 'ph-x'"
                      class="size-4 shrink-0"
                    />

                    <span class="text-xs">
                      {{ req.text }}
                    </span>
                  </li>
                </ul>

              </div>
            </template>
          </UCollapsible>

          <UFormField 
            :label="$t('REGISTER.inputs.password2.label')" class="-mt-4"
            :class="{'-mt-0': passwordStrengthCheckerIsShown }"
            :required="true" name="password2" size="xl"
          > 
            <UInput 
              v-model="state.password2" 
              :type="pswd2IsShown ? 'text' : 'password'"
              class="erp__resetPswdForm__password2 w-full" 
              :placeholder="$t('REGISTER.inputs.password2.placeholder')"
              :ui="{ base: 'text-ellipsis', trailing: 'pe-1' }"
              required
            >
              <template #trailing>
                <UButton
                  color="neutral" variant="link" size="sm"
                  class="cursor-pointer text-dimmed ph-bol"
                  :icon="pswd2IsShown ? 'i-ph-eye-slash' : 'i-ph-eye'"
                  :aria-label="pswd2IsShown ? 'Hide password' : 'Show password'"
                  :aria-pressed="pswd2IsShown"
                  aria-controls="password"
                  @click="pswd2IsShown = !pswd2IsShown"
                />
              </template>
            </UInput>
          </UFormField>

        </div>
      </template>

      <!-- Form footer/actions -->
      <template #footer>
        <div class="erp__resetPswdForm__actions flex items-center justify-between gap-1 text-base">
          <UButton
            variant="link"
            :to="{ name: 'auth-login' }"
            class="erp__resetPswdForm__rPsswdBtn undl-text text-muted hover:text-white p-0 text-base"
          >
          {{ $t('RESET_PASSWORD.actions.login') }}
          </UButton>

          <UButton
            type="submit" size="xl"
            class="erp__resetPswdForm__submitBtn cursor-pointer ph-bold"
            :loading-auto="true"
            loading-icon="ph-spinner"
          >
            {{ $t('RESET_PASSWORD.actions.updatePassword') }}
          </UButton>
        </div>
      </template>

    </UCard>
  </UForm>
</template>

<style>
  /* Hide the password reveal button in Edge */
  ::-ms-reveal {
    display: none;
  }
</style>