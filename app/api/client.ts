import { 
  applyRequestInterceptors,
  applyRequestErrorInterceptors
} from './interceptors/request'

import { 
  applyResponseInterceptors,
  applyResponseErrorInterceptors
} from './interceptors/response'

const { decryptData } = useCrypto()

// Persisted encrypted JWT access token in local storage
const savedEncrytedJwtAccessToken = 
  useLocalStorage<string | null>(ERP_STORAGE_KEYS.JWT_ACCESS_TOKEN, null)


const baseURL = import.meta.env.VITE_ERP_SERVER_BASE_URL

export const apiRequest = <T = any>(endpoint: string, options: any = {})  => {

  return $fetch<T>(`${baseURL}${endpoint}`, {
    onRequest({ options }) {
      applyRequestInterceptors(options, decryptData(savedEncrytedJwtAccessToken.value))
    },
    
    onRequestError({ error }) {
      applyRequestErrorInterceptors(error)
    },
    
    onResponse({ response }) {
      applyResponseInterceptors(response)
    },
    
    onResponseError({ response }) {
      applyResponseErrorInterceptors(response)
    },
    
    ...options
  })
 
}