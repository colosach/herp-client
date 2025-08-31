import type { 
  FormError,
  FormSubmitEvent 
} from '@nuxt/ui'

import * as z from 'zod'

export default function useOTP() {

  const schema = z.object({
    pin: z.array(z.number()).nullable()
  })
  type Schema = z.output<typeof schema>

    // Array to hold form errors (if needed for UI)
  const formErrors: FormError[] = []
  const state = reactive<Schema>({
    pin: []
  })

  return {
    schema,
    formErrors, state, 
  }
}