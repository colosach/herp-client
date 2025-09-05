import type { 
  FormError,
  FormSubmitEvent 
} from '@nuxt/ui'

import * as z from 'zod'
const { randomAlphanumeric } = useUtils()

export default function useRegisteration() {

  const { t } = useI18n()
  const authStore = useAuthStore()

  // Array to hold form errors (if needed for UI)
  const formErrors: FormError[] = []
  const form = useTemplateRef('registration-form')

  const schema = createRegisterationSchema()
  type Schema = z.output<typeof schema>

  const state = reactive<Schema>({
    first_name: null,
    last_name: null,
    email: null,
    password: null,
    password2: null,
    username: null
  })
  
  // watch firsName and generate username from it
  watchEffect(()=> {
    state.username = state.first_name 
      ? `${state.first_name.toLocaleLowerCase()}-${randomAlphanumeric(4)}` : null
  })

  const { 
    color, text, 
    strength, score 
  } = usePasswordStrength(state)

  const toast = useToast()
  const { encryptData } = useCrypto()

  async function initRegisteration(event: FormSubmitEvent<Schema>) {
    
  // Omit password 2 before sending
    const {password2, ...stateWithoutPassword2 } = state

    await authStore.registerUser(stateWithoutPassword2)
      .then( async(res) => {
        if (res) {

          // Show success toast notification
          toast.add({ 
            title: t("REGISTER.messages.success.title"),
            description: t("REGISTER.messages.success.subtitle"),
            type: "foreground",
            color: "primary",
            duration: 2000,
            icon: "ph-seal-check",
            close: false,
            ui: { root: 'p-6' },
          })

          // save email in storage
          updateStorage({
            key: ERP_STORAGE_KEYS.EMAIL_PENDING_ACTION,
            target: state.email,
            encrypt: true
          })
          
          // navigate to email verification 
          navigateTo({ 
            query: { 
              [REGISTRATION.STEP_QUERY_KEY]: REGISTRATION.STEP_QUERY_VALUES.VERIFY} 
            })
            
        }
      })
      .catch((error) => {

        // Show error toast notification
        toast.add({ 
          title: t("REGISTER.messages.error.title"),
          description: error?.data?.error ?? t("REGISTER.messages.error.subtitle"),
          color: "error",
          duration: 4000,
          closeIcon: "ph-x",
          icon: "ph-seal-warning",
          close: { color: 'error' }
        })
      })
     
  }

  return {
    form, schema, state, initRegisteration,
    color, text, strength, score
  }

}