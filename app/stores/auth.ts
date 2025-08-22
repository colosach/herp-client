export const useAuthStore = defineStore('auth', () => {
  const { encryptData, decryptData } = useCrypto()
  
  // Persisted encrypted JWT access token in local storage
  const savedEncrytedJwtAccessToken = 
    useLocalStorage<string | null>(ERP_STORAGE_KEYS.JWT_ACCESS_TOKEN, null)

  // Decoded JWT payload (user info) from decrypted token
  const { payload: tknPayload } = 
    useJwt<User>(computed(() => decryptData(savedEncrytedJwtAccessToken.value)))

  // Computed user object from JWT payload, or null if not available
  const user = computed<User | null>(() => {
    if (!tknPayload.value) return null
    
    return {
      userId: tknPayload.value.userId,
      email: tknPayload.value.email,
      role: tknPayload.value.role,
      permissions: tknPayload.value.permissions,
      name: tknPayload.value.name
    }
  })

  // Handles user login and stores encrypted JWT token
  async function loginUser(credentials: LoginCredentials) {
    const isLoading = ref(true)

    try {
      const { data } = await authService.login(credentials)
      savedEncrytedJwtAccessToken.value = encryptData(data?.token) 
    } 
    catch (err: any) {
      
      // TODO: show toast or propagate error to form
      console.error(err?.response?.data?.error)
      /**
       * -> err.response?.data?.message
       * create a toast and display message in it,
       *  or send the error back to to the login forms state
       */
    } 
    finally {
      isLoading.value = false
    }
  }

  return {
    user,
    loginUser,
    savedEncrytedJwtAccessToken
  }
})

// HMR (Hot Module Replacement) support
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
