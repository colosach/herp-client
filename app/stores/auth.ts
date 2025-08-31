import * as z from 'zod'
import type { 
  FetchResponse 
} from 'ofetch'


export const useAuthStore = defineStore('auth', () => {
  const { encryptData, decryptData } = useCrypto()
  
  // Persisted encrypted JWT access token in local storage
  const savedEncrytedJwtAccessToken = 
    useLocalStorage<string | null>(ERP_STORAGE_KEYS.JWT_ACCESS_TOKEN, null)

  // Decoded JWT payload (user info) from decrypted token
  // Add type JwtAccessTokenDecoded to tknPayload
  const { payload: tknPayload } = useJwt<JwtAccessTokenDecoded>(computed(() => decryptData(savedEncrytedJwtAccessToken.value)))
    useJwt<User>(computed(() => decryptData(savedEncrytedJwtAccessToken.value)))

  const accessTokenHasExpired = () => {
    if (!tknPayload.value || !tknPayload.value.exp) return true
    
    const now = Math.floor(Date.now() / 1000)
    return tknPayload.value.exp < now
  }

  // Computed user object from JWT payload, or null if not available
  const user = computed<User | null>(() => {
    if (!tknPayload.value) return null
    
    return {
      userId: tknPayload.value.userId,
      email: tknPayload.value.email,
      role: tknPayload.value.role,
      permissions: tknPayload.value.permissions,
      // name: tknPayload.value.name
    }
  })

  // Handles user registeration and stores encrypted JWT token
  async function registerUser(credentials: Object): Promise<FetchResponse<any>> {
    return await authService.register(credentials)
    .then((res) => { 
      savedEncrytedJwtAccessToken.value = 
        encryptData(res?.token)

      return res 
    })
  }

  // Handles user login and stores encrypted JWT token
  async function loginUser(credentials: Object): Promise<FetchResponse<any>>  {
    return await authService.login(credentials)
    .then((res) => { 
      savedEncrytedJwtAccessToken.value = 
        encryptData(res?.token)

      return res 
    })
  }

  // Handles user logout and clears persisted encrypted JWT token 
  async function logoutUser() {
    clearStorage(ERP_STORAGE_KEYS.JWT_ACCESS_TOKEN)
    await navigateTo('/auth/login')
  }

  return {
    user,
    loginUser,
    logoutUser,
    registerUser,
    accessTokenHasExpired,
    savedEncrytedJwtAccessToken
  }
})

// HMR (Hot Module Replacement) support
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
