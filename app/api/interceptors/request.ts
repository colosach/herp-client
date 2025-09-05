import type { CookieRef } from '#app'
import type { ResolvedFetchOptions, FetchError } from 'ofetch'

export function applyRequestInterceptors <T>(
  options: ResolvedFetchOptions, 
  jwtAccessToken: CookieRef<T>
): void {
  console.log(jwtAccessToken)
  if (jwtAccessToken) {
    options.headers.set('Authorization', `Bearer ${jwtAccessToken}`)
  }
    
  // Set default headers
  options.headers.set('Content-Type', 'application/json')
  options.headers.set('Accept', 'application/json')

  // https://vueuse.org/core/useNetwork/
  const { isOnline } = useNetwork()

  // abort and throw error if backend server is remote 
  // and there's no internet connection
  if (import.meta.env.VITE_ERP_SERVER_IS_REMOTE && !isOnline.value) {

    const error = new Error();
    (error as any).data = API_CLIENT_ERROR_KEY

    throw error
  }

}

export function applyRequestErrorInterceptors(error: FetchError): void {
  const toast = useToast()

  toast.add({ 
    title: `[REQ - E]: ${error.name}`,
    description: error.message,
    color: "error",
    duration: 4000,
    closeIcon: "ph-x",
    icon: "ph-seal-warning",
    close: { color: 'error' },
  })
}