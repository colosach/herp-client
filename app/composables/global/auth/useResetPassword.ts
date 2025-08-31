import type { 
  FormError,
  FormSubmitEvent 
} from '@nuxt/ui'

import * as z from 'zod'

export function useResetPassword() {
  const { t } = useI18n()

  const form = useTemplateRef('registration-form')

  const schema = createResetPasswordSchema()
  type Schema = z.output<typeof schema>

  const state = reactive<Schema>({
    password: null,
    password2: null
  })

  const { 
    color, text, 
    strength, score 
  } = usePasswordStrength(state)

  return {
    schema, state,
    color, text, strength, score
  }
}

