import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

export default function useLogin() {

  const form = useTemplateRef('login-form')

  const schema = z.object({
    id: z.string().refine(val => val.length === 0 || val.length >= 3, {
      message: 'Enter a valid username or email'
    }),
    password: z.string().refine(val => val.length === 0 || val.length >= 8, {
      message: 'Must be at least 8 characters'
    })
  })

  type Schema = z.output<typeof schema>

  const state = reactive<Partial<Schema>>({
    id: undefined,
    password: undefined
  })

  const toast = useToast()

  async function initLogin(event: FormSubmitEvent<Schema>) {
    toast.add({ title: 'Success', description: 'The form has been submitted.', color: 'success' })
    console.log(event.data)
  }

  return {
    form, schema, state, initLogin
  }
}