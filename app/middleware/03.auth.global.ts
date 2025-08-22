export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore()
  
  console.log('--auth middleware running')

  // Redirect unauthenticated users trying to access protected routes
  if (!authStore.user && to.meta.requiresAuth) {
    return {
      path: '/auth/login',

      // save the location user was trying to access, 
      // to come back after login
      query: { redirect: to.fullPath },
   }
  }

  // Redirect authenticated users away from guest-only routes
  if (authStore.user && to.meta.requiresGuest) {
    return { path: '/' }
  }
  
  return true
})