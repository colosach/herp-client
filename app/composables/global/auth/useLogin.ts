import type { 
  FormError,
  FormSubmitEvent 
} from '@nuxt/ui'

import * as z from 'zod'


export default function useLogin() {

  const { t } = useI18n()
  const authStore = useAuthStore()

  // Array to hold form errors (if needed for UI)
  const formErrors: FormError[] = []
  const form = useTemplateRef('login-form')

  const schema = createLoginSchema()
  type Schema = z.output<typeof schema>

  const state = reactive<Schema>({
    id: null,
    password: null
  })

  const toast = useToast()

  async function initLogin(event: FormSubmitEvent<Schema>) {
    
    // Check if the entered id is an email
    const isEmail = z.string().email().safeParse(state.id).success

    // Prepare credentials object based on id type
    const credentials = isEmail
      ? { email: state.id, password: state.password }
      : { username: state.id, password: state.password }

    await authStore.loginUser(credentials)
      .then( async(res) => {
        if (res) {

          // Show success toast notification
          toast.add({ 
            title: t("LOGIN.messages.success.title"),
            description: t("LOGIN.messages.success.subtitle"),
            type: "foreground",
            color: "primary",
            duration: 2000,
            icon: "ph-seal-check",
            close: false,
            ui: { root: 'p-6' },
          })

          // Redirect to home page after successful login
          // await navigateTo("/")
        }
      })
      .catch((error) => {

          // Show error toast notification
          toast.add({ 
            title: t("LOGIN.messages.error.title"),
            description: error?.data?.error ?? t("LOGIN.messages.error.subtitle"),
            color: "error",
            duration: 4000,
            closeIcon: "ph-x",
            icon: "ph-seal-warning",
            close: { color: 'error' }
          })
      })
     
  }

  return {
    form, schema, state, initLogin,
  }

}