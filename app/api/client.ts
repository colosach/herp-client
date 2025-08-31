import { 
  applyRequestInterceptors,
  applyRequestErrorInterceptors
} from './interceptors/request'

import { 
  applyResponseInterceptors,
  applyResponseErrorInterceptors
} from './interceptors/response'

// https://nuxt.com/docs/4.x/api/composables/use-cookie
const jwtAccessToken = useCookie(ERP_STORAGE_KEYS.JWT_ACCESS_TOKEN)
const baseURL = import.meta.env.VITE_ERP_SERVER_BASE_URL

export const apiRequest = <T = any>(endpoint: string, options: any = {})  => {

  return $fetch<T>(`${baseURL}${endpoint}`, {
    onRequest({ options }) {
      applyRequestInterceptors(options, jwtAccessToken)
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