import type { 
  FormError,
  FormSubmitEvent 
} from '@nuxt/ui'

import * as z from 'zod'

export default function useEmailVerification() {
  
  const schema = z.object({
    pin: z.array(z.number()).nullable()
  })
  
  // Array to hold form errors (if needed for UI)
  const formErrors: FormError[] = []

  const toast = useToast()
  const authStore = useAuthStore()
  const { $i18n } = useNuxtApp()
  const { decryptData } = useCrypto()

  type OTPSchema = z.output<typeof schema>
  
  
  async function initEmailVerification(pin: number[]) {
    
    // saved email in storage
    let savedEncrytedEmailPendingAction = 
      localStorage.getItem(ERP_STORAGE_KEYS.EMAIL_PENDING_ACTION)

    let credentials = {
      code: pin.join(''),
      email: decryptData(savedEncrytedEmailPendingAction)
    }

    return await authStore.verifyEmail(credentials)
      .then( async(res) => {
        if (res) {
        console.log("🚧 ~ initEmailVerification ~ res::::", res)

          // Show success toast notification
          toast.add({ 
            title: $i18n.t("EMAIL_VERIFICATION.messages.success.title"),
            description: $i18n.t("EMAIL_VERIFICATION.messages.success.subtitle"),
            type: "foreground",
            color: "primary",
            duration: 2000,
            icon: "ph-seal-check",
            close: false,
            ui: { root: 'p-6' },
          })

          // clear email in storage
          clearStorage(ERP_STORAGE_KEYS.EMAIL_PENDING_ACTION)
          return res
        }
      })
      .catch((error) => {

        // Show error toast notification
        toast.add({ 
          title: $i18n.t("EMAIL_VERIFICATION.messages.error.title"),
          description: error?.data?.error ?? $i18n.t("EMAIL_VERIFICATION.messages.error.subtitle"),
          color: "error",
          duration: 4000,
          closeIcon: "ph-x",
          icon: "ph-seal-warning",
          close: { color: 'error' }
        })
      })
      
  }

  return {
    schema,
    formErrors, 
    initEmailVerification
  }
}