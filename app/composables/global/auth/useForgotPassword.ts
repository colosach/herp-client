import type { 
  FormError,
  FormSubmitEvent 
} from '@nuxt/ui'

import * as z from 'zod'


const useForgotPassword = () => {

  const { t } = useI18n()
  const authStore = useAuthStore()

  // Array to hold form errors (if needed for UI)
  const formErrors: FormError[] = []
  const form = useTemplateRef('password-reset-form')

  const schema = createForgotPasswordShema()
  type Schema = z.output<typeof schema>

  const state = reactive<Schema>({
    email: null
  })

  const toast = useToast()
  const { createOtpSession } = useOTPSession()


  async function initPasswordReset() {
    await authService.forgotPassword(state)
      .then( async(res) => {
        if (res) {

          // Show success toast notification
          toast.add({ 
            title: t("FORGOT_PASSWORD.messages.success.title"),
            description: t("FORGOT_PASSWORD.messages.success.subtitle"),
            type: "foreground",
            color: "primary",
            duration: 4000,
            icon: "ph-seal-check",
            close: false,
            ui: { root: 'p-6' },
          })

          // save email in storage
          createOtpSession(state.email)

          // navigate to email verification screen
          navigateTo({ 
            query: { [RESET.STEP_QUERY_KEY]: RESET.STEP_QUERY_VALUES.VERIFY } 
          })
        }
      })
      .catch((error) => {

          // Show error toast notification
          toast.add({ 
            title: t("FORGOT_PASSWORD.messages.error.title"),
            description: error?.data?.error ?? t("FORGOT_PASSWORD.messages.error.subtitle"),
            color: "error",
            duration: 4000,
            closeIcon: "ph-x",
            icon: "ph-seal-warning",
            close: { color: 'error' }
          })
      })
     
  }

  return {
    form, schema, state, initPasswordReset,
  }

}

export default useForgotPassword