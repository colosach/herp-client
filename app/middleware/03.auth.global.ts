export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore()
  

  // Redirect unauthenticated users trying to access protected routes
  if (!authStore.user && to.meta.requiresAuth) {
    return {
      path: "/auth/login",

      // save the location user was trying to access, 
      // to come back after login
      query: { redirect: to.fullPath },
   }
  }

  // Redirect guests that try to access the..
  // ..generic /auth route to the login page
  if (!authStore.user && to.fullPath === "/auth") {
    return { path: "/auth/login"}
  }

  if (authStore.user) {

    // if token has expired and route needs auth, bounce user
    if(authStore.accessTokenHasExpired() && to.meta.requiresAuth) {
      authStore.logoutUser()
      return 
    }

    // Redirect authenticated users away from guest-only routes
    if (to.meta.requiresGuest) {
      return { path: "/" }
    }

  }
  
  return true
})