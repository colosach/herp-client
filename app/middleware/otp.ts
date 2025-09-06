  import { z } from 'zod'

export default defineNuxtRouteMiddleware((to) => {
  
  const { getOtpSession } = useOTPSession()
  let savedEmail = getOtpSession()?.email

  // if user is on verification screen and there's no valid email pending action in storage, bounce 
  if (to.query[REGISTRATION.STEP_QUERY_KEY] === REGISTRATION.STEP_QUERY_VALUES.VERIFY) {
    if (
      !savedEmail ||
      !z.string().email().safeParse(savedEmail).success
    ) {
      return ({ path: '/auth/register', query: {} })
    }
  }
})