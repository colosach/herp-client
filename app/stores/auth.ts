import * as z from 'zod'
import type { 
  FetchResponse 
} from 'ofetch'
import type { JwtPayload } from 'jwt-decode'


export const useAuthStore = defineStore('auth', () => {
  const { encryptData, decryptData } = useCrypto()
  
  // Persisted encrypted JWT access token in local storage
  const savedEncrytedJwtAccessToken = 
    useLocalStorage<string | null>(ERP_STORAGE_KEYS.JWT_ACCESS_TOKEN, null)

  // Persisted encrypted JWT access token in local storage
  const savedEncrytedJwtRefreshToken = 
    useLocalStorage<string | null>(ERP_STORAGE_KEYS.JWT_REFRESH_TOKEN, null)

  // Decoded JWT payload (user info) from decrypted token
  const { payload: tknPayload } = useJwt<JwtAccessTokenDecoded>(computed(() => decryptData(savedEncrytedJwtAccessToken.value)))

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
      userName: tknPayload.value.userName
    }
  })

  // Handles user registeration
  async function registerUser(credentials: Object) {
    return await authService.register(credentials)
    .then((res) => { 
      return res 
    })
  }

  // Handles email verification
  async function verifyEmail(credentials: Object) {
    return await authService.verifyEmail(credentials)
  }

  // Handles user login and stores encrypted JWT tokens
  async function loginUser(credentials: Object)  {
    return await authService.login(credentials)
    .then((res) => { 
      savedEncrytedJwtAccessToken.value = 
        encryptData(res?.data?.token)

      savedEncrytedJwtRefreshToken.value = 
        encryptData(res?.data?.refresh_token)

      return res 
    })
  }

  // Handles user logout and clears persisted encrypted JWT token 
  async function logoutUser() {
    return await authService.logout()
      .then( async () => {
        clearStorage(ERP_STORAGE_KEYS.JWT_ACCESS_TOKEN)
        clearStorage(ERP_STORAGE_KEYS.JWT_REFRESH_TOKEN) 
        await navigateTo('/auth/login')
      })
  }

  return {
    user,
    loginUser,
    logoutUser,
    registerUser,
    verifyEmail,
    accessTokenHasExpired,
    savedEncrytedJwtAccessToken
  }
})

// HMR (Hot Module Replacement) support
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
