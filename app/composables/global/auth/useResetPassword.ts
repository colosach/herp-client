import type { 
  FormError,
  FormSubmitEvent 
} from '@nuxt/ui'

import * as z from 'zod'

export function useResetPassword() {
  const { t } = useI18n()
  const { decryptData } = useCrypto()
  const toast = useToast()
  
  // Array to hold form errors (if needed for UI)
  const formErrors: FormError[] = []

  const schema = createResetPasswordSchema()
  type Schema = z.output<typeof schema>

  const state = reactive<Schema>({
    pin: [],
    password: null,
    password2: null,
  })

  const { 
    color, text, 
    strength, score 
  } = usePasswordStrength(state)

  async function validateUserInput(form: any) {

    // Clear previous errors first
    formErrors.length = 0 

    
    if (!state.pin || state.pin.filter(digit => digit !== null && digit !== undefined).length < VERIFICATION.OTP_LENGTH) {
      formErrors.push({ name: 'pin', message: t('EMAIL_VERIFICATION.inputs.pin.errors.minLength', { min: VERIFICATION.OTP_LENGTH })})
      form.setErrors(formErrors)
    }
    else {
      return await resetPassword()
    }
    
  }

  async function resetPassword() {
    // saved email in storage
    let savedEncrytedEmailPendingAction = 
      localStorage.getItem(ERP_STORAGE_KEYS.EMAIL_PENDING_ACTION)

    let payload = {
      code: state.pin.join(''),
      email: decryptData(savedEncrytedEmailPendingAction),
      new_password: state.password
    }

    await authService.resetPassword(payload)
    .then( async(res) => {
      if (res) {

        // Show success toast notification
        toast.add({ 
          title: t("RESET_PASSWORD.messages.success.title"),
          description: t("RESET_PASSWORD.messages.success.subtitle"),
          type: "foreground",
          color: "primary",
          duration: 2000,
          icon: "ph-seal-check",
          close: false,
          ui: { root: 'p-6' },
        })

        // clear email in storage
        clearStorage(ERP_STORAGE_KEYS.EMAIL_PENDING_ACTION)

        // navigate to email verification 
        await navigateTo('/login')
      }
    })
    .catch((error) => {

        // Show error toast notification
        toast.add({ 
          title: t("RESET_PASSWORD.messages.error.title"),
          description: error?.data?.error ?? t("RESET_PASSWORD.messages.error.subtitle"),
          color: "error",
          duration: 4000,
          closeIcon: "ph-x",
          icon: "ph-seal-warning",
          close: { color: 'error' }
        })
    })
  }

  return {
    schema, state, validateUserInput,
    color, text, strength, score
  }
}

